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
        src: ['src/base.js','src/endpoints/endpoints.js', 'src/core.js',
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
    clean: ['build', 'dist']
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');


  grunt.registerTask('ensure_folders', function () {
    var folders = ['./dist'];
    folders.forEach(function (folder) {
      grunt.file.mkdir(folder);
    });
  });


  grunt.registerTask('dist', ['clean', 'ensure_folders', 'jshint', 'concat', 'uglify']);


};