import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const { name, price, sizes, fabric, deliveryTime, description, status, category, collection } = req.body;
    let imageUrl = "";

    // If an image was uploaded
    if (req.file) {
      // Upload stream to cloudinary
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "rohit_tejpal/products" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      imageUrl = uploadResult.secure_url;
    }

    // Parse sizes since it comes as a JSON string from FormData
    const parsedSizes = sizes ? JSON.parse(sizes) : [];

    const product = new Product({
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      price: Number(price),
      sizes: parsedSizes,
      fabric,
      deliveryTime,
      description,
      status,
      category,
      collection: collection || null,
      images: {
        front: imageUrl,
      },
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(400).json({ message: error.message || "Server error creating product" });
  }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const category = req.query.category;
    const collectionSlug = req.query.collection; // Frontend will send slug
    let query = {};
    if (category) {
      query.category = category;
    }
    if (collectionSlug) {
      // Import Collection to lookup by slug
      const { default: Collection } = await import("../models/Collection.js");
      const collection = await Collection.findOne({ slug: collectionSlug });
      if (collection) {
        query.collection = collection._id;
      } else {
        // If collection not found, return empty
        return res.status(200).json([]);
      }
    }
    const products = await Product.find(query).populate('collection').sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error fetching products", error: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product removed" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error deleting product", error: error.message });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server error fetching product", error: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const { name, price, sizes, fabric, deliveryTime, description, status, category, collection } = req.body;
    
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let imageUrl = product.images?.front || "";

    // If a new image was uploaded
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "rohit_tejpal/products" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      imageUrl = uploadResult.secure_url;
    }

    const parsedSizes = sizes ? JSON.parse(sizes) : product.sizes;

    product.name = name || product.name;
    product.slug = name ? name.toLowerCase().replace(/[^a-z0-9]+/g, "-") : product.slug;
    product.price = price ? Number(price) : product.price;
    product.sizes = parsedSizes;
    product.fabric = fabric || product.fabric;
    product.deliveryTime = deliveryTime || product.deliveryTime;
    product.description = description !== undefined ? description : product.description;
    product.status = status || product.status;
    product.category = category || product.category;
    if (collection !== undefined) {
      product.collection = collection === 'null' ? null : collection;
    }
    
    if (!product.images) {
      product.images = {};
    }
    product.images.front = imageUrl;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(400).json({ message: error.message || "Server error updating product" });
  }
};
