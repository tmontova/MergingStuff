module.exports = function ( grunt ) {
	'use strict';
	grunt.initConfig( {
		pkg : grunt.file.readJSON( 'package.json' ),
		concat : {
			css : {
				src : [
					'public/stylesheets/header.css',
					'public/stylesheets/home.css',
					'public/stylesheets/notes_style.css',
					'public/stylesheets/sidebar.css',
					'public/stylesheets/style.css'
				],
				dest : 'public/stylesheets/application.css'
			},
			js : {
				options : {
					separator: ';'
				},
				src : [
					'public/javascripts/app.js',
					'public/javascripts/getResults_ajax.js',
					'public/javascripts/selectednotebook.js',
					'public/javascripts/SVG.js',
					'public/javascripts/takenote.js',
					'public/javascripts/viewnote.js'
				],
				dest : 'public/javascripts/application.js'
			}
		},
		csslint : {
			src : ['public/stylesheets/*.css']
		},
		cssmin : {
			options : {
				banner : '/*<%= pkg.name %> <%= grunt.template.today("mm-dd-yyyy") %>*/',
				report : 'min'
			},
			minifycss : {
				files : {
					'public/stylesheets/application.min.css' : [ 'public/stylesheets/*.css' ]
				}
			}
		},
		uglify : {
			options : {
				banner : '/*<%= pkg.name %> <%= grunt.template.today("mm-dd-yyyy") %>*/\n',
				report : 'min'
			},
			minifyjs : {
				files : {
					'public/javascripts/application.min.js' : ['public/javascripts/*.js']
				}
			}
		}
	} );

	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-csslint' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );

	grunt.registerTask( 'minify', ['cssmin', 'uglify'] );
};