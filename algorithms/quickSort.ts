/**
 * Quick Sort Algorithm Implementation
 * Time Complexity: O(n log n) average, O(n²) worst case
 * Space Complexity: O(log n)
 */

import { SortStep } from './types';

export const quickSort = async function* (array: number[]): AsyncGenerator<SortStep, void, unknown> {
  const arr = [...array];
  
  async function* quickSortHelper(low: number, high: number): AsyncGenerator<SortStep, void, unknown> {
    if (low < high) {
      // Partition the array
      const pivotIndex = yield* partition(low, high);
      
      // Recursively sort elements before and after partition
      yield* quickSortHelper(low, pivotIndex - 1);
      yield* quickSortHelper(pivotIndex + 1, high);
    }
  }

  async function* partition(low: number, high: number): AsyncGenerator<SortStep, number, unknown> {
    const pivot = arr[high];
    let i = low - 1;

    yield {
      type: 'pivot',
      indices: [high],
      array: [...arr],
      description: `Selecting pivot: ${pivot}`
    };

    for (let j = low; j < high; j++) {
      yield {
        type: 'compare',
        indices: [j, high],
        array: [...arr],
        description: `Comparing ${arr[j]} with pivot ${pivot}`
      };

      if (arr[j] < pivot) {
        i++;
        
        if (i !== j) {
          yield {
            type: 'swap',
            indices: [i, j],
            array: [...arr],
            description: `Swapping ${arr[i]} and ${arr[j]}`
          };

          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
      }
    }

    // Place pivot in correct position
    yield {
      type: 'swap',
      indices: [i + 1, high],
      array: [...arr],
      description: `Placing pivot ${pivot} in correct position`
    };

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

    yield {
      type: 'partition',
      indices: [i + 1],
      array: [...arr],
      description: `Pivot ${pivot} is now in correct position`
    };

    return i + 1;
  }

  yield* quickSortHelper(0, arr.length - 1);

  // Mark all elements as sorted
  for (let i = 0; i < arr.length; i++) {
    yield {
      type: 'sorted',
      indices: [i],
      array: [...arr],
      description: `Array is sorted`
    };
  }
};
