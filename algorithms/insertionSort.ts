/**
 * Insertion Sort Algorithm Implementation
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 */

import { SortStep } from './types';

export const insertionSort = async function* (array: number[]): AsyncGenerator<SortStep, void, unknown> {
  const arr = [...array];
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    yield {
      type: 'compare',
      indices: [i],
      array: [...arr],
      description: `Selecting element ${key} to insert`
    };

    // Move elements greater than key one position ahead
    while (j >= 0 && arr[j] > key) {
      yield {
        type: 'compare',
        indices: [j, j + 1],
        array: [...arr],
        description: `Comparing ${arr[j]} and ${key}`
      };

      arr[j + 1] = arr[j];
      
      yield {
        type: 'shift',
        indices: [j, j + 1],
        array: [...arr],
        description: `Shifting ${arr[j]} to position ${j + 1}`
      };

      j--;
    }

    // Insert the key in its correct position
    arr[j + 1] = key;
    
    yield {
      type: 'insert',
      indices: [j + 1],
      array: [...arr],
      description: `Inserting ${key} at position ${j + 1}`
    };
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
};
