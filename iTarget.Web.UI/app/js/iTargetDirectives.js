
// -----------------------------------------------
// pageHeader 
// -----------------------------------------------
(function () {
    'use strict';

    angular
        .module('iTarget')
        .directive('pageHeader', function () {
            return {
                restrict: 'E',
                transclude: true,
                replace: true,
                template: '<div class="content-heading" ng-transclude></div>'
            };
        });

})();


// -----------------------------------------------
// pageRow 
// -----------------------------------------------
(function () {
    'use strict';

    angular
        .module('iTarget')
        .directive('pageRow', function () {
            return {
                restrict: 'E',
                transclude: true,
                replace: true,
                template: '<div class="row" ng-transclude></div>'
            };
        });

})();

// -----------------------------------------------
// pageCol 
// -----------------------------------------------
(function () {
    'use strict';

    angular
        .module('iTarget')
        .directive('pageCol', function () {
            return {
                restrict: 'E',
                transclude: true,
                replace: true,
                template: '<div class="col-xs-12" ng-transclude></div>'
            };
        });

})();

// -----------------------------------------------
// panel 
// -----------------------------------------------
(function () {
    'use strict';

    angular
        .module('iTarget')
        .directive('panel', function () {
            return {
                restrict: 'E',
                transclude: true,
                replace: true,
                template: '<div class="panel panel-default" ng-transclude></div>'
            };
        });

})();


// -----------------------------------------------
// panelHeading 
// -----------------------------------------------
(function () {
    'use strict';

    angular
        .module('iTarget')
        .directive('panelHeading', function () {
            return {
                restrict: 'E',
                transclude: true,
                replace: true,
                template: '<div class="panel-heading" ng-transclude></div>'
            };
        });

})();


// -----------------------------------------------
// panelBody 
// -----------------------------------------------
(function () {
    'use strict';

    angular
        .module('iTarget')
        .directive('panelBody', function () {
            return {
                restrict: 'E',
                transclude: true,
                replace: true,
                template: '<div class="panel-body" ng-transclude></div>'
            };
        });

})();


// -----------------------------------------------
// formHorizontal
// -----------------------------------------------
(function () {
    'use strict';

    angular
        .module('iTarget')
        .directive('formHorizontal', function () {
            return {
                restrict: 'E',
                transclude: true,
                replace: true,
                scope: {
                    onSubmit: '&'
                },
                template: '<form ng-transclude class="form-horizontal" ng-submit="onSubmit()"></form>',
                link: function (scope, elem, attr, ctrl) {
                }
            };
        });

})();


// -----------------------------------------------
// formTextbox 
// -----------------------------------------------
(function () {
    'use strict';

    angular
        .module('iTarget')
        .directive('formTextbox', function () {
            return {
                restrict: 'E',
                replace: true,
                require: 'ngModel',
                scope: {
                    ngModel: "=ngModel"
                },
                template: '<fieldset><div class="form-group"><label class="col-sm-2 control-label">{{label}}</label><div class="col-sm-10"><input type="text" placeholder="{{placeholder}}" class="form-control" ng-model="ngModel" /></div></div></fieldset>',
                link: function (scope, elem, attr, ctrl) {
                    scope.label = attr.label;
                    scope.placeholder = attr.placeholder;
                }
            };
        });

})();

// -----------------------------------------------
// formTextarea 
// -----------------------------------------------
(function () {
    'use strict';

    angular
        .module('iTarget')
        .directive('formTextarea', function () {
            return {
                restrict: 'E',
                replace: true,
                require: 'ngModel',
                scope: {
                    ngModel: "=ngModel"
                },
                template: '<fieldset><div class="form-group"><label class="col-sm-2 control-label">{{label}}</label><div class="col-sm-10"><textarea placeholder="{{placeholder}}" class="form-control" ng-model="ngModel" /></div></div></fieldset>',
                link: function (scope, elem, attr, ctrl) {
                    scope.label = attr.label;
                    scope.placeholder = attr.placeholder;
                }
            };
        });

})();

