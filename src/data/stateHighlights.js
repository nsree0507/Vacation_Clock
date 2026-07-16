import images from '@/utils/localImages'
 
/**
 * @typedef {Object} StateHighlight
 * @property {string} stateName   Display name of the state.
 * @property {string} slug        URL slug (matches statesData slug).
 * @property {string} famousPlace Most famous tourist place of the state.
 * @property {string} famousFood  Signature dish of the state.
 * @property {string} imageUrl    High-quality image of the place/food (local asset).
 * @property {string} weatherCity City used to look up live weather (usually the capital).
 * @property {string} route       Destination/package page for this state.
 */
 
/**
 * Build the canonical destination route for a state.
 * Kept identical to the existing IndiaMap navigation so routing is not disturbed.
 * @param {string} slug
 * @returns {string}
 */
export const stateRoute = (slug) => `/places?type=state&value=${slug}`
 
/**
 * Sample highlight data for every major Indian state.
 * Keyed by slug so it merges cleanly with `statesData` (same slugs).
 * Images are reused from the existing local asset map to keep everything
 * offline-safe and on-brand.
 * @type {Record<string, StateHighlight>}
 */
export const stateHighlights = {
  // ── NORTH INDIA ───────────────────────────────────────────────
  haryana: {
    stateName: 'Haryana',
    slug: 'haryana',
    famousPlace: 'Kurukshetra',
    famousFood: 'Kadhi Pakora',
    imageUrl: images.haryana,
    weatherCity: 'Chandigarh',
    route: stateRoute('haryana'),
  },
  'himachal-pradesh': {
    stateName: 'Himachal Pradesh',
    slug: 'himachal-pradesh',
    famousPlace: 'Manali & Rohtang Pass',
    famousFood: 'Siddu',
    imageUrl: images.manali,
    weatherCity: 'Shimla',
    route: stateRoute('himachal-pradesh'),
  },
  punjab: {
    stateName: 'Punjab',
    slug: 'punjab',
    famousPlace: 'Golden Temple, Amritsar',
    famousFood: 'Sarson da Saag & Makki di Roti',
    imageUrl: images.amritsar,
    weatherCity: 'Amritsar',
    route: stateRoute('punjab'),
  },
  'jammu-and-kashmir': {
    stateName: 'Jammu & Kashmir',
    slug: 'jammu-and-kashmir',
    famousPlace: 'Dal Lake, Srinagar',
    famousFood: 'Rogan Josh',
    imageUrl: images.srinagar,
    weatherCity: 'Srinagar',
    route: stateRoute('jammu-and-kashmir'),
  },
  rajasthan: {
    stateName: 'Rajasthan',
    slug: 'rajasthan',
    famousPlace: 'Hawa Mahal, Jaipur',
    famousFood: 'Dal Baati Churma',
    imageUrl: images.rajasthan,
    weatherCity: 'Jaipur',
    route: stateRoute('rajasthan'),
  },
  uttarakhand: {
    stateName: 'Uttarakhand',
    slug: 'uttarakhand',
    famousPlace: 'Rishikesh',
    famousFood: 'Aloo ke Gutke',
    imageUrl: images.rishikesh,
    weatherCity: 'Dehradun',
    route: stateRoute('uttarakhand'),
  },
  'uttar-pradesh': {
    stateName: 'Uttar Pradesh',
    slug: 'uttar-pradesh',
    famousPlace: 'Taj Mahal, Agra',
    famousFood: 'Tunday Kababi',
    imageUrl: images.delhi,
    weatherCity: 'Lucknow',
    route: stateRoute('uttar-pradesh'),
  },
 
  // ── SOUTH INDIA ───────────────────────────────────────────────
  'andhra-pradesh': {
    stateName: 'Andhra Pradesh',
    slug: 'andhra-pradesh',
    famousPlace: 'Tirupati Temple',
    famousFood: 'Andhra Chicken Biryani',
    imageUrl: images.andhraPradesh,
    weatherCity: 'Visakhapatnam',
    route: stateRoute('andhra-pradesh'),
  },
  karnataka: {
    stateName: 'Karnataka',
    slug: 'karnataka',
    famousPlace: 'Hampi',
    famousFood: 'Mysore Masala Dosa',
    imageUrl: images.hampi,
    weatherCity: 'Bengaluru',
    route: stateRoute('karnataka'),
  },
  kerala: {
    stateName: 'Kerala',
    slug: 'kerala',
    famousPlace: 'Alleppey Backwaters',
    famousFood: 'Kerala Sadya',
    imageUrl: images.alleppey,
    weatherCity: 'Kochi',
    route: stateRoute('kerala'),
  },
  'tamil-nadu': {
    stateName: 'Tamil Nadu',
    slug: 'tamil-nadu',
    famousPlace: 'Meenakshi Temple, Madurai',
    famousFood: 'Chettinad Chicken',
    imageUrl: images.tamilNadu,
    weatherCity: 'Chennai',
    route: stateRoute('tamil-nadu'),
  },
  telangana: {
    stateName: 'Telangana',
    slug: 'telangana',
    famousPlace: 'Charminar, Hyderabad',
    famousFood: 'Hyderabadi Biryani',
    imageUrl: images.maharashtra,
    weatherCity: 'Hyderabad',
    route: stateRoute('telangana'),
  },
 
  // ── EAST INDIA ────────────────────────────────────────────────
  bihar: {
    stateName: 'Bihar',
    slug: 'bihar',
    famousPlace: 'Mahabodhi Temple, Bodh Gaya',
    famousFood: 'Litti Chokha',
    imageUrl: images.bihar,
    weatherCity: 'Patna',
    route: stateRoute('bihar'),
  },
  jharkhand: {
    stateName: 'Jharkhand',
    slug: 'jharkhand',
    famousPlace: 'Hundru Falls',
    famousFood: 'Thekua',
    imageUrl: images.jharkhand,
    weatherCity: 'Ranchi',
    route: stateRoute('jharkhand'),
  },
  odisha: {
    stateName: 'Odisha',
    slug: 'odisha',
    famousPlace: 'Konark Sun Temple',
    famousFood: 'Chhena Poda',
    imageUrl: images.konark,
    weatherCity: 'Bhubaneswar',
    route: stateRoute('odisha'),
  },
  'west-bengal': {
    stateName: 'West Bengal',
    slug: 'west-bengal',
    famousPlace: 'Darjeeling',
    famousFood: 'Macher Jhol & Rasgulla',
    imageUrl: images.darjeeling,
    weatherCity: 'Kolkata',
    route: stateRoute('west-bengal'),
  },
 
  // ── WEST INDIA ────────────────────────────────────────────────
  goa: {
    stateName: 'Goa',
    slug: 'goa',
    famousPlace: 'Baga Beach',
    famousFood: 'Goan Fish Curry',
    imageUrl: images.goa,
    weatherCity: 'Panaji',
    route: stateRoute('goa'),
  },
  gujarat: {
    stateName: 'Gujarat',
    slug: 'gujarat',
    famousPlace: 'Statue of Unity & Rann of Kutch',
    famousFood: 'Dhokla',
    imageUrl: images.gujarat,
    weatherCity: 'Ahmedabad',
    route: stateRoute('gujarat'),
  },
  maharashtra: {
    stateName: 'Maharashtra',
    slug: 'maharashtra',
    famousPlace: 'Gateway of India, Mumbai',
    famousFood: 'Vada Pav',
    imageUrl: images.mumbai,
    weatherCity: 'Mumbai',
    route: stateRoute('maharashtra'),
  },
 
  // ── CENTRAL INDIA ─────────────────────────────────────────────
  chhattisgarh: {
    stateName: 'Chhattisgarh',
    slug: 'chhattisgarh',
    famousPlace: 'Chitrakote Falls',
    famousFood: 'Chila',
    imageUrl: images.chattisgarh,
    weatherCity: 'Raipur',
    route: stateRoute('chhattisgarh'),
  },
  'madhya-pradesh': {
    stateName: 'Madhya Pradesh',
    slug: 'madhya-pradesh',
    famousPlace: 'Khajuraho Temples',
    famousFood: 'Poha Jalebi',
    imageUrl: images.khajuraho,
    weatherCity: 'Bhopal',
    route: stateRoute('madhya-pradesh'),
  },
 
  // ── NORTH-EAST INDIA ──────────────────────────────────────────
  'arunachal-pradesh': {
    stateName: 'Arunachal Pradesh',
    slug: 'arunachal-pradesh',
    famousPlace: 'Tawang Monastery',
    famousFood: 'Thukpa',
    imageUrl: images.tawang,
    weatherCity: 'Itanagar',
    route: stateRoute('arunachal-pradesh'),
  },
  assam: {
    stateName: 'Assam',
    slug: 'assam',
    famousPlace: 'Kaziranga National Park',
    famousFood: 'Masor Tenga',
    imageUrl: images.kaziranga,
    weatherCity: 'Guwahati',
    route: stateRoute('assam'),
  },
  manipur: {
    stateName: 'Manipur',
    slug: 'manipur',
    famousPlace: 'Loktak Lake',
    famousFood: 'Eromba',
    imageUrl: images.loktalake,
    weatherCity: 'Imphal',
    route: stateRoute('manipur'),
  },
  meghalaya: {
    stateName: 'Meghalaya',
    slug: 'meghalaya',
    famousPlace: 'Living Root Bridges, Cherrapunji',
    famousFood: 'Jadoh',
    imageUrl: images.cherrapunji,
    weatherCity: 'Shillong',
    route: stateRoute('meghalaya'),
  },
  mizoram: {
    stateName: 'Mizoram',
    slug: 'mizoram',
    famousPlace: 'Phawngpui (Blue Mountain)',
    famousFood: 'Bai',
    imageUrl: images.mizoram,
    weatherCity: 'Aizawl',
    route: stateRoute('mizoram'),
  },
  nagaland: {
    stateName: 'Nagaland',
    slug: 'nagaland',
    famousPlace: 'Dzukou Valley',
    famousFood: 'Smoked Pork with Bamboo Shoot',
    imageUrl: images.nagaland,
    weatherCity: 'Kohima',
    route: stateRoute('nagaland'),
  },
  sikkim: {
    stateName: 'Sikkim',
    slug: 'sikkim',
    famousPlace: 'Tsomgo Lake, Gangtok',
    famousFood: 'Momos & Gundruk',
    imageUrl: images.gangtok,
    weatherCity: 'Gangtok',
    route: stateRoute('sikkim'),
  },
  tripura: {
    stateName: 'Tripura',
    slug: 'tripura',
    famousPlace: 'Ujjayanta Palace, Agartala',
    famousFood: 'Mui Borok',
    imageUrl: images.maharashtra,
    weatherCity: 'Agartala',
    route: stateRoute('tripura'),
  },
  delhi: {
    stateName: 'Delhi',
    slug: 'delhi',
    famousPlace: 'Red Fort, India Gate',
    famousFood: 'Chole Bhature, Butter Chicken',
    imageUrl: images.delhi,
    weatherCity: 'New Delhi',
    route: stateRoute('delhi'),
  },
}
 
/**
 * Look up highlight data for a state by slug.
 * @param {string|null|undefined} slug
 * @returns {StateHighlight|null}
 */
export const getStateHighlight = (slug) =>
  (slug && stateHighlights[slug]) || null
 
export default stateHighlights