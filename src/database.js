import mongoose from 'mongoose';
import {MONGODB_URI} from './config.js';

//connect to the DB
try {
  const db = await mongoose.connect(MONGODB_URI);
  console.log("Database is connected to", db.connection.name);
} catch (error) {
  console.error(error.message);
}