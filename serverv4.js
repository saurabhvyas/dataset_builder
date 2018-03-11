const express = require('express')
const app = express()
var http = require('http');
var fs = require('fs');

var multer  = require('multer')
wav_file_path='/media/saurabh/New Volume/dataset_creator_data/'
//var upload = multer({ dest: wav_file_path })
//var bodyParser = require('body-parser')

var current_sentence_id=0

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null,   current_sentence_id.toString())
  }
})

var upload = multer({ storage: storage })

app.use(express.static('public'))

//app.use(bodyParser.raw())






//let writeStream = fs.createWriteStream(wav_file_path + 'test.wav');

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

var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);
    });
  });
}


hindisentences=0






MongoClient.connect(connectionstr,(err,database) =>{ 
  const myAwesomeDB = database.db('sentences')
 //console.log(myAwesomeDB.collection('hindi').find().toArray

	 myAwesomeDB.collection('sanskrit').find().toArray(function (err, result) {
    if (err) throw err

    hindisentences=result
    console.log(hindisentences);
   


    current_sentence=hindisentences[0][0]
    console.log(hindisentences[0][0])
  })
   

})



app.get('/', (req, res ) =>  res.render('mainv2', {  sentence: hindisentences[0][0] })
)

app.get('/next', function(req, res) { 

current_sentence_id = current_sentence_id + 1;
console.log(current_sentence_id)

// res.render('mainv2', {  sentence: hindisentences[0][current_sentence_id] }) 

 res.send(hindisentences[0][current_sentence_id])

})



app.post('/audio', upload.single('upl'), function (req, res, next) {


    // remove current sentence from the list
       
//	current_sentence_id = current_sentence_id + 1;
//console.log(current_sentence_id)

// res.render('mainv2', {  sentence: hindisentences[0][current_sentence_id] }) 
// res.render('mainv2', {  sentence: 'test' }) 

      
	
    console.log(req.file);
    
    var stream = fs.createWriteStream("uploads/" + current_sentence_id.toString() + '.txt' );
stream.once('open', function(fd) {
  stream.write(hindisentences[0][current_sentence_id]);
  
  stream.end();
});

    res.status(200).send("file uploaded");


})



app.post('/', function(req, res){

/* fs.writeFile(wav_file_path + Date.now() + '.wav', req.body, function(err) {
    res.sendStatus(err ? 500 : 200);
  });

*/
 
 //console.log(req.body);

 //destination=wav_file_path + Date.now() + '.wav';

 //cb = function(p) { console.log(p) }

  //download( req.body, destination , cb);

/* req.on('readable', function(){
    console.log(req.read());
    writeStream.pipe(req.body)
  });

 */

 res.send('got a post request')
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
