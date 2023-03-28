// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace UsdcTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type Minter = {
  id: Scalars['ID'];
  address: Scalars['String'];
  totalMinted: Scalars['BigInt'];
  totalBurned: Scalars['BigInt'];
};

export type MinterCounter = {
  id: Scalars['ID'];
  count: Scalars['Int'];
};

export type MinterCounter_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  count?: InputMaybe<Scalars['Int']>;
  count_not?: InputMaybe<Scalars['Int']>;
  count_gt?: InputMaybe<Scalars['Int']>;
  count_lt?: InputMaybe<Scalars['Int']>;
  count_gte?: InputMaybe<Scalars['Int']>;
  count_lte?: InputMaybe<Scalars['Int']>;
  count_in?: InputMaybe<Array<Scalars['Int']>>;
  count_not_in?: InputMaybe<Array<Scalars['Int']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MinterCounter_filter>>>;
  or?: InputMaybe<Array<InputMaybe<MinterCounter_filter>>>;
};

export type MinterCounter_orderBy =
  | 'id'
  | 'count';

export type Minter_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  address?: InputMaybe<Scalars['String']>;
  address_not?: InputMaybe<Scalars['String']>;
  address_gt?: InputMaybe<Scalars['String']>;
  address_lt?: InputMaybe<Scalars['String']>;
  address_gte?: InputMaybe<Scalars['String']>;
  address_lte?: InputMaybe<Scalars['String']>;
  address_in?: InputMaybe<Array<Scalars['String']>>;
  address_not_in?: InputMaybe<Array<Scalars['String']>>;
  address_contains?: InputMaybe<Scalars['String']>;
  address_contains_nocase?: InputMaybe<Scalars['String']>;
  address_not_contains?: InputMaybe<Scalars['String']>;
  address_not_contains_nocase?: InputMaybe<Scalars['String']>;
  address_starts_with?: InputMaybe<Scalars['String']>;
  address_starts_with_nocase?: InputMaybe<Scalars['String']>;
  address_not_starts_with?: InputMaybe<Scalars['String']>;
  address_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  address_ends_with?: InputMaybe<Scalars['String']>;
  address_ends_with_nocase?: InputMaybe<Scalars['String']>;
  address_not_ends_with?: InputMaybe<Scalars['String']>;
  address_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  totalMinted?: InputMaybe<Scalars['BigInt']>;
  totalMinted_not?: InputMaybe<Scalars['BigInt']>;
  totalMinted_gt?: InputMaybe<Scalars['BigInt']>;
  totalMinted_lt?: InputMaybe<Scalars['BigInt']>;
  totalMinted_gte?: InputMaybe<Scalars['BigInt']>;
  totalMinted_lte?: InputMaybe<Scalars['BigInt']>;
  totalMinted_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalMinted_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalBurned?: InputMaybe<Scalars['BigInt']>;
  totalBurned_not?: InputMaybe<Scalars['BigInt']>;
  totalBurned_gt?: InputMaybe<Scalars['BigInt']>;
  totalBurned_lt?: InputMaybe<Scalars['BigInt']>;
  totalBurned_gte?: InputMaybe<Scalars['BigInt']>;
  totalBurned_lte?: InputMaybe<Scalars['BigInt']>;
  totalBurned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalBurned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Minter_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Minter_filter>>>;
};

