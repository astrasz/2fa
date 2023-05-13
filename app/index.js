import express from 'express';

const PORT = 5000;

const app = express();

app.use('/', (req, res) => {
    res.send('it works');
})


app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))