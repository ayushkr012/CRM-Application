import mongoose from "mongoose";
import Customer from "./Customer.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      // required: true,
      min: 6,
    },
    picturePath: {
      type: String,
      default: "",
    },
    customers: [Customer.schema],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
