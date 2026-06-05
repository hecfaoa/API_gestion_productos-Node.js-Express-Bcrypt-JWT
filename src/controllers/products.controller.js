import { AppDataSource } from "../database.js";
import ProductSchema from "../models/products.model.js";

export const getProducts = async (req, res) => {
  try {
    const productRepository = AppDataSource.getRepository(ProductSchema);
    const products = await productRepository.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

export const getProductById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const productRepository = AppDataSource.getRepository(ProductSchema);
    const products = await productRepository.find({ where: { id } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

export const createProduct = async (req, res) => {
  try {
    const productRepository = AppDataSource.getRepository(ProductSchema);
    const newProduct = productRepository.create(req.body);
    await productRepository.save(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

export const updateProduct = async (req, res) => {
  try {    
    const id = Number(req.params.id);
    const productRepository = AppDataSource.getRepository(ProductSchema);
    let productToUpdate = await productRepository.findOne({ where: { id } });
    if (!productToUpdate) {
      return res.status(404).json({ message: "Product not found" });
    }
    productRepository.merge(productToUpdate, req.body);
    const updatedProduct = await productRepository.save(productToUpdate);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }

};

export const deleteProduct = async(req, res) => {
  try {    const id = Number(req.params.id);
    const productRepository = AppDataSource.getRepository(ProductSchema);
    const productToDelete = await productRepository.findOne({ where: { id } });
    if (!productToDelete) {
      return res.status(404).json({ message: "Product not found" });
    }
    await productRepository.remove(productToDelete);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  } 
};
