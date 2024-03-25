# Contributing

## Contributor guidelines

### Core contributor loop

- Check the [list of PRs that need review](https://github.com/TERITORI/teritori-dapp/pulls?q=is%3Apr+is%3Aopen+review%3Arequired+draft%3Afalse+) and review relevant PRs, see [Reviewing a PR](#reviewing-a-pr)
- Check your [assigned PRs that require changes](https://github.com/TERITORI/teritori-dapp/pulls?q=is%3Apr+is%3Aopen+review%3Achanges_requested+draft%3Afalse+assignee%3A%40me+) and address the reviews
- Make sure you have self-reviewed your existing PRs and the CI passes on them, see [Reviewing a PR](#reviewing-a-pr)
- Continue on your assigned tasks
- If you have nothing to do at this point, ask for a new task

For all tasks, create a PR as soon as possible to make other mates aware of your work and to prevent you from going in a bad direction

### Creating a PR

- Make sure the PR's title follows [the conventional commits standard](https://www.conventionalcommits.org/en/v1.0.0/) as it will be used as the squashed commit title on main
- Make sure your are assigned to the PR, this helps you to know [which PRs require your attention](https://github.com/TERITORI/teritori-dapp/pulls?q=is%3Apr+is%3Aopen+assignee%3A%40me)
- Try to keep the PR [atomic](https://fagnerbrack.com/one-pull-request-one-concern-e84a27dfe9f1), it will be merged faster and benefit all your mates
- Self-review the changes and pass CI before asking for other peoples reviews, see [Reviewing a PR](#reviewing-a-pr)

### Reviewing a PR

- Read and understand all changes
  
  You can use the GitHub diff and mark each file as viewed, this will help in subsequent reviews as unchanged files will keep the "Viewed" status
  
  <img width="448" alt="Screenshot 2024-03-21 at 20 01 38" src="https://github.com/TERITORI/teritori-dapp/assets/7917064/6141fdd3-2746-498d-916f-9945a56c7ff0">

- Test
  
  Check that the feature works or the bug is fixed

  If there is changes in code used at other places, test for regressions in affected features

If the PR is not atomic enough and makes reviewing hard, you can ask the author to split it

You can deny the review if the PR does not pass CI

## Technology overview

### Web2 vs Web3

#### Technical Infrastructure 🏗️

- **Web2:** Centralized servers and cloud providers like AWS, Google Cloud, and Azure dominate, offering scalable and reliable infrastructure but centralizing control.
- **Web3:** Utilizes decentralized networks, such as blockchain and peer-to-peer protocols, distributing data across numerous nodes to ensure security, privacy, and resistance to censorship.

#### Authentication 🔑

- **Web2:** Relies on centralized authentication services (e.g., OAuth, OpenID) where users log in using credentials managed by a third party.
- **Web3:** Employs asymmetric cryptography, allowing users to control their identities through cryptographic keys, enhancing security and privacy.

#### Data Storage and Management 📦

- **Web2:** Centralized databases and object storage services (e.g., Amazon S3) are prevalent, with data controlled by service providers.
- **Web3:** Decentralized storage solutions (e.g., IPFS, Filecoin) allow data to be distributed across the network, reducing reliance on central entities and improving data sovereignty.

### Frontend

#### Language: Typescript

We use a strict [Typescript](https://www.typescriptlang.org/docs/handbook/intro.html) configuration and try to enforce type-safety. Typescript very easily allows to bypass it's type-safety mechanism so it requires some discipline from the developer.

#### Framework: Expo

We use [the Expo framework](https://docs.expo.dev/) to support Web, Android, iOS, Windows, Macos and Linux with the same codebase.
This uses [react-native](https://reactnative.dev/docs/getting-started) to support mobile and [react-native-web](https://necolas.github.io/react-native-web/docs/) for web. The desktop build uses electron and react-native-web.

If you are coming from React and you work with the web dev server, it's important to understand that using html components (eg `<div>`) and styles will work because the react-native-web renderer allows it but it won't work with native renderers (iOS, Android and native desktop). So please check the expo api reference to make sure you are using things that are truly cross-platform.

#### Data fetching: react-query

We use [react-query](https://tanstack.com/query/v4/docs/framework/react/overview) to fetch data. It provides call-deduplication and configurable caching.
You can use it for optimistic mutations too but in most mutations case an async callback is enough.

#### App state: redux

We use [redux](https://redux-toolkit.js.org/) for global app state, it supports persistence. We're considering switching to [zustand](https://github.com/pmndrs/zustand).

### Backend

#### Decentralized services: Cosmos SDK

The main service for the Teritori chain is the Teritori blockchain daemon, [teritorid](https://github.com/TERITORI/teritori-chain).
But a lot of features we're developing are cross-chain compatible and use common [Cosmos SDK](https://docs.cosmos.network/) APIs.
Cosmos blockchain are configurable and you can see the list of modules for the Teritori chain [here](https://github.com/TERITORI/teritori-chain/blob/v2.0.6/app/app.go#L210-L238) for example.

You can find the main Cosmos API documentation [here](https://docs.cosmos.network/api).

Cosmos provides a native way for inter-blockchain communication called [IBC](https://cosmos.network/ibc/). It allows to transfer currencies between chains and more complex cross-chain behavior, for example swapping funds on Osmosis from a DAO on Teritori while keeping funds sovereignty by the DAO.

#### Smart contracts: CosmWASM

Smart-contracts are programs that run on blockchains.

The smart-contracts on teritori chain and most cosmos chains are using [cosmwasm](https://book.cosmwasm.com/) and thus [rust](https://www.rust-lang.org/) as programing language.

We recommend to use the [sylvia framework](https://cosmwasm.github.io/sylvia-book/index.html) to write your cosmwasm contracts as it heavily reduces boilerplate, making the code easier to maintain and read. It also provides better testing utilities.

#### Indexer: golang + postgres + substreams

Some chain data need to be aggregated and indexed to allow for performant queries. For example the marketplace stats that is aggregating the trade amounts for a month or indexing all nfts for an user so we can efficiently show the owned nfts of an user.
The cosmos-targeted indexer uses a custom golang daemon and the native cosmos apis to query for transactions in order and index them.
The evm-targeted indexer (supporting ethereum and polygon for now) uses the [substreams](https://substreams.streamingfast.io/) firehose api and we intend to use substream for cosmos too.

#### Extra services: golang

We have additional services to serve custom aggregates that are not provided by the chain and some off-chain features (eg private user data).
We recommend [golang](https://go.dev/doc/) to write additional services, it's not a strict rule but golang is a good middle ground between performance and ease-of-use with a strong focus on maintainability.
The Cosmos SDK itself is written in golang.

#### Protocol for extra services: GRPC

We use [GRPC](https://grpc.io/) as communication protocol for the centralized APIs. The models and endpoints definition are written in [protobuf](https://protobuf.dev/), this allows to generate types, servers and clients in any language. The definition are in the [api folder](api). The backend servers in the [go/pkg folder](go/pkg). The clients in the [js/packages/api folder](js/packages/api).

The Cosmos SDK is also using protobuf for it's endpoints definition but with custom encodings and extra layers on top of it.

#### Future: Gno

We plan to transition from Cosmos SDK to [Gno](https://docs.gno.land/) for the blockchain nodes and smart-contracts framework

## Patterns

### Continuous Integration (CI)

- Our project uses a CI pipeline to automatically build, test, and validate every pull request. This helps to ensure that all changes integrate smoothly and do not introduce new issues.

- When you submit a PR, the CI pipeline will automatically run. You can see the status of the CI checks at the bottom of your PR. If the checks fail, click on the "Details" link to see the logs and identify what went wrong.

- Before asking for reviews, make sure that your PR passes all CI checks.

- If your PR is failing the CI checks, review the logs, fix the issues, and push your changes. The CI pipeline will run again with the updated code.

- If you are having trouble understanding why a CI check is failing, feel free to ask for help.

- Do not merge PRs that are failing CI checks. If a PR is urgent and you believe the failure is not related to your changes, discuss this with the team before proceeding.

Remember, the purpose of the CI pipeline is to help us maintain a high standard of quality for our code. It's not a hurdle to overcome, but a tool to help us.

### Deployments

#### Applications

We use [Netlify](https://www.netlify.com/) for deploying our web frontend applications. When a pull request is merged into the main branch, a new build is triggered on Netlify. 

Here are the steps to follow:

1. Push your changes to your branch and create a pull request.
2. Once your pull request is approved and merged into the main branch, Netlify will automatically start the build and deployment process.
3. You can monitor the progress of the build in the Netlify dashboard.
4. Once the build is complete, your changes will be live on the site.

Netlify provides a public preview for all pull requests. Netlify automatically post and maintains a comment with link to the preview in the pull request.

The mobile build of main branch are automatically deployed to [Apple's Testflight](https://developer.apple.com/testflight/) and [Google's Play Console](https://play.google.com/console/about/internal-testing/)

Desktop builds are pushed as GitHub artifacts but not deployed on app stores yet. See at the bottom of [this page](https://github.com/TERITORI/teritori-dapp/actions/runs/8421277983) for example.

#### Backend

Our backend services are deployed on [Kubernetes](https://kubernetes.io/) clusters, which are hosted on [Scaleway](https://www.scaleway.com/). Due to the complexity of our backend, the deployment process is manual.

Here are the steps to follow:

1. Push your changes to your branch and create a pull request.
2. Once your pull request is approved and merged into the main branch, a new Docker image is built and pushed to our Docker registry.
3. A team member with the appropriate permissions will manually trigger a Kubernetes deployment, which pulls the new Docker image from the registry and updates the running services in our Kubernetes cluster.

#### Blockchain

Our project uses a blockchain for decentralized governance. The deployment of the blockchain nodes is decided via on-chain governance. This means that changes to the blockchain, including updates and deployments, are proposed and voted on by the community of token holders. 

Once a proposal is approved, it's up to the validators to apply the changes as they see fit. Validators are responsible for running the blockchain nodes and applying the approved changes. This process ensures that the control of the blockchain remains decentralized and in the hands of the community.

Here are the steps to follow:

1. A proposal for a change is submitted on the blockchain. See [this proposal](https://app.teritori.com/governance/38) for example.
2. Token holders vote on the proposal.
3. If the proposal is approved, validators are notified of the change.
4. Each validator is then responsible for applying the change to their own node at the correct time.

### Multi-networks (multi-chains)

The Teritori dApp is a multi-networks app. Meaning it can be used with multiple blockchains and web3 stacks. We use the term `Network` because the underlying distributed ledger technology could be something else than a blockchain.

It's important to understand the implications of that and not hardcode `tori` everywhere. Even when we only talk avout Teritori, there is currently two official Teritori chains, the Teritori mainnet, with chain id `teritori-1` and the Teritori testnet with chain id `teritori-test-6` and it's important to support both in all code.

We define network-related constants in the [networks package](packages/networks) and generate code from it for go programs. You should get all network information from this packages and add any new network-related information there.

The application user can disable and enable networks since there is 200 cosmos networks supported and having them all enabled on first use would be overwelming.
You can get the list of enabled networks in react components with the `useEnabledNetworks` hook. You can get the list of all supported networks from anywhere using the `allNetworks` variables from the `networks` package
 
We currently have a global concept called `selected network`, it is a value stored in the redux store and correspond to the value in the dropdown at the top-right of the web app. It's important to use it only in top-level components and pass down a network in components since a component could be used for multiple networks in the same page (think about a page displaying NFTs owned that come from different networks). When you pass network information, you need to think if it's the correct network for the code; for example you shouldn't use the selected network to generically fetch informations about an user but instead the network of this user.

### Network features

TODO: explain network features, why we have that concept, how to use them and how to define them

### IPFS

TODO: explain how to pin and retrieve files, ipfs:// uris vs cid, link to OptimizedImage, etc...

### Developer mode

TODO: explain how and why to use developer mode gating

### Handling currencies

TODO: talk about how an amount is defined, how it should be handled, displayed, etc...

### Cross-platform 

TODO: talk about the proper ways to make platform-specific code and common pitfalls coming from web-only

### Handling client-provided data

TODO: why and how all user-generated stuff must be validated

### Type-safety and linting

TODO: explain the importance of type-safety and linters, why ignore rules are bad and in what cases you can use them

### Implement an UI

TODO: explain how to properly take a figma and turn it into code

### Nested scroll

TODO: explain nested scrolling patterns

### GridList

TODO: explain how and when to use GridList

### Image proxy

TODO: explain what is the image proxy, why it's here and how to use it

### OptimizedImage

TODO: explain how and when to use OptimizedImage

### Handling users

TODO: explain userid, showcase components used to render username, avatar, etc..

### Handling nfts

TODO: explain nftid, collectionid, showcase components used to render collections and nfts, explain indexed vs on-chain data

### App modes

TODO: explain app modes