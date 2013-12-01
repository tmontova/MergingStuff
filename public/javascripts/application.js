/**
 * Created by tallman on 11/4/13.
 */

//Responsive Things
var beResponsive = function () {
	"use strict";
	var things = $( 'div#nHidden' ).children(),
		container = $( 'div#nContainer' ),
		width = window.innerWidth,
		numThings = things.length,
		numWide = Math.floor( (width - 140) / 200 ),
		numTall = Math.ceil( numThings / numWide );

	for ( var i = 0; i < numTall; i++ ) {
		for ( var j = 0; j < numWide && i * numWide + j <= numThings; j++ ) {
			var thing = $( things[i * numWide + j] );
			thing.css( { left : j * 200 + 20, top : i * 80 + 10 } );
			container.append( thing );
		}
	}
};

var initSearch = function () {
	"use strict";
	var spinnerHTML = $( '#hiddenSpinner' ).remove().html();

	$( '#searchBox' ).on( 'submit', function () {
		console.log( spinnerHTML );
		$( '#mainContent' ).html( spinnerHTML );
		initSpinner();

		var input = $( '#searchField' ).val();
		var url = $( '#searchField' ).action;

		$.ajax( url, {
			type : 'GET',
			data : input,
			success : renderSearch()
		} );
	} );
};

var initShare = function () {
	"use strict";
	$( '#item_to_share' ).bind( 'click', function () {
		var conf = window.confirm( "Choose new notebook to share?" );
		if ( conf ) {
			window.location.replace( "/selectNotebook" );
		}
	} );

	$( '#save_button' ).bind( 'click', function () {
		window.location.replace( '/share' );
	} );
};
var itemSelect = function () {
	"use strict";
	$( '.searchResult' ).click( function () {
		$( this ).toggleClass( "highlighted" );
		var check = $( this ).find( '.checkbox' );
		check.prop( 'checked', !check.prop( "checked" ) );

	if(window.location.href.indexOf("home") > -1){
		if( $('.highlighted').length === 1){
		$( '.hmenu' ).css( {"visibility" : "visible"} );
		$('#open').removeClass('disabled');
		var newlink =  '/' + $('.highlighted')[0].id + '/SelectedNotebook';
		$('#link').prop('href', newlink);
	
	}
	
		else if($('.highlighted').length > 1){
			$('#open').addClass('disabled');
			$('#link').removeAttr('href');
			}

		else if($('.highlighted').length === 0){
			$( '.hmenu' ).css( {"visibility" : "hidden"} );
			$('#open').removeClass('disabled');
			
		}
	}

		if(window.location.href.indexOf("Selected") > -1){
			if( $('.highlighted').length === 1){
			$( '.hmenu' ).css( {"visibility" : "visible"} );
			$( '.smenu' ).css( {"visibility" : "visible"} );
			$('.smenu').removeClass('disabled');
			var newlink =  '/' + $('.highlighted')[0].id + '/edit';
			$('.links').prop('href', newlink);
		}

	

		else if($('.highlighted').length > 1){
			$('.smnenu').addClass('disabled');
			$('.links').removeAttr('href');
			}

		else if($('.highlighted').length === 0){
			$( '.hmenu' ).css( {"visibility" : "hidden"} );
			$( '.smenu' ).css( {"visibility" : "hidden"} );
			$('.links').removeClass('disabled');
			
		}
	}
	
		
	} );
};

var renderSearch = function ( resData, status ) {
	"use strict";
	beResponsive();
}

$( function () {
	"use strict";
	beResponsive();
	initSearch();
	initShare();
	itemSelect();
} );