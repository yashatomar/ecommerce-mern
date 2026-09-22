import User from '../models/userModel.js';

const seedAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    
    // Skip if not configured
    if (!adminEmail || !process.env.ADMIN_PASSWORD) {
      console.log('ℹ️ Admin seeding skipped (no credentials configured)');
      return;
    }

    const adminExists = await User.findOne({ email: adminEmail });

    if (!adminExists) {
      // Create a brand new admin user
      await User.create({
        name: process.env.ADMIN_NAME || 'Admin',
        email: adminEmail,
        password: process.env.ADMIN_PASSWORD,
        isAdmin: true,
      });
      console.log(`✅ Admin seeded: ${adminEmail}`);
    } else if (!adminExists.isAdmin) {
      // Promote existing user to admin
      adminExists.isAdmin = true;
      await adminExists.save();
      console.log(`✅ Existing user promoted to admin: ${adminEmail}`);
    } else {
      console.log(`✅ Admin already exists: ${adminEmail}`);
    }
  } catch (error) {
    console.error(`❌ Admin seed error: ${error.message}`);
  }
};

export default seedAdmin;