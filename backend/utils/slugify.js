/**
 * Convert a string to slug format
 * Handles: spaces, underscores, mixed case, special characters
 * Examples:
 *   "Andhra Pradesh" → "andhra-pradesh"
 *   "himachal_pradesh" → "himachal-pradesh"
 *   "West-Bengal" → "west-bengal"
 */
export const toSlug = (str) => {
  if (!str) return ''
  return str
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/[^\w-]/g, '') // Remove special characters except hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

/**
 * Get standard state slug from various input formats
 * Handles: "Rajasthan", "rajasthan", "Andhra Pradesh", "andhra-pradesh", etc.
 */
export const normalizeStateSlug = (input) => {
  if (!input) return ''
  return toSlug(input)
}

export default { toSlug, normalizeStateSlug }

