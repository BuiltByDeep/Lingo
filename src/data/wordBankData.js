/**
 * Word Bank Data for Word Scramble Challenge
 * 
 * Each word includes:
 * - word: The English word in uppercase
 * - level: Difficulty level (beginner, intermediate, advanced)
 * - category: Thematic category
 * - hint: Short hint text
 * - meaning: Simple English definition
 * - example: Example sentence using the word
 */

export const WORD_BANK = [
  // ============================================
  // BEGINNER LEVEL (3-5 letter common nouns)
  // ============================================
  
  // Category: Home & Objects
  {
    word: 'TABLE',
    level: 'beginner',
    category: 'Home & Objects',
    hint: 'A piece of furniture',
    meaning: 'An object you eat or work on',
    example: 'We eat dinner at the table.'
  },
  {
    word: 'CHAIR',
    level: 'beginner',
    category: 'Home & Objects',
    hint: 'Something you sit on',
    meaning: 'A seat with a back',
    example: 'Please sit on the chair.'
  },
  {
    word: 'ROOM',
    level: 'beginner',
    category: 'Home & Objects',
    hint: 'A space in a house',
    meaning: 'An enclosed space in a building',
    example: 'My room is on the second floor.'
  },
  {
    word: 'DOOR',
    level: 'beginner',
    category: 'Home & Objects',
    hint: 'You open and close this',
    meaning: 'An entrance to a room or building',
    example: 'Can you close the door?'
  },
  {
    word: 'BED',
    level: 'beginner',
    category: 'Home & Objects',
    hint: 'Where you sleep',
    meaning: 'Furniture for sleeping',
    example: 'I go to bed at 10 PM.'
  },
  {
    word: 'CUP',
    level: 'beginner',
    category: 'Home & Objects',
    hint: 'You drink from this',
    meaning: 'A small container for drinks',
    example: 'This cup is full of tea.'
  },
  {
    word: 'BOOK',
    level: 'beginner',
    category: 'Home & Objects',
    hint: 'You read this',
    meaning: 'Pages with words bound together',
    example: "I'm reading a new book."
  },
  {
    word: 'CLOCK',
    level: 'beginner',
    category: 'Home & Objects',
    hint: 'Shows the time',
    meaning: 'A device that tells time',
    example: 'The clock is on the wall.'
  },
  
  // Category: Food
  {
    word: 'RICE',
    level: 'beginner',
    category: 'Food',
    hint: 'A white grain',
    meaning: 'Small white grains eaten as food',
    example: 'We ate rice and curry.'
  },
  {
    word: 'BREAD',
    level: 'beginner',
    category: 'Food',
    hint: 'Made from flour',
    meaning: 'Baked food made from flour',
    example: 'I had bread and butter.'
  },
  {
    word: 'APPLE',
    level: 'beginner',
    category: 'Food',
    hint: 'A red or green fruit',
    meaning: 'A round fruit that grows on trees',
    example: 'She eats an apple every day.'
  },
  {
    word: 'EGGS',
    level: 'beginner',
    category: 'Food',
    hint: 'From chickens',
    meaning: 'Oval objects laid by birds',
    example: 'I cooked two eggs for breakfast.'
  },
  
  // Category: People & Basic Nouns
  {
    word: 'GIRL',
    level: 'beginner',
    category: 'People & Basic Nouns',
    hint: 'A young female',
    meaning: 'A female child',
    example: 'The girl is playing outside.'
  },
  {
    word: 'BOY',
    level: 'beginner',
    category: 'People & Basic Nouns',
    hint: 'A young male',
    meaning: 'A male child',
    example: 'The boy is my cousin.'
  },
  {
    word: 'FAMILY',
    level: 'beginner',
    category: 'People & Basic Nouns',
    hint: 'Parents and children',
    meaning: 'A group of related people',
    example: 'My family is very big.'
  },
  {
    word: 'SCHOOL',
    level: 'beginner',
    category: 'People & Basic Nouns',
    hint: 'Where you learn',
    meaning: 'A place for education',
    example: 'I walk to school.'
  },
  
  // ============================================
  // INTERMEDIATE LEVEL (5-7 letter verbs and adjectives)
  // ============================================
  
  // Category: Common Verbs
  {
    word: 'STUDY',
    level: 'intermediate',
    category: 'Common Verbs',
    hint: 'To learn something',
    meaning: 'To learn by reading or practicing',
    example: 'I study English every night.'
  },
  {
    word: 'LISTEN',
    level: 'intermediate',
    category: 'Common Verbs',
    hint: 'To hear carefully',
    meaning: 'To pay attention to sounds',
    example: 'Please listen carefully.'
  },
  {
    word: 'DECIDE',
    level: 'intermediate',
    category: 'Common Verbs',
    hint: 'To make a choice',
    meaning: 'To make up your mind',
    example: 'You must decide soon.'
  },
  {
    word: 'TRAVEL',
    level: 'intermediate',
    category: 'Common Verbs',
    hint: 'To go places',
    meaning: 'To go from one place to another',
    example: 'I love to travel by train.'
  },
  {
    word: 'REMEMBER',
    level: 'intermediate',
    category: 'Common Verbs',
    hint: 'To not forget',
    meaning: 'To keep something in your mind',
    example: 'Try to remember this word.'
  },
  {
    word: 'PRACTICE',
    level: 'intermediate',
    category: 'Common Verbs',
    hint: 'To do repeatedly',
    meaning: 'To do something many times to improve',
    example: 'You should practice speaking daily.'
  },
  
  // Category: Adjectives
  {
    word: 'HAPPY',
    level: 'intermediate',
    category: 'Adjectives',
    hint: 'A good feeling',
    meaning: 'Feeling joy or pleasure',
    example: 'I am happy today.'
  },
  {
    word: 'BORING',
    level: 'intermediate',
    category: 'Adjectives',
    hint: 'Not interesting',
    meaning: 'Not exciting or interesting',
    example: 'This movie is boring.'
  },
  {
    word: 'DANGEROUS',
    level: 'intermediate',
    category: 'Adjectives',
    hint: 'Not safe',
    meaning: 'Likely to cause harm',
    example: 'That road is dangerous.'
  },
  {
    word: 'DIFFERENT',
    level: 'intermediate',
    category: 'Adjectives',
    hint: 'Not the same',
    meaning: 'Not alike or similar',
    example: 'This word has a different meaning.'
  },
  {
    word: 'POPULAR',
    level: 'intermediate',
    category: 'Adjectives',
    hint: 'Liked by many',
    meaning: 'Liked or enjoyed by many people',
    example: 'English is a popular language.'
  },
  
  // Category: Daily Life
  {
    word: 'TICKET',
    level: 'intermediate',
    category: 'Daily Life',
    hint: 'For travel or events',
    meaning: 'A paper that allows entry or travel',
    example: 'I bought a train ticket.'
  },
  {
    word: 'WINDOW',
    level: 'intermediate',
    category: 'Daily Life',
    hint: 'Glass in a wall',
    meaning: 'An opening in a wall with glass',
    example: 'The window is open.'
  },
  {
    word: 'MARKET',
    level: 'intermediate',
    category: 'Daily Life',
    hint: 'Where you buy things',
    meaning: 'A place to buy and sell goods',
    example: 'We went to the market.'
  },
  
  // ============================================
  // ADVANCED LEVEL (6-8 letter abstract words)
  // ============================================
  
  // Category: Abstract / Concepts
  {
    word: 'CULTURE',
    level: 'advanced',
    category: 'Abstract / Concepts',
    hint: 'Traditions and beliefs',
    meaning: 'The customs and way of life of a group',
    example: 'Language is part of culture.'
  },
  {
    word: 'FREEDOM',
    level: 'advanced',
    category: 'Abstract / Concepts',
    hint: 'Being free',
    meaning: 'The power to act without restriction',
    example: 'Everyone wants freedom.'
  },
  {
    word: 'PATIENCE',
    level: 'advanced',
    category: 'Abstract / Concepts',
    hint: 'Waiting calmly',
    meaning: 'The ability to wait without getting upset',
    example: 'Learning needs patience.'
  },
  {
    word: 'OPINION',
    level: 'advanced',
    category: 'Abstract / Concepts',
    hint: 'What you think',
    meaning: 'A personal view or belief',
    example: 'What is your opinion?'
  },
  {
    word: 'DECISION',
    level: 'advanced',
    category: 'Abstract / Concepts',
    hint: 'A choice made',
    meaning: 'A conclusion reached after thinking',
    example: 'It was a difficult decision.'
  },
  {
    word: 'EDUCATION',
    level: 'advanced',
    category: 'Abstract / Concepts',
    hint: 'Learning and teaching',
    meaning: 'The process of learning and teaching',
    example: 'Education changes lives.'
  },
  {
    word: 'CONFIDENCE',
    level: 'advanced',
    category: 'Abstract / Concepts',
    hint: 'Believing in yourself',
    meaning: 'Trust in your own abilities',
    example: 'Speaking often builds confidence.'
  },
  {
    word: 'MEMORY',
    level: 'advanced',
    category: 'Abstract / Concepts',
    hint: 'Remembering things',
    meaning: 'The ability to remember information',
    example: 'This game helps your memory.'
  },
  
  // Category: More Challenging
  {
    word: 'LANGUAGE',
    level: 'advanced',
    category: 'More Challenging',
    hint: 'Words and grammar',
    meaning: 'A system of communication using words',
    example: 'English is a global language.'
  },
  {
    word: 'EXAMPLE',
    level: 'advanced',
    category: 'More Challenging',
    hint: 'A sample or model',
    meaning: 'Something that shows how to do it',
    example: 'Let me give you an example.'
  },
  {
    word: 'SENTENCE',
    level: 'advanced',
    category: 'More Challenging',
    hint: 'Words in a group',
    meaning: 'A group of words expressing a complete thought',
    example: 'Please write a sentence.'
  },
  {
    word: 'PRONOUNCE',
    level: 'advanced',
    category: 'More Challenging',
    hint: 'To say a word',
    meaning: 'To say a word correctly',
    example: 'How do you pronounce this word?'
  },
  {
    word: 'PROGRESS',
    level: 'advanced',
    category: 'More Challenging',
    hint: 'Moving forward',
    meaning: 'Forward movement or improvement',
    example: 'You are making good progress.'
  }
];
