import Product from "../product/product.model.js";

// Get pending products
export const getPendingProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: "pending" });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Approve product
export const approveProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    product.status = "approved";
    await product.save();

    res.json({ message: "Product approved ✅" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reject product
export const rejectProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    product.status = "rejected";
    await product.save();

    res.json({ message: "Product rejected ❌" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};