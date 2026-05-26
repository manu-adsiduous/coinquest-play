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

export const scienceQuizzes: Quiz[] = [
  {
    id: "sci-solar-system",
    title: "Solar System Planets & Moons Quiz",
    description: "Explore our cosmic neighborhood! How much do you know about planets and moons?",
    category: "Science",
    emoji: "🪐",
    questions: [
      {
        question: "Which planet is known as the 'Red Planet'?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
      },
      {
        question: "How many planets are in our solar system?",
        options: ["7", "8", "9", "10"],
        correctAnswer: 1,
      },
      {
        question: "Which planet is the largest in our solar system?",
        options: ["Saturn", "Neptune", "Jupiter", "Uranus"],
        correctAnswer: 2,
      },
      {
        question: "What are Saturn's rings mostly made of?",
        options: ["Gas", "Rock and dust", "Ice and rock particles", "Lava"],
        correctAnswer: 2,
      },
      {
        question: "Which moon in our solar system is the largest?",
        options: ["Europa", "Titan", "Ganymede", "The Moon"],
        correctAnswer: 2,
      },
      {
        question: "Which planet rotates on its side?",
        options: ["Neptune", "Uranus", "Mars", "Mercury"],
        correctAnswer: 1,
      },
      {
        question: "What is the closest planet to the Sun?",
        options: ["Venus", "Earth", "Mercury", "Mars"],
        correctAnswer: 2,
      },
      {
        question: "Which planet has the Great Red Spot, a massive storm?",
        options: ["Mars", "Saturn", "Neptune", "Jupiter"],
        correctAnswer: 3,
      },
      {
        question: "How long does it take Earth to orbit the Sun?",
        options: ["24 hours", "30 days", "365.25 days", "100 days"],
        correctAnswer: 2,
      },
      {
        question: "Pluto was reclassified as a 'dwarf planet' in what year?",
        options: ["2000", "2003", "2006", "2010"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "sci-space",
    title: "Space Exploration & NASA Trivia",
    description: "From moon landings to Mars rovers -- test your space exploration knowledge!",
    category: "Science",
    emoji: "🚀",
    questions: [
      {
        question: "Who was the first person to walk on the Moon?",
        options: [
          "Buzz Aldrin",
          "Neil Armstrong",
          "John Glenn",
          "Yuri Gagarin",
        ],
        correctAnswer: 1,
      },
      {
        question: "What does NASA stand for?",
        options: [
          "National Aeronautics and Space Administration",
          "North American Space Agency",
          "National Astronomy and Science Association",
          "New Age Space Administration",
        ],
        correctAnswer: 0,
      },
      {
        question: "What was the name of the first space shuttle?",
        options: ["Discovery", "Columbia", "Enterprise", "Challenger"],
        correctAnswer: 2,
      },
      {
        question: "Which Mars rover was active from 2004 to 2018 and was originally planned for 90 days?",
        options: ["Curiosity", "Perseverance", "Opportunity", "Spirit"],
        correctAnswer: 2,
      },
      {
        question: "Who was the first human to travel to space?",
        options: [
          "Neil Armstrong",
          "Alan Shepard",
          "Yuri Gagarin",
          "John Glenn",
        ],
        correctAnswer: 2,
      },
      {
        question: "What is the International Space Station (ISS) used for?",
        options: [
          "Military operations",
          "Scientific research in microgravity",
          "Space tourism only",
          "Satellite repair",
        ],
        correctAnswer: 1,
      },
      {
        question: "The Hubble Space Telescope was launched in what year?",
        options: ["1985", "1990", "1995", "2000"],
        correctAnswer: 1,
      },
      {
        question: "Which company launched the first privately-funded crewed spacecraft to orbit?",
        options: ["Blue Origin", "SpaceX", "Virgin Galactic", "Boeing"],
        correctAnswer: 1,
      },
      {
        question: "What was the Apollo 13 mission famous for?",
        options: [
          "First Moon landing",
          "A successful emergency return after an onboard explosion",
          "Longest space mission",
          "First spacewalk",
        ],
        correctAnswer: 1,
      },
      {
        question: "The James Webb Space Telescope primarily observes in what type of light?",
        options: ["Visible light", "Ultraviolet", "Infrared", "X-ray"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "sci-dinosaurs",
    title: "Dinosaurs: Types & Facts Quiz",
    description: "Travel back millions of years and test your dinosaur knowledge!",
    category: "Science",
    emoji: "🦕",
    questions: [
      {
        question: "What does the word 'dinosaur' mean?",
        options: [
          "Ancient animal",
          "Terrible lizard",
          "Giant beast",
          "Old reptile",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which dinosaur had three horns on its head?",
        options: [
          "Stegosaurus",
          "Triceratops",
          "Ankylosaurus",
          "Pachycephalosaurus",
        ],
        correctAnswer: 1,
      },
      {
        question: "The T-Rex lived during which period?",
        options: ["Triassic", "Jurassic", "Cretaceous", "Permian"],
        correctAnswer: 2,
      },
      {
        question: "What is believed to have caused the extinction of most dinosaurs?",
        options: [
          "A volcanic winter",
          "An asteroid impact",
          "A giant flood",
          "Running out of food",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which dinosaur is known for the large plates along its back?",
        options: [
          "Velociraptor",
          "Brachiosaurus",
          "Stegosaurus",
          "Spinosaurus",
        ],
        correctAnswer: 2,
      },
      {
        question: "Were dinosaurs reptiles, mammals, or amphibians?",
        options: ["Mammals", "Amphibians", "Reptiles", "Fish"],
        correctAnswer: 2,
      },
      {
        question: "Which flying reptile lived alongside dinosaurs but was NOT a dinosaur?",
        options: [
          "Archaeopteryx",
          "Pteranodon",
          "Velociraptor",
          "Compsognathus",
        ],
        correctAnswer: 1,
      },
      {
        question: "How long ago did dinosaurs go extinct (approximately)?",
        options: [
          "10 million years",
          "66 million years",
          "200 million years",
          "500 million years",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which dinosaur was one of the largest land animals ever, with a very long neck?",
        options: [
          "T-Rex",
          "Velociraptor",
          "Argentinosaurus",
          "Allosaurus",
        ],
        correctAnswer: 2,
      },
      {
        question: "Modern birds are considered to be descendants of ___.",
        options: [
          "Pterosaurs",
          "Theropod dinosaurs",
          "Sauropods",
          "Marine reptiles",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "sci-human-body",
    title: "Human Body Amazing Facts Quiz",
    description: "Discover incredible facts about the amazing machine that is your body!",
    category: "Science",
    emoji: "🫀",
    questions: [
      {
        question: "How many bones does an adult human body have?",
        options: ["106", "206", "306", "156"],
        correctAnswer: 1,
      },
      {
        question: "What is the largest organ in the human body?",
        options: ["Liver", "Brain", "Skin", "Lungs"],
        correctAnswer: 2,
      },
      {
        question: "What is the smallest bone in the human body?",
        options: [
          "Toe bone",
          "Stapes (in the ear)",
          "Finger bone",
          "Kneecap",
        ],
        correctAnswer: 1,
      },
      {
        question: "How many chambers does the human heart have?",
        options: ["2", "3", "4", "5"],
        correctAnswer: 2,
      },
      {
        question: "What percentage of the human body is water?",
        options: ["About 30%", "About 45%", "About 60%", "About 80%"],
        correctAnswer: 2,
      },
      {
        question: "Which part of the brain controls balance and coordination?",
        options: ["Cerebrum", "Cerebellum", "Brain stem", "Hippocampus"],
        correctAnswer: 1,
      },
      {
        question: "How many teeth does a full set of adult teeth have?",
        options: ["28", "30", "32", "34"],
        correctAnswer: 2,
      },
      {
        question: "Red blood cells are made in which part of the body?",
        options: ["Liver", "Heart", "Bone marrow", "Kidneys"],
        correctAnswer: 2,
      },
      {
        question: "What is the strongest muscle in the human body (by weight)?",
        options: ["Bicep", "Heart", "Masseter (jaw muscle)", "Quadricep"],
        correctAnswer: 2,
      },
      {
        question: "How fast do nerve signals travel in the human body?",
        options: [
          "Up to 10 mph",
          "Up to 50 mph",
          "Up to 150 mph",
          "Up to 270 mph",
        ],
        correctAnswer: 3,
      },
    ],
  },
  {
    id: "sci-chemistry",
    title: "Chemistry Elements Fun Quiz",
    description: "Explore the periodic table and chemical reactions in this fun quiz!",
    category: "Science",
    emoji: "⚗️",
    questions: [
      {
        question: "What is the chemical symbol for water?",
        options: ["Wa", "H2O", "HO2", "W"],
        correctAnswer: 1,
      },
      {
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: 2,
      },
      {
        question: "How many elements are on the periodic table (approximately)?",
        options: ["90", "100", "118", "150"],
        correctAnswer: 2,
      },
      {
        question: "What gas do humans breathe out that plants use?",
        options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Helium"],
        correctAnswer: 2,
      },
      {
        question: "What element makes up most of the Sun?",
        options: ["Helium", "Hydrogen", "Carbon", "Oxygen"],
        correctAnswer: 1,
      },
      {
        question: "What happens when you mix baking soda and vinegar?",
        options: [
          "Nothing happens",
          "It produces a fizzy chemical reaction with CO2 gas",
          "It creates a solid",
          "It turns blue",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Iron", "Diamond", "Quartz"],
        correctAnswer: 2,
      },
      {
        question: "Which element has the atomic number 1?",
        options: ["Helium", "Oxygen", "Carbon", "Hydrogen"],
        correctAnswer: 3,
      },
      {
        question: "What makes something an 'acid' vs a 'base'?",
        options: [
          "Color",
          "pH level (acids below 7, bases above 7)",
          "Temperature",
          "Weight",
        ],
        correctAnswer: 1,
      },
      {
        question: "What gas fills balloons to make them float?",
        options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Helium"],
        correctAnswer: 3,
      },
    ],
  },
  {
    id: "sci-weather",
    title: "Weather & Natural Disasters Trivia",
    description: "From tornadoes to tsunamis -- how much do you know about extreme weather?",
    category: "Science",
    emoji: "⛈️",
    questions: [
      {
        question: "What scale measures the intensity of tornadoes?",
        options: [
          "Richter scale",
          "Enhanced Fujita (EF) scale",
          "Beaufort scale",
          "Saffir-Simpson scale",
        ],
        correctAnswer: 1,
      },
      {
        question: "What causes thunder?",
        options: [
          "Clouds bumping together",
          "The rapid expansion of air heated by lightning",
          "Wind moving very fast",
          "Rain hitting the ground hard",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is the eye of a hurricane?",
        options: [
          "The most dangerous part",
          "A calm, clear area at the center",
          "Where the rain is heaviest",
          "The outer edge of the storm",
        ],
        correctAnswer: 1,
      },
      {
        question: "What causes a tsunami?",
        options: [
          "Strong winds",
          "Underwater earthquakes or volcanic eruptions",
          "Heavy rainfall",
          "Melting icebergs",
        ],
        correctAnswer: 1,
      },
      {
        question: "At what temperature does water freeze?",
        options: ["0°C / 32°F", "10°C / 50°F", "-10°C / 14°F", "5°C / 41°F"],
        correctAnswer: 0,
      },
      {
        question: "What type of cloud is tall, puffy, and often brings thunderstorms?",
        options: ["Cirrus", "Stratus", "Cumulonimbus", "Nimbostratus"],
        correctAnswer: 2,
      },
      {
        question: "Which natural disaster is measured by the Richter scale?",
        options: ["Hurricanes", "Tornadoes", "Earthquakes", "Floods"],
        correctAnswer: 2,
      },
      {
        question: "What is a blizzard?",
        options: [
          "A light snowfall",
          "A severe snowstorm with strong winds and low visibility",
          "A type of ice cream",
          "A hailstorm",
        ],
        correctAnswer: 1,
      },
      {
        question: "Approximately how hot can a lightning bolt be?",
        options: [
          "1,000°F",
          "10,000°F",
          "30,000°F (hotter than the Sun's surface)",
          "500°F",
        ],
        correctAnswer: 2,
      },
      {
        question: "What is the 'Ring of Fire'?",
        options: [
          "A solar phenomenon",
          "A zone around the Pacific Ocean with many volcanoes and earthquakes",
          "A type of wildfire",
          "A weather pattern",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "sci-ocean",
    title: "Ocean Creatures Deep Dive Quiz",
    description: "Dive into the depths and discover amazing facts about ocean life!",
    category: "Science",
    emoji: "🐙",
    questions: [
      {
        question: "What is the largest animal on Earth?",
        options: [
          "Great white shark",
          "African elephant",
          "Blue whale",
          "Giant squid",
        ],
        correctAnswer: 2,
      },
      {
        question: "How many hearts does an octopus have?",
        options: ["1", "2", "3", "4"],
        correctAnswer: 2,
      },
      {
        question: "What percentage of the ocean is still unexplored?",
        options: ["About 20%", "About 50%", "About 80%", "About 95%"],
        correctAnswer: 2,
      },
      {
        question: "What is the deepest point in the ocean called?",
        options: [
          "The Grand Canyon",
          "The Mariana Trench",
          "The Bermuda Triangle",
          "The Atlantic Rift",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which sea creature can regenerate its arms if they are cut off?",
        options: ["Dolphin", "Starfish", "Whale", "Seal"],
        correctAnswer: 1,
      },
      {
        question: "What animal is known as the 'clown of the sea'?",
        options: ["Pufferfish", "Clownfish", "Seahorse", "Jellyfish"],
        correctAnswer: 1,
      },
      {
        question: "How do dolphins sleep?",
        options: [
          "They float on the surface",
          "They sleep with half their brain at a time",
          "They sleep on the ocean floor",
          "They don't sleep at all",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is coral made of?",
        options: [
          "Rocks",
          "Plants",
          "Tiny living animals called polyps",
          "Sand",
        ],
        correctAnswer: 2,
      },
      {
        question: "Which ocean creature has blue blood?",
        options: [
          "Dolphin",
          "Horseshoe crab",
          "Great white shark",
          "Sea turtle",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is bioluminescence?",
        options: [
          "Super speed underwater",
          "The ability of organisms to produce their own light",
          "Underwater hearing",
          "A type of camouflage",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "sci-inventions",
    title: "Inventions That Changed the World",
    description: "From the wheel to WiFi -- test your knowledge of world-changing inventions!",
    category: "Science",
    emoji: "💡",
    questions: [
      {
        question: "Who is credited with inventing the light bulb?",
        options: [
          "Nikola Tesla",
          "Thomas Edison",
          "Alexander Graham Bell",
          "Benjamin Franklin",
        ],
        correctAnswer: 1,
      },
      {
        question: "What did Alexander Graham Bell invent?",
        options: ["Television", "Radio", "Telephone", "Computer"],
        correctAnswer: 2,
      },
      {
        question: "The World Wide Web was invented by ___.",
        options: [
          "Steve Jobs",
          "Bill Gates",
          "Tim Berners-Lee",
          "Mark Zuckerberg",
        ],
        correctAnswer: 2,
      },
      {
        question: "What was the printing press invented by Johannes Gutenberg used for?",
        options: [
          "Printing clothes",
          "Mass-producing books and text",
          "Pressing flowers",
          "Making coins",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which invention allowed people to keep food cold at home?",
        options: ["Microwave", "Oven", "Refrigerator", "Toaster"],
        correctAnswer: 2,
      },
      {
        question: "What did the Wright Brothers famously achieve in 1903?",
        options: [
          "First car drive",
          "First powered airplane flight",
          "First submarine dive",
          "First rocket launch",
        ],
        correctAnswer: 1,
      },
      {
        question: "Penicillin, the first antibiotic, was discovered by ___.",
        options: [
          "Marie Curie",
          "Louis Pasteur",
          "Alexander Fleming",
          "Isaac Newton",
        ],
        correctAnswer: 2,
      },
      {
        question: "What ancient invention allowed humans to move heavy objects more easily?",
        options: ["The lever", "The wheel", "The ramp", "All of the above"],
        correctAnswer: 3,
      },
      {
        question: "Who invented the first successful vaccine (for smallpox)?",
        options: [
          "Edward Jenner",
          "Louis Pasteur",
          "Jonas Salk",
          "Robert Koch",
        ],
        correctAnswer: 0,
      },
      {
        question: "GPS (Global Positioning System) was originally developed by ___.",
        options: [
          "Apple",
          "Google",
          "The U.S. Department of Defense",
          "NASA",
        ],
        correctAnswer: 2,
      },
    ],
  },
];
