import { createLocalImageMap } from '../utils';

const categoryModules = import.meta.glob('../*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });

export const categoryImages = createLocalImageMap(categoryModules, {
  devotional: ['devotiona', 'devotional', 'temple'],
  adventure: ['advanture', 'adventure', 'trekking'],
  nature: ['nature', 'landscape'],
  heritage: ['heritage', 'monument'],
  family: ['family trips', 'family', 'family-trips'],
  luxury: ['luxury'],
  honeymoon: ['honeymoon', 'romance'],
  beaches: ['beaches', 'coast'],
  wildlife: ['wildlife', 'safari'],
  culture: ['culture', 'festival'],
});
