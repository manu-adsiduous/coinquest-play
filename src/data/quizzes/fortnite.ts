interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  emoji: string;
  questions: QuizQuestion[];
}

export const fortniteQuizzes: Quiz[] = [
  {
    id: "fn-weapons",
    title: "Fortnite Battle Royale Weapons Quiz",
    description: "How well do you know the weapons of Fortnite? Test your arsenal knowledge!",
    category: "Fortnite",
    emoji: "🎯",
    questions: [
      {
        question: "What color represents Legendary rarity weapons in Fortnite?",
        options: ["Purple", "Blue", "Gold", "Red"],
        correctAnswer: 2,
      },
      {
        question: "Which weapon type is best for long-range combat?",
        options: ["SMG", "Shotgun", "Sniper Rifle", "Pistol"],
        correctAnswer: 2,
      },
      {
        question: "What is the correct order of weapon rarity from worst to best?",
        options: [
          "Gray, Green, Blue, Purple, Gold",
          "Green, Gray, Blue, Purple, Gold",
          "Gray, Blue, Green, Purple, Gold",
          "White, Green, Purple, Blue, Gold",
        ],
        correctAnswer: 0,
      },
      {
        question: "Which shotgun was known for doing massive one-shot damage and was vaulted multiple times?",
        options: ["Tactical Shotgun", "Pump Shotgun", "Combat Shotgun", "Charge Shotgun"],
        correctAnswer: 1,
      },
      {
        question: "What does 'vaulted' mean in Fortnite?",
        options: [
          "The item is made Legendary",
          "The item is temporarily removed from the game",
          "The item is found in vaults only",
          "The item does extra damage",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which weapon shoots rockets?",
        options: ["Grenade Launcher", "Rocket Launcher", "Boom Bow", "All of these"],
        correctAnswer: 1,
      },
      {
        question: "What is the Chug Jug?",
        options: [
          "A weapon",
          "A vehicle",
          "A healing item that restores full health and shield",
          "A type of grenade",
        ],
        correctAnswer: 2,
      },
      {
        question: "Which weapon can you charge up before firing for extra damage?",
        options: ["Charge Shotgun", "Pump Shotgun", "Tactical SMG", "Assault Rifle"],
        correctAnswer: 0,
      },
      {
        question: "How much shield does a small shield potion give?",
        options: ["25", "50", "75", "100"],
        correctAnswer: 0,
      },
      {
        question: "What is the maximum number of small shield potions you can carry in one stack?",
        options: ["3", "6", "10", "5"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "fn-skins",
    title: "Fortnite Skins & Cosmetics Trivia",
    description: "From OG skins to the latest collabs, how much do you know about Fortnite cosmetics?",
    category: "Fortnite",
    emoji: "🎭",
    questions: [
      {
        question: "Which skin is considered one of the rarest in Fortnite?",
        options: ["Skull Trooper", "Renegade Raider", "Peely", "Fishstick"],
        correctAnswer: 1,
      },
      {
        question: "What is the default skin in Fortnite called?",
        options: ["Recruit", "Default Jonesy", "No-Skin", "Ramirez"],
        correctAnswer: 1,
      },
      {
        question: "Which Marvel character had a Fortnite skin collaboration?",
        options: ["Spider-Man", "Superman", "Batman", "All of them"],
        correctAnswer: 0,
      },
      {
        question: "What is a 'reactive' skin in Fortnite?",
        options: [
          "A skin that costs real money",
          "A skin that changes based on in-game actions",
          "A skin that only lasts one match",
          "A skin that reacts to music",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which popular streamer had their own Fortnite Icon Series skin?",
        options: ["PewDiePie", "Ninja", "MrBeast", "Dream"],
        correctAnswer: 1,
      },
      {
        question: "What is a 'wrap' in Fortnite?",
        options: [
          "A type of dance",
          "A vehicle skin",
          "A customizable weapon and vehicle skin",
          "A type of emote",
        ],
        correctAnswer: 2,
      },
      {
        question: "What currency do you use to buy skins in the Item Shop?",
        options: ["Coins", "Gems", "V-Bucks", "Robux"],
        correctAnswer: 2,
      },
      {
        question: "Which Fortnite skin is shaped like a banana?",
        options: ["Lil Whip", "Peely", "Tomatohead", "Fishstick"],
        correctAnswer: 1,
      },
      {
        question: "What does 'OG' mean when talking about Fortnite skins?",
        options: [
          "Over-Grinded",
          "Original or from the early seasons",
          "Only Gold rarity",
          "Online Gamer",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which music artist performed a virtual concert in Fortnite?",
        options: ["Drake", "Travis Scott", "Taylor Swift", "Ed Sheeran"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "fn-maps",
    title: "Fortnite Map Locations Through Seasons",
    description: "From Tilted Towers to new POIs, test your knowledge of Fortnite's ever-changing map!",
    category: "Fortnite",
    emoji: "🗺️",
    questions: [
      {
        question: "Which iconic location was destroyed by a meteor in Season 4?",
        options: ["Tilted Towers", "Dusty Depot", "Pleasant Park", "Retail Row"],
        correctAnswer: 1,
      },
      {
        question: "What happened at the end of Chapter 1?",
        options: [
          "The map flooded",
          "A black hole sucked everything in",
          "A volcano erupted",
          "Aliens invaded",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which location has been in the most Fortnite seasons?",
        options: ["Tilted Towers", "Pleasant Park", "Retail Row", "Salty Springs"],
        correctAnswer: 2,
      },
      {
        question: "What type of biome was added to the map when the Ice King arrived?",
        options: ["Desert", "Snow/Ice", "Jungle", "Volcanic"],
        correctAnswer: 1,
      },
      {
        question: "Which named location sits on top of a mountain and has a clock tower?",
        options: ["Happy Hamlet", "Tilted Towers", "Craggy Cliffs", "Misty Meadows"],
        correctAnswer: 1,
      },
      {
        question: "What is the storm in Fortnite?",
        options: [
          "Bad weather that blocks your view",
          "A shrinking circle that damages players outside it",
          "A power-up zone",
          "A safe zone for healing",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which Chapter 2 location was known for its yacht?",
        options: ["Sweaty Sands", "The Yacht (near Steamy Stacks)", "Craggy Cliffs", "Dirty Docks"],
        correctAnswer: 1,
      },
      {
        question: "What happened to the Fortnite map at the start of Chapter 2?",
        options: [
          "It got bigger",
          "An entirely new map replaced it",
          "It was split in half",
          "Nothing changed",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which location was famous for its large tomato restaurant sign?",
        options: ["Pizza Pit", "Tomato Town", "Greasy Grove", "Tomato Temple"],
        correctAnswer: 1,
      },
      {
        question: "What is a 'POI' in Fortnite?",
        options: [
          "Player of Interest",
          "Point of Interest (named location)",
          "Power of Items",
          "Place of Impact",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "fn-emotes",
    title: "Fortnite Emotes & Dances Quiz",
    description: "Can you name those iconic Fortnite dances and emotes?",
    category: "Fortnite",
    emoji: "💃",
    questions: [
      {
        question: "Which Fortnite dance became a massive viral trend in real life?",
        options: ["The Floss", "Orange Justice", "Take the L", "Default Dance"],
        correctAnswer: 0,
      },
      {
        question: "What is the very first emote every player gets for free?",
        options: ["Floss", "Default Dance", "Wave", "Thumbs Up"],
        correctAnswer: 1,
      },
      {
        question: "Which emote was inspired by a scene from the movie Napoleon Dynamite?",
        options: ["Groove Jam", "Electro Shuffle", "Dance Moves", "Fresh"],
        correctAnswer: 3,
      },
      {
        question: "What type of emote is 'Rickroll'?",
        options: ["Icon Series", "Rare emote", "Built-in emote", "Traversal emote"],
        correctAnswer: 0,
      },
      {
        question: "What does a 'traversal' emote allow you to do?",
        options: [
          "Dance faster",
          "Move while doing the emote",
          "Emote in the air",
          "Share the emote with teammates",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which emote shows your character laughing at an opponent?",
        options: ["Take the L", "Laugh It Up", "Slow Clap", "Denied"],
        correctAnswer: 1,
      },
      {
        question: "What is a 'synced' emote in Fortnite?",
        options: [
          "An emote that matches music",
          "An emote two players can do together",
          "An emote only for duos",
          "An emote that syncs with the storm",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which emote tier is the rarest in the Battle Pass?",
        options: ["Page 1 emotes", "Free tier emotes", "Level 100 emotes", "Bonus reward emotes"],
        correctAnswer: 3,
      },
      {
        question: "What is a 'built-in' emote?",
        options: [
          "An emote included in every Battle Pass",
          "An emote tied to a specific skin",
          "A free emote",
          "An emote that builds structures",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which dance is performed by the character doing an L shape with their hand on their forehead?",
        options: ["Floss", "Take the L", "Loser Dance", "L Dance"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "fn-battle-pass",
    title: "Fortnite Battle Pass Challenges Trivia",
    description: "How well do you know the Battle Pass system and its challenges?",
    category: "Fortnite",
    emoji: "⭐",
    questions: [
      {
        question: "How many tiers did the original Battle Pass have?",
        options: ["50", "100", "150", "200"],
        correctAnswer: 1,
      },
      {
        question: "What do you earn by completing Battle Pass challenges?",
        options: ["Real money", "XP and Battle Stars", "Free V-Bucks only", "New weapons"],
        correctAnswer: 1,
      },
      {
        question: "How long does a typical Fortnite season last?",
        options: ["1 month", "About 2-3 months", "6 months", "1 year"],
        correctAnswer: 1,
      },
      {
        question: "Can you earn V-Bucks from the free Battle Pass track?",
        options: [
          "Yes, a small amount",
          "No, only paid track has V-Bucks",
          "Only in Chapter 1",
          "Only by completing all challenges",
        ],
        correctAnswer: 0,
      },
      {
        question: "What is a 'secret skin' in the Battle Pass?",
        options: [
          "A skin that is invisible",
          "A bonus skin unlocked by completing special challenges",
          "A skin only developers can use",
          "A skin that changes every match",
        ],
        correctAnswer: 1,
      },
      {
        question: "What replaced Battle Stars in the newer Battle Pass system?",
        options: ["Tokens", "XP-based page unlock system", "Gems", "Crowns"],
        correctAnswer: 1,
      },
      {
        question: "How much does the Battle Pass typically cost?",
        options: ["500 V-Bucks", "950 V-Bucks", "1500 V-Bucks", "2000 V-Bucks"],
        correctAnswer: 1,
      },
      {
        question: "What happens to your Battle Pass progress when the season ends?",
        options: [
          "It carries over",
          "Unclaimed rewards are lost",
          "You get extra time",
          "Everything resets and you keep all rewards",
        ],
        correctAnswer: 1,
      },
      {
        question: "What are 'milestone quests' in Fortnite?",
        options: [
          "One-time story missions",
          "Long-term goals that track lifetime stats for XP",
          "Daily quests",
          "Quests only for new players",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which of these is a common type of weekly challenge?",
        options: [
          "Win 100 games in a row",
          "Deal damage with a specific weapon type",
          "Build a castle",
          "Find a golden llama",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "fn-mythic",
    title: "Fortnite Mythic & Exotic Items Quiz",
    description: "Only the boldest players hunt for Mythic and Exotic items. How much do you know?",
    category: "Fortnite",
    emoji: "💎",
    questions: [
      {
        question: "What color represents Mythic rarity in Fortnite?",
        options: ["Gold", "Light Gold/Yellow", "Red", "Rainbow"],
        correctAnswer: 1,
      },
      {
        question: "How do you usually get Mythic weapons?",
        options: [
          "Finding them in regular chests",
          "Defeating a boss NPC",
          "Buying them from vending machines",
          "Crafting them",
        ],
        correctAnswer: 1,
      },
      {
        question: "What makes Exotic weapons different from Mythic weapons?",
        options: [
          "They do more damage",
          "They have unique special abilities and are bought from NPCs",
          "They are found in supply drops only",
          "They are only available in competitive modes",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which Mythic item lets you fly or boost into the air?",
        options: [
          "Mythic Goldfish",
          "Shockwave Hammer",
          "Infinity Blade",
          "Boom Bow",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is the Mythic Goldfish?",
        options: [
          "A pet backbling",
          "An extremely rare throwable item that eliminates in one hit",
          "A healing fish",
          "A vehicle",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which controversial Mythic melee weapon was added and removed from the game quickly?",
        options: ["Lightsaber", "Infinity Blade", "Kingsman Umbrella", "Wolverine Claws"],
        correctAnswer: 1,
      },
      {
        question: "Where can you typically find boss NPCs that carry Mythic weapons?",
        options: [
          "Anywhere on the map randomly",
          "At specific named POIs",
          "Only in the storm",
          "In supply drops",
        ],
        correctAnswer: 1,
      },
      {
        question: "What happens to a Mythic weapon when the player carrying it is eliminated?",
        options: [
          "It disappears",
          "It drops as loot for other players",
          "It goes back to the boss",
          "It downgrades to Legendary",
        ],
        correctAnswer: 1,
      },
      {
        question: "How many Mythic weapons can typically be found on the map per match?",
        options: [
          "Unlimited",
          "Usually one of each Mythic type",
          "10 of each",
          "Only in squads mode",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which season first introduced Mythic boss weapons to Fortnite?",
        options: [
          "Chapter 1 Season 5",
          "Chapter 2 Season 2",
          "Chapter 2 Season 1",
          "Chapter 1 Season 9",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "fn-lore",
    title: "Fortnite Lore & Storyline Quiz",
    description: "Unravel the mysteries of the Fortnite storyline and its characters!",
    category: "Fortnite",
    emoji: "📖",
    questions: [
      {
        question: "What is the name of the mysterious organization that studies the island?",
        options: [
          "The Agency",
          "The Imagined Order (IO)",
          "The Seven",
          "Ghost and Shadow",
        ],
        correctAnswer: 1,
      },
      {
        question: "Who is the leader of The Seven?",
        options: ["The Visitor", "The Foundation", "The Scientist", "The Origin"],
        correctAnswer: 1,
      },
      {
        question: "What caused the Chapter 1 map to be destroyed?",
        options: [
          "A volcano",
          "A black hole created by The End event",
          "A flood",
          "Aliens",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is the 'Zero Point' in Fortnite lore?",
        options: [
          "The center of the storm",
          "A powerful energy source at the center of reality",
          "The starting point of each match",
          "A weapon",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which real-world actor voiced and modeled The Foundation?",
        options: ["John Cena", "Dwayne 'The Rock' Johnson", "Ryan Reynolds", "Keanu Reeves"],
        correctAnswer: 1,
      },
      {
        question: "What are the 'Loopers' in Fortnite's story?",
        options: [
          "NPCs that sell items",
          "Players stuck in the battle royale loop on the island",
          "A type of vehicle",
          "The game developers",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which two factions fought for control during Chapter 2 Season 2?",
        options: [
          "IO and The Seven",
          "Ghost and Shadow",
          "Aliens and Humans",
          "Heroes and Villains",
        ],
        correctAnswer: 1,
      },
      {
        question: "What major event brought aliens to Fortnite Island?",
        options: [
          "The Device Event",
          "The Galactus Event",
          "Chapter 2 Season 7 Invasion",
          "The Fracture Event",
        ],
        correctAnswer: 2,
      },
      {
        question: "What is 'The Loop' in Fortnite lore?",
        options: [
          "A racing track",
          "The cycle that makes players fight over and over",
          "A dance move",
          "A type of portal",
        ],
        correctAnswer: 1,
      },
      {
        question: "Who was the first member of The Seven to appear in Fortnite?",
        options: ["The Foundation", "The Scientist", "The Visitor", "The Paradigm"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "fn-creative",
    title: "Fortnite Creative Mode & UEFN Quiz",
    description: "Test your knowledge about building and creating in Fortnite Creative and UEFN!",
    category: "Fortnite",
    emoji: "🏗️",
    questions: [
      {
        question: "What is Fortnite Creative mode?",
        options: [
          "A mode where you only build forts",
          "A sandbox mode where you can build your own islands and games",
          "A painting simulator",
          "A building tutorial",
        ],
        correctAnswer: 1,
      },
      {
        question: "What does UEFN stand for?",
        options: [
          "Ultra Epic Fortnite Network",
          "Unreal Editor for Fortnite",
          "Universal Epic Fun Nexus",
          "Ultimate Epic Fortnite Nexus",
        ],
        correctAnswer: 1,
      },
      {
        question: "How many players can typically join a Creative island?",
        options: ["10", "16", "50", "100"],
        correctAnswer: 1,
      },
      {
        question: "What can you earn as a creator with a popular Creative island?",
        options: [
          "Nothing",
          "Real money through the creator program",
          "Only V-Bucks",
          "Free skins only",
        ],
        correctAnswer: 1,
      },
      {
        question: "What are 'devices' in Fortnite Creative?",
        options: [
          "Phones and tablets",
          "Tools that add game logic like triggers, timers, and spawners",
          "Types of vehicles",
          "Weapon upgrades",
        ],
        correctAnswer: 1,
      },
      {
        question: "What popular game genre is commonly recreated in Creative mode?",
        options: [
          "Racing",
          "All of these",
          "Deathrun / Obstacle courses",
          "Hide and Seek",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is an 'island code' in Fortnite Creative?",
        options: [
          "A secret password",
          "A unique code you enter to play someone's custom map",
          "A cheat code",
          "A building blueprint",
        ],
        correctAnswer: 1,
      },
      {
        question: "What game engine powers UEFN?",
        options: ["Unity", "Unreal Engine", "Godot", "CryEngine"],
        correctAnswer: 1,
      },
      {
        question: "Can you use custom 3D models in UEFN?",
        options: [
          "No, only default assets",
          "Yes, you can import custom assets",
          "Only if you work at Epic",
          "Only 2D images",
        ],
        correctAnswer: 1,
      },
      {
        question: "What programming language can you use in UEFN for scripting?",
        options: ["Python", "JavaScript", "Verse", "Lua"],
        correctAnswer: 2,
      },
    ],
  },
];
