(function () {
    'use strict';

    angular
        .module('iTarget', [
            // request the the entire framework
            //'angle',
            // or just modules
            'app.core',
            'app.routes',
            'app.sidebar',
            //'app.navsearch',
            'app.preloader',
            'app.loadingbar',
            'app.translate',
            'app.settings',
            'app.utils',
            //'iTarget.lazyload'
        ]);
})();

(function () {
    'use strict';

    angular
        .module('iTarget')
        .constant('CONST', {
            API_URL: '/api',
            DEFAULT_STATE: 'iTarget.dashboard',
            LOGIN_STATE: 'iTarget.login',
            RECOVER_STATE: 'iTarget.recover',
            PROFILE_STATE: 'iTarget.userprofile'
        })
    ;
})();

(function () {
    'use strict';

    angular
        .module('app.settings')
        .run(settingsRun);

    settingsRun.$inject = ['$rootScope', '$localStorage'];

    function settingsRun($rootScope, $localStorage) {

        // Global Settings
        // -----------------------------------
        $rootScope.app = {
            name: 'iTarget',
            description: 'Make your road to targets easy!',
            year: ((new Date()).getFullYear()),
            layout: {
                isFixed: true,
                isCollapsed: false,
                isBoxed: false,
                isRTL: false,
                horizontal: false,
                isFloat: false,
                asideHover: false,
                theme: null,
                asideScrollbar: false
            },
            useFullLayout: false,
            hiddenFooter: false,
            offsidebarOpen: false,
            asideToggled: false,
            viewAnimation: 'ng-fadeInUp'
        };

        // Setup the layout mode
        $rootScope.app.layout.horizontal = ($rootScope.$stateParams.layout === 'app-h');

        // Restore layout settings [*** UNCOMMENT TO ENABLE ***]
        // if( angular.isDefined($localStorage.layout) )
        //   $rootScope.app.layout = $localStorage.layout;
        // else
        //   $localStorage.layout = $rootScope.app.layout;
        //
        // $rootScope.$watch('app.layout', function () {
        //   $localStorage.layout = $rootScope.app.layout;
        // }, true);

        // Close submenu when sidebar change from collapsed to normal
        $rootScope.$watch('app.layout.isCollapsed', function (newValue) {
            if (newValue === false)
                $rootScope.$broadcast('closeSidebarMenu');
        });

    }

})();

// -----------------------------------------------
// routes 
// -----------------------------------------------
(function () {
    'use strict';

    angular
        .module('app.routes')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];

    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, helper) {

        $locationProvider.html5Mode(false);

        $urlRouterProvider.otherwise('/dashboard');

        $stateProvider
            .state('iTarget', {
                url: '',
                abstract: true,
                templateUrl: helper.basepath('iTarget.html'),
                resolve: helper.resolveFor('modernizr', 'icons')
            })
            .state('iTarget.dashboard', {
                title: 'Dashboard',
                url: '/dashboard',
                templateUrl: helper.basepath('dashboard.html'),
                resolve: helper.resolveFor('angularFileUpload', 'filestyle')
            })
            .state('iTarget.category-create', {
                title: 'Create Category',
                url: '/category/create',
                templateUrl: helper.basepath('category/category-create.html'),
            })
            .state('iTarget.category-update', {
                title: 'Update Category',
                url: '/category/update/:id',
                templateUrl: helper.basepath('category/category-update.html')
            })
            .state('iTarget.target-list', {
                title: 'Target List',
                url: '/target/list/:id',
                templateUrl: helper.basepath('target/target-list.html')
            })
            .state('iTarget.target-dashboard', {
                title: 'Target Dashboard',
                url: '/target/:id',
                templateUrl: helper.basepath('target/target-dashboard.html'),
                controller: 'TargetController',
                controllerAs: 'target'
            })
            .state('iTarget.target-create', {
                title: 'Add Target',
                url: '/target/create/:categoryid',
                templateUrl: helper.basepath('target/target-create.html'),
                resolve: helper.resolveFor('angularFileUpload', 'filestyle')
            })
            .state('iTarget.target-update', {
                title: 'Update Target',
                url: '/target/update/:id',
                templateUrl: helper.basepath('target/target-update.html'),
                resolve: helper.resolveFor('angularFileUpload', 'filestyle')
            })
            .state('iTarget.activity-create', {
                title: 'Add Activity',
                url: '/activity/create/:targetid',
                templateUrl: helper.basepath('activity/activity-create.html'),
                resolve: helper.resolveFor('angularFileUpload', 'filestyle')
            })
            .state('iTarget.activity-update', {
                title: 'Update Activity',
                url: '/activity/update/:id',
                templateUrl: helper.basepath('activity/activity-update.html'),
                resolve: helper.resolveFor('angularFileUpload', 'filestyle')
            })
        ;

    }

})();

