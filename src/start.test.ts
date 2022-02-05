import { Hasher } from './hasher';
import MerkelTree, { IMerkelTree } from './MerkleTree';

describe('As a Sorare hiring manager', () => {
    describe('I want to test Lionnel DUPOUY', () => {
        describe('Given a Merkle tree', () => {
            let angela: IMerkelTree;
            /* I stub the hash function as a almost noop one 
                in order to avoid hashing during test
            */
            const h: Hasher = s => 'H'+s
            
            describe('with an even list of values', () => {
                let dummyStrings: string[];
                beforeAll(() => {
                    angela = new MerkelTree(h);
                    dummyStrings = ['Alice', 'Bob', 'Carol', 'Carlos'];
                    angela.createTree(dummyStrings);
                })

                test('should returns an array containing the hash of the given level', () => {
                    expect(angela.level(0).length).toEqual(4);
                    expect(angela.level(1).length).toEqual(4);
                    expect(angela.level(2).length).toEqual(2);
                    expect(angela.level(3).length).toEqual(1);
                });

                test('should returns the number of levels of the tree', () => {
                    expect(angela.height()).toEqual(4);
                });

                test('should returns the Merkle root of the tree', () => {
                    expect(angela.level(4)).toEqual(undefined);
                    expect(angela.level(3).length).toEqual(1);
                    expect(angela.level(3)[0]).toEqual(angela.root());
                });

                test('should have created properly the tree', () => {
                    const [alice, bob, carol, carlos] = dummyStrings;
                    for (let i = 0; i < dummyStrings.length; i++) {
                        expect(angela.level(0)[i]).toEqual(dummyStrings[i]);
                        expect(angela.level(1)[i]).toEqual(h(dummyStrings[i]));
                    }
                    expect(angela.level(2)[0]).toEqual(h(h(alice) + h(bob)));
                    expect(angela.level(2)[1]).toEqual(h(h(carol) + h(carlos)));
                    expect(angela.level(3)[0]).toEqual(h(h(h(alice) + h(bob)) + h(h(carol) + h(carlos))));
                });
            })
            describe('with an Odd list of values', () => {

                let dummyStrings: string[];
                beforeAll(() => {
                    dummyStrings = ['Alice', 'Bob', 'Carol', 'Carlos', 'Charlie'];
                    angela = new MerkelTree(h);
                    angela.createTree(dummyStrings);
                })

                test('should returns an array containing the hash of the given level', () => {
                    expect(angela.level(0).length).toEqual(5);
                    expect(angela.level(1).length).toEqual(5);
                    expect(angela.level(2).length).toEqual(3);
                    expect(angela.level(3).length).toEqual(2);
                    expect(angela.level(4).length).toEqual(1);
                });

                test('should returns the number of levels of the tree', () => {
                    expect(angela.height()).toEqual(5);
                });

                test('should returns the Merkle root of the tree', () => {
                    expect(angela.level(5)).toEqual(undefined);
                    expect(angela.level(4).length).toEqual(1);
                    expect(angela.level(4)[0]).toEqual(angela.root());
                });

                test('should have created properly the tree', () => {
                    const [alice, bob, carol, carlos, charlie] = dummyStrings;
                    for (let i = 0; i < dummyStrings.length; i++) {
                        expect(angela.level(0)[i]).toEqual(dummyStrings[i]);
                        expect(angela.level(1)[i]).toEqual(h(dummyStrings[i]));
                    }
                    expect(angela.level(2)[0]).toEqual(h(h(alice) + h(bob)));
                    expect(angela.level(2)[1]).toEqual(h(h(carol) + h(carlos)));
                    expect(angela.level(2)[2]).toEqual(h(charlie));
                    expect(angela.level(3)[0]).toEqual(h(h(h(alice) + h(bob)) + h(h(carol) + h(carlos))));
                    expect(angela.level(3)[1]).toEqual(h(charlie));
                    expect(angela.level(4)[0]).toEqual(h(h(h(h(alice) + h(bob)) + h(h(carol) + h(carlos))) + h(charlie)));
                });
            })
        })
    })
})