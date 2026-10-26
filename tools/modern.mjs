// Waterside Office — modern-English wording of the 1662 Prayer Book texts.
//
// Shown when the reader switches the app to "Modern English". Each text is the same
// 1662 prayer with its older forms updated (thee/thou → you, -eth → -s, Ghost → Spirit,
// and a few words whose meaning has shifted). Nothing is added or taken away. These
// renderings were made for Waterside Press and are labelled as such in the app.
//
// Collects are matched to the site's texts by their opening words, so the site can
// reorder or retitle them without breaking the app. Hymns stay in their original words,
// and the Lord’s Prayer is always said in its traditional form.

export const MODERN_SOURCE = 'Wording modernized by Waterside Press';

export const texts = {
  versicles: [
    ['Leader', 'O Lord, open our lips.'],
    ['All', 'And our mouth shall proclaim your praise.'],
    ['Leader', 'O God, make speed to save us.'],
    ['All', 'O Lord, make haste to help us.'],
    ['Leader', 'Glory be to the Father, and to the Son, and to the Holy Spirit;'],
    ['All', 'As it was in the beginning, is now, and ever shall be, world without end. Amen.'],
    ['Leader', 'Praise the Lord.'],
    ['All', 'The Lord’s name be praised.'],
  ],
  confession: {
    text: 'Almighty and most merciful Father, we have erred and strayed from your ways like lost sheep. We have followed too much the devices and desires of our own hearts. We have offended against your holy laws. We have left undone those things which we ought to have done, and we have done those things which we ought not to have done, and there is no health in us. But you, O Lord, have mercy on us, sinners in need of your mercy. Spare those, O God, who confess their faults. Restore those who are penitent, according to your promises declared to all people in Christ Jesus our Lord. And grant, O most merciful Father, for his sake, that we may from now on live a godly, righteous, and sober life, to the glory of your holy name. Amen.',
    note: 'In 1662 the confession is followed by an absolution pronounced by a priest. In household prayer Waterside follows the common Reformed practice of a declaration of pardon from Scripture instead, which any member of the household may read.',
  },
  creed: {
    text: [
      'I believe in God, the Father Almighty, maker of heaven and earth.',
      'And in Jesus Christ, his only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died, and was buried. He descended into hell. On the third day he rose again from the dead. He ascended into heaven, and is seated at the right hand of God the Father Almighty. From there he will come to judge the living and the dead.',
      'I believe in the Holy Spirit, the holy catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and the life everlasting. Amen.',
    ],
    note: '“Catholic” here means the universal Church of every time and place. Reformed churches have read “he descended into hell” in different ways: the Heidelberg Catechism (Q. 44) as Christ’s bearing of hellish anguish on the cross, the Westminster Larger Catechism (Q. 50) as his continuing under the power of death until the third day.',
  },
  suffrages: [
    ['Leader', 'O Lord, show your mercy to us.'],
    ['All', 'And grant us your salvation.'],
    ['Leader', 'Clothe your ministers with righteousness.'],
    ['All', 'And make your chosen people joyful.'],
    ['Leader', 'O Lord, save your people.'],
    ['All', 'And bless your inheritance.'],
    ['Leader', 'Give peace in our time, O Lord.'],
    ['All', 'For there is no other who fights for us, but only you, O God.'],
    ['Leader', 'O God, make clean our hearts within us.'],
    ['All', 'And do not take your Holy Spirit from us.'],
  ],
};

