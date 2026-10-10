import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const dataDir = path.join(rootDir, 'data');
const dataFile = path.join(dataDir, 'learning-data.json');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const ensureDb = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(dataFile)) {
    const defaultState = {
      user: {
        id: 'default-user',
        name: 'Learning Explorer',
        createdAt: new Date().toISOString()
      },
      languages: [
        {
          id: 'python-track',
          name: 'Python',
          totalTopics: 20,
          completedTopics: 8,
          hoursPerTopic: 1.5,
          color: '#4f46e5'
        },
        {
          id: 'javascript-track',
          name: 'JavaScript',
          totalTopics: 18,
          completedTopics: 11,
          hoursPerTopic: 1.2,
          color: '#f59e0b'
        },
        {
          id: 'c-track',
          name: 'C',
          totalTopics: 15,
          completedTopics: 6,
          hoursPerTopic: 1.8,
          color: '#22c55e'
        }
      ]
    };

    fs.writeFileSync(dataFile, JSON.stringify(defaultState, null, 2));
  }
};

const readData = () => {
  ensureDb();
  const raw = fs.readFileSync(dataFile, 'utf8');
  return JSON.parse(raw);
};

const saveData = (data) => {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};

const normalizeLanguage = (language) => {
  const totalTopics = Number(language.totalTopics) || 0;
  const completedTopics = Math.min(Math.max(Number(language.completedTopics || 0), 0), totalTopics);
  const hoursPerTopic = Number(language.hoursPerTopic) || 0.5;

  return {
    id: language.id || uuidv4(),
    name: String(language.name || 'New Language').trim(),
    totalTopics,
    completedTopics,
    hoursPerTopic,
    color: language.color || '#6366f1'
  };
};

app.get('/api/health', (_, res) => {
  res.json({ ok: true, message: 'Learning tracker API is running' });
});

app.get('/api/dashboard', (_, res) => {
  const data = readData();
  const languages = (data.languages || []).map((language) => {
    const totalTopics = Number(language.totalTopics || 0);
    const completedTopics = Math.min(Number(language.completedTopics || 0), totalTopics);
    const totalHours = totalTopics > 0 ? (totalTopics - completedTopics) * Number(language.hoursPerTopic || 0.5) : 0;

    return {
      ...language,
      completedTopics,
      totalHours
    };
  });

  res.json({
    user: data.user,
    languages
  });
});

app.put('/api/profile', (req, res) => {
  const { name } = req.body || {};
  if (!name || !String(name).trim()) {
    return res.status(400).json({ message: 'Profile name is required' });
  }

  const data = readData();
  data.user = {
    ...data.user,
    name: String(name).trim()
  };
  saveData(data);

  res.json({ user: data.user, languages: data.languages });
});

app.post('/api/languages', (req, res) => {
  const { name, totalTopics, completedTopics, hoursPerTopic, color } = req.body || {};

  if (!name || !String(name).trim()) {
    return res.status(400).json({ message: 'Language name is required' });
  }

  const data = readData();
  const language = normalizeLanguage({
    name,
    totalTopics,
    completedTopics,
    hoursPerTopic,
    color
  });

  data.languages = [...(data.languages || []), language];
  saveData(data);

  res.status(201).json({
    message: 'Language added successfully',
    languages: data.languages
  });
});

app.put('/api/languages/:id', (req, res) => {
  const { id } = req.params;
  const data = readData();
  const index = data.languages.findIndex((language) => language.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Language not found' });
  }

  const merged = normalizeLanguage({
    ...data.languages[index],
    ...req.body,
    totalTopics: req.body.totalTopics ?? data.languages[index].totalTopics,
    completedTopics: req.body.completedTopics ?? data.languages[index].completedTopics,
    hoursPerTopic: req.body.hoursPerTopic ?? data.languages[index].hoursPerTopic,
    color: req.body.color ?? data.languages[index].color
  });

  data.languages[index] = merged;
  saveData(data);

  res.json({
    message: 'Language updated successfully',
    languages: data.languages
  });
});

app.delete('/api/languages/:id', (req, res) => {
  const { id } = req.params;
  const data = readData();
  const filtered = (data.languages || []).filter((language) => language.id !== id);

  if (filtered.length === data.languages.length) {
    return res.status(404).json({ message: 'Language not found' });
  }

  data.languages = filtered;
  saveData(data);

  res.json({
    message: 'Language deleted successfully',
    languages: data.languages
  });
});

app.use(express.static(path.join(rootDir, 'dist')));

app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ message: 'API route not found' });
  }
  res.sendFile(path.join(rootDir, 'dist', 'index.html'));
});

ensureDb();

app.listen(PORT, () => {
  console.log(`Learning tracker API running on port ${PORT}`);
});
