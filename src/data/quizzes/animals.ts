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

export const animalsQuizzes: Quiz[] = [
  {
    id: "animals-cute",
    title: "Cute Animals: Can You Identify Them?",
    description: "Test your knowledge of the world's most adorable animals!",
    category: "Animals",
    emoji: "🐰",
    questions: [
      {
        question: "Which animal is known for holding hands while sleeping so they don't drift apart?",
        options: ["Penguins", "Sea otters", "Dolphins", "Seals"],
        correctAnswer: 1,
      },
      {
        question: "What is a baby rabbit called?",
        options: ["Pup", "Kit", "Cub", "Foal"],
        correctAnswer: 1,
      },
      {
        question: "Which cute animal has fingerprints nearly identical to humans?",
        options: ["Raccoons", "Red pandas", "Koalas", "Sloths"],
        correctAnswer: 2,
      },
      {
        question: "What animal is famous for its smile-like facial expression?",
        options: ["Quokka", "Hedgehog", "Hamster", "Chinchilla"],
        correctAnswer: 0,
      },
      {
        question: "Which fluffy animal can jump up to 6 feet high despite its small size?",
        options: ["Guinea pig", "Bunny rabbit", "Arctic fox", "Fennec fox"],
        correctAnswer: 3,
      },
      {
        question: "What is the smallest breed of dog in the world?",
        options: ["Pomeranian", "Yorkshire Terrier", "Chihuahua", "Maltese"],
        correctAnswer: 2,
      },
      {
        question: "Which animal sleeps up to 22 hours a day?",
        options: ["Cat", "Sloth", "Koala", "Hamster"],
        correctAnswer: 2,
      },
      {
        question: "What type of animal is a sugar glider?",
        options: ["Rodent", "Bird", "Marsupial", "Reptile"],
        correctAnswer: 2,
      },
      {
        question: "Which cute sea creature has three hearts?",
        options: ["Seahorse", "Octopus", "Jellyfish", "Starfish"],
        correctAnswer: 1,
      },
      {
        question: "What color is a baby flamingo when it's born?",
        options: ["Pink", "White or gray", "Orange", "Yellow"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "animals-dangerous",
    title: "Dangerous Animals Quiz",
    description: "How much do you know about the world's most dangerous creatures?",
    category: "Animals",
    emoji: "🦈",
    questions: [
      {
        question: "Which animal kills the most humans every year?",
        options: ["Shark", "Snake", "Mosquito", "Lion"],
        correctAnswer: 2,
      },
      {
        question: "What is the most venomous snake in the world?",
        options: ["King Cobra", "Black Mamba", "Inland Taipan", "Rattlesnake"],
        correctAnswer: 2,
      },
      {
        question: "Which tiny frog is one of the most poisonous animals on Earth?",
        options: ["Tree frog", "Poison dart frog", "Bull frog", "Glass frog"],
        correctAnswer: 1,
      },
      {
        question: "How many teeth can a great white shark have at one time?",
        options: ["About 50", "About 100", "About 300", "About 1,000"],
        correctAnswer: 2,
      },
      {
        question: "Which jellyfish is considered the most dangerous in the ocean?",
        options: ["Moon jellyfish", "Box jellyfish", "Lion's mane jellyfish", "Portuguese man o' war"],
        correctAnswer: 1,
      },
      {
        question: "What dangerous animal is known as the 'river horse'?",
        options: ["Crocodile", "Hippo", "Alligator", "Water buffalo"],
        correctAnswer: 1,
      },
      {
        question: "Which spider's bite can be dangerous to humans and has a red hourglass marking?",
        options: ["Tarantula", "Wolf spider", "Black widow", "Brown recluse"],
        correctAnswer: 2,
      },
      {
        question: "What is the largest predatory fish in the world?",
        options: ["Whale shark", "Great white shark", "Tiger shark", "Hammerhead shark"],
        correctAnswer: 1,
      },
      {
        question: "Which bird is known for being aggressive and has claws like dinosaurs?",
        options: ["Eagle", "Ostrich", "Cassowary", "Vulture"],
        correctAnswer: 2,
      },
      {
        question: "The Komodo dragon kills prey using what method?",
        options: ["Constriction", "Venom and bacteria in its bite", "Electric shock", "Spraying acid"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "animals-dogs",
    title: "Dog Breeds Knowledge Challenge",
    description: "Are you a true dog lover? Test your breed knowledge!",
    category: "Animals",
    emoji: "🐕",
    questions: [
      {
        question: "Which dog breed is the smallest recognized by the American Kennel Club?",
        options: ["Chihuahua", "Toy Poodle", "Papillon", "Yorkshire Terrier"],
        correctAnswer: 0,
      },
      {
        question: "What breed of dog is Scooby-Doo?",
        options: ["Bloodhound", "Great Dane", "Dalmatian", "Labrador"],
        correctAnswer: 1,
      },
      {
        question: "Which dog breed is known for its blue-black tongue?",
        options: ["Akita", "Shar-Pei", "Chow Chow", "Shiba Inu"],
        correctAnswer: 2,
      },
      {
        question: "What is the fastest dog breed?",
        options: ["Whippet", "Greyhound", "Saluki", "German Shepherd"],
        correctAnswer: 1,
      },
      {
        question: "Which breed was originally bred to rescue people in the Swiss Alps?",
        options: ["Bernese Mountain Dog", "Saint Bernard", "Husky", "Newfoundland"],
        correctAnswer: 1,
      },
      {
        question: "What breed is often called a 'wiener dog'?",
        options: ["Corgi", "Basset Hound", "Dachshund", "Beagle"],
        correctAnswer: 2,
      },
      {
        question: "Which dog breed has a natural 'mohawk' ridge of fur on its back?",
        options: ["Basenji", "Rhodesian Ridgeback", "Vizsla", "Weimaraner"],
        correctAnswer: 1,
      },
      {
        question: "What is the most popular dog breed in the United States?",
        options: ["Golden Retriever", "German Shepherd", "French Bulldog", "Labrador Retriever"],
        correctAnswer: 2,
      },
      {
        question: "Which dog breed is known for being unable to bark, making a yodel-like sound instead?",
        options: ["Basenji", "Shiba Inu", "Bichon Frise", "Lhasa Apso"],
        correctAnswer: 0,
      },
      {
        question: "What breed of dog is known for its wrinkly, loose skin?",
        options: ["Bulldog", "Pug", "Shar-Pei", "Boxer"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "animals-cats",
    title: "Cat Facts & Breeds Trivia",
    description: "Think you know everything about cats? Prove it!",
    category: "Animals",
    emoji: "🐱",
    questions: [
      {
        question: "How many hours a day does the average cat sleep?",
        options: ["6-8 hours", "8-10 hours", "12-16 hours", "18-20 hours"],
        correctAnswer: 2,
      },
      {
        question: "Which cat breed is known for having no fur?",
        options: ["Persian", "Siamese", "Sphynx", "Bengal"],
        correctAnswer: 2,
      },
      {
        question: "What is a group of cats called?",
        options: ["A pack", "A clowder", "A herd", "A flock"],
        correctAnswer: 1,
      },
      {
        question: "Which big cat is the largest in the world?",
        options: ["Lion", "Tiger", "Jaguar", "Leopard"],
        correctAnswer: 1,
      },
      {
        question: "What is special about a cat's collarbone?",
        options: [
          "It's extra thick",
          "It's not attached to other bones",
          "They don't have one",
          "It glows under UV light",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which breed of cat is famous for its folded ears?",
        options: ["British Shorthair", "Scottish Fold", "Maine Coon", "Ragdoll"],
        correctAnswer: 1,
      },
      {
        question: "How many toes does a normal cat have in total?",
        options: ["16", "18", "20", "22"],
        correctAnswer: 1,
      },
      {
        question: "What is the most popular cat breed in the world?",
        options: ["Siamese", "Persian", "Ragdoll", "Maine Coon"],
        correctAnswer: 2,
      },
      {
        question: "Cats can rotate their ears how many degrees?",
        options: ["90 degrees", "180 degrees", "270 degrees", "360 degrees"],
        correctAnswer: 1,
      },
      {
        question: "Which ancient civilization worshipped cats as sacred animals?",
        options: ["Greeks", "Romans", "Egyptians", "Vikings"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "animals-rainforest",
    title: "Rainforest Animals & Plants Quiz",
    description: "Explore the amazing creatures and plants of the rainforest!",
    category: "Animals",
    emoji: "🌴",
    questions: [
      {
        question: "What percentage of the world's animal species live in rainforests?",
        options: ["About 10%", "About 25%", "About 50%", "About 75%"],
        correctAnswer: 2,
      },
      {
        question: "Which rainforest animal is the loudest land animal?",
        options: ["Gorilla", "Howler monkey", "Jaguar", "Elephant"],
        correctAnswer: 1,
      },
      {
        question: "What is the largest rainforest in the world?",
        options: ["Congo Rainforest", "Daintree Rainforest", "Amazon Rainforest", "Southeast Asian Rainforest"],
        correctAnswer: 2,
      },
      {
        question: "Which colorful bird has an enormous beak relative to its body?",
        options: ["Parrot", "Macaw", "Toucan", "Hummingbird"],
        correctAnswer: 2,
      },
      {
        question: "What rainforest reptile can change its color to blend in with surroundings?",
        options: ["Iguana", "Chameleon", "Gecko", "Tree snake"],
        correctAnswer: 1,
      },
      {
        question: "Which is the largest snake found in the Amazon rainforest?",
        options: ["Python", "Boa constrictor", "Anaconda", "Cobra"],
        correctAnswer: 2,
      },
      {
        question: "What giant flower found in rainforests smells like rotting meat?",
        options: ["Orchid", "Rafflesia", "Bird of paradise", "Venus flytrap"],
        correctAnswer: 1,
      },
      {
        question: "Which tiny, brightly colored frog warns predators with its vivid skin?",
        options: ["Tree frog", "Poison dart frog", "Glass frog", "Tomato frog"],
        correctAnswer: 1,
      },
      {
        question: "What is the name for the top layer of the rainforest where most animals live?",
        options: ["Understory", "Forest floor", "Canopy", "Emergent layer"],
        correctAnswer: 2,
      },
      {
        question: "Which insect in the rainforest can carry objects 50 times its own weight?",
        options: ["Beetle", "Leafcutter ant", "Butterfly", "Grasshopper"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "animals-babies",
    title: "Baby Animals: What Are They Called?",
    description: "Can you name what baby animals are called?",
    category: "Animals",
    emoji: "🐣",
    questions: [
      {
        question: "What is a baby kangaroo called?",
        options: ["Cub", "Pup", "Joey", "Kit"],
        correctAnswer: 2,
      },
      {
        question: "What is a baby owl called?",
        options: ["Chick", "Owlet", "Fledgling", "Nestling"],
        correctAnswer: 1,
      },
      {
        question: "What is a baby goat called?",
        options: ["Lamb", "Calf", "Kid", "Foal"],
        correctAnswer: 2,
      },
      {
        question: "What is a baby swan called?",
        options: ["Duckling", "Chick", "Cygnet", "Gosling"],
        correctAnswer: 2,
      },
      {
        question: "What is a baby frog called?",
        options: ["Tadpole", "Froglet", "Polliwog", "All of the above at different stages"],
        correctAnswer: 3,
      },
      {
        question: "What is a baby deer called?",
        options: ["Calf", "Fawn", "Kid", "Lamb"],
        correctAnswer: 1,
      },
      {
        question: "What is a baby bear called?",
        options: ["Pup", "Kit", "Cub", "Whelp"],
        correctAnswer: 2,
      },
      {
        question: "What is a baby horse called?",
        options: ["Colt", "Pony", "Foal", "Stallion"],
        correctAnswer: 2,
      },
      {
        question: "What is a baby shark called?",
        options: ["Fry", "Pup", "Cub", "Sharklet"],
        correctAnswer: 1,
      },
      {
        question: "What is a baby eagle called?",
        options: ["Eaglet", "Fledgling", "Chick", "Nestling"],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: "animals-mythical",
    title: "Mythical Creatures & Legends Quiz",
    description: "How well do you know the legendary creatures of myth and folklore?",
    category: "Animals",
    emoji: "🐲",
    questions: [
      {
        question: "In Greek mythology, what creature has the body of a lion and the head of a human?",
        options: ["Griffin", "Sphinx", "Minotaur", "Centaur"],
        correctAnswer: 1,
      },
      {
        question: "What mythical bird bursts into flames and is reborn from its own ashes?",
        options: ["Thunderbird", "Roc", "Phoenix", "Griffin"],
        correctAnswer: 2,
      },
      {
        question: "What is a creature that is half human and half horse called?",
        options: ["Satyr", "Centaur", "Minotaur", "Faun"],
        correctAnswer: 1,
      },
      {
        question: "In Scottish legend, what creature is said to live in Loch Ness?",
        options: ["Kraken", "Leviathan", "Sea serpent", "Nessie (Loch Ness Monster)"],
        correctAnswer: 3,
      },
      {
        question: "What mythical creature turns people to stone if they look into its eyes?",
        options: ["Basilisk", "Medusa", "Cockatrice", "Gorgon"],
        correctAnswer: 1,
      },
      {
        question: "A unicorn is typically depicted as a horse with what feature?",
        options: ["Wings", "A single horn", "A fish tail", "Fire breath"],
        correctAnswer: 1,
      },
      {
        question: "What is the name of the giant sea monster in Norse mythology?",
        options: ["Hydra", "Leviathan", "Kraken", "Charybdis"],
        correctAnswer: 2,
      },
      {
        question: "In Chinese mythology, what creature is a symbol of good luck and power?",
        options: ["Phoenix", "Dragon", "Tiger", "Tortoise"],
        correctAnswer: 1,
      },
      {
        question: "What legendary creature is said to roam the forests of the Pacific Northwest?",
        options: ["Yeti", "Chupacabra", "Bigfoot", "Mothman"],
        correctAnswer: 2,
      },
      {
        question: "What mythical creature has the head of an eagle and the body of a lion?",
        options: ["Hippogriff", "Griffin", "Manticore", "Chimera"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "animals-fastest",
    title: "Fastest Animals on Earth Quiz",
    description: "Do you know which animals are the speed champions of the natural world?",
    category: "Animals",
    emoji: "🐆",
    questions: [
      {
        question: "What is the fastest land animal in the world?",
        options: ["Lion", "Cheetah", "Gazelle", "Greyhound"],
        correctAnswer: 1,
      },
      {
        question: "What is the fastest bird in the world when diving?",
        options: ["Bald eagle", "Peregrine falcon", "Swift", "Hawk"],
        correctAnswer: 1,
      },
      {
        question: "How fast can a cheetah run at top speed?",
        options: ["50 mph", "60 mph", "70 mph", "80 mph"],
        correctAnswer: 2,
      },
      {
        question: "What is the fastest fish in the ocean?",
        options: ["Swordfish", "Sailfish", "Tuna", "Marlin"],
        correctAnswer: 1,
      },
      {
        question: "Which insect is the fastest flyer?",
        options: ["Bee", "Dragonfly", "Horsefly", "Wasp"],
        correctAnswer: 1,
      },
      {
        question: "How fast can an ostrich run?",
        options: ["25 mph", "35 mph", "45 mph", "55 mph"],
        correctAnswer: 2,
      },
      {
        question: "Which of these animals can reach speeds of 60 mph in the water?",
        options: ["Dolphin", "Sailfish", "Orca", "Sea lion"],
        correctAnswer: 1,
      },
      {
        question: "What is the fastest snake in the world?",
        options: ["King cobra", "Black mamba", "Rattlesnake", "Sidewinder"],
        correctAnswer: 1,
      },
      {
        question: "Which bear species can surprisingly run up to 35 mph?",
        options: ["Polar bear", "Grizzly bear", "Black bear", "All of the above"],
        correctAnswer: 3,
      },
      {
        question: "The pronghorn antelope is the second fastest land animal. Where does it live?",
        options: ["Africa", "Asia", "North America", "South America"],
        correctAnswer: 2,
      },
    ],
  },
];
