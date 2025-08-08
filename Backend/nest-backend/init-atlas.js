// MongoDB Atlas initialization script for RICT platform
// Run this script manually to set up your Atlas database

const { MongoClient } = require('mongodb');

// Get connection string from environment variable
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://your_username:your_password@your_cluster.mongodb.net/rict?retryWrites=true&w=majority';

async function initializeDatabase() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    console.log('🔌 Connecting to MongoDB Atlas...');
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas');
    
    const db = client.db();
    
    // Create collections
    console.log('📊 Creating collections...');
    await db.createCollection('registrationsettings');
    await db.createCollection('telegramusers');
    console.log('✅ Collections created');
    
    // Create indexes for better performance
    console.log('🔍 Creating indexes...');
    await db.collection('registrationsettings').createIndex({ "_id": 1 });
    await db.collection('telegramusers').createIndex({ "telegramId": 1 }, { unique: true });
    await db.collection('telegramusers').createIndex({ "username": 1 });
    await db.collection('telegramusers').createIndex({ "isActive": 1 });
    console.log('✅ Indexes created');
    
    // Insert default registration settings
    console.log('⚙️  Setting up default registration settings...');
    const existingSettings = await db.collection('registrationsettings').findOne({});
    
    if (!existingSettings) {
      await db.collection('registrationsettings').insertOne({
        registrationEnabled: false,
        lastUpdated: new Date()
      });
      console.log('✅ Default registration settings created');
    } else {
      console.log('ℹ️  Registration settings already exist');
    }
    
    console.log('');
    console.log('🎉 RICT database initialized successfully!');
    console.log('📊 Collections: registrationsettings, telegramusers');
    console.log('🔍 Indexes: Created for optimal performance');
    console.log('⚙️  Default registration settings: disabled');
    
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('🔌 Disconnected from MongoDB Atlas');
  }
}

// Run the initialization
initializeDatabase();
