import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  phone_number: { type: String, required: true },
  password: { type: String, required: true },
  priority: { type: Number, enum: [0, 1, 2], default: 0 }
});

export default mongoose.model('User', userSchema);
