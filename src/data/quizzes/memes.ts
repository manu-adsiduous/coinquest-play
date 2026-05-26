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

export const memesQuizzes: Quiz[] = [
  {
    id: "memes-classic",
    title: "Classic Memes: Do You Know Them All?",
    description: "Test your knowledge of the most iconic memes that shaped internet culture!",
    category: "Memes",
    emoji: "😂",
    questions: [
      {
        question: "Which animal is featured in the 'Doge' meme?",
        options: ["Golden Retriever", "Shiba Inu", "Pomeranian", "Husky"],
        correctAnswer: 1,
      },
      {
        question: "What does the 'Distracted Boyfriend' meme typically represent?",
        options: [
          "Being loyal to something",
          "Being attracted to something new instead of what you have",
          "Breaking up with someone",
          "Going on a date",
        ],
        correctAnswer: 1,
      },
      {
        question: "The 'This Is Fine' meme shows a dog sitting in a room that is on ___.",
        options: ["Ice", "Water", "Fire", "Sand"],
        correctAnswer: 2,
      },
      {
        question: "What year did the 'Rickroll' meme become widely popular?",
        options: ["2005", "2007", "2010", "2012"],
        correctAnswer: 1,
      },
      {
        question: "Which classic meme features a cat sitting at a dinner table?",
        options: [
          "Grumpy Cat",
          "Keyboard Cat",
          "Woman Yelling at a Cat",
          "Nyan Cat",
        ],
        correctAnswer: 2,
      },
      {
        question: "What phrase is associated with the 'One Does Not Simply' meme?",
        options: [
          "One does not simply walk into Mordor",
          "One does not simply eat one chip",
          "One does not simply log off",
          "One does not simply pass the test",
        ],
        correctAnswer: 0,
      },
      {
        question: "The 'Success Kid' meme shows a baby doing what?",
        options: [
          "Crying",
          "Laughing",
          "Clenching his fist with determination",
          "Eating sand",
        ],
        correctAnswer: 2,
      },
      {
        question: "Which character says 'I don't always... but when I do' in the meme?",
        options: [
          "The Most Interesting Man in the World",
          "Chuck Norris",
          "Bad Luck Brian",
          "Philosoraptor",
        ],
        correctAnswer: 0,
      },
      {
        question: "What color is the 'Trollface' meme drawn in?",
        options: [
          "Full color",
          "Black and white",
          "Blue and red",
          "Green and yellow",
        ],
        correctAnswer: 1,
      },
      {
        question: "The 'Hide the Pain Harold' meme features a man who is ___.",
        options: [
          "Genuinely happy",
          "Smiling while hiding inner sadness",
          "Angry at a computer",
          "Sleeping at work",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "memes-brainrot",
    title: "Skibidi & Brain Rot Memes Quiz",
    description: "How deep is your brain rot? Test your knowledge of the latest viral nonsense!",
    category: "Memes",
    emoji: "🧠",
    questions: [
      {
        question: "What does 'Skibidi' originally come from?",
        options: [
          "A TikTok dance",
          "A YouTube animated series",
          "A Roblox game",
          "A Twitch streamer",
        ],
        correctAnswer: 1,
      },
      {
        question: "In Skibidi Toilet, what comes out of the toilets?",
        options: ["Arms", "Heads", "Legs", "Tentacles"],
        correctAnswer: 1,
      },
      {
        question: "What does 'rizz' mean in internet slang?",
        options: [
          "Being funny",
          "Charm or attractiveness",
          "Being smart",
          "Running fast",
        ],
        correctAnswer: 1,
      },
      {
        question: "The term 'brain rot' refers to content that is ___.",
        options: [
          "Educational",
          "So absurd it feels like it melts your brain",
          "About science",
          "Really boring",
        ],
        correctAnswer: 1,
      },
      {
        question: "What does 'gyatt' typically express?",
        options: ["Anger", "Surprise or admiration", "Sadness", "Confusion"],
        correctAnswer: 1,
      },
      {
        question: "Who is the 'Sigma Male' meme often associated with?",
        options: [
          "Patrick Bateman from American Psycho",
          "SpongeBob SquarePants",
          "Mario from Nintendo",
          "Shrek",
        ],
        correctAnswer: 0,
      },
      {
        question: "What does 'no cap' mean?",
        options: [
          "No hat needed",
          "No lying, for real",
          "No limit",
          "No problem",
        ],
        correctAnswer: 1,
      },
      {
        question: "The 'mewing' trend involves ___.",
        options: [
          "Making cat sounds",
          "A specific tongue posture for jawline",
          "Staying silent",
          "Eating slowly",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is 'edging' in the context of brain rot memes?",
        options: [
          "Standing on the edge of something",
          "Delaying something for a bigger payoff",
          "Being edgy and dark",
          "Skateboarding trick",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which of these is a common 'brain rot' phrase?",
        options: [
          "Skibidi toilet gyatt rizz",
          "Hello how are you today",
          "Please and thank you",
          "Good morning sunshine",
        ],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: "memes-among-us",
    title: "Among Us Memes & Trivia",
    description: "Are you an impostor or a true Among Us meme expert? Find out!",
    category: "Memes",
    emoji: "📮",
    questions: [
      {
        question: "What color is often considered the most 'sus' in Among Us memes?",
        options: ["Blue", "Green", "Red", "Yellow"],
        correctAnswer: 2,
      },
      {
        question: "What does 'sus' mean in Among Us?",
        options: ["Super", "Suspicious", "Surrender", "Success"],
        correctAnswer: 1,
      },
      {
        question: "Where is the emergency meeting button located in the original map?",
        options: ["Electrical", "Cafeteria", "Medbay", "Navigation"],
        correctAnswer: 1,
      },
      {
        question: "What year did Among Us become a viral sensation?",
        options: ["2018", "2019", "2020", "2021"],
        correctAnswer: 2,
      },
      {
        question: "What is the maximum number of impostors in a standard Among Us game?",
        options: ["1", "2", "3", "4"],
        correctAnswer: 2,
      },
      {
        question: "Which room in Among Us is considered the scariest to go alone?",
        options: ["Cafeteria", "Electrical", "Weapons", "Shields"],
        correctAnswer: 1,
      },
      {
        question: "What do crewmates do when they find a dead body?",
        options: [
          "Run away",
          "Report it",
          "Ignore it",
          "Fix it",
        ],
        correctAnswer: 1,
      },
      {
        question: "The Among Us characters are called ___.",
        options: ["Astronauts", "Crewmates", "Spacemen", "Beans"],
        correctAnswer: 1,
      },
      {
        question: "What is a common meme phrase when someone is ejected?",
        options: [
          "Goodbye forever!",
          "[Color] was not The Impostor",
          "See you later!",
          "Better luck next time!",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which task involves a card swipe that players often fail?",
        options: [
          "Download Data",
          "Admin: Swipe Card",
          "Fix Wiring",
          "Empty Garbage",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "memes-reddit",
    title: "Reddit Memes & Viral Posts Quiz",
    description: "From r/memes to the front page -- how well do you know Reddit culture?",
    category: "Memes",
    emoji: "🤖",
    questions: [
      {
        question: "What is Reddit's mascot called?",
        options: ["Snoo", "Redd", "Alien Al", "Karma"],
        correctAnswer: 0,
      },
      {
        question: "What does 'TL;DR' stand for on Reddit?",
        options: [
          "Too Long; Did Read",
          "Too Long; Didn't Read",
          "The Last; Don't Reply",
          "Totally Legit; Don't React",
        ],
        correctAnswer: 1,
      },
      {
        question: "What are Reddit's upvotes and downvotes collectively called?",
        options: ["Likes", "Points", "Karma", "Credits"],
        correctAnswer: 2,
      },
      {
        question: "Which subreddit is known for 'Am I the bad guy?' stories?",
        options: [
          "r/relationships",
          "r/AmItheAsshole",
          "r/confessions",
          "r/advice",
        ],
        correctAnswer: 1,
      },
      {
        question: "What does 'OP' stand for on Reddit?",
        options: [
          "Original Poster",
          "Online Person",
          "Over Powered",
          "Official Post",
        ],
        correctAnswer: 0,
      },
      {
        question: "The 'Wholesome Award' on Reddit features what animal?",
        options: ["A dog", "A cat", "A seal", "A bear"],
        correctAnswer: 2,
      },
      {
        question: "What is a 'subreddit'?",
        options: [
          "A type of sandwich",
          "A community forum focused on a topic",
          "A Reddit employee",
          "A Reddit premium feature",
        ],
        correctAnswer: 1,
      },
      {
        question: "What does 'ELI5' stand for on Reddit?",
        options: [
          "Everyone Likes It 5 Times",
          "Explain Like I'm 5",
          "Edit Line Item 5",
          "Elaborate Long Interesting 5-points",
        ],
        correctAnswer: 1,
      },
      {
        question: "The Reddit 'Cake Day' celebrates what?",
        options: [
          "Your birthday",
          "The anniversary of your Reddit account creation",
          "National Cake Day",
          "When you get 1000 karma",
        ],
        correctAnswer: 1,
      },
      {
        question: "What happens when a post reaches the 'front page' of Reddit?",
        options: [
          "It gets deleted",
          "It becomes visible to the most users",
          "The poster gets money",
          "It gets locked",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "memes-emoji",
    title: "Emoji Meanings & Combos Challenge",
    description: "Can you decode emoji combinations and hidden meanings? Let's find out!",
    category: "Memes",
    emoji: "😎",
    questions: [
      {
        question: "What does the skull emoji (💀) typically mean in meme culture?",
        options: [
          "Something scary",
          "Someone died",
          "Something is so funny you're 'dead'",
          "Halloween",
        ],
        correctAnswer: 2,
      },
      {
        question: "What movie does this emoji combo represent: 🦁👑🌍?",
        options: ["Tarzan", "The Lion King", "Madagascar", "The Jungle Book"],
        correctAnswer: 1,
      },
      {
        question: "The 🗿 emoji (Moai) is often used to express ___.",
        options: [
          "Excitement",
          "A deadpan or emotionless reaction",
          "Sadness",
          "Love for archaeology",
        ],
        correctAnswer: 1,
      },
      {
        question: "What does the combo 🧢 mean in internet slang?",
        options: [
          "Cool outfit",
          "Lying or not telling the truth",
          "Baseball fan",
          "Going outside",
        ],
        correctAnswer: 1,
      },
      {
        question: "What food does this emoji combo describe: 🍕🍍?",
        options: [
          "Fruit salad",
          "Tropical pizza",
          "Hawaiian pizza (pineapple pizza)",
          "Pizza and dessert",
        ],
        correctAnswer: 2,
      },
      {
        question: "The 👁️👄👁️ emoji combo expresses ___.",
        options: [
          "Being cute",
          "Staring in shock or disbelief",
          "Doing makeup",
          "Being sleepy",
        ],
        correctAnswer: 1,
      },
      {
        question: "What does 💅 typically convey in messages?",
        options: [
          "Going to a nail salon",
          "Sassy or unbothered confidence",
          "Feeling sick",
          "Asking for help",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which emoji combo represents the movie 'Finding Nemo': 🔍🐠?",
        options: ["True", "False", "Only the fish part", "Neither emoji fits"],
        correctAnswer: 0,
      },
      {
        question: "What does sending someone a 🔥 emoji usually mean?",
        options: [
          "There's a fire nearby",
          "Something looks amazing or is really cool",
          "It's hot outside",
          "You should call 911",
        ],
        correctAnswer: 1,
      },
      {
        question: "The 🤡 emoji is often used to call someone a ___.",
        options: ["Comedian", "Entertainer", "Clown (foolish person)", "Circus fan"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "memes-slang",
    title: "Internet Slang & Abbreviations Quiz",
    description: "Do you speak fluent internet? Test your knowledge of online lingo!",
    category: "Memes",
    emoji: "💬",
    questions: [
      {
        question: "What does 'GOAT' stand for?",
        options: [
          "Get Out And Try",
          "Greatest Of All Time",
          "Go On A Trip",
          "Good Old Awesome Thing",
        ],
        correctAnswer: 1,
      },
      {
        question: "What does 'SMH' mean?",
        options: [
          "So Much Happiness",
          "Send Me Help",
          "Shaking My Head",
          "Somehow Maybe Helpful",
        ],
        correctAnswer: 2,
      },
      {
        question: "If someone says 'I'm dead 💀', what do they mean?",
        options: [
          "They need help",
          "They are extremely amused",
          "They are tired",
          "They are leaving",
        ],
        correctAnswer: 1,
      },
      {
        question: "What does 'FOMO' stand for?",
        options: [
          "For Our Mutual Opinions",
          "Fear Of Missing Out",
          "Find Out More Online",
          "Forget Our Main Objective",
        ],
        correctAnswer: 1,
      },
      {
        question: "What does 'slay' mean in internet slang?",
        options: [
          "To fight someone",
          "To do something exceptionally well",
          "To sleep all day",
          "To be lazy",
        ],
        correctAnswer: 1,
      },
      {
        question: "What does 'W' mean when someone comments it?",
        options: ["Wrong", "Win / great job", "Wait", "Why"],
        correctAnswer: 1,
      },
      {
        question: "What is the opposite of 'W' in internet slang?",
        options: ["M", "X", "L", "Z"],
        correctAnswer: 2,
      },
      {
        question: "What does 'NPC' mean when referring to a person?",
        options: [
          "Nice Polite Citizen",
          "Someone who acts like a non-player character with no personality",
          "New Phone Contact",
          "Not Particularly Cool",
        ],
        correctAnswer: 1,
      },
      {
        question: "If someone says 'bet', what do they mean?",
        options: [
          "They want to gamble",
          "They agree or confirm something",
          "They are confused",
          "They want to leave",
        ],
        correctAnswer: 1,
      },
      {
        question: "What does 'lowkey' mean?",
        options: [
          "A musical term",
          "Quietly or secretly, to a small degree",
          "Being sad",
          "Speaking softly",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "memes-tiktok",
    title: "Viral TikTok Trends Trivia",
    description: "From dances to challenges -- how well do you know TikTok trends?",
    category: "Memes",
    emoji: "🕺",
    questions: [
      {
        question: "What was the first major viral TikTok dance?",
        options: [
          "The Macarena",
          "Renegade",
          "Floss",
          "The Robot",
        ],
        correctAnswer: 1,
      },
      {
        question: "Who originally created the Renegade dance on TikTok?",
        options: [
          "Charli D'Amelio",
          "Addison Rae",
          "Jalaiah Harmon",
          "Bella Poarch",
        ],
        correctAnswer: 2,
      },
      {
        question: "The 'Corn Kid' became famous for saying corn is ___.",
        options: [
          "Terrible",
          "A big lump with knobs that has the juice",
          "His least favorite food",
          "Better than candy",
        ],
        correctAnswer: 1,
      },
      {
        question: "What sound often plays in 'get ready with me' (GRWM) TikToks?",
        options: [
          "Heavy metal music",
          "Calm background music or chatting",
          "Complete silence",
          "Alarm sounds",
        ],
        correctAnswer: 1,
      },
      {
        question: "What does 'FYP' stand for on TikTok?",
        options: [
          "Find Your People",
          "For You Page",
          "Fun Young Person",
          "Follow Your Passion",
        ],
        correctAnswer: 1,
      },
      {
        question: "The 'devious lick' trend involved people ___.",
        options: [
          "Doing magic tricks",
          "Stealing random items from school",
          "Cooking elaborate meals",
          "Doing homework challenges",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which TikToker became famous for their 'M to the B' lip sync?",
        options: [
          "Charli D'Amelio",
          "Bella Poarch",
          "Addison Rae",
          "Dixie D'Amelio",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is a 'duet' on TikTok?",
        options: [
          "Singing with another person",
          "A video playing side-by-side with another video",
          "Two people dancing together",
          "A type of TikTok ad",
        ],
        correctAnswer: 1,
      },
      {
        question: "The 'Grimace Shake' trend involved pretending to ___.",
        options: [
          "Dance with a milkshake",
          "Faint or have something bad happen after drinking it",
          "Make the shake at home",
          "Review fast food",
        ],
        correctAnswer: 1,
      },
      {
        question: "What does 'POV' mean in TikTok videos?",
        options: [
          "Plenty Of Views",
          "Point Of View",
          "Person On Video",
          "Part Of Viral",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "memes-wyr",
    title: "Would You Rather: Internet Edition",
    description: "Impossible internet-themed choices! Which would YOU pick?",
    category: "Memes",
    emoji: "🤔",
    questions: [
      {
        question: "Which platform was originally called 'Musical.ly' before rebranding?",
        options: ["Instagram Reels", "TikTok", "YouTube Shorts", "Snapchat"],
        correctAnswer: 1,
      },
      {
        question: "What is a 'ratio' on social media?",
        options: [
          "A math problem",
          "When a reply gets more likes than the original post",
          "The screen size",
          "A type of filter",
        ],
        correctAnswer: 1,
      },
      {
        question: "If you 'touch grass', what are you doing?",
        options: [
          "Gardening",
          "Going outside and taking a break from the internet",
          "Playing a video game",
          "Eating a salad",
        ],
        correctAnswer: 1,
      },
      {
        question: "What does 'main character energy' mean?",
        options: [
          "Being a movie star",
          "Acting like the world revolves around you in a confident way",
          "Playing the lead in a school play",
          "Being the boss at work",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is 'doom scrolling'?",
        options: [
          "Scrolling through happy content",
          "Endlessly scrolling through negative news or content",
          "Playing a Doom video game",
          "Scrolling really fast",
        ],
        correctAnswer: 1,
      },
      {
        question: "What does 'ghosting' someone mean online?",
        options: [
          "Sending them spooky messages",
          "Suddenly stopping all communication without explanation",
          "Hacking their account",
          "Following them everywhere",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is a 'copypasta'?",
        options: [
          "A type of Italian food",
          "A block of text that gets copied and pasted repeatedly online",
          "A computer virus",
          "A type of emoji",
        ],
        correctAnswer: 1,
      },
      {
        question: "What does 'yeet' mean?",
        options: [
          "To eat something",
          "To throw something with force",
          "To run away",
          "To celebrate",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is 'ship' or 'shipping' in internet culture?",
        options: [
          "Ordering packages online",
          "Wanting two people or characters to be in a relationship",
          "Sending someone a gift",
          "Traveling by boat",
        ],
        correctAnswer: 1,
      },
      {
        question: "What does 'based' mean in internet slang?",
        options: [
          "Being basic",
          "Having a strong, unapologetic opinion",
          "Being at home base",
          "Starting from scratch",
        ],
        correctAnswer: 1,
      },
    ],
  },
];
