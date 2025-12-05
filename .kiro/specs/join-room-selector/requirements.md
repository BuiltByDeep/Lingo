# Requirements Document

## Introduction

The Join Room Selector is a Yahoo Chat-inspired interface that allows users to browse and select language learning rooms before entering a chat. This feature replaces the current direct entry into the Spanish global room with a comprehensive room selection experience. The interface presents users with a three-column layout displaying app information, language categories with subcategories (levels and topics), and available rooms based on their selection. Users can browse through 25 major world languages, filter by proficiency level (Beginner, Intermediate, Expert), and choose from various conversation topics (General Chat, Sports, Movies & TV, etc.). The system generates mock room listings with active user counts and provides action buttons for creating rooms, joining selected rooms, or canceling the selection.

## Glossary

- **Join Room Selector**: The main window component that displays the room browsing and selection interface
- **Language Category**: One of 25 supported languages that can be expanded to show subcategories
- **Subcategory**: A combination of proficiency level and conversation topic within a language
- **Proficiency Level**: The skill level classification (Beginner, Intermediate, Expert) for language learners
- **Conversation Topic**: The subject matter focus for a chat room (e.g., General Chat, Sports, Movies & TV)
- **Room Listing**: A generated room entry showing room name, active user count, and metadata
- **Active User Count**: The number of users currently in a specific room (mock data for initial implementation)
- **Room Selection**: The user's chosen room that will be joined when "Go to Room" is clicked
- **Desktop Window**: The draggable, resizable window container that hosts the Join Room Selector
- **Lingo System**: The overall language learning chat application

## Requirements

### Requirement 1

**User Story:** As a language learner, I want to see information about the Lingo app when I open the room selector, so that I understand what the platform offers and how to use it.

#### Acceptance Criteria

1. WHEN the Join Room Selector opens THEN the Lingo System SHALL display a left column with the title "Welcome to Lingo Rooms"
2. WHEN the left column renders THEN the Lingo System SHALL display a description stating the app is a global language practice lounge where users can join rooms by language, level, and topic
3. WHEN the left column renders THEN the Lingo System SHALL display a "How it works" section with three to five instructional bullet points
4. WHEN the left column renders THEN the Lingo System SHALL display safety and usage tips in smaller text including respect guidelines, privacy warnings, and practice disclaimers
5. WHEN the left column renders THEN the Lingo System SHALL display an "Active now" indicator showing a mock count of worldwide active learners

### Requirement 2

**User Story:** As a language learner, I want to browse through 25 major world languages in a collapsible tree structure, so that I can find the language I want to practice.

#### Acceptance Criteria

1. WHEN the Join Room Selector opens THEN the Lingo System SHALL display a middle column with the heading "Languages"
2. WHEN the middle column renders THEN the Lingo System SHALL display all 25 languages in the following order: English (en), Mandarin Chinese (zh), Hindi (hi), Spanish (es), French (fr), Arabic (ar), Bengali (bn), Portuguese (pt), Russian (ru), Urdu (ur), Indonesian (id), German (de), Japanese (ja), Swahili (sw), Marathi (mr), Telugu (te), Turkish (tr), Tamil (ta), Vietnamese (vi), Korean (ko), Italian (it), Persian/Farsi (fa), Polish (pl), Ukrainian (uk), Dutch (nl)
3. WHEN a language is displayed THEN the Lingo System SHALL render it as a collapsible item with a caret icon, language name, and language code
4. WHEN a user clicks a collapsed language item THEN the Lingo System SHALL expand the item to show its subcategories
5. WHEN a user clicks an expanded language item THEN the Lingo System SHALL collapse the item to hide its subcategories

### Requirement 3

**User Story:** As a language learner, I want to see proficiency levels and conversation topics within each language, so that I can find rooms that match my skill level and interests.

#### Acceptance Criteria

