import { AppDataSource } from "../database.js";
import UserSchema from "../models/users.model.js";

export const getUsers = async (req, res) => {
  try {
    const userRepository = AppDataSource.getRepository(UserSchema);
    const users = await userRepository.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const userRepository = AppDataSource.getRepository(UserSchema);
    const users = await userRepository.find({ where: { id } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};


export const updateUser = async (req, res) => {
  try {    
    const id = Number(req.params.id);
    const userRepository = AppDataSource.getRepository(UserSchema);
    let userToUpdate = await userRepository.findOne({ where: { id } });
    if (!userToUpdate) {
      return res.status(404).json({ message: "user not found" });
    }
    userRepository.merge(userToUpdate, req.body);
    const updatedUser = await userRepository.save(userToUpdate);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }

};

export const deleteUser = async(req, res) => {
  try {    const id = Number(req.params.id);
    const userRepository = AppDataSource.getRepository(UserSchema);
    const userToDelete = await userRepository.findOne({ where: { id } });
    if (!userToDelete) {
      return res.status(404).json({ message: "user not found" });
    }
    await userRepository.remove(userToDelete);
    res.json({ message: "user deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  } 
};
