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

export const minecraftQuizzes: Quiz[] = [
  {
    id: "mc-mobs",
    title: "Minecraft Mobs: Friend or Foe?",
    description: "Test your knowledge about all the creatures that roam the world of Minecraft!",
    category: "Minecraft",
    emoji: "🧟",
    questions: [
      {
        question: "Which mob explodes when it gets close to a player?",
        options: ["Zombie", "Creeper", "Skeleton", "Enderman"],
        correctAnswer: 1,
      },
      {
        question: "What do you need to tame a wolf in Minecraft?",
        options: ["Steak", "Bone", "Fish", "Apple"],
        correctAnswer: 1,
      },
      {
        question: "Which mob drops Ender Pearls when defeated?",
        options: ["Blaze", "Wither Skeleton", "Enderman", "Phantom"],
        correctAnswer: 2,
      },
      {
        question: "What happens if you look directly at an Enderman?",
        options: [
          "It teleports away",
          "It becomes friendly",
          "It attacks you",
          "It drops loot",
        ],
        correctAnswer: 2,
      },
      {
        question: "Which mob is known for stealing blocks and placing them elsewhere?",
        options: ["Creeper", "Zombie", "Enderman", "Pillager"],
        correctAnswer: 2,
      },
      {
        question: "What animal can you ride across water in Minecraft?",
        options: ["Horse", "Pig", "Strider", "Llama"],
        correctAnswer: 2,
      },
      {
        question: "Which hostile mob spawns only at night or in dark areas in the Overworld?",
        options: ["Drowned", "Phantom", "Zombie", "Guardian"],
        correctAnswer: 2,
      },
      {
        question: "What do cats scare away in Minecraft?",
        options: ["Zombies", "Spiders", "Creepers", "Skeletons"],
        correctAnswer: 2,
      },
      {
        question: "Which mob can be created by the player using blocks?",
        options: ["Golem", "Villager", "Witch", "Ravager"],
        correctAnswer: 0,
      },
      {
        question: "What do Phantoms attack players for?",
        options: [
          "Being in the Nether",
          "Not sleeping for 3+ days",
          "Wearing gold armor",
          "Carrying Ender Pearls",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "mc-crafting",
    title: "Minecraft Crafting Recipes Challenge",
    description: "How well do you know the crafting table? Put your recipe knowledge to the test!",
    category: "Minecraft",
    emoji: "⚒️",
    questions: [
      {
        question: "What pattern do you use to craft a pickaxe?",
        options: [
          "3 materials on top, 2 sticks below center",
          "2 materials on top, 3 sticks below",
          "Materials in an L shape",
          "Materials in a diagonal line",
        ],
        correctAnswer: 0,
      },
      {
        question: "How many iron ingots do you need to craft a full set of iron armor?",
        options: ["20", "24", "22", "26"],
        correctAnswer: 1,
      },
      {
        question: "What is needed to craft a cake in Minecraft?",
        options: [
          "Milk, sugar, eggs, wheat",
          "Milk, cocoa, eggs, wheat",
          "Sugar, eggs, wheat, apples",
          "Milk, sugar, wheat, berries",
        ],
        correctAnswer: 0,
      },
      {
        question: "Which item is crafted using 4 iron ingots and 1 redstone dust?",
        options: ["Hopper", "Compass", "Clock", "Piston"],
        correctAnswer: 1,
      },
      {
        question: "What do you combine with a stick to make a torch?",
        options: ["Glowstone dust", "Coal or charcoal", "Blaze powder", "Redstone dust"],
        correctAnswer: 1,
      },
      {
        question: "How many planks does it take to craft a crafting table?",
        options: ["2", "6", "4", "8"],
        correctAnswer: 2,
      },
      {
        question: "What materials are used to craft an Enchanting Table?",
        options: [
          "Diamonds, obsidian, book",
          "Gold, obsidian, book",
          "Emeralds, obsidian, book",
          "Diamonds, crying obsidian, book",
        ],
        correctAnswer: 0,
      },
      {
        question: "How many sticks and strings do you need to craft a bow?",
        options: [
          "2 sticks, 3 strings",
          "3 sticks, 3 strings",
          "3 sticks, 2 strings",
          "4 sticks, 2 strings",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is crafted with 3 wheat in a row?",
        options: ["Cake", "Bread", "Hay bale", "Cookie"],
        correctAnswer: 1,
      },
      {
        question: "Which item requires blaze powder and an Ender Pearl to craft?",
        options: ["End Crystal", "Eye of Ender", "Ender Chest", "Respawn Anchor"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "mc-biomes",
    title: "Minecraft Biomes & Structures Quiz",
    description: "Explore the vast world of Minecraft biomes and the structures hidden within them!",
    category: "Minecraft",
    emoji: "🏔️",
    questions: [
      {
        question: "Which biome features tall mushrooms and Mooshroom cows?",
        options: ["Dark Forest", "Mushroom Island", "Swamp", "Jungle"],
        correctAnswer: 1,
      },
      {
        question: "Where can you find an Ocean Monument?",
        options: ["Shallow ocean", "Deep ocean", "River", "Frozen ocean only"],
        correctAnswer: 1,
      },
      {
        question: "What structure is guarded by an Elder Guardian?",
        options: ["Stronghold", "Ocean Monument", "Woodland Mansion", "End City"],
        correctAnswer: 1,
      },
      {
        question: "In which biome can you find naturally spawning bamboo?",
        options: ["Savanna", "Plains", "Jungle", "Forest"],
        correctAnswer: 2,
      },
      {
        question: "What is the rarest biome in Minecraft?",
        options: ["Mushroom Island", "Modified Jungle Edge", "Ice Spikes", "Badlands"],
        correctAnswer: 1,
      },
      {
        question: "Which structure contains the End Portal?",
        options: ["Dungeon", "Stronghold", "Bastion Remnant", "Ruined Portal"],
        correctAnswer: 1,
      },
      {
        question: "What biome has terracotta and gold ore at the surface?",
        options: ["Desert", "Savanna", "Badlands (Mesa)", "Mountains"],
        correctAnswer: 2,
      },
      {
        question: "Where do Pillager Outposts typically generate?",
        options: [
          "Only in forests",
          "Near villages in various biomes",
          "Only in deserts",
          "In the Nether",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which biome features packed ice and blue ice naturally?",
        options: ["Snowy Plains", "Ice Spikes", "Frozen River", "Snowy Taiga"],
        correctAnswer: 1,
      },
      {
        question: "What can you find inside a Desert Pyramid?",
        options: [
          "Ender Pearls",
          "A TNT trap and treasure chests",
          "A spawner",
          "An enchanting table",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "mc-enchantments",
    title: "Minecraft Enchantments Master Quiz",
    description: "Are you a true enchantment expert? Test your magical knowledge!",
    category: "Minecraft",
    emoji: "✨",
    questions: [
      {
        question: "What is the maximum level of the Sharpness enchantment?",
        options: ["III", "IV", "V", "X"],
        correctAnswer: 2,
      },
      {
        question: "Which enchantment lets you walk on water by freezing it?",
        options: ["Aqua Affinity", "Depth Strider", "Frost Walker", "Water Walking"],
        correctAnswer: 2,
      },
      {
        question: "What enchantment causes enemies to take damage when they hit you?",
        options: ["Protection", "Thorns", "Fire Aspect", "Knockback"],
        correctAnswer: 1,
      },
      {
        question: "Which enchantment makes your pickaxe drop more items from ore?",
        options: ["Efficiency", "Fortune", "Silk Touch", "Unbreaking"],
        correctAnswer: 1,
      },
      {
        question: "Can Fortune and Silk Touch be on the same tool?",
        options: [
          "Yes, always",
          "Only on diamond tools",
          "No, they are mutually exclusive",
          "Only through commands",
        ],
        correctAnswer: 2,
      },
      {
        question: "What does the Mending enchantment do?",
        options: [
          "Automatically repairs items over time",
          "Uses XP to repair the item",
          "Prevents the item from breaking",
          "Doubles item durability",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which enchantment is exclusive to the crossbow?",
        options: ["Infinity", "Multishot", "Power", "Flame"],
        correctAnswer: 1,
      },
      {
        question: "How many bookshelves do you need for max-level enchantments?",
        options: ["10", "12", "15", "20"],
        correctAnswer: 2,
      },
      {
        question: "What does the Loyalty enchantment do on a trident?",
        options: [
          "Increases damage",
          "Makes it return after throwing",
          "Lets you fly with it",
          "Summons lightning",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which enchantment lets you breathe longer underwater?",
        options: ["Aqua Affinity", "Depth Strider", "Respiration", "Water Breathing"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "mc-redstone",
    title: "Minecraft Redstone Engineer Quiz",
    description: "Think you can master redstone circuits? Prove your engineering skills!",
    category: "Minecraft",
    emoji: "🔴",
    questions: [
      {
        question: "How far can a redstone signal travel before it needs a repeater?",
        options: ["10 blocks", "15 blocks", "20 blocks", "12 blocks"],
        correctAnswer: 1,
      },
      {
        question: "What does a redstone comparator do?",
        options: [
          "Amplifies signals",
          "Compares or measures signal strength",
          "Creates loops",
          "Powers pistons only",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which block can be pushed by a piston but NOT pulled by a sticky piston?",
        options: ["Dirt", "Cobblestone", "Glazed Terracotta", "Sand"],
        correctAnswer: 2,
      },
      {
        question: "What component do you need to make a T Flip-Flop in Minecraft?",
        options: ["Hopper", "Dropper", "Sticky piston", "Observer"],
        correctAnswer: 2,
      },
      {
        question: "How many ticks of delay does one redstone repeater add at its default setting?",
        options: ["1 tick", "2 ticks", "4 ticks", "0.5 ticks"],
        correctAnswer: 0,
      },
      {
        question: "What block detects block updates and outputs a redstone signal?",
        options: ["Daylight Sensor", "Observer", "Sculk Sensor", "Tripwire Hook"],
        correctAnswer: 1,
      },
      {
        question: "Which item is used to activate a Dropper or Dispenser remotely?",
        options: ["Lever only", "Any redstone signal", "Button only", "Pressure plate only"],
        correctAnswer: 1,
      },
      {
        question: "What happens when you power a Note Block with redstone?",
        options: [
          "It breaks",
          "It plays a musical note",
          "It lights up",
          "It launches items",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which block cannot be moved by pistons at all?",
        options: ["Dirt", "Obsidian", "Sand", "Wool"],
        correctAnswer: 1,
      },
      {
        question: "What is a BUD switch used for in redstone?",
        options: [
          "Powering lamps",
          "Detecting block updates",
          "Creating music",
          "Sorting items",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "mc-nether-end",
    title: "Minecraft Nether & End Dimension Trivia",
    description: "Venture into the dangerous Nether and mysterious End dimensions!",
    category: "Minecraft",
    emoji: "🔥",
    questions: [
      {
        question: "What block do you need to build a Nether Portal frame?",
        options: ["Crying Obsidian", "Obsidian", "Blackstone", "Netherrack"],
        correctAnswer: 1,
      },
      {
        question: "What do Piglins trade items for?",
        options: ["Diamonds", "Emeralds", "Gold Ingots", "Iron Ingots"],
        correctAnswer: 2,
      },
      {
        question: "Which biome in the Nether is home to Hoglins?",
        options: ["Crimson Forest", "Warped Forest", "Soul Sand Valley", "Basalt Deltas"],
        correctAnswer: 0,
      },
      {
        question: "How do you respawn the Ender Dragon?",
        options: [
          "Place 4 End Crystals on the exit portal",
          "Use a command block",
          "Throw Ender Pearls at the portal",
          "Defeat the Wither first",
        ],
        correctAnswer: 0,
      },
      {
        question: "What item do Blazes drop that is essential for brewing?",
        options: ["Magma Cream", "Blaze Rod", "Nether Wart", "Ghast Tear"],
        correctAnswer: 1,
      },
      {
        question: "What happens if you place a bed in the Nether?",
        options: [
          "You set your spawn point",
          "Nothing happens",
          "It explodes",
          "It disappears",
        ],
        correctAnswer: 2,
      },
      {
        question: "What is found in End Cities that lets you glide?",
        options: ["Wings of Flight", "Elytra", "Phantom Membrane", "Ender Wings"],
        correctAnswer: 1,
      },
      {
        question: "Which Nether mob floats and shoots fireballs?",
        options: ["Blaze", "Ghast", "Wither Skeleton", "Piglin Brute"],
        correctAnswer: 1,
      },
      {
        question: "What block do you walk on to move fast through Soul Sand Valley?",
        options: ["Soul Sand", "Soul Soil", "Both are slow", "Netherrack"],
        correctAnswer: 2,
      },
      {
        question: "What do you get for defeating the Ender Dragon for the first time?",
        options: [
          "A diamond block",
          "A huge amount of XP and access to End gateway",
          "An Elytra",
          "A Nether Star",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "mc-updates",
    title: "Minecraft Updates Through the Years",
    description: "How well do you know the history of Minecraft's biggest updates?",
    category: "Minecraft",
    emoji: "📅",
    questions: [
      {
        question: "Which update added the Warden and Deep Dark biome?",
        options: [
          "Caves & Cliffs Part 2",
          "The Wild Update",
          "Trails & Tales",
          "Nether Update",
        ],
        correctAnswer: 1,
      },
      {
        question: "What was the name of the update that revamped the Nether in 2020?",
        options: [
          "The Nether Overhaul",
          "Nether Update",
          "Caves & Cliffs",
          "The Nether Dimension Update",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which update added Copper and Amethyst to the game?",
        options: ["The Wild Update", "Buzzy Bees", "Caves & Cliffs", "Village & Pillage"],
        correctAnswer: 2,
      },
      {
        question: "The 'Buzzy Bees' update introduced which new mob?",
        options: ["Bee", "Fox", "Panda", "Axolotl"],
        correctAnswer: 0,
      },
      {
        question: "What year was Minecraft officially released?",
        options: ["2009", "2010", "2011", "2012"],
        correctAnswer: 2,
      },
      {
        question: "Which update introduced the Elytra for the first time?",
        options: [
          "1.7 - The Update That Changed the World",
          "1.9 - The Combat Update",
          "1.11 - The Exploration Update",
          "1.13 - Update Aquatic",
        ],
        correctAnswer: 1,
      },
      {
        question: "The 'Village & Pillage' update changed what major feature?",
        options: [
          "Enchanting system",
          "Village mechanics and villager trading",
          "Combat system",
          "Redstone mechanics",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which update added the Sculk Sensor block?",
        options: ["Caves & Cliffs Part 1", "The Wild Update", "Trails & Tales", "Nether Update"],
        correctAnswer: 0,
      },
      {
        question: "What was added in the 'Update Aquatic'?",
        options: [
          "Dolphins, turtles, and underwater ruins",
          "Axolotls and glow squid",
          "Frogs and mangroves",
          "Whales and sharks",
        ],
        correctAnswer: 0,
      },
      {
        question: "Which update introduced Cherry Blossom trees?",
        options: ["The Wild Update", "Trails & Tales", "Caves & Cliffs", "Buzzy Bees"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "mc-speedrun",
    title: "Minecraft Speedrun Knowledge Quiz",
    description: "Do you have what it takes to think like a Minecraft speedrunner?",
    category: "Minecraft",
    emoji: "⏱️",
    questions: [
      {
        question: "What is the main goal in a standard Minecraft speedrun?",
        options: [
          "Collect all achievements",
          "Defeat the Ender Dragon",
          "Build a house",
          "Find all biomes",
        ],
        correctAnswer: 1,
      },
      {
        question: "Why do speedrunners trade with Piglins?",
        options: [
          "For diamonds",
          "For Ender Pearls",
          "For golden apples",
          "For blaze rods",
        ],
        correctAnswer: 1,
      },
      {
        question: "What structure do speedrunners look for to find the End Portal?",
        options: ["Desert Temple", "Stronghold", "Woodland Mansion", "Ruined Portal"],
        correctAnswer: 1,
      },
      {
        question: "How many Eyes of Ender are needed to fill an End Portal frame?",
        options: ["8", "10", "12", "16"],
        correctAnswer: 2,
      },
      {
        question: "Why do speedrunners build Nether portals at specific coordinates?",
        options: [
          "For achievements",
          "Because Nether travel is 8x faster than Overworld",
          "To find more diamonds",
          "To avoid mobs",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is a 'zero cycle' in speedrunning?",
        options: [
          "Dying zero times",
          "Finding the stronghold at spawn",
          "A Nether portal that forms naturally",
          "Entering the Nether on the first night",
        ],
        correctAnswer: 1,
      },
      {
        question: "How many Blaze Rods does a speedrunner typically need?",
        options: ["At least 5", "At least 7", "Exactly 12", "At least 3"],
        correctAnswer: 1,
      },
      {
        question: "What trick do speedrunners use beds for in the End?",
        options: [
          "Setting a respawn point",
          "Sleeping through the fight",
          "Exploding them to damage the dragon",
          "Blocking Endermen",
        ],
        correctAnswer: 2,
      },
      {
        question: "What does 'F3' show that helps speedrunners navigate?",
        options: [
          "The crafting menu",
          "Coordinates and debug info",
          "A map of the world",
          "Entity count only",
        ],
        correctAnswer: 1,
      },
      {
        question: "What set seed means in speedrunning?",
        options: [
          "You plant seeds for food",
          "The world seed is predetermined and known",
          "You set your spawn point",
          "You use only seed items",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "mc-blocks",
    title: "Minecraft Building Blocks & Materials",
    description: "Test your knowledge of Minecraft's vast collection of blocks and building materials!",
    category: "Minecraft",
    emoji: "🧱",
    questions: [
      {
        question: "What is the hardest block to break in Minecraft (in survival)?",
        options: ["Diamond Block", "Obsidian", "Bedrock", "Netherite Block"],
        correctAnswer: 2,
      },
      {
        question: "How many planks do you get from one log?",
        options: ["2", "4", "6", "8"],
        correctAnswer: 1,
      },
      {
        question: "Which block emits the most light?",
        options: ["Torch", "Glowstone", "Sea Lantern", "All emit the same light"],
        correctAnswer: 3,
      },
      {
        question: "What happens when water touches lava source blocks?",
        options: ["Steam appears", "Obsidian forms", "Cobblestone forms", "Nothing happens"],
        correctAnswer: 1,
      },
      {
        question: "Which block is affected by gravity?",
        options: ["Dirt", "Stone", "Sand", "Wood"],
        correctAnswer: 2,
      },
      {
        question: "What tool is fastest for breaking glass?",
        options: [
          "Pickaxe",
          "Any tool breaks it the same speed",
          "Sword",
          "Axe",
        ],
        correctAnswer: 1,
      },
      {
        question: "How do you get Smooth Stone?",
        options: [
          "Mine it directly",
          "Smelt cobblestone twice",
          "Craft it from stone slabs",
          "Use Silk Touch on stone",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is Crying Obsidian used for?",
        options: [
          "Building Nether portals",
          "Crafting a Respawn Anchor",
          "Making enchanting tables",
          "Decoration only",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which block can store items like a chest but can be moved by pistons?",
        options: ["Barrel", "Shulker Box", "Ender Chest", "Trapped Chest"],
        correctAnswer: 1,
      },
      {
        question: "What type of block is Prismarine?",
        options: [
          "A Nether block",
          "An ocean-themed block found in monuments",
          "A type of ore",
          "An End block",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "mc-hardcore",
    title: "Minecraft Hardcore Survival Tips Quiz",
    description: "Only the best survivors know these hardcore tips and tricks!",
    category: "Minecraft",
    emoji: "💀",
    questions: [
      {
        question: "What happens when you die in Hardcore mode?",
        options: [
          "You respawn with no items",
          "You can only spectate the world",
          "The world is deleted immediately",
          "You respawn at spawn point",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is the best food source for sustained health regeneration?",
        options: ["Steak", "Golden Apple", "Golden Carrot", "Cooked Porkchop"],
        correctAnswer: 2,
      },
      {
        question: "Why should you always carry a water bucket in Hardcore?",
        options: [
          "To farm crops",
          "To save yourself from fall damage",
          "To make potions",
          "To put out fires only",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is the safest way to mine for diamonds?",
        options: [
          "Dig straight down",
          "Cave exploring at any level",
          "Branch mining at Y-level -59",
          "TNT mining",
        ],
        correctAnswer: 2,
      },
      {
        question: "Which armor material provides the best protection?",
        options: ["Diamond", "Netherite", "Iron", "Gold"],
        correctAnswer: 1,
      },
      {
        question: "What should you do before entering the Nether in Hardcore?",
        options: [
          "Bring only a sword",
          "Build a safe portal room with full gear",
          "Go in with no armor",
          "Bring lots of wood",
        ],
        correctAnswer: 1,
      },
      {
        question: "How can you prevent Endermen from being hostile?",
        options: [
          "Wear gold armor",
          "Wear a carved pumpkin on your head",
          "Hold a torch",
          "Crouch at all times",
        ],
        correctAnswer: 1,
      },
      {
        question: "What potion is most useful against the Ender Dragon?",
        options: [
          "Potion of Strength",
          "Slow Falling Potion",
          "Potion of Invisibility",
          "Potion of Speed",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is the biggest danger in a Hardcore Nether Fortress?",
        options: [
          "Lava floors",
          "Blazes and Wither Skeletons",
          "Falling off edges",
          "Getting lost",
        ],
        correctAnswer: 1,
      },
      {
        question: "How do you protect your base from Creeper explosions?",
        options: [
          "Use only wood blocks",
          "Light up the area well and use cats or walls",
          "Build underground only",
          "Place water everywhere",
        ],
        correctAnswer: 1,
      },
    ],
  },
];
