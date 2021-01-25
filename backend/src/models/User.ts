import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  profilePicture: {
    type: String,
  },
  password: {
    type: String,
  },
});

export default mongoose.model('User', userSchema);
