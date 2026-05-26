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

export const triviaQuizzes: Quiz[] = [
  {
    id: "trivia-records",
    title: "World Records: Believe It or Not!",
    description: "Test your knowledge of the most amazing world records!",
    category: "Trivia",
    emoji: "🏆",
    questions: [
      {
        question: "What is the world record for the most hot dogs eaten in 10 minutes?",
        options: ["42", "56", "76", "98"],
        correctAnswer: 2,
      },
      {
        question: "What is the tallest building in the world as of 2024?",
        options: ["Shanghai Tower", "Burj Khalifa", "One World Trade Center", "Makkah Royal Clock Tower"],
        correctAnswer: 1,
      },
      {
        question: "What is the longest river in the world?",
        options: ["Amazon", "Mississippi", "Nile", "Yangtze"],
        correctAnswer: 2,
      },
      {
        question: "Who holds the record for the most Olympic gold medals?",
        options: ["Usain Bolt", "Michael Phelps", "Carl Lewis", "Simone Biles"],
        correctAnswer: 1,
      },
      {
        question: "What is the record for the longest fingernails ever grown?",
        options: ["About 5 feet total", "About 10 feet total", "About 20 feet total", "About 30 feet total"],
        correctAnswer: 3,
      },
      {
        question: "What is the fastest land speed record set by a car?",
        options: ["500 mph", "600 mph", "763 mph", "900 mph"],
        correctAnswer: 2,
      },
      {
        question: "What is the world's largest pizza ever made measured by diameter?",
        options: ["About 50 feet", "About 100 feet", "About 130 feet", "About 200 feet"],
        correctAnswer: 2,
      },
      {
        question: "How old was the oldest person ever recorded to have lived?",
        options: ["112 years", "116 years", "122 years", "128 years"],
        correctAnswer: 2,
      },
      {
        question: "What is the record for most people doing jumping jacks simultaneously?",
        options: ["5,000", "20,000", "50,000", "Over 100,000"],
        correctAnswer: 2,
      },
      {
        question: "What is the deepest point in the ocean?",
        options: ["Mariana Trench", "Tonga Trench", "Java Trench", "Puerto Rico Trench"],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: "trivia-flags",
    title: "Flags of the World Challenge",
    description: "Can you identify countries by their flags and flag facts?",
    category: "Trivia",
    emoji: "🏳️",
    questions: [
      {
        question: "Which country's flag features a maple leaf?",
        options: ["United States", "Canada", "Australia", "New Zealand"],
        correctAnswer: 1,
      },
      {
        question: "What two colors make up the flag of Japan?",
        options: ["Red and blue", "White and red", "White and blue", "Red and yellow"],
        correctAnswer: 1,
      },
      {
        question: "Which country has a dragon on its flag?",
        options: ["China", "Japan", "Wales", "Vietnam"],
        correctAnswer: 2,
      },
      {
        question: "The flag of France has three vertical stripes. What are the colors from left to right?",
        options: [
          "Red, white, blue",
          "Blue, white, red",
          "White, blue, red",
          "Blue, red, white",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which is the only country with a non-rectangular flag?",
        options: ["Bhutan", "Nepal", "Switzerland", "Vatican City"],
        correctAnswer: 1,
      },
      {
        question: "What is the color of the circle on the flag of Bangladesh?",
        options: ["Yellow", "White", "Red", "Green"],
        correctAnswer: 2,
      },
      {
        question: "Which country's flag has a crescent moon and star on a red background?",
        options: ["Pakistan", "Turkey", "Malaysia", "Tunisia"],
        correctAnswer: 1,
      },
      {
        question: "The 'Union Jack' is the flag of which country?",
        options: ["Australia", "United Kingdom", "United States", "South Africa"],
        correctAnswer: 1,
      },
      {
        question: "Which country's flag features an eagle holding a snake?",
        options: ["Spain", "Mexico", "Albania", "Egypt"],
        correctAnswer: 1,
      },
      {
        question: "How many stars are on the flag of the United States?",
        options: ["48", "50", "51", "52"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "trivia-landmarks",
    title: "Famous Landmarks Around the World",
    description: "Travel the world and test your knowledge of iconic landmarks!",
    category: "Trivia",
    emoji: "🗽",
    questions: [
      {
        question: "In which city would you find the Eiffel Tower?",
        options: ["London", "Rome", "Paris", "Berlin"],
        correctAnswer: 2,
      },
      {
        question: "The Great Wall of China is approximately how long?",
        options: ["1,000 miles", "5,500 miles", "13,000 miles", "20,000 miles"],
        correctAnswer: 2,
      },
      {
        question: "Which country is home to Machu Picchu?",
        options: ["Mexico", "Peru", "Colombia", "Chile"],
        correctAnswer: 1,
      },
      {
        question: "The Statue of Liberty was a gift from which country?",
        options: ["England", "Spain", "France", "Germany"],
        correctAnswer: 2,
      },
      {
        question: "In which country would you find the ancient city of Petra?",
        options: ["Egypt", "Jordan", "Iraq", "Syria"],
        correctAnswer: 1,
      },
      {
        question: "What is the name of the famous clock tower in London?",
        options: ["Tower of London", "Big Ben", "Westminster Abbey", "The Shard"],
        correctAnswer: 1,
      },
      {
        question: "Which landmark in India was built as a monument of love?",
        options: ["Red Fort", "Taj Mahal", "Lotus Temple", "Gateway of India"],
        correctAnswer: 1,
      },
      {
        question: "On which continent would you find the Great Pyramid of Giza?",
        options: ["Asia", "South America", "Africa", "Europe"],
        correctAnswer: 2,
      },
      {
        question: "The Colosseum is a famous ancient arena located in which city?",
        options: ["Athens", "Cairo", "Rome", "Istanbul"],
        correctAnswer: 2,
      },
      {
        question: "Mount Rushmore features the faces of how many US presidents?",
        options: ["2", "3", "4", "5"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "trivia-food",
    title: "Food Around the World Quiz",
    description: "How well do you know foods and dishes from different countries?",
    category: "Trivia",
    emoji: "🍜",
    questions: [
      {
        question: "Which country is sushi originally from?",
        options: ["China", "Japan", "Thailand", "South Korea"],
        correctAnswer: 1,
      },
      {
        question: "What is the main ingredient in guacamole?",
        options: ["Tomato", "Pepper", "Avocado", "Onion"],
        correctAnswer: 2,
      },
      {
        question: "Which Italian dish is made of wide, flat pasta layered with sauce and cheese?",
        options: ["Spaghetti", "Ravioli", "Lasagna", "Penne"],
        correctAnswer: 2,
      },
      {
        question: "What country are croissants most associated with?",
        options: ["Italy", "France", "Austria", "Belgium"],
        correctAnswer: 1,
      },
      {
        question: "Which spice gives curry its yellow color?",
        options: ["Paprika", "Saffron", "Turmeric", "Cumin"],
        correctAnswer: 2,
      },
      {
        question: "What is the most eaten food in the world?",
        options: ["Bread", "Rice", "Potatoes", "Corn"],
        correctAnswer: 1,
      },
      {
        question: "Which fruit is known as the 'king of fruits' in Southeast Asia?",
        options: ["Mango", "Jackfruit", "Durian", "Papaya"],
        correctAnswer: 2,
      },
      {
        question: "What country is paella originally from?",
        options: ["Mexico", "Portugal", "Spain", "Italy"],
        correctAnswer: 2,
      },
      {
        question: "Which popular Mexican food is a folded tortilla filled with ingredients?",
        options: ["Burrito", "Enchilada", "Taco", "Quesadilla"],
        correctAnswer: 2,
      },
      {
        question: "What is the most popular pizza topping in the United States?",
        options: ["Mushrooms", "Sausage", "Pepperoni", "Peppers"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "trivia-riddles",
    title: "Riddles & Brain Teasers Challenge",
    description: "Put your thinking cap on and solve these tricky riddles!",
    category: "Trivia",
    emoji: "🧩",
    questions: [
      {
        question: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
        options: ["A globe", "A map", "A painting", "A dream"],
        correctAnswer: 1,
      },
      {
        question: "What has hands but can't clap?",
        options: ["A statue", "A clock", "A tree", "A puppet"],
        correctAnswer: 1,
      },
      {
        question: "What gets wetter the more it dries?",
        options: ["A sponge", "A towel", "Sand", "Paper"],
        correctAnswer: 1,
      },
      {
        question: "I have keys but no locks. I have space but no room. You can enter but can't go inside. What am I?",
        options: ["A house", "A car", "A keyboard", "A phone"],
        correctAnswer: 2,
      },
      {
        question: "What can travel around the world while staying in one corner?",
        options: ["A plane", "A postage stamp", "The internet", "A satellite"],
        correctAnswer: 1,
      },
      {
        question: "The more you take, the more you leave behind. What are they?",
        options: ["Breaths", "Footsteps", "Photos", "Memories"],
        correctAnswer: 1,
      },
      {
        question: "What has a head, a tail, but no body?",
        options: ["A snake", "A comet", "A coin", "A worm"],
        correctAnswer: 2,
      },
      {
        question: "What can you catch but not throw?",
        options: ["A ball", "A cold", "A fish", "A wave"],
        correctAnswer: 1,
      },
      {
        question: "If you have me, you want to share me. If you share me, you don't have me. What am I?",
        options: ["Money", "A secret", "Food", "Time"],
        correctAnswer: 1,
      },
      {
        question: "What goes up but never comes down?",
        options: ["A balloon", "A rocket", "Your age", "Smoke"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "trivia-true-false",
    title: "True or False: Weird Facts Edition",
    description: "Can you tell which weird facts are true and which are false?",
    category: "Trivia",
    emoji: "🤯",
    questions: [
      {
        question: "True or False: Honey never spoils and can last thousands of years.",
        options: ["True", "False", "Only if refrigerated", "Only certain types"],
        correctAnswer: 0,
      },
      {
        question: "True or False: A group of flamingos is called a 'flamboyance.'",
        options: ["True", "False", "It's called a 'flock'", "It's called a 'colony'"],
        correctAnswer: 0,
      },
      {
        question: "True or False: Humans only use 10% of their brains.",
        options: ["True", "False", "Only while sleeping", "It depends on the person"],
        correctAnswer: 1,
      },
      {
        question: "True or False: Bananas are technically berries.",
        options: ["True", "False", "Only wild bananas", "Only yellow bananas"],
        correctAnswer: 0,
      },
      {
        question: "True or False: The Great Wall of China can be seen from space with the naked eye.",
        options: ["True", "False", "Only on clear days", "Only from the Moon"],
        correctAnswer: 1,
      },
      {
        question: "True or False: Octopuses have blue blood.",
        options: ["True", "False", "They have green blood", "They have no blood"],
        correctAnswer: 0,
      },
      {
        question: "True or False: Lightning never strikes the same place twice.",
        options: ["True", "False", "Only on mountains", "Only over water"],
        correctAnswer: 1,
      },
      {
        question: "True or False: A day on Venus is longer than a year on Venus.",
        options: ["True", "False", "They are exactly equal", "Only in Earth time"],
        correctAnswer: 0,
      },
      {
        question: "True or False: Goldfish have a memory of only 3 seconds.",
        options: ["True", "False - it's much longer", "True - exactly 3 seconds", "It depends on the breed"],
        correctAnswer: 1,
      },
      {
        question: "True or False: There are more stars in the universe than grains of sand on Earth.",
        options: ["True", "False", "They are about equal", "Nobody knows"],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: "trivia-emoji-guess",
    title: "Emoji Movie & Show Guessing Game",
    description: "Can you guess the movie or TV show from emoji clues?",
    category: "Trivia",
    emoji: "🎬",
    questions: [
      {
        question: "Guess the movie: 🦁👑",
        options: ["Madagascar", "The Lion King", "Narnia", "The Jungle Book"],
        correctAnswer: 1,
      },
      {
        question: "Guess the movie: ❄️👸⛄",
        options: ["Ice Age", "Frozen", "The Snow Queen", "Winter's Tale"],
        correctAnswer: 1,
      },
      {
        question: "Guess the movie: 🕷️🧑",
        options: ["Ant-Man", "Spider-Man", "The Fly", "Bug's Life"],
        correctAnswer: 1,
      },
      {
        question: "Guess the movie: 🧙‍♂️💍🌋",
        options: ["Harry Potter", "The Hobbit", "Lord of the Rings", "Narnia"],
        correctAnswer: 2,
      },
      {
        question: "Guess the movie: 🤖👦🌙",
        options: ["Wall-E", "Big Hero 6", "The Iron Giant", "A.I."],
        correctAnswer: 0,
      },
      {
        question: "Guess the movie: 🐠🔍",
        options: ["Shark Tale", "The Little Mermaid", "Finding Nemo", "Moana"],
        correctAnswer: 2,
      },
      {
        question: "Guess the TV show: 🧽⭐🍍🏠",
        options: ["Phineas and Ferb", "SpongeBob SquarePants", "Adventure Time", "The Fairly OddParents"],
        correctAnswer: 1,
      },
      {
        question: "Guess the movie: 🏴‍☠️⚓💀🗺️",
        options: ["Moana", "Treasure Planet", "Pirates of the Caribbean", "Peter Pan"],
        correctAnswer: 2,
      },
      {
        question: "Guess the movie: 👨‍🚀🚀♾️",
        options: ["Interstellar", "Toy Story", "Gravity", "The Martian"],
        correctAnswer: 1,
      },
      {
        question: "Guess the movie: 🧟‍♂️🌍🔫",
        options: ["Zombieland", "World War Z", "Resident Evil", "The Walking Dead"],
        correctAnswer: 0,
      },
    ],
  },
];
