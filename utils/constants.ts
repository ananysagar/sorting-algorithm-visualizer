/**
 * Constants for the sorting visualizer
 */

export const ARRAY_SIZE_LIMITS = {
  MIN: 5,
  MAX: 30,
  DEFAULT: 10,
} as const;

export const COLORS = {
  DEFAULT: "#3b82f6",
  COMPARING: "#ef4444",
  SWAPPING: "#f59e0b",
  SORTED: "#10b981",
  PIVOT: "#8b5cf6",
  MERGING: "#06b6d4",
  BACKGROUND: "#f8fafc",
  BORDER: "#e2e8f0",
} as const;

export const DARK_COLORS = {
  DEFAULT: "#60a5fa",
  COMPARING: "#f87171",
  SWAPPING: "#fbbf24",
  SORTED: "#34d399",
  PIVOT: "#a78bfa",
  MERGING: "#22d3ee",
  BACKGROUND: "#1e293b",
  BORDER: "#334155",
} as const;

export const SORTING_ALGORITHMS = [
  { value: "bubble", label: "Bubble Sort", complexity: "O(n²)" },
  { value: "selection", label: "Selection Sort", complexity: "O(n²)" },
  { value: "insertion", label: "Insertion Sort", complexity: "O(n²)" },
  { value: "merge", label: "Merge Sort", complexity: "O(n log n)" },
  { value: "quick", label: "Quick Sort", complexity: "O(n log n)" },
  { value: "heap", label: "Heap Sort", complexity: "O(n log n)" },
  { value: "radix", label: "Radix Sort", complexity: "O(dn)" },
] as const;

export const ARRAY_TYPES = [
  { value: "random", label: "Random" },
  { value: "reversed", label: "Reversed" },
  { value: "nearly-sorted", label: "Nearly Sorted" },
  { value: "custom", label: "Custom" },
] as const;

export const PSEUDOCODE = {
  bubble: [
    "for i = 0 to n-1:",
    "  for j = 0 to n-i-2:",
    "    if arr[j] > arr[j+1]:",
    "      swap(arr[j], arr[j+1])",
  ],
  selection: [
    "for i = 0 to n-1:",
    "  min_idx = i",
    "  for j = i+1 to n:",
    "    if arr[j] < arr[min_idx]:",
    "      min_idx = j",
    "  swap(arr[i], arr[min_idx])",
  ],
  insertion: [
    "for i = 1 to n-1:",
    "  key = arr[i]",
    "  j = i-1",
    "  while j >= 0 and arr[j] > key:",
    "    arr[j+1] = arr[j]",
    "    j = j-1",
    "  arr[j+1] = key",
  ],
  merge: [
    "mergeSort(arr, left, right):",
    "  if left < right:",
    "    mid = (left + right) / 2",
    "    mergeSort(arr, left, mid)",
    "    mergeSort(arr, mid+1, right)",
    "    merge(arr, left, mid, right)",
  ],
  quick: [
    "quickSort(arr, low, high):",
    "  if low < high:",
    "    pivot = partition(arr, low, high)",
    "    quickSort(arr, low, pivot-1)",
    "    quickSort(arr, pivot+1, high)",
  ],
  heap: [
    "heapSort(arr):",
    "  buildMaxHeap(arr)",
    "  for i = n-1 to 1:",
    "    swap(arr[0], arr[i])",
    "    heapify(arr, 0, i)",
  ],
  radix: [
    "radixSort(arr):",
    "  max = findMax(arr)",
    "  for exp = 1 to max/exp > 0:",
    "    countSort(arr, exp)",
  ],
} as const;
