import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRoutes from './routes/todoRoutes.js';

// Carica variabili d'ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Todo E-Paper API',
    version: '1.0.0',
    endpoints: {
      todos: '/api/todos'
    }
  });
});

app.use('/api/todos', todoRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Errore server:', err);
  res.status(500).json({
    success: false,
    error: 'Errore interno del server'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint non trovato'
  });
});

// Avvio server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔════════════════════════════════════════╗
║   🚀 Server in esecuzione!            ║
║                                        ║
║   📡 Locale: http://localhost:${PORT}       ║
║   🌍 Rete: http://<IP-RASPBERRY>:${PORT}   ║
║   🗄️  Database: SQLite                ║
║   🌍 Ambiente: ${process.env.NODE_ENV || 'development'}           ║
╚════════════════════════════════════════╝
  `);
});