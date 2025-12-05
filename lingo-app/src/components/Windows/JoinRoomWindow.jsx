import { useState } from 'react';
import { ChevronRight, ChevronDown, Users } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

// Language constants - 25 major world languages
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

// Proficiency levels
const LEVELS = ['Beginner', 'Intermediate', 'Expert'];

// Conversation topics - flat list of parent categories only
const TOPIC_CATEGORIES = [
  'Movies & TV',
  'Sports',
  'Politics & News',
  'Lifestyle & Travel',
  'Business & Work',
  'Gaming & Tech',
  'Music & Culture',
  'Study & Homework'
];

// Subcategories mapping for room generation
const TOPIC_SUBCATEGORIES = {
  'Movies & TV': ['Horror', 'Thriller', 'Action', 'Comedy', 'Romance', 'Sci-Fi', 'Anime', 'Marvel', 'DC', 'Harry Potter'],
  'Sports': ['Cricket', 'Football', 'Basketball', 'Tennis', 'Kabaddi', 'Badminton'],
  'Politics & News': ['Breaking News', 'World Politics', 'Country Politics', 'Global Affairs', 'Finance & Markets'],
  'Lifestyle & Travel': ['Travel (Europe/Asia)', 'Fitness', 'Healthy Eating', 'Culture', 'Festivals', 'Photography'],
  'Business & Work': ['Startups', 'Freelancing', 'Interviews', 'Digital Marketing', 'Social Media'],
  'Gaming & Tech': ['Valorant', 'PUBG', 'FIFA', 'Minecraft', 'AI & ML', 'Gadgets'],
  'Music & Culture': ['Pop', 'Rock', 'Hip-Hop', 'Classical', 'Dance', 'Painting'],
  'Study & Homework': ['Math', 'Science', 'English', 'IELTS', 'Pomodoro']
};

// Room generation function
function generateRooms(languageCode, languageName, level, topic) {
  // For levels (Beginner, Intermediate, Expert), show Global/Study/Casual variants
  if (level && !topic) {
    const variants = [
      { variant: 'global', prefix: '[Global]', userRange: [15, 50] },
      { variant: 'study', prefix: '[Study]', userRange: [5, 20] },
      { variant: 'casual', prefix: '[Casual]', userRange: [8, 30] }
    ];

    return variants.map(({ variant, prefix, userRange }) => {
      const activeUsers = Math.floor(Math.random() * (userRange[1] - userRange[0] + 1)) + userRange[0];
      
      return {
        id: `${languageCode}-${level.toLowerCase()}-${variant}`,
        languageCode,
        languageName,
        level,
        topic: 'All Topics',
        label: `${prefix} ${languageName} ${level}`,
        activeUsers,
        variant
      };
    });
  }
  
  // Check if the topic is a parent category with subcategories
  const subcategories = TOPIC_SUBCATEGORIES[topic];
  
  // If it's a parent category with subcategories, show subcategories as rooms
  if (subcategories && subcategories.length > 0) {
    return subcategories.map((subcategory) => {
      const activeUsers = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
      const topicForId = subcategory.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and').replace(/\(/g, '').replace(/\)/g, '');
      
      return {
        id: `${languageCode}-any-${topicForId}`,
        languageCode,
        languageName,
        level: 'All Levels',
        topic: subcategory,
        label: `${languageName} – ${subcategory}`,
        activeUsers,
        variant: subcategory
      };
    });
  }
  
  // For specific subcategory topics, show as single room
  return [{
    id: `${languageCode}-any-${topic.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and').replace(/\(/g, '').replace(/\)/g, '')}`,
    languageCode,
    languageName,
    level: 'All Levels',
    topic: topic || 'All Topics',
    label: `${languageName} – ${topic}`,
    activeUsers: Math.floor(Math.random() * (50 - 10 + 1)) + 10,
    variant: topic
  }];
}

