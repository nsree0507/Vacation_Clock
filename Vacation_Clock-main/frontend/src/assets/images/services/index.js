import { createLocalImageMap } from '../utils';

const serviceModules = import.meta.glob('../*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  import: 'default',
});

export const serviceImages = createLocalImageMap(serviceModules, {
  caretaker: ['care taker service', 'caretaker'],
  photographer: ['photography'],
  guide: ['private tour guide'],
  transport: ['premium hotel resort'],
  support: ['family trips'],
  insurance: ['premium hotel resort'],
  privateGuide: ['private tour guide'],
  travelPhotography: ['photography'],
  luxuryHoneymoon: ['honeymoon'],
  adventureTourism: ['advanture'],
  natureTourism: ['nature'],
  heritageTourism: ['heritage'],
  familyTrips: ['family trips'],
  devotionalTourism: ['devotiona'],
  groupTravel: ['family trips'],
  premiumHotel: ['premium hotel resort'],
  itineraryPlanning: ['itenary'],
  interactiveMap: ['heritage'],
});
