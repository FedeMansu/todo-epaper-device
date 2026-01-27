import { TodoModel } from '../models/todoModel.js';

export const todoController = {
    // GET /api/todos
    async getAllTodos(req, res) {  // ✅ Aggiungi async
      try {
        const todos = await TodoModel.findAll();  // ✅ Aggiungi await
        console.log('Todos trovati:', todos);  // ✅ Debug log
        res.json(todos);
      } catch (error) {
        console.error('Errore nel recupero dei todos:', error);
        res.status(500).json({ 
          error: 'Errore nel recupero dei todos' 
        });
      }
    },

  // GET /api/todos/:id
  getTodoById(req, res) {
    try {
      const { id } = req.params;
      const todo = TodoModel.findById(parseInt(id));

      if (!todo) {
        return res.status(404).json({
          success: false,
          error: 'Todo non trovato'
        });
      }

      res.json({
        success: true,
        data: todo
      });
    } catch (error) {
      console.error('Errore nel recupero del todo:', error);
      res.status(500).json({
        success: false,
        error: 'Errore nel recupero del todo'
      });
    }
  },

  // POST /api/todos
  createTodo(req, res) {
    try {
      const { title, description, priority } = req.body;

      if (!title || title.trim() === '') {
        return res.status(400).json({
          success: false,
          error: 'Il titolo è obbligatorio'
        });
      }

      const todo = TodoModel.create({ title, description, priority });
      
      res.status(201).json(
         todo
      );
    } catch (error) {
      console.error('Errore nella creazione del todo:', error);
      res.status(500).json( 'Errore nella creazione del todo'
      );
    }
  },

  // PUT /api/todos/:id
  updateTodo(req, res) {
    try {
      const { id } = req.params;
      const { title, description, completed, priority } = req.body;

      const todo = TodoModel.update(parseInt(id), {
        title,
        description,
        completed,
        priority
      });

      if (!todo) {
        return res.status(404).json({
          success: false,
          error: 'Todo non trovato'
        });
      }

      res.json({
        success: true,
        data: todo
      });
    } catch (error) {
      console.error('Errore nell\'aggiornamento del todo:', error);
      res.status(500).json({
        success: false,
        error: 'Errore nell\'aggiornamento del todo'
      });
    }
  },

  // DELETE /api/todos/:id
  deleteTodo(req, res) {
    try {
      const { id } = req.params;
      const success = TodoModel.delete(parseInt(id));

      if (!success) {
        return res.status(404).json({
          success: false,
          error: 'Todo non trovato'
        });
      }

      res.json({
        success: true,
        message: 'Todo eliminato con successo'
      });
    } catch (error) {
      console.error('Errore nell\'eliminazione del todo:', error);
      res.status(500).json({
        success: false,
        error: 'Errore nell\'eliminazione del todo'
      });
    }
  },

  // PATCH /api/todos/:id/toggle
  toggleTodo(req, res) {
    try {
      const { id } = req.params;
      const todo = TodoModel.toggleComplete(parseInt(id));

      if (!todo) {
        return res.status(404).json({
          success: false,
          error: 'Todo non trovato'
        });
      }

      res.json({
        success: true,
        data: todo
      });
    } catch (error) {
      console.error('Errore nel toggle del todo:', error);
      res.status(500).json({
        success: false,
        error: 'Errore nel toggle del todo'
      });
    }
  }
};