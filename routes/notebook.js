/**
 * Created by tallman on 10/28/13.
 */
/**
 * Created by tallman on 10/28/13.
 */
var username;

var notebook = require( '../lib/notebook' );
var note = require( '../lib/note' );
var dbHelp = require( '../helpers/dbHelper.js' );
var user = require( '../lib/user' );

exports.notebookHome = function ( req, res ) {

	notebook.listThem( function ( results, db ) {
		var noteResults = results;
		var noteDB = db;

		results.sort( function ( a, b ) {
			if ( a.title == b.title ) {
				return 0;
			} else if ( a.title < b.title ) {
				return -1;
			} else {
				return 1;
			}
		} );

		res.render( 'home', {
			username : username,
			title : 'Home Screen',
			results : results,
			results2 : noteResults
		} );

		db.close();
		noteDB.close();
	} );

};

exports.snb = function ( req, res ) {
	var query = req.params.id;
	note.find( query, "bunga", function ( results, db ) {
		var noteResults = results;
		var noteDB = db;

		noteResults.sort( function ( a, b ) {
			if ( a.title == b.title ) {
				return 0;
			} else if ( a.title < b.title ) {
				return -1;
			} else {
				return 1;
			}
		} );
		res.render( 'selectednotebook', { id : req.params.id, results : noteResults} );

		db.close();
		noteDB.close();
	} );
};

exports.getNB = function ( req, res ) {
	var id;
	if ( req.body ) {
		id = req.body._id;
	}
	notebook.getNoteBook( id, function ( err, item ) {
		if ( err )
			console.error( "db failed: " + err );
		else {
			res.contentType( 'application/json' );
			res.send( item );
		}
	} );

};

exports.addNote = function ( req, res ) {
	var notebookID;
	if ( req.body ) {
		notebookID = req.body._id;
	}
	note.addNote( notebookID, function ( err, item ) {
		if ( err )
			console.error( "db failed: " + err );
		else {
			res.contentType( 'application/json' );
			res.send( item );
		}
	} );

};
exports.removeNotebook = function ( req, res ) {

	if ( req.body ) {
		var userID = req.body.data;

		notebook.remove( userID, function ( err, docs ) {
			if ( err ) {
				console.error( 'db failed: ' + err );
			}
			else {
				res.send( new Array() );
			}
		} );

	}
}
exports.removeNote = function ( req, res ) {

	if ( req.body ) {
		var userID = req.body.data;

		note.remove( userID, function ( err, docs ) {
			if ( err ) {
				console.error( 'db failed: ' + err );
			}
			else {
				res.send( new Array() );
			}
		} );

	}
}

exports.grabNotes = function ( req, res ) {
	var id;
	if ( req.body ) {
		id = req.body._id;
	}
	note.grabNotes( id, function ( err, item ) {
		if ( err )
			console.error( "db failed: " + err );
		else {
			res.contentType( 'application/json' );
			res.send( item );
		}
	} );

};
