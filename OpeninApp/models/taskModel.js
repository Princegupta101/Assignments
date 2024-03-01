import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  due_date: { type: Date, required: true },
  priority: { type: Number, default: 0 },
  status: { type: String, default: "TODO" },
  deleted_at: Date
});

export default mongoose.model('Task', taskSchema);