export default function JoinRoomWindow({ onJoinRoom, onCancel }) {
  // Component state
  const [selectedLanguageCode, setSelectedLanguageCode] = useState(null);
  const [selectedLanguageName, setSelectedLanguageName] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); // { level, topic }
  const [expandedLanguages, setExpandedLanguages] = useState(new Set());
  const [availableRooms, setAvailableRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const { theme } = useTheme();

  // Warn if onJoinRoom is not provided
  if (!onJoinRoom) {
    console.warn('JoinRoomWindow: onJoinRoom prop is not provided. "Go to Room" functionality will be disabled.');
  }

  // Toggle language expansion
  const handleLanguageClick = (languageCode) => {
    const newExpanded = new Set(expandedLanguages);
    if (newExpanded.has(languageCode)) {
      newExpanded.delete(languageCode);
    } else {
      newExpanded.add(languageCode);
    }
    setExpandedLanguages(newExpanded);
  };

  // Handle category selection (level or topic)
  const handleCategoryClick = (languageCode, languageName, level, topic) => {
    setSelectedLanguageCode(languageCode);
    setSelectedLanguageName(languageName);
    setSelectedCategory({ level, topic });
    setSelectedRoom(null); // Clear selected room when changing category
    
    // Generate rooms for this selection
    const rooms = generateRooms(languageCode, languageName, level, topic);
    setAvailableRooms(rooms);
  };

  // Handle room selection
  const handleRoomClick = (room) => {
    setSelectedRoom(room);
  };

  // Handle "Create New Room" button
  const handleCreateRoom = () => {
    alert("Custom rooms coming soon! You'll be able to create your own Lingo Room.");
  };

  // Handle "Go to Room" button
  const handleGoToRoom = () => {
    if (selectedRoom && onJoinRoom) {
      onJoinRoom({
        id: selectedRoom.id,
        languageCode: selectedRoom.languageCode,
        languageName: selectedRoom.languageName,
        category: selectedRoom.topic,
        level: selectedRoom.level
      });
    }
  };

  // Handle "Cancel" button
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      height: '100%',
      background: theme.windowBg || '#ECE9D8'
    }}>
      {/* Main content area with three columns */}
      <div style={{ 
        flex: 1, 
        display: 'flex',
        overflow: 'hidden'
      }}>
        {/* Left Column - About & Instructions */}
        <div style={{
          width: '200px',
          borderRight: `2px solid ${theme.windowBorder || '#C0C0C0'}`,
          padding: '12px',
          overflowY: 'auto',
          background: theme.toolbarBg || '#ECE9D8'
        }}>
          {/* Welcome Title */}
          <h3 style={{ 
            fontSize: '14px', 
            fontWeight: 'bold',
            marginBottom: '8px',
            fontFamily: 'Tahoma, sans-serif',
            color: theme.textColor || '#000'
          }}>
            Welcome to Lingo Rooms
          </h3>

          {/* App Description */}
          <p style={{ 
            fontSize: '11px', 
            marginBottom: '12px',
            lineHeight: '1.4',
            fontFamily: 'Verdana, sans-serif',
            color: theme.textColor || '#000'
          }}>
            A global language practice lounge where you can join rooms by language, level, and topic. Messages go through Gemini for language help.
          </p>

          {/* How it Works Section */}
          <div style={{ marginBottom: '12px' }}>
            <h4 style={{
              fontSize: '12px',
              fontWeight: 'bold',
              marginBottom: '6px',
              fontFamily: 'Tahoma, sans-serif',
              color: theme.textColor || '#000'
            }}>
              How it works:
            </h4>
            <ul style={{
              fontSize: '10px',
              lineHeight: '1.5',
              paddingLeft: '16px',
              margin: 0,
              fontFamily: 'Verdana, sans-serif',
              color: theme.textColor || '#000'
            }}>
              <li>Choose a language in the middle</li>
              <li>Pick your level and topic</li>
              <li>Join a global room and start chatting</li>
              <li>Get AI-powered language assistance</li>
            </ul>
          </div>

          {/* Safety Tips Section */}
          <div style={{ marginBottom: '12px' }}>
            <h4 style={{
              fontSize: '11px',
              fontWeight: 'bold',
              marginBottom: '4px',
              fontFamily: 'Tahoma, sans-serif',
              color: theme.textColor || '#000'
            }}>
              Safety & Usage Tips:
            </h4>
            <p style={{
              fontSize: '9px',
              lineHeight: '1.4',
              margin: 0,
              fontFamily: 'Verdana, sans-serif',
              color: '#666',
              fontStyle: 'italic'
            }}>
              • Be respectful to all learners<br />
              • No sharing of personal information<br />
              • This is for practice, not professional translation
            </p>
          </div>

          {/* Active Now Indicator */}
          <div style={{
            marginTop: 'auto',
            paddingTop: '12px',
            borderTop: `1px solid ${theme.windowBorder || '#C0C0C0'}`
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '10px',
              fontFamily: 'Verdana, sans-serif',
              color: theme.accent || '#0257EE'
            }}>
              <Users size={14} />
              <span style={{ fontWeight: 'bold' }}>
                Currently active learners: 1,248 worldwide
              </span>
            </div>
          </div>
        </div>

        {/* Middle Column - Languages & Categories */}
        <div style={{
          width: '250px',
          borderRight: `2px solid ${theme.windowBorder || '#C0C0C0'}`,
          display: 'flex',
          flexDirection: 'column',
          background: theme.categoryBg || '#FFFFFF'
        }}>
          <div style={{
            padding: '8px',
            background: theme.sectionHeaderBg || theme.titleBarBg,
            borderBottom: `2px solid ${theme.windowBorder || '#C0C0C0'}`,
            fontWeight: 'bold',
            fontSize: '13px',
            fontFamily: 'Tahoma, sans-serif',
            color: theme.sectionHeaderText || theme.titleBarText
          }}>
            Languages
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '4px', background: theme.categoryBg || '#FFFFFF' }}>
            {LANGUAGES.map((language) => {
              const isExpanded = expandedLanguages.has(language.code);
              return (
                <div key={language.code} style={{ marginBottom: '2px' }}>
                  {/* Language Item */}
                  <div
                    onClick={() => handleLanguageClick(language.code)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 8px',
                      cursor: 'pointer',
                      fontSize: '11px',
                      fontFamily: 'Verdana, sans-serif',
                      background: isExpanded ? (theme.selectedCategoryBg || '#E0E0E0') : 'transparent',
                      borderRadius: '2px',
                      color: '#000'
                    }}
                    onMouseEnter={(e) => {
                      if (!isExpanded) {
                        e.currentTarget.style.background = theme.hoverCategoryBg || '#F0F0F0';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isExpanded) {
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    {/* Caret Icon */}
                    {isExpanded ? (
                      <ChevronDown size={14} style={{ flexShrink: 0 }} />
                    ) : (
                      <ChevronRight size={14} style={{ flexShrink: 0 }} />
                    )}
                    {/* Language Name and Code */}
                    <span style={{ fontWeight: isExpanded ? 'bold' : 'normal' }}>
                      {language.name} ({language.code})
                    </span>
                  </div>

                  {/* Categories (shown when expanded) - Flat list */}
                  {isExpanded && (
                    <div style={{ paddingLeft: '24px', marginTop: '4px', marginBottom: '8px' }}>
                      {/* Levels Section */}
                      {LEVELS.map((level) => (
                        <div
                          key={level}
                          onClick={() => handleCategoryClick(language.code, language.name, level, null)}
                          style={{
                            padding: '4px 8px',
                            fontSize: '10px',
                            cursor: 'pointer',
                            borderRadius: '2px',
                            marginBottom: '2px',
                            fontFamily: 'Verdana, sans-serif',
                            fontWeight: 'bold',
                            background: 
                              selectedLanguageCode === language.code &&
                              selectedCategory?.level === level &&
                              !selectedCategory?.topic
                                ? (theme.selectedCategoryBg || '#D0D0D0')
                                : 'transparent',
                            color: theme.accent || '#0257EE'
                          }}
                          onMouseEnter={(e) => {
                            if (!(selectedLanguageCode === language.code &&
                                  selectedCategory?.level === level &&
                                  !selectedCategory?.topic)) {
                              e.currentTarget.style.background = theme.hoverCategoryBg || '#F0F0F0';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!(selectedLanguageCode === language.code &&
                                  selectedCategory?.level === level &&
                                  !selectedCategory?.topic)) {
                              e.currentTarget.style.background = 'transparent';
                            }
                          }}
                        >
                          • {level}
                        </div>
                      ))}

                      {/* Topics Section - Flat list */}
                      {TOPIC_CATEGORIES.map((category) => (
                        <div
                          key={category}
                          onClick={() => handleCategoryClick(language.code, language.name, null, category)}
                          style={{
                            padding: '4px 8px',
                            fontSize: '10px',
                            cursor: 'pointer',
                            borderRadius: '2px',
                            marginBottom: '2px',
                            fontFamily: 'Verdana, sans-serif',
                            background: 
                              selectedLanguageCode === language.code &&
                              selectedCategory?.topic === category &&
                              !selectedCategory?.level
                                ? (theme.selectedCategoryBg || '#D0D0D0')
                                : 'transparent',
                            color: '#000'
                          }}
                          onMouseEnter={(e) => {
                            if (!(selectedLanguageCode === language.code &&
                                  selectedCategory?.topic === category &&
                                  !selectedCategory?.level)) {
                              e.currentTarget.style.background = theme.hoverCategoryBg || '#F0F0F0';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!(selectedLanguageCode === language.code &&
                                  selectedCategory?.topic === category &&
                                  !selectedCategory?.level)) {
                              e.currentTarget.style.background = 'transparent';
                            }
                          }}
                        >
                          • {category}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column - Room List */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: '#FFFFFF'
        }}>
          <div style={{
            padding: '8px',
            background: theme.sectionHeaderBg || theme.titleBarBg,
            borderBottom: `2px solid ${theme.windowBorder || '#C0C0C0'}`,
            fontWeight: 'bold',
            fontSize: '13px',
            fontFamily: 'Tahoma, sans-serif',
            color: theme.sectionHeaderText || theme.titleBarText
          }}>
            Available Rooms
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px', background: theme.chatBg || '#FFFFFF' }}>
            {/* Empty State */}
            {availableRooms.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                color: '#999',
                fontSize: '12px',
                fontFamily: 'Verdana, sans-serif',
                lineHeight: '1.6'
              }}>
                Please choose a language and topic on the left
              </div>
            )}

            {/* Room List */}
            {availableRooms.map((room) => (
              <div
                key={room.id}
                onClick={() => handleRoomClick(room)}
                style={{
                  padding: '10px 12px',
                  marginBottom: '8px',
                  border: `2px solid ${selectedRoom?.id === room.id ? (theme.selectedRoomBorder || theme.accent) : '#D0D0D0'}`,
                  borderRadius: '4px',
                  cursor: 'pointer',
                  background: selectedRoom?.id === room.id ? (theme.selectedRoomBg || '#E0E0E0') : (theme.chatBg || '#FFFFFF'),
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (selectedRoom?.id !== room.id) {
                    e.currentTarget.style.background = '#F5F5F5';
                    e.currentTarget.style.borderColor = '#B0B0B0';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedRoom?.id !== room.id) {
                    e.currentTarget.style.background = '#FFFFFF';
                    e.currentTarget.style.borderColor = '#D0D0D0';
                  }
                }}
              >
                {/* Room Label */}
                <div style={{
                  fontSize: '12px',
                  fontWeight: 'bold',
                  marginBottom: '6px',
                  fontFamily: 'Tahoma, sans-serif',
                  color: '#000'
                }}>
                  {room.label}
                </div>

                {/* Room Details */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '10px',
                  fontFamily: 'Verdana, sans-serif',
                  color: '#666'
                }}>
                  {/* Active Users */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Users size={12} />
                    <span>{room.activeUsers} active</span>
                  </div>

                  {/* Level Tag */}
                  <span style={{
                    padding: '2px 6px',
                    background: theme.levelTagBg || '#E0E0E0',
                    borderRadius: '3px',
                    fontSize: '9px',
                    fontWeight: 'bold',
                    color: theme.levelTagColor || theme.accent
                  }}>
                    {room.level}
                  </span>

                  {/* Topic Tag */}
                  <span style={{
                    padding: '2px 6px',
                    background: '#F0F0F0',
                    borderRadius: '3px',
                    fontSize: '9px',
                    color: '#666'
                  }}>
                    {room.topic}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div style={{
        borderTop: `2px solid ${theme.windowBorder || '#C0C0C0'}`,
        padding: '8px 12px',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '8px',
        background: theme.toolbarBg || '#ECE9D8'
      }}>
        <button
          onClick={handleCreateRoom}
          style={{
            padding: '6px 14px',
            background: theme.buttonBg || 'linear-gradient(180deg, #E8E8E8 0%, #C0C0C0 100%)',
            color: theme.buttonText || '#000',
            border: `2px outset ${theme.windowBorder || '#C0C0C0'}`,
            borderRadius: '2px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 'bold',
            fontFamily: 'Tahoma, sans-serif'
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.border = `2px inset ${theme.windowBorder || '#C0C0C0'}`;
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.border = `2px outset ${theme.windowBorder || '#C0C0C0'}`;
          }}
        >
          Create New Room
        </button>
        <button
          onClick={handleGoToRoom}
          disabled={!selectedRoom || !onJoinRoom}
          style={{
            padding: '6px 14px',
            background: (selectedRoom && onJoinRoom)
              ? (theme.buttonBg || 'linear-gradient(180deg, #E8E8E8 0%, #C0C0C0 100%)')
              : '#D0D0D0',
            color: (selectedRoom && onJoinRoom) ? (theme.buttonText || '#000') : '#808080',
            border: `2px outset ${theme.windowBorder || '#C0C0C0'}`,
            borderRadius: '2px',
            cursor: (selectedRoom && onJoinRoom) ? 'pointer' : 'not-allowed',
            fontSize: '12px',
            fontWeight: 'bold',
            fontFamily: 'Tahoma, sans-serif'
          }}
          onMouseDown={(e) => {
            if (selectedRoom && onJoinRoom) {
              e.currentTarget.style.border = `2px inset ${theme.windowBorder || '#C0C0C0'}`;
            }
          }}
          onMouseUp={(e) => {
            if (selectedRoom && onJoinRoom) {
              e.currentTarget.style.border = `2px outset ${theme.windowBorder || '#C0C0C0'}`;
            }
          }}
        >
          Go to Room
        </button>
        <button
          onClick={handleCancel}
          style={{
            padding: '6px 14px',
            background: theme.buttonBg || 'linear-gradient(180deg, #E8E8E8 0%, #C0C0C0 100%)',
            color: theme.buttonText || '#000',
            border: `2px outset ${theme.windowBorder || '#C0C0C0'}`,
            borderRadius: '2px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 'bold',
            fontFamily: 'Tahoma, sans-serif'
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.border = `2px inset ${theme.windowBorder || '#C0C0C0'}`;
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.border = `2px outset ${theme.windowBorder || '#C0C0C0'}`;
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
