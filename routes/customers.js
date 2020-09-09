/*
 * GET users listing.
 */
var mysqlLib = require("./mysqlLib").pool;
exports.list = function(req, res) {

    mysqlLib.acquire(function(err, mclient) {

        var query = mclient.query('SELECT * FROM customer', function(err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            // res.render('customers',{page_title:"Customers - Node.js",data:rows});
            mysqlLib.release(mclient);
            res.end(JSON.stringify(rows));

        });
        
        //console.log(query.sql);
    });

};

exports.add = function(req, res) {
    res.render('add_customer', { page_title: "Add Customers - Node.js" });
};

exports.edit = function(req, res) {

    var id = req.params.id;

    mysqlLib.acquire(function(err, mclient) {

        var query = mclient.query('SELECT * FROM customer WHERE id = ?', [id], function(err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);
            mysqlLib.release(mclient);
            res.render('edit_customer', { page_title: "Edit Customers - Node.js", data: rows });


        });

        //console.log(query.sql);
    });
};

/*Save the customer*/
exports.save = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));

    mysqlLib.acquire(function(err, mclient) {

        var data = {

            name: input.name,
            address: input.address,
            email: input.email,
            phone: input.phone

        };

        var query = mclient.query("INSERT INTO customer set ? ", data, function(err, rows) {

            if (err)
                console.log("Error inserting : %s ", err);
            
            mysqlLib.release(mclient);
            res.redirect('/customers');

        });

        // console.log(query.sql); get raw query

    });
};

exports.save_edit = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

    mysqlLib.acquire(function(err, mclient) {

        var data = {

            name: input.name,
            address: input.address,
            email: input.email,
            phone: input.phone

        };

        mclient.query("UPDATE customer set ? WHERE id = ? ", [data, id], function(err, rows) {

            if (err)
                console.log("Error Updating : %s ", err);
            
            mysqlLib.release(mclient);
            res.redirect('/customers');

        });

    });
};


exports.delete_customer = function(req, res) {

    var id = req.params.id;

    mysqlLib.acquire(function(err, mclient) {

        mclient.query("DELETE FROM customer  WHERE id = ? ", [id], function(err, rows) {

            if (err)
                console.log("Error deleting : %s ", err);

            mysqlLib.release(mclient);
            res.redirect('/customers');

        });

    });
};
