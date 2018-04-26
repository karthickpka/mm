mongo = require('mongodb')
mongoClient = mongo.MongoClient;
dbName = 'mydb';
collectionName = "DataSet1";
url = "mongodb://localhost:27017/"+dbName


//var dateFormat = require('dateformat');
// View all
viewAll = function(req,res){
    //console.log('View All function')
    mongoClient.connect(url, function(err, db) {
        if (err) console.log(err); //throw err;
        // query = {name: "Karthick" }
        db.collection(collectionName).find().limit(25).sort({Date:-1}).toArray(function(err, result) {
            if (err) console.log(err); //throw err;
            db.close();
            res.send(result);
        });
    }); 
}

//Insert Record
insertRecord = function(req,res){
    mongoClient.connect(url, function(err, db) {
        if (err) console.log(err);//throw err;
        var pRecord = {_id:req.query.imei.toString(),Date:req.query.date,Model:req.query.model,
            MRP:req.query.mrp,MOP:req.query.mop,Discount:req.query.discount,
            Availability:parseInt(req.query.avail),Comment:req.query.comment,ShopName:req.query.shopname};
        db.collection(collectionName).insert(pRecord,function(err,result){
            db.close();
            if(err) res.send(req.query.sparesflag + 'IMEI already exists');//throw err;
            else
            res.send('IMEI Record Inserted');
        })
    }); 
}

//Update Record
updateRecord = function(req,res){
    //console.log('Update record function')
    mongoClient.connect(url, function(err, db) {
        if (err) console.log(err); //throw err;
        //console.log(Object.keys(req.query).length)

        if(Object.keys(req.query).length==2)
            {
                pRecord = {_id:req.query.imei.toString(),Availability:parseInt(req.query.avail)};
            }
        else
            {
                 pRecord = {_id:req.query.imei.toString(),Date:req.query.date,Model:req.query.model,MRP:req.query.mrp,MOP:req.query.mop,
                 Discount:req.query.discount,Availability:parseInt(req.query.avail),Comment:req.query.comment,ShopName:req.query.shopname};
            }
            
        db.collection(collectionName).update({_id:req.query.imei.toString()},{$set: pRecord},function(err,result){
            if(err) console.log(err); //throw err;
            db.close();
            res.send('Record Updated')
        })
    }); 
}

//delete Record
deleteRecord = function(req,res){
//console.log('Delete Record');

mongoClient.connect(url, function(err, db) {
        if (err) console.log(err); //throw err;
        //console.log(req.query.sparesflag.toString())
        db.collection(collectionName).remove({_id:req.query.imei.toString()},function(err,result){
            if(err) console.log(err); //throw err;
            db.close();
            res.send('Record removed')
        })
    });
};

searchRecord = function(req,res){
///console.log('Search Record');
mongoClient.connect(url, function(err, db) {
        if (err) console.log(err); //throw err;
        var query = {}

        if(req.query.ShopName=="All"|| !req.query.ShopName)
         {
            if(req.query.name)
                query[req.query.name]= new RegExp(req.query.value,"i");
            if(req.query.name=="_id")
                query[req.query.name]= new RegExp("^"+req.query.value+"$","i");
         }
        else
         {
            if(req.query.name)
                query[req.query.name]= new RegExp(req.query.value,"i");
            if(req.query.name=="_id")
                query[req.query.name]= new RegExp("^"+req.query.value+"$","i");
            query["ShopName"]=req.query.ShopName;
         }
        db.collection(collectionName).find(query).sort({Date:-1}).toArray(function(err, result) {
            if (err) console.log(err); //throw err;
            db.close();
            res.send(result);
        });
    }); 
};

summary = function(req,res)
{
    query = {}
    if(req.query.ShopName!="All" && req.query.ShopName)
             query["ShopName"]=req.query.ShopName;
mongoClient.connect(url,function(err,db){
     if (err) console.log(err); //throw err;

      db.collection(collectionName).aggregate([{$match: query},{ $group: { _id: "$Model", total:{$sum: "$Availability" }}}]).sort({_id:1}).toArray(function(err,result){
        if (err) console.log(err); //throw err;    
        res.send(result)
        db.close();
     })
});
}

module.exports.viewAll = viewAll;
module.exports.insertRecord = insertRecord;
module.exports.updateRecord = updateRecord;
module.exports.deleteRecord = deleteRecord;
module.exports.searchRecord = searchRecord;
module.exports.summary = summary;