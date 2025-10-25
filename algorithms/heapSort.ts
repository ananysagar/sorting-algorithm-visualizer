/**
 * Heap Sort Algorithm Implementation
 * Time Complexity: O(n log n)
 * Space Complexity: O(1)
 */

import { SortStep } from './types';

export const heapSort = async function* (array: number[]): AsyncGenerator<SortStep, void, unknown> {
  const arr = [...array];
  const n = arr.length;

  // Build max heap
  yield {
    type: 'build-heap',
    indices: [],
    array: [...arr],
    description: 'Building max heap'
  };

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(n, i);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    yield {
      type: 'swap',
      indices: [0, i],
      array: [...arr],
      description: `Moving max element ${arr[0]} to position ${i}`
    };

    [arr[0], arr[i]] = [arr[i], arr[0]];

    // Mark the element as sorted
    yield {
      type: 'sorted',
      indices: [i],
      array: [...arr],
      description: `Element ${arr[i]} is in correct position`
    };

    // Call heapify on the reduced heap
    yield* heapify(i, 0);
  }

  // Mark the last element as sorted
  yield {
    type: 'sorted',
    indices: [0],
    array: [...arr],
    description: `Array is sorted`
  };

  async function* heapify(size: number, root: number): AsyncGenerator<SortStep, void, unknown> {
    let largest = root;
    const left = 2 * root + 1;
    const right = 2 * root + 2;

    // Compare root with left child
    if (left < size) {
      yield {
        type: 'compare',
        indices: [largest, left],
        array: [...arr],
        description: `Comparing ${arr[largest]} with left child ${arr[left]}`
      };

      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    // Compare largest with right child
    if (right < size) {
      yield {
        type: 'compare',
        indices: [largest, right],
        array: [...arr],
        description: `Comparing ${arr[largest]} with right child ${arr[right]}`
      };

      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    // If largest is not root
    if (largest !== root) {
      yield {
        type: 'swap',
        indices: [root, largest],
        array: [...arr],
        description: `Swapping ${arr[root]} and ${arr[largest]}`
      };

      [arr[root], arr[largest]] = [arr[largest], arr[root]];

      yield {
        type: 'heapify',
        indices: [largest],
        array: [...arr],
        description: `Heapifying subtree rooted at ${largest}`
      };

      // Recursively heapify the affected sub-tree
      yield* heapify(size, largest);
    }
  }
};
