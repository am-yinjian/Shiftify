import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5002;
 
app.use(express.json());

// app.use('/api/users', userRoutes);  

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at port http://localhost:${PORT}`);

});
