/**
 * Constants for the sorting visualizer
 */

export const ARRAY_SIZE_LIMITS = {
  MIN: 5,
  MAX: 200,
  DEFAULT: 50
} as const;

export const COLORS = {
  DEFAULT: '#3b82f6', // Blue
  COMPARING: '#ef4444', // Red
  SWAPPING: '#f59e0b', // Yellow/Orange
  SORTED: '#10b981', // Green
  PIVOT: '#8b5cf6', // Purple
  MERGING: '#06b6d4', // Cyan
  BACKGROUND: '#f8fafc', // Light gray
  BORDER: '#e2e8f0' // Gray
} as const;

export const DARK_COLORS = {
  DEFAULT: '#60a5fa', // Light blue
  COMPARING: '#f87171', // Light red
  SWAPPING: '#fbbf24', // Light yellow
  SORTED: '#34d399', // Light green
  PIVOT: '#a78bfa', // Light purple
  MERGING: '#22d3ee', // Light cyan
  BACKGROUND: '#1e293b', // Dark slate
  BORDER: '#334155' // Dark gray
} as const;

export const SORTING_ALGORITHMS = [
  { value: 'bubble', label: 'Bubble Sort', complexity: 'O(n²)' },
  { value: 'selection', label: 'Selection Sort', complexity: 'O(n²)' },
  { value: 'insertion', label: 'Insertion Sort', complexity: 'O(n²)' },
  { value: 'merge', label: 'Merge Sort', complexity: 'O(n log n)' },
  { value: 'quick', label: 'Quick Sort', complexity: 'O(n log n)' },
  { value: 'heap', label: 'Heap Sort', complexity: 'O(n log n)' },
  { value: 'radix', label: 'Radix Sort', complexity: 'O(dn)' }
] as const;

export const ARRAY_TYPES = [
  { value: 'random', label: 'Random' },
  { value: 'reversed', label: 'Reversed' },
  { value: 'nearly-sorted', label: 'Nearly Sorted' },
  { value: 'custom', label: 'Custom' }
] as const;

export const PSEUDOCODE = {
  bubble: [
    'for i = 0 to n-1:',
    '  for j = 0 to n-i-2:',
    '    if arr[j] > arr[j+1]:',
    '      swap(arr[j], arr[j+1])'
  ],
  selection: [
    'for i = 0 to n-1:',
    '  min_idx = i',
    '  for j = i+1 to n:',
    '    if arr[j] < arr[min_idx]:',
    '      min_idx = j',
    '  swap(arr[i], arr[min_idx])'
  ],
  insertion: [
    'for i = 1 to n-1:',
    '  key = arr[i]',
    '  j = i-1',
    '  while j >= 0 and arr[j] > key:',
    '    arr[j+1] = arr[j]',
    '    j = j-1',
    '  arr[j+1] = key'
  ],
  merge: [
    'mergeSort(arr, left, right):',
    '  if left < right:',
    '    mid = (left + right) / 2',
    '    mergeSort(arr, left, mid)',
    '    mergeSort(arr, mid+1, right)',
    '    merge(arr, left, mid, right)'
  ],
  quick: [
    'quickSort(arr, low, high):',
    '  if low < high:',
    '    pivot = partition(arr, low, high)',
    '    quickSort(arr, low, pivot-1)',
    '    quickSort(arr, pivot+1, high)'
  ],
  heap: [
    'heapSort(arr):',
    '  buildMaxHeap(arr)',
    '  for i = n-1 to 1:',
    '    swap(arr[0], arr[i])',
    '    heapify(arr, 0, i)'
  ],
  radix: [
    'radixSort(arr):',
    '  max = findMax(arr)',
    '  for exp = 1 to max/exp > 0:',
    '    countSort(arr, exp)'
  ]
} as const;

