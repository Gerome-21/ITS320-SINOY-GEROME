import Todo from '../models/todoModel.js';

async function createTodo(req, res) {
    const { task } = req.body;

    if (!task) {
        return res.status(400).send('Please provide a task.');
    }

    try {
        const newTodo = await Todo.create({ task });
        return res.status(201).json(newTodo);
    } catch (error) {
        console.error("Error creating todo:", error);
        return res.status(500).send('Error while creating todo.');
    }
}

async function getTodo(req, res) {
    try {
        const todos = await Todo.find();
        return res.status(200).json(todos);
    } catch (error) {
        console.error("Error getting todos:", error);
        return res.status(500).json({ message: 'Something went wrong while getting todos.' });
    }
}

async function updateTodo(req, res) {
    const { id } = req.params;
    const { task } = req.body;
  
    if (!task) {
      return res.status(400).send('Task content is required for update.');
    }
  
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(
        id,
        { task },
        { new: true }
      );
  
      if (!updatedTodo) {
        return res.status(404).send('Todo not found.');
      }
  
      return res.status(200).json(updatedTodo);
    } catch (error) {
      console.error("Error updating todo:", error);
      return res.status(500).send('Error while updating todo.');
    }
  }
 
  async function deleteTodo(req, res) {
    const { id } = req.params;
  
    try {
      const deleted = await Todo.findByIdAndDelete(id);
  
      if (!deleted) {
        return res.status(404).send('Todo not found.');
      }
  
      return res.status(200).json({ message: 'Todo deleted successfully.' });
    } catch (error) {
      console.error("Error deleting todo:", error);
      return res.status(500).send('Error while deleting todo.');
    }
  }

export { createTodo, getTodo, deleteTodo, updateTodo };
