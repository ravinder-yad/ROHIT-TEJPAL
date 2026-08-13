import Gallery from "../models/Gallery.js";
import cloudinary from "../config/cloudinary.js";

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
export const getGalleryImages = async (req, res) => {
  try {
    const images = await Gallery.find({}).sort({ order: 1, createdAt: -1 });
    res.status(200).json(images);
  } catch (error) {
    console.error("Error fetching gallery:", error);
    res.status(500).json({ message: "Server error fetching gallery images" });
  }
};

// @desc    Add a gallery image
// @route   POST /api/gallery
// @access  Private/Admin
export const addGalleryImage = async (req, res) => {
  try {
    const { span, aspect, order } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image" });
    }

    // Upload to cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "rohit_tejpal/gallery" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    const newImage = new Gallery({
      imageUrl: uploadResult.secure_url,
      cloudinaryId: uploadResult.public_id,
      span: span || 'col-span-1 row-span-1',
      aspect: aspect || 'aspect-square',
      order: order ? Number(order) : 0,
    });

    const createdImage = await newImage.save();
    res.status(201).json(createdImage);
  } catch (error) {
    console.error("Error adding gallery image:", error);
    res.status(500).json({ message: "Server error adding gallery image" });
  }
};

// @desc    Delete a gallery image
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
export const deleteGalleryImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Delete from cloudinary
    if (image.cloudinaryId) {
      await cloudinary.uploader.destroy(image.cloudinaryId);
    }

    await Gallery.deleteOne({ _id: image._id });
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting gallery image:", error);
    res.status(500).json({ message: "Server error deleting gallery image" });
  }
};

// @desc    Update gallery image details
// @route   PUT /api/gallery/:id
// @access  Private/Admin
export const updateGalleryImage = async (req, res) => {
  try {
    const { span, aspect, order } = req.body;
    
    const image = await Gallery.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // If there's a new file, upload it and delete the old one
    if (req.file) {
      if (image.cloudinaryId) {
        await cloudinary.uploader.destroy(image.cloudinaryId);
      }
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "rohit_tejpal/gallery" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      image.imageUrl = uploadResult.secure_url;
      image.cloudinaryId = uploadResult.public_id;
    }

    image.span = span || image.span;
    image.aspect = aspect || image.aspect;
    if (order !== undefined) {
      image.order = Number(order);
    }

    const updatedImage = await image.save();
    res.status(200).json(updatedImage);
  } catch (error) {
    console.error("Error updating gallery image:", error);
    res.status(500).json({ message: "Server error updating gallery image" });
  }
};
