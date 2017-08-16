'use strict'

const ngrok = require('ngrok')
const mozjpeg = require('imagemin-mozjpeg')

module.exports = function (grunt) {

  grunt.initConfig({
    clean: {
      all: 'dist',
      html: [ 'dist/index.html', 'dist/**/*.html' ]
    },

    copy: {
      everything: {
        files: [
          { src: 'index.html', dest: 'dist', expand: true },
          { cwd: 'src', src: '**', dest: 'dist', expand: true }
        ]
      },
      html: {
        files: [
          { src: 'index.html', dest: 'dist', expand: true },
          { cwd: 'src', src: '**/*.html', dest: 'dist', expand: true }
        ]
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
      rootIndexHTMLRelativeResourceLocation: {
        files: {
          'dist/index.html': 'dist/index.html'
        },
        options: {
          replacements: [
            {
              pattern: /<img .*?\s?src="src\/(.*)/igm,
              replacement: (matched) => matched.replace('src="src/', 'src="')
            }, {
              pattern: /<a .*?\s?href="src\/(.*)/igm,
              replacement: (matched) => matched.replace('href="src/', 'href="')
            }
          ]
        }
      }
    },

    // TODO: [Linesh][8/16/17] Any other solutions regarding the usemin task?
    usemin: {
      html: [
        'dist/index.html',
        'dist/**/*.html'
      ],
      options: {
        dest: 'dist'
      }
    },

    critical: {
      options: {
        base: './',
        minify: true
      },
      index: {
        css: [ 'dist/index/css/main.min.css' ],
        src: [ 'dist/index.html', 'dist/index/*.html' ],
        dest: '' // which indicates to override origin files
      },
      pizza: {
        css: [ 'dist/pizza/css/main.min.css' ],
        src: 'dist/pizza/*.html',
        dest: ''
      }
    },

    htmlmin: {
      target: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          minifyJS: true
        },
        files: [
          { cwd: 'dist', src: [ 'index.html', '**/*.html' ], dest: 'dist', expand: true }
        ]
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
      html: {
        files: [ 'index.html', 'src/**/*.html' ],
        tasks: [ 'clean:html', 'copy:html', 'string-replace', 'usemin', 'critical', 'htmlmin' ]
      },
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

  function psiNgrok() {
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
  }

  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-critical');
  grunt.loadNpmTasks('grunt-imagemagick');
  grunt.registerTask('psi-ngrok', '', psiNgrok)

  grunt.registerTask('default', [ 'build' ])
  grunt.registerTask('build', [
    'clean:all',
    'copy:everything',
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
  grunt.registerTask('build:html', [
    'build', 'watch:html'
  ])
  grunt.registerTask('psi', [ 'build', 'psi-ngrok' ])
  grunt.registerTask('build:watch', [ 'build', 'watch:build' ])
  grunt.registerTask('psi:watch', [ 'psi', 'watch:psi' ])
}