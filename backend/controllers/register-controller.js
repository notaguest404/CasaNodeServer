var db = require('../routes/conn');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const BCRYPT_SALT_ROUNDS = 12

//Controller responsible for registration
module.exports.register = function(req, res) {

    //bcrypt.hashSync(req.body.password, BCRYPT_SALT_ROUNDS)
    //Registration form information

    let passwordHashed = bcrypt.hashSync(req.body.password, BCRYPT_SALT_ROUNDS);
    var users = {
                "id": uuidv4(),
                "email": req.body.email, 
                "password": passwordHashed,
                "nickname": req.body.nickname,
                "residence": req.body.residence,
                "phone": req.body.phone
            }

    /*bcrypt
        .hash(req.body.password, BCRYPT_SALT_ROUNDS)
        .then(hash => {
            var users = {
                "id": uuidv4(),
                "email": req.body.email, 
                "password": hash,
                "nickname": req.body.nickname,
                "residence": req.body.residence,
                "phone": req.body.phone
            }*/
        

    //Verify information
    console.log("Aqui!");

    //Database query to insert user
    var query = db.query('INSERT INTO user SET?', users, function(error, results){
        console.log(query.sql);
        if(error) {
            res.json({
                status:false, 
                message: 'There are some error with query'
            })
            console.log(error)
        } else {
            res.json({
                status:true, 
                data:results,
                message:'User registered sucessfully'
            })
        }
    });
 // })
}
