// -----------------------------------------------
//  categoryService
// -----------------------------------------------
(function () {
    'use strict';

    angular
        .module('iTarget')
        .service('categoryService', categoryService);

    categoryService.$inject = ['$rootScope', 'categorydataservice'];

    function categoryService($rootScope, categorydataservice) {

        this.getCategories = getCategories;
        $rootScope.categories = [];

        activate()
        
        function activate() {
            categorydataservice.getAll()
                .then(function (data) {
                    $rootScope.categories = data;
                });

        }

        function getCategories() {
            return $rootScope.categories;
        }

    }

})();


// -----------------------------------------------
//  categorydataservice
// -----------------------------------------------
(function () {
    'use strict';

    angular
        .module('iTarget')
        .factory('categorydataservice', categorydataservice);

    categorydataservice.$inject = ['$http', '$log', 'CONST'];

    function categorydataservice($http, $log, CONST) {

        var basePath = CONST.API_URL + '/category';

        return {
            getAll: getAll,
            getById: getById,
            create: create,
            update: update,
            remove: remove
        };

        function getAll() {
            return get(basePath + '/getall');
        }

        function getById(id) {
            return get(basePath + '/getbyid/' + id);
        }

        function create(postData) {
            return post(basePath + '/create', postData);
        }

        function update(postData) {
            return post(basePath + '/update', postData);
        }

        function remove(postData) {
            return post(basePath + '/delete', postData);
        }

        //http get 
        function get(path) {

            return $http.get(path)
                .then(getComplete)
                .catch(getFailed);

        }

        function getComplete(response) {
            //$log.info(response.data);
            return response.data;
        }

        function getFailed(error) {
            $log.error(error.data);
        }

        //http post
        function post(path, postData) {

            return $http.post(path, postData)
                .then(postComplete)
                .catch(postFailed);

        }

        function postComplete(response) {
            //$log.info(response.data);
            return response.data;
        }

        function postFailed(error) {
            $log.error(error.data);
        }


    }

})();


// -----------------------------------------------
//  targetdataservice
// -----------------------------------------------
(function () {
    'use strict';

    angular
        .module('iTarget')
        .factory('targetdataservice', targetdataservice);

    targetdataservice.$inject = ['$http', '$log', 'CONST'];

    function targetdataservice($http, $log, CONST) {

        var basePath = CONST.API_URL + '/target';

        return {
            getByCategory: getByCategory,
            getById: getById,
            create: create,
            update: update,
            remove: remove
        };

        function getByCategory(categoryId) {
            return get(basePath + '/getbycategory/' + categoryId);
        }

        function getById(id) {
            return get(basePath + '/getbyid/' + id);
        }

        function create(postData) {
            return post(basePath + '/create', postData);
        }

        function update(postData) {
            return post(basePath + '/update', postData);
        }

        function remove(postData) {
            return post(basePath + '/delete', postData);
        }

        //http get 
        function get(path) {

            return $http.get(path)
                .then(getComplete)
                .catch(getFailed);

        }

        function getComplete(response) {
            //$log.info(response.data);
            return response.data;
        }

        function getFailed(error) {
            $log.error(error.data);
        }

        //http post
        function post(path, postData) {

            return $http.post(path, postData)
                .then(postComplete)
                .catch(postFailed);

        }

        function postComplete(response) {
            //$log.info(response.data);
            return response.data;
        }

        function postFailed(error) {
            $log.error(error.data);
        }


    }

})();


// -----------------------------------------------
//  activitydataservice
// -----------------------------------------------
(function () {
    'use strict';

    angular
        .module('iTarget')
        .factory('activitydataservice', activitydataservice);

    activitydataservice.$inject = ['$http', '$log', 'CONST'];

    function activitydataservice($http, $log, CONST) {

        var basePath = CONST.API_URL + '/activity';

        return {
            getByTarget: getByTarget,
            getById: getById,
            create: create,
            update: update,
            remove: remove
        };

        function getByTarget(targetId) {
            return get(basePath + '/getbytarget/' + targetId);
        }

        function getById(id) {
            return get(basePath + '/getbyid/' + id);
        }

        function create(postData) {
            return post(basePath + '/create', postData);
        }

        function update(postData) {
            return post(basePath + '/update', postData);
        }

        function remove(postData) {
            return post(basePath + '/delete', postData);
        }

        //http get 
        function get(path) {

            return $http.get(path)
                .then(getComplete)
                .catch(getFailed);

        }

        function getComplete(response) {
            //$log.info(response.data);
            return response.data;
        }

        function getFailed(error) {
            $log.error(error.data);
        }

        //http post
        function post(path, postData) {

            return $http.post(path, postData)
                .then(postComplete)
                .catch(postFailed);

        }

        function postComplete(response) {
            //$log.info(response.data);
            return response.data;
        }

        function postFailed(error) {
            $log.error(error.data);
        }


    }

})();