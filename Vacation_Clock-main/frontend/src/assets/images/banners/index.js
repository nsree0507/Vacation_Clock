import { createLocalImageMap } from '../utils';

const bannerModules = import.meta.glob('../*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  import: 'default',
});

const resolvedBanners = createLocalImageMap(bannerModules, {
  home: ['delhi', 'rajasthan', 'kerala', 'goa'],
  north: ['delhi', 'himachal pradesh', 'punjab', 'uttar pradesh'],
  south: ['kerala', 'tamil nadu'],
  east: ['west bengal', 'bihar'],
  west: ['gujarath', 'maharashtra'],
  central: ['madhya pradesh', 'chattisgarh'],
  northeast: ['assam', 'meghalaya'],
  services: ['care taker service', 'photography'],
  categories: ['heritage', 'nature'],
  luxury: ['premium hotel resort'],
  adventure: ['advanture'],
  nature: ['nature'],
  heritage: ['heritage'],
  family: ['family trips'],
  devotional: ['devotiona'],
  groupTravel: ['family trips'],
  premiumHotel: ['premium hotel resort'],
  itineraryDashboard: ['itenary'],
  interactiveMap: ['heritage'],
});

export const bannerImages = {
  home: [resolvedBanners.home, resolvedBanners.home, resolvedBanners.home, resolvedBanners.home],
  north: [resolvedBanners.north, resolvedBanners.north, resolvedBanners.north, resolvedBanners.north],
  south: [resolvedBanners.south, resolvedBanners.south],
  east: [resolvedBanners.east, resolvedBanners.east],
  west: [resolvedBanners.west, resolvedBanners.west],
  central: [resolvedBanners.central, resolvedBanners.central],
  northeast: [resolvedBanners.northeast, resolvedBanners.northeast],
  services: resolvedBanners.services,
  categories: resolvedBanners.categories,
  luxury: resolvedBanners.luxury,
  adventure: resolvedBanners.adventure,
  nature: resolvedBanners.nature,
  heritage: resolvedBanners.heritage,
  family: resolvedBanners.family,
  devotional: resolvedBanners.devotional,
  groupTravel: resolvedBanners.groupTravel,
  premiumHotel: resolvedBanners.premiumHotel,
  itineraryDashboard: resolvedBanners.itineraryDashboard,
  interactiveMap: resolvedBanners.interactiveMap,
};
