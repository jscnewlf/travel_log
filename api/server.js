const axios = require('axios');
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8080;
app.use('/images', express.static(__dirname + '/images'));

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'images'), 
  filename: (req, file, callback) => {
    callback(null, 'image-project-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post('/api/images/upload', upload.single('image-article'), (req, res) => {
  const imagePath = '/images/' + req.file.filename;
  console.log('Image saved to:', path.join(__dirname, 'images', req.file.filename));
  res.json({ path: 'http://localhost:8080' + imagePath });
});



//Rotas menu.json
app.get('/api/menu/getData', async (req, res) => {
  try {
    const data = await fs.readFile('./JSON/menu.json', 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Error reading data', details: error.message });
  }
});

app.post('/api/menu/updateData', async (req, res) => {
  try {
    const updatedData = JSON.stringify(req.body, null, 2);
    await fs.writeFile('./JSON/menu.json', updatedData, 'utf-8');
    res.json({ message: 'Data updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating data', details: error.message });
  }
});

//Rotas inspirational.json
app.get('/api/inspirational/getData', async (req, res) => {
  try {
    const data = await fs.readFile('./JSON/inspirational.json', 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Error reading data', details: error.message });
  }
});

app.post('/api/inspirational/updateData', async (req, res) => {
  try {
    const updatedData = JSON.stringify(req.body, null, 2);
    await fs.writeFile('./JSON/inspirational.json', updatedData, 'utf-8');
    res.json({ message: 'Data updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating data', details: error.message });
  }
});

//Rotas logo.json
app.get('/api/logo/getData', async (req, res) => {
  try {
    const data = await fs.readFile('./JSON/logo.json', 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Error reading data', details: error.message });
  }
});

app.post('/api/logo/updateData', async (req, res) => {
  try {
    const updatedData = JSON.stringify(req.body, null, 2);
    await fs.writeFile('./JSON/logo.json', updatedData, 'utf-8');
    res.json({ message: 'Data updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating data', details: error.message });
  }
});

//Rotas footer.json
app.get('/api/footer/getData', async (req, res) => {
  try {
    const data = await fs.readFile('./JSON/footer.json', 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Error reading data', details: error.message });
  }
});

app.post('/api/footer/updateData', async (req, res) => {
  try {
    const updatedData = JSON.stringify(req.body, null, 2);
    await fs.writeFile('./JSON/footer.json', updatedData, 'utf-8');
    res.json({ message: 'Data updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating data', details: error.message });
  }
});

//Req Articles
app.get('/api/articles/getData', async (req, res) => {
  try {
    const response = await axios.get('https://64e6b6a009e64530d1802db5.mockapi.io/api/articles');
    const articles = response.data;
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data', details: error.message });
  }
});

app.put('/api/articles/updateData/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.put(`https://64e6b6a009e64530d1802db5.mockapi.io/api/articles/${id}`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error updating article', details: error.message });
  }
});


//Req Depoiments
app.get('/api/depoiments/getData', async (req, res) => {
  try {
    const response = await axios.get('https://64e6b6a009e64530d1802db5.mockapi.io/api/depoiments');
    const articles = response.data;
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data', details: error.message });
  }
});

app.put('/api/depoiments/updateData/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.put(`https://64e6b6a009e64530d1802db5.mockapi.io/api/depoiments/${id}`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error updating depoiment', details: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
