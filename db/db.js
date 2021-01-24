//import librairie
const Sequlize = require('sequelize');
//connexion librairie
const connection = new Sequlize('test','root','',
{
    host: 'localhost',
    dialect: 'mysql'
});
//connexion bdd
connection.authenticate()
    .then(function()
    {
        console.log('connected');
    })
    .catch(function(err)
    {
        console.log(err);
    }); 
    

module.exports = connection;
