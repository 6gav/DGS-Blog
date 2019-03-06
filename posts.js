const fs = require('fs');

var postList = [];

fs.readFile("posts.txt", function(err, data){
    if(err){
        console.log(err);

    }
    else{
        var json = [];
        try {
            json = JSON.parse(data);
            
        } catch (error) {

        }
        postList = json;
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

        fs.writeFile("posts.txt", JSON.stringify(postList), function(err){
            if(err){
                console.log(err);
            }
        });
    });
}