(function () {
    'use strict';

    angular
        .module('iTarget')
        .run(appRun);

    appRun.$inject = ['$rootScope', '$state', '$stateParams', '$window', '$templateCache', 'Colors'];

    function appRun($rootScope, $state, $stateParams, $window, $templateCache, Colors) {

        // Set reference to access them from any scope
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$storage = $window.localStorage;
        $rootScope.$prevState = {};

        // Uncomment this to disable template cache
        /*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            if (typeof(toState) !== 'undefined'){
              $templateCache.remove(toState.templateUrl);
            }
        });*/


        // cancel click event easily
        $rootScope.cancel = function ($event) {
            $event.stopPropagation();
        };

        // Hooks Example
        // ----------------------------------- 

        // Hook not found
        $rootScope.$on('$stateNotFound',
          function (event, unfoundState/*, fromState, fromParams*/) {
              console.log(unfoundState.to); // "lazy.state"
              console.log(unfoundState.toParams); // {a:1, b:2}
              console.log(unfoundState.options); // {inherit:false} + default options
          });
        // Hook error
        $rootScope.$on('$stateChangeError',
          function (event, toState, toParams, fromState, fromParams, error) {
              console.log(error);
          });
        // Hook success
        $rootScope.$on('$stateChangeSuccess',
          function (event, toState, toParams, fromState, fromParams) {
              // display new view from top
              $window.scrollTo(0, 0);
              $rootScope.$prevState = fromState;
          });


    }

})();

(function () {
    'use strict';

    angular
        .module('app.sidebar')
        .service('SidebarLoader', SidebarLoader);

    SidebarLoader.$inject = ['$http', 'CONST'];

    function SidebarLoader($http, CONST) {

        var vm = this;

        vm.getMenu = getMenu;

        function getMenu(onReady, onError) {

            //load default menues
            var menuItems = [
                {
                    text: 'Main Navigation',
                    heading: true
                },
                {
                    text: 'Dashboard',
                    icon: 'icon-speedometer',
                    sref: 'iTarget.dashboard'
                },
                {
                    text: 'Categories',
                    icon: 'icon-folder',
                    heading: true,
                    actionlabel: 'btn btn-default btn-xs',
                    actionalert: 'Create',
                    actionsref: 'iTarget.category-create',
                },
                //{
                //    text: 'Settings',
                //    heading: true

                //}
            ];

            // load categories from server
            // then insert them after the first node of menu (Categories)
            var menuJson = CONST.API_URL + '/category/getall',
                menuURL = menuJson + '?v=' + (new Date().getTime());

            $http.get(menuURL)
                .success(function (categories) {

                    angular.forEach(categories, function (value, key) {

                        var menuItem = {
                            text: value.Title,
                            heading: false,
                            icon: value.Icon,
                            sref: 'iTarget.target-list',
                            params: { id: value.id },
                            alert: value.TargetCount,
                            isCategory: true
                        };

                        //menuItems[2].submenu.push(menuItem);

                        menuItems.splice(key + 3, 0, menuItem);

                    });

                }).error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                });

            onReady(menuItems);

        }
    }
})();

