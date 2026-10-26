// Waterside Office — the weekly hymn rotation.
//
// One morning hymn and one evening hymn are sung every day for a week (Monday to Sunday),
// so a household learns them by heart. The rotation runs 13 weeks (one quarter) and then
// begins again, so each hymn comes round four times a year.
//
// Every hymn is in the Trinity Hymnal (Revised Edition, 1990); `th` is its number there.
// Numbers were checked against the hymnal's published index; the Morning (395–400) and
// Evening (401–409) sections supply most of the rotation. The words printed are the
// original public-domain texts. The hymnal sometimes alters wording or prints fewer
// stanzas, so a household singing from the book may meet small differences.
//
// `site` reuses a hymn already on the Waterside Press site (content/hymns.mjs).
// `video` is the YouTube recording Aaron chose for learning the tune (October 2026);
// hymns without one link to a YouTube search for the hymn and its tune.

export const ANCHOR_MONDAY = '2026-10-26'; // week 1 of the rotation began on this Monday

export const morning = [
  {
    title: 'Awake, My Soul, and with the Sun', video: 'https://www.youtube.com/watch?v=dcaKA-zKB8E', th: '395', tune: 'MORNING HYMN',
    source: 'Thomas Ken, 1695, revised 1709',
    stanzas: [
      'Awake, my soul, and with the sun\nThy daily stage of duty run;\nShake off dull sloth, and joyful rise\nTo pay thy morning sacrifice.',
      'Thy precious time misspent, redeem;\nEach present day thy last esteem;\nImprove thy talent with due care;\nFor the great day thyself prepare.',
      'Wake, and lift up thyself, my heart,\nAnd with the angels bear thy part,\nWho all night long unwearied sing\nHigh praise to the eternal King.',
      'Glory to thee, who safe hast kept\nAnd hast refreshed me whilst I slept;\nGrant, Lord, when I from death shall wake,\nI may of endless light partake.',
      'Praise God, from whom all blessings flow;\nPraise him, all creatures here below;\nPraise him above, ye heavenly host;\nPraise Father, Son, and Holy Ghost.',
    ],
  },
  {
    title: 'When Morning Gilds the Skies', video: 'https://www.youtube.com/watch?v=pCsC0CUH34I', th: '167', tune: 'LAUDES DOMINI',
    source: 'German, 19th century; translated by Edward Caswall, 1854',
    stanzas: [
      'When morning gilds the skies,\nMy heart awaking cries,\nMay Jesus Christ be praised!\nAlike at work and prayer\nTo Jesus I repair:\nMay Jesus Christ be praised!',
      'Does sadness fill my mind?\nA solace here I find,\nMay Jesus Christ be praised!\nOr fades my earthly bliss?\nMy comfort still is this,\nMay Jesus Christ be praised!',
      'The night becomes as day\nWhen from the heart we say:\nMay Jesus Christ be praised!\nThe powers of darkness fear\nWhen this sweet chant they hear:\nMay Jesus Christ be praised!',
      'In heaven’s eternal bliss\nThe loveliest strain is this,\nMay Jesus Christ be praised!\nLet earth, and sea, and sky\nFrom depth to height reply,\nMay Jesus Christ be praised!',
      'Be this, while life is mine,\nMy canticle divine,\nMay Jesus Christ be praised!\nBe this th’ eternal song\nThrough all the ages long,\nMay Jesus Christ be praised!',
    ],
  },
  {
    title: 'Holy, Holy, Holy! Lord God Almighty', th: '100', tune: 'NICAEA',
    source: 'Reginald Heber, 1826',
    stanzas: [
      'Holy, holy, holy! Lord God Almighty!\nEarly in the morning our song shall rise to thee;\nHoly, holy, holy! merciful and mighty!\nGod in three Persons, blessed Trinity!',
      'Holy, holy, holy! all the saints adore thee,\nCasting down their golden crowns around the glassy sea;\nCherubim and seraphim falling down before thee,\nWhich wert, and art, and evermore shalt be.',
      'Holy, holy, holy! though the darkness hide thee,\nThough the eye of sinful man thy glory may not see;\nOnly thou art holy; there is none beside thee,\nPerfect in power, in love, and purity.',
      'Holy, holy, holy! Lord God Almighty!\nAll thy works shall praise thy name, in earth, and sky, and sea;\nHoly, holy, holy! merciful and mighty!\nGod in three Persons, blessed Trinity!',
    ],
  },
  {
    title: 'Christ, Whose Glory Fills the Skies', th: '398', tune: 'LUX PRIMA',
    source: 'Charles Wesley, 1740',
    stanzas: [
      'Christ, whose glory fills the skies,\nChrist, the true, the only Light,\nSun of Righteousness, arise,\nTriumph o’er the shades of night;\nDayspring from on high, be near;\nDaystar, in my heart appear.',
      'Dark and cheerless is the morn\nUnaccompanied by thee;\nJoyless is the day’s return,\nTill thy mercy’s beams I see,\nTill they inward light impart,\nGlad my eyes, and warm my heart.',
      'Visit then this soul of mine;\nPierce the gloom of sin and grief;\nFill me, Radiancy divine;\nScatter all my unbelief;\nMore and more thyself display,\nShining to the perfect day.',
    ],
  },
  {
    title: 'O Worship the King', video: 'https://www.youtube.com/watch?v=5_4jpwM_AwE', th: '2', tune: 'LYONS',
    source: 'Robert Grant, 1833, after Psalm 104',
    stanzas: [
      'O worship the King, all glorious above,\nO gratefully sing his power and his love;\nOur Shield and Defender, the Ancient of Days,\nPavilioned in splendour, and girded with praise.',
      'O tell of his might, O sing of his grace,\nWhose robe is the light, whose canopy space;\nHis chariots of wrath the deep thunderclouds form,\nAnd dark is his path on the wings of the storm.',
      'Thy bountiful care what tongue can recite?\nIt breathes in the air, it shines in the light;\nIt streams from the hills, it descends to the plain,\nAnd sweetly distils in the dew and the rain.',
      'Frail children of dust, and feeble as frail,\nIn thee do we trust, nor find thee to fail;\nThy mercies how tender, how firm to the end,\nOur Maker, Defender, Redeemer, and Friend!',
    ],
  },
  {
    title: 'Praise to the Lord, the Almighty', video: 'https://www.youtube.com/watch?v=_vegvb1u5s4', th: '53', tune: 'LOBE DEN HERREN',
    source: 'Joachim Neander, 1680; translated by Catherine Winkworth, 1863',
    stanzas: [
      'Praise to the Lord, the Almighty, the King of creation!\nO my soul, praise him, for he is thy health and salvation!\nAll ye who hear,\nNow to his temple draw near;\nJoin me in glad adoration!',
      'Praise to the Lord, who o’er all things so wondrously reigneth,\nShelters thee under his wings, yea, so gently sustaineth!\nHast thou not seen\nHow thy desires e’er have been\nGranted in what he ordaineth?',
      'Praise to the Lord, who doth prosper thy work and defend thee;\nSurely his goodness and mercy here daily attend thee.\nPonder anew\nWhat the Almighty can do,\nIf with his love he befriend thee.',
      'Praise to the Lord! O let all that is in me adore him!\nAll that hath life and breath, come now with praises before him!\nLet the Amen\nSound from his people again:\nGladly for aye we adore him.',
    ],
  },
  { site: 'psalm-100', title: 'All People That on Earth Do Dwell', video: 'https://www.youtube.com/watch?v=w9_k5dyhcIE', th: '1', tune: 'OLD HUNDREDTH' },
  {
    title: 'Come, Thou Almighty King', video: 'https://www.youtube.com/watch?v=lzzZVLlONmA', th: '101', tune: 'ITALIAN HYMN',
    source: 'Anonymous, c. 1757',
    stanzas: [
      'Come, thou almighty King,\nHelp us thy name to sing,\nHelp us to praise:\nFather all-glorious,\nO’er all victorious,\nCome, and reign over us,\nAncient of Days.',
      'Come, thou incarnate Word,\nGird on thy mighty sword,\nOur prayer attend:\nCome, and thy people bless,\nAnd give thy word success;\nSpirit of holiness,\nOn us descend.',
      'Come, holy Comforter,\nThy sacred witness bear\nIn this glad hour:\nThou who almighty art,\nNow rule in every heart,\nAnd ne’er from us depart,\nSpirit of power.',
      'To the great One in Three\nEternal praises be,\nHence evermore.\nHis sovereign majesty\nMay we in glory see,\nAnd to eternity\nLove and adore.',
    ],
  },
  {
    title: 'Immortal, Invisible, God Only Wise', video: 'https://www.youtube.com/watch?v=PS3QinSmPHI', th: '38', tune: 'ST. DENIO',
    source: 'Walter Chalmers Smith, 1867',
    stanzas: [
      'Immortal, invisible, God only wise,\nIn light inaccessible hid from our eyes,\nMost blessed, most glorious, the Ancient of Days,\nAlmighty, victorious, thy great name we praise.',
      'Unresting, unhasting, and silent as light,\nNor wanting, nor wasting, thou rulest in might;\nThy justice like mountains high soaring above\nThy clouds which are fountains of goodness and love.',
      'To all life thou givest, to both great and small;\nIn all life thou livest, the true life of all;\nWe blossom and flourish as leaves on the tree,\nAnd wither and perish; but naught changeth thee.',
      'Great Father of glory, pure Father of light,\nThine angels adore thee, all veiling their sight;\nAll laud we would render: O help us to see\n’Tis only the splendour of light hideth thee.',
    ],
  },
  {
    title: 'O for a Thousand Tongues to Sing', th: '164', tune: 'AZMON',
    source: 'Charles Wesley, 1739',
    stanzas: [
      'O for a thousand tongues to sing\nMy great Redeemer’s praise,\nThe glories of my God and King,\nThe triumphs of his grace!',
      'My gracious Master and my God,\nAssist me to proclaim,\nTo spread through all the earth abroad\nThe honours of thy name.',
      'Jesus! the name that charms our fears,\nThat bids our sorrows cease;\n’Tis music in the sinner’s ears,\n’Tis life, and health, and peace.',
      'He breaks the power of cancelled sin,\nHe sets the prisoner free;\nHis blood can make the foulest clean;\nHis blood availed for me.',
    ],
  },
  {
    title: 'This Is the Day the Lord Hath Made', th: '389', tune: 'ARLINGTON',
    source: 'Isaac Watts, 1719, after Psalm 118:24–26',
    stanzas: [
      'This is the day the Lord hath made;\nHe calls the hours his own;\nLet heaven rejoice, let earth be glad,\nAnd praise surround the throne.',
      'Today he rose and left the dead,\nAnd Satan’s empire fell;\nToday the saints his triumphs spread,\nAnd all his wonders tell.',
      'Hosanna to th’ anointed King,\nTo David’s holy Son!\nHelp us, O Lord; descend and bring\nSalvation from thy throne.',
      'Hosanna in the highest strains\nThe church on earth can raise;\nThe highest heavens, in which he reigns,\nShall give him nobler praise.',
    ],
  },
  {
    title: 'Now Thank We All Our God', video: 'https://www.youtube.com/watch?v=9c7VaTjyuLA', th: '98', tune: 'NUN DANKET',
    source: 'Martin Rinkart, c. 1636; translated by Catherine Winkworth, 1858',
    stanzas: [
      'Now thank we all our God,\nWith heart, and hands, and voices,\nWho wondrous things hath done,\nIn whom his world rejoices;\nWho, from our mothers’ arms,\nHath blessed us on our way\nWith countless gifts of love,\nAnd still is ours today.',
      'O may this bounteous God\nThrough all our life be near us,\nWith ever joyful hearts\nAnd blessed peace to cheer us;\nAnd keep us in his grace,\nAnd guide us when perplexed,\nAnd free us from all ills\nIn this world and the next.',
      'All praise and thanks to God\nThe Father now be given,\nThe Son, and him who reigns\nWith them in highest heaven,\nThe one eternal God,\nWhom earth and heaven adore;\nFor thus it was, is now,\nAnd shall be evermore.',
    ],
  },
  {
    title: 'A Mighty Fortress Is Our God', video: 'https://www.youtube.com/watch?v=V9uGNb8Zfic', th: '92', tune: 'EIN’ FESTE BURG',
    source: 'Martin Luther, 1529; translated by Frederic H. Hedge, 1853',
    stanzas: [
      'A mighty fortress is our God,\nA bulwark never failing;\nOur helper he amid the flood\nOf mortal ills prevailing.\nFor still our ancient foe\nDoth seek to work us woe;\nHis craft and power are great,\nAnd armed with cruel hate,\nOn earth is not his equal.',
      'Did we in our own strength confide,\nOur striving would be losing;\nWere not the right man on our side,\nThe man of God’s own choosing.\nDost ask who that may be?\nChrist Jesus, it is he;\nLord Sabaoth his name,\nFrom age to age the same,\nAnd he must win the battle.',
      'And though this world, with devils filled,\nShould threaten to undo us,\nWe will not fear, for God hath willed\nHis truth to triumph through us.\nThe prince of darkness grim,\nWe tremble not for him;\nHis rage we can endure,\nFor lo! his doom is sure;\nOne little word shall fell him.',
      'That word above all earthly powers,\nNo thanks to them, abideth;\nThe Spirit and the gifts are ours\nThrough him who with us sideth.\nLet goods and kindred go,\nThis mortal life also;\nThe body they may kill:\nGod’s truth abideth still;\nHis kingdom is for ever.',
    ],
  },
];

