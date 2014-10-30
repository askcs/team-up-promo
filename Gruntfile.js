/*jslint node: true */
'use strict';
/**
 * Main compiler for app
 */
module.exports = function (grunt)
{
  grunt.initConfig(
  {
    pkg: grunt.file.readJSON('package.json'),

    /**
     * sass compiler
     */
    sass: {
      options: {
        sourcemap: false,
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
     * watch for changes
     */
    watch: {
      css: {
        files: [
          'sass/**/*.scss'
        ],
        tasks: ['compass']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-compass');

  grunt.registerTask('watchcss',  ['watch:css']);
  grunt.registerTask('sasser',    ['compass']);
};