/**
 * Bubble Sort Algorithm Implementation
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 */

import { SortStep } from './types';

export const bubbleSort = async function* (array: number[]): AsyncGenerator<SortStep, void, unknown> {
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      // Compare elements
      yield {
        type: 'compare',
        indices: [j, j + 1],
        array: [...arr],
        description: `Comparing ${arr[j]} and ${arr[j + 1]}`
      };

      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
        
        yield {
          type: 'swap',
          indices: [j, j + 1],
          array: [...arr],
          description: `Swapping ${arr[j + 1]} and ${arr[j]}`
        };
      }
    }
    
    // Mark the last element as sorted
    yield {
      type: 'sorted',
      indices: [n - 1 - i],
      array: [...arr],
      description: `Element ${arr[n - 1 - i]} is in correct position`
    };

    // If no swaps occurred, array is sorted
    if (!swapped) {
      break;
    }
  }

  // Mark all remaining elements as sorted
  for (let i = 0; i < n; i++) {
    yield {
      type: 'sorted',
      indices: [i],
      array: [...arr],
      description: `Array is sorted`
    };
  }
};
