var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname,'../','../server','config'));
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../','../','client','views','index.html'));
});

router.post('/api/common/expense',function(req,res){
  var results=[];
  var data= { name:req.body.name,
              amount:req.body.amount,
              date:req.body.transactiondate,
              complete:false
            };
  pg.connect(connectionString,function(err,client,done){
    if(err){
      done();
      console.log(err);
      return res.status(500).json({success:false,data:err});
    }

    client.query("INSERT INTO expenses(name,amount,transactiondate,complete) values($1,$2,$3,$4)",[data.name,data.amount,data.date,data.complete]);
    var query = client.query("SELECT * FROM expenses ORDER BY id ASC");
    query.on('row',function(row){
      results.push(row);
    });
    query.on('end',function(){
      done();
      return res.json(results);
    });
  });
});

router.get('/api/common/expense',function(req,res){
  var results=[];

  pg.connect(connectionString,function(err,client,done){
    if(err){
      done();
      console.log(err);
      return res.status(500).json({success:false,data:err});
    }

    client.query("SELECT * FROM expenses ORDER BY id ASC");
    var query = client.query("SELECT * FROM expenses ORDER BY id ASC");
    query.on('row',function(row){
      results.push(row);
    });
    query.on('end',function(){
      done();
      return res.json(results);
    });
  });
});

router.get('/api/common/expense/:expense_id',function(req,res){
  var results=[];
  var id = req.params.expense_id;

  pg.connect(connectionString,function(err,client,done){
    if(err){
      done();
      console.log(err);
      return res.status(500).json({success:false,data:err});
    }

    client.query("SELECT * FROM expenses WHERE id=($1)",[id]);
    var query = client.query("SELECT * FROM expenses WHERE id=($1)",[id]);
    query.on('row',function(row){
      results.push(row);
    });
    query.on('end',function(){
      done();
      return res.json(results);
    });
  });
});


router.put('/api/common/expense/:expense_id',function(req,res){
  var results=[];
  var id = req.params.expense_id;
  var data= { name:req.body.name,
              amount:req.body.amount,
              date:req.body.transactiondate,
              complete:false
            };
  pg.connect(connectionString,function(err,client,done){
    if(err){
      done();
      console.log(err);
      return res.status(500).json({success:false,data:err});
    }

    client.query("UPDATE expenses SET name=($1), amount=($2), transactiondate=($3), complete=($4) WHERE id=($5)",[data.name,data.amount,data.date,data.complete,id]);
    var query = client.query("SELECT * FROM expenses ORDER BY id ASC");
    query.on('row',function(row){
      results.push(row);
    });
    query.on('end',function(){
      done();
      return res.json(results);
    });
  });
});

router.delete('/api/common/expense/:expense_id',function(req,res){
  var results=[];
  var id = req.params.expense_id;

  pg.connect(connectionString,function(err,client,done){
    if(err){
      done();
      console.log(err);
      return res.status(500).json({success:false,data:err});
    }

    client.query("DELETE FROM expenses WHERE id=($1)",[id]);
    var query = client.query("SELECT * FROM expenses ORDER BY id ASC");
    query.on('row',function(row){
      results.push(row);
    });
    query.on('end',function(){
      done();
      return res.json(results);
    });
  });
});


module.exports = router;
