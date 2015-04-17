/*jslint node: true */
'use strict';
/**
 * Main compiler for app
 */
module.exports = function (grunt)
{

	var appConfig = {
		app: 'app',
		dist: 'dist'
	};

  grunt.initConfig(
  {
    pkg: grunt.file.readJSON('package.json'),
	paths: appConfig,

    
	clean: {
	  files: ['<%= paths.dist %>/*']
	},
	rev: {
		files: {
		  src: ['scripts/app.js', 'css/app.css']
		}
	},
	/**
     * sass compiler
     */
    sass: {
      options: {
        sourcemap: 'none',
        trace: true,
        cacheLocation:  'sass/.sass-cache'
      },
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'promo/css/bootstrap.min.css':   'sass/bootstrap.scss',
          'promo/css/responsive.min.css':  'sass/responsive.scss',
          'promo/css/app.min.css':         'sass/app.scss'
        }
      },
      dev: {
        options: {
          style: 'expanded' // nested (default), compact, compressed, or expanded
        },
        files: {
          'promo/css/bootstrap.css':   'sass/bootstrap.scss',
          'promo/css/responsive.css':  'sass/responsive.scss',
          'promo/css/app.css':         'sass/app.scss'
        }
      }
    },

    /**
     * Compass
     */
    compass: {
      options: {
        sassDir: 'sass',
        relativeAssets: false,
        noLineComments: true
      },
      dist: {
        options: {
          cssDir: 'promo/css',
          outputStyle: 'compressed'
        }
      },
      dev: {
        options: {
          cssDir: 'promo/css',
          debugInfo: false,
          outputStyle: 'expanded'
        }
      }
    },


    /**
     * Connect
     */
    connect: {
      all: {
        options:{
          port: 3000,
          hostname: "0.0.0.0",
          // Prevents Grunt to close just after the task (starting the server) completes
          // This will be removed later as `watch` will take care of that
          keepalive: false,
          middleware: function(connect, options)
          {
            return [
              // Load the middleware provided by the livereload plugin
              // that will take care of inserting the snippet
              require('grunt-contrib-livereload/lib/utils').livereloadSnippet,

              // Serve the project folder
              connect.static(options.base)
            ];
          }
        }
      }
    },

    /**
     * Open browser automaticly
     */
    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= connect.all.options.port%>/indexTeamtelefoon.html'
      }
    },

    /**
     * watch for changes
     */
    watch: {
      options: {
        livereload: true
      },
      html: {
        files: [
          'index*.html'
        ]
      },
      css: {
        files: [
          'sass/**/*.scss'
        ],
        tasks: ['compass']
      },
      scripts: {
        files: 'promo/js/**/*.js',
        options: {
          debounceDelay: 250
        }
      },
      configFiles: {
        files: [ 'Gruntfile.js'],
        options: {
          reload: true
        }
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('server',[
    'open',
    'connect',
    'watch'
  ]);
  grunt.registerTask('build',[
    'clean'
  ]);
};