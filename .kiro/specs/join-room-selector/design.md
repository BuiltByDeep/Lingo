# Design Document - Join Room Selector

## Overview

The Join Room Selector is a Yahoo Chat-inspired interface component that provides users with a comprehensive room browsing and selection experience before entering a language learning chat room. The component replaces the current direct entry into the Spanish global room with a three-column layout that guides users through language selection, category filtering, and room selection.

The interface is designed to evoke nostalgia for early 2000s chat applications while maintaining modern React patterns and integration with the existing Lingo app architecture. The component will be implemented as a new window type within the existing window management system, leveraging the DraggableWindow wrapper and WindowContext for state management.

## Architecture

### Component Hierarchy

```
JoinRoomWindow (new)
├── LeftColumn (About & Instructions)
│   ├── WelcomeSection
│   ├── HowItWorksSection
│   ├── SafetyTipsSection
│   └── ActiveUsersIndicator
├── MiddleColumn (Languages & Categories)
│   ├── LanguageList
│   │   └── LanguageItem (collapsible)
│   │       └── SubcategoryList
│   │           └── SubcategoryItem (clickable)
├── RightColumn (Room Listings)
│   ├── EmptyState (when no selection)
│   └── RoomList
│       └── RoomListItem (clickable)
└── BottomBar (Action Buttons)
    ├── CreateNewRoomButton
    ├── GoToRoomButton (conditional enable)
    └── CancelButton
```

### Integration Points

1. **WindowContext**: The JoinRoomWindow will be registered as a new window type ('joinRoom') and opened via the existing `openWindow()` function
2. **ThemeContext**: The component will consume theme values for consistent styling across all themes
3. **UserContext**: User information will be passed to the selected room when joining
4. **HomePage/Desktop**: The entry point will be modified to open the JoinRoomWindow instead of directly opening the ChatRoomWindow

### Data Flow

```
User clicks "Join Room" 
  ↓
WindowContext.openWindow({ type: 'joinRoom' })
  ↓
JoinRoomWindow renders with initial state
  ↓
User selects language → expands language item
  ↓
User selects subcategory → generates room listings
  ↓
User selects room → enables "Go to Room" button
  ↓
User clicks "Go to Room" → onJoinRoom callback
  ↓
Parent component opens ChatRoomWindow with room config
```

## Components and Interfaces

### JoinRoomWindow Component

**Props:**
```typescript
interface JoinRoomWindowProps {
  onJoinRoom: (room: RoomConfig) => void;
  onCancel?: () => void;
}
```

**State:**
```typescript
interface JoinRoomState {
  selectedLanguageCode: string | null;
  selectedLanguageName: string | null;
  selectedCategory: {
    level: string;
    topic: string;
  } | null;
  expandedLanguages: Set<string>;
  availableRooms: Room[];
  selectedRoom: Room | null;
}
```

### Room Type Definition

```typescript
interface Room {
  id: string;                // e.g., "es-beginner-general-global"
  languageCode: string;      // e.g., "es"
  languageName: string;      // e.g., "Spanish"
  level: string;             // "Beginner" | "Intermediate" | "Expert"
  topic: string;             // e.g., "General Chat"
  label: string;             // e.g., "Spanish Beginner – General Chat (Global)"
  activeUsers: number;       // Mock number for display
  variant: string;           // "global" | "study" | "casual"
}
```

### Language Configuration

```typescript
const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: 'Mandarin Chinese' },
  { code: 'hi', name: 'Hindi' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'ar', name: 'Arabic' },
  { code: 'bn', name: 'Bengali' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ur', name: 'Urdu' },
  { code: 'id', name: 'Indonesian' },
  { code: 'de', name: 'German' },
  { code: 'ja', name: 'Japanese' },
  { code: 'sw', name: 'Swahili' },
  { code: 'mr', name: 'Marathi' },
  { code: 'te', name: 'Telugu' },
  { code: 'tr', name: 'Turkish' },
  { code: 'ta', name: 'Tamil' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'ko', name: 'Korean' },
  { code: 'it', name: 'Italian' },
  { code: 'fa', name: 'Persian / Farsi' },
  { code: 'pl', name: 'Polish' },
  { code: 'uk', name: 'Ukrainian' },
  { code: 'nl', name: 'Dutch' }
];

const LEVELS = ['Beginner', 'Intermediate', 'Expert'];

const TOPICS = [
  'General Chat',
  'Sports',
  'Movies & TV',
  'Politics & News',
  'Lifestyle & Travel',
  'Business & Work',
  'Gaming & Tech',
  'Music & Culture',
  'Study & Homework Help'
];
```

