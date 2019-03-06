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
        
        //Current date
        var date = new Date();
        
        
        //Format date
        
        var year, month, day;
        
        year  =  '' +  date.getFullYear();
        month =  '' + (date.getMonth() + 1);
        day   =  '' +  date.getDate();
        if(month.length < 2){
            month = '0'+month;
        }
        
        if(day.length < 2){
            day = '0'+day;
        }
        
        var dateString = month + '-' + day + '-' + year;
        var post = req.body;
        req.body.date = dateString;
        
        //Put post in list
        postList.unshift(post);
        
        res.send({error: 0});
        ref.set(postList);
    });
}
