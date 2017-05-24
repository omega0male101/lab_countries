var MongoClient = require('mongodb').MongoClient;

var CountryQuery = function(){
  this.url = 'mongodb://localhost:27017/bucket_list'
};

CountryQuery.prototype = {

  all: function(onQueryFinshed){
    MongoClient.connect(this.url, function(err, db){
      if (db){
        console.log("Db connected, i think? - Error 55498200");
        var collection = db.collection('countries');
        collection.find().toArray(function(err, docs){
          onQueryFinshed(docs);
        });
      }
    });
  },

  add: function(countryToAdd, onQueryFinshed){
    MongoClient.connect(this.url, function(err, db){
      if (db){
        var collection = db.collection('countries');
        collection.insert(countryToAdd);
        collection.find().toArray(function(err,docs){
          console.log(docs);
          onQueryFinshed(docs);
        });
      };
    })
  }
};

module.exports = CountryQuery;