'use client';

import React, { useState } from 'react';
import styles from '../styles/Controls.module.css';
import { SORTING_ALGORITHMS, ARRAY_TYPES, ARRAY_SIZE_LIMITS } from '../utils/constants';
import { validateCustomArray } from '../utils/arrayUtils';

export interface ControlsProps {
  algorithm: string;
  arrayType: string;
  arraySize: number;
  isDarkMode: boolean;
  isPlaying: boolean;
  isPaused: boolean;
  isCompleted: boolean;
  customArrayInput: string;
  currentStepIndex: number;
  totalSteps: number;
  onAlgorithmChange: (algorithm: string) => void;
  onArrayTypeChange: (type: string) => void;
  onArraySizeChange: (size: number) => void;
  onDarkModeToggle: () => void;
  onGenerateArray: () => void;
  onStartSorting: () => void;
  onPauseResume: () => void;
  onReset: () => void;
  onCustomArrayChange: (input: string) => void;
  onCustomArraySubmit: () => void;
  onPreviousStep: () => void;
  onNextStep: () => void;
}

/**
 * Controls component for managing sorting visualization
 * Includes algorithm selection, array controls, and sorting controls
 */
const Controls: React.FC<ControlsProps> = ({
  algorithm,
  arrayType,
  arraySize,
  isDarkMode,
  isPlaying,
  isPaused,
  isCompleted,
  customArrayInput,
  currentStepIndex,
  totalSteps,
  onAlgorithmChange,
  onArrayTypeChange,
  onArraySizeChange,
  onDarkModeToggle,
  onGenerateArray,
  onStartSorting,
  onPauseResume,
  onReset,
  onCustomArrayChange,
  onCustomArraySubmit,
  onPreviousStep,
  onNextStep
}) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customArrayError, setCustomArrayError] = useState<string>('');

  const handleArrayTypeChange = (type: string) => {
    onArrayTypeChange(type);
    setShowCustomInput(type === 'custom');
    if (type !== 'custom') {
      setCustomArrayError('');
    }
  };

  const handleCustomArrayChange = (input: string) => {
    onCustomArrayChange(input);
    if (input.trim()) {
      const validation = validateCustomArray(input);
      setCustomArrayError(validation.isValid ? '' : validation.error || '');
    } else {
      setCustomArrayError('');
    }
  };

  const handleCustomArraySubmit = () => {
    if (customArrayInput.trim()) {
      const validation = validateCustomArray(customArrayInput);
      if (validation.isValid) {
        onCustomArraySubmit();
        setCustomArrayError('');
      } else {
        setCustomArrayError(validation.error || '');
      }
    }
  };


  const getArrayTypeLabel = (type: string) => {
    return ARRAY_TYPES.find(t => t.value === type)?.label || type;
  };

  const getAlgorithmInfo = () => {
    const algo = SORTING_ALGORITHMS.find(a => a.value === algorithm);
    return algo ? `${algo.label} (${algo.complexity})` : algorithm;
  };

  return (
    <div className={`${styles.controls} ${isDarkMode ? styles.darkMode : ''}`}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Sorting Algorithm Visualizer</h2>
        <button
          className={`${styles.themeToggle} ${isDarkMode ? styles.dark : styles.light}`}
          onClick={onDarkModeToggle}
          title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Algorithm Selection */}
      <div className={styles.section}>
        <label className={styles.label}>Algorithm</label>
        <select
          className={styles.select}
          value={algorithm}
          onChange={(e) => onAlgorithmChange(e.target.value)}
          disabled={isPlaying}
        >
          {SORTING_ALGORITHMS.map((algo) => (
            <option key={algo.value} value={algo.value}>
              {algo.label} ({algo.complexity})
            </option>
          ))}
        </select>
        <div className={styles.info}>
          Selected: {getAlgorithmInfo()}
        </div>
      </div>

      {/* Array Controls */}
      <div className={styles.section}>
        <label className={styles.label}>Array Type</label>
        <div className={styles.arrayTypeButtons}>
          {ARRAY_TYPES.map((type) => (
            <button
              key={type.value}
              className={`${styles.arrayTypeButton} ${arrayType === type.value ? styles.active : ''}`}
              onClick={() => handleArrayTypeChange(type.value)}
              disabled={isPlaying}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Custom Array Input */}
        {showCustomInput && (
          <div className={styles.customArraySection}>
            <label className={styles.label}>Custom Array</label>
            <div className={styles.customArrayInput}>
              <input
                type="text"
                placeholder="Enter numbers separated by commas (e.g., 5,2,8,1,9)"
                value={customArrayInput}
                onChange={(e) => handleCustomArrayChange(e.target.value)}
                className={`${styles.input} ${customArrayError ? styles.error : ''}`}
                disabled={isPlaying}
              />
              <button
                className={styles.submitButton}
                onClick={handleCustomArraySubmit}
                disabled={isPlaying || !customArrayInput.trim() || !!customArrayError}
              >
                Use
              </button>
            </div>
            {customArrayError && (
              <div className={styles.errorMessage}>{customArrayError}</div>
            )}
          </div>
        )}
      </div>

      {/* Array Size Control */}
      <div className={styles.section}>
        <label className={styles.label}>
          Array Size: {arraySize}
        </label>
        <input
          type="range"
          min={ARRAY_SIZE_LIMITS.MIN}
          max={ARRAY_SIZE_LIMITS.MAX}
          value={arraySize}
          onChange={(e) => onArraySizeChange(parseInt(e.target.value))}
          className={styles.slider}
          disabled={isPlaying}
        />
        <div className={styles.rangeLabels}>
          <span>{ARRAY_SIZE_LIMITS.MIN}</span>
          <span>{ARRAY_SIZE_LIMITS.MAX}</span>
        </div>
      </div>

      {/* Step Navigation */}
      {totalSteps > 0 && (
        <div className={styles.section}>
          <label className={styles.label}>
            Step Navigation: {currentStepIndex + 1} / {totalSteps}
          </label>
          <div className={styles.stepControls}>
            <button
              className={`${styles.button} ${styles.stepButton}`}
              onClick={onPreviousStep}
              disabled={currentStepIndex <= 0}
            >
              ← Previous
            </button>
            <button
              className={`${styles.button} ${styles.stepButton}`}
              onClick={onNextStep}
              disabled={currentStepIndex >= totalSteps - 1}
            >
              Next →
            </button>
          </div>
          <div className={styles.stepInfo}>
            Manual step navigation
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className={styles.section}>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.button} ${styles.generateButton}`}
            onClick={onGenerateArray}
            disabled={isPlaying}
          >
            Generate New Array
          </button>
          
          <button
            className={`${styles.button} ${styles.startButton} ${isPlaying ? styles.playing : ''}`}
            onClick={isPlaying ? onPauseResume : onStartSorting}
            disabled={isCompleted}
          >
            {isPlaying ? (isPaused ? 'Resume' : 'Pause') : 'Start Sorting'}
          </button>
          
          <button
            className={`${styles.button} ${styles.resetButton}`}
            onClick={onReset}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Status */}
      <div className={styles.status}>
        <div className={styles.statusItem}>
          <span className={styles.statusLabel}>Array Type:</span>
          <span className={styles.statusValue}>{getArrayTypeLabel(arrayType)}</span>
        </div>
        <div className={styles.statusItem}>
          <span className={styles.statusLabel}>Size:</span>
          <span className={styles.statusValue}>{arraySize}</span>
        </div>
        <div className={styles.statusItem}>
          <span className={styles.statusLabel}>Steps:</span>
          <span className={styles.statusValue}>{totalSteps > 0 ? `${currentStepIndex + 1}/${totalSteps}` : '0'}</span>
        </div>
      </div>
    </div>
  );
};

export default Controls;