// -----------------------------------------------
// formFileUpload
// -----------------------------------------------
(function () {
    'use strict';

    angular
       .module('iTarget')
       .directive('formFileUpload', formFileUpload);

    function formFileUpload(FileUploader) {

        var template = `<fieldset>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">{{label}}</label>
                                <div class="col-sm-10">
                                    <input filestyle="" type="file" data-button-text="Multiple" data-class-button="btn btn-default" data-class-input="form-control inline" nv-file-select="" uploader="uploader" multiple="" class="form-control" />
                                    <div style="" class="progress progress-xs">
                                        <div role="progressbar" ng-style="{ 'width': uploader.progress + '%' }" class="progress-bar"></div>
                                    </div>
                                    <div ng-if="ngModel.length">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th width="70%">Name</th>
                                                    <th>Size</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr ng-repeat="item in ngModel">
                                                    <td>
                                                        <strong>{{ item.Name }}</strong>
                                                    </td>
                                                    <td nowrap="">{{ item.Size/1024/1024|number: 2 }} MB</td>
                                                    <td nowrap="">
                                                        <button type="button" ng-click="removeModel(item)" class="btn btn-danger btn-xs">
                                                            <span class="icon-trash mr"></span>Remove
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <!--<div ng-if="uploader.queue.length">
                                        <table ng-if="uploader.queue.length" class="table">
                                            <thead>
                                                <tr>
                                                    <th width="50%">Name</th>
                                                    <th ng-show="uploader.isHTML5">Size</th>
                                                    <th ng-show="uploader.isHTML5">Progress</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr ng-repeat="item in uploader.queue">
                                                    <td>
                                                        <strong>{{ item.file.name }}</strong>
                                                    </td>
                                                    <td ng-show="uploader.isHTML5" nowrap="">{{ item.file.size/1024/1024|number:2 }} MB</td>
                                                    <td ng-show="uploader.isHTML5">
                                                        <div style="margin-bottom: 0;" class="progress progress-xs">
                                                            <div role="progressbar" ng-style="{ 'width': item.progress + '%' }" class="progress-bar"></div>
                                                        </div>
                                                    </td>
                                                    <td class="text-center">
                                                        <span ng-show="item.isSuccess">
                                                            <em class="fa fa-check fa-fw"></em>
                                                        </span>
                                                        <span ng-show="item.isCancel">
                                                            <em class="fa fa-ban-circle fa-fw"></em>
                                                        </span>
                                                        <span ng-show="item.isError">
                                                            <em class="fa fa-times fa-fw"></em>
                                                        </span>
                                                    </td>
                                                    <td nowrap="">
                                                        <button type="button" ng-click="remove(item)" class="btn btn-danger btn-xs">
                                                            <span class="icon-trash mr"></span>Remove
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>-->
                                </div>
                            </div>
                        </fieldset>`;

        var directive = {
            restrict: 'E',
            replace: true,
            require: 'ngModel',
            scope: {
                ngModel: "=ngModel"
            },
            controller: ['$scope', function ($scope) {

                var uploader = $scope.uploader = new FileUploader({
                    url: '/api/file/upload'
                });

                uploader.filters.push({
                    name: 'customFilter',
                    fn: function (/*item, options*/) {
                        return this.queue.length < 10;
                    }
                });

                uploader.onAfterAddingFile = function (fileItem) {
                    fileItem.upload();
                };

                uploader.onCompleteItem = function (fileItem, response, status, headers) {
                    $scope.ngModel.push(response);
                };

                uploader.onCompleteAll = function () {
                    //console.log($scope.ngModel)
                };

                //$scope.remove = function (item) {
                //    $scope.ngModel.splice($scope.ngModel.indexOf(item), 1);
                //    item.remove();
                //};

                $scope.removeModel = function (item) {
                    $scope.ngModel.splice($scope.ngModel.indexOf(item), 1);
                };

            }],

            template: template,
            link: function (scope, elem, attr, ctrl) {
                scope.label = attr.label;
            }
        };

        return directive;

    }

})();