## Data Models

### Room Generation Logic

When a user selects a language and subcategory, the system generates 3-6 mock rooms using the following algorithm:

```typescript
function generateRooms(
  languageCode: string,
  languageName: string,
  level: string,
  topic: string
): Room[] {
  const variants = [
    { variant: 'global', prefix: '[Global]', userRange: [15, 50] },
    { variant: 'study', prefix: '[Study]', userRange: [5, 20] },
    { variant: 'casual', prefix: '[Casual]', userRange: [8, 30] }
  ];

  return variants.map(({ variant, prefix, userRange }) => ({
    id: `${languageCode}-${level.toLowerCase()}-${topic.toLowerCase().replace(/\s+/g, '-')}-${variant}`,
    languageCode,
    languageName,
    level,
    topic,
    label: `${prefix} ${languageName} ${level} – ${topic}`,
    activeUsers: Math.floor(Math.random() * (userRange[1] - userRange[0] + 1)) + userRange[0],
    variant
  }));
}
```

### State Transitions

1. **Initial State**: No selections, right column shows empty state
2. **Language Selected**: Language expands, subcategories visible
3. **Subcategory Selected**: Rooms generated and displayed in right column
4. **Room Selected**: "Go to Room" button enabled
5. **Join Room**: Callback fired with room configuration

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Language rendering consistency
*For any* language in the supported languages list, when rendered, it should display as a collapsible item containing a caret icon, the language name, and the language code.
**Validates: Requirements 2.3**

### Property 2: Language expand/collapse toggle
*For any* language item, clicking it when collapsed should expand it to show subcategories, and clicking it when expanded should collapse it to hide subcategories (round-trip behavior).
**Validates: Requirements 2.4, 2.5**

### Property 3: Expanded language shows all levels
*For any* expanded language, the system should display exactly three proficiency level options: Beginner, Intermediate, and Expert.
**Validates: Requirements 3.1**

### Property 4: Expanded language shows all topics
*For any* expanded language, the system should display exactly nine conversation topic options: General Chat, Sports, Movies & TV, Politics & News, Lifestyle & Travel, Business & Work, Gaming & Tech, Music & Culture, and Study & Homework Help.
**Validates: Requirements 3.2**

### Property 5: Subcategory rendering consistency
*For any* subcategory displayed within an expanded language, it should be rendered as a clickable item showing both the proficiency level and conversation topic.
**Validates: Requirements 3.3**

### Property 6: Subcategory selection updates state
*For any* subcategory, when clicked, the system should update the component state to store the selected language code, language name, proficiency level, and conversation topic.
**Validates: Requirements 3.4, 7.1, 7.2**

### Property 7: Subcategory selection generates rooms
*For any* subcategory selection, the system should generate and display between three and six room listings in the right column.
**Validates: Requirements 3.5, 4.2**

### Property 8: Room structure completeness
*For any* generated room listing, it should contain all required properties: unique room ID, language code, language name, proficiency level, conversation topic, display label, and active user count.
**Validates: Requirements 4.3**

### Property 9: Room display consistency
*For any* room listing displayed in the right column, it should show the room name, active user count, and level/topic tags.
**Validates: Requirements 4.4**

### Property 10: Room selection enables button
*For any* room listing, when clicked, the system should set that room as the selected room, store it in component state, and enable the "Go to Room" button.
**Validates: Requirements 4.5, 5.3, 7.3**

### Property 11: Room ID format consistency
*For any* generated room listing, the room ID should follow the deterministic format: `${languageCode}-${level}-${topic}-${variant}` where all components are lowercase and topics have spaces replaced with hyphens.
**Validates: Requirements 7.4**

