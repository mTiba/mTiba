//is used to configure or define tasks and load Grunt plugins
module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      styles: {
        files: ['assets/styles/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true,
          livereload: true
        }
      },
      html: {
        files: ['index.html', 'app/**/*.html'],
        options: {
          livereload: true
        }
      }
    },
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2,
          paths: ['assets/styles']
        },
        files: {
          "assets/styles/main.css": "assets/styles/main.less" // destination file and source file
        }
      },
/*      production: {
        options: {
          paths: ['assets/styles'],
          plugins: [
            new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
            new (require('less-plugin-clean-css'))(cleanCssOptions)
          ],
          modifyVars: {
            imgPath: '"http://mycdn.com/path/to/images"',
            bgColor: 'red'
          }
        },
        files: {
          'path/to/result.css': 'path/to/source.less'
        }
      }*/
    },
    bowerInstall: {
   
      target: {
     
        // Point to the files that should be updated when 
        // you run `grunt bower-install` 
        src: [
          'index.html',   // .html support... 
          // 'app/assets/styles/main.css'  // .css support... 
        ],
     
        // Optional: 
        // --------- 
        cwd: '',
        dependencies: true,
        devDependencies: false,
        exclude: [],
        fileTypes: {},
        ignorePath: '',
        overrides: {}
      }
    },
    connect: {
      server: {
        options: {
          port: 9000,
          hostname: '*',
          livereload: true//,
          //base: '_site/'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-bower-install');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['less', 'watch']);
  grunt.registerTask('serve', [ 'connect:server', 'less', 'watch' ]);
};