// -----------------------------------------------
// formDropdown 
// -----------------------------------------------
(function () {
    'use strict';

    angular
        .module('iTarget')
        .directive('formDropdown', function () {
            return {
                restrict: 'E',
                replace: true,
                require: 'ngModel',
                scope: {
                    ngModel: '=ngModel',
                    values: '='
                },
                template: '<fieldset><div class="form-group"><label class="col-sm-2 control-label">{{label}}</label><div class="col-sm-10"><select class="form-control" ng-model="ngModel"><option ng-repeat="option in values" value="{{option.id}}">{{option.Title}}</option></select></div></div></fieldset>',
                link: function (scope, elem, attr, ctrl) {
                    scope.label = attr.label;
                }
            };
        });

})();

// -----------------------------------------------
// formActionPanel
// -----------------------------------------------
(function () {
    'use strict';

    angular
        .module('iTarget')
        .directive('formActionPanel', function () {
            return {
                restrict: 'E',
                transclude: true,
                replace: true,
                scope: {
                },
                template: '<fieldset><div class="form-group"><div class="col-sm-10 col-sm-offset-2" ng-transclude></div></div></fieldset>',
                link: function (scope, elem, attr, ctrl) {
                }
            };
        });

})();

// -----------------------------------------------
// formButton 
// -----------------------------------------------
(function () {
    'use strict';

    angular
        .module('iTarget')
        .directive('formButton', ['$window', function ($window) {
            return {
                restrict: 'E',
                transclude: true,
                replace: true,
                scope: {
                    onClick: '&'
                },
                template: '<button type="button" class="{{class}}" ng-click="onClick()">{{label}}</button>',
                link: function (scope, elem, attr, ctrl) {

                    scope.type = attr.action;

                    if (scope.type == 'cancel') {
                        scope.class = 'btn btn-default';
                        scope.label = 'Cancel';
                        scope.onClick = function () {
                            $window.history.back();
                        }
                    }

                    if (scope.type == 'submit') {
                        scope.class = 'btn btn-primary';
                        scope.label = 'Submit';
                    }

                    if (scope.type == 'delete') {
                        scope.class = 'btn btn-danger pull-right';
                        scope.label = 'Delete';
                    }

                }
            };
        }]);

})();

// -----------------------------------------------
// formIconPicker 
// -----------------------------------------------
(function () {
    'use strict';

    angular
        .module('iTarget')
        .directive('formIconPicker', function () {
            return {
                restrict: 'E',
                replace: true,
                require: 'ngModel',
                scope: {
                    ngModel: "="
                },
                template: '<fieldset><div class="form-group"><label class="col-sm-2 control-label">{{label}}</label><div class="col-sm-10"><span ng-repeat="icon in icons"><label class="radio-inline c-radio"><input type="radio" ng-model="$parent.ngModel" value="{{icon.value}}" /><span class="{{icon.value}}"></span>{{icon.name}}</label></span></div></div></fieldset>',
                link: function (scope, elem, attr, ctrl) {

                    scope.icons = [
                        {
                            name: 'User',
                            value: 'icon-user'
                        },
                        {
                            name: 'Family',
                            value: 'icon-people'
                        },
                        {
                            name: 'Education',
                            value: 'icon-graduation'
                        },
                        {
                            name: 'Badge',
                            value: 'icon-badge'
                        },
                        {
                            name: 'Trophy',
                            value: 'icon-trophy'
                        },
                        {
                            name: 'Home',
                            value: 'icon-home'
                        },
                        {
                            name: 'Heart',
                            value: 'icon-heart'
                        },
                        {
                            name: 'Financial',
                            value: 'icon-chart'
                        }
                    ];

                    scope.label = attr.label;


                }
            };
        });

})();

