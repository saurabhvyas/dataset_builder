const express = require('express')
const app = express()


var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

app.use(express.static('public'))

//wav_file_path='/media/saurabh/New Volume/dataset_creator_data'

app.set('view engine', 'ejs')


var MongoClient = require('mongodb').MongoClient

connectionstr='mongodb://saurabh:orange96@ds211088.mlab.com:11088/sentences'

/*MongoClient.connect('', function (err, db) {
  if (err) throw err

  db.collection('hindi').find().toArray(function (err, result) {
    if (err) throw err

    console.log(result)
  })
})

*/

hindisentences=0

MongoClient.connect(connectionstr,(err,database) =>{ 
  const myAwesomeDB = database.db('sentences')
 //console.log(myAwesomeDB.collection('hindi').find().toArray

	 myAwesomeDB.collection('hindi').find().toArray(function (err, result) {
    if (err) throw err

    hindisentences=result
    console.log(hindisentences[0][0])
  })
   

})


app.get('/', (req, res) =>  res.render('mainv2', {  sentence: hindisentences[0][0] })
)

app.post('/audio', upload.single('test'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})


app.post('/', function(req, res){

/* fs.writeFile(wav_file_path + Date.now() + '.wav', req.body, function(err) {
    res.sendStatus(err ? 500 : 200);
  });

*/

 res.send('got a post request')
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
