module.exports = function(app){
    console.log('routes file');

    require('./posts.js')(app);
};