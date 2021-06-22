// Database connection
var db = require('../routes/conn');
const { v4: uuidv4 } = require('uuid');

// Controller responsible for the Item section in the side menu (Navigation Two)
// CRUD

// CREATE
// Save new item
module.exports.createUser = function(req, res) {

    // New item with respective settings
    var user = {
        "id": uuidv4(),
        "nickname": req.body.nickname,
        "residence": req.body.residence,
        "phone": req.body.phone,
        "notes": req.body.notes,
        "verified": req.body.verified
    }
    //New item information
    console.log("New user information", user);
    //Database query to save item
    db.query('INSERT INTO user SET?', user, function(error, results, fields){
        if(error) {
            res.json({
                status:false,
                //message: req
            })
        } else {
            res.json({
                results
            })
        }
    });
}

// READ
// Table with item in Navigation Two Menu (Name and Description)
module.exports.userTable = function(req, res, next) {
    //Database query to select all dashboards
    db.query('SELECT user.id AS id, user.nickname AS nickname, user.residence AS residence, user.phone AS phone, user.notes AS notes, user.verified AS verified FROM user', function (error, results, rows) {
        if(error) {
            console.log("There are some error with query");
            console.log(error)
        }
        else {

            console.log("Database results: ", results);
            res.json(
                results
            );
        }
    });
}

// READ
// Individual information for each item (Eye button)
module.exports.userInfo = function(req, res, next) {
    // ID
    var id = req.params;
    console.log("Id to be consulted", id);
    // Database query to select item to edit
    db.query('SELECT * FROM user WHERE id = ?', [id.userId], function (error, results, fields) {
        if(error) {
            console.log("There are some error with query");
        }
        else {
            res.json(
                results
            );
        }
    });
}

// UPDATE
// Update item
module.exports.updateUser = function(req, res) {
    // New item with respective settings
    const id = req.params
    const nickname = req.body.nickname
    const residence = req.body.residence
    const phone = req.body.phone
    const notes = req.body.notes
    const verified = req.body.verified
    //New item information
    let data = [nickname, residence, phone, notes, verified, id.userId];
    //Database query to save item
    db.query('UPDATE user SET nickname = ?, residence = ?, phone = ?, notes = ?, verified = ? WHERE id = ?', data, function(error, results, fields){
        if(error) {
            res.json({
                status:false,
                message: 'There are some error with query'
            })
        } else {
            res.json({
                results
            })
            console.log("Updated item");
        }
    });
}

// DELETE
// Individual information for each item (Remove button)
module.exports.removeUser = function(req, res, next) {

    //ID
    var id = req.params;
    console.log("Id to be removed", id);

    // Database query to select item to remove
    db.query('DELETE FROM user WHERE id = ?', [id.userId], function (error, results, fields) {
        if(error) {
            console.log("There are some error with query");
        }
        else {
            console.log("Removed");
            res.json({
                results
            });
        }
    });
}