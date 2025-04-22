import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetToken: { type: String },
    isAdmin: { type: Boolean, default: false, required: true },
    isEmailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String },
    profilePicture: { type: String },
    preferences: {
      theme: { type: String, default: 'light' },
      notifications: { type: Boolean, default: true },
      language: { type: String, default: 'en' }
    },
    lastLogin: { type: Date },
    loginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date },
    socialLinks: {
      google: { type: String },
      github: { type: String }
    }
  },
  {
    timestamps: true,
  }
);

// Add index for email verification token
userSchema.index({ emailVerificationToken: 1 }, { expireAfterSeconds: 86400 }); // 24 hours

const User = mongoose.model('User', userSchema);
export default User;
