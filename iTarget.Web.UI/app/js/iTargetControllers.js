// -----------------------------------------------
// CategoryController 
// -----------------------------------------------
(function () {
    'use strict';

    angular
        .module('iTarget')
        .controller('CategoryController', CategoryController);


    CategoryController.$inject = ['$rootScope', 'CONST', '$state', '$window', 'categorydataservice'];

    function CategoryController($rootScope, CONST, $state, $window, categorydataservice) {

        var vm = this;

        activate();

        function activate() {

            vm.getAll = getAll;
            vm.create = create;
            vm.update = update;
            vm.initModel = initModel;
            vm.remove = remove;

            vm.model = {
                Title: '',
                Icon: 'icon-user'
            };

        }

        function getAll() {

            vm.model = [];

            categorydataservice.getAll()
                .then(function (data) {
                    vm.model = data;
                });

        }

        function create() {

            categorydataservice.create(vm.model)
                .then(function (data) {

                    vm.model = data;

                    var newCategory = {
                        text: vm.model.Title,
                        icon: vm.model.Icon,
                        heading: false,
                        sref: 'iTarget.category-update',
                        params: { id: vm.model.id }
                    };

                    $rootScope.menuItems.splice($rootScope.menuItems.length, 0, newCategory);

                    $state.transitionTo(CONST.DEFAULT_STATE);

                });


        }

        function update() {

            categorydataservice.update(vm.model)
               .then(function (data) {

                   vm.model = data;

                   angular.forEach($rootScope.menuItems, function (value, key) {

                       if (value.isCategory == true && value.params.id == vm.model.id) {
                           value.text = vm.model.Title;
                           value.icon = vm.model.Icon;
                       }

                   });

                   $window.history.back();

               });

        }

        function initModel() {

            vm.model.id = '';

            if ($state.params != null && $state.params.id != null && $state.params.id != '') {

                vm.model.id = $state.params.id;

                categorydataservice.getById(vm.model.id)
                    .then(function (data) {

                        vm.model = data;
                    });

            }

        }

        function remove() {

            categorydataservice.update(vm.model)
              .then(function (data) {

                  vm.model = data;

                  angular.forEach($rootScope.menuItems, function (value, key) {

                      if (value.isCategory == true && value.params.id == vm.model.id) {
                          $rootScope.menuItems.splice(key, 1);
                      }

                  });

                  $state.transitionTo(CONST.DEFAULT_STATE);

              });

        }

    }

})();



// -----------------------------------------------
// TargetController 
// -----------------------------------------------
(function () {
    'use strict';

    angular
        .module('iTarget')
        .controller('TargetController', TargetController);


    TargetController.$inject = ['$rootScope', '$http', 'CONST', '$state', '$window', 'categoryService', 'targetdataservice'];

    function TargetController($rootScope, $http, CONST, $state, $window, categoryService, targetdataservice) {

        var vm = this;

        activate();

        function activate() {

            vm.create = create;
            vm.update = update;
            vm.initModel = initModel;
            vm.remove = remove;
            vm.initCategoryView = initCategoryView;

            vm.model = {
                Title: '',
                CategoryId: $state.params.categoryid,
                Style: 'danger',
                Files: []
            };

            vm.categories = categoryService.getCategories();

        }

        function initCategoryView() {

            vm.model = [];

            if ($state.params != null && $state.params.id != null && $state.params.id != '') {

                var categoryId = $state.params.id;

                targetdataservice.getByCategory(categoryId)
                    .then(function (data) {
                        vm.model = data;
                    });
            }
        }

        function create() {

            targetdataservice.create(vm.model)
                .then(function (data) {
                    vm.model = data;
                    $window.history.back();
                });


        }

        function update() {

            targetdataservice.update(vm.model)
               .then(function (data) {
                   vm.model = data;
                   $window.history.back();
               });

        }

        function initModel() {

            vm.model.id = '';
            if ($state.params != null && $state.params.id != null && $state.params.id != '') {
                vm.model.id = $state.params.id;
                targetdataservice.getById(vm.model.id)
                    .then(function (data) {
                        vm.model = data;
                    });
            }

        }

        function remove() {

            //targetdataservice.remove(vm.model)
            //  .then(function (data) {
            //      vm.model = data;
            //      $state.transitionTo(CONST.DEFAULT_STATE);
            //  });

        }

    }

})();


// -----------------------------------------------
// ActivityController 
// -----------------------------------------------
(function () {
    'use strict';

    angular
        .module('iTarget')
        .controller('ActivityController', ActivityController);


    ActivityController.$inject = ['$rootScope', '$http', 'CONST', '$state', '$window', 'activitydataservice'];

    function ActivityController($rootScope, $http, CONST, $state, $window, activitydataservice) {

        var vm = this;

        activate();

        function activate() {

            vm.create = create;
            vm.update = update;
            vm.initModel = initModel;
            vm.initTargetView = initTargetView;
            vm.remove = remove;

            vm.model = {
                Description: '',
                TargetId: $state.params.targetid,
                Files: [],
                Date: new Date()
            };


        }

        function create() {

            activitydataservice.create(vm.model)
                .then(function (data) {
                    vm.model = data;
                    $window.history.back();
                });


        }

        function update() {

            activitydataservice.update(vm.model)
               .then(function (data) {
                   vm.model = data;
                   $window.history.back();
               });

        }

        function initModel() {

            vm.model.id = '';
            if ($state.params != null && $state.params.id != null && $state.params.id != '') {
                vm.model.id = $state.params.id;
                activitydataservice.getById(vm.model.id)
                    .then(function (data) {
                        vm.model = data;
                        vm.model.Start = new Date(data.Start);
                        vm.model.End = new Date(data.End);
                    });
            }

        }

        function initTargetView() {

            vm.model = [];

            if ($state.params != null && $state.params.id != null && $state.params.id != '') {

                var targetId = $state.params.id;

                activitydataservice.getByTarget(targetId)
                    .then(function (data) {
                        vm.model = data;
                    });
            }
        }

        function remove() {

            //activitydataservice.remove(vm.model)
            //  .then(function (data) {
            //      vm.model = data;
            //      $state.transitionTo(CONST.DEFAULT_STATE);
            //  });

        }

    }

})();