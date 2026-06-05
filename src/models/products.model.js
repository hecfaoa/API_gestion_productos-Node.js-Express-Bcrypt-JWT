import { EntitySchema } from "typeorm";

const ProductSchema = new EntitySchema({
  name: "Product", // Nombre de la entidad interna
  tableName: "products", // Nombre de la tabla en MySQL
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
      unique: true,
    },
    category: {
      type: "varchar",
    },
    price: {
      type: "decimal",
      precision: 10,
      scale: 2,
    },
    create_at: {
      type: "datetime",
      default: () => "CURRENT_TIMESTAMP",
    },
    update_at: {
      type: "datetime",
      default: () => "CURRENT_TIMESTAMP",
      onUpdate: "CURRENT_TIMESTAMP",
    },
  },
});

export default ProductSchema;