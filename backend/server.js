import express from 'express';
import dotenv from "dotenv";
import { conectDB } from './config/db.js';

dotenv.config();

const app = express();

const PORT = 5000;
 
app.get("/products", (req, res)=> {});

console.log(process.env.MONGO_URI);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at port ${PORT}`);
 
});
