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

export const robloxQuizzes: Quiz[] = [
  {
    id: "roblox-adopt-me",
    title: "Adopt Me! Pets & Trading Trivia",
    description: "Test your knowledge of pets, trading, and everything Adopt Me! How well do you know this iconic Roblox game?",
    category: "Roblox",
    emoji: "🐾",
    questions: [
      {
        question: "What is the rarest egg you can hatch in Adopt Me!?",
        options: ["Royal Egg", "Safari Egg", "Diamond Egg", "Jungle Egg"],
        correctAnswer: 2,
      },
      {
        question: "Which pet is considered one of the most valuable legendary pets in Adopt Me!?",
        options: ["Unicorn", "Shadow Dragon", "Griffin", "Golden Penguin"],
        correctAnswer: 1,
      },
      {
        question: "What do you need to do to age up a pet in Adopt Me!?",
        options: [
          "Feed it special food",
          "Complete tasks and fulfill its needs",
          "Buy an age-up potion",
          "Wait 24 hours",
        ],
        correctAnswer: 1,
      },
      {
        question: "How many pets do you need to make a Neon pet in Adopt Me!?",
        options: ["2", "3", "4", "5"],
        correctAnswer: 2,
      },
      {
        question: "Where do you combine pets to make a Neon pet?",
        options: [
          "The Pet Shop",
          "The Neon Cave",
          "Your house",
          "The Playground",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is the final stage of pet aging in Adopt Me!?",
        options: ["Teen", "Post-Teen", "Full Grown", "Elder"],
        correctAnswer: 2,
      },
      {
        question: "How many Neon pets do you need to make a Mega Neon pet?",
        options: ["2", "3", "4", "6"],
        correctAnswer: 2,
      },
      {
        question: "Which of these is NOT a pet rarity in Adopt Me!?",
        options: ["Common", "Ultra-Rare", "Legendary", "Mythical"],
        correctAnswer: 3,
      },
      {
        question: "What type of currency do you primarily earn in Adopt Me!?",
        options: ["Coins", "Bucks", "Gems", "Stars"],
        correctAnswer: 1,
      },
      {
        question: "Which vehicle in Adopt Me! can fly?",
        options: ["Car", "Skateboard", "Witch's Caravan", "Rocket Sled"],
        correctAnswer: 3,
      },
    ],
  },
  {
    id: "roblox-blox-fruits",
    title: "Blox Fruits Devil Fruit Challenge",
    description: "Are you a true Blox Fruits master? Test your knowledge of fruits, abilities, and combat in this challenging quiz!",
    category: "Roblox",
    emoji: "🍎",
    questions: [
      {
        question: "What are the three types of fruits in Blox Fruits?",
        options: [
          "Fire, Water, Earth",
          "Natural, Elemental, Beast",
          "Common, Rare, Legendary",
          "Attack, Defense, Support",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which fruit allows you to transform into a dragon?",
        options: ["Phoenix", "Dragon", "Flame", "Dough"],
        correctAnswer: 1,
      },
      {
        question: "What is the maximum level in Blox Fruits?",
        options: ["1000", "1500", "2450", "2550"],
        correctAnswer: 2,
      },
      {
        question: "Which NPC sells fruits in the game?",
        options: [
          "The Fruit Dealer",
          "Blox Fruit Dealer",
          "The Merchant",
          "Fruit King",
        ],
        correctAnswer: 1,
      },
      {
        question: "What type of fruit is the Dough fruit?",
        options: ["Natural", "Elemental", "Beast", "Mythical"],
        correctAnswer: 0,
      },
      {
        question: "Which sea do players start in when they first play Blox Fruits?",
        options: ["First Sea", "Second Sea", "Third Sea", "Starter Sea"],
        correctAnswer: 0,
      },
      {
        question: "What fighting style can you learn from the martial arts master in the First Sea?",
        options: ["Dark Step", "Electro", "Water Kung Fu", "Black Leg"],
        correctAnswer: 3,
      },
      {
        question: "Which fruit gives you the ability to control ice?",
        options: ["Snow", "Ice", "Frost", "Blizzard"],
        correctAnswer: 1,
      },
      {
        question: "What do you need to awaken a fruit in Blox Fruits?",
        options: [
          "Beli",
          "Fragments",
          "Gems",
          "Robux",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which of these is a Mythical fruit in Blox Fruits?",
        options: ["Flame", "Spike", "Leopard", "Smoke"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "roblox-brookhaven",
    title: "Brookhaven RP Knowledge Quiz",
    description: "How well do you know Brookhaven RP? From houses to vehicles and secrets, put your roleplay knowledge to the test!",
    category: "Roblox",
    emoji: "🏘️",
    questions: [
      {
        question: "What type of game is Brookhaven RP?",
        options: [
          "Obby",
          "Roleplaying / Town & City",
          "Battle Royale",
          "Tycoon",
        ],
        correctAnswer: 1,
      },
      {
        question: "What can you find in the Brookhaven RP church?",
        options: [
          "A secret underground bunker",
          "Free Robux",
          "A wedding altar for roleplay",
          "A treasure chest",
        ],
        correctAnswer: 2,
      },
      {
        question: "How do you get a house in Brookhaven?",
        options: [
          "Build it from scratch",
          "Select one from the house menu",
          "Buy it from another player",
          "Win it in a minigame",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is the Brookhaven hospital used for?",
        options: [
          "Healing your character",
          "Roleplaying as doctors and patients",
          "Getting special items",
          "Earning extra money",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which of these is a feature in Brookhaven RP?",
        options: [
          "Pet hatching",
          "Changing your character's job/role",
          "Building custom obbies",
          "Crafting weapons",
        ],
        correctAnswer: 1,
      },
      {
        question: "Where can you find the electric panel in Brookhaven?",
        options: [
          "The police station",
          "The agency building",
          "The power plant",
          "The school",
        ],
        correctAnswer: 1,
      },
      {
        question: "What happens when you press the red button in certain Brookhaven secret spots?",
        options: [
          "You get a pet",
          "A secret room or event opens",
          "You earn 1000 coins",
          "Nothing happens",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which studio developed Brookhaven RP?",
        options: [
          "Adopt Me! Team",
          "Wolfpaq",
          "Badimo",
          "Tower Heroes Studio",
        ],
        correctAnswer: 1,
      },
      {
        question: "How do you get a vehicle in Brookhaven?",
        options: [
          "Win a race",
          "Earn enough XP",
          "Select one from the vehicle menu",
          "Craft it with materials",
        ],
        correctAnswer: 2,
      },
      {
        question: "What is one of the most popular activities players do in Brookhaven?",
        options: [
          "Speed running",
          "Roleplaying family and daily life scenarios",
          "Competitive PvP battles",
          "Completing quests for loot",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "roblox-tower-of-hell",
    title: "Tower of Hell Obby Expert Quiz",
    description: "Think you can conquer every tower? Prove your Tower of Hell expertise with this quiz about sections, mechanics, and strategies!",
    category: "Roblox",
    emoji: "🗼",
    questions: [
      {
        question: "What is the main objective in Tower of Hell?",
        options: [
          "Defeat the boss at the top",
          "Reach the top of the randomly generated tower",
          "Build the tallest tower",
          "Collect all the coins",
        ],
        correctAnswer: 1,
      },
      {
        question: "Are there checkpoints in Tower of Hell?",
        options: [
          "Yes, at every section",
          "Only at the halfway point",
          "No, there are no checkpoints",
          "Only in easy mode",
        ],
        correctAnswer: 2,
      },
      {
        question: "What happens when the timer runs out in Tower of Hell?",
        options: [
          "You get extra time",
          "A new tower is generated",
          "You lose all your coins",
          "The game ends permanently",
        ],
        correctAnswer: 1,
      },
      {
        question: "How many sections does a standard tower typically have?",
        options: ["3", "6", "10", "15"],
        correctAnswer: 1,
      },
      {
        question: "What can you buy with coins in Tower of Hell?",
        options: [
          "New towers",
          "Mutators and gear effects",
          "Extra lives",
          "Faster characters",
        ],
        correctAnswer: 1,
      },
      {
        question: "What color are the kill parts (parts that reset you) in Tower of Hell?",
        options: ["Blue", "Green", "Red", "Yellow"],
        correctAnswer: 2,
      },
      {
        question: "What is a 'pro tower' in Tower of Hell?",
        options: [
          "A tower only for VIP players",
          "A tower with extremely difficult sections",
          "A tower with 100 sections",
          "A tower that gives double XP",
        ],
        correctAnswer: 1,
      },
      {
        question: "Who created Tower of Hell?",
        options: ["Badimo", "YXCeptional Studios", "Adopt Me Team", "Roblox Corporation"],
        correctAnswer: 1,
      },
      {
        question: "What does the 'Invincibility' mutator do in Tower of Hell?",
        options: [
          "Makes you invisible",
          "Lets you skip a section",
          "Prevents kill parts from resetting you temporarily",
          "Doubles your speed",
        ],
        correctAnswer: 2,
      },
      {
        question: "What is the benefit of reaching the top of the tower first?",
        options: [
          "You get a special badge",
          "You earn bonus coins for winning",
          "You unlock a secret level",
          "You get to design the next tower",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "roblox-mm2",
    title: "Murder Mystery 2 Weapons & Maps",
    description: "Are you a Murder Mystery 2 expert? Test your knowledge of godly weapons, maps, and game mechanics!",
    category: "Roblox",
    emoji: "🔪",
    questions: [
      {
        question: "What are the three roles in Murder Mystery 2?",
        options: [
          "Killer, Survivor, Healer",
          "Murderer, Sheriff, Innocent",
          "Hunter, Prey, Bystander",
          "Attacker, Defender, Medic",
        ],
        correctAnswer: 1,
      },
      {
        question: "What weapon does the Sheriff use in MM2?",
        options: ["A sword", "A bow", "A gun", "A taser"],
        correctAnswer: 2,
      },
      {
        question: "What happens when the Sheriff is eliminated in MM2?",
        options: [
          "The game ends",
          "The gun drops and an Innocent can pick it up",
          "A new Sheriff is chosen",
          "Nothing special happens",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is the highest rarity tier for knives in MM2?",
        options: ["Legendary", "Godly", "Ancient", "Mythical"],
        correctAnswer: 1,
      },
      {
        question: "Who is the creator of Murder Mystery 2?",
        options: ["Nikilis", "Badimo", "Asimo3089", "Coeptus"],
        correctAnswer: 0,
      },
      {
        question: "How can Innocents win a round in MM2?",
        options: [
          "By hiding until the timer runs out or the Murderer is eliminated",
          "By collecting 10 coins",
          "By escaping through the exit door",
          "By voting the Murderer out",
        ],
        correctAnswer: 0,
      },
      {
        question: "What can you craft with salvaged weapon parts in MM2?",
        options: [
          "New maps",
          "New weapons and knives",
          "Character skins",
          "Special effects",
        ],
        correctAnswer: 1,
      },
      {
        question: "What do coins scattered around the map give you in MM2?",
        options: [
          "Extra health",
          "Experience points and items",
          "A speed boost",
          "A clue about the Murderer",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which of these is a real map in Murder Mystery 2?",
        options: ["Volcano Island", "Office", "Dragon's Lair", "Candy Kingdom"],
        correctAnswer: 1,
      },
      {
        question: "What is the special ability of the Murderer in MM2?",
        options: [
          "They can teleport",
          "They can throw their knife",
          "They can turn invisible permanently",
          "They can lock doors",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "roblox-royale-high",
    title: "Royale High Fashion & Trivia",
    description: "Calling all Royale High fans! How well do you know the sets, realms, and fashion of Royale High?",
    category: "Roblox",
    emoji: "👑",
    questions: [
      {
        question: "What is the main setting of Royale High?",
        options: [
          "A pirate ship",
          "A fantasy school and kingdom",
          "A space station",
          "A medieval battlefield",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is the primary currency in Royale High?",
        options: ["Coins", "Gems", "Diamonds", "Stars"],
        correctAnswer: 2,
      },
      {
        question: "What is the Royale High trading hub used for?",
        options: [
          "PvP battles",
          "Trading items with other players",
          "Completing homework",
          "Attending classes",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which of these is a real realm in Royale High?",
        options: [
          "Dragon Valley",
          "Enchantix High",
          "Pirate Cove",
          "Robot City",
        ],
        correctAnswer: 1,
      },
      {
        question: "What event typically features exclusive items in Royale High?",
        options: [
          "Summer Beach Party only",
          "Seasonal events like Halloween and Valentine's Day",
          "Weekly tournaments",
          "Birthday celebrations",
        ],
        correctAnswer: 1,
      },
      {
        question: "What can you do at the Royale High school?",
        options: [
          "Only dress up",
          "Attend classes to earn diamonds",
          "Fight monsters",
          "Build a house",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which accessory category includes wings in Royale High?",
        options: ["Hats", "Back accessories", "Face accessories", "Shoes"],
        correctAnswer: 1,
      },
      {
        question: "What is a 'set' in Royale High?",
        options: [
          "A group of players",
          "A matching collection of themed clothing items",
          "A type of game mode",
          "A dance move collection",
        ],
        correctAnswer: 1,
      },
      {
        question: "How do you level up in Royale High?",
        options: [
          "Defeat bosses",
          "Gain experience by attending classes and sleeping",
          "Spend diamonds",
          "Win fashion contests",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which of these is a popular set in Royale High?",
        options: [
          "Ninja Shadow Set",
          "Darling Valentina Set",
          "Galaxy Warrior Set",
          "Pirate Captain Set",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "roblox-pet-sim-x",
    title: "Pet Simulator X Ultimate Quiz",
    description: "Are you a Pet Simulator X pro? Test your knowledge about pets, enchants, and the world of pet collecting!",
    category: "Roblox",
    emoji: "🐕",
    questions: [
      {
        question: "What is the main goal in Pet Simulator X?",
        options: [
          "Build a house",
          "Collect and upgrade pets to earn coins",
          "Complete an obby",
          "Defeat other players",
        ],
        correctAnswer: 1,
      },
      {
        question: "What do you use to hatch pets in Pet Simulator X?",
        options: ["Potions", "Eggs", "Crystals", "Keys"],
        correctAnswer: 1,
      },
      {
        question: "What does making a pet 'Golden' do in Pet Sim X?",
        options: [
          "Makes it faster",
          "Increases its coin-earning power",
          "Lets it fly",
          "Unlocks a secret area",
        ],
        correctAnswer: 1,
      },
      {
        question: "Who created Pet Simulator X?",
        options: ["Badimo", "BIG Games", "Adopt Me Team", "Nikilis"],
        correctAnswer: 1,
      },
      {
        question: "What is a 'Huge' pet in Pet Simulator X?",
        options: [
          "A pet that takes up your whole screen",
          "An extremely rare oversized pet",
          "A pet that has max stats",
          "A glitched pet",
        ],
        correctAnswer: 1,
      },
      {
        question: "What are enchants used for in Pet Simulator X?",
        options: [
          "Changing pet colors",
          "Giving pets special bonus abilities",
          "Naming your pets",
          "Trading pets faster",
        ],
        correctAnswer: 1,
      },
      {
        question: "What happens when you fuse pets together in Pet Sim X?",
        options: [
          "They disappear",
          "You create a stronger version of the pet",
          "You get coins back",
          "They learn new tricks",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which of these is a real world/area in Pet Simulator X?",
        options: [
          "Underwater Kingdom",
          "Spawn World",
          "Dragon Mountain",
          "Cloud City",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is the 'Dark Matter' version of a pet?",
        options: [
          "A pet that only appears at night",
          "An even stronger upgrade beyond Rainbow",
          "A Halloween exclusive pet",
          "A pet that is invisible",
        ],
        correctAnswer: 1,
      },
      {
        question: "What do diamonds do in Pet Simulator X?",
        options: [
          "Unlock new worlds",
          "Act as a premium currency for special eggs and items",
          "Feed your pets",
          "Teleport you home",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "roblox-history",
    title: "Roblox History: How Well Do You Know Roblox?",
    description: "From its founding to its biggest milestones, test your knowledge of Roblox history and fun facts!",
    category: "Roblox",
    emoji: "📜",
    questions: [
      {
        question: "In what year was Roblox officially launched to the public?",
        options: ["2004", "2006", "2008", "2010"],
        correctAnswer: 1,
      },
      {
        question: "Who are the co-founders of Roblox?",
        options: [
          "Steve Jobs and Bill Gates",
          "David Baszucki and Erik Cassel",
          "Mark Zuckerberg and Elon Musk",
          "Notch and Jeb",
        ],
        correctAnswer: 1,
      },
      {
        question: "What was Roblox originally called during its beta phase?",
        options: ["Bloxland", "DynaBlocks", "BuildIt", "BlockWorld"],
        correctAnswer: 1,
      },
      {
        question: "What is the virtual currency in Roblox called?",
        options: ["V-Bucks", "Minecoins", "Robux", "Roblox Dollars"],
        correctAnswer: 2,
      },
      {
        question: "What was the name of the free currency that was removed from Roblox in 2016?",
        options: ["Tickets (Tix)", "Tokens", "Credits", "Bits"],
        correctAnswer: 0,
      },
      {
        question: "What is the Roblox game creation tool called?",
        options: [
          "Roblox Maker",
          "Roblox Studio",
          "Roblox Builder",
          "Roblox Forge",
        ],
        correctAnswer: 1,
      },
      {
        question: "What programming language is used to script games in Roblox?",
        options: ["Python", "JavaScript", "Luau (based on Lua)", "C++"],
        correctAnswer: 2,
      },
      {
        question: "What is the iconic Roblox character figure called?",
        options: ["Robloxian", "Blockhead", "Avatar", "Noob"],
        correctAnswer: 0,
      },
      {
        question: "What year did Roblox become available on mobile devices?",
        options: ["2010", "2012", "2014", "2016"],
        correctAnswer: 1,
      },
      {
        question: "What is the classic default look of a new Roblox character often called?",
        options: ["The Default", "The Noob", "The Starter", "The Rookie"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "roblox-arsenal",
    title: "Arsenal Weapons & Skins Quiz",
    description: "Lock and load! Test your knowledge of Arsenal weapons, skins, and gameplay mechanics!",
    category: "Roblox",
    emoji: "🔫",
    questions: [
      {
        question: "What type of game is Arsenal on Roblox?",
        options: [
          "Racing game",
          "First-person shooter (FPS)",
          "Roleplaying game",
          "Puzzle game",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is the main game mode in Arsenal based on?",
        options: [
          "Capture the Flag",
          "Gun Game (cycle through weapons with each kill)",
          "Team Deathmatch only",
          "Battle Royale",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is the final weapon you need to get a kill with to win a standard Arsenal match?",
        options: [
          "A sniper rifle",
          "A rocket launcher",
          "The golden knife",
          "A pistol",
        ],
        correctAnswer: 2,
      },
      {
        question: "Who developed Arsenal on Roblox?",
        options: ["Badimo", "ROLVe Community", "BIG Games", "Nikilis"],
        correctAnswer: 1,
      },
      {
        question: "What do you earn from playing Arsenal matches?",
        options: [
          "Diamonds",
          "B$ (BattleBucks)",
          "Arsenal Coins",
          "Robux",
        ],
        correctAnswer: 1,
      },
      {
        question: "What are skins used for in Arsenal?",
        options: [
          "Giving you extra damage",
          "Customizing the appearance of your character",
          "Unlocking new maps",
          "Increasing your health",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which of these is a real game mode in Arsenal?",
        options: [
          "Zombie Mode",
          "Randomizer",
          "Building Mode",
          "Cooking Challenge",
        ],
        correctAnswer: 1,
      },
      {
        question: "What happens when you get demoted (killed by a melee weapon) in Arsenal?",
        options: [
          "You lose all your skins",
          "You go back one weapon level",
          "You get kicked from the match",
          "Nothing happens",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is a 'kill effect' in Arsenal?",
        options: [
          "A sound that plays when you get eliminated",
          "A visual effect that appears when you eliminate someone",
          "A bonus weapon you unlock",
          "An extra life you earn",
        ],
        correctAnswer: 1,
      },
      {
        question: "How do you unlock new skins in Arsenal?",
        options: [
          "Only by buying them with Robux",
          "Through cases, events, and the shop",
          "By reaching max level",
          "By completing the campaign mode",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "roblox-king-legacy",
    title: "King Legacy Sea & Fruits Quiz",
    description: "Set sail and test your King Legacy knowledge! How well do you know the seas, fruits, and battles of this One Piece-inspired game?",
    category: "Roblox",
    emoji: "⚓",
    questions: [
      {
        question: "What anime is King Legacy primarily inspired by?",
        options: ["Naruto", "Dragon Ball Z", "One Piece", "Bleach"],
        correctAnswer: 2,
      },
      {
        question: "What are the two main types of fruits in King Legacy?",
        options: [
          "Fire and Ice",
          "Paramecia and Logia",
          "Natural and Beast",
          "Common and Legendary",
        ],
        correctAnswer: 1,
      },
      {
        question: "How do you obtain a fruit in King Legacy?",
        options: [
          "Only by buying from the shop",
          "Finding them spawned in the world or buying them",
          "Crafting them with materials",
          "Defeating the final boss",
        ],
        correctAnswer: 1,
      },
      {
        question: "What can you do to travel between islands in King Legacy?",
        options: [
          "Teleport instantly",
          "Use a boat to sail across the sea",
          "Fly with wings from the start",
          "Walk across bridges",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is Haki used for in King Legacy?",
        options: [
          "Cooking food",
          "Enhancing combat abilities like defense and hitting Logia users",
          "Building houses",
          "Taming pets",
        ],
        correctAnswer: 1,
      },
      {
        question: "How many seas are there in King Legacy?",
        options: ["1", "2", "3", "4"],
        correctAnswer: 2,
      },
      {
        question: "What do you need to do to enter the Second Sea in King Legacy?",
        options: [
          "Pay 1000 Robux",
          "Reach a certain level and complete requirements",
          "Find a secret portal",
          "Defeat 100 players",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which of these is a Logia-type fruit in King Legacy?",
        options: ["Rubber", "Magma", "Barrier", "String"],
        correctAnswer: 1,
      },
      {
        question: "What is the main way to level up in King Legacy?",
        options: [
          "Opening chests",
          "Defeating NPCs and completing quests",
          "Trading fruits",
          "Sailing long distances",
        ],
        correctAnswer: 1,
      },
      {
        question: "What do you get from defeating bosses in King Legacy?",
        options: [
          "Only experience points",
          "Drops like accessories, titles, and large XP rewards",
          "New boats automatically",
          "Free fruits every time",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "roblox-doors",
    title: "Doors Horror Game Trivia",
    description: "Can you survive the quiz? Test your knowledge of Doors, its terrifying entities, and survival strategies!",
    category: "Roblox",
    emoji: "🚪",
    questions: [
      {
        question: "What is the main objective in Doors?",
        options: [
          "Defeat all the monsters",
          "Survive and progress through 100 doors",
          "Collect 50 keys",
          "Build a fort",
        ],
        correctAnswer: 1,
      },
      {
        question: "What entity rushes through rooms and requires you to hide?",
        options: ["Seek", "Rush", "Ambush", "Halt"],
        correctAnswer: 1,
      },
      {
        question: "What should you do when you encounter the entity 'Halt'?",
        options: [
          "Run as fast as you can",
          "Hide in a closet",
          "Turn around when it says to or the screen glitches",
          "Stand completely still",
        ],
        correctAnswer: 2,
      },
      {
        question: "Which entity appears as dark eyes in a room and damages you if you look at it?",
        options: ["Rush", "Eyes", "Screech", "Figure"],
        correctAnswer: 1,
      },
      {
        question: "What entity is blind and relies on sound to find you?",
        options: ["Rush", "Ambush", "Figure", "Halt"],
        correctAnswer: 2,
      },
      {
        question: "What item helps you see in dark rooms in Doors?",
        options: [
          "Night vision goggles",
          "Lighter or flashlight",
          "Magic wand",
          "Glowing potion",
        ],
        correctAnswer: 1,
      },
      {
        question: "What does the entity 'Screech' do before attacking?",
        options: [
          "Roars loudly",
          "Whispers 'psst' from behind you",
          "Turns off all lights",
          "Locks the door",
        ],
        correctAnswer: 1,
      },
      {
        question: "What do you need to find to open locked doors in Doors?",
        options: ["A code", "A key", "A lever", "A button"],
        correctAnswer: 1,
      },
      {
        question: "Which entity creates a long chase sequence where you run through rooms?",
        options: ["Rush", "Seek", "Ambush", "Figure"],
        correctAnswer: 1,
      },
      {
        question: "What is the name of the helpful entity that revives you in Doors?",
        options: ["Angel", "Guiding Light", "Helper", "Spirit"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "roblox-natural-disaster",
    title: "Natural Disaster Survival Quiz",
    description: "Earthquakes, tornadoes, and tsunamis! How well do you know Natural Disaster Survival on Roblox?",
    category: "Roblox",
    emoji: "🌪️",
    questions: [
      {
        question: "What is the main goal in Natural Disaster Survival?",
        options: [
          "Cause the most destruction",
          "Survive the natural disaster on each map",
          "Build a shelter",
          "Rescue other players",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which of these is a real disaster in the game?",
        options: [
          "Alien Invasion",
          "Tornado",
          "Zombie Apocalypse",
          "Robot Uprising",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is the best strategy during a tsunami in the game?",
        options: [
          "Stay on the ground floor",
          "Get to the highest point on the map",
          "Jump into the water",
          "Stand in the center of the map",
        ],
        correctAnswer: 1,
      },
      {
        question: "Who created Natural Disaster Survival?",
        options: ["Nikilis", "Stickmasterluke", "Badimo", "BIG Games"],
        correctAnswer: 1,
      },
      {
        question: "What happens to the map during an earthquake in the game?",
        options: [
          "Nothing visible",
          "The ground shakes and structures can collapse",
          "Lava appears",
          "The map flips upside down",
        ],
        correctAnswer: 1,
      },
      {
        question: "How many players can survive a round in Natural Disaster Survival?",
        options: [
          "Only 1",
          "Up to 5",
          "Any number of players can survive",
          "Exactly half the server",
        ],
        correctAnswer: 2,
      },
      {
        question: "Which disaster creates a funnel that moves across the map?",
        options: ["Earthquake", "Flood", "Tornado", "Volcanic eruption"],
        correctAnswer: 2,
      },
      {
        question: "What should you do during a lightning storm in the game?",
        options: [
          "Stand on metal structures",
          "Stay away from tall objects and find shelter",
          "Jump as high as possible",
          "Run around the map",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which disaster involves rising water levels on the map?",
        options: ["Blizzard", "Tornado", "Earthquake", "Flood"],
        correctAnswer: 3,
      },
      {
        question: "What do you earn for surviving a round in Natural Disaster Survival?",
        options: [
          "Robux",
          "Survival points and coins",
          "New disasters",
          "Special powers",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "roblox-bee-swarm",
    title: "Bee Swarm Simulator Bees & Items",
    description: "Buzz into action! How well do you know the bees, fields, and items of Bee Swarm Simulator?",
    category: "Roblox",
    emoji: "🐝",
    questions: [
      {
        question: "What is the main goal in Bee Swarm Simulator?",
        options: [
          "Fight other players' bees",
          "Collect pollen and make honey with your bee swarm",
          "Build a beehive from scratch",
          "Race your bees",
        ],
        correctAnswer: 1,
      },
      {
        question: "What do you use to hatch bees in Bee Swarm Simulator?",
        options: ["Honey", "Eggs", "Royal Jelly", "Pollen"],
        correctAnswer: 1,
      },
      {
        question: "What does Royal Jelly do in Bee Swarm Simulator?",
        options: [
          "Feeds your bees",
          "Transforms a bee into a random different bee",
          "Makes honey faster",
          "Unlocks new fields",
        ],
        correctAnswer: 1,
      },
      {
        question: "What are the bee rarity types in Bee Swarm Simulator?",
        options: [
          "Bronze, Silver, Gold",
          "Common, Rare, Epic, Legendary, Mythic, Event",
          "Normal, Super, Ultra",
          "Basic, Advanced, Expert",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which NPC gives you quests in the starting area of Bee Swarm Simulator?",
        options: ["King Bee", "Black Bear", "Spirit Bear", "Honey Bee"],
        correctAnswer: 1,
      },
      {
        question: "What do bees collect from flower fields?",
        options: ["Nectar", "Pollen", "Honey", "Seeds"],
        correctAnswer: 1,
      },
      {
        question: "What is the 'Vicious Bee' known for in Bee Swarm Simulator?",
        options: [
          "Making the most honey",
          "Being able to attack mobs and other threats",
          "Being the fastest bee",
          "Having the biggest hive slot",
        ],
        correctAnswer: 1,
      },
      {
        question: "How do you get a Gifted bee in Bee Swarm Simulator?",
        options: [
          "Buy it from the shop only",
          "Use Star Treats, Gingerbread Bears, or get lucky with Royal Jelly",
          "Complete 100 quests",
          "Trade with other players",
        ],
        correctAnswer: 1,
      },
      {
        question: "What are 'mobs' in Bee Swarm Simulator?",
        options: [
          "Groups of bees",
          "Enemy creatures like ladybugs, spiders, and crabs",
          "Other players",
          "Special flowers",
        ],
        correctAnswer: 1,
      },
      {
        question: "What do you convert pollen into at your hive?",
        options: ["Gems", "Wax", "Honey", "Nectar"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "roblox-jailbreak",
    title: "Jailbreak Vehicles & Heists Quiz",
    description: "Cops vs. criminals! Test your knowledge of Jailbreak vehicles, heists, and escape strategies!",
    category: "Roblox",
    emoji: "🚔",
    questions: [
      {
        question: "What are the two main teams in Jailbreak?",
        options: [
          "Heroes and Villains",
          "Police and Prisoners/Criminals",
          "Red Team and Blue Team",
          "Hunters and Runners",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is the first thing a prisoner needs to do in Jailbreak?",
        options: [
          "Find a weapon",
          "Escape from the prison",
          "Rob a bank",
          "Buy a car",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which of these is a robbable location in Jailbreak?",
        options: [
          "The School",
          "The Bank",
          "The Park",
          "The Beach",
        ],
        correctAnswer: 1,
      },
      {
        question: "Who are the creators of Jailbreak?",
        options: [
          "BIG Games",
          "Asimo3089 and Badcc (Badimo)",
          "Nikilis",
          "ROLVe Community",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is one of the fastest vehicles in Jailbreak?",
        options: ["Bicycle", "Camaro", "Torpedo", "Pickup Truck"],
        correctAnswer: 2,
      },
      {
        question: "What happens when a police officer arrests a criminal in Jailbreak?",
        options: [
          "The criminal is eliminated",
          "The criminal is sent back to prison",
          "The criminal loses all vehicles",
          "The criminal switches teams",
        ],
        correctAnswer: 1,
      },
      {
        question: "What do criminals earn from completing robberies in Jailbreak?",
        options: ["XP only", "Cash", "Robux", "Gems"],
        correctAnswer: 1,
      },
      {
        question: "Which of these vehicles can fly in Jailbreak?",
        options: ["Camaro", "Helicopter", "Ambulance", "Bicycle"],
        correctAnswer: 1,
      },
      {
        question: "What tool do police officers use to arrest criminals in Jailbreak?",
        options: [
          "A net gun",
          "Handcuffs",
          "A taser only",
          "A lasso",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is the Jewelry Store in Jailbreak?",
        options: [
          "A place to buy accessories",
          "A location you can rob for cash",
          "A safe zone for all players",
          "A vehicle dealership",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "roblox-pizza-place",
    title: "Work at a Pizza Place Trivia",
    description: "Do you know everything about working at the pizza place? Test your knowledge of jobs, upgrades, and pizza-making fun!",
    category: "Roblox",
    emoji: "🍕",
    questions: [
      {
        question: "What is the main goal in Work at a Pizza Place?",
        options: [
          "Eat the most pizza",
          "Work various jobs at the pizza place and earn coins to upgrade your house",
          "Build a pizza restaurant",
          "Deliver pizza in a race",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which of these is NOT a job in Work at a Pizza Place?",
        options: ["Cashier", "Cook", "Delivery", "Janitor"],
        correctAnswer: 3,
      },
      {
        question: "What do you do as a delivery driver in the game?",
        options: [
          "Cook the pizza",
          "Take orders from customers",
          "Deliver pizza boxes to houses around the map",
          "Clean the restaurant",
        ],
        correctAnswer: 2,
      },
      {
        question: "What can you do with the money you earn in Work at a Pizza Place?",
        options: [
          "Buy new pizza recipes",
          "Upgrade and decorate your house",
          "Buy a new restaurant",
          "Hire other players",
        ],
        correctAnswer: 1,
      },
      {
        question: "Who is the manager in Work at a Pizza Place?",
        options: [
          "The game automatically assigns one",
          "A player is voted as manager",
          "There is no manager",
          "An NPC named Tony",
        ],
        correctAnswer: 1,
      },
      {
        question: "What does the cook do in Work at a Pizza Place?",
        options: [
          "Delivers pizza",
          "Takes customer orders",
          "Puts pizza in the oven and boxes completed orders",
          "Sweeps the floor",
        ],
        correctAnswer: 2,
      },
      {
        question: "Who created Work at a Pizza Place?",
        options: ["Stickmasterluke", "Badimo", "Dued1", "BIG Games"],
        correctAnswer: 2,
      },
      {
        question: "What happens if you don't work and just hang out in the game?",
        options: [
          "You get kicked",
          "You still earn some coins but much less",
          "The manager can fire you",
          "Nothing, there's no penalty",
        ],
        correctAnswer: 2,
      },
      {
        question: "What can the manager do in Work at a Pizza Place?",
        options: [
          "Nothing special",
          "Assign roles and oversee the restaurant",
          "Get double pay automatically",
          "Lock other players out of the game",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is the supply delivery person's job in the game?",
        options: [
          "Delivering pizza to customers",
          "Bringing ingredients and supplies to the restaurant",
          "Fixing broken equipment",
          "Driving the pizza truck in races",
        ],
        correctAnswer: 1,
      },
    ],
  },
];
