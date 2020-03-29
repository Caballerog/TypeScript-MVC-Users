import { ExerciseToken } from './exercise.model';

export const sampleGameTokens : ExerciseToken[] = [
    {
        id: '001',
        token: 'for',
        type: 'keyword',
        cost: 0.15
    },
    {
        id: '002',
        token: '(',
        type: 'symbol',
        cost: 0.05
    },
    {
        id: '003',
        token: 'x',
        type: 'identifier',
        cost: 0.10
    },
    {
        id: '004',
        token: '=',
        type: 'symbol',
        cost: 0.05
    },
    {
        id: '005',
        token: '1',
        type: 'literal',
        cost: 0.10
    },
    {
        id: '006',
        token: ';',
        type: 'symbol',
        cost: 0.05
    },
    {
        id: '007',
        token: 'x',
        type: 'identifier',
        cost: 0.10
    },
    {
        id: '008',
        token: '<=',
        type: 'operator',
        cost: 0.10
    },
    {
        id: '009',
        token: '10',
        type: 'literal',
        cost: 0.10
    },
    {
        id: '010',
        token: ';',
        type: 'symbol',
        cost: 0.05
    },
    {
        id: '011',
        token: 'x',
        type: 'identifier',
        cost: 0.10
    },
    {
        id: '012',
        token: '++',
        type: 'operator',
        cost: 0.10
    },
    {
        id: '013',
        token: ')',
        type: 'symbol',
        cost: 0.05
    },
    {
        id: '014',
        token: 'console',
        type: 'keyword',
        cost: 0.15
    },
    {
        id: '015',
        token: '.',
        type: 'symbol',
        cost: 0.05
    },
    {
        id: '017',
        token: 'log',
        type: 'keyword',
        cost: 0.15
    },
    {
        id: '018',
        token: '(',
        type: 'symbol',
        cost: 0.05
    },
    {
        id: '019',
        token: 'x',
        type: 'identifier',
        cost: 0.10
    },
    {
        id: '020',
        token: ')',
        type: 'symbol',
        cost: 0.05
    },
    {
        id: '021',
        token: ';',
        type: 'symbol',
        cost: 0.05
    }
]