// lib/mongodb.js

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable in .env.local'
  );
}

// Cache the connection to reuse in hot reloads and avoid reconnecting multiple times
let cached = global.mongoose || { conn: null, promise: null };

global.mongoose = cached; // Ensure cached object remains available globally

/**
 * Connects to the MongoDB database and caches the connection.
 * This function ensures a single connection is reused across
 * multiple function calls, optimizing performance for serverless functions.
 *
 * @returns {Promise<typeof mongoose>} - A promise that resolves to the mongoose instance.
 */
async function connectToDatabase() {
  // Return cached connection if already established
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    // Establish a new database connection and cache the promise
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  try {
    // Wait for the database connection and cache it
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null; // Reset the promise in case of connection error
    throw new Error(`Failed to connect to MongoDB: ${error.message}`);
  }

  return cached.conn;
}

export default connectToDatabase;
