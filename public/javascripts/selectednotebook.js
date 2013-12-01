
$(document).ready(function () {
	var doc;
	function ajaxThis(d, url, callback){
	$.ajax({
		type: "POST",
		url: url,
		data: { _id : d},
	}).done(function(msg){
		doc = msg;
		callback(msg);
	
});
}
function ajaxRequest(d, url, callback){
		$.ajax({
			type: "POST",
			url: url,
			data: {data: d},
		}).done(function(msg){
			callback(msg);
		});
	}


function updateNB(){
	//console.log(id);
	ajaxThis(id, '/getnotebook', function(msg){ 
	console.log(msg);
	$('.header').html(msg.title + " Notebook");
	$('#t').html(msg.title + " Notebook");
});

	grabNotes();

}

function grabNotes(){
	console.log(id);
	//console.log(id.notebookId);
	ajaxRequest(id, '/grabnotes', function(msg1){
	console.log("note " + msg1.notebookId);
	console.log(msg1);
	var html = '<div id="nHidden" style="display:none;"><div class="searchResult" id="' +  msg1._id + '"><a href="#"><span class="hoverWrapper"><span class="itemTile"><span class="noteIcon"><img src="/images/noteIcon.png"/>	<span class="namePlate">' + msg1.title +'</span></span><span class="selectBox"><input type="checkbox" class="checkbox"/><label></label></span></span></span></a></div>';
		$('.content').html(html);
	});
}







updateNB();









































});