import { gql } from '@graphql-mesh/utils';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';
import GraphqlHandler from "@graphql-mesh/graphql";
import UsePollingLive from "@graphprotocol/client-polling-live";
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
        case ".graphclient/sources/uniswapv2/introspectionSchema.js":
            return import("./sources/uniswapv2/introspectionSchema.js");
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
    const uniswapv2Transforms = [];
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
    const uniswapv2Handler = new GraphqlHandler({
        name: "uniswapv2",
        config: { "endpoint": "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2" },
        baseDir,
        cache,
        pubsub,
        store: sourcesStore.child("uniswapv2"),
        logger: logger.child("uniswapv2"),
        importFn,
    });
    sources[0] = {
        name: 'ens',
        handler: ensHandler,
        transforms: ensTransforms
    };
    sources[1] = {
        name: 'uniswapv2',
        handler: uniswapv2Handler,
        transforms: uniswapv2Transforms
    };
    additionalEnvelopPlugins[0] = await UsePollingLive({
        ...({
            "defaultInterval": 5000
        }),
        logger: logger.child("pollingLive"),
        cache,
        pubsub,
        baseDir,
        importFn,
    });
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
                    document: GetDomainBySubdomainCountDocument,
                    get rawSDL() {
                        return printWithCache(GetDomainBySubdomainCountDocument);
                    },
                    location: 'GetDomainBySubdomainCountDocument.graphql'
                }, {
                    document: GetManySwapsDocument,
                    get rawSDL() {
                        return printWithCache(GetManySwapsDocument);
                    },
                    location: 'GetManySwapsDocument.graphql'
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
    owner {
      id
    }
  }
}
    `;
export const GetDomainByLabelNameDocument = gql `
    query GetDomainByLabelName($labelName: String!, $name: String!) {
  domains(where: {labelName: $labelName, name: $name}) {
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
export const GetDomainBySubdomainCountDocument = gql `
    query GetDomainBySubdomainCount($min: Int!, $max: Int!) {
  domains(where: {subdomainCount_gte: $min, subdomainCount_lte: $max}) {
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
export const GetManySwapsDocument = gql `
    query GetManySwaps @live {
  swaps(orderBy: timestamp, first: 15, orderDirection: desc) {
    id
    amountUSD
    pair {
      token0 {
        name
        symbol
      }
      token0Price
      token1 {
        name
        symbol
      }
      token1Price
    }
    timestamp
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
        GetDomainBySubdomainCount(variables, options) {
            return requester(GetDomainBySubdomainCountDocument, variables, options);
        },
        GetManySwaps(variables, options) {
            return requester(GetManySwapsDocument, variables, options);
        }
    };
}
