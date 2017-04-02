'use strict'

let ngrok = require('ngrok')
let mozjpeg = require('imagemin-mozjpeg')

module.exports = function (grunt) {

   grunt.initConfig({
      imagemin: {
         dynamic: {
            options: {
               use: [mozjpeg()]
            },
            files: [{
               expand: true,
               src: ['img/*.{png,jpg}', 'views/images/*.{png,jpg}'],
               dest: 'dist/'
            }]
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
   grunt.registerTask('build', ['imagemin', 'htmlmin'])
   grunt.registerTask('psi', ['build', 'psi-ngrok'])
}