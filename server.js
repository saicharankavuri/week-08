// Budget API
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;
const mongoDBClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());


let url = 'mongodb://localhost:27017/mongodb_demo';


app.use('/', express.static('public'));


// mongoDBClient.connect(url, { useUnifiedTopology: true }, (operationalError, dbHander) =>{
//     if(operationalError){
//         console.log('Error');
//     }
//     else {
//         console.log('Connected to the database');
//         dbHander.db('mongodb_demo').collection('data').find({}).toArray(function (err, res){
//             if(err){
//                 console.log('error');
//             }
//             console.log(JSON.stringify(res));
//         }) 
            
//     }
// });

mongoose.connect('mongodb://localhost:27017/mongodb_demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const chartDataSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    relatedValue: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^#[0-9A-Fa-f]{6}$/.test(v); // Validates a 6-digit hexadecimal color code.
        },
        message: 'Invalid color format (e.g., #ED4523)',
      },
    },
  });
  
  const ChartData = mongoose.model('ChartData', chartDataSchema);
       


// app.get('/hello', (req,res) => {
//     res.send('Hello World!!');
// })

// app.listen(port, () => {
//     console.log('Listening at 3000x')

// })

app.get('/chart-data', (req, res) => {
    ChartData.find({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });  
  });

  
  app.post('/chart-data', (req, res) => {
    const { title, relatedValue, color } = req.body;
  
    const newChartData = new ChartData({
      title,
      relatedValue,
      color,
    });
  
    newChartData.save()
    .then((savedData) => {
      res.status(201).json(savedData);
    })
    .catch((error) => {
      console.error(error);
      res.status(400).json({ error: error.message });
    });
  });
  
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