(function () {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$rootScope', '$scope', '$state', 'SidebarLoader', 'Utils'];
    function SidebarController($rootScope, $scope, $state, SidebarLoader, Utils) {

        activate();

        ////////////////

        function activate() {
            var collapseList = [];

            // demo: when switch from collapse to hover, close all items
            $rootScope.$watch('app.layout.asideHover', function (oldVal, newVal) {
                if (newVal === false && oldVal === true) {
                    closeAllBut(-1);
                }
            });


            // Load menu from json file
            // ----------------------------------- 

            SidebarLoader.getMenu(sidebarReady);

            function sidebarReady(items) {
                $rootScope.menuItems = items;
            }

            // Handle sidebar and collapse items
            // ----------------------------------

            $scope.getMenuItemPropClasses = function (item) {
                return (item.heading ? 'nav-heading' : '') +
                       (isActive(item) ? ' active' : '');
            };

            $scope.addCollapse = function ($index, item) {
                collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
            };

            $scope.isCollapse = function ($index) {
                return (collapseList[$index]);
            };

            $scope.toggleCollapse = function ($index, isParentItem) {

                // collapsed sidebar doesn't toggle drodopwn
                if (Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover) return true;

                // make sure the item index exists
                if (angular.isDefined(collapseList[$index])) {
                    if (!$scope.lastEventFromChild) {
                        collapseList[$index] = !collapseList[$index];
                        closeAllBut($index);
                    }
                }
                else if (isParentItem) {
                    closeAllBut(-1);
                }

                $scope.lastEventFromChild = isChild($index);

                return true;

            };

            // Controller helpers
            // ----------------------------------- 

            // Check item and children active state
            function isActive(item) {

                if (!item) return;

                if (!item.sref || item.sref === '#') {
                    var foundActive = false;
                    angular.forEach(item.submenu, function (value) {
                        if (isActive(value)) foundActive = true;
                    });
                    return foundActive;
                }
                else
                    return $state.is(item.sref) || $state.includes(item.sref);
            }

            function closeAllBut(index) {
                index += '';
                for (var i in collapseList) {
                    if (index < 0 || index.indexOf(i) < 0)
                        collapseList[i] = true;
                }
            }

            function isChild($index) {
                /*jshint -W018*/
                return (typeof $index === 'string') && !($index.indexOf('-') < 0);
            }

        } // activate
    }

})();

(function () {
    'use strict';

    angular
        .module('app.lazyload')
        .constant('APP_REQUIRES', {
            // jQuery based and standalone scripts
            scripts: {
                'modernizr': ['vendor/modernizr/modernizr.custom.js'],
                'icons': ['vendor/fontawesome/css/font-awesome.min.css',
                                       'vendor/simple-line-icons/css/simple-line-icons.css'],
                'filestyle': ['vendor/bootstrap-filestyle/src/bootstrap-filestyle.js']
            },
            // Angular based script (use the right module name)
            modules: [
                { name: 'angularFileUpload', files: ['vendor/angular-file-upload/dist/angular-file-upload.js'] }
              // {name: 'toaster', files: ['vendor/angularjs-toaster/toaster.js', 'vendor/angularjs-toaster/toaster.css']}
            ]
        })
    ;

})();


// -----------------------------------------------
// filesize filter 
// -----------------------------------------------
(function () {
    'use strict';

    angular
        .module('iTarget')
        .filter('filesize', filesize);

    function filesize() {
        return filter;

        ////////////////
        function filter(size) {

            if (isNaN(size))
                size = 0;

            if (size < 1024)
                return size + ' Bytes';

            size /= 1024;

            if (size < 1024)
                return size.toFixed(2) + ' Kb';

            size /= 1024;

            if (size < 1024)
                return size.toFixed(2) + ' Mb';

            size /= 1024;

            if (size < 1024)
                return size.toFixed(2) + ' Gb';

            size /= 1024;

            return size.toFixed(2) + ' Tb';
        }
    }

})();

// -----------------------------------------------
// unique filter 
// -----------------------------------------------
(function () {
    'use strict';

    angular
        .module('iTarget')
        .filter('uniquedate', uniquedate);

    function uniquedate() {
        return filter;

        ////////////////
        function filter(input, key) {
            //console.log(key)
            var unique = {};
            var uniqueList = [];
            for (var i = 0; i < input.length; i++) {
                var _d = new Date(input[i][key]);
                var _dateOnly = new Date(_d.getFullYear(), _d.getMonth(), _d.getDate());
                console.log(_dateOnly)
                if (typeof unique[input[i][key]] == "undefined") {
                    unique[input[i][key]] = "";
                    uniqueList.push(input[i]);
                }
            }
            return uniqueList;

        }
    }

})();
