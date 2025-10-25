'use client';

import React from 'react';
import styles from '../styles/Pseudocode.module.css';
import { PSEUDOCODE } from '../utils/constants';
import { AlgorithmType, SortStep } from '../algorithms';

export interface PseudocodeProps {
  algorithm: AlgorithmType;
  currentStep: SortStep | null;
  isDarkMode: boolean;
}

/**
 * Pseudocode component that displays algorithm pseudocode with step highlighting
 */
const Pseudocode: React.FC<PseudocodeProps> = ({
  algorithm,
  currentStep,
  isDarkMode
}) => {
  const pseudocode = PSEUDOCODE[algorithm] || [];
  
  // Determine which line should be highlighted based on current step
  const getHighlightedLine = (): number => {
    if (!currentStep) return -1;
    
    switch (algorithm) {
      case 'bubble':
        if (currentStep.type === 'compare') return 2;
        if (currentStep.type === 'swap') return 3;
        return -1;
        
      case 'selection':
        if (currentStep.type === 'compare') return 3;
        if (currentStep.type === 'select') return 4;
        if (currentStep.type === 'swap') return 5;
        return -1;
        
      case 'insertion':
        if (currentStep.type === 'compare') return 4;
        if (currentStep.type === 'shift') return 5;
        if (currentStep.type === 'insert') return 7;
        return -1;
        
      case 'merge':
        if (currentStep.type === 'divide') return 2;
        if (currentStep.type === 'compare') return 6;
        if (currentStep.type === 'merge') return 7;
        return -1;
        
      case 'quick':
        if (currentStep.type === 'pivot') return 3;
        if (currentStep.type === 'compare') return 4;
        if (currentStep.type === 'swap') return 5;
        if (currentStep.type === 'partition') return 6;
        return -1;
        
      case 'heap':
        if (currentStep.type === 'build-heap') return 2;
        if (currentStep.type === 'compare') return 3;
        if (currentStep.type === 'swap') return 4;
        if (currentStep.type === 'heapify') return 5;
        return -1;
        
      case 'radix':
        if (currentStep.type === 'digit') return 2;
        if (currentStep.type === 'count') return 3;
        if (currentStep.type === 'distribute') return 4;
        return -1;
        
      default:
        return -1;
    }
  };

  const highlightedLine = getHighlightedLine();

  return (
    <div className={`${styles.pseudocode} ${isDarkMode ? styles.darkMode : ''}`}>
      <div className={styles.header}>
        <h3>Algorithm Pseudocode</h3>
        <span className={styles.algorithmName}>
          {algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort
        </span>
      </div>
      
      <div className={styles.codeContainer}>
        <pre className={styles.code}>
          {pseudocode.map((line, index) => (
            <div
              key={index}
              className={`${styles.codeLine} ${
                index === highlightedLine ? styles.highlighted : ''
              }`}
            >
              <span className={styles.lineNumber}>{index + 1}</span>
              <span className={styles.lineContent}>{line}</span>
            </div>
          ))}
        </pre>
      </div>
      
      {currentStep && (
        <div className={styles.stepInfo}>
          <div className={styles.stepType}>
            <span className={styles.stepLabel}>Current Step:</span>
            <span className={`${styles.stepValue} ${styles[currentStep.type]}`}>
              {currentStep.type.charAt(0).toUpperCase() + currentStep.type.slice(1)}
            </span>
          </div>
          <div className={styles.stepDescription}>
            {currentStep.description}
          </div>
        </div>
      )}
      
      <div className={styles.legend}>
        <h4>Legend:</h4>
        <div className={styles.legendItems}>
          <div className={styles.legendItem}>
            <span className={`${styles.legendColor} ${styles.compare}`}></span>
            <span>Compare</span>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.legendColor} ${styles.swap}`}></span>
            <span>Swap</span>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.legendColor} ${styles.sorted}`}></span>
            <span>Sorted</span>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.legendColor} ${styles.pivot}`}></span>
            <span>Pivot</span>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.legendColor} ${styles.merge}`}></span>
            <span>Merge</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pseudocode;

