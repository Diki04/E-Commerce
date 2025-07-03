import mongoose from 'mongoose';

const { Schema } = mongoose;

const singleProduct = Schema({
  name:{type: String, required: true},
  quantity:{type: Number, required: true},
  price:{type: Number, required: true},
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: true
  }
})

const orderSchema = new Schema({
  total: {
    type: Number,
    required: [true, "Please add a total amount"],
  },
  itemdetail: [singleProduct],
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ["pending","failed","success"],
    default: "pending",
  },
  firstName: {
    type: String,
    required: [true, "Please add a first name"],
  },
  lastName:{
    type: String,
    required: [true, "Please add a last name"],
  },
  phone:{
    type: String,
    required: [true, "Please add a phone number"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
  }
});


const Order = mongoose.model("Order", orderSchema);

export default Order