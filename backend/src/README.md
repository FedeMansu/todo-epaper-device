# Todo E-Paper Backend - Node.js + SQLite

Backend API REST completo con Node.js, Express e SQLite per gestire todos su dispositivi e-paper.

## 🗂️ Struttura del Progetto

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # Configurazione SQLite
│   ├── controllers/
│   │   └── todoController.js    # Controller HTTP
│   ├── models/
│   │   └── todoModel.js         # Modello dati Todo
│   ├── routes/
│   │   └── todoRoutes.js        # Definizione routes
│   └── server.js                # Server Express principale
├── database/
│   └── app.db                   # Database SQLite (auto-creato)
├── .env                         # Configurazione ambiente
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Installazione

### 1. Installa le dipendenze
```bash
npm install
```

### 2. Avvia il server

**Modalità sviluppo (con auto-reload):**
```bash
npm run dev
```

**Modalità produzione:**
```bash
npm start
```

Il server sarà disponibile su `http://localhost:3000`

## 📡 API Endpoints

### Base URL: `http://localhost:3000/api/todos`

| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| GET | `/` | Recupera tutti i todos |
| GET | `/:id` | Recupera un todo specifico |
| POST | `/` | Crea un nuovo todo |
| PUT | `/:id` | Aggiorna un todo |
| DELETE | `/:id` | Elimina un todo |
| PATCH | `/:id/toggle` | Toggle stato completamento |

## 📝 Esempi di Utilizzo

### 1. Recupera tutti i todos
```bash
curl http://localhost:3000/api/todos
```

**Risposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Comprare il latte",
      "description": "Al supermercato",
      "completed": 0,
      "priority": "high",
      "created_at": "2026-01-21 10:30:00",
      "updated_at": "2026-01-21 10:30:00"
    }
  ]
}
```

### 2. Crea un nuovo todo
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Comprare il latte",
    "description": "Al supermercato",
    "priority": "high"
  }'
```

### 3. Aggiorna un todo
```bash
curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "completed": true
  }'
```

### 4. Toggle completamento
```bash
curl -X PATCH http://localhost:3000/api/todos/1/toggle
```

### 5. Elimina un todo
```bash
curl -X DELETE http://localhost:3000/api/todos/1
```

## 🔧 Configurazione

Modifica il file `.env` per personalizzare:

```env
PORT=3000
NODE_ENV=development
DB_PATH=./database/app.db
```

## 📦 Dipendenze

- **express** - Framework web
- **better-sqlite3** - Driver SQLite veloce e sincrono
- **cors** - Gestione CORS
- **dotenv** - Variabili d'ambiente
- **nodemon** (dev) - Auto-reload durante sviluppo

## 🔐 Schema Database

### Tabella `todos`

| Colonna | Tipo | Descrizione |
|---------|------|-------------|
| id | INTEGER | Primary key auto-increment |
| title | TEXT | Titolo (obbligatorio) |
| description | TEXT | Descrizione |
| completed | INTEGER | 0=non completato, 1=completato |
| priority | TEXT | low, medium, high |
| created_at | DATETIME | Data creazione |
| updated_at | DATETIME | Data ultimo aggiornamento |

## 🎯 Prossimi Passi

- [ ] Aggiungere validazione input con Joi/Zod
- [ ] Implementare autenticazione JWT
- [ ] Aggiungere WebSocket per aggiornamenti real-time
- [ ] Creare filtri e ricerca todos
- [ ] Aggiungere categorie/tags
- [ ] Implementare backup automatico database

## 📄 Licenza

MIT