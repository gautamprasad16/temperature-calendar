const express = require('express');
const app = express();

// PORT Variable declaration
const PORT = process.env.PORT || 5000;

//INIT Middleware
app.use(express.json({
    extended: false
}));

app.listen(PORT, () => {
    console.log(`Server started at PORT : ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Application is up');
});

app.use('/api/getTemp', require('./routes/api/temperatureFetch.js'));
