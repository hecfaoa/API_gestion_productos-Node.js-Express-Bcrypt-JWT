import { AppDataSource } from "../database.js";
import RoleSchema from "../models/Roles.model.js";

export const getRoles = async (req, res) => {
  try {
    const RoleRepository = AppDataSource.getRepository(RoleSchema);
    const Roles = await RoleRepository.find();
    res.json(Roles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Roles", error });
  }
};

export const getRoleById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const RoleRepository = AppDataSource.getRepository(RoleSchema);
    const Roles = await RoleRepository.find({ where: { id } });
    res.json(Roles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Roles", error });
  }
};

export const createRole = async (req, res) => {
  try {
    const RoleRepository = AppDataSource.getRepository(RoleSchema);
    const newRole = RoleRepository.create(req.body);
    await RoleRepository.save(newRole);
    res.status(201).json(newRole);
  } catch (error) {
    res.status(500).json({ message: "Error creating Role", error });
  }
};

export const updateRole = async (req, res) => {
  try {    
    const id = Number(req.params.id);
    const RoleRepository = AppDataSource.getRepository(RoleSchema);
    let RoleToUpdate = await RoleRepository.findOne({ where: { id } });
    if (!RoleToUpdate) {
      return res.status(404).json({ message: "Role not found" });
    }
    RoleRepository.merge(RoleToUpdate, req.body);
    const updatedRole = await RoleRepository.save(RoleToUpdate);
    res.status(200).json(updatedRole);
  } catch (error) {
    res.status(500).json({ message: "Error updating Role", error });
  }

};

export const deleteRole = async(req, res) => {
  try {    const id = Number(req.params.id);
    const RoleRepository = AppDataSource.getRepository(RoleSchema);
    const RoleToDelete = await RoleRepository.findOne({ where: { id } });
    if (!RoleToDelete) {
      return res.status(404).json({ message: "Role not found" });
    }
    await RoleRepository.remove(RoleToDelete);
    res.json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Role", error });
  } 
};
