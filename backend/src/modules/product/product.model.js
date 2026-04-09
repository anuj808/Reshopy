import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
          type: String,
          enum: ["pending", "approved", "rejected"],
          default: "pending",
        },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);