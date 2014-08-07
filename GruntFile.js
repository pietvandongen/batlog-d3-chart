module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bower: {
            install: {}
        },

        less: {
            build: {
                options: {
                    cleancss: true
                },
                files: {
                    'build/css/main.min.css': 'src/less/main.less'
                }
            }
        },

        uglify: {
            build: {
                files: {
                    'build/javascript/main.min.js': [
                        'lib/d3/d3.js',
                        'src/javascript/settings.js',
                        'src/javascript/main.js'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', [
        'bower:install',
        'less:build',
        'uglify'
    ]);

    grunt.registerTask('test', [
        'bower:install',
        'less:build',
        'uglify'
    ]);
};