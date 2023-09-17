// Budget API

const express = require('express');
//const cors = require('cors');
const app = express();
const port = 3000;

app.get('/', express.static('public'))

// app.get('/hello', (req,res) => {
//     res.send('Hello World!!');
// })

// app.listen(port, () => {
//     console.log('Listening at 3000x')
// })
//app.use(cors());

const budget = {
    myBudget: [
        {
            title: 'Eat out!!',
            budget: 250
        },
        {
            title: 'Rent',
            budget: 275
        },
        {
            title: 'Grocery',
            budget: 10
        },
    ]
};


app.get('/budget', (req, res) => {
    res.json(budget);
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});