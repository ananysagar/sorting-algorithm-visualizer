/**
 * Radix Sort Algorithm Implementation
 * Time Complexity: O(dn) where d is the number of digits
 * Space Complexity: O(n)
 */

import { SortStep } from './types';

export const radixSort = async function* (array: number[]): AsyncGenerator<SortStep, void, unknown> {
  const arr = [...array];
  const n = arr.length;
  
  // Find the maximum number to know number of digits
  const maxNum = Math.max(...arr);
  const maxDigits = Math.floor(Math.log10(maxNum)) + 1;

  yield {
    type: 'digit',
    indices: [],
    array: [...arr],
    description: `Maximum number is ${maxNum}, sorting by ${maxDigits} digits`
  };

  // Do counting sort for every digit
  for (let exp = 1; Math.floor(maxNum / exp) > 0; exp *= 10) {
    yield {
      type: 'digit',
      indices: [],
      array: [...arr],
      description: `Sorting by digit at position ${Math.floor(Math.log10(exp)) + 1}`
    };

    yield* countingSort(arr, n, exp);
  }

  // Mark all elements as sorted
  for (let i = 0; i < n; i++) {
    yield {
      type: 'sorted',
      indices: [i],
      array: [...arr],
      description: `Array is sorted`
    };
  }

  async function* countingSort(arr: number[], n: number, exp: number): AsyncGenerator<SortStep, void, unknown> {
    const output = new Array(n);
    const count = new Array(10).fill(0);

    // Store count of occurrences in count[]
    for (let i = 0; i < n; i++) {
      const digit = Math.floor(arr[i] / exp) % 10;
      count[digit]++;
      
      yield {
        type: 'count',
        indices: [i],
        array: [...arr],
        description: `Counting digit ${digit} for element ${arr[i]}`
      };
    }

    // Change count[i] so that count[i] now contains actual position
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    // Build the output array
    for (let i = n - 1; i >= 0; i--) {
      const digit = Math.floor(arr[i] / exp) % 10;
      const position = count[digit] - 1;
      
      output[position] = arr[i];
      count[digit]--;

      yield {
        type: 'distribute',
        indices: [i, position],
        array: [...arr],
        description: `Placing ${arr[i]} at position ${position} based on digit ${digit}`
      };
    }

    // Copy the output array to arr[]
    for (let i = 0; i < n; i++) {
      arr[i] = output[i];
      
      yield {
        type: 'distribute',
        indices: [i],
        array: [...arr],
        description: `Updating array with sorted elements`
      };
    }
  }
};