export const canticles = {
  gloria: 'Glory be to the Father, and to the Son : and to the Holy Spirit; As it was in the beginning, is now, and ever shall be : world without end. Amen.',
  benedictus: [
    'Blessed be the Lord God of Israel : for he has visited and redeemed his people;',
    'And has raised up a mighty salvation for us : in the house of his servant David;',
    'As he spoke by the mouth of his holy prophets : who have been since the world began;',
    'That we should be saved from our enemies : and from the hand of all who hate us;',
    'To show the mercy promised to our forefathers : and to remember his holy covenant;',
    'To keep the oath which he swore to our forefather Abraham : that he would grant us;',
    'That we, being delivered out of the hand of our enemies : might serve him without fear;',
    'In holiness and righteousness before him : all the days of our life.',
    'And you, child, shall be called the prophet of the Most High : for you shall go before the face of the Lord to prepare his ways;',
    'To give knowledge of salvation to his people : for the forgiveness of their sins,',
    'Through the tender mercy of our God : by which the dawn from on high has visited us;',
    'To give light to those who sit in darkness and in the shadow of death : and to guide our feet into the way of peace.',
  ],
  teDeum: [
    'We praise you, O God : we acknowledge you to be the Lord.',
    'All the earth worships you : the Father everlasting.',
    'To you all angels cry aloud : the heavens and all the powers in them.',
    'To you cherubim and seraphim : continually cry,',
    'Holy, holy, holy : Lord God of hosts;',
    'Heaven and earth are full of the majesty : of your glory.',
    'The glorious company of the apostles : praise you.',
    'The goodly fellowship of the prophets : praise you.',
    'The noble army of martyrs : praise you.',
    'The holy Church throughout all the world : acknowledges you;',
    'The Father : of an infinite majesty;',
    'Your honoured, true : and only Son;',
    'Also the Holy Spirit : the Comforter.',
    'You are the King of glory : O Christ.',
    'You are the everlasting Son : of the Father.',
    'When you took it upon yourself to deliver us : you did not shun the Virgin’s womb.',
    'When you had overcome the sharpness of death : you opened the kingdom of heaven to all believers.',
    'You sit at the right hand of God : in the glory of the Father.',
    'We believe that you will come : to be our judge.',
    'We therefore pray you, help your servants : whom you have redeemed with your precious blood.',
    'Make them to be numbered with your saints : in glory everlasting.',
    'O Lord, save your people : and bless your heritage.',
    'Govern them : and lift them up for ever.',
    'Day by day : we magnify you;',
    'And we worship your name : for ever and ever.',
    'Keep us, O Lord, this day : without sin.',
    'O Lord, have mercy on us : have mercy on us.',
    'O Lord, let your mercy be upon us : as our trust is in you.',
    'O Lord, in you have I trusted : let me never be put to shame.',
  ],
  magnificat: [
    'My soul magnifies the Lord : and my spirit rejoices in God my Saviour.',
    'For he has regarded : the lowliness of his servant.',
    'For behold, from now on : all generations shall call me blessed.',
    'For he that is mighty has done great things for me : and holy is his name.',
    'And his mercy is on those who fear him : throughout all generations.',
    'He has shown strength with his arm : he has scattered the proud in the imagination of their hearts.',
    'He has brought down the mighty from their thrones : and has exalted the humble and meek.',
    'He has filled the hungry with good things : and the rich he has sent empty away.',
    'Remembering his mercy, he has helped his servant Israel : as he promised to our forefathers, Abraham and his offspring, for ever.',
  ],
  nuncDimittis: [
    'Lord, now let your servant depart in peace : according to your word.',
    'For my eyes have seen : your salvation,',
    'Which you have prepared : before the face of all people;',
    'To be a light to enlighten the Gentiles : and to be the glory of your people Israel.',
  ],
};

// Matched to the site's collects by their first words.
export const collects = [
  { starts: 'O God, who art the author of peace', text: 'O God, the author of peace and lover of concord, to know you is eternal life, and to serve you is perfect freedom: Defend us, your humble servants, in all assaults of our enemies; that we, surely trusting in your defence, may not fear the power of any adversaries; through the might of Jesus Christ our Lord. Amen.' },
  { starts: 'O Lord, our heavenly Father, Almighty and everlasting God, who hast safely brought us', text: 'O Lord, our heavenly Father, almighty and everlasting God, who have safely brought us to the beginning of this day: Defend us in the same with your mighty power; and grant that this day we fall into no sin, nor run into any kind of danger; but that all our doings may be ordered by your governance, to do always what is righteous in your sight; through Jesus Christ our Lord. Amen.' },
  { starts: 'Almighty God, who through thine only-begotten Son', text: 'Almighty God, who through your only-begotten Son Jesus Christ have overcome death and opened to us the gate of everlasting life: We humbly ask that, as by your special grace going before us you put good desires into our minds, so by your continual help we may bring them to good effect; through Jesus Christ our Lord, who lives and reigns with you and the Holy Spirit, one God, for ever and ever. Amen.', note: '' },
  { starts: 'O God, from whom all holy desires', text: 'O God, from whom all holy desires, all good counsels, and all just works proceed: Give to your servants that peace which the world cannot give; that our hearts may be set to obey your commandments, and also that we, being defended by you from the fear of our enemies, may pass our time in rest and quietness; through the merits of Jesus Christ our Saviour. Amen.' },
  { starts: 'Lighten our darkness', text: 'Lighten our darkness, we pray, O Lord; and by your great mercy defend us from all perils and dangers of this night; for the love of your only Son, our Saviour, Jesus Christ. Amen.' },
];
