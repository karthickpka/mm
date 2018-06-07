const http = require('http')
const express = require('express')
const session = require('express-session')
var bodyParser = require('body-parser');

var dbFns = require('./Server/inventoryTable.js')
var billFns = require('./Server/billingTable.js')

var port = 4444;
var pSession;
const app = express()
            
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session(
        {   secret:'hellNew',
            resave: true,
            saveUninitialized: true  }))
app.use('/',express.static(__dirname+'//Client'));

//Homepage and Login
app.get('/',function(req,res){
        pSession = req.session;     
        res.sendFile(__dirname+'//Client//Login.html')
        })
app.get('/username',function(req,res){
               res.send(pSession.username);
                })
app.get('/home',function(req,res){
        if(pSession)
        {
                res.sendFile(__dirname+'//Client//Home.html')
        }
        else
                res.redirect('/');
})
app.get('/logout',function(req,res){
        req.session.destroy(function(err){
                if(err) res.send(err);
                else
                res.redirect('/');
        })
})
app.post('/home',function(req,res){
        if(req.body.username==req.body.password)
        {
                pSession.username = req.body.username;
                res.sendFile(__dirname+'//Client//Home.html')
        }
        else
                res.redirect('/');
        //Authenticate here        
})


// Billing Page
app.get('/billing',function(req,res){
        res.sendFile(__dirname+'//Client//Billing.html')
        })
app.get('/insertBilling',function(req,res){
        billFns.insertBillingRecord(req,res);
        })
app.get('/searchBillingRecord',function(req,res){
        billFns.searchBillingRecord(req,res);
        })
app.get('/dailySummary',function(req,res){
        billFns.dailySummary(req,res);    
})
app.get('/modelSummary',function(req,res){
        billFns.modelSummary(req,res);    
})

// Inventory Page
app.get('/viewAll',function(req,res){
        dbFns.viewAll(req,res);
        })
app.get('/insertRecord',function(req,res){
        dbFns.insertRecord(req,res);      
        })
app.get('/updateRecord',function(req,res){
        dbFns.updateRecord(req,res);
        })
app.get('/deleteRecord',function(req,res){
        dbFns.deleteRecord(req,res);
        })
app.get('/searchRecord',function(req,res){
        dbFns.searchRecord(req,res);
        })
app.get('/Summary',function(req,res){
        dbFns.summary(req,res);})



var server = app.listen(port,function(){console.log('Server running on '+port)})