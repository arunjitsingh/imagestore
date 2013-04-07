basePath = '';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'components/angular/angular.js',
  'components/angular-mocks/angular-mocks.js',
  'js/**/*.js',
  'jstests/**/*.js'
];

exclude = [
  'jstests/**/*e2e*'
];

preprocessors = {
  'js/**/*.js': 'coverage'
};

reporters = ['dots', 'coverage'];

browsers = ['Chrome'];

port = 6001;
runnerPort = 6002;

colors = true;

autoWatch = false;
singleRun = false;
