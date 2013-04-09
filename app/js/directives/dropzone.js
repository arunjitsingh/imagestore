/**
 * @fileoverview ...
 *
 * @author arunjitsingh
 */
'use strict';

/**
 * Dropzone directive.
 *
 * @ngInject
 */
var Dropzone = function($parse) {
  return {
    'restrict': 'AE',
    'scope': true,
    'transclude': true,
    'template': '<div ng-transclude></div>',
    'link': function(scope, element, attrs) {
      var dropFn = $parse(attrs['ajDrop']);
      var dragoverClass = attrs['ajDragoverClass']

      element.bind('dragover', function(event) {
        event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
        dragoverClass && element.addClass(dragoverClass);
      });

      element.bind('dragleave mouseleave', function(event) {
        event.stopPropagation();
        event.preventDefault();
        dragoverClass && element.removeClass(dragoverClass);
      });

      element.bind('drop', function(event) {
        event.stopPropagation();
        event.preventDefault();
        dragoverClass && element.removeClass(dragoverClass);
        var files = event.dataTransfer.files;
        scope.$apply(function() {
          $parse(attrs['ngModel']).assign(scope, files);
          dropFn && dropFn(scope);
        });
      });
    }
  };
};
Dropzone['$inject'] = ['$parse'];
