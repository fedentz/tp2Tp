import Product from "../models/Product.js";
import Stock from "../models/Stock.js"

const ProductService = {
  async createProduct(productData) {
    const product = await Product.create(productData);
    return product;
  },

  async getAllProducts() {
    const products = await Product.findAll();
    return products;
  },

  async getProductById(productId) {
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  },

  async updateProduct(productId, updateData) {
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    await product.update(updateData);
    return product;
  },

  async deleteProduct(productId) {
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    await product.destroy();
    return { message: "Product deleted successfully" };
  },

  async adjustStock(productId, adjustment, reason = null) {
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    product.stock += adjustment;
    if (product.stock < 0) {
      throw new Error("Stock cannot be negative");
    }

    await product.save();

    const stockRecord = await Stock.create({
      productId,
      adjustment,
      reason,
    });

    return { product, stockRecord };
  }
};

export default ProductService;