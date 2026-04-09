import Product from "./product.model.js";

// 🛍️ Add Product (Seller only)

export const addProduct = async (req, res) => {
  try {
    const { name, price, image } = req.body;

    const product = await Product.create({
      name,
      price,
      image,
      seller: req.user._id,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📦 Get All Products (User)
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({
      status: "approved",
    }).populate("seller", "phone");

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSellerProducts = async (req, res) => {
  try {
    const products = await Product.find({
      seller: req.user._id,
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};