### Property 12: Selection change clears room
*For any* language or category selection change, the system should clear the currently selected room (if any) and regenerate the room listings based on the new selection.
**Validates: Requirements 7.5**

### Property 13: Join room callback structure
*For any* selected room, when the "Go to Room" button is clicked, the onJoinRoom callback should be invoked with an object containing exactly these properties: id, languageCode, languageName, category (topic), and level.
**Validates: Requirements 5.5**

## Error Handling

### User Input Validation

1. **No Selection State**: When no language or category is selected, the right column displays an empty state message and the "Go to Room" button remains disabled
2. **Invalid State Transitions**: The component prevents invalid state transitions (e.g., selecting a room without first selecting a category)
3. **Missing Callback**: If `onJoinRoom` prop is not provided, the component should log a warning and disable the "Go to Room" button

### Edge Cases

1. **Rapid Clicking**: Debounce language expansion/collapse to prevent rapid state changes
2. **Multiple Selections**: Ensure only one language can be expanded at a time (optional UX improvement)
3. **Empty Room Generation**: If room generation fails, display an error message in the right column
4. **Theme Changes**: Component should re-render correctly when theme changes via ThemeContext

### Error Messages

```typescript
const ERROR_MESSAGES = {
  NO_SELECTION: 'Please choose a language and topic on the left',
  ROOM_GENERATION_FAILED: 'Unable to load rooms. Please try again.',
  NO_CALLBACK: 'Join room functionality is not available',
  COMING_SOON: "Custom rooms coming soon! You'll be able to create your own Lingo Room."
};
```

## Testing Strategy

### Unit Testing

The Join Room Selector will use **Vitest** and **React Testing Library** for unit testing, following the existing test patterns in the Lingo app.

**Test Coverage:**

1. **Component Rendering Tests**
   - Verify left column renders with correct content (welcome message, instructions, safety tips)
   - Verify middle column renders with all 25 languages in correct order
   - Verify right column shows empty state initially
   - Verify bottom bar renders with three buttons

2. **Interaction Tests**
   - Test language expansion/collapse on click
   - Test subcategory selection updates state
   - Test room selection enables "Go to Room" button
   - Test "Create New Room" shows modal
   - Test "Go to Room" calls callback with correct data

3. **State Management Tests**
   - Test state updates when language is selected
   - Test state updates when subcategory is selected
   - Test state updates when room is selected
   - Test state clears when selection changes

4. **Room Generation Tests**
   - Test room generation produces 3-6 rooms
   - Test room IDs follow correct format
   - Test room objects contain all required properties
   - Test active user counts are within expected ranges

### Property-Based Testing

The Join Room Selector will use **fast-check** for property-based testing to verify universal properties across all inputs.

**Property Test Configuration:**
- Minimum iterations: 100 runs per property
- Each test will be tagged with the format: `**Feature: join-room-selector, Property {number}: {property_text}**`

**Generators:**

```typescript
// Generator for language codes
const languageCodeGen = fc.constantFrom(...LANGUAGES.map(l => l.code));

// Generator for language objects
const languageGen = fc.constantFrom(...LANGUAGES);

// Generator for proficiency levels
const levelGen = fc.constantFrom('Beginner', 'Intermediate', 'Expert');

// Generator for conversation topics
const topicGen = fc.constantFrom(...TOPICS);

// Generator for subcategory selections
const subcategoryGen = fc.record({
  languageCode: languageCodeGen,
  languageName: fc.string(),
  level: levelGen,
  topic: topicGen
});

// Generator for room variants
const variantGen = fc.constantFrom('global', 'study', 'casual');
```

**Property Tests:**

1. **Property 1 Test**: Language Rendering Consistency
   - Generate random language from LANGUAGES list
   - Render component and verify language item has caret, name, and code

2. **Property 2 Test**: Language Expand/Collapse Toggle
   - Generate random language
   - Click to expand, verify subcategories visible
   - Click to collapse, verify subcategories hidden

3. **Property 3 Test**: Expanded Language Shows All Levels
   - Generate random language
   - Expand language
   - Verify exactly 3 levels displayed: Beginner, Intermediate, Expert

4. **Property 4 Test**: Expanded Language Shows All Topics
   - Generate random language
   - Expand language
   - Verify exactly 9 topics displayed

