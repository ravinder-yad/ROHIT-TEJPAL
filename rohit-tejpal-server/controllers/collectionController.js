import Collection from "../models/Collection.js";
import cloudinary from "../config/cloudinary.js";

// @desc    Create a collection
// @route   POST /api/collections
// @access  Private/Admin
export const createCollection = async (req, res) => {
  try {
    const { name, description, isActive } = req.body;
    let imageUrl = "";

    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "rohit_tejpal/collections" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      imageUrl = uploadResult.secure_url;
    }

    const collection = new Collection({
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      description,
      isActive: isActive === 'true' || isActive === true,
      image: imageUrl,
    });

    const createdCollection = await collection.save();
    res.status(201).json(createdCollection);
  } catch (error) {
    console.error("Error creating collection:", error);
    res.status(400).json({ message: error.message || "Server error creating collection" });
  }
};

// @desc    Get all collections
// @route   GET /api/collections
// @access  Public
export const getCollections = async (req, res) => {
  try {
    const collections = await Collection.find({}).sort({ createdAt: -1 });
    res.status(200).json(collections);
  } catch (error) {
    console.error("Error fetching collections:", error);
    res.status(500).json({ message: "Server error fetching collections", error: error.message });
  }
};

// @desc    Get single collection by slug
// @route   GET /api/collections/:slug
// @access  Public
export const getCollectionBySlug = async (req, res) => {
  try {
    const collection = await Collection.findOne({ slug: req.params.slug });
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }
    res.status(200).json(collection);
  } catch (error) {
    console.error("Error fetching collection:", error);
    res.status(500).json({ message: "Server error fetching collection", error: error.message });
  }
};

// @desc    Update a collection
// @route   PUT /api/collections/:id
// @access  Private/Admin
export const updateCollection = async (req, res) => {
  try {
    const { name, description, isActive } = req.body;
    const collection = await Collection.findById(req.params.id);

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    let imageUrl = collection.image || "";

    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "rohit_tejpal/collections" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      imageUrl = uploadResult.secure_url;
    }

    collection.name = name || collection.name;
    if (name) {
      collection.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    }
    collection.description = description !== undefined ? description : collection.description;
    collection.isActive = isActive !== undefined ? (isActive === 'true' || isActive === true) : collection.isActive;
    collection.image = imageUrl;

    const updatedCollection = await collection.save();
    res.status(200).json(updatedCollection);
  } catch (error) {
    console.error("Error updating collection:", error);
    res.status(400).json({ message: error.message || "Server error updating collection" });
  }
};

// @desc    Delete a collection
// @route   DELETE /api/collections/:id
// @access  Private/Admin
export const deleteCollection = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }
    await Collection.deleteOne({ _id: collection._id });
    res.status(200).json({ message: "Collection removed" });
  } catch (error) {
    console.error("Error deleting collection:", error);
    res.status(500).json({ message: "Server error deleting collection", error: error.message });
  }
};
