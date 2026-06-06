import { Types } from 'mongoose';

export const lostItemsSeed = [
  {
    _id: new Types.ObjectId('6b23d8bdbcbfc47449280461'),
    title: 'Missing black mobile',
    description:
      'I misplaced my black Samsung smartphone around the library entrance. It has a cracked black case.',
    locationLost: 'Library entrance',
    gpsLocation: {
      latitude: -37.8136,
      longitude: 144.9631,
    },
    brand: 'Samsung',
    color: 'Black',
    dateLost: new Date('2026-06-01T08:00:00.000Z'),
    imageURL:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Samsung_Galaxy_S_II_black_back.jpg',
    category: '69cf8c352d9893a68b332ca2',
  },
  {
    _id: new Types.ObjectId('6b23d8bdbcbfc47449280462'),
    title: 'Misplaced silver Apple laptop',
    description:
      'I lost my silver MacBook somewhere in or near the computer lab after class.',
    locationLost: 'Computer Lab',
    gpsLocation: {
      latitude: -37.8137,
      longitude: 144.9632,
    },
    brand: 'Apple',
    color: 'Silver',
    dateLost: new Date('2026-06-05T09:00:00.000Z'),
    imageURL:
      'https://commons.wikimedia.org/wiki/Special:FilePath/A_2021_14-inch_Silver_MacBook_Pro.jpg',
    category: '69cf8c352d9893a68b332ca2',
  },
  {
    _id: new Types.ObjectId('6b23d8bdbcbfc47449280463'),
    title: 'Lost white charging adapter',
    description:
      'I lost a white USB-C phone charger near Lecture Hall 2. It had a white cable attached.',
    locationLost: 'Lecture Hall 2',
    gpsLocation: {
      latitude: -37.8138,
      longitude: 144.9633,
    },
    brand: 'Unknown',
    color: 'White',
    dateLost: new Date('2026-06-06T10:00:00.000Z'),
    imageURL:
      'https://commons.wikimedia.org/wiki/Special:FilePath/USB_Type-C_Cable_-_iPad_USB-C_Charger_(45640822114).jpg',
    category: '69cf8c352d9893a68b332ca2',
  },
  {
    _id: new Types.ObjectId('6b23d8bdbcbfc47449280464'),
    title: 'Missing brown billfold',
    description:
      'I lost my brown leather wallet around the cafeteria seating area. It may contain several cards.',
    locationLost: 'Cafeteria',
    gpsLocation: {
      latitude: -37.8139,
      longitude: 144.9634,
    },
    brand: 'Unknown',
    color: 'Brown',
    dateLost: new Date('2026-06-04T07:30:00.000Z'),
    imageURL:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Finnish_markka_coins_in_wallet.jpg',
    category: '69cf8c7062a9ba61f8e5fa1b',
  },
  {
    _id: new Types.ObjectId('6b23d8bdbcbfc47449280465'),
    title: 'Lost small change pouch',
    description:
      'I misplaced a small black coin purse near the reception desk. It has a zipper pocket.',
    locationLost: 'Reception desk',
    gpsLocation: {
      latitude: -37.814,
      longitude: 144.9635,
    },
    brand: 'Unknown',
    color: 'Black',
    dateLost: new Date('2026-06-06T11:00:00.000Z'),
    imageURL:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Crochet_coin_purse.jpg',
    category: '69cf8c7062a9ba61f8e5fa1b',
  },
  {
    _id: new Types.ObjectId('6b23d8bdbcbfc47449280466'),
    title: 'Missing blue class notebook',
    description:
      'I lost my blue spiral exercise book in the library study area. It contains handwritten lecture notes.',
    locationLost: 'Library study area',
    gpsLocation: {
      latitude: -37.8141,
      longitude: 144.9636,
    },
    brand: 'Unknown',
    color: 'Blue',
    dateLost: new Date('2026-06-06T11:45:00.000Z'),
    imageURL:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Map_23_rings.jpg',
    category: '69cf8c6262a9ba61f8e5fa16',
  },
  {
    _id: new Types.ObjectId('6b23d8bdbcbfc47449280467'),
    title: 'Lost green math book',
    description:
      'I lost my green calculus textbook in Classroom B after the morning lecture. It has notes inside.',
    locationLost: 'Classroom B',
    gpsLocation: {
      latitude: -37.8142,
      longitude: 144.9637,
    },
    brand: 'Unknown',
    color: 'Green',
    dateLost: new Date('2026-06-05T05:15:00.000Z'),
    imageURL:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Elementary_Calculus_-_Cover.jpg',
    category: '69cf8c6262a9ba61f8e5fa16',
  },
  {
    _id: new Types.ObjectId('6b23d8bdbcbfc47449280468'),
    title: 'Missing black rain umbrella',
    description:
      'I lost a plain black foldable umbrella near the main entrance. It has a curved handle.',
    locationLost: 'Main entrance',
    gpsLocation: {
      latitude: -37.8143,
      longitude: 144.9638,
    },
    brand: 'Unknown',
    color: 'Black',
    dateLost: new Date('2026-06-06T12:45:00.000Z'),
    imageURL:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Black_Rain.jpg',
    category: '69f9940a8a22591f9eb649a3',
  },
];
