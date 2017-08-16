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
      rootIndexHTML: {
        files: [ {
          expand: true,
          src: [ 'index.html' ],
          dest: 'dist'
        } ]
      }
    },

    concat: {
      options: {
        removeComments: true,
        stripBanners: {
          block: true,
          line: true
        }
      },
      // TODO: [Linesh][8/16/17] can we use wildcards here to remove further redundancy?
      // https://gruntjs.com/configuring-tasks
      css: {
        files: {
          'dist/index/css/main.css': ['dist/index/css/main/*.css'],
          'dist/index/css/print.css': ['dist/index/css/print/*.css'],
          'dist/pizza/css/main.css': ['dist/pizza/css/main/*.css'],
        }
      },
      js: {
        files: {
          'dist/pizza/js/bundle.js': ['dist/pizza/js/bundle/*.js'],
          'dist/index/js/vendor.js': ['dist/index/js/vendor/*.js']
        }
      }
    },

    cssmin: {
      options: {
        report: 'gzip'
      },
      allComponents: {
        files: [
          { cwd: 'dist', src: '**/css/*.css', dest: 'dist', ext: '.min.css', expand: true }
        ]
      }
    },

    uglify: {
      options: {
        preserveComments: false,
        sourceMap: true
      },
      target: {
        files: [
          { cwd: 'dist', src: '**/vendor.js', dest: 'dist', expand: true },
          { cwd: 'dist', src: '**/bundle.js', dest: 'dist', expand: true }
        ]
      }
    },

    imagemin: {
      all: {
        options: {
          use: [
            mozjpeg({ quality: 60 })
          ]
        },
        files: [
          { cwd: 'dist/', src: '**/images/*.{png,jpg}', dest: 'dist', expand: true }
        ]
      }
    },

    'imagemagick-resize': {
      // TODO: [Linesh][8/16/17] extract 'dist', 'dist/pizza' component path to constants
      pizzeria: {
        from: 'dist/pizza/images/',
        to: 'dist/pizza/images/',
        files: 'pizzeria.jpg',
        props: {
          width: 360,
          height: 270
        }
      },
      pizzeriaPreview: {
        from: 'dist/pizza/images/',
        to: 'dist/pizza/images/',
        files: 'pizzeria-preview.jpg',
        props: {
          width: 100
        }
      }
    },

    'string-replace': {
      prod: {
        files: [ {
          expand: true,
          cwd: 'dist',
          src: [ 'index.html', 'index/*.html' ],
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
        src: 'dist/index/project-2048.html',
        dest: 'dist/index/project-2048.html'
      },
      projectMobile: {
        css: [ 'dist/index/css/main.min.css' ],
        src: 'dist/index/project-mobile.html',
        dest: 'dist/index/project-mobile.html',
      },
      projectWebPerformance: {
        css: [ 'dist/index/css/main.min.css' ],
        src: 'dist/index/project-webperf.html',
        dest: 'dist/index/project-webperf.html',
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
          src: [ '*.html', 'index/*.html', 'pizza/*.html' ],
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
        files: [ 'src/**', 'index.html' ],
        tasks: [ 'build' ]
      },
      psi: {
        files: [ 'src/**', 'index.html' ],
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
  grunt.loadNpmTasks('grunt-imagemagick');

  grunt.registerTask('default', [ 'build' ])
  grunt.registerTask('build', [
    'clean',
    'copy',
    'concat',
    'cssmin',
    'uglify',
    'imagemin',
    'imagemagick-resize',
    'string-replace',
    'usemin',
    'critical',
    'htmlmin'
  ])
  grunt.registerTask('psi', [ 'build', 'psi-ngrok' ])
  grunt.registerTask('build:watch', [ 'build', 'watch:build' ])
  grunt.registerTask('psi:watch', [ 'psi', 'watch:psi' ])
}