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

export const musicQuizzes: Quiz[] = [
  {
    id: "music-taylor",
    title: "Taylor Swift Eras & Songs Quiz",
    description: "Are you a true Swiftie? Prove it with this Taylor Swift trivia!",
    category: "Music",
    emoji: "🎤",
    questions: [
      {
        question: "What is the name of Taylor Swift's re-recorded album series?",
        options: [
          "Taylor's Remix",
          "Taylor's Version",
          "Taylor's Cut",
          "Taylor's Remaster",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which Taylor Swift album features the song 'Anti-Hero'?",
        options: ["Lover", "Folklore", "Midnights", "1989"],
        correctAnswer: 2,
      },
      {
        question: "What was Taylor Swift's first country hit single?",
        options: ["Love Story", "Tim McGraw", "Our Song", "Teardrops on My Guitar"],
        correctAnswer: 1,
      },
      {
        question: "Which album is named after a year?",
        options: ["Reputation", "1989", "Evermore", "Red"],
        correctAnswer: 1,
      },
      {
        question: "What is the name of Taylor Swift's concert tour in 2023-2024?",
        options: ["Reputation Tour", "Lover Fest", "The Eras Tour", "Midnights Tour"],
        correctAnswer: 2,
      },
      {
        question: "In which music video does Taylor wear a sparkly bodysuit and dance with backup dancers?",
        options: ["Shake It Off", "Bad Blood", "Blank Space", "ME!"],
        correctAnswer: 0,
      },
      {
        question: "Which Taylor Swift album has a lowercase, indie folk style?",
        options: ["Red", "Reputation", "Folklore", "Fearless"],
        correctAnswer: 2,
      },
      {
        question: "What color is associated with the 'Speak Now' era?",
        options: ["Red", "Blue", "Purple", "Gold"],
        correctAnswer: 2,
      },
      {
        question: "Which song starts with 'We were both young when I first saw you'?",
        options: ["You Belong with Me", "Love Story", "Enchanted", "Begin Again"],
        correctAnswer: 1,
      },
      {
        question: "How many Grammy Awards has Taylor Swift won for Album of the Year (as of 2024)?",
        options: ["2", "3", "4", "5"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "music-lyrics",
    title: "Guess the Song from the Lyrics",
    description: "Can you name the hit song from just a few lyrics?",
    category: "Music",
    emoji: "🎶",
    questions: [
      {
        question: "Which song has the lyrics: 'Cause baby, you're a firework, come on show 'em what you're worth'?",
        options: ["Roar", "Firework", "Dynamite", "Spark"],
        correctAnswer: 1,
      },
      {
        question: "Which song says: 'Just gonna stand there and watch me burn'?",
        options: ["Love the Way You Lie", "Set Fire to the Rain", "Burn", "Firework"],
        correctAnswer: 0,
      },
      {
        question: "Which song has the lyrics: 'I got my mind on my money and my money on my mind'?",
        options: ["Gold Digger", "Gin and Juice", "Money Trees", "Cash Machine"],
        correctAnswer: 1,
      },
      {
        question: "'We found love in a hopeless place' is from which song?",
        options: ["Diamonds", "Umbrella", "We Found Love", "Stay"],
        correctAnswer: 2,
      },
      {
        question: "Which song contains: 'Is it too late now to say sorry'?",
        options: ["Baby", "Sorry", "Love Yourself", "Peaches"],
        correctAnswer: 1,
      },
      {
        question: "'I'm walking on sunshine' is from which classic hit?",
        options: [
          "Here Comes the Sun",
          "Walking on Sunshine",
          "Good Day Sunshine",
          "Sunshine of Your Love",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which song has: 'Uptown funk you up, uptown funk you up'?",
        options: ["24K Magic", "Uptown Funk", "Treasure", "Finesse"],
        correctAnswer: 1,
      },
      {
        question: "'Let it go, let it go, can't hold it back anymore' is from which movie song?",
        options: ["Moana", "Tangled", "Frozen", "Encanto"],
        correctAnswer: 2,
      },
      {
        question: "Which song says: 'Yeah, I'm gonna take my horse to the old town road'?",
        options: ["Cowboy", "Old Town Road", "Country Roads", "Horse With No Name"],
        correctAnswer: 1,
      },
      {
        question: "'Hello from the other side' is a lyric from which artist?",
        options: ["Taylor Swift", "Beyonce", "Adele", "Rihanna"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "music-tiktok",
    title: "TikTok Viral Songs Challenge",
    description: "Do you know which songs went viral on TikTok?",
    category: "Music",
    emoji: "📱",
    questions: [
      {
        question: "Which song features the viral TikTok dance with the arm wave and body roll?",
        options: ["Savage", "Renegade", "Say So", "Blinding Lights"],
        correctAnswer: 2,
      },
      {
        question: "The 'Oh no, oh no, oh no no no no' sound comes from a remix of which song?",
        options: ["Remember", "Oh No", "Walking Down the Street", "Aerosmith - Remember"],
        correctAnswer: 0,
      },
      {
        question: "Which Fleetwood Mac song went viral on TikTok thanks to a skateboarding video?",
        options: ["Go Your Own Way", "Dreams", "The Chain", "Everywhere"],
        correctAnswer: 1,
      },
      {
        question: "'Buss It' by Erica Banks became a TikTok trend involving what?",
        options: [
          "A cooking challenge",
          "A glow-up transformation",
          "A dance battle",
          "A lip-sync challenge",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which artist's song 'Montero (Call Me By Your Name)' went viral on TikTok?",
        options: ["Bad Bunny", "Lil Nas X", "Doja Cat", "Tyler the Creator"],
        correctAnswer: 1,
      },
      {
        question: "The 'Corn Kid' interview spawned a viral remix. What did the kid love?",
        options: ["Pizza", "Ice cream", "Corn", "Chicken nuggets"],
        correctAnswer: 2,
      },
      {
        question: "Which song by Doja Cat became a massive TikTok dance trend?",
        options: ["Boss B*tch", "Say So", "Kiss Me More", "Need to Know"],
        correctAnswer: 1,
      },
      {
        question: "Which song features the lyrics used in the 'It's corn!' TikTok sound?",
        options: [
          "The Gregory Brothers remix",
          "Corn by Pitbull",
          "Cornfield Chase",
          "Candy Corn",
        ],
        correctAnswer: 0,
      },
      {
        question: "'Jiggle Jiggle' became viral on TikTok. Who originally performed the spoken word?",
        options: ["Ed Sheeran", "Louis Theroux", "James Corden", "Gordon Ramsay"],
        correctAnswer: 1,
      },
      {
        question: "Which song by The Weeknd had everyone doing the TikTok dance challenge?",
        options: ["Starboy", "Save Your Tears", "Blinding Lights", "After Hours"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "music-kpop",
    title: "K-Pop Groups & Members Quiz",
    description: "Test your knowledge of K-Pop groups, members, and hits!",
    category: "Music",
    emoji: "💜",
    questions: [
      {
        question: "How many members are in BTS?",
        options: ["5", "6", "7", "8"],
        correctAnswer: 2,
      },
      {
        question: "What is BLACKPINK's debut single?",
        options: ["Kill This Love", "DDU-DU DDU-DU", "Boombayah", "How You Like That"],
        correctAnswer: 2,
      },
      {
        question: "What does BTS stand for in Korean?",
        options: [
          "Beyond the Stars",
          "Bangtan Sonyeondan",
          "Born to Shine",
          "Best Team Seven",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which K-Pop group is known as 'The Nation's Girl Group' in South Korea?",
        options: ["TWICE", "BLACKPINK", "Girls' Generation", "Red Velvet"],
        correctAnswer: 2,
      },
      {
        question: "What is the name of BTS's fan base?",
        options: ["Blinks", "Army", "Once", "Carat"],
        correctAnswer: 1,
      },
      {
        question: "Which BLACKPINK member is also a solo actress and model?",
        options: ["Lisa", "Rose", "Jennie", "Jisoo"],
        correctAnswer: 3,
      },
      {
        question: "Which K-Pop group sings 'Dynamite'?",
        options: ["EXO", "SEVENTEEN", "BTS", "Stray Kids"],
        correctAnswer: 2,
      },
      {
        question: "What is the fandom name for TWICE fans?",
        options: ["Blink", "Once", "Midzy", "Atiny"],
        correctAnswer: 1,
      },
      {
        question: "Which K-Pop soloist is known as the 'Queen of K-Pop' and sang 'Gee'?",
        options: ["IU", "Taeyeon", "Sunmi", "HyunA"],
        correctAnswer: 1,
      },
      {
        question: "Which K-Pop group has members named Bang Chan, Hyunjin, and Felix?",
        options: ["TXT", "ATEEZ", "Stray Kids", "ENHYPEN"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "music-billie",
    title: "Billie Eilish Songs & Facts Trivia",
    description: "Think you know everything about Billie Eilish? Let's find out!",
    category: "Music",
    emoji: "🖤",
    questions: [
      {
        question: "What was Billie Eilish's breakout hit song?",
        options: ["Bad Guy", "Ocean Eyes", "Lovely", "Bellyache"],
        correctAnswer: 1,
      },
      {
        question: "Who does Billie Eilish frequently collaborate with on her music?",
        options: [
          "Her brother Finneas",
          "Her sister Florence",
          "Her dad Patrick",
          "Her cousin Charlie",
        ],
        correctAnswer: 0,
      },
      {
        question: "What James Bond movie did Billie Eilish sing the theme song for?",
        options: ["Skyfall", "Spectre", "No Time to Die", "Casino Royale"],
        correctAnswer: 2,
      },
      {
        question: "What is the name of Billie Eilish's debut album?",
        options: [
          "Happier Than Ever",
          "Don't Smile at Me",
          "When We All Fall Asleep, Where Do We Go?",
          "Hit Me Hard and Soft",
        ],
        correctAnswer: 2,
      },
      {
        question: "At what age did Billie Eilish release 'Ocean Eyes'?",
        options: ["12", "13", "14", "15"],
        correctAnswer: 1,
      },
      {
        question: "What color was Billie's signature hair during the 'Bad Guy' era?",
        options: [
          "Black and neon green",
          "All blonde",
          "All black",
          "Blue and purple",
        ],
        correctAnswer: 0,
      },
      {
        question: "Which Billie Eilish song was used as a meme with the lyric 'duh'?",
        options: ["Therefore I Am", "Bad Guy", "Bury a Friend", "Lovely"],
        correctAnswer: 1,
      },
      {
        question: "What is Billie Eilish's full name?",
        options: [
          "Billie Eilish Smith",
          "Billie Eilish Pirate Baird O'Connell",
          "Billie Eilish Rose Johnson",
          "Billie Eilish Marie Davis",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which award show made Billie the youngest person to win all four major categories?",
        options: ["MTV VMAs", "Billboard Awards", "Grammy Awards", "American Music Awards"],
        correctAnswer: 2,
      },
      {
        question: "What genre best describes Billie Eilish's music style?",
        options: ["Country pop", "Electropop and dark pop", "Heavy metal", "Classical"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "music-rap",
    title: "Rap & Hip Hop Lyrics Quiz",
    description: "Drop the mic! How well do you know rap and hip hop?",
    category: "Music",
    emoji: "🎧",
    questions: [
      {
        question: "Who raps the hit song 'SICKO MODE'?",
        options: ["Drake", "Travis Scott", "Kanye West", "Post Malone"],
        correctAnswer: 1,
      },
      {
        question: "Which rapper is known as 'Slim Shady'?",
        options: ["Jay-Z", "50 Cent", "Eminem", "Lil Wayne"],
        correctAnswer: 2,
      },
      {
        question: "What city is hip hop considered to have originated in?",
        options: ["Los Angeles", "Chicago", "Atlanta", "New York City"],
        correctAnswer: 3,
      },
      {
        question: "Which rapper sang 'Sunflower' for the Spider-Man: Into the Spider-Verse movie?",
        options: ["Post Malone", "Juice WRLD", "Lil Nas X", "Childish Gambino"],
        correctAnswer: 0,
      },
      {
        question: "Who is known for the album 'DAMN.' and the song 'HUMBLE.'?",
        options: ["J. Cole", "Kendrick Lamar", "Drake", "Tyler, The Creator"],
        correctAnswer: 1,
      },
      {
        question: "What does the term 'bars' mean in hip hop?",
        options: [
          "Dance moves",
          "Lyrics or rhyming lines",
          "Music awards",
          "Concert stages",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which female rapper is known for 'Super Bass' and 'Starships'?",
        options: ["Cardi B", "Megan Thee Stallion", "Nicki Minaj", "Doja Cat"],
        correctAnswer: 2,
      },
      {
        question: "Drake is originally from which country?",
        options: ["United States", "United Kingdom", "Canada", "Jamaica"],
        correctAnswer: 2,
      },
      {
        question: "What is a 'freestyle' in rap?",
        options: [
          "A type of beat",
          "Rapping without prepared lyrics",
          "A dance style",
          "A music award",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which rapper created the 'Yeezy' shoe brand?",
        options: ["Jay-Z", "Travis Scott", "Kanye West", "Pharrell Williams"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "music-emoji",
    title: "Music Emoji Decode Challenge",
    description: "Can you guess the song or artist from emoji clues?",
    category: "Music",
    emoji: "🎵",
    questions: [
      {
        question: "What song do these emojis represent? ☔👩🎤 (hint: Rihanna hit)",
        options: ["Diamonds", "Umbrella", "Stay", "Work"],
        correctAnswer: 1,
      },
      {
        question: "What artist do these emojis represent? 🐝👑 (hint: Queen B)",
        options: ["Ariana Grande", "Rihanna", "Beyonce", "Nicki Minaj"],
        correctAnswer: 2,
      },
      {
        question: "What song do these emojis represent? 🔥🏠 (hint: Adele song)",
        options: ["Hello", "Rolling in the Deep", "Set Fire to the Rain", "Someone Like You"],
        correctAnswer: 2,
      },
      {
        question: "What song do these emojis represent? 👶🦈 (hint: viral kids' song)",
        options: ["Baby One More Time", "Baby Shark", "Baby", "Ice Ice Baby"],
        correctAnswer: 1,
      },
      {
        question: "What song do these emojis represent? 🌧️💜 (hint: Prince classic)",
        options: ["Kiss", "1999", "Purple Rain", "When Doves Cry"],
        correctAnswer: 2,
      },
      {
        question: "What song do these emojis represent? 🎄🔔 (hint: Christmas classic)",
        options: ["Silent Night", "Jingle Bells", "Deck the Halls", "White Christmas"],
        correctAnswer: 1,
      },
      {
        question: "What artist do these emojis represent? 🕷️🧑 (hint: 'Across the Spider-Verse' rapper)",
        options: ["Drake", "Eminem", "Post Malone", "Metro Boomin"],
        correctAnswer: 2,
      },
      {
        question: "What song do these emojis represent? ⬆️📺🎶 (hint: Bruno Mars)",
        options: ["24K Magic", "Treasure", "Uptown Funk", "Just the Way You Are"],
        correctAnswer: 2,
      },
      {
        question: "What song do these emojis represent? 💃🌙 (hint: 'Dancing in the...')",
        options: [
          "Dancing in the Dark",
          "Dancing in the Moonlight",
          "Moonlight Sonata",
          "Dancing Queen",
        ],
        correctAnswer: 1,
      },
      {
        question: "What song do these emojis represent? ❄️❄️👶 (hint: Vanilla...)",
        options: ["Cold as Ice", "Frozen", "Ice Ice Baby", "Snowman"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "music-instruments",
    title: "Name That Instrument Quiz",
    description: "How well do you know musical instruments from around the world?",
    category: "Music",
    emoji: "🎸",
    questions: [
      {
        question: "Which instrument has 88 keys?",
        options: ["Accordion", "Organ", "Piano", "Harpsichord"],
        correctAnswer: 2,
      },
      {
        question: "What family of instruments does the violin belong to?",
        options: ["Woodwind", "Brass", "Percussion", "String"],
        correctAnswer: 3,
      },
      {
        question: "Which instrument do you play by blowing into a reed?",
        options: ["Flute", "Trumpet", "Clarinet", "Tuba"],
        correctAnswer: 2,
      },
      {
        question: "What is the largest instrument in a standard orchestra?",
        options: ["Tuba", "Double bass", "Grand piano", "Harp"],
        correctAnswer: 1,
      },
      {
        question: "Which Hawaiian instrument has four strings?",
        options: ["Banjo", "Mandolin", "Ukulele", "Sitar"],
        correctAnswer: 2,
      },
      {
        question: "What type of instrument is a xylophone?",
        options: ["String", "Woodwind", "Brass", "Percussion"],
        correctAnswer: 3,
      },
      {
        question: "Which instrument is also called 'the axe' in slang by musicians?",
        options: ["Drums", "Electric guitar", "Saxophone", "Keyboard"],
        correctAnswer: 1,
      },
      {
        question: "How many strings does a standard guitar have?",
        options: ["4", "5", "6", "8"],
        correctAnswer: 2,
      },
      {
        question: "Which instrument is shaped like a large spiral and used in orchestras?",
        options: ["Trombone", "French horn", "Trumpet", "Euphonium"],
        correctAnswer: 1,
      },
      {
        question: "What instrument does a DJ typically use to mix music?",
        options: ["Piano", "Guitar", "Turntables", "Drums"],
        correctAnswer: 2,
      },
    ],
  },
];
