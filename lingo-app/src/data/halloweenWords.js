/**
 * Halloween-themed word bank for Hangman game
 * Organized by difficulty level
 */

export const HALLOWEEN_WORDS = {
  beginner: [
    { word: 'bat', hint: 'A flying creature of the night' },
    { word: 'cat', hint: 'A witch\'s companion' },
    { word: 'moon', hint: 'Shines bright at night' },
    { word: 'ghost', hint: 'A spooky spirit' },
    { word: 'boo', hint: 'What ghosts say' },
    { word: 'mask', hint: 'Worn on your face' },
    { word: 'dark', hint: 'Opposite of light' },
    { word: 'bone', hint: 'Part of a skeleton' },
    { word: 'candy', hint: 'Sweet Halloween treat' },
    { word: 'spider', hint: 'Eight-legged creature' },
    { word: 'witch', hint: 'Flies on a broomstick' },
    { word: 'web', hint: 'Spider\'s home' },
    { word: 'fog', hint: 'Misty air' },
    { word: 'owl', hint: 'Wise night bird' }
  ],
  
  intermediate: [
    { word: 'pumpkin', hint: 'Orange Halloween decoration' },
    { word: 'shadow', hint: 'Dark shape that follows you' },
    { word: 'lantern', hint: 'Jack-o\'-lantern light' },
    { word: 'graveyard', hint: 'Where tombstones are found' },
    { word: 'vampire', hint: 'Drinks blood at night' },
    { word: 'haunted', hint: 'Filled with ghosts' },
    { word: 'cobweb', hint: 'Dusty spider creation' },
    { word: 'costume', hint: 'What you wear on Halloween' },
    { word: 'midnight', hint: 'Witching hour' },
    { word: 'cauldron', hint: 'Witch\'s cooking pot' },
    { word: 'skeleton', hint: 'All bones, no flesh' },
    { word: 'monster', hint: 'Scary creature' },
    { word: 'potion', hint: 'Magic liquid' },
    { word: 'zombie', hint: 'Walking dead' }
  ],
  
  advanced: [
    { word: 'supernatural', hint: 'Beyond natural explanation' },
    { word: 'incantation', hint: 'Magic spell words' },
    { word: 'apparition', hint: 'Ghostly appearance' },
    { word: 'transformation', hint: 'Changing form completely' },
    { word: 'necromancer', hint: 'One who raises the dead' },
    { word: 'possession', hint: 'Spirit taking over a body' },
    { word: 'conspiracy', hint: 'Secret evil plan' },
    { word: 'catastrophe', hint: 'Terrible disaster' },
    { word: 'maleficent', hint: 'Causing harm or evil' },
    { word: 'reincarnation', hint: 'Being reborn in new form' },
    { word: 'paranormal', hint: 'Beyond normal experience' },
    { word: 'enchantment', hint: 'Magical spell or charm' }
  ]
};

export const DIFFICULTY_LEVELS = {
  beginner: { label: '🟢 Beginner', maxWrong: 7, points: 10 },
  intermediate: { label: '🟠 Intermediate', maxWrong: 6, points: 15 },
  advanced: { label: '🟣 Advanced', maxWrong: 5, points: 25 }
};
