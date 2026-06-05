import express from "express";
import cors from "cors";
import morgan from "morgan";
import 'reflect-metadata';
import productsRoutes from './routes/products.routes.js';
import authRoutes from './routes/auth.routes.js';
import rolesRoutes from './routes/roles.routes.js';
import usersRoutes from './routes/users.routes.js';
 
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/users', usersRoutes);

app.get("/", (req, res) => {
  res.send("Hello, hektor olaya ---       ");
});

export default app;