import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();

const PORT = 5002;
 
app.get("/products", (req, res)=> {
  res.send("Products endpoint is working!");
  // res.render("poopy");
});
app.get("/", (req, res)=> {
  res.send("Products endpoint is working!");
});

// console.log(process.env.MONGO_URI);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at port http://localhost:${PORT}`);

});
