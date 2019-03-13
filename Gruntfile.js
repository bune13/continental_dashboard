const sass = require('node-sass');

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            options: {
                livereload: true
            },
            sass: {
                files: ['src/assets/css/*.css', 'src/assets/scss/*.scss'],
                tasks: ['sass']
            },
            html: {
                files: ['src/index.html']
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: './',
                flatten: true,
                src: ['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/chart.js/src/chart.js', 'node_modules/chart.js/dist/Chart.bundle.js'],
                dest: 'src/assets/js',
            },
            css: {
                expand: true,
                cwd: './',
                flatten: true,
                src: ['node_modules/bootstrap/dist/css/bootstrap.min.css'],
                dest: 'src/assets/css',
            },
        },
        sass: {
            options: {
                implementation: sass,
                sourceMap: true
            },
            dev: {
                files: {
                    "src/assets/css/styles.css": "src/assets/scss/style.scss"
                }
            }
        }
    });

    // ------------- grunt.loadNpmTasks('');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');

    // ------------- Task Registration
    grunt.registerTask('default', ['copy', 'sass', 'watch']);

}