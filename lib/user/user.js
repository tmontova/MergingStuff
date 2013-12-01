var bcrypt = require( 'bcrypt' ),
	dbHelp = require( '../../helpers/dbHelper.js' );

/**
 * calls callback with an object representing the user with username and password if such a user exists
 * otherwise calls callback with null or the error that occured
 */
exports.auth = function ( username, password, callback ) {
	'use strict';
	dbHelp.dbConn( function ( err, db ) {
		if ( err ) callback( err );

		var users = db.collection( 'users' );
		users.findOne( { username : username }, function ( err, doc ) {
			if ( err ) callback( err );
			if ( doc === null ) callback( null );

			console.log( doc );

			if( !bcrypt.compareSync( password, doc.pHash ) )
				callback( null );
			else{
				var user = { _id : doc._id, fname : doc.fname, lname : doc.lname, username : doc.username, email : doc.email };
				callback( user );
			}
		} );
	} );
};

/**
 * creates a new entry in the users collection with all of the parameters as attributes
 * calls callback with false if a user with that username or email already exists or the error that occurred
 */
exports.add = function ( fname, lname, username, email, password, callback ) {
	'use strict';
	dbHelp.dbConn( function ( err, db ) {
		if ( err ) callback( err );

		var hash = bcrypt.hashSync( password, 10 ),
			users = db.collection( 'users' ),
			user = { fname : fname, lname : lname, username : username, email : email, pHash : hash };

		if ( users.find( { $or: [ { username: username }, { email: email } ] } ).count() !== 0 ) callback( false );

		users.insert( user, { w : 1 }, function ( err ) {
			if ( err ) callback( err );
		} );
	} );
};

/**
 * calls callback with an object with the user name username if one exists
 * otherwise calls callback with null or the error that occurred
 */
exports.findOne = function ( username, callback ) {
	'use strict';
	dbHelp.dbConn( function ( err, db ) {
		if ( err ) callback( err );

		var users = db.collection( 'users' );
		users.findOne( { username : username }, function ( err, doc ) {
			if ( err ) callback( err );

			callback( doc );
		} );
	} );
};

/**
 * calls callback with an array of user objects with user names that include username as a substring
 * or the error that occurred
 */
exports.find = function ( username, callback ) {
	'use strict';
	dbHelp.dbConn( function ( err, db ) {
		if ( err ) callback( err );

		var users = db.collection( 'users' );
		users.find( { username : username } ).toArray( function ( err, docs ) {
			if ( err ) callback( err );

			callback( docs );
		} );
	} );
};