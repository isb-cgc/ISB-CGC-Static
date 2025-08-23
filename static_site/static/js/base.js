/**
 *
 * Copyright 2017-2024, Institute for Systems Biology
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

require.config({
    baseUrl: STATIC_FILES_URL+'js/',
    paths: {
        'jquery': ['libs/jquery-3.7.1.min'],
        'bootstrap': ['libs/bootstrap.bundle.min']
    },
    shim: {
        'bootstrap': ['jquery']
    }
});

// Set up common JS UI actions which span most views
require([
    'jquery',
    'bootstrap',
    'utils',
], function($, bootstrap, utils) {
    'use strict';

    $('#gov_warning button').on('click', function () {
         $('#gov_warning').modal('hide');
    });


    if (!utils.getCookie('seenWarning') || !(utils.getCookie('seenWarning') =="true")) {
        utils.setCookie('seenWarning','true',null,null)
        $('#gov_warning').modal('show');
    }


})

// Return an object for consts/methods used by most views
define('base',['jquery', 'utils'], function($, utils) {

    return {
        setCookie: function(name,val,expires_in,path) {
            utils.setCookie(name,val,expires_in,path);
        },
        removeCookie: function(name, path) {
            utils.removeCookie(name, path);
        }
    };
});

