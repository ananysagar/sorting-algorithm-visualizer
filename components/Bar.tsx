'use client';

import React from 'react';
import styles from '../styles/Bar.module.css';

export interface BarProps {
  value: number;
  maxValue: number;
  isActive?: boolean;
  isComparing?: boolean;
  isSwapping?: boolean;
  isSorted?: boolean;
  isPivot?: boolean;
  isMerging?: boolean;
  isDarkMode?: boolean;
  width?: number;
  height?: number;
}

/**
 * Bar component representing a single array element
 * Displays as a vertical bar with height proportional to its value
 */
const Bar: React.FC<BarProps> = ({
  value,
  maxValue,
  isActive = false,
  isComparing = false,
  isSwapping = false,
  isSorted = false,
  isPivot = false,
  isMerging = false,
  isDarkMode = false,
  width = 20,
  height = 200
}) => {
  // Calculate bar height as percentage of max value
  const barHeight = (value / maxValue) * height;
  
  // Determine bar color based on state
  const getBarColor = () => {
    if (isSorted) return isDarkMode ? '#34d399' : '#10b981'; // Green
    if (isSwapping) return isDarkMode ? '#fbbf24' : '#f59e0b'; // Yellow/Orange
    if (isComparing) return isDarkMode ? '#f87171' : '#ef4444'; // Red
    if (isPivot) return isDarkMode ? '#a78bfa' : '#8b5cf6'; // Purple
    if (isMerging) return isDarkMode ? '#22d3ee' : '#06b6d4'; // Cyan
    if (isActive) return isDarkMode ? '#60a5fa' : '#3b82f6'; // Blue
    return isDarkMode ? '#64748b' : '#94a3b8'; // Default gray
  };

  // Determine bar class for styling
  const getBarClass = () => {
    const classes = [styles.bar];
    
    if (isActive) classes.push(styles.active);
    if (isComparing) classes.push(styles.comparing);
    if (isSwapping) classes.push(styles.swapping);
    if (isSorted) classes.push(styles.sorted);
    if (isPivot) classes.push(styles.pivot);
    if (isMerging) classes.push(styles.merging);
    if (isDarkMode) classes.push(styles.darkMode);
    
    return classes.join(' ');
  };

  return (
    <div className={styles.barContainer}>
      <div
        className={getBarClass()}
        style={{
          width: `${width}px`,
          height: `${barHeight}px`,
          backgroundColor: getBarColor(),
          minHeight: '2px', // Ensure minimum visibility
        }}
        title={`Value: ${value}`}
      />
      <div className={`${styles.value} ${isDarkMode ? styles.darkMode : ''}`}>
        {value}
      </div>
    </div>
  );
};

export default Bar;