5. **Property 7 Test**: Subcategory Selection Generates Rooms
   - Generate random subcategory selection
   - Click subcategory
   - Verify 3-6 rooms generated

6. **Property 8 Test**: Room Structure Completeness
   - Generate random subcategory selection
   - Generate rooms
   - Verify each room has all required properties

7. **Property 11 Test**: Room ID Format Consistency
   - Generate random subcategory selection
   - Generate rooms
   - Verify each room ID matches format: `${languageCode}-${level}-${topic}-${variant}`

8. **Property 12 Test**: Selection Change Clears Room
   - Generate two different subcategory selections
   - Select first subcategory and a room
   - Select second subcategory
   - Verify selected room is cleared

9. **Property 13 Test**: Join Room Callback Structure
   - Generate random room selection
   - Click "Go to Room"
   - Verify callback receives object with id, languageCode, languageName, category, level

## Visual Design

### Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ Join Lingo Room                                          [_][X] │
├─────────────────────────────────────────────────────────────────┤
│ ┌──────────┬──────────────────┬──────────────────────────────┐ │
│ │  About   │    Languages     │        Room List             │ │
│ │          │                  │                              │ │
│ │ Welcome  │ ▶ English (en)   │ Please choose a language     │ │
│ │ to Lingo │ ▼ Spanish (es)   │ and topic on the left        │ │
│ │ Rooms    │   • Beginner     │                              │ │
│ │          │     - General    │                              │ │
│ │ How it   │     - Sports     │                              │ │
│ │ works:   │   • Intermediate │                              │ │
│ │ • Choose │   • Expert       │                              │ │
│ │ • Pick   │ ▶ French (fr)    │                              │ │
│ │ • Join   │ ▶ German (de)    │                              │ │
│ │          │ ...              │                              │ │
│ │ Safety   │                  │                              │ │
│ │ tips...  │                  │                              │ │
│ │          │                  │                              │ │
│ │ Active:  │                  │                              │ │
│ │ 1,248    │                  │                              │ │
│ └──────────┴──────────────────┴──────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│                    [Create New Room] [Go to Room] [Cancel]      │
└─────────────────────────────────────────────────────────────────┘
```

### Theme Integration

The component will consume theme values from ThemeContext:

```typescript
const styles = {
  windowBg: theme.windowBg || '#ECE9D8',
  headerBg: theme.titleBarBg || 'linear-gradient(180deg, #B8D4F0 0%, #8ABAED 100%)',
  textColor: theme.textColor || '#000',
  borderColor: theme.windowBorder || '#C0C0C0',
  hoverBg: theme.accent || '#5B7FA6',
  buttonBg: theme.buttonBg || 'linear-gradient(180deg, #E8E8E8 0%, #C0C0C0 100%)',
  buttonDisabled: '#D0D0D0'
};
```

### Responsive Behavior

- **Minimum width**: 800px
- **Minimum height**: 500px
- **Column widths**: 
  - Left: 200px (fixed)
  - Middle: 250px (fixed)
  - Right: flex (remaining space)
- **Scrolling**: Each column independently scrollable if content overflows

## Implementation Notes

### Performance Considerations

1. **Memoization**: Use `useMemo` for room generation to avoid recalculating on every render
2. **Callback Optimization**: Use `useCallback` for event handlers to prevent unnecessary re-renders
3. **Virtual Scrolling**: Not needed initially (25 languages is manageable), but consider if language list grows

### Accessibility

1. **Keyboard Navigation**: Support Tab, Enter, and Arrow keys for navigation
2. **ARIA Labels**: Add appropriate aria-labels to buttons and interactive elements
3. **Focus Management**: Ensure focus is visible and logical
4. **Screen Reader Support**: Add aria-live regions for dynamic content updates

### Future Enhancements

1. **Search/Filter**: Add search box to filter languages
2. **Favorites**: Allow users to favorite languages for quick access
3. **Recent Rooms**: Show recently joined rooms
4. **Room Details**: Show more information about rooms (description, rules, moderators)
5. **Real User Counts**: Replace mock data with actual Firebase queries
6. **Room Creation**: Implement full custom room creation flow
