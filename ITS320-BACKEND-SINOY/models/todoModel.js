import mongoose from 'mongoose';
const todoSchema = new mongoose.Schema({
  task: {
      type: String,
      required: [true, 'Please provide a task']
  }
});

export default mongoose.model('Todo', todoSchema);
