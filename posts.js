const fs = require('fs');

var postList = [];

fs.readFile("posts.txt", function(err, data){
    if(err){
        console.log(err);

    }
    else{
        json = JSON.parse(data);
        console.log(json);
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
    });
}