// -----------------------------------------------
// formStylePicker 
// -----------------------------------------------
(function () {
    'use strict';

    angular
        .module('iTarget')
        .directive('formStylePicker', function () {

            var template = `<fieldset>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">{{label}}</label>
                                <div class="col-sm-10">
                                    <ul class="list-inline external-event-color-selector">
                                        <li class="p0" ng-repeat="style in styles">
                                            <div ng-click="pick(style)" ng-class="{selected: (style===ngModel)}" class="circle circle-{{style}} circle-xl"></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </fieldset>`;

            return {
                restrict: 'E',
                replace: true,
                require: 'ngModel',
                scope: {
                    ngModel: '=',
                    customizedStyles: '=styles'
                },
                template: template,
                link: function (scope, elem, attr, ctrl) {

                    scope.label = attr.label;

                    var defaultStyles = [
                        'danger',
                        'primary',
                        'info',
                        'success',
                        'warning',
                        'green',
                        'pink',
                        'inverse',
                        'purple',
                        'yellow'
                    ];


                    scope.styles = scope.customizedStyles || defaultStyles;

                    //scope.$watch('ngModel', function (newVal) {
                    //    if (newVal) {
                    //        scope.ngModel = newVal;
                    //    }
                    //    else {
                    //        scope.ngModel = scope.styles[0];
                    //    };
                    //});

                    scope.pick = function (style) {
                        scope.ngModel = style;
                    };


                }
            };
        });

})();

// -----------------------------------------------
// formDatePicker 
// -----------------------------------------------
(function () {
    'use strict';

    angular
        .module('iTarget')
        .directive('formDatePicker', function () {

            function controller() {

                var vm = this;


                vm.today = function () {
                    vm.dt = new Date();
                };
                vm.today();

                vm.clear = function () {
                    vm.dt = null;
                };

                // Disable weekend selection
                vm.disabled = function (date, mode) {
                    return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
                };

                vm.toggleMin = function () {
                    vm.minDate = vm.minDate ? null : new Date();
                };
                vm.toggleMin();

                vm.open = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    vm.opened = true;
                };

                vm.dateOptions = {
                    formatYear: 'yy',
                    startingDay: 1
                };

                vm.initDate = new Date('2019-10-20');
                vm.formats = ['yyyy/MM/dd', 'dd-MMMM-yyyy', 'dd.MM.yyyy', 'shortDate'];
                vm.format = vm.formats[0];
            };

            var template = `<fieldset>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">{{label}}</label>
                                <div class="col-sm-10">
                                    <p class="input-group">
                                        <input type="text" name="date" required="" uib-datepicker-popup="{{dpick.format}}" ng-model="ngModel" is-open="dpick.opened" min-date="dpick.minDate" max-date="'2019-12-22'" uib-datepicker-options="dpick.dateOptions" date-disabled="dpick.disabled(date, mode)"
                                               close-text="Close" class="form-control" />
                                        <span class="input-group-btn">
                                            <button type="button" ng-click="dpick.open($event)" class="btn btn-default">
                                                <em class="fa fa-calendar"></em>
                                            </button>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </fieldset>`;

            return {
                restrict: 'E',
                replace: true,
                require: 'ngModel',
                scope: {
                    ngModel: '='
                },
                template: template,
                controller: controller,
                controllerAs: 'dpick',
                link: function (scope, elem, attr, ctrl) {
                    scope.label = attr.label;
                }
            };
        });

})();


// -----------------------------------------------
// filestyle 
// -----------------------------------------------
(function () {
    'use strict';

    angular
        .module('iTarget')
        .directive('filestyle', filestyle);

    function filestyle() {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
            var options = element.data();

            // old usage support
            options.classInput = element.data('classinput') || options.classInput;

            element.filestyle(options);
        }
    }

})();