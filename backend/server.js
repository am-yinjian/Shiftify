import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
app.use(express.json());

// // Importing routes
import usersRoutes from './routes/users.route.js';
import scheduleRoutes from './routes/schedule.route.js';
import shiftsRoutes from './routes/shifts.route.js';

const PORT = 5002;

// the endpoint to collect form data (this will need to be passed back to the db)

app.get('/', (req, res) => {
  res.send('Welcome to the Shiftify API!');
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at port http://localhost:${PORT}`);

});
