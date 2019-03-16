const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const posts = require('./posts.js');
posts.registerPaths(app);


const auth = require('./auth.js');
auth.registerPaths(app);

app.post('/api/EditPost', (req, res) => {
    if(!auth.checkCode(req.body.adminCode)){
        res.send({error: 'Authentication failed'});
        return;
    }

    if(!posts.editPost(req.body)){
        res.send({error: 'Undefined error!'});
        return;
    }

    res.send({error: 'No error'});

});

//Return react app in production
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html')); 
});

app.listen(port, function(){
    console.log('Listening on port ' + port);
});