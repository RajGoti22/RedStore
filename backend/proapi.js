const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());

// ✅ Serve static images from 'imageBackend' folder
app.use('/images', express.static('imageBackend'));

// ✅ Categories and sample data
const categories = [
  'Footwear', 'Sportswear', 'Cricket', 'Football', 'Basketball',
  'Tennis', 'Badminton', 'Swimming', 'Gym', 'Yoga', 'Cycling',
  'Fitness Equipment', 'Accessories', 'Boxing', 'Running'
];

const sampleTitles = {
  Footwear: ['Nike Air Zoom', 'Adidas Ultraboost', 'Puma Velocity Nitro'],
  Sportswear: ['Under Armour Tee', 'Nike Dri-FIT Shorts', 'Adidas Track Pants'],
  Cricket: ['SG Cricket Bat', 'Kookaburra Helmet', 'MRF Batting Gloves'],
  Football: ['Adidas Predator Boots', 'Nike Football Jersey', 'Puma Shin Guards'],
  Basketball: ['Spalding NBA Ball', 'Nike Elite Shorts', 'Jordan Basketball Shoes'],
  Tennis: ['Wilson Racket', 'Head Tennis Balls', 'Yonex Grip Tape'],
  Badminton: ['Yonex Racket', 'Li-Ning Shuttlecocks', 'Victor Kit Bag'],
  Swimming: ['Speedo Goggles', 'Arena Swim Cap', 'TYR Swim Fins'],
  Gym: ['Everlast Gloves', 'Decathlon Dumbbells', 'Resistance Bands'],
  Yoga: ['Manduka Yoga Mat', 'Yoga Block Set', 'Stretching Strap'],
  Cycling: ['BTwin Helmet', 'Cycling Gloves', 'Bike Water Bottle'],
  'Fitness Equipment': ['Treadmill', 'Kettlebell Set', 'Pull-up Bar'],
  Accessories: ['Sports Watch', 'Sweatband Set', 'Water Bottle'],
  Boxing: ['Boxing Gloves', 'Punching Bag', 'Mouth Guard'],
  Running: ['Running Belt', 'Hydration Pack', 'Reflective Vest']
};

const imageUrls = {
  Footwear: 'https://images.unsplash.com/photo-1588361861040-ac9b1018f6d5',
  Sportswear: 'https://images.unsplash.com/photo-1585036156261-1e2ac055414d',
  Cricket: 'http://localhost:5000/images/cricket.jpg',
  Football: 'http://localhost:5000/images/football.avif',
  Basketball: 'http://localhost:5000/images/basketball.avif',
  Tennis: 'http://localhost:5000/images/Tennis.jpeg',
  Badminton: 'http://localhost:5000/images/yonexrackets.jpeg',
  Swimming: 'http://localhost:5000/images/Swimming.jpg',
  Gym: 'http://localhost:5000/images/gym.jpeg',
  Yoga: 'http://localhost:5000/images/yogamat.jpeg',
  Cycling: 'http://localhost:5000/images/Cycling.webp',
  'Fitness Equipment': 'http://localhost:5000/images/FitnessEquipment.jpeg',
  Accessories: 'http://localhost:5000/images/Accessories.jpeg',
  Boxing: 'http://localhost:5000/images/Boxing.jpeg',
  Running: 'http://localhost:5000/images/Running.jpeg'
};

// ✅ Generate 100 products
const products = Array.from({ length: 100 }, (_, i) => {
  const category = categories[i % categories.length];
  const titleOptions = sampleTitles[category];
  const title = `${titleOptions[i % titleOptions.length]} `;
  const imageUrl = imageUrls[category];
  const thumbnail = imageUrl.includes('unsplash.com')
    ? `${imageUrl}?w=600&auto=format&fit=crop&q=60`
    : imageUrl; // Only add query params to Unsplash URLs

  return {
    id: i + 1,
    title,
    price: Math.floor(Math.random() * 4000) + 499,
    thumbnail,
    rating: parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)), // 3.5 - 5.0
    category
  };
});

// ✅ Products API
app.get('/api/products', (req, res) => {
  const { limit } = req.query;
  const limitedProducts = limit ? products.slice(0, parseInt(limit)) : products;
  res.json({ products: limitedProducts });
});

// ✅ Get product by ID
app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (product) {
    // Add mock "images" field for detail page
    res.json({
      ...product,
      images: [product.thumbnail, product.thumbnail] // can duplicate for now
    });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});



// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
