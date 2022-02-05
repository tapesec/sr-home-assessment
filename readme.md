# Merkle tree assessment

## Install the project

You will need to have `node.js` installed on your local machine (the current LTS is ok)

Clone the project then from the root folder of the project ..

```shell
npm install
```

If you want to run test:

```shell
npm run test
```

Run the project:

```shell
npm start
```

It will build the source and put it in the built folder then it will run built/start.js with node.js

You will see few output in the console

The code entrypoint is located in src > start.ts

## Additional questions

_Using the illustration above, let’s assume I know the whole Merkle tree. Someone gives me the L2 data block but I don’t trust them. How can I check if L2 data is valid ?_

From the initial position of the L2 block hash the provided data L2 block then hash it with it's neighbors (if he has one) and continue this way with the level up until reaching the top of the tree. If the value of the result hash is equal to the initial root tree then the provided value is not corrupted.

_I know only the L3 data block and the Merkle root. What is the minimum information needed to check that the L3 data block and the Merkle root belong to the same Merkle tree?_

You need to know the initial position of L3 block in the lowest level of the tree.
Then you will have to check if he has an imediate neighbors with whom perform a first hash merge as the result of the upper node. It will depends of his position and if the tree is balanced or not.

_What are some Merkle tree use cases ?_

Merkle trees are used in distributed system. For instance, Apache Cassandra uses it to detect inconsistencies between replicas of entire databases.

Obviously in the blockchain in order to check transactions on each block node.

One of the advantage of a merkle tree is the capability to prune it to a strict needed subpart in order to save space.

ZFS is a form of distributed file system, it is advertised as using Merkle trees to ensure data integrity. The data is stored as blocks of specific size. These blocks are kind of leafs for building a Merkle tree.
