import { createLocalImageResolver } from '../utils';
import { fallbackImage } from '../fallback';

const stateModules = import.meta.glob('../*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  import: 'default',
});

const resolveStateImage = createLocalImageResolver(stateModules);

const hero = (...candidates) => resolveStateImage(candidates);
const gallery = (...candidates) => candidates.map((candidate) => resolveStateImage([candidate]));

export const northStateHeroImages = {
  1: hero('delhi', 'delhi jpg'),
  2: hero('himachalpradesh', 'himachal pradesh'),
  3: hero('punjab'),
  4: hero('uttarpradesh', 'uttar pradesh'),
  5: hero('uttarakhand'),
  6: hero('jammukashmir', 'kashmir'),
  7: hero('rajasthan'),
};

export const southAndOtherStateHeroImages = {
  8: hero('tamilnadu', 'tamil nadu'),
  9: hero('kerala'),
  10: hero('karnataka'),
  11: hero('andhrapradesh', 'andhra pradesh'),
  12: hero('telanagana', 'telangana'),
  13: hero('gao', 'goa'),
  14: hero('westbengal', 'west bengal'),
  15: hero('bihar'),
  16: hero('odisha'),
  17: hero('jharkhand'),
  18: hero('gujarath', 'gujarat'),
  19: hero('maharashtra'),
  20: hero('madhyapradesh', 'madhya pradesh'),
  21: hero('chattisgarh'),
  22: hero('assam'),
  23: hero('meghalaya'),
  24: hero('sikkim'),
  25: hero('arunachalpradesh', 'arunachal pradesh'),
  26: hero('nagaland'),
  27: hero('manipur'),
  28: hero('thripura', 'tripura'),
  29: hero('mizoram'),
};

export const stateHeroImages = {
  ...northStateHeroImages,
  ...southAndOtherStateHeroImages,
};

export const stateGalleryImages = {
  1: gallery('delhi', 'haryana', 'punjab'),
  2: gallery('himachal pradesh', 'uttarakhand', 'kashmir'),
  3: gallery('punjab', 'heritage', 'family trips'),
  4: gallery('uttar pradesh', 'delhi', 'heritage'),
  5: gallery('uttarakhand', 'nature', 'devotiona'),
  6: gallery('kashmir', 'nature', 'advanture'),
  7: gallery('rajasthan', 'heritage', 'luxury'),
  8: gallery('tamil nadu', 'temple', 'nature'),
  9: gallery('kerala', 'family trips', 'honeymoon'),
  10: gallery('karnataka', 'heritage', 'nature'),
  11: gallery('andhra pradesh', 'beaches', 'devotiona'),
  12: gallery('telanagana', 'heritage', 'premium hotel resort'),
  13: gallery('gao', 'beaches', 'luxury'),
  14: gallery('west bengal', 'heritage', 'nature'),
  15: gallery('bihar', 'devotiona', 'heritage'),
  16: gallery('odisha', 'beaches', 'heritage'),
  17: gallery('jharkhand', 'nature', 'advanture'),
  18: gallery('gujarath', 'heritage', 'nature'),
  19: gallery('maharashtra', 'premium hotel resort', 'heritage'),
  20: gallery('madhya pradesh', 'heritage', 'nature'),
  21: gallery('chattisgarh', 'nature', 'advanture'),
  22: gallery('assam', 'nature', 'advanture'),
  23: gallery('meghalaya', 'nature', 'advanture'),
  24: gallery('sikkim', 'nature', 'devotiona'),
  25: gallery('arunachal pradesh', 'nature', 'advanture'),
  26: gallery('nagaland', 'culture', 'advanture'),
  27: gallery('manipur', 'culture', 'nature'),
  28: gallery('thripura', 'heritage', 'nature'),
  29: gallery('mizoram', 'nature', 'culture'),
};

export { fallbackImage };
