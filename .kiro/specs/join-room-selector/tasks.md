# Implementation Plan - Join Room Selector

- [x] 1. Create JoinRoomWindow component structure and constants
  - Create new file `src/components/Windows/JoinRoomWindow.jsx`
  - Define LANGUAGES array with all 25 languages (code and name pairs)
  - Define LEVELS array: ['Beginner', 'Intermediate', 'Expert']
  - Define TOPICS array with 9 conversation topics
  - Set up component state: selectedLanguageCode, selectedLanguageName, selectedCategory, expandedLanguages, availableRooms, selectedRoom
  - Import necessary dependencies (React hooks, theme context, icons)
  - _Requirements: 2.2, 3.1, 3.2_

- [x] 2. Implement left column (About & Instructions)
  - Create LeftColumn component or section within JoinRoomWindow
  - Add "Welcome to Lingo Rooms" title
  - Add app description text
  - Add "How it works" section with 3-5 bullet points
  - Add safety tips section with smaller text
  - Add "Active now" indicator with mock count (e.g., 1,248)
  - Apply theme-aware styling using ThemeContext
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ] 3. Implement middle column (Languages & Categories)
- [x] 3.1 Create language list rendering
  - Map through LANGUAGES array to render language items
  - Display language name and code for each item
  - Add caret icon (collapsed/expanded state indicator)
  - Make language items clickable
  - Apply hover effects and theme-aware styling
  - _Requirements: 2.1, 2.2, 2.3_

- [ ]* 3.2 Write property test for language rendering
  - **Property 1: Language rendering consistency**
  - **Validates: Requirements 2.3**

- [x] 3.3 Implement language expand/collapse functionality
  - Add click handler to toggle language expansion
  - Update expandedLanguages state (Set data structure)
  - Conditionally render subcategories when language is expanded
  - Update caret icon direction based on expansion state
  - _Requirements: 2.4, 2.5_

- [ ]* 3.4 Write property test for expand/collapse toggle
  - **Property 2: Language expand/collapse toggle**
  - **Validates: Requirements 2.4, 2.5**

- [x] 3.5 Implement subcategory rendering
  - Create nested list structure for levels and topics
  - Render all 3 levels when language is expanded
  - Render all 9 topics when language is expanded
  - Format subcategory items as clickable elements showing "Level - Topic"
  - Add click handler for subcategory selection
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ]* 3.6 Write property tests for subcategory structure
  - **Property 3: Expanded language shows all levels**
  - **Property 4: Expanded language shows all topics**
  - **Property 5: Subcategory rendering consistency**
  - **Validates: Requirements 3.1, 3.2, 3.3**

- [ ] 4. Implement room generation logic
- [x] 4.1 Create generateRooms function
  - Accept parameters: languageCode, languageName, level, topic
  - Define room variants: global, study, casual with different prefixes and user ranges
  - Generate 3-6 room objects with unique IDs
  - Format room ID as: `${languageCode}-${level}-${topic}-${variant}` (lowercase, hyphens)
  - Generate random active user counts within variant-specific ranges
  - Return array of Room objects with all required properties
  - _Requirements: 4.2, 4.3, 7.4_

- [ ]* 4.2 Write property tests for room generation
  - **Property 7: Subcategory selection generates rooms**
  - **Property 8: Room structure completeness**
  - **Property 11: Room ID format consistency**
  - **Validates: Requirements 3.5, 4.2, 4.3, 7.4**

- [x] 4.3 Implement subcategory selection handler
  - Create handleSubcategoryClick function
  - Update selectedLanguageCode, selectedLanguageName, selectedCategory state
  - Call generateRooms with selected parameters
  - Update availableRooms state with generated rooms
  - Clear selectedRoom state when new subcategory is selected
  - _Requirements: 3.4, 3.5, 7.1, 7.2, 7.5_

- [ ]* 4.4 Write property tests for state management
  - **Property 6: Subcategory selection updates state**
  - **Property 12: Selection change clears room**
  - **Validates: Requirements 3.4, 7.1, 7.2, 7.5**

- [ ] 5. Implement right column (Room List)
- [x] 5.1 Create room list rendering
  - Conditionally render empty state when no selection: "Please choose a language and topic on the left"
  - Map through availableRooms to render room list items
  - Display room label, active user count, and level/topic tags for each room
  - Make room items clickable
  - Highlight selected room with different background color
  - Apply hover effects and theme-aware styling
  - _Requirements: 4.1, 4.4, 4.5_

- [ ]* 5.2 Write property tests for room display and selection
  - **Property 9: Room display consistency**
  - **Property 10: Room selection enables button**
  - **Validates: Requirements 4.4, 4.5, 5.3, 7.3**

- [x] 5.3 Implement room selection handler
  - Create handleRoomClick function
  - Update selectedRoom state with clicked room object
  - Enable "Go to Room" button when room is selected
  - _Requirements: 4.5, 7.3_