export type Minter_orderBy =
  | 'id'
  | 'address'
  | 'totalMinted'
  | 'totalBurned';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Query = {
  user?: Maybe<User>;
  users: Array<User>;
  minter?: Maybe<Minter>;
  minters: Array<Minter>;
  userCounter?: Maybe<UserCounter>;
  userCounters: Array<UserCounter>;
  minterCounter?: Maybe<MinterCounter>;
  minterCounters: Array<MinterCounter>;
  transferCounter?: Maybe<TransferCounter>;
  transferCounters: Array<TransferCounter>;
  totalSupply?: Maybe<TotalSupply>;
  totalSupplies: Array<TotalSupply>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QueryuserArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryusersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<User_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryminterArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymintersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Minter_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Minter_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryuserCounterArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryuserCountersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserCounter_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UserCounter_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryminterCounterArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryminterCountersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MinterCounter_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MinterCounter_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytransferCounterArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytransferCountersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TransferCounter_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TransferCounter_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytotalSupplyArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytotalSuppliesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TotalSupply_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TotalSupply_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Subscription = {
  user?: Maybe<User>;
  users: Array<User>;
  minter?: Maybe<Minter>;
  minters: Array<Minter>;
  userCounter?: Maybe<UserCounter>;
  userCounters: Array<UserCounter>;
  minterCounter?: Maybe<MinterCounter>;
  minterCounters: Array<MinterCounter>;
  transferCounter?: Maybe<TransferCounter>;
  transferCounters: Array<TransferCounter>;
  totalSupply?: Maybe<TotalSupply>;
  totalSupplies: Array<TotalSupply>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionuserArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionusersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<User_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionminterArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmintersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Minter_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Minter_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionuserCounterArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionuserCountersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserCounter_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UserCounter_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionminterCounterArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionminterCountersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MinterCounter_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MinterCounter_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontransferCounterArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontransferCountersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TransferCounter_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TransferCounter_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontotalSupplyArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontotalSuppliesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TotalSupply_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TotalSupply_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type TotalSupply = {
  id: Scalars['ID'];
  supply: Scalars['BigInt'];
  minted: Scalars['BigInt'];
  burned: Scalars['BigInt'];
};

export type TotalSupply_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  supply?: InputMaybe<Scalars['BigInt']>;
  supply_not?: InputMaybe<Scalars['BigInt']>;
  supply_gt?: InputMaybe<Scalars['BigInt']>;
  supply_lt?: InputMaybe<Scalars['BigInt']>;
  supply_gte?: InputMaybe<Scalars['BigInt']>;
  supply_lte?: InputMaybe<Scalars['BigInt']>;
  supply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  supply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  minted?: InputMaybe<Scalars['BigInt']>;
  minted_not?: InputMaybe<Scalars['BigInt']>;
  minted_gt?: InputMaybe<Scalars['BigInt']>;
  minted_lt?: InputMaybe<Scalars['BigInt']>;
  minted_gte?: InputMaybe<Scalars['BigInt']>;
  minted_lte?: InputMaybe<Scalars['BigInt']>;
  minted_in?: InputMaybe<Array<Scalars['BigInt']>>;
  minted_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  burned?: InputMaybe<Scalars['BigInt']>;
  burned_not?: InputMaybe<Scalars['BigInt']>;
  burned_gt?: InputMaybe<Scalars['BigInt']>;
  burned_lt?: InputMaybe<Scalars['BigInt']>;
  burned_gte?: InputMaybe<Scalars['BigInt']>;
  burned_lte?: InputMaybe<Scalars['BigInt']>;
  burned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  burned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TotalSupply_filter>>>;
  or?: InputMaybe<Array<InputMaybe<TotalSupply_filter>>>;
};

export type TotalSupply_orderBy =
  | 'id'
  | 'supply'
  | 'minted'
  | 'burned';

export type TransferCounter = {
  id: Scalars['ID'];
  count: Scalars['Int'];
  totalTransferred: Scalars['BigInt'];
};

export type TransferCounter_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  count?: InputMaybe<Scalars['Int']>;
  count_not?: InputMaybe<Scalars['Int']>;
  count_gt?: InputMaybe<Scalars['Int']>;
  count_lt?: InputMaybe<Scalars['Int']>;
  count_gte?: InputMaybe<Scalars['Int']>;
  count_lte?: InputMaybe<Scalars['Int']>;
  count_in?: InputMaybe<Array<Scalars['Int']>>;
  count_not_in?: InputMaybe<Array<Scalars['Int']>>;
  totalTransferred?: InputMaybe<Scalars['BigInt']>;
  totalTransferred_not?: InputMaybe<Scalars['BigInt']>;
  totalTransferred_gt?: InputMaybe<Scalars['BigInt']>;
  totalTransferred_lt?: InputMaybe<Scalars['BigInt']>;
  totalTransferred_gte?: InputMaybe<Scalars['BigInt']>;
  totalTransferred_lte?: InputMaybe<Scalars['BigInt']>;
  totalTransferred_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalTransferred_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TransferCounter_filter>>>;
  or?: InputMaybe<Array<InputMaybe<TransferCounter_filter>>>;
};

export type TransferCounter_orderBy =
  | 'id'
  | 'count'
  | 'totalTransferred';

export type User = {
  id: Scalars['ID'];
  address: Scalars['String'];
  balance: Scalars['BigInt'];
  transactionCount: Scalars['Int'];
};

export type UserCounter = {
  id: Scalars['ID'];
  count: Scalars['Int'];
};

export type UserCounter_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  count?: InputMaybe<Scalars['Int']>;
  count_not?: InputMaybe<Scalars['Int']>;
  count_gt?: InputMaybe<Scalars['Int']>;
  count_lt?: InputMaybe<Scalars['Int']>;
  count_gte?: InputMaybe<Scalars['Int']>;
  count_lte?: InputMaybe<Scalars['Int']>;
  count_in?: InputMaybe<Array<Scalars['Int']>>;
  count_not_in?: InputMaybe<Array<Scalars['Int']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<UserCounter_filter>>>;
  or?: InputMaybe<Array<InputMaybe<UserCounter_filter>>>;
};

export type UserCounter_orderBy =
  | 'id'
  | 'count';

