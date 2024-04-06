import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
mongoose.set('strictQuery', true);
import contactsRouter from "./routes/contactsRouter.js";
import 'dotenv/config';

const { DB_HOST, PORT = 3001 } = process.env;
const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

mongoose
  .connect(DB_HOST, {
    dbName: 'db-contacts',
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log('Database connection successful');
    });
  })
  .catch(error => {
    console.error(error.message);
    process.exit(1);
  });