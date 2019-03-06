const fs = require('fs');
const admin = require('firebase-admin');
var serviceAccount= require('./serviceAccount.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://degas-blog.firebaseio.com"
});

var postList = [];


var db = admin.database();
var ref = db.ref("posts");
ref.once("value", function(snapshot){
    console.log(snapshot.val());
    if(snapshot.val()){
        postList = snapshot.val()
    }
});





module.exports = function(app){
    app.get('/api/getPosts/count=:count', (req, res) => {
        var index = req.params.count;
        var spliceList = postList.slice(0, index);
        res.send({posts: spliceList});
    });

    app.post('/api/addPost', (req, res) => {
        postList.unshift(req.body);
        res.send({posts: postList});
        ref.set(postList);
    });
}
