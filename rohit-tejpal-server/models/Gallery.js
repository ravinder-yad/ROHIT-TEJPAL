import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  cloudinaryId: {
    type: String,
    required: true,
  },
  span: {
    type: String,
    default: 'col-span-1 row-span-1',
  },
  aspect: {
    type: String,
    default: 'aspect-square',
  },
  order: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
});

const Gallery = mongoose.model('Gallery', gallerySchema);
export default Gallery;
