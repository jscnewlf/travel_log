const axios = require('axios');
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8080;

app.use('/images', express.static(__dirname + '/images'));

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
    await fs.writeFile('./JSON/menu.json', updatedData, 'utf-8');
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
