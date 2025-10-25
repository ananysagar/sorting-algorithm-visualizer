'use client';

import React, { useState, useCallback } from 'react';
import Bar from './Bar';
import Controls from './Controls';
import Pseudocode from './Pseudocode';
import styles from '../styles/Visualizer.module.css';
import { generateArray, validateCustomArray, getArrayStats } from '../utils/arrayUtils';
import { audioManager } from '../utils/audioUtils';
import { algorithms, AlgorithmType, SortStep } from '../algorithms';
import { ARRAY_SIZE_LIMITS } from '../utils/constants';

export interface VisualizerState {
  array: number[];
  algorithm: AlgorithmType;
  arrayType: string;
  arraySize: number;
  isDarkMode: boolean;
  isPlaying: boolean;
  isPaused: boolean;
  isCompleted: boolean;
  customArrayInput: string;
  currentStep: SortStep | null;
  comparisons: number;
  swaps: number;
  startTime: number | null;
  endTime: number | null;
  activeIndices: number[];
  comparingIndices: number[];
  swappingIndices: number[];
  sortedIndices: number[];
  pivotIndices: number[];
  mergingIndices: number[];
  // Step navigation
  allSteps: SortStep[];
  currentStepIndex: number;
}

/**
 * Main Visualizer component that orchestrates the sorting visualization
 */
