import db from '../config/db.js';

export const TodoModel = {
  // Recupera tutti i todos
  findAll() {
    const stmt = db.prepare('SELECT * FROM todos ORDER BY created_at DESC');
    return stmt.all();
  },

  // Recupera un todo per ID
  findById(id) {
    const stmt = db.prepare('SELECT * FROM todos WHERE id = ?');
    return stmt.get(id);
  },

  // Crea un nuovo todo
  create(data) {
    const stmt = db.prepare(`
      INSERT INTO todos (title, description, priority)
      VALUES (?, ?, ?)
    `);
    
    const result = stmt.run(
      data.title,
      data.description || null,
      data.priority || 'medium'
    );

    return this.findById(result.lastInsertRowid);
  },

  // Aggiorna un todo
  update(id, data) {
    const fields = [];
    const values = [];

    if (data.title !== undefined) {
      fields.push('title = ?');
      values.push(data.title);
    }
    if (data.description !== undefined) {
      fields.push('description = ?');
      values.push(data.description);
    }
    if (data.completed !== undefined) {
      fields.push('completed = ?');
      values.push(data.completed ? 1 : 0);
    }
    if (data.priority !== undefined) {
      fields.push('priority = ?');
      values.push(data.priority);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const stmt = db.prepare(`
      UPDATE todos SET ${fields.join(', ')}
      WHERE id = ?
    `);
    
    stmt.run(...values);
    return this.findById(id);
  },

  // Elimina un todo
  delete(id) {
    const stmt = db.prepare('DELETE FROM todos WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  },

  // Toggle completamento
  toggleComplete(id) {
    const todo = this.findById(id);
    if (!todo) return null;
    
    return this.update(id, { completed: !todo.completed });
  }
};