1. WHEN a language is expanded THEN the Lingo System SHALL display three proficiency level options: Beginner, Intermediate, and Expert
2. WHEN a language is expanded THEN the Lingo System SHALL display nine conversation topic options: General Chat, Sports, Movies & TV, Politics & News, Lifestyle & Travel, Business & Work, Gaming & Tech, Music & Culture, and Study & Homework Help
3. WHEN subcategories are displayed THEN the Lingo System SHALL render each as a clickable item showing the level and topic combination
4. WHEN a user clicks a subcategory THEN the Lingo System SHALL set the selected language and category combination
5. WHEN a subcategory is selected THEN the Lingo System SHALL generate and display corresponding room listings in the right column

### Requirement 4

**User Story:** As a language learner, I want to see available rooms based on my selected language and category, so that I can choose which specific room to join.

#### Acceptance Criteria

1. WHEN no language or category is selected THEN the Lingo System SHALL display "Please choose a language and topic on the left" in the right column
2. WHEN a user selects a language and category combination THEN the Lingo System SHALL generate three to six mock room listings for that combination
3. WHEN a room listing is generated THEN the Lingo System SHALL include a unique room ID, language code, language name, proficiency level, conversation topic, display label, and active user count
4. WHEN a room listing is displayed THEN the Lingo System SHALL show the room name, active user count, and level/topic tags
5. WHEN a user clicks a room listing THEN the Lingo System SHALL set that room as the selected room and enable the "Go to Room" button

### Requirement 5

**User Story:** As a language learner, I want to join my selected room or cancel my selection, so that I can enter a chat room or return to the previous screen.

#### Acceptance Criteria

1. WHEN the Join Room Selector renders THEN the Lingo System SHALL display a bottom bar with three buttons: "Create New Room", "Go to Room", and "Cancel"
2. WHEN no room is selected THEN the Lingo System SHALL disable the "Go to Room" button
3. WHEN a room is selected THEN the Lingo System SHALL enable the "Go to Room" button
4. WHEN a user clicks "Create New Room" THEN the Lingo System SHALL display a modal stating "Custom rooms coming soon! You'll be able to create your own Lingo Room."
5. WHEN a user clicks "Go to Room" with a selected room THEN the Lingo System SHALL call the onJoinRoom callback with the selected room object containing id, languageCode, languageName, category, and level properties

### Requirement 6

**User Story:** As a language learner, I want the room selector to have a retro Yahoo Chat aesthetic that matches the existing Lingo app, so that I have a consistent and nostalgic user experience.

#### Acceptance Criteria

1. WHEN the Join Room Selector renders THEN the Lingo System SHALL display the interface within a Desktop Window with the title "Join Lingo Room"
2. WHEN the Join Room Selector renders THEN the Lingo System SHALL apply a blue/grey header bar, light beige/off-white background, subtle borders, and rounded corners
3. WHEN the Join Room Selector renders THEN the Lingo System SHALL use Tailwind CSS classes for typography including text-sm or text-xs for lists, text-base for main text, and font-semibold for headings
4. WHEN a user hovers over room listings or subcategories THEN the Lingo System SHALL display hover effects
5. WHEN the Join Room Selector renders THEN the Lingo System SHALL ensure the layout is responsive for 13-inch laptop screens and larger

### Requirement 7

**User Story:** As a language learner, I want the room selector to maintain state for my selections, so that I can navigate through languages and categories without losing my place.

#### Acceptance Criteria

1. WHEN a user selects a language THEN the Lingo System SHALL store the selected language code and name in component state
2. WHEN a user selects a subcategory THEN the Lingo System SHALL store the selected level and topic in component state
3. WHEN a user selects a room THEN the Lingo System SHALL store the selected room object in component state
4. WHEN room listings are generated THEN the Lingo System SHALL create deterministic room IDs using the format: languageCode-level-topic-variant
5. WHEN a user changes their language or category selection THEN the Lingo System SHALL clear the selected room and regenerate room listings
