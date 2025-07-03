import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a product name"],
    unique: [true, "Product Name already exists"],
  }, 
  price: {
    type: Number,
    required: [true, "Please add a product price"],
    
  },
  description: {
    type: String,
    required: [true, "Please add a product description"],
    
  },
  image: {
    type: String,
    default: null,
  },
  category:{
    type: String,
    required: [true, "Please add a category product"],
    enum:["Shoes", "Shirt", "T-Shirt", "Pants"]
  },
  stock: {
    type: Number,
    default: 0
  }
});


const Product = mongoose.model("Product", productSchema);

export default Product