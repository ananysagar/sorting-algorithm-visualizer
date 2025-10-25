/**
 * Algorithm exports and types
 */

export type { SortStep, AlgorithmType } from './types';

import { bubbleSort } from './bubbleSort';
import { selectionSort } from './selectionSort';
import { insertionSort } from './insertionSort';
import { mergeSort } from './mergeSort';
import { quickSort } from './quickSort';
import { heapSort } from './heapSort';
import { radixSort } from './radixSort';

export { bubbleSort, selectionSort, insertionSort, mergeSort, quickSort, heapSort, radixSort };

export const algorithms = {
  bubble: bubbleSort,
  selection: selectionSort,
  insertion: insertionSort,
  merge: mergeSort,
  quick: quickSort,
  heap: heapSort,
  radix: radixSort
} as const;
