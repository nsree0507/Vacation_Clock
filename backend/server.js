import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import multer from 'multer'
import path from 'path'
import { v2 as cloudinary } from 'cloudinary'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Routes
import adminRoutes from './routes/adminRoutes.js'
import destinationRoutes from './routes/destinationRoutes.js'
import stateRoutes from './routes/stateRoutes.js'
import itineraryRoutes from './routes/itineraryRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'
import userRoutes from './routes/userRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
 
// Models
import Admin from './models/Admin.js'
import Destination from './models/Destination.js'
import State from './models/State.js'
 
// Load .env from backend/ first, then fall back to project root
dotenv.config({ path: path.resolve(__dirname, '.env') })
 
const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vacation-bookings'
 
// Middleware
app.use(cors())
app.use(express.json())
 
// ==================== Cloudinary ====================

const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
}

cloudinary.config(cloudinaryConfig)

const isCloudinaryConfigured = Boolean(
  cloudinaryConfig.cloud_name &&
  cloudinaryConfig.api_key &&
  cloudinaryConfig.api_secret
)

if (!isCloudinaryConfigured) {
  console.warn('Cloudinary environment variables are missing. Image uploads will fail until CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET are set.')
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
})

app.post('/api/upload', upload.single('image'), async (req, res) => {
  if (!req.file?.buffer) {
    return res.status(400).json({
      success: false,
      message: 'No image uploaded',
    })
  }

  try {
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'vacation-clock',
          allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
          resource_type: 'image',
        },
        (error, result) => {
          if (error) return reject(error)
          resolve(result)
        }
      )

      stream.end(req.file.buffer)
    })

    res.json({
      success: true,
      imageUrl: uploadResult.secure_url,
    })
  } catch (error) {
    console.error('Cloudinary upload failed:', error)
    return res.status(500).json({
      success: false,
      message: 'Image upload failed',
    })
  }
})
 
// ─── Seed: Default Admin ────────────────────────────────────────────────────
const seedDefaultAdmin = async () => {
  try {
    const adminCount = await Admin.countDocuments()
    if (adminCount === 0) {
      const admin = new Admin({
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'superadmin',
      })
      await admin.save()
      console.log('Default admin user seeded successfully')
    }
  } catch (err) {
    console.error('Error seeding default admin:', err)
  }
}