const Visualizer: React.FC = () => {
  const [state, setState] = useState<VisualizerState>(() => {
    const initialArray = generateArray({
      size: ARRAY_SIZE_LIMITS.DEFAULT,
      type: 'random'
    });
    
    return {
      array: initialArray,
      algorithm: 'bubble',
      arrayType: 'random',
      arraySize: ARRAY_SIZE_LIMITS.DEFAULT,
      isDarkMode: false,
      isPlaying: false,
      isPaused: false,
      isCompleted: false,
      customArrayInput: '',
      currentStep: null,
      comparisons: 0,
      swaps: 0,
      startTime: null,
      endTime: null,
      activeIndices: [],
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: [],
      pivotIndices: [],
      mergingIndices: [],
      // Step navigation
      allSteps: [],
      currentStepIndex: -1
    };
  });


  // Generate new array
  const generateNewArray = useCallback(() => {
    const newArray = generateArray({
      size: state.arraySize,
      type: state.arrayType as 'random' | 'reversed' | 'nearly-sorted' | 'custom',
      customArray: state.arrayType === 'custom' && state.customArrayInput 
        ? validateCustomArray(state.customArrayInput).array 
        : undefined
    });

    setState(prev => ({
      ...prev,
      array: newArray,
      isCompleted: false,
      currentStep: null,
      comparisons: 0,
      swaps: 0,
      startTime: null,
      endTime: null,
      activeIndices: [],
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: [],
      pivotIndices: [],
      mergingIndices: [],
      // Reset step navigation
      allSteps: [],
      currentStepIndex: -1
    }));

    audioManager.playResetSound();
  }, [state.arraySize, state.arrayType, state.customArrayInput]);

  // Function to collect all sorting steps
  const collectAllSteps = useCallback(async (algorithm: AlgorithmType, array: number[]): Promise<SortStep[]> => {
    const algorithmFunction = algorithms[algorithm];
    if (!algorithmFunction) return [];

    const steps: SortStep[] = [];
    const generator = algorithmFunction([...array]);
    
    try {
      while (true) {
        const { value: step, done } = await generator.next();
        if (done) break;
        if (step) {
          steps.push(step);
        }
      }
    } catch (error) {
      console.error('Error collecting steps:', error);
    }
    
    return steps;
  }, []);

  // Apply a step to the visualization
  const applyStep = useCallback((step: SortStep) => {
    setState(prev => {
      const newState = { ...prev };
      
      // Update array
      newState.array = step.array;
      newState.currentStep = step;
      
      // Update indices based on step type
      newState.activeIndices = [];
      newState.comparingIndices = [];
      newState.swappingIndices = [];
      newState.pivotIndices = [];
      newState.mergingIndices = [];
      
      switch (step.type) {
        case 'compare':
          newState.comparingIndices = step.indices;
          newState.comparisons += 1;
          audioManager.playComparisonSound();
          break;
        case 'swap':
          newState.swappingIndices = step.indices;
          newState.swaps += 1;
          audioManager.playSwapSound();
          break;
        case 'sorted':
          newState.sortedIndices = [...new Set([...prev.sortedIndices, ...step.indices])];
          break;
        case 'pivot':
          newState.pivotIndices = step.indices;
          break;
        case 'merge':
        case 'merging':
          newState.mergingIndices = step.indices;
          break;
        case 'select':
          newState.activeIndices = step.indices;
          break;
        default:
          newState.activeIndices = step.indices;
      }
      
      return newState;
    });
  }, []);

  // Go to next step
  const goToNextStep = useCallback(() => {
    setState(prev => {
      if (prev.currentStepIndex < prev.allSteps.length - 1) {
        const nextIndex = prev.currentStepIndex + 1;
        const nextStep = prev.allSteps[nextIndex];
        applyStep(nextStep);
        return { ...prev, currentStepIndex: nextIndex };
      } else {
        // Sorting completed
        return {
          ...prev,
          isPlaying: false,
          isPaused: false,
          isCompleted: true,
          endTime: Date.now(),
          isAutoPlaying: false,
          sortedIndices: Array.from({ length: prev.array.length }, (_, i) => i)
        };
      }
    });
  }, [applyStep]);

  // Go to previous step
  const goToPreviousStep = useCallback(() => {
    setState(prev => {
      if (prev.currentStepIndex > 0) {
        const prevIndex = prev.currentStepIndex - 1;
        const prevStep = prev.allSteps[prevIndex];
        applyStep(prevStep);
        return { ...prev, currentStepIndex: prevIndex };
      }
      return prev;
    });
  }, [applyStep]);


  // Start sorting - collect all steps first
  const startSorting = useCallback(async () => {
    if (state.isCompleted || state.array.length === 0) return;

    setState(prev => ({
      ...prev,
      isPlaying: true,
      isPaused: false,
      startTime: Date.now(),
      endTime: null,
      comparisons: 0,
      swaps: 0,
      activeIndices: [],
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: [],
      pivotIndices: [],
      mergingIndices: [],
      currentStepIndex: -1
    }));

    try {
      // Collect all steps first
      const allSteps = await collectAllSteps(state.algorithm, state.array);
      
      setState(prev => ({
        ...prev,
        allSteps,
        currentStepIndex: 0
      }));

      // Apply first step immediately
      if (allSteps.length > 0) {
        applyStep(allSteps[0]);
      }
    } catch (error) {
      console.error('Sorting error:', error);
      setState(prev => ({ ...prev, isPlaying: false, isPaused: false }));
    }
  }, [state.algorithm, state.array, state.isCompleted, collectAllSteps, applyStep]);

  // Pause/Resume sorting (now just toggles paused state)
  const pauseResume = useCallback(() => {
    setState(prev => ({ ...prev, isPaused: !prev.isPaused }));
    audioManager.playPauseSound();
  }, []);

  // Reset visualization
  const reset = useCallback(() => {
    
    setState(prev => ({
      ...prev,
      isPlaying: false,
      isPaused: false,
      isCompleted: false,
      currentStep: null,
      comparisons: 0,
      swaps: 0,
      startTime: null,
      endTime: null,
      activeIndices: [],
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: [],
      pivotIndices: [],
      mergingIndices: [],
      // Reset step navigation
      allSteps: [],
      currentStepIndex: -1
    }));

    audioManager.playResetSound();
  }, []);

  // Handle algorithm change
  const handleAlgorithmChange = useCallback((algorithm: string) => {
    setState(prev => ({ ...prev, algorithm: algorithm as AlgorithmType }));
  }, []);

  // Handle array type change
  const handleArrayTypeChange = useCallback((type: string) => {
    setState(prev => ({ ...prev, arrayType: type }));
  }, []);

  // Handle array size change
  const handleArraySizeChange = useCallback((size: number) => {
    setState(prev => ({ ...prev, arraySize: size }));
  }, []);


  // Handle dark mode toggle
  const handleDarkModeToggle = useCallback(() => {
    setState(prev => ({ ...prev, isDarkMode: !prev.isDarkMode }));
  }, []);

  // Handle custom array change
  const handleCustomArrayChange = useCallback((input: string) => {
    setState(prev => ({ ...prev, customArrayInput: input }));
  }, []);

  // Handle custom array submit
  const handleCustomArraySubmit = useCallback(() => {
    generateNewArray();
  }, [generateNewArray]);

  // Get current time elapsed
  const getElapsedTime = useCallback(() => {
    if (!state.startTime) return 0;
    const endTime = state.endTime || Date.now();
    return Math.round((endTime - state.startTime) / 1000 * 100) / 100;
  }, [state.startTime, state.endTime]);

  // Get array statistics
  const arrayStats = getArrayStats(state.array);


  return (
    <div className={`${styles.visualizer} ${state.isDarkMode ? styles.darkMode : ''}`}>
      <Controls
        algorithm={state.algorithm}
        arrayType={state.arrayType}
        arraySize={state.arraySize}
        isDarkMode={state.isDarkMode}
        isPlaying={state.isPlaying}
        isPaused={state.isPaused}
        isCompleted={state.isCompleted}
        customArrayInput={state.customArrayInput}
        currentStepIndex={state.currentStepIndex}
        totalSteps={state.allSteps.length}
        onAlgorithmChange={handleAlgorithmChange}
        onArrayTypeChange={handleArrayTypeChange}
        onArraySizeChange={handleArraySizeChange}
        onDarkModeToggle={handleDarkModeToggle}
        onGenerateArray={generateNewArray}
        onStartSorting={startSorting}
        onPauseResume={pauseResume}
        onReset={reset}
        onCustomArrayChange={handleCustomArrayChange}
        onCustomArraySubmit={handleCustomArraySubmit}
        onPreviousStep={goToPreviousStep}
        onNextStep={goToNextStep}
      />

      <div className={styles.visualizationArea}>
        {/* Array Visualization */}
        <div className={styles.arrayContainer}>
          <div className={styles.barsContainer}>
            {state.array.length > 0 ? state.array.map((value, index) => (
              <Bar
                key={`${index}-${value}`}
                value={value}
                maxValue={Math.max(...state.array)}
                isActive={state.activeIndices.includes(index)}
                isComparing={state.comparingIndices.includes(index)}
                isSwapping={state.swappingIndices.includes(index)}
                isSorted={state.sortedIndices.includes(index)}
                isPivot={state.pivotIndices.includes(index)}
                isMerging={state.mergingIndices.includes(index)}
                isDarkMode={state.isDarkMode}
                width={Math.max(8, Math.min(20, 400 / state.array.length))}
                height={200}
              />
            )) : (
              <div className={styles.emptyArray}>
                <p>No array to display. Click &quot;Generate New Array&quot; to start.</p>
              </div>
            )}
          </div>
        </div>

        {/* Side Panel */}
        <div className={styles.sidePanel}>
          {/* Statistics Panel */}
          <div className={styles.statsPanel}>
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Comparisons:</span>
                <span className={styles.statValue}>{state.comparisons}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Swaps:</span>
                <span className={styles.statValue}>{state.swaps}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Time:</span>
                <span className={styles.statValue}>{getElapsedTime()}s</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Array Size:</span>
                <span className={styles.statValue}>{state.array.length}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Min Value:</span>
                <span className={styles.statValue}>{arrayStats.min}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Max Value:</span>
                <span className={styles.statValue}>{arrayStats.max}</span>
              </div>
            </div>

            {/* Current Step Description */}
            {state.currentStep && (
              <div className={styles.stepDescription}>
                <h4>Current Step:</h4>
                <p>{state.currentStep.description}</p>
              </div>
            )}

            {/* Completion Status */}
            {state.isCompleted && (
              <div className={styles.completionStatus}>
                <h4>✅ Sorting Complete!</h4>
                <p>
                  Sorted {state.array.length} elements in {getElapsedTime()} seconds
                  with {state.comparisons} comparisons and {state.swaps} swaps.
                </p>
              </div>
            )}
          </div>

          {/* Pseudocode Panel */}
          <Pseudocode
            algorithm={state.algorithm}
            currentStep={state.currentStep}
            isDarkMode={state.isDarkMode}
          />
        </div>
      </div>
    </div>
  );
};

export default Visualizer;
