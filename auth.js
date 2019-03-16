const fs = require('fs');

var authCode = Math.floor(Math.random() * 1000000);

module.exports.registerPaths = function(app){
    app.post('/api/SubmitLogin', (req, res) => {
        fs.readFile('credentials.txt', function(err, data){
            var credentials = JSON.parse(data);

            if(req.body.username == credentials.username && req.body.password == credentials.password){
                res.send({auth: authCode});
            }        
            else
            {
                res.send({auth: -1});
            }
        });
    });

    app.post('/api/CheckAdmin', (req, res) => {
        if(req.body.auth == authCode){
            res.send({error: 0});
        }
        else
        {
            res.send({error: 404});
        }
    });
}

module.exports.checkCode = function(code){
    if(code == authCode){
        return true;
    }
}