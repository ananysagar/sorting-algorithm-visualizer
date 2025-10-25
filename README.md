# Sorting Algorithm Visualizer

A comprehensive, interactive web application for visualizing sorting algorithms built with Next.js and React. This project demonstrates various sorting algorithms with real-time animations, sound effects, and educational features.

## 🚀 Features

### Core Functionality
- **7 Sorting Algorithms**: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, Heap Sort, and Radix Sort
- **Interactive Visualization**: Real-time animation of sorting processes with color-coded elements
- **Array Generation**: Multiple array types including random, reversed, nearly sorted, and custom arrays
- **Speed Control**: Adjustable animation speed from very fast to very slow
- **Array Size Control**: Configurable array size from 5 to 200 elements

### Visual Features
- **Color-coded Elements**:
  - 🔴 Red: Elements being compared
  - 🟡 Yellow: Elements being swapped
  - 🟢 Green: Elements in correct position
  - 🟣 Purple: Pivot elements (Quick Sort)
  - 🔵 Cyan: Elements being merged (Merge Sort)
- **Smooth Animations**: CSS transitions and keyframe animations
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### Educational Features
- **Algorithm Pseudocode**: Real-time display of algorithm steps with highlighting
- **Step-by-step Explanations**: Detailed descriptions of each sorting operation
- **Performance Metrics**: Real-time tracking of comparisons, swaps, and execution time
- **Complexity Information**: Time and space complexity for each algorithm

### User Experience
- **Dark/Light Mode**: Toggle between dark and light themes
- **Sound Effects**: Audio feedback for comparisons, swaps, and completion
- **Playback Controls**: Start, pause, resume, and reset functionality
- **Custom Arrays**: Input your own array of numbers to sort
- **Statistics Panel**: Comprehensive metrics and array information

## 🛠️ Technical Stack

- **Framework**: Next.js 16 with React 19
- **Language**: TypeScript
- **Styling**: CSS Modules with responsive design
- **Audio**: Web Audio API for sound effects
- **Algorithms**: Custom implementations of all sorting algorithms

## 📁 Project Structure

```
sorting-algorithm-visualizer/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── Bar.tsx           # Individual array element component
│   ├── Controls.tsx      # Control panel component
│   ├── Pseudocode.tsx    # Algorithm pseudocode display
│   └── Visualizer.tsx    # Main visualizer component
├── algorithms/           # Sorting algorithm implementations
│   ├── bubbleSort.ts    # Bubble sort algorithm
│   ├── selectionSort.ts # Selection sort algorithm
│   ├── insertionSort.ts # Insertion sort algorithm
│   ├── mergeSort.ts     # Merge sort algorithm
│   ├── quickSort.ts     # Quick sort algorithm
│   ├── heapSort.ts      # Heap sort algorithm
│   ├── radixSort.ts     # Radix sort algorithm
│   └── index.ts         # Algorithm exports
├── utils/               # Utility functions
│   ├── arrayUtils.ts    # Array generation and manipulation
│   ├── audioUtils.ts    # Audio management
│   └── constants.ts     # Application constants
├── styles/              # CSS modules
│   ├── Bar.module.css   # Bar component styles
│   ├── Controls.module.css # Controls component styles
│   ├── Pseudocode.module.css # Pseudocode component styles
│   └── Visualizer.module.css # Main visualizer styles
└── hooks/               # Custom React hooks (if needed)
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sorting-algorithm-visualizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🎮 How to Use

### Basic Usage
1. **Select an Algorithm**: Choose from the dropdown menu
2. **Choose Array Type**: Select random, reversed, nearly sorted, or custom
3. **Adjust Settings**: Set array size (5-200) and animation speed
4. **Start Sorting**: Click "Start Sorting" to begin visualization
5. **Control Playback**: Use pause/resume and reset buttons as needed

### Custom Arrays
1. Select "Custom" array type
2. Enter numbers separated by commas (e.g., "5,2,8,1,9")
3. Click "Use" to apply the custom array
4. Start sorting to visualize your custom data

### Features Overview
- **🌙 Dark Mode**: Toggle between light and dark themes
- **🔊 Sound Effects**: Enable/disable audio feedback
- **📊 Statistics**: View real-time performance metrics
- **📝 Pseudocode**: Follow algorithm steps with highlighted code
- **📱 Responsive**: Works on all device sizes

## 🧮 Algorithm Details

### Bubble Sort
- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)
- **Description**: Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order

### Selection Sort
- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)
- **Description**: Finds the minimum element from the unsorted portion and moves it to the beginning

### Insertion Sort
- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)
- **Description**: Builds the final sorted array one item at a time by inserting each element into its correct position

### Merge Sort
- **Time Complexity**: O(n log n)
- **Space Complexity**: O(n)
- **Description**: Divides the array into halves, sorts them separately, then merges them back together

### Quick Sort
- **Time Complexity**: O(n log n) average, O(n²) worst case
- **Space Complexity**: O(log n)
- **Description**: Picks a pivot element and partitions the array around the pivot

### Heap Sort
- **Time Complexity**: O(n log n)
- **Space Complexity**: O(1)
- **Description**: Uses a binary heap data structure to sort elements

### Radix Sort
- **Time Complexity**: O(dn) where d is the number of digits
- **Space Complexity**: O(n)
- **Description**: Sorts numbers by processing individual digits

## 🎨 Customization

### Adding New Algorithms
1. Create a new file in `algorithms/` directory
2. Implement the algorithm as an async generator function
3. Export it from `algorithms/index.ts`
4. Add it to the `SORTING_ALGORITHMS` constant in `utils/constants.ts`
5. Add pseudocode to the `PSEUDOCODE` constant

### Styling
- All styles use CSS Modules for component isolation
- Dark mode support is built into all components
- Responsive design uses CSS Grid and Flexbox
- Custom CSS properties for easy theme customization

### Audio
- Sound effects are managed by the `AudioManager` class
- Uses Web Audio API for high-quality audio generation
- Easily customizable frequencies and durations

## 🧪 Testing

The application includes comprehensive error handling and validation:
- Array size limits (5-200 elements)
- Custom array input validation
- Algorithm step validation
- Responsive design testing

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by various sorting algorithm visualizations
- Built with modern web technologies
- Designed for educational purposes

## 📞 Support

If you encounter any issues or have questions:
1. Check the browser console for errors
2. Ensure you're using a supported browser
3. Try refreshing the page
4. Create an issue in the repository

---

**Happy Sorting! 🎉**