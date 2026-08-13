import mongoose from "mongoose";

const productImageSchema = new mongoose.Schema(
  {
    front: {
      type: String,
      default: "",
    },

    back: {
      type: String,
      default: "",
    },

    side: {
      type: String,
      default: "",
    },

    wide: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: [2, "Product name must be at least 2 characters"],
      maxlength: [150, "Product name cannot exceed 150 characters"],
    },

    slug: {
      type: String,
      required: [true, "Product slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Product category is required"],
      trim: true,
    },

    collection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      default: null,
    },

    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },

    sizes: {
      type: [String],
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
      default: [],
    },

    fabric: {
      type: String,
      trim: true,
      default: "Silk",
    },

    color: {
      type: String,
      trim: true,
      default: "",
    },

    description: {
      type: String,
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
      default: "",
    },

    deliveryTime: {
      type: String,
      trim: true,
      default: "15 Days",
    },

    images: {
      type: productImageSchema,
      default: () => ({}),
    },

    status: {
      type: String,
      enum: ["draft", "active", "out_of_stock"],
      default: "draft",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    newArrival: {
      type: Boolean,
      default: false,
    },

    bestSeller: {
      type: Boolean,
      default: false,
    },

    stock: {
      type: Number,
      min: [0, "Stock cannot be negative"],
      default: 0,
    },

    views: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;