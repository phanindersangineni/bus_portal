module.exports = function(grunt) {
    //grunt wrapper function 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ngAnnotate: {
    options: {
        singleQuotes: true
    },
    app: {
        files: {
             './public/min-safe/app/app.js': ['./public/app/**/*.js']
        }
    }
},
concat: {
    js: { //target
        src: ['./public/min-safe/app/app.js'],
        dest: './public/min/app/app.js'
    }
},
uglify: {
    js: { //target
        src: ['./public/min/app/app.js'],
        dest: './public/min/app/app.js'
    }
}
          //grunt task configuration will go here     
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate'); 

    grunt.registerTask('default', ['ngAnnotate', 'concat', 'uglify']);
}