module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bower: {
            install: {}
        },

        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            build: {
                options: {
                    import: 2
                },
                src: [
                    'build/css/main.css'
                ]
            }
        },

        jshint: {
            build: [
                'src/javascript/settings.js',
                'src/javascript/main.js'
            ]
        },

        less: {
            build: {
                options: {
                    cleancss: false
                },
                files: {
                    'build/css/main.css': 'src/less/main.less'
                }
            },
            buildMinified: {
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
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', [
        'bower:install',
        'jshint:build',
        'uglify',
        'less:build',
        'csslint',
        'less:buildMinified'
    ]);
};