const express = require('express')
const app = express()

app.use(express.static('public'))

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

MongoClient.connect(connectionstr,(err,database) =>{ 
  const myAwesomeDB = database.db('sentences')
 //console.log(myAwesomeDB.collection('hindi').find().toArray

	 myAwesomeDB.collection('hindi').find().toArray(function (err, result) {
    if (err) throw err

    console.log(result)
  })
   

})


app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
