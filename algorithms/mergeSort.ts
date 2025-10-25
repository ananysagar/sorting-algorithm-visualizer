/**
 * Merge Sort Algorithm Implementation
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */

import { SortStep } from './types';

export const mergeSort = async function* (array: number[]): AsyncGenerator<SortStep, void, unknown> {
  const arr = [...array];
  
  async function* mergeSortHelper(left: number, right: number): AsyncGenerator<SortStep, void, unknown> {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      
      yield {
        type: 'divide',
        indices: [left, mid, right],
        array: [...arr],
        description: `Dividing array from ${left} to ${right}`
      };

      // Sort left half
      yield* mergeSortHelper(left, mid);
      
      // Sort right half
      yield* mergeSortHelper(mid + 1, right);
      
      // Merge the two halves
      yield* merge(left, mid, right);
    }
  }

  async function* merge(left: number, mid: number, right: number): AsyncGenerator<SortStep, void, unknown> {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;

    yield {
      type: 'merge',
      indices: [left, right],
      array: [...arr],
      description: `Merging subarrays from ${left} to ${right}`
    };

    while (i < leftArr.length && j < rightArr.length) {
      yield {
        type: 'compare',
        indices: [left + i, mid + 1 + j],
        array: [...arr],
        description: `Comparing ${leftArr[i]} and ${rightArr[j]}`
      };

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      
      yield {
        type: 'merge',
        indices: [k],
        array: [...arr],
        description: `Placing ${arr[k]} at position ${k}`
      };
      
      k++;
    }

    // Copy remaining elements
    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      yield {
        type: 'merge',
        indices: [k],
        array: [...arr],
        description: `Placing remaining ${arr[k]} at position ${k}`
      };
      i++;
      k++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      yield {
        type: 'merge',
        indices: [k],
        array: [...arr],
        description: `Placing remaining ${arr[k]} at position ${k}`
      };
      j++;
      k++;
    }
  }

  yield* mergeSortHelper(0, arr.length - 1);

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
