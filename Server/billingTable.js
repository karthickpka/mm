mongo = require('mongodb')
mongoClient = mongo.MongoClient;
dbName = 'mydb';
billCollectionName = "DataSet2";
url = "mongodb://localhost:27017/"+dbName


//var dateFormat = require('dateformat');


//Insert Record
insertBillingRecord = function(req,res){
    //console.log('insert Billing Record function')
    mongoClient.connect(url, function(err, db) {
        if (err) console.log(err);//throw err;
        //var pRecord = {_id:1,Date:Date.now(),Model:"M1",MRP:"0",MOP:"0",Discount:"0"};
        //Date:new Date().toString()
        var pRecord = {_id:req.query.imei.toString(),BillNo:req.query.billno,Date:req.query.date,SellingPrice:req.query.sellingprice,
            CustName:req.query.name,CustContact:req.query.contact,CustAddress:req.query.address,
            Comment:req.query.comment};
        db.collection(billCollectionName).insert(pRecord,function(err,result){
            db.close();
            if(err) res.send('IMEI already Billed');//throw err;
            else
            res.send('Record Inserted to Billing')
        })
    }); 
};
searchBillingRecord = function(req,res){
    //console.log('Search Billing Record');
    mongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var query = {}
            if(req.query.name)
                {
                query[req.query.name]= new RegExp(req.query.value,"i");
                db.collection(billCollectionName).find(query).sort({Date:1}).toArray(function(err, result) {
                    if (err) throw err;
                    db.close();
                    res.send(result);
                    });
                }
            else // Just get the Count of bills
                db.collection(billCollectionName).count(function(err,result){
                    if (err) throw err;
                    db.close();
                    res.send(result.toString());
                })

        });
}; 


dailySummary = function(req,res)
{
//console.log(req.query.date)
mongoClient.connect(url,function(err,db){
     if (err) throw err;

      db.collection(billCollectionName).find({Date:req.query.date}).sort({_id:1}).toArray(function(err,result){
        if (err) throw err;    
        res.send(result)
        db.close();
     })
});
}


module.exports.insertBillingRecord = insertBillingRecord;
module.exports.searchBillingRecord = searchBillingRecord;
module.exports.dailySummary = dailySummary;
//dailySummary