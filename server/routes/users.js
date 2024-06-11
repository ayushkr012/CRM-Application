import express from "express";
import { addCustomers, getCustomers } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const userRoutes = express.Router();

/* Add customer */
userRoutes.post("/addcustomer", verifyToken, addCustomers);

/* get all customers */
userRoutes.get("/getcustomers", getCustomers);

export default userRoutes;
