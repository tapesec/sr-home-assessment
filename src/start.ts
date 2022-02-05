import MerkelTree from "./MerkleTree";
import HashUtils from './hasher';

const angela = new MerkelTree(HashUtils);
angela.createTree(['Alice', 'Bob', 'Carol', 'Carlos', 'Charlie']);
console.log('internal tree representation:', angela);
console.log('level 2 content', angela.level(2));
console.log('tree height', angela.height());
console.log('tree root', angela.root());