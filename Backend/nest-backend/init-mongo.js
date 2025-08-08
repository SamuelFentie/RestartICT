// MongoDB initialization script for RICT platform
db = db.getSiblingDB('rict');

// Create collections
db.createCollection('registrationsettings');
db.createCollection('telegramusers');

// Create indexes for better performance
db.registrationsettings.createIndex({ "_id": 1 });
db.telegramusers.createIndex({ "telegramId": 1 }, { unique: true });
db.telegramusers.createIndex({ "username": 1 });
db.telegramusers.createIndex({ "isActive": 1 });

// Insert default registration settings
db.registrationsettings.insertOne({
  registrationEnabled: false,
  lastUpdated: new Date()
});

print('✅ RICT database initialized successfully!');
print('📊 Collections created: registrationsettings, telegramusers');
print('🔍 Indexes created for optimal performance');
print('⚙️  Default registration settings: disabled');
