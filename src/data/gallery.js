import { IMAGES as I } from './images.js'

// Gallery collections: each has a feature image plus supporting shots shown beside it.
export const GALLERY = [
  {
    key: 'coast',
    title: 'Coast & Ocean',
    text: 'Golden beaches, turquoise bays and lagoons that shift with the light.',
    images: [I.sunsetPalms, I.surfers, I.sandbar, I.coastLagoon, I.swimmers, I.deepBlue, I.rockyCoast, I.dusk, I.goldenSunset],
  },
  {
    key: 'wild',
    title: 'Wild Sri Lanka',
    text: 'Leopards, waterfalls and lagoons in the island’s untamed wild places.',
    images: [I.leopard, I.leopards, I.buffaloLake, I.beeEater, I.buffaloMud, I.kayak, I.waterfall, I.rockView, I.lagoonBoat],
  },
  {
    key: 'heritage',
    title: 'Heritage & Culture',
    text: 'Colonial churches, forgotten ruins and flavours from the far north.',
    images: [I.church, I.ruins, I.crabCurry, I.railway, I.redSunset, I.jungleRoad],
  },
  {
    key: 'retreats',
    title: 'Retreats & Stays',
    text: 'Hidden villas and infinity pools set deep in nature.',
    images: [I.villaCoast, I.rainforestPool, I.cocktails, I.pavilion, I.jungleVilla, I.poolNight],
  },
]
