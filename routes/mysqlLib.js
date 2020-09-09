var Pool = require('generic-pool').Pool;
var mysql = require('mysql'); // v2.10.x

var pool = new Pool({
    name     : 'mysql',
    create   : function(callback) {
        var c = mysql.createConnection({
                user: 'root',
                password: 'password',
                database:'bus_portal',
                host: 'localhost',
                port: 3306
        })

        // parameter order: err, resource
        callback(null, c);
    },
    destroy  : function(client) { client.end(); },
    max      : 2,
    // optional. if you set this, make sure to drain() (see step 3)
     min      : 1,
     autostart :true,
     maxWaitingClients:1,
    // specifies how long a resource can stay idle in pool before being removed
    idleTimeoutMillis : 10000,
    evictionRunIntervalMillis:30000,
     // if true, logs via console.log - can also be a function
    log : true
});

/*var pool = mysql.createPool({
    connectionLimit: 3, //important
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bus_portal',
    debug: false,
    port:3306
});*/





exports.pool = pool;