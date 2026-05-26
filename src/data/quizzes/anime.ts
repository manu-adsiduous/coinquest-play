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

export const animeQuizzes: Quiz[] = [
  {
    id: "anime-naruto",
    title: "Naruto Characters & Jutsu Quiz",
    description: "Believe it! Test your knowledge of Naruto's ninja world!",
    category: "Anime",
    emoji: "🍥",
    questions: [
      {
        question: "What is the name of the Nine-Tailed Fox sealed inside Naruto?",
        options: ["Shukaku", "Kurama", "Matatabi", "Gyuki"],
        correctAnswer: 1,
      },
      {
        question: "What is Naruto's signature jutsu?",
        options: ["Chidori", "Rasengan", "Shadow Clone Jutsu", "Fireball Jutsu"],
        correctAnswer: 2,
      },
      {
        question: "Who is Naruto's best friend and rival?",
        options: ["Shikamaru", "Gaara", "Sasuke", "Rock Lee"],
        correctAnswer: 2,
      },
      {
        question: "What village is Naruto from?",
        options: [
          "Hidden Sand Village",
          "Hidden Leaf Village",
          "Hidden Mist Village",
          "Hidden Cloud Village",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is the Sharingan?",
        options: [
          "A weapon",
          "A type of ramen",
          "A special eye ability",
          "A summoning animal",
        ],
        correctAnswer: 2,
      },
      {
        question: "Who is Naruto's sensei (teacher) in Team 7?",
        options: ["Iruka", "Jiraiya", "Kakashi", "Guy"],
        correctAnswer: 2,
      },
      {
        question: "What does Naruto want to become?",
        options: ["A Jonin", "The Hokage", "An ANBU", "A Sannin"],
        correctAnswer: 1,
      },
      {
        question: "What color is Naruto's iconic jumpsuit?",
        options: ["Red", "Blue", "Orange", "Green"],
        correctAnswer: 2,
      },
      {
        question: "Who is the leader of the Akatsuki organization?",
        options: ["Itachi", "Orochimaru", "Pain", "Madara"],
        correctAnswer: 2,
      },
      {
        question: "What is Naruto's favorite food?",
        options: ["Sushi", "Ramen", "Rice balls", "Dumplings"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "anime-dbz",
    title: "Dragon Ball Z Power Levels Trivia",
    description: "It's over 9000! How much do you know about Dragon Ball Z?",
    category: "Anime",
    emoji: "🐉",
    questions: [
      {
        question: "What is Goku's Saiyan birth name?",
        options: ["Vegeta", "Kakarot", "Broly", "Bardock"],
        correctAnswer: 1,
      },
      {
        question: "What transformation makes a Saiyan's hair turn golden?",
        options: ["Ultra Instinct", "Kaioken", "Super Saiyan", "Great Ape"],
        correctAnswer: 2,
      },
      {
        question: "What is the name of the wish-granting dragon in Dragon Ball?",
        options: ["Shenron", "Porunga", "Omega", "Drago"],
        correctAnswer: 0,
      },
      {
        question: "How many Dragon Balls do you need to summon the dragon?",
        options: ["5", "6", "7", "8"],
        correctAnswer: 2,
      },
      {
        question: "Who is Goku's main rival and the Prince of all Saiyans?",
        options: ["Piccolo", "Frieza", "Vegeta", "Cell"],
        correctAnswer: 2,
      },
      {
        question: "What technique does Goku use to teleport instantly?",
        options: [
          "Kamehameha",
          "Instant Transmission",
          "Solar Flare",
          "Spirit Bomb",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is Goku's most famous energy attack?",
        options: ["Final Flash", "Special Beam Cannon", "Kamehameha", "Galick Gun"],
        correctAnswer: 2,
      },
      {
        question: "Who trained Goku on his way to Planet Namek?",
        options: ["Master Roshi", "King Kai", "Whis", "Himself (in a spaceship)"],
        correctAnswer: 3,
      },
      {
        question: "What does the scouter famously say about Goku's power level?",
        options: [
          "It's over 9000!",
          "It's over 1 million!",
          "It's unmeasurable!",
          "It's exactly 8000!",
        ],
        correctAnswer: 0,
      },
      {
        question: "What is the name of Goku's youngest son?",
        options: ["Gohan", "Goten", "Trunks", "Pan"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "anime-one-piece",
    title: "One Piece Devil Fruits & Crews",
    description: "Set sail and test your One Piece knowledge!",
    category: "Anime",
    emoji: "🏴‍☠️",
    questions: [
      {
        question: "What is the name of Luffy's pirate crew?",
        options: [
          "Red Hair Pirates",
          "Straw Hat Pirates",
          "Heart Pirates",
          "Whitebeard Pirates",
        ],
        correctAnswer: 1,
      },
      {
        question: "What Devil Fruit did Luffy eat?",
        options: [
          "Flame-Flame Fruit",
          "Gum-Gum Fruit",
          "Chop-Chop Fruit",
          "Smoke-Smoke Fruit",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is Luffy's dream?",
        options: [
          "To find the All Blue",
          "To become the greatest swordsman",
          "To become King of the Pirates",
          "To draw a map of the world",
        ],
        correctAnswer: 2,
      },
      {
        question: "What is the name of the legendary treasure everyone is searching for?",
        options: ["Grand Treasure", "One Piece", "Devil's Gold", "Pirate's Fortune"],
        correctAnswer: 1,
      },
      {
        question: "Who is the swordsman in Luffy's crew who uses three swords?",
        options: ["Sanji", "Brook", "Zoro", "Franky"],
        correctAnswer: 2,
      },
      {
        question: "What happens to a Devil Fruit user when they fall in water?",
        options: [
          "They get stronger",
          "They lose their powers and can't swim",
          "Nothing happens",
          "They transform",
        ],
        correctAnswer: 1,
      },
      {
        question: "Who is the cook of the Straw Hat Pirates?",
        options: ["Usopp", "Sanji", "Chopper", "Jinbe"],
        correctAnswer: 1,
      },
      {
        question: "What is the name of the ocean where the strongest pirates sail?",
        options: ["East Blue", "West Blue", "Grand Line", "Calm Belt"],
        correctAnswer: 2,
      },
      {
        question: "Tony Tony Chopper is what kind of animal?",
        options: ["A raccoon", "A dog", "A reindeer", "A tanuki"],
        correctAnswer: 2,
      },
      {
        question: "What pirate gave Luffy his signature straw hat?",
        options: ["Gol D. Roger", "Whitebeard", "Shanks", "Rayleigh"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "anime-demon-slayer",
    title: "Demon Slayer Breathing Styles Quiz",
    description: "Can you master all the Breathing Styles? Take this quiz to find out!",
    category: "Anime",
    emoji: "⚔️",
    questions: [
      {
        question: "What Breathing Style does Tanjiro primarily use?",
        options: [
          "Flame Breathing",
          "Water Breathing",
          "Thunder Breathing",
          "Wind Breathing",
        ],
        correctAnswer: 1,
      },
      {
        question: "Why does Tanjiro become a Demon Slayer?",
        options: [
          "For fame",
          "To cure his sister Nezuko who was turned into a demon",
          "To become rich",
          "Because his friends dared him",
        ],
        correctAnswer: 1,
      },
      {
        question: "What does Nezuko carry on her mouth?",
        options: ["A mask", "A bamboo muzzle", "A scarf", "Nothing"],
        correctAnswer: 1,
      },
      {
        question: "What Breathing Style does Zenitsu use?",
        options: [
          "Water Breathing",
          "Beast Breathing",
          "Thunder Breathing",
          "Flame Breathing",
        ],
        correctAnswer: 2,
      },
      {
        question: "What is unique about Zenitsu when he fights?",
        options: [
          "He fights while asleep",
          "He uses two swords",
          "He never attacks",
          "He turns invisible",
        ],
        correctAnswer: 0,
      },
      {
        question: "Who is the main villain and first demon in Demon Slayer?",
        options: ["Akaza", "Kokushibo", "Muzan Kibutsuji", "Enmu"],
        correctAnswer: 2,
      },
      {
        question: "What color does Tanjiro's Nichirin sword turn?",
        options: ["Red", "Blue", "Black", "Yellow"],
        correctAnswer: 2,
      },
      {
        question: "What are the strongest demons under Muzan called?",
        options: [
          "Demon Lords",
          "The Twelve Kizuki",
          "Shadow Demons",
          "Blood Warriors",
        ],
        correctAnswer: 1,
      },
      {
        question: "Inosuke wears a mask that looks like what animal?",
        options: ["A wolf", "A bear", "A boar", "A tiger"],
        correctAnswer: 2,
      },
      {
        question: "What special sense does Tanjiro have that helps him fight?",
        options: [
          "Super hearing",
          "An incredible sense of smell",
          "X-ray vision",
          "Mind reading",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "anime-mha",
    title: "My Hero Academia Quirks Challenge",
    description: "Go beyond! Plus Ultra! Test your MHA knowledge!",
    category: "Anime",
    emoji: "🦸",
    questions: [
      {
        question: "What is the name of Deku's Quirk?",
        options: ["All For One", "One For All", "Full Cowling", "Super Strength"],
        correctAnswer: 1,
      },
      {
        question: "What is Deku's real name?",
        options: [
          "Katsuki Bakugo",
          "Shoto Todoroki",
          "Izuku Midoriya",
          "Tenya Iida",
        ],
        correctAnswer: 2,
      },
      {
        question: "Who gave Deku his Quirk?",
        options: ["Endeavor", "Eraser Head", "All Might", "Gran Torino"],
        correctAnswer: 2,
      },
      {
        question: "What is the name of the hero school Deku attends?",
        options: ["UA High School", "Shiketsu High", "Hero Academy", "Quirk School"],
        correctAnswer: 0,
      },
      {
        question: "What is Bakugo's Quirk called?",
        options: ["Fireblast", "Explosion", "Dynamite", "Blast Wave"],
        correctAnswer: 1,
      },
      {
        question: "What is the motto of UA High School?",
        options: ["Go Beyond!", "Plus Ultra!", "Never Give Up!", "Heroes Rise!"],
        correctAnswer: 1,
      },
      {
        question: "Todoroki has a Quirk that lets him control what two elements?",
        options: [
          "Water and wind",
          "Fire and ice",
          "Earth and lightning",
          "Light and shadow",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is the name of the villain group led by Shigaraki?",
        options: [
          "The Villains",
          "Dark Alliance",
          "League of Villains",
          "Evil Society",
        ],
        correctAnswer: 2,
      },
      {
        question: "What does Eraser Head's Quirk do?",
        options: [
          "Makes him invisible",
          "Erases other people's Quirks temporarily",
          "Erases memories",
          "Makes things disappear",
        ],
        correctAnswer: 1,
      },
      {
        question: "What was All Might's famous catchphrase when saving people?",
        options: [
          "Fear not!",
          "I am here!",
          "Justice prevails!",
          "To the rescue!",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "anime-aot",
    title: "Attack on Titan Trivia",
    description: "Dedicate your hearts! How much do you know about Attack on Titan?",
    category: "Anime",
    emoji: "🏰",
    questions: [
      {
        question: "What are the giant humanoid creatures that attack humanity called?",
        options: ["Giants", "Colossi", "Titans", "Kaiju"],
        correctAnswer: 2,
      },
      {
        question: "What is the name of the main character in Attack on Titan?",
        options: ["Armin Arlert", "Levi Ackerman", "Eren Yeager", "Erwin Smith"],
        correctAnswer: 2,
      },
      {
        question: "What do the soldiers use to fly through the air and fight Titans?",
        options: [
          "Jetpacks",
          "ODM Gear (Omni-Directional Mobility)",
          "Wings",
          "Grappling hooks only",
        ],
        correctAnswer: 1,
      },
      {
        question: "What are the three walls that protect humanity called?",
        options: [
          "Wall Alpha, Beta, Gamma",
          "Wall Maria, Rose, Sheena",
          "Wall North, South, East",
          "Wall Iron, Steel, Stone",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which Titan is the tallest and broke through Wall Maria first?",
        options: [
          "Armored Titan",
          "Beast Titan",
          "Colossal Titan",
          "Female Titan",
        ],
        correctAnswer: 2,
      },
      {
        question: "What branch of the military goes outside the walls to fight Titans?",
        options: [
          "The Garrison",
          "Military Police",
          "The Survey Corps",
          "The Wall Guard",
        ],
        correctAnswer: 2,
      },
      {
        question: "Who is known as 'Humanity's Strongest Soldier'?",
        options: ["Eren", "Erwin", "Levi", "Mikasa"],
        correctAnswer: 2,
      },
      {
        question: "What is the weak spot on a Titan's body?",
        options: ["The eyes", "The heart", "The nape of the neck", "The feet"],
        correctAnswer: 2,
      },
      {
        question: "What special ability does Eren discover he has?",
        options: [
          "He can fly",
          "He can transform into a Titan",
          "He can become invisible",
          "He can read minds",
        ],
        correctAnswer: 1,
      },
      {
        question: "Who is Eren's adoptive sister?",
        options: ["Annie", "Historia", "Sasha", "Mikasa"],
        correctAnswer: 3,
      },
    ],
  },
  {
    id: "anime-jjk",
    title: "Jujutsu Kaisen Cursed Techniques Quiz",
    description: "Domain Expansion! Test your cursed energy knowledge!",
    category: "Anime",
    emoji: "👁️",
    questions: [
      {
        question: "What is the name of the main character in Jujutsu Kaisen?",
        options: [
          "Megumi Fushiguro",
          "Yuji Itadori",
          "Nobara Kugisaki",
          "Toge Inumaki",
        ],
        correctAnswer: 1,
      },
      {
        question: "What did Yuji swallow that changed his life forever?",
        options: [
          "A cursed sword",
          "A finger of Sukuna",
          "A cursed stone",
          "A magic pill",
        ],
        correctAnswer: 1,
      },
      {
        question: "Who is the strongest Jujutsu sorcerer and Yuji's teacher?",
        options: ["Nanami", "Gojo Satoru", "Todo", "Principal Yaga"],
        correctAnswer: 1,
      },
      {
        question: "What covers Gojo's eyes that he's always seen wearing?",
        options: ["Sunglasses", "A blindfold", "An eye patch", "A visor"],
        correctAnswer: 1,
      },
      {
        question: "What is Gojo's most powerful ability called?",
        options: [
          "Unlimited Power",
          "Infinity",
          "Cursed Blast",
          "Domain Crusher",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is a 'Domain Expansion' in Jujutsu Kaisen?",
        options: [
          "Making the school bigger",
          "A guaranteed-hit technique that creates a special space",
          "A type of weapon",
          "A healing ability",
        ],
        correctAnswer: 1,
      },
      {
        question: "Sukuna is known as the King of what?",
        options: ["Sorcerers", "Curses", "Demons", "Shadows"],
        correctAnswer: 1,
      },
      {
        question: "What school do Yuji and his friends attend?",
        options: [
          "Shibuya Academy",
          "Tokyo Jujutsu High",
          "Cursed Arts School",
          "Spirit Academy",
        ],
        correctAnswer: 1,
      },
      {
        question: "What weapon does Nobara use to fight curses?",
        options: [
          "A sword",
          "A hammer and nails",
          "A bow and arrow",
          "A staff",
        ],
        correctAnswer: 1,
      },
      {
        question: "What type of shikigami does Megumi summon using shadows?",
        options: [
          "Fire spirits",
          "Divine Dogs",
          "Wind demons",
          "Water serpents",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "anime-pokemon",
    title: "Pokemon Types & Evolutions Challenge",
    description: "Gotta catch 'em all! How well do you know your Pokemon?",
    category: "Anime",
    emoji: "⚡",
    questions: [
      {
        question: "What type of Pokemon is Pikachu?",
        options: ["Fire", "Water", "Electric", "Normal"],
        correctAnswer: 2,
      },
      {
        question: "What does Charmander evolve into first?",
        options: ["Charizard", "Charmeleon", "Blaziken", "Infernape"],
        correctAnswer: 1,
      },
      {
        question: "What is the name of Ash's main rival in the original series?",
        options: ["Brock", "Misty", "Gary Oak", "James"],
        correctAnswer: 2,
      },
      {
        question: "Which type is super effective against Water-type Pokemon?",
        options: ["Fire", "Ground", "Grass", "Ice"],
        correctAnswer: 2,
      },
      {
        question: "What is the first Pokemon in the Pokedex?",
        options: ["Pikachu", "Charmander", "Bulbasaur", "Mew"],
        correctAnswer: 2,
      },
      {
        question: "What does the villainous Team Rocket always try to steal?",
        options: [
          "Gym badges",
          "Ash's Pikachu",
          "Pokeballs",
          "Professor Oak's research",
        ],
        correctAnswer: 1,
      },
      {
        question: "What stone do you need to evolve Pikachu into Raichu?",
        options: ["Fire Stone", "Water Stone", "Thunder Stone", "Moon Stone"],
        correctAnswer: 2,
      },
      {
        question: "What legendary Pokemon is known as the creator of the Pokemon universe?",
        options: ["Mewtwo", "Arceus", "Rayquaza", "Dialga"],
        correctAnswer: 1,
      },
      {
        question: "How many original Pokemon were there in Generation 1?",
        options: ["100", "120", "151", "200"],
        correctAnswer: 2,
      },
      {
        question: "What is Eevee special for in the Pokemon world?",
        options: [
          "It's the strongest Pokemon",
          "It can evolve into many different types",
          "It can talk to humans",
          "It never evolves",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "anime-spy-family",
    title: "Spy x Family Characters Quiz",
    description: "How well do you know the Forger family's secret life?",
    category: "Anime",
    emoji: "🕵️",
    questions: [
      {
        question: "What is Loid Forger's secret identity?",
        options: ["A teacher", "A spy", "A doctor", "A chef"],
        correctAnswer: 1,
      },
      {
        question: "What is Loid's codename?",
        options: ["Shadow", "Twilight", "Nightfall", "Phantom"],
        correctAnswer: 1,
      },
      {
        question: "What secret ability does Anya have?",
        options: [
          "Super strength",
          "She can read minds (telepathy)",
          "She can fly",
          "She can turn invisible",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is Yor Forger's secret job?",
        options: ["A spy", "A detective", "An assassin", "A ninja"],
        correctAnswer: 2,
      },
      {
        question: "What is the name of Anya's school?",
        options: [
          "Royal Academy",
          "Eden Academy",
          "Forger Academy",
          "Westalis School",
        ],
        correctAnswer: 1,
      },
      {
        question: "What reward system does Anya's school use for good behavior?",
        options: ["Gold coins", "Stella Stars", "Merit badges", "Tonitrus Bolts"],
        correctAnswer: 1,
      },
      {
        question: "What is the name of the Forger family's dog?",
        options: ["Buddy", "Bond", "Rex", "Max"],
        correctAnswer: 1,
      },
      {
        question: "What special ability does Bond the dog have?",
        options: [
          "He can talk",
          "He can see the future",
          "He can fly",
          "He has super speed",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is the name of Loid's spy mission?",
        options: [
          "Operation Strix",
          "Operation Forger",
          "Operation Family",
          "Operation Twilight",
        ],
        correctAnswer: 0,
      },
      {
        question: "What is Anya's favorite TV show in the anime?",
        options: [
          "Spy Rangers",
          "Spy Wars",
          "Bondman",
          "Secret Agent Academy",
        ],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "anime-openings",
    title: "Anime Opening Songs: Name That Show!",
    description: "Can you match these iconic anime openings to their shows?",
    category: "Anime",
    emoji: "🎵",
    questions: [
      {
        question: "Which anime features the opening song 'Guren no Yumiya' (Crimson Bow and Arrow)?",
        options: ["Demon Slayer", "Attack on Titan", "Naruto", "Bleach"],
        correctAnswer: 1,
      },
      {
        question: "The song 'We Are!' is the iconic opening for which anime?",
        options: ["Dragon Ball Z", "Fairy Tail", "One Piece", "Naruto"],
        correctAnswer: 2,
      },
      {
        question: "'Gurenge' by LiSA became a massive hit as the opening for which anime?",
        options: ["My Hero Academia", "Jujutsu Kaisen", "Demon Slayer", "Spy x Family"],
        correctAnswer: 2,
      },
      {
        question: "Which anime has 'The Day' by Porno Graffitti as one of its openings?",
        options: ["My Hero Academia", "Haikyuu", "Black Clover", "Fire Force"],
        correctAnswer: 0,
      },
      {
        question: "'Blue Bird' is a beloved opening song from which anime?",
        options: ["One Piece", "Bleach", "Naruto Shippuden", "Dragon Ball Super"],
        correctAnswer: 2,
      },
      {
        question: "The Pokemon anime's first English opening has what famous lyric?",
        options: [
          "Let's go Pokemon!",
          "I wanna be the very best",
          "Pikachu I choose you",
          "Catch them if you can",
        ],
        correctAnswer: 1,
      },
      {
        question: "'Kaikai Kitan' by Eve is the opening for which anime?",
        options: ["Chainsaw Man", "Jujutsu Kaisen", "Tokyo Revengers", "Mob Psycho 100"],
        correctAnswer: 1,
      },
      {
        question: "Which anime features the song 'Cha-La Head-Cha-La'?",
        options: ["Naruto", "One Piece", "Dragon Ball Z", "Sailor Moon"],
        correctAnswer: 2,
      },
      {
        question: "'Mixed Nuts' by Official HIGE DANdism is the opening for which anime?",
        options: ["Spy x Family", "Demon Slayer", "Jujutsu Kaisen", "One Punch Man"],
        correctAnswer: 0,
      },
      {
        question: "Which anime is known for the opening 'Unravel' by TK?",
        options: ["Death Note", "Tokyo Ghoul", "Parasyte", "Psycho-Pass"],
        correctAnswer: 1,
      },
    ],
  },
];