export const evening = [
  {
    title: 'All Praise to Thee, My God, This Night', video: 'https://www.youtube.com/watch?v=VqKgGqvSiW4', th: '401', tune: 'TALLIS’ CANON',
    source: 'Thomas Ken, 1695, revised 1709',
    stanzas: [
      'All praise to thee, my God, this night,\nFor all the blessings of the light;\nKeep me, O keep me, King of kings,\nBeneath thine own almighty wings.',
      'Forgive me, Lord, for thy dear Son,\nThe ill that I this day have done,\nThat with the world, myself, and thee,\nI, ere I sleep, at peace may be.',
      'Teach me to live, that I may dread\nThe grave as little as my bed;\nTeach me to die, that so I may\nRise glorious at the awful day.',
      'O may my soul on thee repose,\nAnd with sweet sleep mine eyelids close,\nSleep that may me more vigorous make\nTo serve my God when I awake.',
      'Praise God, from whom all blessings flow;\nPraise him, all creatures here below;\nPraise him above, ye heavenly host;\nPraise Father, Son, and Holy Ghost.',
    ],
  },
  {
    title: 'Abide with Me', th: '402', tune: 'EVENTIDE',
    source: 'Henry Francis Lyte, 1847',
    stanzas: [
      'Abide with me; fast falls the eventide;\nThe darkness deepens; Lord, with me abide;\nWhen other helpers fail and comforts flee,\nHelp of the helpless, O abide with me.',
      'Swift to its close ebbs out life’s little day;\nEarth’s joys grow dim, its glories pass away;\nChange and decay in all around I see;\nO thou who changest not, abide with me.',
      'I need thy presence every passing hour;\nWhat but thy grace can foil the tempter’s power?\nWho like thyself my guide and stay can be?\nThrough cloud and sunshine, O abide with me.',
      'I fear no foe, with thee at hand to bless;\nIlls have no weight, and tears no bitterness;\nWhere is death’s sting? where, grave, thy victory?\nI triumph still, if thou abide with me.',
      'Hold thou thy cross before my closing eyes;\nShine through the gloom, and point me to the skies;\nHeaven’s morning breaks, and earth’s vain shadows flee;\nIn life, in death, O Lord, abide with me.',
    ],
  },
  {
    title: 'Sun of My Soul, Thou Saviour Dear', th: '404', tune: 'HURSLEY',
    source: 'John Keble, 1820',
    stanzas: [
      'Sun of my soul, thou Saviour dear,\nIt is not night if thou be near;\nO may no earth-born cloud arise\nTo hide thee from thy servant’s eyes.',
      'When the soft dews of kindly sleep\nMy wearied eyelids gently steep,\nBe my last thought, how sweet to rest\nFor ever on my Saviour’s breast.',
      'Abide with me from morn till eve,\nFor without thee I cannot live;\nAbide with me when night is nigh,\nFor without thee I dare not die.',
      'Come near and bless us when we wake,\nEre through the world our way we take,\nTill in the ocean of thy love\nWe lose ourselves in heaven above.',
    ],
  },
  {
    title: 'Saviour, Breathe an Evening Blessing', video: 'https://www.youtube.com/watch?v=MZiBHr-uvnA', th: '403', tune: 'EVENING PRAYER',
    source: 'James Edmeston, 1820',
    stanzas: [
      'Saviour, breathe an evening blessing,\nEre repose our spirits seal;\nSin and want we come confessing;\nThou canst save, and thou canst heal.',
      'Though destruction walk around us,\nThough the arrows past us fly,\nAngel guards from thee surround us;\nWe are safe, if thou art nigh.',
      'Though the night be dark and dreary,\nDarkness cannot hide from thee;\nThou art he who, never weary,\nWatchest where thy people be.',
      'Should swift death this night o’ertake us,\nAnd our couch become our tomb,\nMay the morn in heaven awake us,\nClad in light and deathless bloom.',
    ],
  },
  {
    title: 'God, That Madest Earth and Heaven', video: 'https://www.youtube.com/watch?v=YGq-EvN2zFg', th: '405', tune: 'AR HYD Y NOS',
    source: 'Reginald Heber, 1827 (stanza 1); Richard Whately, 1855 (stanza 2)',
    stanzas: [
      'God, that madest earth and heaven,\nDarkness and light;\nWho the day for toil hast given,\nFor rest the night;\nMay thine angel guards defend us,\nSlumber sweet thy mercy send us,\nHoly dreams and hopes attend us,\nThis livelong night.',
      'Guard us waking, guard us sleeping,\nAnd, when we die,\nMay we in thy mighty keeping\nAll peaceful lie;\nWhen the last dread call shall wake us,\nDo not thou our God forsake us,\nBut to reign in glory take us\nWith thee on high.',
    ],
  },
  {
    title: 'Now the Day Is Over', th: '406', tune: 'MERRIAL',
    source: 'Sabine Baring-Gould, 1865',
    stanzas: [
      'Now the day is over,\nNight is drawing nigh,\nShadows of the evening\nSteal across the sky.',
      'Jesus, give the weary\nCalm and sweet repose;\nWith thy tenderest blessing\nMay our eyelids close.',
      'Grant to little children\nVisions bright of thee;\nGuard the sailors tossing\nOn the deep blue sea.',
      'Through the long night watches\nMay thine angels spread\nTheir white wings above me,\nWatching round my bed.',
      'When the morning wakens,\nThen may I arise\nPure, and fresh, and sinless\nIn thy holy eyes.',
      'Glory to the Father,\nGlory to the Son,\nAnd to thee, blest Spirit,\nWhilst all ages run.',
    ],
  },
  {
    title: 'The Day Thou Gavest, Lord, Is Ended', th: '407', tune: 'ST. CLEMENT',
    source: 'John Ellerton, 1870',
    note: 'The Trinity Hymnal prints this hymn in modernized form, beginning “The day you gave us, Lord, is ended.”',
    stanzas: [
      'The day thou gavest, Lord, is ended,\nThe darkness falls at thy behest;\nTo thee our morning hymns ascended,\nThy praise shall sanctify our rest.',
      'We thank thee that thy church, unsleeping\nWhile earth rolls onward into light,\nThrough all the world her watch is keeping,\nAnd rests not now by day or night.',
      'As o’er each continent and island\nThe dawn leads on another day,\nThe voice of prayer is never silent,\nNor dies the strain of praise away.',
      'So be it, Lord; thy throne shall never,\nLike earth’s proud empires, pass away;\nThy kingdom stands, and grows for ever,\nTill all thy creatures own thy sway.',
    ],
  },
  {
    title: 'Day Is Dying in the West', video: 'https://www.youtube.com/watch?v=rmaR4DwMULM', th: '408', tune: 'EVENING PRAISE',
    source: 'Mary A. Lathbury, 1877 (refrain 1890)',
    refrain: 'Holy, holy, holy, Lord God of Hosts!\nHeaven and earth are full of thee!\nHeaven and earth are praising thee,\nO Lord most high!',
    stanzas: [
      'Day is dying in the west;\nHeaven is touching earth with rest;\nWait and worship while the night\nSets her evening lamps alight\nThrough all the sky.',
      'Lord of life, beneath the dome\nOf the universe, thy home,\nGather us who seek thy face\nTo the fold of thy embrace,\nFor thou art nigh.',
      'While the deepening shadows fall,\nHeart of Love enfolding all,\nThrough the glory and the grace\nOf the stars that veil thy face,\nOur hearts ascend.',
      'When for ever from our sight\nPass the stars, the day, the night,\nLord of angels, on our eyes\nLet eternal morning rise,\nAnd shadows end.',
    ],
  },
  {
    title: 'Softly Now the Light of Day', video: 'https://www.youtube.com/watch?v=De6C8_w1bLA', th: '409', tune: 'SEYMOUR',
    source: 'George Washington Doane, 1824',
    stanzas: [
      'Softly now the light of day\nFades upon our sight away;\nFree from care, from labour free,\nLord, we would commune with thee.',
      'Thou, whose all-pervading eye\nNaught escapes, without, within,\nPardon each infirmity,\nOpen fault, and secret sin.',
      'Soon for us the light of day\nShall for ever pass away;\nThen, from sin and sorrow free,\nTake us, Lord, to dwell with thee.',
    ],
  },
  {
    title: 'Saviour, Again to Thy Dear Name We Raise', th: '388', tune: 'ELLERS',
    source: 'John Ellerton, 1866',
    stanzas: [
      'Saviour, again to thy dear name we raise\nWith one accord our parting hymn of praise;\nWe stand to bless thee ere our worship cease;\nThen, lowly kneeling, wait thy word of peace.',
      'Grant us thy peace upon our homeward way;\nWith thee began, with thee shall end the day;\nGuard thou the lips from sin, the hearts from shame,\nThat in this house have called upon thy name.',
      'Grant us thy peace, Lord, through the coming night;\nTurn thou for us its darkness into light;\nFrom harm and danger keep thy children free,\nFor dark and light are both alike to thee.',
      'Grant us thy peace throughout our earthly life,\nOur balm in sorrow, and our stay in strife;\nThen, when thy voice shall bid our conflict cease,\nCall us, O Lord, to thine eternal peace.',
    ],
  },
  {
    title: 'Lord, Dismiss Us with Thy Blessing', th: '384', tune: 'SICILIAN MARINERS',
    source: 'Attributed to John Fawcett, 1773',
    stanzas: [
      'Lord, dismiss us with thy blessing;\nFill our hearts with joy and peace;\nLet us each, thy love possessing,\nTriumph in redeeming grace;\nO refresh us, O refresh us,\nTraveling through this wilderness.',
      'Thanks we give and adoration\nFor thy gospel’s joyful sound;\nMay the fruits of thy salvation\nIn our hearts and lives abound;\nEver faithful, ever faithful\nTo the truth may we be found.',
      'So, whene’er the signal’s given\nUs from earth to call away,\nBorne on angels’ wings to heaven,\nGlad the summons to obey,\nMay we ever, may we ever\nReign with Christ in endless day.',
    ],
  },
  { site: 'psalm-23', title: 'The Lord’s My Shepherd', video: 'https://www.youtube.com/watch?v=TqEWKFBLx9E', th: '85–87', tune: 'CRIMOND' },
  { site: 'psalm-90', title: 'O God, Our Help in Ages Past', video: 'https://www.youtube.com/watch?v=BPtuN8DK2hE', th: '30', tune: 'ST. ANNE' },
];
