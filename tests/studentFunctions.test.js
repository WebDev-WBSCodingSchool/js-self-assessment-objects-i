import { test, expect } from '@playwright/test';
import { destructureCuckoo, getDaysUntilHalloween, pickRandomElement } from '../src/studentFunctions.js';

test.describe('pickRandomElement()', () => {
  test.skip(
    pickRandomElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) === 'NOT IMPLEMENTED',
    'pickRandomElement() is not implemented'
  );
  const cases = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [], ['Cheesecake Smurfs', 123, 'Noisette', 'Vanilla', Math.PI, null]];

  for (let i = 0; i < cases.length; i++) {
    test(`Returns random element - Case ${i + 1}`, () => {
      const actuals = Array.from({ length: 42 }).map(() => pickRandomElement(cases[i]));
      if (cases[i].length < 2) {
        expect(actuals[0]).toBe(cases[i][0]);
        expect(actuals.every((val, _, arr) => val === arr[0])).toBe(true);
      } else {
        expect(actuals.every((val) => cases[i].includes(val))).toBe(true);
        expect(actuals.every((val, _, arr) => val === arr[0])).toBe(false);
      }
    });
  }

  test('should return undefined for an empty array', () => {
    expect(pickRandomElement([])).toBeUndefined();
  });

  test('should return the single element for a single-element array', () => {
    expect(pickRandomElement(['a'])).toBe('a');
    expect(pickRandomElement([42])).toBe(42);
    expect(pickRandomElement([null])).toBeNull();
  });

  const multiElementCases = [
    { name: 'Numbers', input: [1, 2, 3, 4, 5] },
    { name: 'Mixed Types', input: ['Cheesecake', 123, null, true, Math.PI] },
    { name: 'Two Elements', input: ['heads', 'tails'] },
  ];

  for (const testCase of multiElementCases) {
    test.describe(`with multiple elements (${testCase.name})`, () => {
      const inputArray = testCase.input;
      const iterations = 100 * inputArray.length;
      const results = new Set();
      let allResultsInInput = true;

      for (let i = 0; i < iterations; i++) {
        const result = pickRandomElement(inputArray);
        results.add(result);
        if (!inputArray.includes(result)) {
          allResultsInInput = false;
        }
      }

      test(`should always return an element contained within the input array (checked over ${iterations} iterations)`, () => {
        expect(allResultsInInput).toBe(true);
      });

      test(`should return multiple different elements over ${iterations} iterations`, () => {
        expect(results.size).toBeGreaterThan(1);
      });

      test(`should eventually return all possible elements over ${iterations} iterations (probabilistic)`, () => {
        expect(results.size).toBe(inputArray.length);
      });
    });
  }
});

test.describe('getDaysUntilHalloween()', () => {
  test.skip(getDaysUntilHalloween('2025-10-29') === 'NOT IMPLEMENTED', 'getDaysUntilHalloween() is not implemented');
  const cases = [
    ['2025-10-29', 2],
    ['1999-10-31', 0],
    ['2025-10-31', 0],
    ['2024-10-30', 1],
    ['2025-10-30', 1],
    ['2024-10-01', 30],
    ['2025-10-01', 30],
    ['2024-01-01', 304],
    ['2025-01-01', 303],
    ['2025-11-01', 364],
    ['2024-12-31', 304],
    ['2025-12-31', 304],
    ['2024-02-29', 245],
  ];

  for (const [c, expected] of cases) {
    test(`${c} -> ${expected}`, () => {
      expect(getDaysUntilHalloween(c)).toBe(expected);
    });
  }
});

test.describe('destructureCuckoo()', () => {
  test.skip(
    destructureCuckoo({
      twigs: {
        twigs: {
          twigs: {
            cuckoo: 2,
            other: 'stuff',
          },
        },
      },
    }) === 'NOT IMPLEMENTED',
    'destructureCuckoo() is not implemented'
  );
  const cases = [
    {
      description: 'Original nest structure',
      input: {
        twigs: {
          moss: 'moss',
          twigs: {
            feathers: 'warm',
            twigs: {
              feathers: 'warm',
              egg: 1,
              reedWarbler: 'unhatched',
              cuckoo: 'big and hungry',
            },
            moss: 'moss',
          },
        },
      },
      expected: 'big and hungry',
    },

    {
      description: 'Nest with a different string for cuckoo',
      input: {
        twigs: {
          twigs: {
            twigs: {
              cuckoo: 'just an egg',
            },
          },
        },
      },
      expected: 'just an egg',
    },

    {
      description: 'Nest where cuckoo value is null',
      input: {
        twigs: {
          twigs: {
            twigs: {
              cuckoo: null,
            },
          },
        },
      },
      expected: null,
    },

    {
      description: 'Nest where cuckoo value is a number',
      input: {
        twigs: {
          twigs: {
            twigs: {
              cuckoo: 2,
              other: 'stuff',
            },
          },
        },
      },
      expected: 2,
    },

    {
      description: "Nest structure exists, but 'cuckoo' key is missing",
      input: {
        twigs: {
          twigs: {
            twigs: {
              feathers: 'warm',
              egg: 1,
            },
          },
        },
      },
      expected: undefined,
    },

    {
      description: 'Minimal structure containing the cuckoo',
      input: {
        twigs: {
          twigs: {
            twigs: {
              cuckoo: 'minimal',
            },
          },
        },
      },
      expected: 'minimal',
    },
  ];

  for (const { description, input, expected } of cases) {
    test(`${description} -> ${expected}`, () => {
      expect(destructureCuckoo(input)).toBe(expected);
    });
  }

  const errorCases = [
    {
      description: 'Empty object (will cause TypeError)',
      input: {},
    },
    {
      description: "Missing intermediate 'twigs' (will cause TypeError)",
      input: {
        twigs: {
          moss: 'moss',
        },
      },
    },
    {
      description: "Missing final 'twigs' object (will cause TypeError)",
      input: {
        twigs: {
          twigs: {
            feathers: 'warm',
          },
        },
      },
    },
  ];

  for (const { description, input } of errorCases) {
    test(description, () => {
      expect(destructureCuckoo(input)).toBeUndefined();
    });
  }
});
