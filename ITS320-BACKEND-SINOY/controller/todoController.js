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

export { createTodo, getTodo };
