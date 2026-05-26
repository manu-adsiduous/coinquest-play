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

export const moviesQuizzes: Quiz[] = [
  {
    id: "movies-marvel",
    title: "Marvel Cinematic Universe Trivia",
    description: "Test your knowledge of Earth's mightiest heroes and the MCU!",
    category: "Movies & TV",
    emoji: "🦸‍♂️",
    questions: [
      {
        question: "What is the name of Thor's enchanted hammer?",
        options: ["Stormbreaker", "Mjolnir", "Aegis", "Gungnir"],
        correctAnswer: 1,
      },
      {
        question: "Which Infinity Stone is hidden on the planet Vormir?",
        options: ["Time Stone", "Power Stone", "Soul Stone", "Mind Stone"],
        correctAnswer: 2,
      },
      {
        question: "What is Tony Stark's daughter's name?",
        options: ["Pepper", "Morgan", "Natasha", "Wanda"],
        correctAnswer: 1,
      },
      {
        question: "Which country is Black Panther the king of?",
        options: ["Sokovia", "Madripoor", "Wakanda", "Latveria"],
        correctAnswer: 2,
      },
      {
        question: "What does S.H.I.E.L.D. stand for?",
        options: [
          "Strategic Homeland Intervention, Enforcement and Logistics Division",
          "Super Hero Intelligence and Emergency Logistics Division",
          "Strategic Hazard Intervention Espionage Logistics Directorate",
          "Super Heroic International Enforcement and Law Division",
        ],
        correctAnswer: 0,
      },
      {
        question: "Who is Peter Parker's best friend in the MCU?",
        options: ["Harry Osborn", "Flash Thompson", "Ned Leeds", "Miles Morales"],
        correctAnswer: 2,
      },
      {
        question: "What type of doctor is Stephen Strange?",
        options: ["Heart surgeon", "Neurosurgeon", "Dentist", "General practitioner"],
        correctAnswer: 1,
      },
      {
        question: "How many Infinity Stones are there in total?",
        options: ["4", "5", "6", "8"],
        correctAnswer: 2,
      },
      {
        question: "What is Captain America's shield made of?",
        options: ["Adamantium", "Uru", "Vibranium", "Titanium"],
        correctAnswer: 2,
      },
      {
        question: "Which Avenger can shrink to the size of an ant?",
        options: ["Hawkeye", "Ant-Man", "Vision", "Falcon"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "movies-disney",
    title: "Disney Animated Movies Quiz",
    description: "How well do you know the magical world of Disney animation?",
    category: "Movies & TV",
    emoji: "🏰",
    questions: [
      {
        question: "What is the name of Simba's father in The Lion King?",
        options: ["Scar", "Mufasa", "Zazu", "Rafiki"],
        correctAnswer: 1,
      },
      {
        question: "In Frozen, what is Elsa's magical power?",
        options: ["Fire", "Wind", "Ice and snow", "Water"],
        correctAnswer: 2,
      },
      {
        question: "What does Moana need to return to Te Fiti?",
        options: ["A magic shell", "The heart of Te Fiti", "A golden trident", "A sacred flower"],
        correctAnswer: 1,
      },
      {
        question: "How many brothers does Prince Hans have in Frozen?",
        options: ["10", "12", "8", "15"],
        correctAnswer: 1,
      },
      {
        question: "What kind of animal is Rajah in Aladdin?",
        options: ["Lion", "Panther", "Tiger", "Leopard"],
        correctAnswer: 2,
      },
      {
        question: "In Tangled, how long is Rapunzel's hair?",
        options: ["50 feet", "70 feet", "100 feet", "30 feet"],
        correctAnswer: 1,
      },
      {
        question: "What is the name of the snowman in Frozen?",
        options: ["Sven", "Olaf", "Marshmallow", "Kristoff"],
        correctAnswer: 1,
      },
      {
        question: "In The Little Mermaid, what does Ariel trade to become human?",
        options: ["Her tail", "Her voice", "Her hair", "Her trident"],
        correctAnswer: 1,
      },
      {
        question: "What is Cinderella's fairy godmother's main magic word?",
        options: ["Abracadabra", "Alakazam", "Bibbidi-Bobbidi-Boo", "Hocus Pocus"],
        correctAnswer: 2,
      },
      {
        question: "In Encanto, what is Mirabel's last name?",
        options: ["Castillo", "Madrigal", "Flores", "Rivera"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "movies-harry-potter",
    title: "Harry Potter Wizarding World Quiz",
    description: "Cast your knowledge spell and prove you're a true Potterhead!",
    category: "Movies & TV",
    emoji: "🧙",
    questions: [
      {
        question: "What position does Harry play on the Quidditch team?",
        options: ["Chaser", "Beater", "Keeper", "Seeker"],
        correctAnswer: 3,
      },
      {
        question: "What is the name of Hagrid's three-headed dog?",
        options: ["Fang", "Fluffy", "Norbert", "Buckbeak"],
        correctAnswer: 1,
      },
      {
        question: "Which Hogwarts house is known for its bravery?",
        options: ["Slytherin", "Ravenclaw", "Gryffindor", "Hufflepuff"],
        correctAnswer: 2,
      },
      {
        question: "What is the core of Harry's wand?",
        options: ["Dragon heartstring", "Unicorn hair", "Phoenix feather", "Thestral tail hair"],
        correctAnswer: 2,
      },
      {
        question: "What magical creature guards the vaults at Gringotts?",
        options: ["Trolls", "Dragons", "Giants", "Centaurs"],
        correctAnswer: 1,
      },
      {
        question: "What is the name of the Weasley family's house?",
        options: ["The Leaky Cauldron", "The Burrow", "Grimmauld Place", "Shell Cottage"],
        correctAnswer: 1,
      },
      {
        question: "Which spell is used to disarm an opponent?",
        options: ["Stupefy", "Expelliarmus", "Lumos", "Accio"],
        correctAnswer: 1,
      },
      {
        question: "What does the Mirror of Erised show?",
        options: [
          "The future",
          "Your deepest desire",
          "Your worst fear",
          "Hidden treasure",
        ],
        correctAnswer: 1,
      },
      {
        question: "How many Horcruxes did Voldemort create intentionally?",
        options: ["5", "6", "7", "8"],
        correctAnswer: 1,
      },
      {
        question: "What form does Hermione's Patronus take?",
        options: ["A cat", "An otter", "A hare", "A doe"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "movies-star-wars",
    title: "Star Wars Galaxy Trivia",
    description: "May the Force be with you as you tackle these Star Wars questions!",
    category: "Movies & TV",
    emoji: "⭐",
    questions: [
      {
        question: "What color is Mace Windu's lightsaber?",
        options: ["Blue", "Green", "Red", "Purple"],
        correctAnswer: 3,
      },
      {
        question: "What is Baby Yoda's real name?",
        options: ["Yaddle", "Grogu", "Yodin", "Minch"],
        correctAnswer: 1,
      },
      {
        question: "What planet is Luke Skywalker from?",
        options: ["Naboo", "Coruscant", "Tatooine", "Endor"],
        correctAnswer: 2,
      },
      {
        question: "Who is Anakin Skywalker's Padawan?",
        options: ["Obi-Wan Kenobi", "Ahsoka Tano", "Mace Windu", "Padme Amidala"],
        correctAnswer: 1,
      },
      {
        question: "What is the name of Han Solo's ship?",
        options: ["X-Wing", "TIE Fighter", "Star Destroyer", "Millennium Falcon"],
        correctAnswer: 3,
      },
      {
        question: "Which droid has a red arm in The Force Awakens?",
        options: ["R2-D2", "BB-8", "C-3PO", "K-2SO"],
        correctAnswer: 2,
      },
      {
        question: "What species is Chewbacca?",
        options: ["Ewok", "Wookiee", "Gungan", "Twi'lek"],
        correctAnswer: 1,
      },
      {
        question: "Who said 'Do or do not, there is no try'?",
        options: ["Obi-Wan Kenobi", "Luke Skywalker", "Yoda", "Darth Vader"],
        correctAnswer: 2,
      },
      {
        question: "What is the weapon of choice for a Jedi?",
        options: ["Blaster", "Bowcaster", "Lightsaber", "Vibroblade"],
        correctAnswer: 2,
      },
      {
        question: "What is Kylo Ren's real name?",
        options: ["Anakin Solo", "Ben Solo", "Luke Solo", "Jacen Solo"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "movies-spongebob",
    title: "SpongeBob SquarePants Expert Quiz",
    description: "Are you ready, kids? Test your Bikini Bottom knowledge!",
    category: "Movies & TV",
    emoji: "🧽",
    questions: [
      {
        question: "What is the name of the restaurant where SpongeBob works?",
        options: ["The Chum Bucket", "The Krusty Krab", "Weenie Hut Jr's", "The Salty Spitoon"],
        correctAnswer: 1,
      },
      {
        question: "What is SpongeBob's pet snail's name?",
        options: ["Sheldon", "Larry", "Gary", "Jerry"],
        correctAnswer: 2,
      },
      {
        question: "What instrument does Squidward play?",
        options: ["Trumpet", "Flute", "Clarinet", "Trombone"],
        correctAnswer: 2,
      },
      {
        question: "What is Patrick Star's favorite thing to do?",
        options: ["Cook", "Exercise", "Sleep", "Read"],
        correctAnswer: 2,
      },
      {
        question: "What is the secret formula ingredient that Plankton wants to steal?",
        options: [
          "The Krabby Patty secret formula",
          "Special seaweed sauce",
          "Neptune's trident seasoning",
          "Magic coral dust",
        ],
        correctAnswer: 0,
      },
      {
        question: "Where does SpongeBob live?",
        options: ["A rock", "A tiki head", "A pineapple under the sea", "An anchor"],
        correctAnswer: 2,
      },
      {
        question: "What is Sandy Cheeks?",
        options: ["A fish", "A squirrel", "A starfish", "A crab"],
        correctAnswer: 1,
      },
      {
        question: "What color is SpongeBob's tie?",
        options: ["Blue", "Green", "Red", "Yellow"],
        correctAnswer: 2,
      },
      {
        question: "Who is SpongeBob's driving teacher?",
        options: ["Mr. Krabs", "Mrs. Puff", "Squidward", "Larry the Lobster"],
        correctAnswer: 1,
      },
      {
        question: "What does SpongeBob's house look like?",
        options: ["A mushroom", "A pineapple", "An apple", "A coconut"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "movies-stranger-things",
    title: "Stranger Things Upside Down Quiz",
    description: "Venture into the Upside Down and test your Stranger Things IQ!",
    category: "Movies & TV",
    emoji: "🔦",
    questions: [
      {
        question: "What is Eleven's favorite food?",
        options: ["Pizza", "Eggo waffles", "Ice cream", "French fries"],
        correctAnswer: 1,
      },
      {
        question: "In what fictional town does Stranger Things take place?",
        options: ["Riverdale", "Hawkins", "Derry", "Sunnydale"],
        correctAnswer: 1,
      },
      {
        question: "What board game do the boys play at the start of Season 1?",
        options: ["Risk", "Monopoly", "Dungeons & Dragons", "Chess"],
        correctAnswer: 2,
      },
      {
        question: "What is the name of the alternate dimension in the show?",
        options: ["The Shadow Realm", "The Upside Down", "The Dark World", "The Void"],
        correctAnswer: 1,
      },
      {
        question: "What is Dustin's pet from Season 2 named?",
        options: ["Dart", "Mews", "Chester", "Tews"],
        correctAnswer: 0,
      },
      {
        question: "Which character works at Scoops Ahoy ice cream shop?",
        options: ["Jonathan", "Steve", "Billy", "Lucas"],
        correctAnswer: 1,
      },
      {
        question: "What is Eleven's real name?",
        options: ["Jane Hopper", "Sara Brenner", "Elle Wheeler", "Terry Ives"],
        correctAnswer: 0,
      },
      {
        question: "What song does Max use to escape Vecna?",
        options: [
          "Thriller by Michael Jackson",
          "Running Up That Hill by Kate Bush",
          "Never Ending Story by Limahl",
          "Material Girl by Madonna",
        ],
        correctAnswer: 1,
      },
      {
        question: "Who is the chief of police in Hawkins?",
        options: ["Chief Powell", "Chief Hopper", "Chief Callahan", "Chief Owens"],
        correctAnswer: 1,
      },
      {
        question: "What power does Eleven have?",
        options: ["Super speed", "Invisibility", "Telekinesis", "Time travel"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "movies-wednesday",
    title: "Wednesday Addams Trivia",
    description: "Snap snap! How much do you know about Wednesday Addams?",
    category: "Movies & TV",
    emoji: "🖤",
    questions: [
      {
        question: "What is the name of Wednesday's school?",
        options: ["Hogwarts", "Nevermore Academy", "Xavier's School", "Blackwood Academy"],
        correctAnswer: 1,
      },
      {
        question: "What is Wednesday's supernatural ability?",
        options: ["Telekinesis", "Psychic visions", "Mind reading", "Shapeshifting"],
        correctAnswer: 1,
      },
      {
        question: "What is the name of Wednesday's sentient hand companion?",
        options: ["Fingers", "Thing", "Palm", "Handy"],
        correctAnswer: 1,
      },
      {
        question: "What instrument does Wednesday play?",
        options: ["Violin", "Piano", "Cello", "Harp"],
        correctAnswer: 2,
      },
      {
        question: "What is Wednesday's brother's name?",
        options: ["Gomez", "Lurch", "Pugsley", "Fester"],
        correctAnswer: 2,
      },
      {
        question: "Who is Wednesday's colorful roommate at Nevermore?",
        options: ["Bianca", "Enid", "Yoko", "Divina"],
        correctAnswer: 1,
      },
      {
        question: "What type of creature is Wednesday's roommate?",
        options: ["Vampire", "Siren", "Werewolf", "Gorgon"],
        correctAnswer: 2,
      },
      {
        question: "What is the name of the town near Nevermore Academy?",
        options: ["Riverdale", "Sleepy Hollow", "Jericho", "Salem"],
        correctAnswer: 2,
      },
      {
        question: "What is Wednesday's mother's first name?",
        options: ["Ophelia", "Morticia", "Elvira", "Belladonna"],
        correctAnswer: 1,
      },
      {
        question: "What dance move did Wednesday perform that went viral?",
        options: [
          "The Moonwalk",
          "The Robot",
          "The Wednesday Dance (Goo Goo Muck)",
          "The Thriller Dance",
        ],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "movies-digital-circus",
    title: "The Amazing Digital Circus Quiz",
    description: "Welcome to the circus! Test your knowledge of this digital world!",
    category: "Movies & TV",
    emoji: "🎪",
    questions: [
      {
        question: "What is the main character's name in The Amazing Digital Circus?",
        options: ["Jax", "Pomni", "Ragatha", "Caine"],
        correctAnswer: 1,
      },
      {
        question: "Who is the ringmaster of the Digital Circus?",
        options: ["Jax", "Kinger", "Caine", "Gangle"],
        correctAnswer: 2,
      },
      {
        question: "What type of character is Jax?",
        options: ["A clown", "A rabbit", "A ragdoll", "A chess piece"],
        correctAnswer: 1,
      },
      {
        question: "What happens to characters who lose their minds in the circus?",
        options: [
          "They disappear",
          "They become abstracted",
          "They turn into NPCs",
          "They restart",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is Ragatha designed to look like?",
        options: ["A puppet", "A ragdoll", "A clown", "A marionette"],
        correctAnswer: 1,
      },
      {
        question: "What shape is Caine's head?",
        options: [
          "A circle",
          "A triangle",
          "A set of teeth with eyeballs",
          "A square",
        ],
        correctAnswer: 2,
      },
      {
        question: "What is the name of Caine's assistant?",
        options: ["Pomni", "Bubble", "Zooble", "Gangle"],
        correctAnswer: 1,
      },
      {
        question: "What type of character is Kinger?",
        options: ["A card", "A chess king piece", "A crown", "A royal guard"],
        correctAnswer: 1,
      },
      {
        question: "What does Pomni want most in the Digital Circus?",
        options: ["To be the star", "To find the exit", "To make friends", "To defeat Caine"],
        correctAnswer: 1,
      },
      {
        question: "Where is The Amazing Digital Circus set?",
        options: [
          "A real circus",
          "A dream world",
          "A virtual reality world",
          "Outer space",
        ],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "movies-pixar",
    title: "Pixar Movies Characters & Quotes",
    description: "To infinity and beyond! How well do you know Pixar movies?",
    category: "Movies & TV",
    emoji: "🎬",
    questions: [
      {
        question: "In Finding Nemo, what type of fish is Nemo?",
        options: ["Blue tang", "Clownfish", "Angelfish", "Goldfish"],
        correctAnswer: 1,
      },
      {
        question: "What is the name of the rat who loves cooking in Ratatouille?",
        options: ["Emile", "Linguini", "Remy", "Alfredo"],
        correctAnswer: 2,
      },
      {
        question: "In Inside Out, which emotion is yellow and always cheerful?",
        options: ["Disgust", "Anger", "Joy", "Fear"],
        correctAnswer: 2,
      },
      {
        question: "What is Buzz Lightyear's famous catchphrase?",
        options: [
          "You've got a friend in me!",
          "To infinity and beyond!",
          "Reach for the sky!",
          "I am Buzz Lightyear!",
        ],
        correctAnswer: 1,
      },
      {
        question: "In Up, how does Carl's house fly?",
        options: ["A rocket", "A giant fan", "Thousands of balloons", "Magic dust"],
        correctAnswer: 2,
      },
      {
        question: "What does WALL-E stand for?",
        options: [
          "Waste Allocation Load Lifter Earth-Class",
          "World Automated Litter Lifting Entity",
          "Worldwide Automated Land Leveler Engine",
          "Waste And Litter Lifting Earthbot",
        ],
        correctAnswer: 0,
      },
      {
        question: "In Coco, what must Miguel do to return to the land of the living?",
        options: [
          "Find a magic guitar",
          "Get a blessing from a deceased family member",
          "Defeat Ernesto de la Cruz",
          "Sing a special song",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which Pixar movie features a superhero family?",
        options: ["Brave", "The Incredibles", "Cars", "Lightyear"],
        correctAnswer: 1,
      },
      {
        question: "In Monsters, Inc., what powers the city of Monstropolis?",
        options: ["Electricity", "Screams from children", "Monster energy", "Solar power"],
        correctAnswer: 1,
      },
      {
        question: "What new emotion appears in Inside Out 2?",
        options: ["Jealousy", "Anxiety", "Boredom", "Nostalgia"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "movies-sonic",
    title: "Sonic the Hedgehog Movie & Games Quiz",
    description: "Gotta go fast! Test your Sonic knowledge at top speed!",
    category: "Movies & TV",
    emoji: "🦔",
    questions: [
      {
        question: "What color is Sonic the Hedgehog?",
        options: ["Red", "Green", "Blue", "Yellow"],
        correctAnswer: 2,
      },
      {
        question: "What does Sonic collect in the games?",
        options: ["Coins", "Stars", "Rings", "Gems"],
        correctAnswer: 2,
      },
      {
        question: "What is the name of Sonic's two-tailed fox friend?",
        options: ["Knuckles", "Shadow", "Tails", "Silver"],
        correctAnswer: 2,
      },
      {
        question: "Who is Sonic's main villain?",
        options: ["Dr. Eggman", "Dr. Doom", "Dr. Strange", "Dr. Evil"],
        correctAnswer: 0,
      },
      {
        question: "What is Knuckles the Echidna's main role?",
        options: [
          "Speed runner",
          "Guardian of the Master Emerald",
          "Sonic's sidekick",
          "A treasure hunter",
        ],
        correctAnswer: 1,
      },
      {
        question: "In the Sonic movies, who plays Dr. Robotnik?",
        options: ["Jim Carrey", "Jack Black", "Ryan Reynolds", "Will Ferrell"],
        correctAnswer: 0,
      },
      {
        question: "What are the powerful gems in the Sonic universe called?",
        options: ["Power Stars", "Chaos Emeralds", "Sol Crystals", "Infinity Stones"],
        correctAnswer: 1,
      },
      {
        question: "What is Shadow the Hedgehog's main color?",
        options: ["Blue", "Silver", "Black and red", "Purple"],
        correctAnswer: 2,
      },
      {
        question: "What is Sonic's signature move?",
        options: ["Hadouken", "Spin Dash", "Falcon Punch", "Power Slide"],
        correctAnswer: 1,
      },
      {
        question: "In Sonic the Hedgehog 2 (movie), which new character appears?",
        options: ["Shadow", "Silver", "Knuckles", "Amy"],
        correctAnswer: 2,
      },
    ],
  },
];
