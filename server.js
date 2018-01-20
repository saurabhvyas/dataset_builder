const express = require('express')
const app = express()

app.use(express.static('public'))


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


app.get('/', (req, res) =>  res.render('main', {  sentence: hindisentences[0][0] })
)

app.listen(3000, () => console.log('Example app listening on port 3000!'))
