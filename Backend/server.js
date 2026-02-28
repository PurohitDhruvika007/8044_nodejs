import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth_routes.js";
import managerRoutes from "./routes/manager_routes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
connectDB();

app.use("/api/admin", authRoutes);
app.use("/api/manager", managerRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`server started on port ${process.env.PORT}`);
})

