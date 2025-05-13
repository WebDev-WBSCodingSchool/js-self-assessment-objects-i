import { test, expect } from '@playwright/test';
import { destructureCuckoo, getDaysUntilHalloween, pickRandomElement } from '../src/studentFunctions.js';

test.describe('pickRandomElement()', () => {
  test.skip(pickRandomElement() === 'NOT IMPLEMENTED', 'pickRandomElement() is not implemented');
  const cases = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [], ['Cheescake Smurfs', 123, 'Noisette', 'Vanilla', Math.PI, null]];

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
      const iterations = 100 * inputArray.length; // More iterations, scaled by array size
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
        // This check runs after the loop finishes
        expect(allResultsInInput).toBe(true);
      });

      test(`should return multiple different elements over ${iterations} iterations`, () => {
        // Expect more than 1 unique result if the input array has more than 1 element
        expect(results.size).toBeGreaterThan(1);
      });

      // More advanced: Check if *all* elements were likely returned
      test(`should eventually return all possible elements over ${iterations} iterations (probabilistic)`, () => {
        // Note: This test can still be flaky, especially if iterations is too low
        // or the array is very large. Use with caution.
        expect(results.size).toBe(inputArray.length);
      });

      // Basic Distribution Check (Optional and can be flaky)
      test(`should have a reasonably uniform distribution over ${iterations} iterations (probabilistic)`, () => {
        const counts = {};
        inputArray.forEach((el) => (counts[String(el)] = 0)); // Use string keys for objects
        const runResults = Array.from({ length: iterations }).map(() => pickRandomElement(inputArray));

        runResults.forEach((res) => {
          if (counts[String(res)] !== undefined) {
            counts[String(res)]++;
          }
        });

        const expectedCount = iterations / inputArray.length;
        const tolerance = expectedCount * 0.5; // Allow 50% deviation (adjust as needed)

        inputArray.forEach((el) => {
          expect(counts[String(el)]).toBeGreaterThan(expectedCount - tolerance);
          expect(counts[String(el)]).toBeLessThan(expectedCount + tolerance);
        });
        // Note: Proper statistical tests (like Chi-squared) are more rigorous but complex for unit tests.
      });
    });
  }
});

test.describe('getDaysUntilHalloween()', () => {
  test.skip(getDaysUntilHalloween() === 'NOT IMPLEMENTED', 'getDaysUntilHalloween() is not implemented');
  const cases = [
    ['2025-10-29', 2],
    ['1999-10-31', 0],
    ['2025-10-31', 0],
    ['2024-10-30', 1], // Day before Halloween (Leap Year)
    ['2025-10-30', 1], // Day before Halloween (Normal Year)
    ['2024-10-01', 30], // Start of October (Leap Year)
    ['2025-10-01', 30], // Start of October (Normal Year)
    ['2024-01-01', 304], // Start of Leap Year
    ['2025-01-01', 303], // Start of Normal Year
    ['2025-11-01', 364], // Date after Halloween
    ['2024-12-31', 304], // End of year, after Halloween (Leap Year)
    ['2025-12-31', 304], // End of year, after Halloween (Normal Year)
    ['2024-02-29', 245], // Leap day
  ];

  for (const [c, expected] of cases) {
    test(`${c} -> ${expected}`, () => {
      expect(getDaysUntilHalloween(c)).toBe(expected);
    });
  }
});

test.describe('destructureCuckoo()', () => {
  test.skip(destructureCuckoo() === 'NOT IMPLEMENTED', 'destructureCuckoo() is not implemented');
  const cases = [
    // --- Case 1: Original provided nest ---
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
              cuckoo: 'big and hungry', // Target value
            },
            moss: 'moss',
          },
        },
      },
      expected: 'big and hungry',
    },

    // --- Case 2: Different cuckoo value (string) ---
    {
      description: 'Nest with a different string for cuckoo',
      input: {
        twigs: {
          twigs: {
            twigs: {
              cuckoo: 'just an egg', // Different value
            },
          },
        },
      },
      expected: 'just an egg',
    },

    // --- Case 3: Cuckoo value is null ---
    {
      description: 'Nest where cuckoo value is null',
      input: {
        twigs: {
          twigs: {
            twigs: {
              cuckoo: null, // Null value
            },
          },
        },
      },
      expected: null,
    },

    // --- Case 4: Cuckoo value is a number ---
    {
      description: 'Nest where cuckoo value is a number',
      input: {
        twigs: {
          twigs: {
            twigs: {
              cuckoo: 2, // Numeric value
              other: 'stuff',
            },
          },
        },
      },
      expected: 2,
    },

    // --- Case 5: Missing 'cuckoo' key at the final level ---
    {
      description: "Nest structure exists, but 'cuckoo' key is missing",
      input: {
        twigs: {
          twigs: {
            twigs: {
              // cuckoo key is absent
              feathers: 'warm',
              egg: 1,
            },
          },
        },
      },
      expected: undefined, // Accessing a non-existent property results in undefined
    },

    // --- Case 6: Minimal valid structure ---
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
