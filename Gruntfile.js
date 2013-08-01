/*global module: true */
module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['gruntfile.js', 'src/*.js'],
      options: grunt.file.readJSON('.jshintrc')
    },
    concat: {
      dist: {
        src: ['src/base.js','build/endpoints.js', 'src/core.js',
              'src/add.js'],
        dest: 'dist/appnet.js'
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/appnet.min.js': ['dist/appnet.js']
        }
      }
    },
    assemble: {
      readme: {
        options: {
          data: 'hbs/endpoints.json',
          ext: '',
          flatten: true
        },
        src: 'hbs/README.md.hbs',
        dest: './'
      },
      dist: {
        options: {
          data: '',
          partials: ['hbs/endpoints.json'],
          ext: '',
          flatten: true
        },
        src: 'hbs/endpoints.js.hbs',
        dest: 'build/'
      }
    },
    clean: ['build']
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('assemble');

  grunt.registerTask('ensure_folders', function () {
    var folders = ['./dist', './build'];
    folders.forEach(function (folder) {
      grunt.file.mkdir(folder);
    });
  });


  grunt.registerTask('dist', ['ensure_folders', /*'jshint',*/ 'assemble', 'concat', 'uglify']);
  grunt.registerTask('readme', ['ensure_folders', 'assemble']);

};