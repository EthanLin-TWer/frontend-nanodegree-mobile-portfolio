'use strict'

let ngrok = require('ngrok')
let mozjpeg = require('imagemin-mozjpeg')

module.exports = function (grunt) {

   grunt.initConfig({
      clean: {
         all: 'dist'
      },

      copy: {
         html: {
            files: [{
               expand: true,
               src: ['*.html'],
               dest: 'dist'
            }, {
               expand: true,
               cwd: 'src',
               src: 'pizza/*.html',
               dest: 'dist'
            }]
         },
         css: {
            files: [{
               expand: true,
               cwd: 'src',
               src: ['index/css/*.css'],
               dest: 'dist'
            }]
         },
         js: {
            files: [{
               expand: true,
               cwd: 'src',
               src: ['index/js/*.js', 'pizza/js/*.js'],
               dest: 'dist'
            }]
         },
         images: {
            files: [{
               expand: true,
               cwd: 'src',
               src: '**/*.{png,jpg,jpeg}',
               dest: 'dist'
            }]
         }
      },

      concat: {
         options: {
            removeComments: true,
            stripBanners: true
         },
         css: {
            src: ['dist/pizza/css/*.css'],
            dest: 'dist/pizza/css/main.css'
         }
      },

      cssmin: {
         options: {
            report: 'min'
         },
         target: {
            files: [{
               expand: true,
               cwd: 'dist/index/css',
               src: '*.css',
               dest: 'dist/index/css',
               ext: '.min.css'
            }, {
               expand: true,
               cwd: 'dist/pizza/css',
               src: '*.css',
               dest: 'dist/pizza/css',
               ext: '.min.css'
            }]
         }
      },

      uglify: {
         options: {
            preserveComments: false
         },
         target: {
            files: [{
               expand: true,
               cwd: 'dist',
               src: '**/*.js',
               dest: 'dist'
            }]
         }
      },

      imagemin: {
         dynamic: {
            options: {
               use: [mozjpeg({ quality: 60 })]
            },
            files: [{
               expand: true,
               cwd: 'dist/',
               src: [
                  'index/img/*.{png,jpg}',
                  'pizza/images/*.{png,jpg}'
               ],
               dest: 'dist'
            }]
         }
      },

      'string-replace': {
         prod: {
            files: [{
               expand: true,
               src: ['*.html'],
               dest: 'dist'
            }],
            options: {
               replacements: [{
                  pattern: /<img .*?\s?src="src\/(.*)/igm,
                  replacement: (match) => {
                     return match.replace('src="src/', 'src="')
                  }
               }, {
                  pattern: /<a .*?\s?href="src\/(.*)/igm,
                  replacement: (match) => {
                     return match.replace('href="src/', 'href="')
                  }
               }]
            }
         }
      },

      usemin: {
         html: ['dist/*.html', 'dist/**/*.html'],
         options: {
            dest: 'dist'
         }
      },

      htmlmin: {
         target: {
            options: {
               removeComments: true,
               collapseWhitespace: true
            },
            files: [{
               expand: true,
               cwd: 'dist',
               src: ['*.html', 'pizza/*.html'],
               dest: 'dist'
            }]
         }
      },

      pagespeed: {
         options: {
            nokey: true,
            locale: 'en_GB',
            threshold: 90
         },
         local: {
            options: {
               strategy: 'desktop'
            }
         },
         mobile: {
            options: {
               strategy: 'mobile'
            }
         }
      }
   })

   grunt.registerTask('psi-ngrok', '', function () {
      const done = this.async()
      const port = 8080

      ngrok.connect(port, (err, url) => {
         if (err !== null) {
            grunt.fail.fatal(err)
            return done()
         }

         grunt.config.set('pagespeed.options.url', url)
         grunt.task.run('pagespeed')
         done()
      })
   })

   require('load-grunt-tasks')(grunt);
   grunt.registerTask('default', ['build'])
   grunt.registerTask('build', ['clean', 'copy', 'concat', 'cssmin', 'uglify', 'imagemin', 'string-replace', 'usemin', 'htmlmin'])
   grunt.registerTask('psi', ['build', 'psi-ngrok'])
}