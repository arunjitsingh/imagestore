module.exports = function(grunt) {
  var banner = '/** <%= pkg.name %> - v<%= pkg.version %> - ' +
               '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ';'
      },
      build: {
        src: ['js/directives/dropzone.js', 'js/main.js'],
        dest: 'build/app-bundle.js'
      }
    },

    ngmin: {
      build: {
        src: 'build/app-bundle.js',
        dest: 'build/app-annotated.js'
      }
    },

    uglify: {
      options: {
        banner: banner
      },
      build: {
        src: 'build/app-annotated.js',
        dest: 'build/app-min.js'
      }
    },

    karma: {
      options: {
        browsers: ['Chrome'],
        port: 6001,
        runnerPort: 6002
      },
      unit: {
        configFile: 'unittest.conf.js',
        autoWatch: false,
        singleRun: true,

        coverage: {
          reporters: 'coverage'
        }
      },
      live: {
        configFile: 'unittest.conf.js',
        background: true
      }
    },

    watch: {
      karma: {
        files: ['js/**/*.js', 'jstests/**/*.js'],
        tasks: ['karma:live:run']
      }
    },

    clean: ['build', 'coverage']
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['concat', 'ngmin', 'uglify']);
  grunt.registerTask('test', ['karma:unit']);
  grunt.registerTask('coverage', ['karma:unit:coverage']);
  grunt.registerTask('livetest', ['karma:live', 'watch']);
};
