import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    unique: [true, "Name already exists"],
  }, 
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: [true, "Email already exists"],
    validate: {
      validator: validator.isEmail,
      message: "Please enter a valid email",
    }
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minLength: [6, "Password must be up to 6 characters"],
  },
  role: {
    type: String,
    enum: ["user", "owner"],
    default: "user",
  }
});

userSchema.pre("save", async function(){
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.comparePassword = async function(reqBody){
  return await bcrypt.compare(reqBody, this.password)
}

const User = mongoose.model("User", userSchema);

export default User