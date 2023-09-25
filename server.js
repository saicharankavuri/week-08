// Budget API
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

// app.use('/', express.static('public'))

// app.get('/hello', (req,res) => {
//     res.send('Hello World!!');
// })

// app.listen(port, () => {
//     console.log('Listening at 3000x')
// })
app.use(cors());
var data;
fs.readFile('data.json', 'utf8', (err, file) => {
    data = file;
    return;
})


app.get('/budget', (req, res) => {
    res.send(data);
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});