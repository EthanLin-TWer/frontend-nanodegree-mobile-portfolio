'use strict'

const ngrok = require('ngrok')
const mozjpeg = require('imagemin-mozjpeg')

module.exports = function (grunt) {

  grunt.initConfig({
    clean: {
      all: 'dist'
    },

    copy: {

      everythingFromSrcToDist: {
        files: [ {
          expand: true,
          cwd: 'src',
          src: '**',
          dest: 'dist'
        } ]
      },
      htmlInRootDirectory: {
        files: [ {
          expand: true,
          src: [ '*.html' ],
          dest: 'dist'
        } ]
      }
    },

    concat: {
      options: {
        removeComments: true,
        stripBanners: true
      },
      cssIndexMainStyles: {
        src: [ 'dist/index/css/main/*.css' ],
        dest: 'dist/index/css/main.css'
      },
      cssIndexPrintStyles: {
        src: [ 'dist/index/css/print/*.css' ],
        dest: 'dist/index/css/print.css'
      },
      cssPizzaStyles: {
        src: [ 'dist/pizza/css/main/*.css'],
        dest: 'dist/pizza/css/main.css'
      },
      jsIndexVendor: {
        src: [ 'dist/index/js/vendor/*.js' ],
        dest: 'dist/index/js/vendor.js'
      },
      jsPizzaBundle: {
        src: [ 'dist/pizza/js/bundle/*.js' ],
        dest: 'dist/pizza/js/bundle.js'
      }
    },

    cssmin: {
      options: {
        report: 'min'
      },
      target: {
        files: [ {
          expand: true,
          cwd: 'dist/index/css',
          src: '*.css',
          dest: 'dist/index/css',
          ext: '.min.css'
        }, {
          expand: true,
          cwd: 'dist/pizza/css',
          src: 'main.css',
          dest: 'dist/pizza/css',
          ext: '.min.css'
        } ]
      }
    },

    uglify: {
      options: {
        preserveComments: false
      },
      target: {
        files: [ {
          expand: true,
          cwd: 'dist',
          src: '**/vendor.js',
          dest: 'dist'
        }, {
          expand: true,
          cwd: 'dist',
          src: '**/bundle.js',
          dest: 'dist'
        } ]
      }
    },

    imagemin: {
      dynamic: {
        options: {
          use: [ mozjpeg({ quality: 60 }) ]
        },
        files: [ {
          expand: true,
          cwd: 'dist/',
          src: [
            'index/img/*.{png,jpg}',
            'pizza/images/*.{png,jpg}'
          ],
          dest: 'dist'
        } ]
      }
    },

    'string-replace': {
      prod: {
        files: [ {
          expand: true,
          src: [ '*.html' ],
          dest: 'dist'
        } ],
        options: {
          replacements: [ {
            pattern: /<img .*?\s?src="src\/(.*)/igm,
            replacement: (match) => {
              return match.replace('src="src/', 'src="')
            }
          }, {
            pattern: /<a .*?\s?href="src\/(.*)/igm,
            replacement: (match) => {
              return match.replace('href="src/', 'href="')
            }
          } ]
        }
      }
    },

    usemin: {
      html: [ 'dist/*.html', 'dist/**/*.html' ],
      options: {
        dest: 'dist'
      }
    },

    critical: {
      // critical does not support multiple src files right now(and probably forever)
      // Drawback here is that a section should be added each time a html is added, not SRP
      // See:
      // https://github.com/addyosmani/critical/issues/38
      // https://github.com/addyosmani/critical/issues/111
      // https://github.com/addyosmani/critical/issues/205
      options: {
        base: './',
        minify: true
      },
      index: {
        css: [ 'dist/index/css/main.min.css' ],
        src: 'dist/index.html',
        dest: 'dist/index.html'
      },
      project2048: {
        css: [ 'dist/index/css/main.min.css' ],
        src: 'dist/project-2048.html',
        dest: 'dist/project-2048.html'
      },
      projectMobile: {
        css: [ 'dist/index/css/main.min.css' ],
        src: 'dist/project-mobile.html',
        dest: 'dist/project-mobile.html',
      },
      projectWebPerformance: {
        css: [ 'dist/index/css/main.min.css' ],
        src: 'dist/project-webperf.html',
        dest: 'dist/project-webperf.html',
      },
      pizza: {
        css: [ 'dist/pizza/css/main.min.css' ],
        src: 'dist/pizza/pizza.html',
        dest: 'dist/pizza/pizza.html'
      }
    },

    htmlmin: {
      target: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          minifyJS: true
        },
        files: [ {
          expand: true,
          cwd: 'dist',
          src: [ '*.html', 'pizza/*.html' ],
          dest: 'dist'
        } ]
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
    },

    watch: {
      build: {
        files: [ 'src/**', '*.html' ],
        tasks: [ 'build' ]
      },
      psi: {
        files: [ 'src/**', '*.html' ],
        tasks: [ 'build', 'psi-ngrok' ]
      }
    }
  })

  grunt.registerTask('psi-ngrok', '', function () {
    const done = this.async()
    const port = 45096

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
  grunt.loadNpmTasks('grunt-critical');

  grunt.registerTask('default', [ 'build' ])
  grunt.registerTask('build', [
    'clean',
    'copy',
    'concat',
    'cssmin',
    'uglify',
    'imagemin',
    'string-replace',
    'usemin',
    'critical',
    'htmlmin'
  ])
  grunt.registerTask('psi', [ 'build', 'psi-ngrok' ])
  grunt.registerTask('build:watch', [ 'build', 'watch:build' ])
  grunt.registerTask('psi:watch', [ 'psi', 'watch:psi' ])
}