const mongoose = require('mongoose');

const validCategories = [
  "Appetizer",
  "Kids Special",
  "Salad Zone",
  "Green's Classic",
  "Soup Corner",
  "Green's Special",
  "Tea Lover",
  "Sandwich",
  "Cold Coffee",
  "Burger Crowd",
  "Iced Coffee",
  "Panini Corner",
  "Special Drinks",
  "Colada's",
  "Pizza House",
  "Steak House",
  "Pasta La Vistas",
  "Around The World",
  "Rice Corner",
  "Chinese Corner",
  "BBQ Corner",
  "Pakistani Corner",
  "Sea Food",
  "Green's Platters",
  "Naan",
  "Smoothies",
  "Margaritas's",
  "Regular Drinks",
  "Icecream / Dessert"
];

// Replace with your actual MongoDB Atlas connection string
const MONGO_URI = 'mongodb+srv://asimkamalk:asimkamalk123@cluster0.cjgffnd.mongodb.net/FYP?retryWrites=true&w=majority&appName=Cluster0';

const foodSchema = new mongoose.Schema({}, { strict: false });
const Food = mongoose.model('food', foodSchema);

async function updateCategories() {
  await mongoose.connect(MONGO_URI);

  const result = await Food.updateMany(
    { category: { $nin: validCategories } },
    { $set: { category: "Appetizer" } }
  );

  console.log(`Updated ${result.nModified || result.modifiedCount} products.`);
  await mongoose.disconnect();
}

updateCategories().catch(err => {
  console.error(err);
  process.exit(1);
}); 