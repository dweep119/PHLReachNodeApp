var Knex = require('knex');

module.exports = Knex({ 
    client: 'mysql', 
    connection: {
	  host: 'prismkapa-db-2.co1pzr0q6fyu.us-east-2.rds.amazonaws.com',
	  user: 'admin',
	  password: 'RkgIghB7a1hOgzcSW7Ug',
	  database: 'new_phl'
	}
});