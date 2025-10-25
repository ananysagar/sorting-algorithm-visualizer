/**
 * Utility functions for array generation and manipulation
 */

export type ArrayType = 'random' | 'reversed' | 'nearly-sorted' | 'custom';

export interface ArrayGenerationOptions {
  size: number;
  type: ArrayType;
  customArray?: number[];
}

/**
 * Generate a random array of numbers
 */
export const generateRandomArray = (size: number): number[] => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
};

/**
 * Generate a reversed array (descending order)
 */
export const generateReversedArray = (size: number): number[] => {
  return Array.from({ length: size }, (_, i) => size - i);
};

/**
 * Generate a nearly sorted array with some random swaps
 */
export const generateNearlySortedArray = (size: number): number[] => {
  const array = Array.from({ length: size }, (_, i) => i + 1);
  
  // Randomly swap 10% of elements
  const swapCount = Math.floor(size * 0.1);
  for (let i = 0; i < swapCount; i++) {
    const index1 = Math.floor(Math.random() * size);
    const index2 = Math.floor(Math.random() * size);
    [array[index1], array[index2]] = [array[index2], array[index1]];
  }
  
  return array;
};

/**
 * Generate array based on type
 */
export const generateArray = (options: ArrayGenerationOptions): number[] => {
  const { size, type, customArray } = options;
  
  switch (type) {
    case 'random':
      return generateRandomArray(size);
    case 'reversed':
      return generateReversedArray(size);
    case 'nearly-sorted':
      return generateNearlySortedArray(size);
    case 'custom':
      return customArray || [];
    default:
      return generateRandomArray(size);
  }
};

/**
 * Validate custom array input
 */
export const validateCustomArray = (input: string): { isValid: boolean; array?: number[]; error?: string } => {
  try {
    const numbers = input.split(',').map(n => n.trim()).filter(n => n !== '');
    
    if (numbers.length === 0) {
      return { isValid: false, error: 'Array cannot be empty' };
    }
    
    if (numbers.length > 200) {
      return { isValid: false, error: 'Array size cannot exceed 200' };
    }
    
    const array = numbers.map(n => {
      const num = parseInt(n, 10);
      if (isNaN(num) || num < 1 || num > 1000) {
        throw new Error(`Invalid number: ${n}`);
      }
      return num;
    });
    
    return { isValid: true, array };
  } catch (error) {
    return { isValid: false, error: 'Invalid array format. Use comma-separated numbers (1-1000)' };
  }
};

/**
 * Get array statistics
 */
export const getArrayStats = (array: number[]) => {
  return {
    size: array.length,
    min: Math.min(...array),
    max: Math.max(...array),
    sum: array.reduce((a, b) => a + b, 0),
    average: array.reduce((a, b) => a + b, 0) / array.length
  };
};

/**
 * Check if array is sorted
 */
export const isSorted = (array: number[]): boolean => {
  for (let i = 1; i < array.length; i++) {
    if (array[i] < array[i - 1]) {
      return false;
    }
  }
  return true;
};

/**
 * Shuffle array using Fisher-Yates algorithm
 */
export const shuffleArray = (array: number[]): number[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

