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

export const sportsQuizzes: Quiz[] = [
  {
    id: "sports-soccer",
    title: "FIFA & Soccer Legends Quiz",
    description: "Test your knowledge of soccer history and legendary players!",
    category: "Sports",
    emoji: "⚽",
    questions: [
      {
        question: "Which country has won the most FIFA World Cup titles?",
        options: ["Germany", "Argentina", "Brazil", "Italy"],
        correctAnswer: 2,
      },
      {
        question: "Who is the all-time top scorer in FIFA World Cup history?",
        options: ["Pele", "Miroslav Klose", "Ronaldo", "Lionel Messi"],
        correctAnswer: 1,
      },
      {
        question: "How many players are on a soccer team on the field at one time?",
        options: ["9", "10", "11", "12"],
        correctAnswer: 2,
      },
      {
        question: "Which player is known as 'CR7'?",
        options: ["Carlos Ruiz", "Cristiano Ronaldo", "Carles Riquelme", "Claudio Reyna"],
        correctAnswer: 1,
      },
      {
        question: "What is the highest-scoring World Cup final of all time?",
        options: [
          "Brazil 5-2 Sweden (1958)",
          "England 4-2 West Germany (1966)",
          "France 4-2 Croatia (2018)",
          "West Germany 3-2 Hungary (1954)",
        ],
        correctAnswer: 0,
      },
      {
        question: "Which country hosted the first ever FIFA World Cup in 1930?",
        options: ["Brazil", "France", "Uruguay", "Italy"],
        correctAnswer: 2,
      },
      {
        question: "What color card does a referee show for a serious foul?",
        options: ["Yellow", "Red", "Green", "Blue"],
        correctAnswer: 1,
      },
      {
        question: "Which club has won the most UEFA Champions League titles?",
        options: ["Barcelona", "AC Milan", "Real Madrid", "Liverpool"],
        correctAnswer: 2,
      },
      {
        question: "What is the nickname of the Brazilian soccer legend Edson Arantes do Nascimento?",
        options: ["Neymar", "Ronaldinho", "Pele", "Zico"],
        correctAnswer: 2,
      },
      {
        question: "How long is a standard professional soccer match (without extra time)?",
        options: ["60 minutes", "80 minutes", "90 minutes", "100 minutes"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "sports-nba",
    title: "NBA Basketball Stars Trivia",
    description: "How well do you know the NBA and its greatest players?",
    category: "Sports",
    emoji: "🏀",
    questions: [
      {
        question: "Which player is known as 'King James'?",
        options: ["James Harden", "LeBron James", "Kevin Durant", "Kobe Bryant"],
        correctAnswer: 1,
      },
      {
        question: "How high is a regulation NBA basketball hoop?",
        options: ["8 feet", "9 feet", "10 feet", "11 feet"],
        correctAnswer: 2,
      },
      {
        question: "Which team did Michael Jordan win six championships with?",
        options: ["LA Lakers", "Boston Celtics", "Chicago Bulls", "Miami Heat"],
        correctAnswer: 2,
      },
      {
        question: "What is a 'triple-double' in basketball?",
        options: [
          "Scoring three 3-pointers in a row",
          "Double digits in three statistical categories",
          "Three dunks in one quarter",
          "Winning three games in a row by double digits",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which player has the most career points in NBA history?",
        options: ["Kobe Bryant", "Michael Jordan", "Kareem Abdul-Jabbar", "LeBron James"],
        correctAnswer: 3,
      },
      {
        question: "How many players from each team are on the court during a game?",
        options: ["4", "5", "6", "7"],
        correctAnswer: 1,
      },
      {
        question: "Which NBA player is famous for his 'skyhook' shot?",
        options: ["Wilt Chamberlain", "Kareem Abdul-Jabbar", "Shaquille O'Neal", "Hakeem Olajuwon"],
        correctAnswer: 1,
      },
      {
        question: "What team drafted Stephen Curry in 2009?",
        options: ["New York Knicks", "Golden State Warriors", "Charlotte Bobcats", "Sacramento Kings"],
        correctAnswer: 1,
      },
      {
        question: "How many points is a shot from beyond the three-point line worth?",
        options: ["1 point", "2 points", "3 points", "4 points"],
        correctAnswer: 2,
      },
      {
        question: "Which team has won the most NBA championships?",
        options: ["LA Lakers", "Chicago Bulls", "Boston Celtics", "Golden State Warriors"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "sports-olympics",
    title: "Olympic Games Fun Facts Quiz",
    description: "Discover fun facts about the Olympic Games past and present!",
    category: "Sports",
    emoji: "🥇",
    questions: [
      {
        question: "Where were the first modern Olympic Games held in 1896?",
        options: ["Rome, Italy", "Paris, France", "Athens, Greece", "London, England"],
        correctAnswer: 2,
      },
      {
        question: "How many rings are on the Olympic flag?",
        options: ["3", "4", "5", "6"],
        correctAnswer: 2,
      },
      {
        question: "Which swimmer has won the most Olympic gold medals ever?",
        options: ["Mark Spitz", "Michael Phelps", "Ian Thorpe", "Ryan Lochte"],
        correctAnswer: 1,
      },
      {
        question: "What do the five Olympic rings represent?",
        options: [
          "Five sports",
          "Five continents",
          "Five founding countries",
          "Five Olympic values",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which city has hosted the most Olympic Games?",
        options: ["Paris", "Tokyo", "London", "Los Angeles"],
        correctAnswer: 2,
      },
      {
        question: "What is the motto of the Olympic Games?",
        options: [
          "Faster, Higher, Stronger",
          "Unity, Peace, Friendship",
          "Victory, Honor, Glory",
          "Play, Compete, Win",
        ],
        correctAnswer: 0,
      },
      {
        question: "Which sport was added to the Olympics in Tokyo 2020?",
        options: ["Surfing", "Cricket", "Squash", "Bowling"],
        correctAnswer: 0,
      },
      {
        question: "Which athlete is known as the fastest man in the world?",
        options: ["Carl Lewis", "Usain Bolt", "Tyson Gay", "Yohan Blake"],
        correctAnswer: 1,
      },
      {
        question: "How often are the Summer Olympic Games held?",
        options: ["Every 2 years", "Every 3 years", "Every 4 years", "Every 5 years"],
        correctAnswer: 2,
      },
      {
        question: "Which country has won the most Olympic medals in total?",
        options: ["China", "Russia", "Great Britain", "United States"],
        correctAnswer: 3,
      },
    ],
  },
  {
    id: "sports-esports",
    title: "Esports Teams & Players Challenge",
    description: "Test your knowledge of competitive gaming and esports!",
    category: "Sports",
    emoji: "🎮",
    questions: [
      {
        question: "What game is 'The International' tournament associated with?",
        options: ["League of Legends", "Dota 2", "Counter-Strike", "Overwatch"],
        correctAnswer: 1,
      },
      {
        question: "Which battle royale game hosts the Fortnite World Cup?",
        options: ["Apex Legends", "PUBG", "Fortnite", "Call of Duty Warzone"],
        correctAnswer: 2,
      },
      {
        question: "What does 'GG' stand for in gaming?",
        options: ["Get Going", "Good Game", "Great Goal", "Go Grind"],
        correctAnswer: 1,
      },
      {
        question: "Which esports organization is known by the abbreviation 'T1'?",
        options: ["Team One", "T1 Entertainment & Sports", "Titan First", "Top 1 Gaming"],
        correctAnswer: 1,
      },
      {
        question: "In League of Legends, how many players are on each team?",
        options: ["3", "4", "5", "6"],
        correctAnswer: 2,
      },
      {
        question: "Which game features characters like Tracer, Mercy, and Reinhardt?",
        options: ["Valorant", "Overwatch", "Paladins", "Team Fortress 2"],
        correctAnswer: 1,
      },
      {
        question: "What does 'FPS' stand for in gaming?",
        options: ["Fast Player Speed", "First Person Shooter", "Fun Playing System", "Full Power Strike"],
        correctAnswer: 1,
      },
      {
        question: "Which country is considered the birthplace of modern esports?",
        options: ["United States", "Japan", "South Korea", "China"],
        correctAnswer: 2,
      },
      {
        question: "What game features a competitive mode called 'Ranked' with divisions like Iron, Bronze, and Silver?",
        options: ["Fortnite", "Minecraft", "Valorant", "Roblox"],
        correctAnswer: 2,
      },
      {
        question: "What is the name of the annual League of Legends World Championship?",
        options: ["The Summit", "Worlds", "The Grand Finals", "League Cup"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "sports-nfl",
    title: "NFL Football Basics Quiz",
    description: "How much do you know about American football and the NFL?",
    category: "Sports",
    emoji: "🏈",
    questions: [
      {
        question: "What is the championship game of the NFL called?",
        options: ["The Finals", "World Series", "Super Bowl", "Grand Championship"],
        correctAnswer: 2,
      },
      {
        question: "How many points is a touchdown worth?",
        options: ["3 points", "5 points", "6 points", "7 points"],
        correctAnswer: 2,
      },
      {
        question: "How many players from each team are on the field during a play?",
        options: ["9", "10", "11", "12"],
        correctAnswer: 2,
      },
      {
        question: "Which team has won the most Super Bowls?",
        options: ["Dallas Cowboys", "New England Patriots", "Pittsburgh Steelers", "San Francisco 49ers"],
        correctAnswer: 1,
      },
      {
        question: "What is the line the offense must cross to score a touchdown called?",
        options: ["Finish line", "Goal line", "End line", "Score line"],
        correctAnswer: 1,
      },
      {
        question: "How long is an NFL football field (not including end zones)?",
        options: ["80 yards", "90 yards", "100 yards", "120 yards"],
        correctAnswer: 2,
      },
      {
        question: "What is it called when a defensive player catches a pass meant for the offense?",
        options: ["Fumble", "Sack", "Interception", "Block"],
        correctAnswer: 2,
      },
      {
        question: "Which quarterback is known for winning seven Super Bowls?",
        options: ["Peyton Manning", "Joe Montana", "Tom Brady", "Aaron Rodgers"],
        correctAnswer: 2,
      },
      {
        question: "How many downs does a team get to move the ball 10 yards?",
        options: ["2", "3", "4", "5"],
        correctAnswer: 2,
      },
      {
        question: "What is the halftime show at the Super Bowl famous for?",
        options: [
          "Comedy acts",
          "Major musical performances",
          "Magic shows",
          "Movie premieres",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "sports-extreme",
    title: "Extreme Sports & Stunts Trivia",
    description: "How much do you know about the wildest sports on the planet?",
    category: "Sports",
    emoji: "🏂",
    questions: [
      {
        question: "What extreme sport involves jumping off tall structures with an elastic cord?",
        options: ["Skydiving", "Bungee jumping", "Base jumping", "Paragliding"],
        correctAnswer: 1,
      },
      {
        question: "What does BMX stand for?",
        options: ["Big Motor Cross", "Bicycle Motocross", "Bike Maximum Extreme", "Basic Mountain Cross"],
        correctAnswer: 1,
      },
      {
        question: "Which famous skateboarder landed the first 900 (two and a half mid-air spins)?",
        options: ["Rodney Mullen", "Tony Hawk", "Nyjah Huston", "Bob Burnquist"],
        correctAnswer: 1,
      },
      {
        question: "In surfing, what is a 'barrel' or 'tube'?",
        options: [
          "A type of surfboard",
          "Riding inside a hollow wave",
          "A surfing competition",
          "A wipeout move",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is the name of the extreme sports competition hosted by ESPN?",
        options: ["Extreme Games", "X Games", "Action Sports Cup", "Thrill Olympics"],
        correctAnswer: 1,
      },
      {
        question: "What extreme sport involves riding a board down snowy mountains?",
        options: ["Skiing", "Snowboarding", "Sledding", "Ice skating"],
        correctAnswer: 1,
      },
      {
        question: "What does BASE stand for in BASE jumping?",
        options: [
          "Building, Antenna, Span, Earth",
          "Bold, Aerial, Stunt, Extreme",
          "Brave, Air, Sky, Edge",
          "Big, Awesome, Scary, Epic",
        ],
        correctAnswer: 0,
      },
      {
        question: "Which extreme sport involves navigating whitewater rapids in an inflatable boat?",
        options: ["Kayaking", "Canoeing", "Whitewater rafting", "Jet skiing"],
        correctAnswer: 2,
      },
      {
        question: "What is parkour?",
        options: [
          "A martial art",
          "Moving through obstacles by running, jumping, and climbing",
          "An extreme cycling sport",
          "A type of rock climbing",
        ],
        correctAnswer: 1,
      },
      {
        question: "At what approximate speed can a skydiver fall before opening their parachute?",
        options: ["50 mph", "80 mph", "120 mph", "200 mph"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "sports-wwe",
    title: "Wrestling (WWE) Superstars Quiz",
    description: "Do you know the legends and stars of WWE wrestling?",
    category: "Sports",
    emoji: "💪",
    questions: [
      {
        question: "What is The Rock's famous catchphrase?",
        options: [
          "And that's the bottom line!",
          "Can you smell what The Rock is cooking?",
          "You can't see me!",
          "Whatcha gonna do, brother?",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which WWE superstar is known for the 'RKO' finishing move?",
        options: ["John Cena", "Triple H", "Randy Orton", "Edge"],
        correctAnswer: 2,
      },
      {
        question: "What is the biggest WWE event of the year called?",
        options: ["Royal Rumble", "SummerSlam", "WrestleMania", "Survivor Series"],
        correctAnswer: 2,
      },
      {
        question: "Which WWE superstar uses the catchphrase 'You can't see me'?",
        options: ["The Undertaker", "John Cena", "Roman Reigns", "Seth Rollins"],
        correctAnswer: 1,
      },
      {
        question: "What is the name of The Undertaker's signature move?",
        options: ["Chokeslam", "Tombstone Piledriver", "Last Ride", "All of the above"],
        correctAnswer: 3,
      },
      {
        question: "How many ropes surround a standard WWE wrestling ring?",
        options: ["2", "3", "4", "5"],
        correctAnswer: 1,
      },
      {
        question: "Which WWE superstar is also a famous Hollywood actor known for action movies?",
        options: ["Stone Cold Steve Austin", "The Rock (Dwayne Johnson)", "Batista", "Both B and C"],
        correctAnswer: 3,
      },
      {
        question: "What type of match involves multiple wrestlers entering at timed intervals?",
        options: ["Cage Match", "Ladder Match", "Royal Rumble", "Last Man Standing"],
        correctAnswer: 2,
      },
      {
        question: "Which legendary wrestler was known as 'The Heartbreak Kid'?",
        options: ["Bret Hart", "Shawn Michaels", "Ric Flair", "Macho Man Randy Savage"],
        correctAnswer: 1,
      },
      {
        question: "What does a wrestler need to do to win a standard pinfall match?",
        options: [
          "Throw opponent out of the ring",
          "Hold opponent's shoulders down for a 3-count",
          "Make opponent say 'I quit'",
          "Climb a ladder and grab the belt",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "sports-equipment",
    title: "Sports Equipment: Name That Sport!",
    description: "Can you match the equipment to the right sport?",
    category: "Sports",
    emoji: "🏸",
    questions: [
      {
        question: "Which sport uses a shuttlecock?",
        options: ["Tennis", "Badminton", "Squash", "Table Tennis"],
        correctAnswer: 1,
      },
      {
        question: "A 'puck' is used in which sport?",
        options: ["Field hockey", "Lacrosse", "Ice hockey", "Curling"],
        correctAnswer: 2,
      },
      {
        question: "Which sport uses a wicket?",
        options: ["Baseball", "Cricket", "Golf", "Polo"],
        correctAnswer: 1,
      },
      {
        question: "In which sport would you use a 'foil'?",
        options: ["Boxing", "Archery", "Fencing", "Javelin"],
        correctAnswer: 2,
      },
      {
        question: "A 'driver' and 'putter' are equipment used in which sport?",
        options: ["Tennis", "Croquet", "Golf", "Polo"],
        correctAnswer: 2,
      },
      {
        question: "Which sport requires a helmet, bat, and bases?",
        options: ["Cricket", "Softball", "Baseball", "Both B and C"],
        correctAnswer: 3,
      },
      {
        question: "A 'racket' and 'net' are essential for which of these sports?",
        options: ["Swimming", "Tennis", "Volleyball", "Both B and C"],
        correctAnswer: 1,
      },
      {
        question: "Which sport uses a 'vault' and 'balance beam'?",
        options: ["Gymnastics", "Track and field", "Diving", "Figure skating"],
        correctAnswer: 0,
      },
      {
        question: "Fins, goggles, and a cap are used in which sport?",
        options: ["Diving", "Water polo", "Swimming", "Snorkeling"],
        correctAnswer: 2,
      },
      {
        question: "A 'cue' and colored balls are used in which game?",
        options: ["Bowling", "Billiards/Pool", "Bocce", "Croquet"],
        correctAnswer: 1,
      },
    ],
  },
];
