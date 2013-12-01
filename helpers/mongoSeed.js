function seedNotebooks() {
	'use strict';
	var userC = db.users.count(),
		users = db.users.find();
	for ( var i = 0; i < userC * 3; i++ ) {
		var userId = users[i % userC]._id;
		db.notebooks.insert( { userId : userId, title : 'title' + i, tags : [ 'tag' + i ] } );
	}
}

function shareNotebooks() {
	'use strict';
	var userC = db.users.count() - 1,
		users = db.users.find();
	for ( var i = 0; i <= userC; i++ ) {
		var userId = users[i]._id;
		db.notebooks.update( { userId : userId }, { $push : { shared : { with : users[ userC - i ]._id, edit : true } } } );
	}
}

function seedNotes() {
	'use strict';
	var notebookC = db.notebooks.count(),
		notebooks = db.notebooks.find();
	for ( var i = 0; i < notebookC * 3; i++ ) {
		var notebook = notebooks[i % notebookC];
		db.notes.insert( { userId : notebook.userId, notebookId : notebook._id, title : 'title' + i, tags : [ 'tag' + i ], note : 'note' + i } );
	}
}

function shareNotes() {
	'use strict';
	var userC = db.users.count() - 1,
		users = db.users.find();
	for ( var i = 0; i <= userC; i++ ) {
		var userId = users[i]._id;
		db.notes.update( { userId : userId }, { $push : { shared : { with : users[ userC - i ]._id, edit : true } } } );
	}
}

function seedDb() {
	'use strict';
	db.notes.drop();
	db.notebooks.drop();

	seedNotebooks();
	seedNotes();
	shareNotebooks();
	shareNotes();
}

seedDb();