// ─── Seed: All 119 Destinations ─────────────────────────────────────────────
const seedDestinations = async () => {
  try {
    const count = await Destination.countDocuments()
    if (count > 0) {
      console.log(`Destinations already seeded (${count} found). Skipping.`)
      return
    }
 
    const destinations = [
      { slug: 'hyderabad', name: 'Hyderabad', state: 'telangana', category: 'Corporate', description: 'The City of Pearls - Modern metro meets historic charm with Charminar, biryani, and tech parks', rating: 4.6, price: 12999, days: 3, nights: 2 },
      { slug: 'warangal', name: 'Warangal', state: 'telangana', category: 'Heritage', description: 'Ancient fort city with 12th-century architecture and rich cultural heritage', rating: 4.7, price: 8999, days: 2, nights: 1 },
      { slug: 'ramappa-temple', name: 'Ramappa Temple', state: 'telangana', category: 'Heritage', description: 'UNESCO World Heritage temple with stunning architecture and intricate carvings', rating: 4.6, price: 7999, days: 2, nights: 1 },
      { slug: 'nagarjuna-sagar', name: 'Nagarjuna Sagar', state: 'telangana', category: 'Religious', description: 'Sacred reservoir with ancient dam and religious significance', rating: 4.2, price: 4999, days: 1, nights: null },
      { slug: 'yadadri', name: 'Yadadri (Yadagirigutta)', state: 'telangana', category: 'Religious', description: 'Sacred pilgrimage site with ancient temple on hilltop', rating: 4.8, price: 4999, days: 1, nights: null },
      { slug: 'bhadrachalam', name: 'Bhadrachalam', state: 'telangana', category: 'Religious', description: 'Sacred temple town on the banks of Godavari River', rating: 4.6, price: 8999, days: 2, nights: 1 },
      { slug: 'medak', name: 'Medak', state: 'telangana', category: 'Heritage', description: 'Historic fort town with architectural heritage', rating: 4.8, price: 4999, days: 1, nights: null },
      { slug: 'vikarabad', name: 'Vikarabad', state: 'telangana', category: 'Adventure', description: 'Forest retreat and adventure destination near Hyderabad', rating: 4.7, price: 9999, days: 2, nights: 1 },
      { slug: 'basar', name: 'Basar', state: 'telangana', category: 'Religious', description: 'Famous Saraswati temple town on banks of Godavari', rating: 4.7, price: 4999, days: 1, nights: null },
      { slug: 'adilabad', name: 'Adilabad', state: 'telangana', category: 'Nature', description: 'Tribal culture and natural landscapes in northern Telangana', rating: 4.4, price: 11999, days: 3, nights: 2 },
      { slug: 'tirupati', name: 'Tirupati', state: 'andhra-pradesh', category: 'Religious', description: 'World-famous pilgrimage to Lord Venkateswara temple', rating: 4.8, price: 10999, days: 3, nights: 2 },
      { slug: 'araku-valley', name: 'Araku Valley', state: 'andhra-pradesh', category: 'Nature', description: 'Scenic hill station with coffee plantations and tribal culture', rating: 4.4, price: 11999, days: 2, nights: 1 },
      { slug: 'visakhapatnam', name: 'Visakhapatnam', state: 'andhra-pradesh', category: 'Beaches', description: 'Port city with beaches, submarine museum and scenic valleys', rating: 4.4, price: 9999, days: 2, nights: 1 },
      { slug: 'vijayawada', name: 'Vijayawada', state: 'andhra-pradesh', category: 'Heritage', description: 'Cultural capital on Krishna River with historic temples', rating: 4.3, price: 8999, days: 2, nights: 1 },
      { slug: 'srisailam', name: 'Srisailam', state: 'andhra-pradesh', category: 'Religious', description: 'One of the 12 Jyotirlingas nestled in Nallamala Forest', rating: 4.7, price: 8999, days: 2, nights: 1 },
      { slug: 'lepakshi', name: 'Lepakshi', state: 'andhra-pradesh', category: 'Heritage', description: 'Unique hanging pillar temple with exquisite Vijayanagara art', rating: 4.5, price: 5999, days: 1, nights: null },
      { slug: 'jaipur', name: 'Jaipur', state: 'rajasthan', category: 'Heritage', description: 'The Pink City with majestic forts, palaces and vibrant bazaars', rating: 4.8, price: 15999, days: 4, nights: 3 },
      { slug: 'udaipur', name: 'Udaipur', state: 'rajasthan', category: 'Heritage', description: 'City of Lakes with romantic palaces and cultural richness', rating: 4.9, price: 18999, days: 4, nights: 3 },
      { slug: 'jodhpur', name: 'Jodhpur', state: 'rajasthan', category: 'Heritage', description: 'The Blue City dominated by the imposing Mehrangarh Fort', rating: 4.7, price: 14999, days: 3, nights: 2 },
      { slug: 'jaisalmer', name: 'Jaisalmer', state: 'rajasthan', category: 'Adventure', description: 'Golden city in the Thar Desert with sand dunes and camel safaris', rating: 4.8, price: 16999, days: 3, nights: 2 },
      { slug: 'pushkar', name: 'Pushkar', state: 'rajasthan', category: 'Religious', description: 'Sacred lake city with famous Brahma temple and annual camel fair', rating: 4.6, price: 9999, days: 2, nights: 1 },
      { slug: 'ranthambore', name: 'Ranthambore', state: 'rajasthan', category: 'Wildlife', description: 'Famous tiger reserve with historic fort ruins inside the park', rating: 4.7, price: 19999, days: 3, nights: 2 },
      { slug: 'mount-abu', name: 'Mount Abu', state: 'rajasthan', category: 'Nature', description: 'Only hill station in Rajasthan with serene Nakki Lake', rating: 4.5, price: 12999, days: 3, nights: 2 },
      { slug: 'kochi', name: 'Kochi', state: 'kerala', category: 'Heritage', description: 'Queen of the Arabian Sea with colonial heritage and backwaters', rating: 4.7, price: 13999, days: 3, nights: 2 },
      { slug: 'munnar', name: 'Munnar', state: 'kerala', category: 'Nature', description: 'Emerald hill station with tea gardens and misty mountains', rating: 4.8, price: 14999, days: 3, nights: 2 },
      { slug: 'alleppey', name: 'Alleppey (Alappuzha)', state: 'kerala', category: 'Nature', description: 'Venice of the East with famous houseboat cruises on backwaters', rating: 4.9, price: 16999, days: 2, nights: 1 },
      { slug: 'thekkady', name: 'Thekkady', state: 'kerala', category: 'Wildlife', description: 'Gateway to Periyar Wildlife Sanctuary with spice trails', rating: 4.7, price: 13999, days: 3, nights: 2 },
      { slug: 'wayanad', name: 'Wayanad', state: 'kerala', category: 'Nature', description: 'Misty highland with tribal culture, waterfalls and wildlife', rating: 4.8, price: 12999, days: 3, nights: 2 },
      { slug: 'kovalam', name: 'Kovalam', state: 'kerala', category: 'Beaches', description: 'World-famous crescent beach with lighthouse and Ayurvedic resorts', rating: 4.6, price: 11999, days: 2, nights: 1 },
      { slug: 'mumbai', name: 'Mumbai', state: 'maharashtra', category: 'Corporate', description: 'The City of Dreams - Bollywood, Gateway of India and street food capital', rating: 4.6, price: 14999, days: 3, nights: 2 },
      { slug: 'pune', name: 'Pune', state: 'maharashtra', category: 'Corporate', description: 'Oxford of the East with pleasant weather and vibrant nightlife', rating: 4.5, price: 11999, days: 2, nights: 1 },
      { slug: 'aurangabad', name: 'Aurangabad', state: 'maharashtra', category: 'Heritage', description: 'Gateway to Ajanta and Ellora UNESCO World Heritage Caves', rating: 4.7, price: 13999, days: 3, nights: 2 },
      { slug: 'lonavala', name: 'Lonavala', state: 'maharashtra', category: 'Nature', description: 'Popular hill station with lush greenery and scenic valleys', rating: 4.4, price: 8999, days: 2, nights: 1 },
      { slug: 'mahabaleshwar', name: 'Mahabaleshwar', state: 'maharashtra', category: 'Nature', description: 'Strawberry capital and hill station with panoramic viewpoints', rating: 4.6, price: 10999, days: 2, nights: 1 },
      { slug: 'shirdi', name: 'Shirdi', state: 'maharashtra', category: 'Religious', description: 'Holy shrine of Sai Baba drawing millions of devotees annually', rating: 4.8, price: 8999, days: 2, nights: 1 },
      { slug: 'goa-beaches', name: 'Goa Beaches', state: 'goa', category: 'Beaches', description: 'Sun, sand and Portuguese heritage on India\'s most popular coastline', rating: 4.8, price: 17999, days: 4, nights: 3 },
      { slug: 'old-goa', name: 'Old Goa', state: 'goa', category: 'Heritage', description: 'Colonial Portuguese churches and cathedrals - UNESCO World Heritage', rating: 4.7, price: 8999, days: 1, nights: null },
      { slug: 'delhi', name: 'Delhi', state: 'delhi', category: 'Heritage', description: 'National capital with Mughal monuments and vibrant street food culture', rating: 4.5, price: 12999, days: 3, nights: 2 },
      { slug: 'agra', name: 'Agra', state: 'uttar-pradesh', category: 'Heritage', description: 'Home to the iconic Taj Mahal - one of the Seven Wonders of the World', rating: 4.9, price: 11999, days: 2, nights: 1 },
      { slug: 'varanasi', name: 'Varanasi', state: 'uttar-pradesh', category: 'Religious', description: 'Oldest living city on earth with sacred Ganga ghats and rituals', rating: 4.8, price: 12999, days: 3, nights: 2 },
      { slug: 'lucknow', name: 'Lucknow', state: 'uttar-pradesh', category: 'Heritage', description: 'City of Nawabs with exquisite kebabs and Mughal architecture', rating: 4.6, price: 10999, days: 2, nights: 1 },
      { slug: 'mathura-vrindavan', name: 'Mathura & Vrindavan', state: 'uttar-pradesh', category: 'Religious', description: 'Birthplace of Lord Krishna and sacred pilgrimage circuits', rating: 4.7, price: 8999, days: 2, nights: 1 },
      { slug: 'rishikesh', name: 'Rishikesh', state: 'uttarakhand', category: 'Adventure', description: 'Yoga capital of the world with river rafting and Ganga aarti', rating: 4.8, price: 12999, days: 3, nights: 2 },
      { slug: 'haridwar', name: 'Haridwar', state: 'uttarakhand', category: 'Religious', description: 'Gateway to Char Dham with evening Ganga aarti ceremony', rating: 4.7, price: 9999, days: 2, nights: 1 },
      { slug: 'mussoorie', name: 'Mussoorie', state: 'uttarakhand', category: 'Nature', description: 'Queen of Hills with Mall Road and panoramic Himalayan views', rating: 4.6, price: 13999, days: 3, nights: 2 },
      { slug: 'dehradun', name: 'Dehradun', state: 'uttarakhand', category: 'Nature', description: 'Capital city in the Doon Valley with pleasant climate year-round', rating: 4.4, price: 10999, days: 2, nights: 1 },
      { slug: 'shimla', name: 'Shimla', state: 'himachal-pradesh', category: 'Nature', description: 'Former summer capital with colonial charm and Himalayan vistas', rating: 4.7, price: 14999, days: 4, nights: 3 },
      { slug: 'manali', name: 'Manali', state: 'himachal-pradesh', category: 'Adventure', description: 'Adventure hub with snow peaks, Rohtang Pass and river rafting', rating: 4.8, price: 16999, days: 5, nights: 4 },
      { slug: 'dharamshala', name: 'Dharamshala', state: 'himachal-pradesh', category: 'Nature', description: 'Home of Dalai Lama with Tibetan culture and Himalayan backdrop', rating: 4.7, price: 13999, days: 3, nights: 2 },
      { slug: 'spiti-valley', name: 'Spiti Valley', state: 'himachal-pradesh', category: 'Adventure', description: 'Cold desert mountain valley with ancient Buddhist monasteries', rating: 4.9, price: 22999, days: 7, nights: 6 },
      { slug: 'srinagar', name: 'Srinagar', state: 'jammu-kashmir', category: 'Nature', description: 'Paradise on earth with Dal Lake houseboats and Mughal gardens', rating: 4.9, price: 19999, days: 5, nights: 4 },
      { slug: 'gulmarg', name: 'Gulmarg', state: 'jammu-kashmir', category: 'Adventure', description: "Meadow of Flowers with Asia's highest gondola and skiing", rating: 4.8, price: 16999, days: 3, nights: 2 },
      { slug: 'pahalgam', name: 'Pahalgam', state: 'jammu-kashmir', category: 'Nature', description: 'Valley of Shepherds with Lidder River and Amarnath base camp', rating: 4.7, price: 14999, days: 3, nights: 2 },
      { slug: 'leh-ladakh', name: 'Leh-Ladakh', state: 'jammu-kashmir', category: 'Adventure', description: 'Rooftop of the World with monasteries, high passes and blue lakes', rating: 4.9, price: 28999, days: 7, nights: 6 },
      { slug: 'bengaluru', name: 'Bengaluru', state: 'karnataka', category: 'Corporate', description: 'Silicon Valley of India with gardens, pubs and tech culture', rating: 4.5, price: 11999, days: 2, nights: 1 },
      { slug: 'mysuru', name: 'Mysuru', state: 'karnataka', category: 'Heritage', description: 'City of Palaces with the grand Mysore Palace and Dasara festival', rating: 4.8, price: 12999, days: 3, nights: 2 },
      { slug: 'coorg', name: 'Coorg', state: 'karnataka', category: 'Nature', description: 'Scotland of India with coffee estates and misty green hills', rating: 4.8, price: 13999, days: 3, nights: 2 },
      { slug: 'hampi', name: 'Hampi', state: 'karnataka', category: 'Heritage', description: 'UNESCO World Heritage ruins of the mighty Vijayanagara Empire', rating: 4.8, price: 10999, days: 2, nights: 1 },
      { slug: 'badami', name: 'Badami', state: 'karnataka', category: 'Heritage', description: 'Cave temples of Chalukyan dynasty carved in red sandstone cliffs', rating: 4.7, price: 9999, days: 2, nights: 1 },
      { slug: 'chennai', name: 'Chennai', state: 'tamil-nadu', category: 'Corporate', description: 'Gateway to South India with Marina Beach and Carnatic music culture', rating: 4.5, price: 10999, days: 2, nights: 1 },
      { slug: 'madurai', name: 'Madurai', state: 'tamil-nadu', category: 'Religious', description: 'Temple city with the iconic Meenakshi Amman Temple complex', rating: 4.8, price: 10999, days: 2, nights: 1 },
      { slug: 'ooty', name: 'Ooty', state: 'tamil-nadu', category: 'Nature', description: 'Queen of Hill Stations with toy train, tea gardens and botanical lake', rating: 4.7, price: 12999, days: 3, nights: 2 },
      { slug: 'kodaikanal', name: 'Kodaikanal', state: 'tamil-nadu', category: 'Nature', description: 'Princess of Hill Stations with star-shaped lake and shola forests', rating: 4.7, price: 11999, days: 3, nights: 2 },
      { slug: 'rameswaram', name: 'Rameswaram', state: 'tamil-nadu', category: 'Religious', description: 'Sacred island with Ramanathaswamy Temple and pristine beaches', rating: 4.8, price: 9999, days: 2, nights: 1 },
      { slug: 'mahabalipuram', name: 'Mahabalipuram', state: 'tamil-nadu', category: 'Heritage', description: 'Shore temples and rock-cut sculptures - UNESCO World Heritage site', rating: 4.6, price: 7999, days: 1, nights: null },
      { slug: 'puri', name: 'Puri', state: 'odisha', category: 'Religious', description: 'Abode of Lord Jagannath with famous Rath Yatra festival', rating: 4.7, price: 10999, days: 3, nights: 2 },
      { slug: 'bhubaneswar', name: 'Bhubaneswar', state: 'odisha', category: 'Heritage', description: 'Temple City of India with over 700 ancient temples', rating: 4.6, price: 9999, days: 2, nights: 1 },
      { slug: 'konark', name: 'Konark', state: 'odisha', category: 'Heritage', description: 'Sun Temple chariot - UNESCO World Heritage architectural masterpiece', rating: 4.8, price: 7999, days: 1, nights: null },
      { slug: 'chilika-lake', name: 'Chilika Lake', state: 'odisha', category: 'Wildlife', description: "Asia's largest brackish water lagoon with migratory birds", rating: 4.7, price: 8999, days: 2, nights: 1 },
      { slug: 'kolkata', name: 'Kolkata', state: 'west-bengal', category: 'Heritage', description: 'City of Joy with Victorian architecture and intellectual culture', rating: 4.6, price: 12999, days: 3, nights: 2 },
      { slug: 'darjeeling', name: 'Darjeeling', state: 'west-bengal', category: 'Nature', description: 'Queen of Hills with toy train, tea estates and Kanchenjunga views', rating: 4.8, price: 14999, days: 4, nights: 3 },
      { slug: 'sundarbans', name: 'Sundarbans', state: 'west-bengal', category: 'Wildlife', description: "World's largest mangrove forest and Royal Bengal Tiger habitat", rating: 4.7, price: 16999, days: 3, nights: 2 },
      { slug: 'ahmedabad', name: 'Ahmedabad', state: 'gujarat', category: 'Heritage', description: 'UNESCO World Heritage city with Sabarmati Ashram and Pol houses', rating: 4.6, price: 11999, days: 2, nights: 1 },
      { slug: 'rann-of-kutch', name: 'Rann of Kutch', state: 'gujarat', category: 'Nature', description: 'Vast white salt desert with the magical Rann Utsav festival', rating: 4.8, price: 15999, days: 3, nights: 2 },
      { slug: 'somnath', name: 'Somnath', state: 'gujarat', category: 'Religious', description: 'First of 12 Jyotirlingas with majestic temple by the Arabian Sea', rating: 4.8, price: 9999, days: 2, nights: 1 },
      { slug: 'dwarka', name: 'Dwarka', state: 'gujarat', category: 'Religious', description: 'One of Char Dham and ancient city of Lord Krishna', rating: 4.7, price: 10999, days: 2, nights: 1 },
      { slug: 'gir-national-park', name: 'Gir National Park', state: 'gujarat', category: 'Wildlife', description: 'Only home of Asiatic Lions in the wild', rating: 4.8, price: 17999, days: 3, nights: 2 },
      { slug: 'amritsar', name: 'Amritsar', state: 'punjab', category: 'Religious', description: 'Golden Temple - holiest shrine of Sikhism with Wagah Border ceremony', rating: 4.9, price: 11999, days: 2, nights: 1 },
      { slug: 'chandigarh', name: 'Chandigarh', state: 'haryana', category: 'Corporate', description: 'Planned city by Le Corbusier with Rock Garden and Sukhna Lake', rating: 4.5, price: 9999, days: 2, nights: 1 },
      { slug: 'bhopal', name: 'Bhopal', state: 'madhya-pradesh', category: 'Heritage', description: 'City of Lakes with ancient cave paintings and tribal art', rating: 4.5, price: 9999, days: 2, nights: 1 },
      { slug: 'khajuraho', name: 'Khajuraho', state: 'madhya-pradesh', category: 'Heritage', description: 'UNESCO temples with intricate 10th-century sculptures', rating: 4.8, price: 12999, days: 2, nights: 1 },
      { slug: 'kanha-national-park', name: 'Kanha National Park', state: 'madhya-pradesh', category: 'Wildlife', description: 'Inspiration for Jungle Book with rich tiger and barasingha population', rating: 4.8, price: 19999, days: 3, nights: 2 },
      { slug: 'bandhavgarh', name: 'Bandhavgarh', state: 'madhya-pradesh', category: 'Wildlife', description: 'Highest density of tigers in India with 10th century fort ruins', rating: 4.8, price: 18999, days: 3, nights: 2 },
      { slug: 'pachmarhi', name: 'Pachmarhi', state: 'madhya-pradesh', category: 'Nature', description: 'Queen of Satpura with ancient caves, waterfalls and dense forests', rating: 4.6, price: 12999, days: 3, nights: 2 },
      { slug: 'raipur', name: 'Raipur', state: 'chhattisgarh', category: 'Corporate', description: 'Gateway to tribal heartland with temples and waterfalls', rating: 4.3, price: 8999, days: 2, nights: 1 },
      { slug: 'chitrakote', name: 'Chitrakote Falls', state: 'chhattisgarh', category: 'Nature', description: "India's widest waterfall - the Niagara of India", rating: 4.7, price: 9999, days: 2, nights: 1 },
      { slug: 'ranchi', name: 'Ranchi', state: 'jharkhand', category: 'Nature', description: 'City of Waterfalls with Hundru Falls and tribal culture', rating: 4.4, price: 9999, days: 2, nights: 1 },
      { slug: 'deoghar', name: 'Deoghar', state: 'jharkhand', category: 'Religious', description: 'Baidyanath Jyotirlinga - one of the most sacred Shiva shrines', rating: 4.7, price: 8999, days: 2, nights: 1 },
      { slug: 'patna', name: 'Patna', state: 'bihar', category: 'Heritage', description: 'Ancient Pataliputra with Buddhist and Mughal historical significance', rating: 4.3, price: 8999, days: 2, nights: 1 },
      { slug: 'bodh-gaya', name: 'Bodh Gaya', state: 'bihar', category: 'Religious', description: 'Where Buddha attained enlightenment under the sacred Bodhi Tree', rating: 4.8, price: 10999, days: 2, nights: 1 },
      { slug: 'nalanda', name: 'Nalanda', state: 'bihar', category: 'Heritage', description: "Ruins of world's first residential university - UNESCO Heritage site", rating: 4.7, price: 8999, days: 1, nights: null },
      { slug: 'guwahati', name: 'Guwahati', state: 'assam', category: 'Religious', description: 'Gateway to Northeast with Kamakhya Temple and Brahmaputra River', rating: 4.5, price: 11999, days: 2, nights: 1 },
      { slug: 'kaziranga', name: 'Kaziranga National Park', state: 'assam', category: 'Wildlife', description: "UNESCO site - home to two-thirds of world's one-horned rhinos", rating: 4.9, price: 18999, days: 3, nights: 2 },
      { slug: 'majuli', name: 'Majuli', state: 'assam', category: 'Nature', description: "World's largest river island with neo-Vaishnavite culture", rating: 4.7, price: 12999, days: 3, nights: 2 },
      { slug: 'tawang', name: 'Tawang', state: 'arunachal-pradesh', category: 'Adventure', description: 'Remote monastery town near Bhutan border with stunning Himalayan landscapes', rating: 4.8, price: 22999, days: 5, nights: 4 },
      { slug: 'ziro-valley', name: 'Ziro Valley', state: 'arunachal-pradesh', category: 'Nature', description: 'UNESCO tentative heritage site with Apatani tribal culture', rating: 4.8, price: 19999, days: 4, nights: 3 },
      { slug: 'cherrapunji', name: 'Cherrapunji', state: 'meghalaya', category: 'Nature', description: 'One of wettest places on earth with living root bridges', rating: 4.7, price: 14999, days: 3, nights: 2 },
      { slug: 'shillong', name: 'Shillong', state: 'meghalaya', category: 'Nature', description: "Scotland of the East with Ward's Lake and rock music culture", rating: 4.6, price: 13999, days: 3, nights: 2 },
      { slug: 'imphal', name: 'Imphal', state: 'manipur', category: 'Heritage', description: 'Capital city with Ima Keithel - world\'s largest all-women market', rating: 4.5, price: 13999, days: 3, nights: 2 },
      { slug: 'loktak-lake', name: 'Loktak Lake', state: 'manipur', category: 'Nature', description: 'Largest freshwater lake in NE India with floating phumdis', rating: 4.7, price: 11999, days: 2, nights: 1 },
      { slug: 'gangtok', name: 'Gangtok', state: 'sikkim', category: 'Nature', description: 'Clean and modern hill capital with Kanchenjunga views and monasteries', rating: 4.8, price: 16999, days: 4, nights: 3 },
      { slug: 'pelling', name: 'Pelling', state: 'sikkim', category: 'Nature', description: 'Gateway to Khangchendzonga with monasteries and mountain panoramas', rating: 4.7, price: 14999, days: 3, nights: 2 },
      { slug: 'agartala', name: 'Agartala', state: 'tripura', category: 'Heritage', description: 'Royal heritage of Tripura with Ujjayanta Palace and ancient temples', rating: 4.4, price: 12999, days: 3, nights: 2 },
      { slug: 'aizawl', name: 'Aizawl', state: 'mizoram', category: 'Nature', description: 'Pristine hilltop capital with Mizo culture and handloom traditions', rating: 4.5, price: 13999, days: 3, nights: 2 },
      { slug: 'kohima', name: 'Kohima', state: 'nagaland', category: 'Heritage', description: 'WWII battle site with Hornbill Festival and Naga tribal culture', rating: 4.6, price: 14999, days: 3, nights: 2 },
      { slug: 'dimapur', name: 'Dimapur', state: 'nagaland', category: 'Heritage', description: 'Gateway to Nagaland with ruins of the ancient Kachari kingdom', rating: 4.3, price: 11999, days: 2, nights: 1 },
    ]
 
    await Destination.insertMany(destinations)
    console.log(`✅ Seeded ${destinations.length} destinations successfully`)
  } catch (err) {
    console.error('Error seeding destinations:', err)
  }
}
 
 
// ─── Seed: All Indian States ─────────────────────────────────────────────────
const seedStates = async () => {
  try {
    const count = await State.countDocuments()
    if (count > 0) {
      console.log(`States already seeded (${count} found). Skipping.`)
      return
    }
 
    const states = [
      { slug: 'andhra-pradesh', name: 'Andhra Pradesh', description: 'Land of rice fields, ancient temples and long coastline along the Bay of Bengal.', famousPlaces: 'Tirupati, Visakhapatnam, Araku Valley, Lepakshi, Srisailam', bestTimeToVisit: 'October to March', foodAndCulture: 'Famous for spicy curries, Pesarattu, Gongura pickle and Kuchipudi dance' },
      { slug: 'arunachal-pradesh', name: 'Arunachal Pradesh', description: 'The Land of the Rising Sun with dense forests, Buddhist monasteries and Himalayan peaks.', famousPlaces: 'Tawang, Ziro Valley, Namdapha, Itanagar, Bomdila', bestTimeToVisit: 'October to April', foodAndCulture: 'Tribal cuisine with bamboo shoot dishes, Apong rice beer and Monpa culture' },
      { slug: 'assam', name: 'Assam', description: 'Gateway to Northeast India, home to one-horned rhinos, tea gardens and the mighty Brahmaputra.', famousPlaces: 'Kaziranga National Park, Majuli Island, Guwahati, Kamakhya Temple, Sivasagar', bestTimeToVisit: 'November to April', foodAndCulture: 'Famous for Assam tea, Duck meat curry, Khar and Bihu dance festival' },
      { slug: 'bihar', name: 'Bihar', description: 'Cradle of civilization with Buddhist heritage, ancient ruins and the sacred Ganga plains.', famousPlaces: 'Bodh Gaya, Nalanda, Patna, Vaishali, Rajgir', bestTimeToVisit: 'October to March', foodAndCulture: 'Litti Chokha, Sattu, Thekua sweets and Chhath Puja festival' },
      { slug: 'chhattisgarh', name: 'Chhattisgarh', description: 'Land of tribal heritage, dense forests, waterfalls and ancient temples in central India.', famousPlaces: 'Chitrakote Falls, Raipur, Bastar, Sirpur, Kanker', bestTimeToVisit: 'October to March', foodAndCulture: 'Chila, Fara, Muthia and vibrant Bastar tribal art and Dussehra' },
      { slug: 'delhi', name: 'Delhi', description: 'India\'s capital — a seamless blend of Mughal grandeur, colonial heritage and modern dynamism.', famousPlaces: 'Red Fort, Qutub Minar, India Gate, Humayun\'s Tomb, Chandni Chowk', bestTimeToVisit: 'October to March', foodAndCulture: 'Butter Chicken, Chole Bhature, Chaat, Parathas and vibrant street food culture' },
      { slug: 'goa', name: 'Goa', description: 'India\'s smallest state with golden beaches, Portuguese heritage and a vibrant nightlife scene.', famousPlaces: 'Calangute Beach, Dudhsagar Falls, Old Goa Churches, Panjim, Anjuna Flea Market', bestTimeToVisit: 'November to February', foodAndCulture: 'Goan Fish Curry, Bebinca, Feni liquor and the legendary Carnival festival' },
      { slug: 'gujarat', name: 'Gujarat', description: 'Land of the Mahatma with white salt deserts, Asiatic lions, ancient ports and a rich mercantile culture.', famousPlaces: 'Rann of Kutch, Gir National Park, Somnath Temple, Ahmedabad, Dwarka', bestTimeToVisit: 'October to March', foodAndCulture: 'Dhokla, Thepla, Khandvi, Garba dance and Navratri festival' },
      { slug: 'haryana', name: 'Haryana', description: 'Agricultural heartland of India, birthplace of Kurukshetra and close neighbor to Delhi.', famousPlaces: 'Kurukshetra, Chandigarh, Pinjore Gardens, Sultanpur Bird Sanctuary, Morni Hills', bestTimeToVisit: 'October to March', foodAndCulture: 'Bajra Khichdi, Kadhi, Lassi and vibrant Baisakhi harvest festival' },
      { slug: 'himachal-pradesh', name: 'Himachal Pradesh', description: 'The abode of snow with majestic mountain ranges, adventure sports and serene Buddhist monasteries.', famousPlaces: 'Shimla, Manali, Dharamshala, Spiti Valley, Kullu Valley', bestTimeToVisit: 'March to June and September to November', foodAndCulture: 'Dham feast, Sidu bread, Babru and vibrant Kullu Dussehra' },
      { slug: 'jharkhand', name: 'Jharkhand', description: 'The land of forests and waterfalls with rich mineral wealth and vibrant tribal traditions.', famousPlaces: 'Ranchi, Hundru Falls, Deoghar, Betla National Park, Jamshedpur', bestTimeToVisit: 'October to March', foodAndCulture: 'Litti Chokha, Rugra mushrooms, Handia rice beer and Sarhul tribal festival' },
      { slug: 'jammu-kashmir', name: 'Jammu & Kashmir', description: 'Paradise on Earth with snow-capped peaks, Dal Lake houseboats, Mughal gardens and saffron fields.', famousPlaces: 'Srinagar, Gulmarg, Pahalgam, Leh-Ladakh, Vaishno Devi', bestTimeToVisit: 'April to October', foodAndCulture: 'Wazwan feast, Rogan Josh, Yakhni, Kashmiri Kahwa tea and Kashmiri handicrafts' },
      { slug: 'karnataka', name: 'Karnataka', description: 'From the ruins of Hampi to the coffee estates of Coorg — a state of stunning diversity.', famousPlaces: 'Mysuru, Hampi, Coorg, Bengaluru, Badami', bestTimeToVisit: 'October to March', foodAndCulture: 'Masala Dosa, Bisi Bele Bath, Mysore Pak and Yakshagana folk theatre' },
      { slug: 'kerala', name: 'Kerala', description: 'God\'s Own Country with tranquil backwaters, spice-scented hills and Ayurvedic wellness traditions.', famousPlaces: 'Alleppey, Munnar, Thekkady, Kovalam, Wayanad', bestTimeToVisit: 'September to March', foodAndCulture: 'Kerala Sadya, Appam with Stew, Fish Moilee, Kathakali dance and Onam festival' },
      { slug: 'madhya-pradesh', name: 'Madhya Pradesh', description: 'The heart of India with UNESCO heritage sites, tiger reserves and a treasure of ancient temples.', famousPlaces: 'Khajuraho, Bandhavgarh, Kanha, Bhopal, Orchha', bestTimeToVisit: 'October to March', foodAndCulture: 'Poha Jalebi, Dal Bafla, Bhutte ka Kees and Gond tribal art' },
      { slug: 'maharashtra', name: 'Maharashtra', description: 'India\'s financial powerhouse with bustling Mumbai, Ajanta-Ellora caves and the Konkan coastline.', famousPlaces: 'Mumbai, Pune, Aurangabad, Lonavala, Shirdi', bestTimeToVisit: 'October to February', foodAndCulture: 'Vada Pav, Misal Pav, Modak, Lavani dance and Ganesh Chaturthi festival' },
      { slug: 'manipur', name: 'Manipur', description: 'The Jewel of India with Loktak Lake, Sangai deer and a rich tradition of classical dance.', famousPlaces: 'Imphal, Loktak Lake, Keibul Lamjao, Moreh, Khonghampat Orchidarium', bestTimeToVisit: 'October to March', foodAndCulture: 'Eromba, Singju salad, Kangshoi and Manipuri classical dance form' },
      { slug: 'meghalaya', name: 'Meghalaya', description: 'Abode of the clouds with living root bridges, one of the wettest places on earth and matrilineal culture.', famousPlaces: 'Shillong, Cherrapunji, Mawlynnong, Dawki, Nohkalikai Falls', bestTimeToVisit: 'September to May', foodAndCulture: 'Jadoh rice-meat dish, Dohneiiong, Tungrymbai and Nongkrem dance festival' },
      { slug: 'mizoram', name: 'Mizoram', description: 'Land of the hill people with terraced bamboo villages, blue mountains and a deeply musical culture.', famousPlaces: 'Aizawl, Phawngpui Peak, Tam Dil Lake, Vantawng Falls, Lunglei', bestTimeToVisit: 'October to March', foodAndCulture: 'Bai bamboo shoot curry, Sawhchiar rice porridge and Chapchar Kut festival' },
      { slug: 'nagaland', name: 'Nagaland', description: 'Land of festivals with fierce Naga warrior traditions, Hornbill Festival and rolling green hills.', famousPlaces: 'Kohima, Dimapur, Dzukou Valley, Intanki National Park, Mon', bestTimeToVisit: 'October to May', foodAndCulture: 'Smoked pork with bamboo shoot, Axone fermented soybean and Hornbill Festival' },
      { slug: 'odisha', name: 'Odisha', description: 'Temple state of India with the Sun Temple at Konark, Puri Jagannath and pristine Chilika Lake.', famousPlaces: 'Puri, Konark, Bhubaneswar, Chilika Lake, Udayagiri Caves', bestTimeToVisit: 'November to March', foodAndCulture: 'Dalma, Pakhala Bhata, Chhena Poda sweets and Odissi classical dance' },
      { slug: 'punjab', name: 'Punjab', description: 'Land of five rivers with the Golden Temple, Bhangra energy and the breadbasket of India.', famousPlaces: 'Amritsar, Chandigarh, Ludhiana, Wagah Border, Anandpur Sahib', bestTimeToVisit: 'October to March', foodAndCulture: 'Butter Chicken, Sarson da Saag, Makke di Roti, Lassi and vibrant Baisakhi' },
      { slug: 'rajasthan', name: 'Rajasthan', description: 'The land of kings with majestic forts, golden sand dunes, vibrant bazaars and royal hospitality.', famousPlaces: 'Jaipur, Udaipur, Jodhpur, Jaisalmer, Ranthambore', bestTimeToVisit: 'October to March', foodAndCulture: 'Dal Baati Churma, Laal Maas, Ghewar and Ghoomar folk dance' },
      { slug: 'sikkim', name: 'Sikkim', description: 'India\'s smallest state nestled in the Himalayas with Buddhist monasteries and Kanchenjunga views.', famousPlaces: 'Gangtok, Pelling, Lachung, Rumtek Monastery, Tsomgo Lake', bestTimeToVisit: 'March to May and October to December', foodAndCulture: 'Momos, Thukpa, Gundruk, Chang millet beer and Losar festival' },
      { slug: 'tamil-nadu', name: 'Tamil Nadu', description: 'Dravidian civilization heartland with towering gopurams, classical arts and the Marina Beach shoreline.', famousPlaces: 'Chennai, Madurai, Ooty, Kodaikanal, Rameswaram', bestTimeToVisit: 'November to February', foodAndCulture: 'Idli, Dosa, Chettinad Chicken, Filter Coffee and Bharatanatyam dance' },
      { slug: 'telangana', name: 'Telangana', description: 'Youngest state of India with Hyderabad\'s Nizam heritage, pearls, biryani and ancient Kakatiya temples.', famousPlaces: 'Hyderabad, Warangal, Ramappa Temple, Nagarjuna Sagar, Yadadri', bestTimeToVisit: 'October to February', foodAndCulture: 'Hyderabadi Biryani, Haleem, Sarva Pindi and Bathukamma floral festival' },
      { slug: 'tripura', name: 'Tripura', description: 'A northeastern gem with royal palaces, bamboo forests and rich Bengali-tribal cultural fusion.', famousPlaces: 'Agartala, Ujjayanta Palace, Neermahal, Unakoti, Sepahijala', bestTimeToVisit: 'October to March', foodAndCulture: 'Mui Borok tribal cuisine, Berma fermented fish, Wahan Mosdeng and Kharchi Puja' },
      { slug: 'uttar-pradesh', name: 'Uttar Pradesh', description: 'Spiritual heartland with the Taj Mahal, Varanasi ghats, Vrindavan and the sacred Ganga plains.', famousPlaces: 'Agra, Varanasi, Lucknow, Mathura, Allahabad', bestTimeToVisit: 'October to March', foodAndCulture: 'Awadhi Biryani, Tunday Kebabs, Petha sweets and Kathak dance' },
      { slug: 'uttarakhand', name: 'Uttarakhand', description: 'Devbhoomi — land of gods with Char Dham pilgrimage, Jim Corbett tigers and Garhwal Himalayan treks.', famousPlaces: 'Rishikesh, Haridwar, Mussoorie, Jim Corbett, Auli', bestTimeToVisit: 'March to June and September to November', foodAndCulture: 'Kafuli greens, Bhang ki Chutney, Aloo ke Gutke and Garhwali folk music' },
      { slug: 'west-bengal', name: 'West Bengal', description: 'Cultural capital of India with the City of Joy, Darjeeling tea, Sundarbans tigers and Durga Puja grandeur.', famousPlaces: 'Kolkata, Darjeeling, Sundarbans, Bishnupur, Murshidabad', bestTimeToVisit: 'October to March', foodAndCulture: 'Hilsa fish curry, Mishti Doi, Rasgulla, Rabindra Sangeet and Durga Puja' },
    ]
 
    await State.insertMany(states)
    console.log(`✅ Seeded ${states.length} states successfully`)
  } catch (err) {
    console.error('Error seeding states:', err)
  }
}
 
 
// ─── Database Connection ─────────────────────────────────────────────────────
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('MongoDB connected')
    await seedDefaultAdmin()
    await seedDestinations()
    await seedStates()
  })
  .catch((err) => console.log('MongoDB connection error:', err))
 
// Routes
app.use('/api/admin', adminRoutes)
app.use('/api/destinations', destinationRoutes)
app.use('/api/states', stateRoutes)
app.use('/api/itineraries', itineraryRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/users', userRoutes)
app.use('/api/contact', contactRoutes)
 
// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Vacation Clock API is running' })
})
 
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error', message: err.message })
})
 
app.listen(PORT, () => {
  console.log(`Vacation Clock server running on port ${PORT}`)
})