export type User_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  address?: InputMaybe<Scalars['String']>;
  address_not?: InputMaybe<Scalars['String']>;
  address_gt?: InputMaybe<Scalars['String']>;
  address_lt?: InputMaybe<Scalars['String']>;
  address_gte?: InputMaybe<Scalars['String']>;
  address_lte?: InputMaybe<Scalars['String']>;
  address_in?: InputMaybe<Array<Scalars['String']>>;
  address_not_in?: InputMaybe<Array<Scalars['String']>>;
  address_contains?: InputMaybe<Scalars['String']>;
  address_contains_nocase?: InputMaybe<Scalars['String']>;
  address_not_contains?: InputMaybe<Scalars['String']>;
  address_not_contains_nocase?: InputMaybe<Scalars['String']>;
  address_starts_with?: InputMaybe<Scalars['String']>;
  address_starts_with_nocase?: InputMaybe<Scalars['String']>;
  address_not_starts_with?: InputMaybe<Scalars['String']>;
  address_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  address_ends_with?: InputMaybe<Scalars['String']>;
  address_ends_with_nocase?: InputMaybe<Scalars['String']>;
  address_not_ends_with?: InputMaybe<Scalars['String']>;
  address_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  balance?: InputMaybe<Scalars['BigInt']>;
  balance_not?: InputMaybe<Scalars['BigInt']>;
  balance_gt?: InputMaybe<Scalars['BigInt']>;
  balance_lt?: InputMaybe<Scalars['BigInt']>;
  balance_gte?: InputMaybe<Scalars['BigInt']>;
  balance_lte?: InputMaybe<Scalars['BigInt']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionCount?: InputMaybe<Scalars['Int']>;
  transactionCount_not?: InputMaybe<Scalars['Int']>;
  transactionCount_gt?: InputMaybe<Scalars['Int']>;
  transactionCount_lt?: InputMaybe<Scalars['Int']>;
  transactionCount_gte?: InputMaybe<Scalars['Int']>;
  transactionCount_lte?: InputMaybe<Scalars['Int']>;
  transactionCount_in?: InputMaybe<Array<Scalars['Int']>>;
  transactionCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<User_filter>>>;
  or?: InputMaybe<Array<InputMaybe<User_filter>>>;
};

export type User_orderBy =
  | 'id'
  | 'address'
  | 'balance'
  | 'transactionCount';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

  export type QuerySdk = {
      /** null **/
  user: InContextSdkMethod<Query['user'], QueryuserArgs, MeshContext>,
  /** null **/
  users: InContextSdkMethod<Query['users'], QueryusersArgs, MeshContext>,
  /** null **/
  minter: InContextSdkMethod<Query['minter'], QueryminterArgs, MeshContext>,
  /** null **/
  minters: InContextSdkMethod<Query['minters'], QuerymintersArgs, MeshContext>,
  /** null **/
  userCounter: InContextSdkMethod<Query['userCounter'], QueryuserCounterArgs, MeshContext>,
  /** null **/
  userCounters: InContextSdkMethod<Query['userCounters'], QueryuserCountersArgs, MeshContext>,
  /** null **/
  minterCounter: InContextSdkMethod<Query['minterCounter'], QueryminterCounterArgs, MeshContext>,
  /** null **/
  minterCounters: InContextSdkMethod<Query['minterCounters'], QueryminterCountersArgs, MeshContext>,
  /** null **/
  transferCounter: InContextSdkMethod<Query['transferCounter'], QuerytransferCounterArgs, MeshContext>,
  /** null **/
  transferCounters: InContextSdkMethod<Query['transferCounters'], QuerytransferCountersArgs, MeshContext>,
  /** null **/
  totalSupply: InContextSdkMethod<Query['totalSupply'], QuerytotalSupplyArgs, MeshContext>,
  /** null **/
  totalSupplies: InContextSdkMethod<Query['totalSupplies'], QuerytotalSuppliesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  user: InContextSdkMethod<Subscription['user'], SubscriptionuserArgs, MeshContext>,
  /** null **/
  users: InContextSdkMethod<Subscription['users'], SubscriptionusersArgs, MeshContext>,
  /** null **/
  minter: InContextSdkMethod<Subscription['minter'], SubscriptionminterArgs, MeshContext>,
  /** null **/
  minters: InContextSdkMethod<Subscription['minters'], SubscriptionmintersArgs, MeshContext>,
  /** null **/
  userCounter: InContextSdkMethod<Subscription['userCounter'], SubscriptionuserCounterArgs, MeshContext>,
  /** null **/
  userCounters: InContextSdkMethod<Subscription['userCounters'], SubscriptionuserCountersArgs, MeshContext>,
  /** null **/
  minterCounter: InContextSdkMethod<Subscription['minterCounter'], SubscriptionminterCounterArgs, MeshContext>,
  /** null **/
  minterCounters: InContextSdkMethod<Subscription['minterCounters'], SubscriptionminterCountersArgs, MeshContext>,
  /** null **/
  transferCounter: InContextSdkMethod<Subscription['transferCounter'], SubscriptiontransferCounterArgs, MeshContext>,
  /** null **/
  transferCounters: InContextSdkMethod<Subscription['transferCounters'], SubscriptiontransferCountersArgs, MeshContext>,
  /** null **/
  totalSupply: InContextSdkMethod<Subscription['totalSupply'], SubscriptiontotalSupplyArgs, MeshContext>,
  /** null **/
  totalSupplies: InContextSdkMethod<Subscription['totalSupplies'], SubscriptiontotalSuppliesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["usdc"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
