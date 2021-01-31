import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type:String,
      required:true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    bio: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
