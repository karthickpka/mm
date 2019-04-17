mongo = require('mongodb')
mongoClient = mongo.MongoClient;
dbName = 'mydb';
collectionName = "UserDetails";
url = "mongodb://localhost:27017/" + dbName

searchUserRecord = function (req, res) {
    mongoClient.connect(url, function (err, db) {
        if (err) console.log(err); //throw err;
        var query = {UserName:req.body.username,Password:req.body.password}

        db.collection(collectionName).find(query).toArray(function (err, result) {
            if (err) console.log(err); //throw err;
            db.close();
            res.send(result);
        });
    });
};

module.exports.searchUserRecord = searchUserRecord;