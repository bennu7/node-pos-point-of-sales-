import * as TestFunction from "./sum";

const { sum } = jest.requireActual<typeof TestFunction>("./sum.ts");

const successCaes = [
    {
        id: 0,
        input: { a: 1, b: 2 },
        output: 3,
    },
    {
        id: 1,
        input: { a: 4, b: 2 },
        output: 6,
    },
    {
        id: 3,
        input: { a: 5, b: 2 },
        output: 7,
    },
    {
        id: 4,
        input: { a: 10, b: 2 },
        output: 12,
    },
    {
        id: 5,
        input: { a: 111, b: 2 },
        output: 113,
    },
];

describe("\n\t>>Test sum function with success cases<<", () => {
    // it.each(successCaes)("Test case %#: %p", ({ input, output }) => {
    it.each(successCaes)("Test case $id with $input", ({ input, output }) => {
        // expect(sum(input.a, input.b)).toBe(output);
        const { a, b } = input;

        expect(sum(a, b)).toBe(output);
    });
});