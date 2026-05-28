import { fallbackImage } from './fallback';

const normalizeKey = (value) =>
  String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');

const stemFromPath = (path) => normalizeKey(path.split('/').pop().replace(/\.[^.]+$/, ''));

const buildIndex = (modules) => {
  const index = {};

  Object.entries(modules).forEach(([path, value]) => {
    index[stemFromPath(path)] = value;
  });

  return index;
};

export const createLocalImageResolver = (modules) => {
  const index = buildIndex(modules);

  return (candidates) => {
    for (const candidate of candidates) {
      const normalized = normalizeKey(candidate);

      if (index[normalized]) {
        return index[normalized];
      }
    }

    return fallbackImage;
  };
};

export const createLocalImageMap = (modules, definitions) => {
  const resolve = createLocalImageResolver(modules);
  const result = {};

  Object.entries(definitions).forEach(([key, candidates]) => {
    result[key] = resolve(Array.isArray(candidates) ? candidates : [candidates]);
  });

  return result;
};
