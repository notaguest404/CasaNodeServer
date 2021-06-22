// Database connection
var db = require('../routes/conn');
const { v4: uuidv4 } = require('uuid');

// Controller responsible for the Item section in the side menu (Navigation Two)
// CRUD

// CREATE
// Save new item
module.exports.createItem = function(req, res) {

    // New item with respective settings
    var item = {
        "id": uuidv4(),
        "name": req.body.name,
        "numero": req.body.numero,
        "stock": req.body.stock,
        "notas": req.body.notas,
        "kit_details": req.body.kit_details,
        "check_in": req.body.check_in,
        "check_out": req.body.check_out,
        "appetizer": req.body.appetizer,
        "side_dish": req.body.side_dish,
        "dessert": req.body.dessert,
        "gaps": req.body.gaps,
        "spoons": req.body.spoons,
        "napkin": req.body.napkin,
        "cuvettes": req.body.cuvettes,
        "cover": req.body.cover,
        "kitchen_paper_rolls": req.body.kitchen_paper_rolls,
        "rolls_toilet_paper": req.body.rolls_toilet_paper,
        "mistolim": req.body.mistolim,
        "dishwashing_detergent": req.body.dishwashing_detergent,
        "floor_detergent": req.body.floor_detergent,
        "gloves": req.body.gloves,
        "masks": req.body.masks
    }

    //New item information
    console.log("New item information", item);
    //Database query to save item
    db.query('INSERT INTO item  SET?', item, function(error, results){
        if(error) {
            res.json({
                status:false,
                //message: req
            })
            console.log(error)
        } else {
            res.json({
                results
            })
        }
    });
}

// READ
// Table with item in Navigation Two Menu (Name and Description)
module.exports.itemTable = function(req, res, next) {
    //Database query to select all dashboards
    db.query('SELECT item.id AS id, item.name AS name, item.numero AS numero, item.stock AS stock, item.notas AS notas, item.kit_details AS kit_details, item.check_in AS check_in, item.check_out AS check_out, item.appetizer AS appetizer, item.side_dish AS side_dish, item.dessert AS dessert, item.gaps AS gaps, item.spoons AS spoons, item.napkin AS napkin, item.cuvettes AS cuvettes, item.cover AS cover, item.kitchen_paper_rolls AS kitchen_paper_rolls, item.rolls_toilet_paper As rolls_toilet_paper, item.mistolim AS mistolim, item.dishwashing_detergent AS dishwashing_detergent, item.floor_detergent AS floor_detergent, item.gloves AS gloves, item.masks AS masks FROM item', function (error, results, rows) {
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
module.exports.itemInfo = function(req, res, next) {
    // ID
    var id = req.params;
    console.log("Id to be consulted", id);
    // Database query to select item to edit
    db.query('SELECT * FROM item WHERE id = ?', [id.itemId], function (error, results, fields) {
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
module.exports.updateItem = function(req, res) {
    // New item with respective settings
    const id = req.params
    const name = req.body.name
    const numero = req.body.numero
    const stock = req.body.stock
    const notas = req.body.notas
    const kit_details = req.body.kit_details
    const check_in = req.body.check_in
    const check_out = req.body.check_out
    const appetizer = req.body.appetizer
    const side_dish = req.body.side_dish
    const dessert = req.body.dessert
    const gaps = req.body.gaps
    const spoons = req.body.spoons
    const napkin = req.body.napkin
    const cuvettes = req.body.cuvettes
    const cover = req.body.cover
    const kitchen_paper_rolls = req.body.kitchen_paper_rolls
    const rolls_toilet_paper = req.body.rolls_toilet_paper
    const mistolim = req.body.mistolim
    const dishwashing_detergent = req.body.dishwashing_detergent
    const floor_detergent = req.body.floor_detergent
    const gloves = req.body.gloves
    const masks = req.body.masks


    //New item information
    let data = [name, numero, stock, notas, kit_details, check_in, check_out, appetizer, side_dish, dessert, gaps, spoons, napkin, cuvettes, cover, kitchen_paper_rolls, rolls_toilet_paper, mistolim, dishwashing_detergent, floor_detergent, gloves, masks, id.itemId];
    //Database query to save item
    db.query('UPDATE item SET name = ?, numero = ?, stock = ?, notas = ?, kit_details = ?, check_in = ?, check_out = ?, appetizer = ?, side_dish = ?, dessert = ?, gaps = ?, spoons = ?, napkin = ?, cuvettes = ?, cover = ?, kitchen_paper_rolls = ?, rolls_toilet_paper = ?, mistolim = ?, dishwashing_detergent = ?, floor_detergent = ?, gloves = ?, masks = ? WHERE id = ?', data, function(error, results, fields){
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
module.exports.removeItem = function(req, res, next) {

    //ID
    var id = req.params;
    console.log("Id to be removed", id);
    
    // Database query to select item to remove
    db.query('DELETE FROM item WHERE id = ?', [id.itemId], function (error, results, fields) {
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


