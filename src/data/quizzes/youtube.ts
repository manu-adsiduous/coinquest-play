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

export const youtubeQuizzes: Quiz[] = [
  {
    id: "yt-mrbeast",
    title: "MrBeast Challenges & Videos Quiz",
    description: "How well do you know MrBeast's epic challenges and viral videos?",
    category: "YouTube",
    emoji: "🤑",
    questions: [
      {
        question: "What is MrBeast's real first name?",
        options: ["James", "Jimmy", "Jason", "Jake"],
        correctAnswer: 1,
      },
      {
        question: "MrBeast is famous for giving away huge amounts of what?",
        options: ["Cars", "Houses", "Money", "Food"],
        correctAnswer: 2,
      },
      {
        question: "What challenge did MrBeast recreate from a popular Netflix show?",
        options: ["Squid Game", "Survivor", "The Floor Is Lava", "Wipeout"],
        correctAnswer: 0,
      },
      {
        question: "What is the name of MrBeast's chocolate bar brand?",
        options: ["Beast Bars", "Feastables", "MrChocolate", "Beast Bites"],
        correctAnswer: 1,
      },
      {
        question: "How many days did MrBeast spend buried alive in a coffin?",
        options: ["3 days", "5 days", "7 days", "10 days"],
        correctAnswer: 2,
      },
      {
        question: "What did MrBeast count to in one of his earliest viral videos?",
        options: ["10,000", "50,000", "100,000", "1,000,000"],
        correctAnswer: 2,
      },
      {
        question: "What is the name of MrBeast's food charity channel?",
        options: ["Beast Kitchen", "Beast Philanthropy", "MrBeast Feeds", "Feed the World"],
        correctAnswer: 1,
      },
      {
        question: "In the 'Last To Leave' challenges, what happens to the winner?",
        options: [
          "They get a trophy",
          "They become famous",
          "They win a large cash prize",
          "They get a free vacation",
        ],
        correctAnswer: 2,
      },
      {
        question: "What record did MrBeast break on YouTube in 2022?",
        options: [
          "Most subscribers ever",
          "Most viewed video in 24 hours",
          "Longest livestream",
          "Most comments on a video",
        ],
        correctAnswer: 1,
      },
      {
        question: "What did MrBeast open that went viral with massive lines of customers?",
        options: ["A car dealership", "A burger restaurant", "A theme park", "A clothing store"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "yt-dream-smp",
    title: "Dream SMP Lore & Members Trivia",
    description: "Test your knowledge of the Dream SMP world, characters, and storylines!",
    category: "YouTube",
    emoji: "💚",
    questions: [
      {
        question: "Who created the Dream SMP Minecraft server?",
        options: ["GeorgeNotFound", "Dream", "TommyInnit", "Wilbur Soot"],
        correctAnswer: 1,
      },
      {
        question: "What nation did Wilbur Soot found on the Dream SMP?",
        options: ["Manberg", "L'Manburg", "Pogtopia", "Snowchester"],
        correctAnswer: 1,
      },
      {
        question: "What color is Dream's iconic smiley face mask?",
        options: ["Blue", "Red", "White", "Green"],
        correctAnswer: 2,
      },
      {
        question: "Which member is known for shouting 'TOMMY!' on the server?",
        options: ["Tubbo", "Wilbur Soot", "TommyInnit", "Technoblade"],
        correctAnswer: 2,
      },
      {
        question: "What was Technoblade's famous catchphrase?",
        options: [
          "Blood for the Blood God",
          "Dream is overrated",
          "Subscribe to Techno",
          "Potatoes forever",
        ],
        correctAnswer: 0,
      },
      {
        question: "What item are the discs that Tommy and Dream fought over?",
        options: ["Gold records", "Music discs", "Enchanted books", "Ender pearls"],
        correctAnswer: 1,
      },
      {
        question: "Who blew up L'Manburg with TNT and withers?",
        options: ["Dream", "Technoblade and Dream", "Wilbur Soot", "TommyInnit"],
        correctAnswer: 1,
      },
      {
        question: "What is Ranboo's character known for being?",
        options: ["A creeper hybrid", "An enderman hybrid", "A zombie hybrid", "A skeleton hybrid"],
        correctAnswer: 1,
      },
      {
        question: "Who is Tubbo's best friend on the Dream SMP?",
        options: ["Dream", "Ranboo", "TommyInnit", "Fundy"],
        correctAnswer: 2,
      },
      {
        question: "What prison was built to hold Dream?",
        options: ["The Vault", "Pandora's Vault", "The End Prison", "Obsidian Keep"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "yt-pewdiepie",
    title: "PewDiePie Memes & Milestones Quiz",
    description: "How much do you know about the legendary PewDiePie?",
    category: "YouTube",
    emoji: "👊",
    questions: [
      {
        question: "What country is PewDiePie originally from?",
        options: ["Norway", "Denmark", "Sweden", "Finland"],
        correctAnswer: 2,
      },
      {
        question: "What is PewDiePie's real name?",
        options: ["Felix Arvid Ulf Kjellberg", "Felix Anderson", "Felix Berg", "Felix Johansson"],
        correctAnswer: 0,
      },
      {
        question: "What does PewDiePie call his fans?",
        options: ["Bros", "Pewds", "9-year-olds", "The Army"],
        correctAnswer: 2,
      },
      {
        question: "PewDiePie had a famous subscriber battle with which channel?",
        options: ["MrBeast", "T-Series", "Cocomelon", "Dude Perfect"],
        correctAnswer: 1,
      },
      {
        question: "What was the name of PewDiePie's Minecraft series that went viral?",
        options: [
          "Minecraft Monday",
          "PewDiePie's Minecraft Let's Play",
          "Gaming Week",
          "Minecraft Epic",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is the name of PewDiePie's pet pug?",
        options: ["Edgar", "Buddy", "Biscuit", "Sven"],
        correctAnswer: 0,
      },
      {
        question: "What show did PewDiePie host reviewing memes submitted by fans?",
        options: ["Meme Machine", "LWIAY", "Meme Central", "PewNews"],
        correctAnswer: 1,
      },
      {
        question: "What virtual pet did PewDiePie name 'Sven' in Minecraft?",
        options: ["A cat", "A parrot", "A wolf/dog", "A horse"],
        correctAnswer: 2,
      },
      {
        question: "PewDiePie was the first individual YouTuber to reach how many subscribers?",
        options: ["50 million", "80 million", "100 million", "111 million"],
        correctAnswer: 2,
      },
      {
        question: "What does 'LWIAY' stand for?",
        options: [
          "Laughing With Interesting Awesome YouTubers",
          "Last Week I Asked You",
          "Let's Watch Incredibly Amazing YouTube",
          "Living With It All Year",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "yt-skibidi",
    title: "Skibidi Toilet Universe Quiz",
    description: "How much do you know about the Skibidi Toilet cinematic universe?",
    category: "YouTube",
    emoji: "🚽",
    questions: [
      {
        question: "Who created the Skibidi Toilet series?",
        options: ["DaFuq!?Boom!", "MrBeast", "Dream", "CookieSwirlC"],
        correctAnswer: 0,
      },
      {
        question: "What comes out of the toilets in Skibidi Toilet?",
        options: ["Arms", "Heads", "Tentacles", "Robots"],
        correctAnswer: 1,
      },
      {
        question: "What are the main enemies of the Skibidi Toilets?",
        options: ["Plumber Army", "Cameramen and Speakermen", "Robot Warriors", "Toilet Hunters"],
        correctAnswer: 1,
      },
      {
        question: "What do the Cameramen have instead of heads?",
        options: ["Speakers", "Cameras", "TVs", "Microphones"],
        correctAnswer: 1,
      },
      {
        question: "What type of allies joined the fight alongside the Cameramen?",
        options: ["Phonemen", "TV Men", "Radiomen", "Laptopmen"],
        correctAnswer: 1,
      },
      {
        question: "What game engine is used to create Skibidi Toilet episodes?",
        options: ["Unreal Engine", "Unity", "Source Filmmaker", "Blender"],
        correctAnswer: 2,
      },
      {
        question: "What happens when a Cameraman gets infected by a Skibidi Toilet?",
        options: [
          "They explode",
          "They turn evil and switch sides",
          "They shrink",
          "They become invisible",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is the giant Skibidi Toilet boss called?",
        options: ["Mega Toilet", "G-Man Skibidi Toilet", "King Toilet", "Ultra Skibidi"],
        correctAnswer: 1,
      },
      {
        question: "What platform did Skibidi Toilet originally go viral on?",
        options: ["TikTok", "Instagram", "YouTube Shorts", "Snapchat"],
        correctAnswer: 2,
      },
      {
        question: "The Skibidi Toilet series is known for having no what?",
        options: ["Music", "Color", "Dialogue/words", "Sound effects"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "yt-roblox-youtubers",
    title: "Popular Roblox YouTubers Trivia",
    description: "How well do you know the biggest Roblox content creators?",
    category: "YouTube",
    emoji: "🎮",
    questions: [
      {
        question: "Which Roblox YouTuber is known for playing Brookhaven and has a pink aesthetic?",
        options: ["Leah Ashe", "ItsFunneh", "Meganplays", "Zailetsplay"],
        correctAnswer: 0,
      },
      {
        question: "What is Flamingo's real first name?",
        options: ["Albert", "Alex", "Andrew", "Aaron"],
        correctAnswer: 0,
      },
      {
        question: "Which YouTuber is famous for the 'Roblox Adopt Me' trading videos?",
        options: ["Flamingo", "KreekCraft", "ItsFunneh", "Meganplays"],
        correctAnswer: 2,
      },
      {
        question: "What Roblox game does KreekCraft frequently play and make videos about?",
        options: ["Brookhaven", "Piggy", "Tower of Hell", "Blox Fruits"],
        correctAnswer: 1,
      },
      {
        question: "Which YouTuber plays Roblox with their siblings as 'The Krew'?",
        options: ["Flamingo", "ItsFunneh", "Denis", "Poke"],
        correctAnswer: 1,
      },
      {
        question: "What type of Roblox content is Denis (DefildPlays) known for?",
        options: [
          "Horror games",
          "Funny moments and challenges",
          "Speedruns",
          "Building tutorials",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which popular Roblox game features fruit-based powers?",
        options: ["Adopt Me", "Blox Fruits", "Brookhaven", "Murder Mystery"],
        correctAnswer: 1,
      },
      {
        question: "What is Flamingo's YouTube channel originally called before rebranding?",
        options: ["AlbertsStuff", "FlamingoBro", "RobloxKing", "AlbertPlays"],
        correctAnswer: 0,
      },
      {
        question: "Which Roblox YouTuber is known for trolling other players?",
        options: ["ItsFunneh", "Flamingo", "KreekCraft", "Meganplays"],
        correctAnswer: 1,
      },
      {
        question: "What Roblox game lets you roleplay living in a house with a family?",
        options: ["Jailbreak", "Brookhaven", "Tower of Hell", "Piggy"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "yt-mc-youtubers",
    title: "Minecraft YouTubers Challenge",
    description: "Test your knowledge of the most famous Minecraft content creators!",
    category: "YouTube",
    emoji: "⛏️",
    questions: [
      {
        question: "Which Minecraft YouTuber is famous for 'Manhunt' videos?",
        options: ["Technoblade", "Dream", "Stampy", "DanTDM"],
        correctAnswer: 1,
      },
      {
        question: "What is DanTDM's full YouTube name?",
        options: [
          "Dan The Diamond Minecart",
          "Dan The Dude Man",
          "Dan The Dedicated Miner",
          "Dan The Dungeon Master",
        ],
        correctAnswer: 0,
      },
      {
        question: "Which Minecraft YouTuber had a famous 'Lovely World' survival series?",
        options: ["Dream", "Stampy", "PopularMMOs", "CaptainSparklez"],
        correctAnswer: 1,
      },
      {
        question: "What song by CaptainSparklez became one of the most viewed Minecraft videos?",
        options: ["Creeper Blues", "Revenge", "Mine Diamonds", "TNT"],
        correctAnswer: 1,
      },
      {
        question: "What is Technoblade's famous quote about winning?",
        options: [
          "Winners never quit",
          "Technoblade never dies",
          "Victory royale",
          "I always win",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which duo was famous for their 'Lucky Block' and 'Mod Showcase' videos?",
        options: [
          "Dream and George",
          "PopularMMOs and GamingWithJen",
          "Stampy and Squid",
          "Dan and Trayaurus",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is the name of Stampy's Minecraft helper who is an orange cat?",
        options: ["Stampy Cat", "Mr. Whiskers", "Stampy himself", "Gregory"],
        correctAnswer: 2,
      },
      {
        question: "Which YouTuber is known for building incredible Minecraft creations with Grian?",
        options: ["Mumbo Jumbo", "Dream", "Skeppy", "Technoblade"],
        correctAnswer: 0,
      },
      {
        question: "What Minecraft server do Hermitcraft members play on together?",
        options: ["Hypixel", "Hermitcraft SMP", "Mineplex", "Dream SMP"],
        correctAnswer: 1,
      },
      {
        question: "Skeppy is known for trolling which Minecraft YouTuber the most?",
        options: ["Dream", "BadBoyHalo", "Technoblade", "TommyInnit"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "yt-shorts",
    title: "YouTube Shorts Viral Trends Quiz",
    description: "How well do you know the biggest YouTube Shorts trends and challenges?",
    category: "YouTube",
    emoji: "📱",
    questions: [
      {
        question: "What is the maximum length of a YouTube Short?",
        options: ["30 seconds", "60 seconds", "90 seconds", "3 minutes"],
        correctAnswer: 1,
      },
      {
        question: "Which viral trend involves guessing items by touch while blindfolded?",
        options: ["Guess the Sound", "What's in the Box", "Touch and Guess", "Blind Test"],
        correctAnswer: 1,
      },
      {
        question: "What type of satisfying content frequently goes viral on Shorts?",
        options: [
          "Cooking tutorials",
          "Slime and soap cutting",
          "Book reviews",
          "Weather reports",
        ],
        correctAnswer: 1,
      },
      {
        question: "The 'Would You Rather' trend on Shorts asks viewers to choose between what?",
        options: [
          "Two difficult choices",
          "True or false",
          "Colors",
          "Animals",
        ],
        correctAnswer: 0,
      },
      {
        question: "What challenge involves showing your screen time to the camera?",
        options: [
          "Phone Check Challenge",
          "Screen Time Challenge",
          "Digital Detox Challenge",
          "App Reveal Challenge",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which format features a split-screen with gameplay below and a story above?",
        options: [
          "Reaction videos",
          "Subway Surfers/Minecraft parkour storytelling",
          "Tutorials",
          "Music videos",
        ],
        correctAnswer: 1,
      },
      {
        question: "What 'brain rot' meme phrase became hugely popular through YouTube Shorts?",
        options: [
          "No cap",
          "Skibidi toilet",
          "Slay queen",
          "It's giving",
        ],
        correctAnswer: 1,
      },
      {
        question: "What does 'rizz' mean in YouTube Shorts slang?",
        options: ["Being funny", "Charm or charisma", "Being athletic", "Being smart"],
        correctAnswer: 1,
      },
      {
        question: "Which trend involves people ranking things in tier lists on Shorts?",
        options: ["Rate My Tier", "Tier List Challenge", "Rank It", "Sort and Score"],
        correctAnswer: 1,
      },
      {
        question: "What feature lets YouTube Shorts creators add trending songs to their videos?",
        options: ["Sound Library", "Audio Mixer", "Music Sync", "Beat Drop"],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: "yt-streamers",
    title: "Gaming Streamers: Who Said It?",
    description: "Can you guess which famous gaming streamer said these iconic lines?",
    category: "YouTube",
    emoji: "🎙️",
    questions: [
      {
        question: "Which streamer is famous for yelling 'WHAT A SAVE!' while playing Rocket League?",
        options: ["Ninja", "SypherPK", "Musty", "Squishy Muffinz"],
        correctAnswer: 2,
      },
      {
        question: "Which gaming streamer became famous playing Fortnite and has blue hair?",
        options: ["Tfue", "Ninja", "TimTheTatman", "DrLupo"],
        correctAnswer: 1,
      },
      {
        question: "What platform did most gaming streamers originally become famous on?",
        options: ["YouTube", "Twitch", "Facebook Gaming", "TikTok"],
        correctAnswer: 1,
      },
      {
        question: "Which streamer is known for the catchphrase 'GG' after every match?",
        options: [
          "All of them",
          "Only Ninja",
          "Only Pokimane",
          "Only Shroud",
        ],
        correctAnswer: 0,
      },
      {
        question: "Pokimane is one of the most popular streamers playing which types of games?",
        options: [
          "Horror only",
          "Variety/multiple genres",
          "Only Minecraft",
          "Only Fortnite",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which streamer is known as one of the best FPS aimers and was a CS:GO pro?",
        options: ["Ninja", "Shroud", "TimTheTatman", "DrDisrespect"],
        correctAnswer: 1,
      },
      {
        question: "What does 'poggers' mean in streaming culture?",
        options: [
          "Something boring",
          "Something exciting or amazing",
          "A type of game",
          "A donation",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which streamer duo is famous for their Minecraft 'Hardcore' series on YouTube?",
        options: [
          "Dream and George",
          "Ph1LzA and Technoblade",
          "PewDiePie and Jack",
          "Markiplier and Wade",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is a 'sub' in streaming terms?",
        options: [
          "A submarine game",
          "A subscription to support a streamer",
          "A substitute player",
          "A subtitle setting",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which streamer is known for playing horror games and screaming loudly?",
        options: ["Shroud", "Markiplier", "Ninja", "SypherPK"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "yt-preston",
    title: "Preston & Brianna Trivia",
    description: "How well do you know Preston, Brianna, and their awesome content?",
    category: "YouTube",
    emoji: "🔥",
    questions: [
      {
        question: "What is Preston's full YouTube channel name?",
        options: ["PrestonGamez", "PrestonPlayz", "PrestonCraft", "PrestonFire"],
        correctAnswer: 1,
      },
      {
        question: "What game did Preston originally become famous for playing?",
        options: ["Fortnite", "Roblox", "Minecraft", "Among Us"],
        correctAnswer: 2,
      },
      {
        question: "What is the name of Preston's wife who also makes YouTube videos?",
        options: ["Becca", "Brianna", "Brooke", "Bella"],
        correctAnswer: 1,
      },
      {
        question: "What type of Minecraft videos is Preston best known for?",
        options: [
          "Speedruns",
          "Trolling and pranks with friends",
          "Redstone tutorials",
          "Survival only",
        ],
        correctAnswer: 1,
      },
      {
        question: "Preston has multiple YouTube channels. Which is NOT one of them?",
        options: ["PrestonPlayz", "TBNRfrags", "Preston Reacts", "PrestonCosmo"],
        correctAnswer: 3,
      },
      {
        question: "What does 'TBNR' stand for in Preston's channel TBNRfrags?",
        options: [
          "The Best Noob Reactor",
          "The Best Never Rest",
          "Totally Brilliant New Records",
          "The Boy Never Rages",
        ],
        correctAnswer: 1,
      },
      {
        question: "What kind of challenge videos do Preston and Brianna often do together?",
        options: [
          "Cooking competitions",
          "Extreme sports",
          "Couples challenges and pranks",
          "Science experiments only",
        ],
        correctAnswer: 2,
      },
      {
        question: "Which Roblox game does Preston frequently make videos about?",
        options: ["Adopt Me", "Blox Fruits", "Brookhaven", "Tower of Hell"],
        correctAnswer: 1,
      },
      {
        question: "What is Preston's typical video style?",
        options: [
          "Calm and quiet",
          "High energy and enthusiastic",
          "Silent gameplay",
          "News reporting",
        ],
        correctAnswer: 1,
      },
      {
        question: "Preston often does 'unspeakable' challenges. What does that usually mean?",
        options: [
          "He can't talk",
          "The challenges are extreme or crazy",
          "He whispers the whole time",
          "He plays with no sound",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "yt-react",
    title: "SSSniperwolf & React Content Quiz",
    description: "Test your knowledge about SSSniperwolf and the world of reaction videos!",
    category: "YouTube",
    emoji: "😲",
    questions: [
      {
        question: "What type of content is SSSniperwolf most famous for?",
        options: ["Gaming only", "Reaction videos", "Cooking shows", "Music videos"],
        correctAnswer: 1,
      },
      {
        question: "What is SSSniperwolf's real first name?",
        options: ["Sarah", "Alia", "Lisa", "Mia"],
        correctAnswer: 1,
      },
      {
        question: "SSSniperwolf's channel name comes from a character in which video game?",
        options: ["Call of Duty", "Metal Gear Solid", "Halo", "Fortnite"],
        correctAnswer: 1,
      },
      {
        question: "What phrase does SSSniperwolf often say at the start of her videos?",
        options: [
          "Hey guys, what's up",
          "Hey what's up you guys",
          "Yo what's good everyone",
          "Hello beautiful people",
        ],
        correctAnswer: 1,
      },
      {
        question: "React channels typically feature creators doing what to other videos?",
        options: [
          "Editing them",
          "Watching and commenting on them",
          "Deleting them",
          "Re-uploading them",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which brothers are famous for their 'Try Not To Laugh' reaction videos?",
        options: [
          "The Dolan Twins",
          "The Merrell Twins",
          "The Stokes Twins",
          "The Fine Brothers",
        ],
        correctAnswer: 3,
      },
      {
        question: "What does 'TikTok reaction' content usually involve?",
        options: [
          "Making TikTok dances",
          "Watching and reacting to viral TikTok clips",
          "Deleting TikTok",
          "Teaching TikTok skills",
        ],
        correctAnswer: 1,
      },
      {
        question: "SSSniperwolf frequently reacts to videos about what amazing skill?",
        options: [
          "Painting",
          "Oddly satisfying content and life hacks",
          "Singing",
          "Skateboarding",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is a common format in react content where you must stay serious?",
        options: [
          "Try Not to Cry",
          "Try Not to Laugh",
          "Try Not to Dance",
          "All of the above",
        ],
        correctAnswer: 3,
      },
      {
        question: "How many subscribers did SSSniperwolf reach, making her one of the biggest female YouTubers?",
        options: ["10 million", "20 million", "30 million", "40 million"],
        correctAnswer: 2,
      },
    ],
  },
];
