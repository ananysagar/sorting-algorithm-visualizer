/**
 * Common types for sorting algorithms
 */

export interface SortStep {
  type: string;
  indices: number[];
  array: number[];
  description: string;
}

export type AlgorithmType = 'bubble' | 'selection' | 'insertion' | 'merge' | 'quick' | 'heap' | 'radix';

