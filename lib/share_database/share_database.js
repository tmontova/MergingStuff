var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;


exports.getSearchUsers = function (callback, query) {
  MongoClient.connect('mongodb://127.0.0.1:27017/notes', function (err, db) {
    var users = db.collection('users');
    if (err)
      callback(err);
    else{
      users.find({$or: [
                            { name:  {$regex: query} },
                            { email: {$regex: query} }
                          ]}).toArray(function (err, items) {
        if (err)
          callback(err);
        else {
          callback(undefined, items);
        }
      });
    }
  });
};

exports.getEditUsers = function (callback) {
  MongoClient.connect('mongodb://127.0.0.1:27017/notes', function (err, db) {
    var users = db.collection('edit');
    if (err)
      callback(err);
    else{
      users.find().toArray(function (err, items) {
        if (err)
          callback(err);
        else {
          callback(undefined, items);
        }
      });
    }
  });
};
exports.addUserView = function(user, callback){
  var userObj = user;
  MongoClient.connect('mongodb://127.0.0.1:27017/notes', function (err, db) {
    var users = db.collection('users');
      edit.update({userid: parseInt(id)}, {$set: {canEdit: false}}, function (err, docs) {
        callback(err, docs);
      });
      var user = users.find({userid: parseInt(id)}).toArray();
      var edit = db.collection('edit');
      edit.insert(user, function(err, docs){
        callback(err, docs);
      });
  });
}

exports.addUser = function(user, callback){
  var userObj = user;
  MongoClient.connect('mongodb://127.0.0.1:27017/notes', function (err, db) {
      var edit = db.collection('edit');
      edit.insert(user, function(err, docs){
        callback(err, docs);
      });
  });
}

exports.getUserbyID = function(id, callback){
    MongoClient.connect('mongodb://127.0.0.1:27017/notes', function (err, db) {
    var users = db.collection('users');
    if (err)
      callback(err);
    else{
      users.find({userid: parseInt(id)}).toArray(function (err, items) {
        if (err)
          callback(err);
        else {
          callback(undefined, items);
        }
      });
    }
  });
}

exports.deleteUser = function (id, callback) {
  MongoClient.connect('mongodb://127.0.0.1:27017/notes', function (err, db) {
    var edit = db.collection('edit');
    if (err)
      callback(err);
    else{
      edit.remove({userid: parseInt(id)}, function (err, docs) {
      callback(err, docs);
      });
    }
  });
};

exports.canEditChange = function (id, callback) {
  MongoClient.connect('mongodb://127.0.0.1:27017/notes', function (err, db) {
    var edit = db.collection('edit');
    if (err)
      callback(err);
    else{
      edit.update({userid: parseInt(id)}, {$set: {canEdit: true}}, function (err, docs) {
        callback(err, docs);
      });
    }
  });
}

  exports.canViewChange = function (id, callback) {
  MongoClient.connect('mongodb://127.0.0.1:27017/notes', function (err, db) {
    var edit = db.collection('edit');
    if (err)
      callback(err);
    else{
      edit.update({userid: parseInt(id)}, {$set: {canEdit: false}}, function (err, docs) {
        callback(err, docs);
      });
    }
  });
}
