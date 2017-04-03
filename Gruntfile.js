'use strict'

let ngrok = require('ngrok')
let mozjpeg = require('imagemin-mozjpeg')

module.exports = function (grunt) {

   grunt.initConfig({
      config: {
      },

      clean: {
         all: 'dist/'
      },

      copy: {
         html: {
            files: [{
               expand: true,
               src: ['*.html'],
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
               src: ['index/js/*.js'],
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
            src: ['pizza/css/*.css'],
            dest: 'dist/pizza/css/main.css'
         }
      },

      cssmin: {
         prod: {
            options: {
               report: 'gzip'
            },
            files: [{
               expand: true,
               cwd: 'dist/pizza/css',
               src: 'main.css',
               dest: 'dist/pizza/css'
            }, {
               expand: true,
               cwd: 'dist/index/css',
               src: '*.css',
               dest: 'dist/index/css'
            }]
         }
      },

      imagemin: {
         dynamic: {
            options: {
               use: [mozjpeg()]
            },
            files: [{
               expand: true,
               cwd: 'src',
               src: ['index/img/*.{png,jpg}', 'pizza/images/*.{png,jpg}'],
               dest: 'dist/'
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
                  replacement: (match, path) => {
                     return match.replace('src="src/', 'src="')
                  }
               }]
            }
         }
      },

      usemin: {
         html: 'dist/*.html',
         options: {
            dest: 'dist'
         }
      },

      htmlmin: {
         dist: {
            options: {
               removeComments: true,
               collapseWhitespace: true
            },
            files: {
               'dist/index.html': 'index.html'
            }
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
   grunt.registerTask('build', ['clean', 'copy', 'concat', 'cssmin', 'imagemin', 'string-replace', 'usemin'])
   grunt.registerTask('psi', ['build', 'psi-ngrok'])
}