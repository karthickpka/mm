mongo = require('mongodb')
mongoClient = mongo.MongoClient;
dbName = 'mydb';
collectionName = "DataSet1";
collectionNameSpares = "DataSet1";
url = "mongodb://localhost:27017/"+dbName


//var dateFormat = require('dateformat');
// View all
viewAll = function(req,res){
    //console.log('View All function')
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        // query = {name: "Karthick" }
        db.collection(collectionName).find().sort({Date:1}).toArray(function(err, result) {
            if (err) throw err;
            db.close();
            res.send(result);
        });
    }); 
}

//Insert Record
insertRecord = function(req,res){
    //console.log('insert Record function')
    mongoClient.connect(url, function(err, db) {
        if (err) console.log(err);//throw err;
        //var pRecord = {_id:1,Date:Date.now(),Model:"M1",MRP:"0",MOP:"0",Discount:"0"};
        //Date:new Date().toString()        
        
        if(req.query.sparesflag.toString()=='false'){
        var pRecord = {_id:req.query.imei.toString(),Date:req.query.date,Model:req.query.model,
            MRP:req.query.mrp,MOP:req.query.mop,Discount:req.query.discount,
            Availability:req.query.avail,Comment:req.query.comment};
        db.collection(collectionName).insert(pRecord,function(err,result){
            db.close();
            if(err) res.send(req.query.sparesflag + 'IMEI already exists');//throw err;
            else
            res.send('IMEI Record Inserted');
        })}
        else
        {
            /*var pRecord = {Count:req.query.imei.toString(),Date:req.query.date,Model:req.query.model,
                MRP:req.query.mrp,MOP:req.query.mop,Discount:req.query.discount,
                Availability:req.query.avail,Comment:req.query.comment};*/
            var pRecord = {_id:req.query.imei.toString(),Date:req.query.date,Model:req.query.model,
                MRP:req.query.mrp,MOP:req.query.mop,Discount:req.query.discount,
                Availability:req.query.avail,Comment:req.query.comment};
            db.collection(collectionNameSpares).insert(pRecord,function(err,result){
                db.close();
                if(err) res.send('Error in Adding Spares- Model Already Exists');//throw err;
                else
                res.send('Spares Record Inserted');
            })   
        }



    }); 

}

//Update Record
updateRecord = function(req,res){
    //console.log('Update record function')
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        //console.log(Object.keys(req.query).length)

        if(Object.keys(req.query).length==2)
            {
                pRecord = {_id:req.query.imei.toString(),Availability:req.query.avail};
            }
        else
            {
                 pRecord = {_id:req.query.imei.toString(),Date:req.query.date,Model:req.query.model,MRP:req.query.mrp,MOP:req.query.mop,
                 Discount:req.query.discount,Availability:req.query.avail,Comment:req.query.comment};
            }
            
        db.collection(collectionName).update({_id:req.query.imei.toString()},{$set: pRecord},function(err,result){
            if(err) throw err;
            db.close();
            res.send('Record Updated')
        })
    }); 
}

//delete Record
deleteRecord = function(req,res){
//console.log('Delete Record');

mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        console.log(req.query.sparesflag.toString())
        if(req.query.sparesflag.toString()=='false'){
        db.collection(collectionName).remove({_id:req.query.imei.toString()},function(err,result){
            if(err) throw err;
            db.close();
            res.send('Record removed')
        })}
        else
        {
            db.collection(collectionNameSpares).remove({_id:req.query.imei.toString()},function(err,result){
            if(err) throw err;
            db.close();
            res.send('Spares Record removed')
        })     
        }


    }); 
};

searchRecord = function(req,res){
///console.log('Search Record');
mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var query = {}
        if(req.query.name)
            query[req.query.name]= new RegExp(req.query.value,"i");
        if(req.query.name=="_id")
            query[req.query.name]= new RegExp("^"+req.query.value+"$","i");
        
        db.collection(collectionName).find(query).sort({Date:1}).toArray(function(err, result) {
            if (err) throw err;
            db.close();
            res.send(result);
        });
    }); 
};

summary = function(req,res)
{
//console.log("summary")
mongoClient.connect(url,function(err,db){
     if (err) throw err;

      db.collection(collectionName).aggregate({$group : { _id : {
            'Model': '$Model',
            'Availability': '$Availability'
                }, count : {$sum : 1}}},
            {$project: {
                _id: 0, 
                Model: '$_id', 
                countAvail: '$count', 
            }}).sort({_id:1}).toArray(function(err,result){
        if (err) throw err;    
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