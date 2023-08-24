const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8080;

app.use('/images', express.static(__dirname + '/images'));


app.get('/api/getData', async (req, res) => {
    try {
      const data = await fs.readFile('dados.json', 'utf-8');
      res.json(JSON.parse(data));
    } catch (error) {
      res.status(500).json({ error: 'Error reading data', details: error.message });
    }
  });
  
  app.post('/api/updateData', async (req, res) => {
    try {
      const updatedData = JSON.stringify(req.body, null, 2);
      await fs.writeFile('dados.json', updatedData, 'utf-8');
      res.json({ message: 'Data updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error updating data', details: error.message });
    }
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