- [ ] 6. Implement bottom action bar
- [x] 6.1 Create button bar layout
  - Create bottom bar container with right-aligned buttons
  - Add "Create New Room" button (secondary style)
  - Add "Go to Room" button (primary style, conditionally disabled)
  - Add "Cancel" button (ghost style)
  - Apply theme-aware styling with beveled button effects
  - _Requirements: 5.1, 5.2_

- [x] 6.2 Implement "Create New Room" functionality
  - Add click handler to show modal/alert
  - Display message: "Custom rooms coming soon! You'll be able to create your own Lingo Room."
  - Use browser alert or create simple modal component
  - _Requirements: 5.4_

- [x] 6.3 Implement "Go to Room" functionality
  - Add click handler that calls onJoinRoom prop
  - Pass room object with properties: id, languageCode, languageName, category (topic), level
  - Ensure button is disabled when no room is selected
  - _Requirements: 5.2, 5.3, 5.5_

- [ ]* 6.4 Write property test for join room callback
  - **Property 13: Join room callback structure**
  - **Validates: Requirements 5.5**

- [x] 6.5 Implement "Cancel" functionality
  - Add click handler to close window or call onCancel prop
  - Clear all selections and reset state (optional)
  - _Requirements: 5.1_

- [ ] 7. Integrate JoinRoomWindow with window management system
- [x] 7.1 Register new window type in WindowContext
  - Update WindowManager to handle 'joinRoom' window type
  - Map 'joinRoom' type to JoinRoomWindow component
  - Set default window size (800x600) and position
  - _Requirements: 6.1_

- [x] 7.2 Update HomePage to open JoinRoomWindow
  - Modify entry point to open JoinRoomWindow instead of ChatRoomWindow
  - Pass onJoinRoom callback that opens ChatRoomWindow with selected room config
  - Update "Start" menu or initial button to trigger JoinRoomWindow
  - _Requirements: 6.1_

- [x] 7.3 Implement room-to-chat navigation
  - Create handleJoinRoom function in parent component
  - Extract room configuration from selected room
  - Close JoinRoomWindow
  - Open ChatRoomWindow with room configuration (language, level, topic)
  - Update useFirebaseChat to accept dynamic room IDs
  - _Requirements: 5.5_

- [ ] 8. Apply retro Yahoo Chat styling
- [x] 8.1 Style the window container
  - Apply blue/grey header bar using theme values
  - Set light beige/off-white background (#ECE9D8 or theme value)
  - Add subtle borders (2px solid) and rounded corners
  - Use Tailwind classes for spacing and layout
  - Ensure window title is "Join Lingo Room"
  - _Requirements: 6.1, 6.2_

- [x] 8.2 Style the three-column layout
  - Create flex container with three columns
  - Set fixed widths for left (200px) and middle (250px) columns
  - Make right column flexible (remaining space)
  - Add vertical borders between columns
  - Make each column independently scrollable
  - Apply typography: text-sm/text-xs for lists, text-base for main text, font-semibold for headings
  - _Requirements: 6.2, 6.3, 6.5_

- [x] 8.3 Add hover effects and interactive states
  - Add hover background color for language items
  - Add hover background color for subcategory items
  - Add hover background color for room list items
  - Add selected state styling for rooms (highlighted background)
  - Add button hover effects (beveled inset/outset)
  - Ensure all hover effects use theme colors
  - _Requirements: 6.4_

- [ ] 9. Add error handling and edge cases
- [x] 9.1 Handle missing props
  - Check if onJoinRoom prop is provided
  - Log warning and disable "Go to Room" button if missing
  - Add PropTypes or TypeScript types for component props
  - _Requirements: 5.5_

- [x] 9.2 Handle empty states
  - Display empty state message in right column when no selection
  - Handle case where room generation returns empty array
  - Display error message if room generation fails
  - _Requirements: 4.1_

- [x] 9.3 Add debouncing for rapid interactions
  - Debounce language expand/collapse clicks (optional enhancement)
  - Prevent double-clicks on "Go to Room" button
  - _Requirements: 2.4, 2.5_

- [ ]* 10. Write unit tests for component
  - Test left column renders with correct content
  - Test middle column renders all 25 languages in order
  - Test right column shows empty state initially
  - Test bottom bar renders with three buttons
  - Test "Go to Room" button is disabled initially
  - Test "Create New Room" shows modal
  - Test language expansion shows subcategories
  - Test subcategory click generates rooms
  - Test room click enables "Go to Room" button
  - Test "Go to Room" calls callback with correct data
  - _Requirements: All_

- [x] 11. Final integration and testing
  - Test complete user flow: open window → select language → select subcategory → select room → join room
  - Test with all 4 themes (Retro Yahoo, Halloween, Cyberpunk, Clean Modern)
  - Test window dragging, resizing, minimizing, closing
  - Verify responsive layout on 13" laptop screen
  - Test keyboard navigation (Tab, Enter)
  - Verify integration with existing ChatRoomWindow
  - _Requirements: All_
