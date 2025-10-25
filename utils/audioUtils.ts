/**
 * Audio utilities for sound effects during sorting
 */

export class AudioManager {
  private audioContext: AudioContext | null = null;
  private isEnabled: boolean = false;

  constructor() {
    // Initialize audio context only on client side
    if (typeof window !== 'undefined') {
      try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (error) {
        console.warn('Audio context not available:', error);
      }
    }
  }

  /**
   * Enable or disable audio
   */
  setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }

  /**
   * Check if audio is enabled
   */
  isAudioEnabled(): boolean {
    return this.isEnabled;
  }

  /**
   * Play a tone with specified frequency and duration
   */
  private playTone(frequency: number, duration: number = 0.1) {
    if (!this.isEnabled || !this.audioContext) return;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);
    } catch (error) {
      console.warn('Audio playback failed:', error);
    }
  }

  /**
   * Play sound for comparison
   */
  playComparisonSound() {
    this.playTone(440, 0.05); // A4 note
  }

  /**
   * Play sound for swap
   */
  playSwapSound() {
    this.playTone(660, 0.1); // E5 note
  }

  /**
   * Play sound for completion
   */
  playCompletionSound() {
    // Play a chord
    this.playTone(523, 0.2); // C5
    setTimeout(() => this.playTone(659, 0.2), 50); // E5
    setTimeout(() => this.playTone(784, 0.2), 100); // G5
  }

  /**
   * Play sound for pause
   */
  playPauseSound() {
    this.playTone(330, 0.15); // E4 note
  }

  /**
   * Play sound for reset
   */
  playResetSound() {
    this.playTone(220, 0.1); // A3 note
  }
}

// Create a singleton instance
export const audioManager = new AudioManager();
