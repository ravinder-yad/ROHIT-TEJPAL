import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Collection from './models/Collection.js';

dotenv.config();

const updateImages = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Collection.findOneAndUpdate({ slug: 'new-collection' }, { image: '/collection_new.jpg' });
    console.log('Updated new-collection image');

    await Collection.findOneAndUpdate({ slug: 'festive-edit' }, { image: '/collection_festive.jpg' });
    console.log('Updated festive-edit image');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

updateImages();
