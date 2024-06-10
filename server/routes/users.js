import express from "express";
import { getUser,addCustomers,getCustomers } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const userRoutes = express.Router();

/*READ*/
userRoutes.get("/:id", verifyToken, getUser);

/* Add customer */
userRoutes.post("/addcustomer", verifyToken, addCustomers);

/* get all customers */
userRoutes.get("/getcustomers", verifyToken, getCustomers);

export default userRoutes;
