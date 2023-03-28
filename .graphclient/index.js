import { gql } from '@graphql-mesh/utils';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';
import GraphqlHandler from "@graphql-mesh/graphql";
import StitchingMerger from "@graphql-mesh/merger-stitching";
import { printWithCache } from '@graphql-mesh/utils';
import { createMeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(pathModule.dirname(fileURLToPath(import.meta.url)), '..');
const importFn = (moduleId) => {
    const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
    switch (relativeModuleId) {
        case ".graphclient/sources/usdc/introspectionSchema.js":
            return import("./sources/usdc/introspectionSchema.js");
        case ".graphclient/sources/ens/introspectionSchema.js":
            return import("./sources/ens/introspectionSchema.js");
        default:
            return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
    }
};
const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
    cwd: baseDir,
    importFn,
    fileType: "js",
}), {
    readonly: true,
    validate: false
});
export const rawServeConfig = undefined;
export async function getMeshOptions() {
    const pubsub = new PubSub();
    const sourcesStore = rootStore.child('sources');
    const logger = new DefaultLogger("GraphClient");
    const cache = new MeshCache({
        ...{},
        importFn,
        store: rootStore.child('cache'),
        pubsub,
        logger,
    });
    const sources = [];
    const transforms = [];
    const additionalEnvelopPlugins = [];
    const ensTransforms = [];
    const usdcTransforms = [];
    const additionalTypeDefs = [];
    const ensHandler = new GraphqlHandler({
        name: "ens",
        config: { "endpoint": "https://api.thegraph.com/subgraphs/name/ensdomains/ens" },
        baseDir,
        cache,
        pubsub,
        store: sourcesStore.child("ens"),
        logger: logger.child("ens"),
        importFn,
    });
    const usdcHandler = new GraphqlHandler({
        name: "usdc",
        config: { "endpoint": "https://api.thegraph.com/subgraphs/name/centrehq/usdc" },
        baseDir,
        cache,
        pubsub,
        store: sourcesStore.child("usdc"),
        logger: logger.child("usdc"),
        importFn,
    });
    sources[0] = {
        name: 'ens',
        handler: ensHandler,
        transforms: ensTransforms
    };
    sources[1] = {
        name: 'usdc',
        handler: usdcHandler,
        transforms: usdcTransforms
    };
    const additionalResolvers = [];
    const merger = new StitchingMerger({
        cache,
        pubsub,
        logger: logger.child('stitchingMerger'),
        store: rootStore.child('stitchingMerger')
    });
    return {
        sources,
        transforms,
        additionalTypeDefs,
        additionalResolvers,
        cache,
        pubsub,
        merger,
        logger,
        additionalEnvelopPlugins,
        get documents() {
            return [
                {
                    document: GetManyDomainsDocument,
                    get rawSDL() {
                        return printWithCache(GetManyDomainsDocument);
                    },
                    location: 'GetManyDomainsDocument.graphql'
                }, {
                    document: GetDomainByLabelNameDocument,
                    get rawSDL() {
                        return printWithCache(GetDomainByLabelNameDocument);
                    },
                    location: 'GetDomainByLabelNameDocument.graphql'
                }, {
                    document: GetDomainWithSubdomainsDocument,
                    get rawSDL() {
                        return printWithCache(GetDomainWithSubdomainsDocument);
                    },
                    location: 'GetDomainWithSubdomainsDocument.graphql'
                }
            ];
        },
        fetchFn,
    };
}
export function createBuiltMeshHTTPHandler() {
    return createMeshHTTPHandler({
        baseDir,
        getBuiltMesh: getBuiltGraphClient,
        rawServeConfig: undefined,
    });
}
let meshInstance$;
export function getBuiltGraphClient() {
    if (meshInstance$ == null) {
        meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
            const id = mesh.pubsub.subscribe('destroy', () => {
                meshInstance$ = undefined;
                mesh.pubsub.unsubscribe(id);
            });
            return mesh;
        });
    }
    return meshInstance$;
}
export const execute = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));
export const subscribe = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK(globalContext) {
    const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
    return getSdk((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export const GetManyDomainsDocument = gql `
    query GetManyDomains {
  domains(first: 1000) {
    id
    name
    labelName
    labelhash
  }
}
    `;
export const GetDomainByLabelNameDocument = gql `
    query GetDomainByLabelName($labelName: String!) {
  domains(where: {labelName: $labelName, name: $labelName}) {
    name
    labelName
    subdomainCount
    id
    owner {
      id
    }
  }
}
    `;
export const GetDomainWithSubdomainsDocument = gql `
    query GetDomainWithSubdomains($min: Int!, $max: Int!) {
  domains(where: {subdomainCount_lte: $min, subdomainCount_gt: $max}) {
    name
    labelName
    subdomainCount
    subdomains {
      labelName
    }
    id
    owner {
      id
    }
    registration {
      cost
    }
  }
}
    `;
export function getSdk(requester) {
    return {
        GetManyDomains(variables, options) {
            return requester(GetManyDomainsDocument, variables, options);
        },
        GetDomainByLabelName(variables, options) {
            return requester(GetDomainByLabelNameDocument, variables, options);
        },
        GetDomainWithSubdomains(variables, options) {
            return requester(GetDomainWithSubdomainsDocument, variables, options);
        }
    };
}
