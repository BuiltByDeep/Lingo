# Halloween Hangman - Sound Effects Guide

## Overview
The Halloween Hangman game features spooky sound effects generated using the Web Audio API. All sounds are procedurally generated - no audio files needed!

## Sound Effects

### 1. Correct Letter Sound 🎵
**Trigger**: When you guess a letter that's in the word
**Description**: Soft ghost giggle (ascending then descending tone)
- Frequency: 400Hz → 600Hz → 400Hz
- Duration: 0.2 seconds
- Volume: Soft (0.2)

### 2. Wrong Letter Sound ⚠️
**Trigger**: When you guess a letter that's NOT in the word
**Description**: Metal chain/creepy sound (descending sawtooth wave)
- Frequency: 200Hz → 100Hz
- Duration: 0.3 seconds
- Volume: Medium (0.3)
- Waveform: Sawtooth (harsh, metallic)

### 3. Win Sound 🎉
**Trigger**: When you complete the word successfully
**Description**: Witch laugh (ascending musical notes)
- Notes: 300Hz, 400Hz, 500Hz, 600Hz, 700Hz
- Duration: 0.5 seconds total (5 notes × 0.1s each)
- Volume: Soft (0.2)
- Pattern: Cheerful ascending scale

### 4. Lose Sound 💀
**Trigger**: When you run out of guesses
**Description**: Thunder + scream (dramatic two-part sound)
- **Part 1 - Thunder**: 80Hz → 40Hz (low rumble)
  - Duration: 0.5 seconds
  - Volume: Loud (0.4)
  - Waveform: Sawtooth
- **Part 2 - Scream**: 800Hz → 200Hz (descending wail)
  - Delay: 0.2 seconds after thunder
  - Duration: 0.4 seconds
  - Volume: Medium (0.3)

### 5. Button Click Sound 🖱️
**Trigger**: When clicking any button (difficulty, new word, etc.)
**Description**: Soft click
- Frequency: 800Hz
- Duration: 0.05 seconds
- Volume: Very soft (0.1)

## Background Music Management

### Auto-Pause Feature
When the Halloween Hangman game is active:
- **Game Start**: Background Halloween music automatically pauses
- **Game End (Win)**: Music resumes after 1 second
- **Game End (Lose)**: Music resumes after 1 second
- **Window Close**: Music resumes immediately

This ensures game sounds are clearly audible without competing with background music.

## Technical Implementation

### Web Audio API
All sounds use the Web Audio API for:
- Zero latency
- No file loading required
- Precise timing control
- Dynamic sound generation

### Sound Hook: `useHangmanSounds.js`
Custom React hook that provides:
```javascript
const {
  playCorrectSound,
  playWrongSound,
  playWinSound,
  playLoseSound,
  playClickSound,
  pauseBackgroundMusic,
  resumeBackgroundMusic
} = useHangmanSounds();
```

### Integration Points
1. **Letter Guessing**: Plays correct/wrong sound based on letter match
2. **Game State Changes**: Plays win/lose sound when game ends
3. **Button Clicks**: Plays click sound on all interactive elements
4. **Background Music**: Pauses on game start, resumes on game end

## Browser Compatibility

### Supported Browsers
- ✅ Chrome/Edge (full support)
- ✅ Firefox (full support)
- ✅ Safari (full support)
- ✅ Opera (full support)

### Fallback Behavior
If Web Audio API is not available:
- Game continues to work normally
- Sounds simply don't play
- No errors or crashes

## Volume Levels

All sounds are carefully balanced:
- **Correct**: 0.2 (soft, encouraging)
- **Wrong**: 0.3 (noticeable but not harsh)
- **Win**: 0.2 (celebratory but not overwhelming)
- **Lose**: 0.4 (dramatic but not painful)
- **Click**: 0.1 (subtle feedback)

## Sound Design Philosophy

### Spooky but Fun
- Sounds are Halloween-themed but not scary
- Appropriate for all ages
- Enhance gameplay without being annoying

### Feedback-Focused
- Every action has audio feedback
- Sounds reinforce game state
- Help players understand what's happening

### Non-Intrusive
- Short durations (0.05s - 0.5s)
- Reasonable volumes
- Background music management prevents overlap

## Customization

### Adjusting Sounds
To modify sounds, edit `src/hooks/useHangmanSounds.js`:

```javascript
// Example: Make correct sound higher pitched
oscillator.frequency.setValueAtTime(600, ctx.currentTime); // was 400
oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1); // was 600
```

### Adding New Sounds
1. Create new function in `useHangmanSounds.js`
2. Use AudioContext to generate sound
3. Return function from hook
4. Call in component at appropriate time

## Performance

### Optimized
- Sounds are generated on-demand
- No audio files to download
- Minimal memory usage
- No impact on game performance

### Resource Management
- AudioContext created once
- Cleaned up on component unmount
- Oscillators stopped after playing

## Accessibility

### Audio Considerations
- Sounds are optional (game works without them)
- No critical information conveyed only through sound
- Visual feedback always accompanies audio
- Reasonable volumes prevent hearing discomfort

## Future Enhancements

### Potential Additions
- [ ] Volume control slider
- [ ] Mute button for game sounds
- [ ] Different sound themes (retro, modern, etc.)
- [ ] More complex sound effects (reverb, echo)
- [ ] Voice announcements ("Correct!", "Wrong!", etc.)
- [ ] Background ambient sounds during gameplay

## Troubleshooting

### No Sound Playing
1. Check browser supports Web Audio API
2. Ensure browser tab is not muted
3. Check system volume is up
4. Try clicking on page first (some browsers require user interaction)

### Sounds Too Loud/Quiet
- Adjust system volume
- Modify volume values in `useHangmanSounds.js`

### Background Music Not Pausing
- Ensure Halloween theme is active
- Check `window.audioControls` is available
- Verify BackgroundMusic component is loaded

## Summary

The Halloween Hangman sound system provides:
- ✅ 5 unique spooky sound effects
- ✅ Automatic background music management
- ✅ Zero-latency Web Audio API implementation
- ✅ No external audio files required
- ✅ Full browser compatibility
- ✅ Optimized performance

Enjoy the spooky sounds! 🎃👻🔊
