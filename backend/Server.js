import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected")) 
  .catch((err) => console.log(err));

// routes
app.use("/api/users", userRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/admin", adminRoutes);

// start the server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
