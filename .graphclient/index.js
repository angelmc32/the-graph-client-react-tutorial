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
        case ".graphclient/sources/compoundv2/introspectionSchema.js":
            return import("./sources/compoundv2/introspectionSchema.js");
        case ".graphclient/sources/uniswapv2/introspectionSchema.js":
            return import("./sources/uniswapv2/introspectionSchema.js");
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
    const uniswapv2Transforms = [];
    const compoundv2Transforms = [];
    const additionalTypeDefs = [];
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
    const compoundv2Handler = new GraphqlHandler({
        name: "compoundv2",
        config: { "endpoint": "https://api.thegraph.com/subgraphs/name/graphprotocol/compound-v2" },
        baseDir,
        cache,
        pubsub,
        store: sourcesStore.child("compoundv2"),
        logger: logger.child("compoundv2"),
        importFn,
    });
    sources[0] = {
        name: 'uniswapv2',
        handler: uniswapv2Handler,
        transforms: uniswapv2Transforms
    };
    sources[1] = {
        name: 'compoundv2',
        handler: compoundv2Handler,
        transforms: compoundv2Transforms
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
                    document: ExampleQueryDocument,
                    get rawSDL() {
                        return printWithCache(ExampleQueryDocument);
                    },
                    location: 'ExampleQueryDocument.graphql'
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
export const ExampleQueryDocument = gql `
    query ExampleQuery {
  markets(first: 7) {
    borrowRate
    cash
    collateralFactor
  }
  pair(id: "0x00004ee988665cdda9a1080d5792cecd16dc1220") {
    id
    token0 {
      id
      symbol
      name
    }
    token1 {
      id
      symbol
      name
    }
  }
}
    `;
export function getSdk(requester) {
    return {
        ExampleQuery(variables, options) {
            return requester(ExampleQueryDocument, variables, options);
        }
    };
}
