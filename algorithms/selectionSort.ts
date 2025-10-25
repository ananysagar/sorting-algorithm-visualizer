/**
 * Selection Sort Algorithm Implementation
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 */

import { SortStep } from './types';

export const selectionSort = async function* (array: number[]): AsyncGenerator<SortStep, void, unknown> {
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    
    // Find the minimum element in the remaining array
    for (let j = i + 1; j < n; j++) {
      yield {
        type: 'compare',
        indices: [minIdx, j],
        array: [...arr],
        description: `Comparing ${arr[minIdx]} and ${arr[j]}`
      };

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        
        yield {
          type: 'select',
          indices: [minIdx],
          array: [...arr],
          description: `New minimum found: ${arr[minIdx]}`
        };
      }
    }

    // Swap the minimum element with the first element
    if (minIdx !== i) {
      yield {
        type: 'swap',
        indices: [i, minIdx],
        array: [...arr],
        description: `Swapping ${arr[i]} and ${arr[minIdx]}`
      };

      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }

    // Mark the element as sorted
    yield {
      type: 'sorted',
      indices: [i],
      array: [...arr],
      description: `Element ${arr[i]} is in correct position`
    };
  }

  // Mark the last element as sorted
  yield {
    type: 'sorted',
    indices: [n - 1],
    array: [...arr],
    description: `Array is sorted`
  };
};
