import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  spends: {
    type: Number,
    default: 0,
  },
  visitCount: {
    type: Number,
    default: 1,
  },
  lastVisit: {
    type: Date,
  },
});

// Create an index on email for faster queries
customerSchema.index({ email: 1 });

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
