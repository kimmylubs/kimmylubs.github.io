const BOOKS = [

  // ── Aladdin ───────────────────────────────────────────────────────────────
  {
    id: 'aladdin',
    title: 'Aladdin',
    emoji: '🧞',
    coverColor: '#FFF8DC',
    spineColor:  '#FF8C00',
    pages: [
      { scene: 's-agrabah',      char: '🏙️', text: 'In the bustling city of Agrabah,\na young boy named Aladdin\nlived on the streets.\n\nQuick, clever, and kind,\nhe survived by his wits.\nAnd by stealing bread.' },
      { scene: 's-desert-night', char: '🌙',  text: 'Aladdin\'s world changed\nwhen he met Princess Jasmine.\n\nShe had sneaked away\nfrom the palace.\n\nAladdin thought she was\nthe most wonderful person\nhe had ever seen.' },
      { scene: 's-cave-gold',    char: '💎',  text: 'A mysterious stranger\nled Aladdin to a magical cave.\n\n"Touch nothing but the lamp,"\nthe stranger warned.\n\nDeep inside, among mountains\nof gold, Aladdin found it.' },
      { scene: 's-genie-blue',   char: '🧞',  text: 'With one rub,\na giant genie burst from the lamp!\n\n"PHENOMENAL COSMIC POWERS!\nItty bitty living space."\n\nThe Genie offered Aladdin\nthree wishes.' },
      { scene: 's-open-sky',     char: '✨',  text: 'Wish one: Aladdin became a prince.\n\nOn a magic carpet,\nhe showed Jasmine\na whole new world.\n\nStars. Cities. Mountains.\nMoments that shone like starlight.' },
      { scene: 's-palace-ornate',char: '🏰',  text: 'But Jafar, the evil vizier,\nwanted the lamp for himself.\n\nHe seized it.\nAnd wished to become\nthe most powerful sorcerer\nin the world.' },
      { scene: 's-genie-blue',   char: '🌟',  text: '"You said you wanted to be\nall-powerful," said Aladdin.\n\n"Why not wish to be a Genie?"\n\nJafar agreed.\n\nAnd was trapped\ninside a lamp forever.' },
      { scene: 's-desert-night', char: '💜',  text: 'Aladdin used his last wish\nto free the Genie.\n\n"No matter what,\nyou\'ll always be my friend,"\nhe said.\n\nThe Genie wept happy tears.' },
      { scene: 's-palace-ornate',char: '👑',  text: 'The Sultan changed the law.\nJasmine could choose\nwhom she married.\n\nShe chose Aladdin.\nNot the prince.\nBut the boy\nwho was honest in his heart.' },
      { scene: 's-agrabah',      char: '💕',  text: 'And Aladdin finally had\neverything he ever wanted.\n\nNot riches.\nNot magic.\n\nBut a place\nhe truly belonged.\n\nThe End. 🧞' },
    ],
  },

  // ── Alice in Wonderland ───────────────────────────────────────────────────
  {
    id: 'alice',
    title: 'Alice in Wonderland',
    emoji: '🐇',
    coverColor: '#E8F5E9',
    spineColor:  '#2E7D32',
    pages: [
      { scene: 's-meadow-night', char: '🐇',  text: 'Alice was very bored\nsitting by the river\nwith her sister.\n\nThen a white rabbit dashed past —\nwearing a waistcoat\nand checking a pocket watch.' },
      { scene: 's-wonderland',   char: '🕳️', text: '"I\'m late! I\'m late!\nFor a very important date!"\n\nAlice followed the rabbit\ndown a rabbit hole.\n\nAnd fell.\nAnd fell.\nAnd fell.' },
      { scene: 's-wonderland',   char: '🍄',  text: 'Wonderland was the strangest\nplace Alice had ever seen.\n\nCaterpillars who gave advice.\nFlowers who sang.\nA cat who disappeared,\nleaving only his grin.' },
      { scene: 's-tea-party',    char: '🫖',  text: '"No room! No room!"\ncried the Mad Hatter.\n\nBut there was plenty of room.\n\nAlice sat down anyway.\n\nThe tea was cold,\nthe riddles had no answers,\nand it was the best tea party.' },
      { scene: 's-chess-field',  char: '♟️', text: 'The Queen of Hearts\nstomped through her garden.\n\n"Painting the roses red!\nOff with their heads!"\n\nAlice thought she was\nextraordinarily unpleasant.' },
      { scene: 's-wonderland',   char: '🃏',  text: 'Cards chased Alice.\nThe Cheshire Cat grinned.\nThe Mad Hatter laughed.\nThe Queen raged.\n\nAlice ran and ran\nand suddenly —' },
      { scene: 's-midnight-blue',char: '🌙',  text: '— the world went dark.\n\nAlice stood in a strange\ncourt room.\n\n"Off with her head!"\nscreamed the Queen.\n\nAlice stood very straight.' },
      { scene: 's-chess-field',  char: '👑',  text: '"You\'re nothing but\na pack of cards!"\n\nAlice said.\n\nAnd she was right.\n\nThe cards flew up.\nThe world spun.\nAlice fell —' },
      { scene: 's-wonderland',   char: '🌸',  text: '— and landed on soft grass.\n\nHer sister was brushing\nleaves from her hair.\n\n"You fell asleep," said her sister.\n"You were dreaming."' },
      { scene: 's-soft-morning', char: '💕',  text: 'But Alice smiled\na secret smile.\n\nBecause she knew —\n\nsome dreams are\nmuch too vivid\nto be only dreams.\n\nThe End. 🐇' },
    ],
  },

  // ── Bloop & the Grumpy Dragon ─────────────────────────────────────────────
  {
    id: 'bloop',
    title: 'Bloop & the Grumpy Dragon',
    emoji: '🐲',
    coverColor: '#FFF9C4',
    spineColor:  '#FF5722',
    pages: [
      {
        scene: 's-toon-field',
        svg: `<svg viewBox="0 0 220 260" xmlns="http://www.w3.org/2000/svg"><ellipse cx="110" cy="252" rx="45" ry="8" fill="#00000030"/><ellipse cx="110" cy="168" rx="72" ry="82" fill="#29B6F6" stroke="#0D47A1" stroke-width="5"/><path d="M 42 158 C 25 148 15 162 22 178" stroke="#0D47A1" stroke-width="5" stroke-linecap="round" fill="none"/><circle cx="20" cy="181" r="11" fill="#29B6F6" stroke="#0D47A1" stroke-width="4"/><path d="M 178 148 C 195 130 212 118 220 98" stroke="#0D47A1" stroke-width="5" stroke-linecap="round" fill="none"/><circle cx="222" cy="95" r="11" fill="#29B6F6" stroke="#0D47A1" stroke-width="4"/><ellipse cx="90" cy="242" rx="22" ry="12" fill="#29B6F6" stroke="#0D47A1" stroke-width="4" transform="rotate(-10 90 242)"/><ellipse cx="130" cy="242" rx="22" ry="12" fill="#29B6F6" stroke="#0D47A1" stroke-width="4" transform="rotate(10 130 242)"/><circle cx="88" cy="148" r="28" fill="white" stroke="#0D47A1" stroke-width="4"/><circle cx="132" cy="148" r="28" fill="white" stroke="#0D47A1" stroke-width="4"/><circle cx="93" cy="154" r="14" fill="#0D47A1"/><circle cx="137" cy="154" r="14" fill="#0D47A1"/><circle cx="97" cy="147" r="6" fill="white"/><circle cx="141" cy="147" r="6" fill="white"/><path d="M 84 178 Q 110 198 136 178" fill="none" stroke="#0D47A1" stroke-width="4" stroke-linecap="round"/><ellipse cx="72" cy="173" rx="12" ry="8" fill="#FF80AB" opacity="0.55"/><ellipse cx="148" cy="173" rx="12" ry="8" fill="#FF80AB" opacity="0.55"/></svg>`,
        text: 'This is Bloop.\n\nBloop was a very round,\nvery blue, and very curious\nlittle blob.\n\nOne day, he decided to go\non an adventure.',
      },
      {
        scene: 's-toon-cave',
        svg: `<svg viewBox="0 0 220 260" xmlns="http://www.w3.org/2000/svg"><ellipse cx="110" cy="252" rx="45" ry="8" fill="#00000030"/><ellipse cx="110" cy="168" rx="72" ry="82" fill="#29B6F6" stroke="#0D47A1" stroke-width="5"/><path d="M 42 148 C 22 125 12 105 8 82" stroke="#0D47A1" stroke-width="5" stroke-linecap="round" fill="none"/><circle cx="6" cy="79" r="11" fill="#29B6F6" stroke="#0D47A1" stroke-width="4"/><path d="M 178 148 C 198 125 208 105 212 82" stroke="#0D47A1" stroke-width="5" stroke-linecap="round" fill="none"/><circle cx="214" cy="79" r="11" fill="#29B6F6" stroke="#0D47A1" stroke-width="4"/><ellipse cx="90" cy="242" rx="22" ry="12" fill="#29B6F6" stroke="#0D47A1" stroke-width="4"/><ellipse cx="130" cy="242" rx="22" ry="12" fill="#29B6F6" stroke="#0D47A1" stroke-width="4"/><circle cx="88" cy="146" r="30" fill="white" stroke="#0D47A1" stroke-width="4"/><circle cx="132" cy="146" r="30" fill="white" stroke="#0D47A1" stroke-width="4"/><circle cx="88" cy="146" r="9" fill="#0D47A1"/><circle cx="132" cy="146" r="9" fill="#0D47A1"/><circle cx="91" cy="141" r="4" fill="white"/><circle cx="135" cy="141" r="4" fill="white"/><ellipse cx="110" cy="186" rx="15" ry="18" fill="white" stroke="#0D47A1" stroke-width="4"/><path d="M 186 115 C 193 107 197 99 194 93 C 191 87 184 88 182 94 C 180 100 183 111 186 115 Z" fill="#81D4FA" stroke="#0D47A1" stroke-width="2"/></svg>`,
        text: 'He found a cave.\n\nA very dark,\nvery smoky,\nvery suspicious cave.\n\n"Hmm," said Bloop.\n\n(He went in anyway.)',
      },
      {
        scene: 's-toon-volcano',
        svg: `<svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg"><ellipse cx="140" cy="272" rx="55" ry="8" fill="#00000030"/><ellipse cx="140" cy="185" rx="80" ry="72" fill="#66BB6A" stroke="#1B5E20" stroke-width="5"/><ellipse cx="140" cy="195" rx="50" ry="45" fill="#C8E6C9" stroke="#1B5E20" stroke-width="3"/><path d="M 65 155 C 30 130 15 100 28 72 C 42 45 68 58 75 82 C 82 106 76 138 65 155 Z" fill="#81C784" stroke="#1B5E20" stroke-width="4"/><path d="M 215 155 C 250 130 265 100 252 72 C 238 45 212 58 205 82 C 198 106 204 138 215 155 Z" fill="#81C784" stroke="#1B5E20" stroke-width="4"/><rect x="115" y="102" width="50" height="38" rx="20" fill="#66BB6A" stroke="#1B5E20" stroke-width="4"/><ellipse cx="140" cy="90" rx="56" ry="50" fill="#66BB6A" stroke="#1B5E20" stroke-width="5"/><polygon points="118,44 124,22 130,44" fill="#F44336" stroke="#B71C1C" stroke-width="2"/><polygon points="133,40 140,16 147,40" fill="#F44336" stroke="#B71C1C" stroke-width="2"/><polygon points="150,44 156,22 162,44" fill="#F44336" stroke="#B71C1C" stroke-width="2"/><ellipse cx="140" cy="102" rx="30" ry="22" fill="#A5D6A7" stroke="#1B5E20" stroke-width="4"/><ellipse cx="130" cy="105" rx="5" ry="4" fill="#1B5E20"/><ellipse cx="150" cy="105" rx="5" ry="4" fill="#1B5E20"/><circle cx="116" cy="74" r="19" fill="white" stroke="#1B5E20" stroke-width="4"/><circle cx="164" cy="74" r="19" fill="white" stroke="#1B5E20" stroke-width="4"/><line x1="98" y1="57" x2="130" y2="65" stroke="#1B5E20" stroke-width="5" stroke-linecap="round"/><line x1="150" y1="65" x2="182" y2="57" stroke="#1B5E20" stroke-width="5" stroke-linecap="round"/><circle cx="120" cy="78" r="11" fill="#1B5E20"/><circle cx="160" cy="78" r="11" fill="#1B5E20"/><circle cx="124" cy="73" r="4" fill="white"/><circle cx="164" cy="73" r="4" fill="white"/><path d="M 118 117 Q 140 107 162 117" fill="none" stroke="#1B5E20" stroke-width="4" stroke-linecap="round"/><path d="M 65 172 C 75 158 110 152 140 156 C 170 152 205 158 215 172" fill="none" stroke="#1B5E20" stroke-width="7" stroke-linecap="round"/><ellipse cx="108" cy="252" rx="28" ry="16" fill="#66BB6A" stroke="#1B5E20" stroke-width="4"/><ellipse cx="172" cy="252" rx="28" ry="16" fill="#66BB6A" stroke="#1B5E20" stroke-width="4"/><path d="M 215 215 C 248 225 265 240 258 258" fill="none" stroke="#1B5E20" stroke-width="6" stroke-linecap="round"/><polygon points="256,260 270,250 268,270" fill="#66BB6A" stroke="#1B5E20" stroke-width="3"/></svg>`,
        text: 'Inside lived GRUM.\n\nThe grumpiest dragon\nin the whole land.\n\nGrum had not smiled\nin THREE HUNDRED YEARS.\n\n"GO AWAY," said Grum.',
      },
      {
        scene: 's-toon-cozy',
        svg: `<svg viewBox="0 0 240 270" xmlns="http://www.w3.org/2000/svg"><ellipse cx="120" cy="262" rx="45" ry="8" fill="#00000030"/><ellipse cx="120" cy="168" rx="72" ry="82" fill="#29B6F6" stroke="#0D47A1" stroke-width="5"/><path d="M 52 162 C 35 172 28 184 30 197" stroke="#0D47A1" stroke-width="5" stroke-linecap="round" fill="none"/><circle cx="29" cy="200" r="11" fill="#29B6F6" stroke="#0D47A1" stroke-width="4"/><path d="M 188 148 C 208 136 226 128 240 118" stroke="#0D47A1" stroke-width="5" stroke-linecap="round" fill="none"/><circle cx="242" cy="116" r="11" fill="#29B6F6" stroke="#0D47A1" stroke-width="4"/><circle cx="248" cy="104" r="20" fill="#8D5524" stroke="#4E342E" stroke-width="4"/><circle cx="248" cy="104" r="10" fill="#A0522D" stroke="#4E342E" stroke-width="2"/><circle cx="241" cy="97" r="3.5" fill="#3E2723"/><circle cx="255" cy="100" r="3.5" fill="#3E2723"/><circle cx="243" cy="111" r="3.5" fill="#3E2723"/><ellipse cx="98" cy="242" rx="22" ry="12" fill="#29B6F6" stroke="#0D47A1" stroke-width="4" transform="rotate(-8 98 242)"/><ellipse cx="142" cy="242" rx="22" ry="12" fill="#29B6F6" stroke="#0D47A1" stroke-width="4" transform="rotate(8 142 242)"/><circle cx="96" cy="150" r="27" fill="white" stroke="#0D47A1" stroke-width="4"/><circle cx="142" cy="150" r="27" fill="white" stroke="#0D47A1" stroke-width="4"/><circle cx="102" cy="148" r="13" fill="#0D47A1"/><circle cx="147" cy="148" r="13" fill="#0D47A1"/><circle cx="106" cy="143" r="5" fill="white"/><circle cx="151" cy="143" r="5" fill="white"/><path d="M 90 178 Q 118 198 146 178" fill="none" stroke="#0D47A1" stroke-width="4" stroke-linecap="round"/><ellipse cx="78" cy="173" rx="12" ry="8" fill="#FF80AB" opacity="0.55"/><ellipse cx="154" cy="173" rx="12" ry="8" fill="#FF80AB" opacity="0.55"/></svg>`,
        text: 'Bloop was not scared.\n\nBloop reached into his bag\nand pulled out a cookie.\n\n"Have you tried..."\nsaid Bloop,\n"...a snack?"',
      },
      {
        scene: 's-toon-sunset',
        svg: `<svg viewBox="0 0 320 280" xmlns="http://www.w3.org/2000/svg"><ellipse cx="88" cy="272" rx="38" ry="7" fill="#00000025"/><ellipse cx="232" cy="272" rx="52" ry="7" fill="#00000025"/><ellipse cx="88" cy="178" rx="56" ry="64" fill="#29B6F6" stroke="#0D47A1" stroke-width="4"/><path d="M 36 162 C 20 172 14 184 16 196" stroke="#0D47A1" stroke-width="4" stroke-linecap="round" fill="none"/><circle cx="15" cy="199" r="10" fill="#29B6F6" stroke="#0D47A1" stroke-width="3"/><path d="M 140 152 C 160 140 178 140 190 148" stroke="#0D47A1" stroke-width="4" stroke-linecap="round" fill="none"/><circle cx="192" cy="150" r="10" fill="#29B6F6" stroke="#0D47A1" stroke-width="3"/><ellipse cx="72" cy="236" rx="18" ry="10" fill="#29B6F6" stroke="#0D47A1" stroke-width="3" transform="rotate(-8 72 236)"/><ellipse cx="106" cy="236" rx="18" ry="10" fill="#29B6F6" stroke="#0D47A1" stroke-width="3" transform="rotate(8 106 236)"/><circle cx="72" cy="161" r="22" fill="white" stroke="#0D47A1" stroke-width="3"/><circle cx="106" cy="161" r="22" fill="white" stroke="#0D47A1" stroke-width="3"/><circle cx="76" cy="165" r="11" fill="#0D47A1"/><circle cx="110" cy="165" r="11" fill="#0D47A1"/><circle cx="79" cy="160" r="4" fill="white"/><circle cx="113" cy="160" r="4" fill="white"/><path d="M 68 184 Q 88 198 110 184" fill="none" stroke="#0D47A1" stroke-width="3" stroke-linecap="round"/><ellipse cx="58" cy="180" rx="10" ry="7" fill="#FF80AB" opacity="0.5"/><ellipse cx="118" cy="180" rx="10" ry="7" fill="#FF80AB" opacity="0.5"/><ellipse cx="232" cy="186" rx="72" ry="66" fill="#66BB6A" stroke="#1B5E20" stroke-width="4"/><ellipse cx="232" cy="196" rx="44" ry="41" fill="#C8E6C9" stroke="#1B5E20" stroke-width="3"/><path d="M 164 156 C 130 132 116 104 128 76 C 142 49 168 60 172 84 C 178 108 172 138 164 156 Z" fill="#81C784" stroke="#1B5E20" stroke-width="4"/><path d="M 300 156 C 334 132 348 104 336 76 C 322 49 296 60 292 84 C 286 108 292 138 300 156 Z" fill="#81C784" stroke="#1B5E20" stroke-width="4"/><rect x="210" y="114" width="44" height="36" rx="18" fill="#66BB6A" stroke="#1B5E20" stroke-width="4"/><ellipse cx="232" cy="100" rx="48" ry="44" fill="#66BB6A" stroke="#1B5E20" stroke-width="4"/><polygon points="214,60 220,40 226,60" fill="#F44336" stroke="#B71C1C" stroke-width="2"/><polygon points="226,57 232,36 238,57" fill="#F44336" stroke="#B71C1C" stroke-width="2"/><polygon points="238,60 244,40 250,60" fill="#F44336" stroke="#B71C1C" stroke-width="2"/><ellipse cx="232" cy="110" rx="26" ry="19" fill="#A5D6A7" stroke="#1B5E20" stroke-width="3"/><ellipse cx="224" cy="113" rx="4" ry="3" fill="#1B5E20"/><ellipse cx="240" cy="113" rx="4" ry="3" fill="#1B5E20"/><path d="M 194 86 Q 210 74 226 86" fill="none" stroke="#1B5E20" stroke-width="4" stroke-linecap="round"/><path d="M 238 86 Q 254 74 270 86" fill="none" stroke="#1B5E20" stroke-width="4" stroke-linecap="round"/><path d="M 204 120 Q 232 136 260 120" fill="none" stroke="#1B5E20" stroke-width="4" stroke-linecap="round"/><ellipse cx="182" cy="104" rx="12" ry="8" fill="#EF9A9A" opacity="0.5"/><ellipse cx="282" cy="104" rx="12" ry="8" fill="#EF9A9A" opacity="0.5"/><ellipse cx="200" cy="248" rx="25" ry="14" fill="#66BB6A" stroke="#1B5E20" stroke-width="3"/><ellipse cx="264" cy="248" rx="25" ry="14" fill="#66BB6A" stroke="#1B5E20" stroke-width="3"/><path d="M 300 214 C 328 224 342 238 336 254" fill="none" stroke="#1B5E20" stroke-width="5" stroke-linecap="round"/><polygon points="334,256 346,246 345,264" fill="#66BB6A" stroke="#1B5E20" stroke-width="3"/><path d="M 158 166 C 140 154 122 152 110 160" stroke="#1B5E20" stroke-width="5" stroke-linecap="round" fill="none"/></svg>`,
        text: 'Grum had never had a snack before.\n\nHe tried one.\nThen two.\nThen approximately\none thousand.\n\nAnd just like that —\nGrum smiled. 🍪',
      },
      { scene: 's-toon-field', char: '🍪',   text: 'Grum had never had a friend before.\n\nBloop showed him\nhow to roll in the grass.\nHow to chase butterflies.\nHow to nap in the sunshine.' },
      { scene: 's-toon-cozy',  char: '☕',   text: 'One evening,\nGrum made Bloop\na mug of hot cocoa.\n\n"I made it myself," he said.\n\nIt was the best thing\nBloop had ever tasted.' },
      { scene: 's-toon-cave',  char: '✨',   text: 'Word spread.\nOther creatures came to the cave.\n\n"Is it true?\nThe grumpy dragon\nhas friends now?"\n\n"Yes," said Grum.\n"I have one.\nHis name is Bloop."' },
      { scene: 's-toon-field', char: '🌟',   text: 'Bloop and Grum went\non many adventures after that.\n\nThey climbed mountains.\nThey explored forests.\nThey found exactly zero\nother grumpy dragons.' },
      { scene: 's-toon-sunset',char: '💕',   text: 'And every evening,\nthey sat together\nand watched the sun go down.\n\nGrum still wasn\'t very good\nat smiling.\n\nBut he was trying.\n\nThe End. 🐲' },
    ],
  },

  // ── Cinderella ────────────────────────────────────────────────────────────
  {
    id: 'cinderella',
    title: 'Cinderella',
    emoji: '👠',
    coverColor: '#E3F2FD',
    spineColor:  '#1565C0',
    pages: [
      { scene: 's-enchanted-cottage', char: '🏠', text: 'Cinderella lived with\nher stepmother and stepsisters.\n\nShe cooked.\nShe cleaned.\nShe mended.\n\nShe did it all without complaint.\nAnd she sang.' },
      { scene: 's-enchanted-cottage', char: '🧹', text: 'The stepsisters tore her\nhandmade dress to pieces\nbefore the royal ball.\n\nCinderella went to the garden\nand cried.\n\n"There, there,"\nsaid a voice.' },
      { scene: 's-pumpkin-magic',     char: '🧚', text: 'Her fairy godmother appeared.\n\n"Bibbidi-bobbidi-boo!"\n\nWith a wave of her wand,\na dress sparkled into place.\nGlass slippers appeared.\nA pumpkin became a carriage.' },
      { scene: 's-pumpkin-magic',     char: '🎃', text: '"But remember!"\nher godmother called.\n"The magic ends\nat the stroke of midnight!"\n\nCinderella promised.\nAnd galloped off\ninto the evening.' },
      { scene: 's-ballroom',          char: '💃', text: 'The ballroom glittered\nwith a thousand candles.\n\nEveryone turned\nwhen Cinderella entered.\n\nWho was she?\nNo one knew.\n\nBut the prince\ncouldn\'t look away.' },
      { scene: 's-ballroom',          char: '👑', text: 'They danced all evening.\n\nThe prince had never\nfelt so happy.\n\nCinderella had never\nfelt so free.\n\nFor one magical night,\nshe was exactly herself.' },
      { scene: 's-midnight-blue',     char: '🕛', text: 'BONG. BONG. BONG.\n\nMidnight!\n\nCinderella ran.\nDown the steps —\none glass slipper\nleft behind.' },
      { scene: 's-pumpkin-magic',     char: '👠', text: 'The prince searched\nevery home in the kingdom\nwith one glass slipper.\n\nIt could only fit\none person.\n\nThe person\nit belonged to.' },
      { scene: 's-enchanted-cottage', char: '✨', text: 'The slipper fit Cinderella.\nPerfectly.\n\nThe stepsisters stared.\nThe stepmother paled.\n\nCinderella smiled,\npulled the other slipper\nfrom her pocket,\nand put it on.' },
      { scene: 's-ballroom',          char: '💕', text: 'And they lived,\nnot perfectly,\nbut happily.\n\nBecause Cinderella\nhad learned something important:\n\nKindness is never wasted.\n\nThe End. 👠' },
    ],
  },

  // ── Dumbo ─────────────────────────────────────────────────────────────────
  {
    id: 'dumbo',
    title: 'Dumbo',
    emoji: '🐘',
    coverColor: '#c8e6ff',
    spineColor:  '#7fb8e8',
    pages: [
      { scene: 's-circus-night',  char: '🎪', text: 'Once upon a time,\nat a magical travelling circus,\na very special baby was born. 🌟' },
      { scene: 's-soft-morning',  char: '🐘', text: 'His name was Jumbo Jr.\n\nBut everyone called him\n\nDumbo.' },
      { scene: 's-warm-circus',   char: '👂', text: 'Dumbo had the biggest ears\nanyone had ever seen.\n\nThe other elephants laughed at him.\n\nBut not everyone did.' },
      { scene: 's-meadow-night',  char: '💧', text: 'Dumbo cried big elephant tears.\n\nThe circus was supposed\nto be a place of magic.\n\nBut for Dumbo,\nit only felt lonely.' },
      { scene: 's-meadow-night',  char: '🐭', text: 'Timothy Q. Mouse\nwas Dumbo\'s best friend.\n\nHe believed in Dumbo\nmore than anyone else\nin the whole circus.' },
      { scene: 's-twilight-magic', char: '🪶', text: 'Timothy gave Dumbo\na magic feather for luck.\n\n"Hold this," he said,\n"and you can do anything."' },
      { scene: 's-open-sky',      char: '✨', text: 'Dumbo leapt from the tower...\n\nand instead of falling...\n\nhe FLEW! 🐘💨\n\nThe whole crowd gasped.' },
      { scene: 's-open-sky',      char: '🐘', text: 'Higher and higher!\n\nOver the big top!\nOver the trees!\nOver everything!\n\n"I\'m flying!" thought Dumbo.\n"I\'m actually flying!"' },
      { scene: 's-golden-sunrise', char: '🌟', text: 'He didn\'t need the feather.\n\nHe never did.\n\nThe magic was inside him\nall along.' },
      { scene: 's-warm-glow',     char: '💙', text: 'What makes you different...\n\nmakes you extraordinary.\n\nThe End. 🎪' },
    ],
  },

  // ── Frozen ────────────────────────────────────────────────────────────────
  {
    id: 'frozen',
    title: 'Frozen',
    emoji: '❄️',
    coverColor: '#E3F2FD',
    spineColor:  '#0288D1',
    pages: [
      { scene: 's-arctic-blue',  char: '❄️', text: 'Elsa and Anna were sisters.\n\nElsa had a secret:\nher hands could create ice.\nSnow. Entire winters.\n\nShe loved her sister.\nSo she hid herself away.' },
      { scene: 's-arctic-blue',  char: '🎉', text: 'On the day of Elsa\'s coronation,\nthe whole kingdom celebrated.\n\nAnna was so excited\nshe ran everywhere,\ntalked to everyone,\nand almost fell into a fountain.' },
      { scene: 's-arctic-blue',  char: '🌨️', text: 'An argument with Anna\nmade Elsa lose control.\n\nIce burst from her hands.\n\nThe crowd gasped.\nThe Duke pointed.\nElsa fled.' },
      { scene: 's-ice-palace',   char: '👑', text: 'Elsa ran to the mountain.\n\nFor the first time,\nshe let herself go.\n\n"Let it go," she sang,\nand built herself\na palace of ice and light.' },
      { scene: 's-aurora-sky',   char: '🌌', text: 'Anna followed her sister.\nUp the mountain.\nThrough the snow.\nPast a snowman named Olaf\nwho dreamed of summer.' },
      { scene: 's-arctic-blue',  char: '☃️', text: '"I want to see summer!"\nOlaf told them cheerfully.\n\n"I\'ve always loved\nthe idea of warm hugs."\n\nAnna decided she liked Olaf\nimmensely.' },
      { scene: 's-ice-palace',   char: '💙', text: 'Elsa didn\'t know\nhow to unfreeze the kingdom.\n\nShe was afraid\nthat her love\nwould only hurt people.\n\nShe was wrong.' },
      { scene: 's-arctic-blue',  char: '💜', text: 'Hans was not what he seemed.\n\nHe was cold in a way\nthat had nothing to do with ice.\n\nAnna\'s heart froze —\nbut for a different reason.' },
      { scene: 's-aurora-sky',   char: '🌸', text: '"An act of true love,"\nsaid Olaf.\n"That\'s what will save her."\n\nAnna stepped between\nHans\'s sword and her sister.\n\nThat was the act.' },
      { scene: 's-arctic-blue',  char: '💕', text: 'Elsa\'s ice melted.\nSpring returned.\nOlaf stayed frozen\n(with a personal flurry).\n\nTwo sisters. Finally together.\nThat was enough.\n\nThe End. ❄️' },
    ],
  },

  // ── Little Mermaid ────────────────────────────────────────────────────────
  {
    id: 'mermaid',
    title: 'The Little Mermaid',
    emoji: '🧜‍♀️',
    coverColor: '#E0F2F1',
    spineColor:  '#00897B',
    pages: [
      { scene: 's-coral-sea',      char: '🧜‍♀️', text: 'Under the sea,\nin the kingdom of Atlantica,\nlived a mermaid named Ariel.\n\nShe had a beautiful voice,\na curious mind,\nand a cave full\nof human things she treasured.' },
      { scene: 's-deep-ocean',     char: '🐠',  text: 'Forks were "dinglehoppers."\nSpoons were also dinglehoppers.\nCandelabras were "snarfblatts."\n\nAriel\'s seagull friend Scuttle\nwas not an expert on humans.' },
      { scene: 's-coral-sea',      char: '🎵',  text: 'Ariel\'s greatest wish\nwas to be human.\n\nTo walk. To dance.\nTo feel grass under her feet.\n\n"The sea is your home!"\nher father King Triton roared.' },
      { scene: 's-deep-ocean',     char: '🌊',  text: 'Then a ship sailed overhead.\n\nOn the deck stood a prince.\nHis name was Eric.\n\nLightning struck.\nAriel saved his life.\nAnd his heart saved hers.' },
      { scene: 's-sea-witch-lair', char: '🐙',  text: 'Ursula made a deal.\n\n"Your voice for legs.\nThree days. If the prince\nkisses you, you stay human.\nIf not — you\'re mine."\n\nAriel signed.' },
      { scene: 's-beach-shore',    char: '🌅',  text: 'Ariel walked on legs\nfor the first time.\n\nShe fell immediately.\n\nShe got up.\nShe tried again.\nShe laughed at herself.\n\nThis was worth it.' },
      { scene: 's-beach-shore',    char: '👑',  text: 'Eric was kind.\nHe took care of the stranger\nwho couldn\'t speak.\n\nHe liked her.\nHe felt something.\n\nBut Ursula had stolen Ariel\'s voice\nand was using it to trick him.' },
      { scene: 's-sea-witch-lair', char: '🔮',  text: 'Ariel reclaimed her voice.\nThe trick was broken.\n\nBut time was up.\nAriel was dragged\nback into the sea.\n\nKing Triton faced a choice.' },
      { scene: 's-coral-sea',      char: '💙',  text: 'A father\'s love\nis deeper than any ocean.\n\nKing Triton gave Ariel legs —\nnot because he agreed,\nbut because her happiness\nmattered more than his fears.' },
      { scene: 's-beach-shore',    char: '💕',  text: 'Ariel and Eric stood\nat the edge of the sea.\n\nTwo worlds.\nOne bridge.\nMade entirely of love.\n\nThe End. 🧜‍♀️' },
    ],
  },

  // ── Mary Poppins ──────────────────────────────────────────────────────────
  {
    id: 'poppins',
    title: 'Mary Poppins',
    emoji: '🌂',
    coverColor: '#E3F2FD',
    spineColor:  '#1565C0',
    pages: [
      { scene: 's-poppins-arrive',  char: '🌂', text: 'On the windiest day Cherry Tree Lane\nhad ever seen, something extraordinary\nblew in.\n\nA nanny.\nWith a magic carpet bag.\nAnd a talking parrot umbrella.' },
      { scene: 's-banks-home',      char: '🏠', text: 'Jane and Michael Banks had chased away\nevery nanny in London.\n\nBut this one looked down her nose, sniffed,\nand announced she was\n\npractically perfect in every way.' },
      { scene: 's-banks-home',      char: '🧳', text: 'Mary Poppins unpacked her bag.\n\nOut came a lamp.\nA coat stand.\nA plant.\nA mirror.\nA hat rack.\n\n"But how —" Jane began.\n\n"Never you mind," said Mary Poppins.\n"Spit spot."' },
      { scene: 's-sugar-spoon',     char: '🥄', text: '"A spoonful of sugar\nhelps the medicine go down!"\n\nWith Mary Poppins, cleaning your room\nwas an adventure.\n\nTidying up was practically magic.\nBecause it was.' },
      { scene: 's-sugar-spoon',     char: '🎈', text: '"Uncle Albert!"\ncried Jane and Michael.\n\nUncle Albert was stuck\nto the ceiling again.\n\n"I can\'t stop laughing!"\n\nSoon they were all floating up.\nEven Mary Poppins.\nThough she refused to admit she was laughing.' },
      { scene: 's-chalk-world',     char: '🎠', text: 'Bert drew the most wonderful\nchalk pictures on the pavement.\n\nWith one magical leap — SPLASH —\nthey were inside!\n\nDancing penguins! Carousel horses!\nA whole world in the pavement!' },
      { scene: 's-chimney-sweep',   char: '🎩', text: '"Step in time! Step in time!"\n\nThe chimney sweeps danced\nacross every rooftop in London,\nsoot-covered and laughing,\nwhile the whole city sparkled\nfar below.' },
      { scene: 's-chimney-sweep',   char: '✨', text: 'From the rooftops,\nall of London spread below.\n\nThe Thames. The parks.\nA thousand chimneys.\n\nBert gestured grandly.\n\n"Best view in all of England.\nAnd it\'s free."' },
      { scene: 's-banks-home',      char: '🐦', text: 'Feed the birds.\n\nAn old woman sold birdseed\non the steps of St. Paul\'s.\n\n"Feed the birds,\ntuppence a bag."\n\nMary Poppins looked at the children\nwith something that was almost warm.' },
      { scene: 's-poppins-farewell',char: '🌂', text: 'The wind changed.\n\nMary Poppins packed her bag,\ngave the children one last look,\nand floated into the sky.\n\nSome magic doesn\'t stay.\nBut it never truly leaves. ♡' },
    ],
  },

  // ── Mochi the Bunny ───────────────────────────────────────────────────────
  {
    id: 'mochi',
    title: 'Mochi the Bunny',
    emoji: '🐰',
    coverColor: '#ffd6e8',
    spineColor:  '#f4a0b5',
    pages: [
      { scene: 's-cozy-indoor',   char: '🐰', text: 'This is Mochi.\n\nShe is very fluffy.\nShe is very round.\nShe is perfect.' },
      { scene: 's-little-house',  char: '🏠', text: 'Mochi\'s favourite hobby\nis sitting in her little house\nand judging everyone quietly.' },
      { scene: 's-summer-garden', char: '🥕', text: 'She loves food.\n\nEspecially things\nshe probably shouldn\'t eat.' },
      { scene: 's-summer-garden', char: '🌸', text: 'Mochi sits in the garden sometimes.\n\nShe watches the bugs.\nShe sniffs the flowers.\nShe looks deeply suspicious\nof the garden hose.' },
      { scene: 's-little-house',  char: '🐦', text: 'Mochi has opinions about birds.\n\nThey are too loud.\nThey wake her up.\nThey do not understand\nthat she is trying to nap.\n\nMochi gives them her most withering stare.' },
      { scene: 's-moonlit',       char: '💤', text: 'Mochi sleeps a LOT.\n\nLike, a lot a lot.\n\nShe has important dreams\nto attend to.' },
      { scene: 's-moonlit',       char: '🐾', text: 'In her dreams,\nMochi runs very fast.\n\nShe leaps over rivers.\nShe outsmarts foxes.\nShe discovers entire continents\nof fresh vegetables.\n\nShe is very brave in her dreams.' },
      { scene: 's-cozy-indoor',   char: '👀', text: 'In real life,\nMochi looks at you like this.\n\n👀\n\nShe knows exactly what you did.\nShe saw you from across the room.\nShe has been sitting here\nthinking about it for hours.' },
      { scene: 's-summer-garden', char: '🎀', text: 'The best moment of Mochi\'s day\nis treat time.\n\nShe hears the bag rustle\nfrom the other room.\n\nShe is suddenly, inexplicably,\nexactly where you are.\n\nMochi is very mysterious.' },
      { scene: 's-cozy-indoor',   char: '💕', text: 'At the end of every day,\nMochi hops into your arms.\n\nAnd everything\nis okay.\n\nThe End. 🌸' },
    ],
  },

  // ── My Happy Foods ────────────────────────────────────────────────────────
  {
    id: 'foods',
    title: 'My Happy Foods',
    emoji: '🍓',
    coverColor: '#ffe0b2',
    spineColor:  '#ffb347',
    pages: [
      { scene: 's-summer-garden', char: '🍽️', text: 'Some foods\njust make everything better.\n\nThis is a book\nabout those foods.' },
      { scene: 's-summer-garden', char: '🍓', text: 'Strawberries in summer.\n\nCold and sweet and perfect.\n\nThe best thing\nthe world ever made.' },
      { scene: 's-rainy-window',  char: '🍜', text: 'Ramen on a rainy day.\n\nSteamy, rich, and warm.\n\nThe second best thing\nthe world ever made.' },
      { scene: 's-matcha-cafe',   char: '🍵', text: 'Matcha. Everything.\n\nAlways.\n\nForever.\n\nNo further questions.' },
      { scene: 's-summer-garden', char: '🍦', text: 'Ice cream in any season.\n\nScoop it high.\nLet it drip.\nEat it fast.\n\nPerfect for:\nhappy days,\nsad days,\nTuesday days.' },
      { scene: 's-bakery',        char: '🍩', text: 'Donuts are just happiness\nwith a hole in the middle.\n\nGlazed. Sprinkled.\nFilled with jam.\n\nThere is no wrong donut.\nThere are only good donuts\nand great donuts.' },
      { scene: 's-rainy-window',  char: '☕', text: 'Coffee.\n\nThe thing that turns\n"please do not speak to me"\ninto "good morning!"\n\nWith oat milk.\nWith too much sugar.\nAlways, always warm.' },
      { scene: 's-matcha-cafe',   char: '🍱', text: 'Bento boxes.\n\nTiny rice. Tiny vegetables.\nTiny everything.\n\nThe best meal\nis a meal that fits\nin a very cute box.' },
      { scene: 's-bakery',        char: '🎂', text: 'And cake.\n\nAlways, always,\nalways save room\nfor cake.' },
      { scene: 's-summer-garden', char: '💕', text: 'Food is love, really.\n\nSomebody grew it.\nSomebody cooked it.\nSomebody served it.\n\nEvery meal,\na little kindness.\n\nEat well.\n\nThe End. 🍓' },
    ],
  },

  // ── Peter Pan ─────────────────────────────────────────────────────────────
  {
    id: 'peterpan',
    title: 'Peter Pan',
    emoji: '🧚',
    coverColor: '#E8F5E9',
    spineColor:  '#1565C0',
    pages: [
      { scene: 's-london-night',  char: '🌃', text: 'In a house on a London street,\nthree children slept.\n\nWendy, John, and Michael.\n\nThey didn\'t know\nthat tonight,\neverything would change.' },
      { scene: 's-london-night',  char: '🧚', text: 'A boy appeared at the window.\n\nHe was looking for his shadow.\n\nHis name was Peter Pan.\nAnd he had never,\never grown up.' },
      { scene: 's-open-sky',      char: '✨', text: '"Think happy thoughts!"\nPeter said.\n\nTinkerbell sprinkled fairy dust.\n\nWendy, John, and Michael\nrose from the floor.\nRose to the window.\nRose into the sky.' },
      { scene: 's-neverland-sky', char: '🏝️', text: '"Second star to the right,"\nsaid Peter,\n"and straight on till morning."\n\nNeverland glittered below —\ngreen islands, blue lagoons,\nand a very familiar pirate ship.' },
      { scene: 's-neverland-sky', char: '👦', text: 'The Lost Boys welcomed them\nwith tremendous noise.\n\nThey lived in trees.\nThey fought with sticks.\nThey made Wendy their mother.\n\nWendy wasn\'t sure how she felt about that.' },
      { scene: 's-pirate-ocean',  char: '⚓', text: 'Captain Hook paced his ship.\n\nA ticking crocodile\nhad eaten his hand.\nNow it followed him everywhere.\n\nHook had two goals:\nrevenge on Peter.\nAvoiding the crocodile.' },
      { scene: 's-pirate-ocean',  char: '⚔️', text: 'Hook captured the children.\n\nPeter Pan flew to the rescue.\n\nThey fought at the very tip\nof the pirate ship.\n\n"You\'re a codfish!" Peter crowed.\n\nHook did not enjoy this.' },
      { scene: 's-neverland-sky', char: '🧚', text: 'Tinkerbell drank poison\nto save Peter.\n\nShe faded.\n\n"Do you believe in fairies?\nThen clap! Clap if you believe!"\n\nAnd the light came back.' },
      { scene: 's-london-night',  char: '🏠', text: 'The children flew home.\n\nWendy found her room.\nJohn found his bed.\nMichael found Nana.\n\nTheir parents did not ask questions.\nParents often don\'t,\nwith very young children.' },
      { scene: 's-neverland-sky', char: '💕', text: 'Peter flew away,\nback to Neverland.\n\nHe didn\'t look sad.\n\nHe never looked sad.\n\nThat was the thing\nabout Peter Pan —\nand also the most\nheart-breaking thing about him.\n\nThe End. 🧚' },
    ],
  },

  // ── Pinocchio ─────────────────────────────────────────────────────────────
  {
    id: 'pinocchio',
    title: 'Pinocchio',
    emoji: '🪵',
    coverColor: '#FFF8DC',
    spineColor:  '#8B4513',
    pages: [
      { scene: 's-puppet-workshop', char: '🪵', text: 'Geppetto the woodcarver\nhad no family.\n\nSo he made one.\n\nWith his best wood\nand all his love,\nhe carved a little puppet\nand called him Pinocchio.' },
      { scene: 's-puppet-workshop', char: '⭐', text: 'That night, Geppetto\nwished on a star.\n\n"I wish," he whispered,\n"that my little puppet\nwere a real boy."' },
      { scene: 's-puppet-workshop', char: '✨', text: 'A Blue Fairy came.\n\nShe touched Pinocchio\nwith her wand.\nHe blinked. He moved.\nHe opened his mouth.\n\n"He\'s ALIVE!" cried Geppetto.\n\nBut real? Not yet.' },
      { scene: 's-puppet-workshop', char: '🦗', text: 'The Blue Fairy gave Pinocchio\na conscience.\nA small cricket named Jiminy.\n\n"Always let your conscience\nbe your guide," she said.\n\nPinocchio was not great at this.' },
      { scene: 's-warm-circus',     char: '🎪', text: 'Pinocchio got tricked.\nFirst by a Fox.\nThen by a Cat.\nThen by a boy named Lampwick\nwho knew a fun island\nwhere there were no rules.' },
      { scene: 's-warm-circus',     char: '🤥', text: 'On Pleasure Island,\nboys became donkeys.\n\nPinocchio\'s ears grew.\nHis nose had already\ngrown several times from lying.\n\nHe ran.\nJiminy ran.\nVery fast.' },
      { scene: 's-whale-belly',     char: '🐋', text: 'Pinocchio found Geppetto.\nInside a whale.\n\nGeppetto had been swallowed\nwhile searching for his son.\n\n"Father!" cried Pinocchio.\n\nGeppetto held him tight.' },
      { scene: 's-whale-belly',     char: '🌊', text: 'They made a fire inside the whale.\nThe whale sneezed.\n\nThey rode the sneeze\nout into the open sea.\n\nPinocchio swam\nuntil Geppetto was safe.\nThen sank.' },
      { scene: 's-golden-sunrise',  char: '🌟', text: 'The Blue Fairy returned.\n\n"You have proven yourself\nbrave, honest, and unselfish."\n\nPinocchio became\na real boy.\n\nGeppetto laughed and cried\nat the same time.' },
      { scene: 's-soft-morning',    char: '💕', text: 'They lived simply.\nHappily.\nTogether.\n\nJiminy Cricket\ngot a gold badge\nthat said "Official Conscience."\n\nHe was very pleased.\n\nThe End. 🪵' },
    ],
  },

  // ── Rapunzel ──────────────────────────────────────────────────────────────
  {
    id: 'rapunzel',
    title: 'Rapunzel',
    emoji: '🌸',
    coverColor: '#F3E5F5',
    spineColor:  '#7B1FA2',
    pages: [
      { scene: 's-tower-purple', char: '🌸', text: 'In a tall tower\nin a hidden valley,\nlived a girl named Rapunzel.\n\nShe had never left.\n\nBut she had filled\nevery inch of the walls\nwith paintings.' },
      { scene: 's-tower-purple', char: '🦎', text: 'Rapunzel\'s best friend\nwas a small green chameleon\nnamed Pascal.\n\nPascal agreed with everything she said.\n\nHe was excellent company.' },
      { scene: 's-tower-purple', char: '🎨', text: 'Rapunzel painted.\nShe cooked. She read.\nShe juggled. She played chess.\nShe sewed. She baked.\nShe played guitar.\n\nShe was extremely good\nat being bored.' },
      { scene: 's-tower-purple', char: '👑', text: '"Rapunzel, Rapunzel,\nlet down your hair!"\n\n"When can I leave?" Rapunzel asked.\n\n"Never. The world is\ndark and dangerous."\n\nMother Gothel was lying.' },
      { scene: 's-meadow-night', char: '🌙', text: 'Every year on her birthday,\nlights rose into the sky.\n\nThousands of lanterns,\nrising from the kingdom.\n\nRapunzel painted them\nover and over.\n\nShe didn\'t know they were for her.' },
      { scene: 's-tower-purple', char: '🏹', text: 'Flynn Rider fell\nthrough the tower window.\n\nRapunzel hit him\nwith a frying pan.\n\nThree times.\n\nThen they made a deal:\nhe\'d take her to see the lanterns.\nShe\'d give back the crown.' },
      { scene: 's-lantern-sky',  char: '🏮', text: 'The lanterns rose.\n\nThousands of them.\nAll at once.\n\nRapunzel sat in a boat\non the water\nand couldn\'t speak.\n\nThis was real.\nThis was everything she\'d ever dreamed.' },
      { scene: 's-lantern-sky',  char: '💕', text: 'Flynn saw her face\nin the lantern light.\n\nHe knew, then.\n\nHer joy was the most beautiful\nthing he had ever seen.\n\nAnd he had seen\nquite a lot of things.' },
      { scene: 's-golden-sunrise',char: '🌸', text: 'Rapunzel discovered\nshe was the lost princess.\n\nGothel\'s lies unravelled.\nThe kingdom had waited\n18 years for her return.\n\nEvery lantern\nhad been lit for her.' },
      { scene: 's-lantern-sky',  char: '💕', text: 'Rapunzel returned home.\n\nShe got a library.\nA garden.\nA kingdom that loved her.\n\nAnd Flynn,\nwho turned out to be\nvery easy to forgive.\n\nThe End. 🌸' },
    ],
  },

  // ── Snow White ────────────────────────────────────────────────────────────
  {
    id: 'snowwhite',
    title: 'Snow White',
    emoji: '🍎',
    coverColor: '#FCE4EC',
    spineColor:  '#C62828',
    pages: [
      { scene: 's-enchanted-cottage', char: '🍎', text: 'There was once a queen\nwho wished for a child\nwith lips red as an apple,\nhair dark as ebony,\nand skin white as snow.\n\nHer wish was granted.\nShe named her Snow White.' },
      { scene: 's-meadow-night',      char: '🌙', text: 'The evil queen had a mirror.\n\n"Mirror mirror on the wall,\nwho is the fairest of them all?"\n\nFor years it said: the queen.\n\nThen one day, it didn\'t.' },
      { scene: 's-meadow-night',      char: '🌲', text: 'Snow White ran\ninto the dark forest.\n\nThe trees grabbed.\nThe shadows moved.\nOwls screeched.\n\nBut Snow White kept running.\n\nAnd found, through the trees,\na tiny light.' },
      { scene: 's-enchanted-cottage', char: '🏠', text: 'A tiny cottage.\nPerfectly tiny.\nSeven tiny chairs.\nSeven tiny beds.\n\n"Who lives here?"\nshe wondered.\n\nShe was very tired.\nShe slept.' },
      { scene: 's-enchanted-cottage', char: '⛏️', text: '"Heigh ho, heigh ho,\nit\'s off to work we go!"\n\nDoc, Grumpy, Happy, Sleepy,\nBashful, Sneezy, and Dopey\ncame home to find\na stranger in their beds.\n\nThey were charmed immediately.' },
      { scene: 's-soft-morning',      char: '💃', text: 'Snow White cooked.\nShe cleaned. She sang.\nThe whole forest listened.\nBirds sat on her fingers.\nAnimals followed her everywhere.\n\n"She\'s rather wonderful,"\neven Grumpy admitted.' },
      { scene: 's-enchanted-cottage', char: '🍎', text: 'The queen disguised herself\nas an old woman.\n\nShe brought an apple.\nOne half was fine.\nOne half was poisoned.\n\nShe knew Snow White\nwould share with a stranger.' },
      { scene: 's-midnight-blue',     char: '😴', text: 'Snow White slept.\n\nThe dwarfs searched.\nThey couldn\'t wake her.\n\nThey made her a glass coffin\nso they could always\nbe near her.\n\nAnd they grieved.' },
      { scene: 's-golden-sunrise',    char: '💋', text: 'A prince had heard\nof the sleeping girl.\nHe came. He saw her.\n\nHe kissed her.\n\nThe poison broke.\nSnow White opened her eyes\nand saw kindness.\n\nThat seemed like a good start.' },
      { scene: 's-soft-morning',      char: '💕', text: 'They rode away together.\n\nThe seven dwarfs waved.\nSnow White waved back.\n\nThe queen asked\nher mirror one last time.\n\nThe mirror just sighed.\n\nThe End. 🍎' },
    ],
  },

];

