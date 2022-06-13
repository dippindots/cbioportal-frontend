import {
    addClause,
    defaultNodeFields,
    performSearchSingle,
    removeClause,
    toQueryString,
} from 'shared/lib/query/textQueryUtils';
import { CancerTreeNode } from 'shared/components/query/CancerStudyTreeData';
import {
    AndSearchClause,
    ISearchClause,
    NotSearchClause,
} from 'shared/components/query/SearchClause';
import _ from 'lodash';
import { QueryParser } from 'shared/lib/query/QueryParser';

describe('textQueryUtils', () => {
    const parser = new QueryParser();
    const referenceGenomeFields = parser.searchFilters.find(
        f => f.phrasePrefix === 'reference-genome'
    )!.nodeFields;

    describe('performSearchSingle', () => {
        it('matches study by single conjunctive clause', () => {
            const expected = { match: true, forced: false };
            const clauses: ISearchClause[] = [
                new AndSearchClause([
                    {
                        phrase: 'match',
                        fields: defaultNodeFields,
                        textRepresentation: 'match',
                    },
                ]),
            ];
            const studyNode = { name: 'match' } as CancerTreeNode;
            const result = performSearchSingle(clauses, studyNode);
            expect(result).toEqual(expected);
        });

        it('matches study by single negative clause', () => {
            const expected = { match: true, forced: false };
            const clauses: ISearchClause[] = [
                new NotSearchClause({
                    phrase: 'no-match',
                    fields: defaultNodeFields,
                    textRepresentation: '- no-match',
                }),
            ];
            const studyNode = { name: 'match' } as CancerTreeNode;
            const result = performSearchSingle(clauses, studyNode);
            expect(result).toEqual(expected);
        });

        it('does not match study when conjunctive clause does not match', () => {
            const expected = { match: false, forced: false };
            const clauses: ISearchClause[] = [
                new AndSearchClause([
                    {
                        phrase: 'no-match',
                        fields: defaultNodeFields,
                        textRepresentation: 'no-match',
                    },
                ]),
            ];
            const studyNode = {
                description: 'foo match bar',
            } as CancerTreeNode;
            const result = performSearchSingle(clauses, studyNode);
            expect(result).toEqual(expected);
        });

        it('does not match study when negative clause matches (forced match)', () => {
            const expected = { match: false, forced: true };
            const clauses: ISearchClause[] = [
                new NotSearchClause({
                    phrase: 'match',
                    fields: defaultNodeFields,
                    textRepresentation: '- match',
                }),
            ];
            const studyNode = { studyId: 'match' } as CancerTreeNode;
            const result = performSearchSingle(clauses, studyNode);
            expect(result).toEqual(expected);
        });

        it('matches study by reference genome clause', () => {
            const expected = { match: true, forced: false };
            const clauses: ISearchClause[] = [
                new AndSearchClause([
                    {
                        textRepresentation: 'reference-genome:hg2000',
                        phrase: 'hg2000',
                        fields: referenceGenomeFields,
                    },
                ]),
            ];

            const studyNode = { referenceGenome: 'hg2000' } as CancerTreeNode;
            const result = performSearchSingle(clauses, studyNode);
            expect(result).toEqual(expected);
        });

        it('does not match study when reference genome clause differs', () => {
            const expected = { match: false, forced: false };
            const clauses: ISearchClause[] = [
                new AndSearchClause([
                    {
                        textRepresentation: 'reference-genome:hg2000',
                        phrase: 'hg2000',
                        fields: referenceGenomeFields,
                    },
                ]),
            ];
            const studyNode = { referenceGenome: 'hg42' } as CancerTreeNode;
            const result = performSearchSingle(clauses, studyNode);
            expect(result).toEqual(expected);
        });

        it('does not match study when negative reference-genome clause matches (forced match)', () => {
            const expected = { match: false, forced: true };
            const clauses: ISearchClause[] = [
                new NotSearchClause({
                    phrase: 'hg2000',
                    fields: referenceGenomeFields,
                    textRepresentation: '- reference-genome:hg2000',
                }),
            ];
            const studyNode = { referenceGenome: 'hg2000' } as CancerTreeNode;
            const result = performSearchSingle(clauses, studyNode);
            expect(result).toEqual(expected);
        });

        it('matches with mix of negative, conjunctive and reference genome clauses', () => {
            const expected = { match: true, forced: false };
            const clauses: ISearchClause[] = [
                new AndSearchClause([
                    {
                        phrase: 'match1',
                        fields: defaultNodeFields,
                        textRepresentation: 'match1',
                    },
                    {
                        phrase: 'hg2000',
                        fields: referenceGenomeFields,
                        textRepresentation: 'reference-genome:hg2000',
                    },
                ]),
                new NotSearchClause({
                    phrase: 'no-match-4',
                    fields: defaultNodeFields,
                    textRepresentation: '- no-match-4',
                }),
                new AndSearchClause([
                    {
                        phrase: 'part5a part5b',
                        fields: defaultNodeFields,
                        textRepresentation: '"part5a part5b"',
                    },
                    {
                        phrase: 'part6',
                        fields: defaultNodeFields,
                        textRepresentation: 'part6',
                    },
                ]),
            ];
            const studyNode = {
                name: 'match1',
                description: 'match5a match5b',
                studyId: 'match6',
                referenceGenome: 'hg2000',
            } as CancerTreeNode;
            const result = performSearchSingle(clauses, studyNode);
            expect(result).toEqual(expected);
        });

        it('matches when only one of two phrases in OR-query matches', () => {
            const clauses = parser.parseSearchQuery(
                'reference-genome:hg19 or reference-genome:hg38'
            );
            const studyNodes = [
                { referenceGenome: 'hg19' },
                { referenceGenome: 'hg38' },
            ] as CancerTreeNode[];

            const result = studyNodes.map(n => performSearchSingle(clauses, n));
            const expected = [
                { match: true, forced: false },
                { match: true, forced: false },
            ];
            expect(result).toEqual(expected);
        });
        it('does not match when only one of two phrases in query matches', () => {
            const clauses = parser.parseSearchQuery(
                'reference-genome:hg19 reference-genome:hg38'
            );
            const studyNodes = [
                { referenceGenome: 'hg19' },
                { referenceGenome: 'hg38' },
            ] as CancerTreeNode[];

            const result = studyNodes.map(n => performSearchSingle(clauses, n));
            const expected = [
                { match: false, forced: false },
                { match: false, forced: false },
            ];
            expect(result).toEqual(expected);
        });
    });

    describe('addClause', () => {
        it('should add clause to query', () => {
            const query: ISearchClause[] = [
                new AndSearchClause([
                    {
                        textRepresentation: 'part1',
                        phrase: 'part1',
                        fields: defaultNodeFields,
                    },
                ]),
            ];
            const toAdd = new AndSearchClause([
                {
                    textRepresentation: 'part2',
                    phrase: 'part2',
                    fields: defaultNodeFields,
                },
            ]);
            const expected = [...query];
            expected.push(toAdd);
            const result = addClause(toAdd, query);
            expect(result).toEqual(expected);
        });

        it('should remove inverse phrase when adding not-clause', () => {
            const part1 = {
                textRepresentation: 'part1',
                phrase: 'part1',
                fields: defaultNodeFields,
            };
            const part2 = {
                textRepresentation: 'part2',
                phrase: 'part2',
                fields: defaultNodeFields,
            };
            const query: ISearchClause[] = [
                new AndSearchClause([part1, part2]),
            ];
            const toAdd = new NotSearchClause(part1);
            const expected = [new AndSearchClause([part2]), toAdd];
            const result = addClause(toAdd, query);
            expect(result).toEqual(expected);
        });

        it('should remove inverse phrase when adding and-phrase', () => {
            const part1 = {
                textRepresentation: 'part1',
                phrase: 'part1',
                fields: defaultNodeFields,
            };
            const part2 = {
                textRepresentation: 'part2',
                phrase: 'part2',
                fields: defaultNodeFields,
            };
            const query: ISearchClause[] = [new NotSearchClause(part1)];
            const toAdd = new AndSearchClause([part1, part2]);
            const expected = [toAdd];
            const result = addClause(toAdd, query);
            expect(result).toEqual(expected);
        });

        it('should not add when clause already exists', () => {
            const query: ISearchClause[] = [
                new AndSearchClause([
                    {
                        textRepresentation: 'part1',
                        phrase: 'part1',
                        fields: defaultNodeFields,
                    },
                ]),
            ];
            const toAdd = new AndSearchClause([
                {
                    textRepresentation: 'part1',
                    phrase: 'part1',
                    fields: defaultNodeFields,
                },
            ]);
            const expected = [...query];
            const result = addClause(toAdd, query);
            expect(result).toEqual(expected);
        });

        it('should remove existing phrases', () => {
            let part1 = {
                textRepresentation: 'part1',
                phrase: 'part1',
                fields: defaultNodeFields,
            };
            let part2 = {
                textRepresentation: 'part2',
                phrase: 'part2',
                fields: defaultNodeFields,
            };
            const query: ISearchClause[] = [new AndSearchClause([part1])];
            const toAdd = new AndSearchClause([part1, part2]);

            const result = addClause(toAdd, query);
            let expected = [toAdd];
            expect(toQueryString(result)).toEqual(toQueryString(expected));
        });
    });

    describe('removeClause', () => {
        it('should remove equal clause from query', () => {
            const query: ISearchClause[] = [
                new AndSearchClause([
                    {
                        textRepresentation: 'part1',
                        phrase: 'part1',
                        fields: defaultNodeFields,
                    },
                ]),
            ];
            const toRemove = _.clone(query[0]);
            const expected: ISearchClause[] = [];
            const result = removeClause(toRemove, query);
            expect(result).toEqual(expected);
        });

        it('should remove phrase from clause with multiple phrases', () => {
            let part1 = {
                textRepresentation: 'part1',
                phrase: 'part1',
                fields: defaultNodeFields,
            };
            let part2 = {
                textRepresentation: 'part2',
                phrase: 'part2',
                fields: defaultNodeFields,
            };
            const query = [new AndSearchClause([part1, part2])];
            const toRemove = new AndSearchClause([part1]);
            const expected = [new AndSearchClause([part2])];
            const result = removeClause(toRemove, query);
            expect(toQueryString(result)).toEqual(toQueryString(expected));
        });

        it('should remove not clause', () => {
            const query = [
                new NotSearchClause({
                    textRepresentation: 'part1',
                    phrase: 'part1',
                    fields: defaultNodeFields,
                }),
            ];
            const toRemove = _.clone(query[0]);
            const expected: ISearchClause[] = [];
            const result = removeClause(toRemove, query);
            expect(result).toEqual(expected);
        });
    });
});
