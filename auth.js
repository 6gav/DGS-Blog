const fs = require('fs');

module.exports = function(app){
    app.post('/api/SubmitLogin', (req, res) => {
        fs.readFile('credentials.txt', function(err, data){
            var credentials = JSON.parse(data);

            if(req.body.username == credentials.username && req.body.password == credentials.password){
                res.send({auth: 293});
            }
        });
    })
}