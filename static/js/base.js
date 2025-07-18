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
        'bootstrap': ['libs/bootstrap.bundle.min'],
        'jqueryui': ['libs/jquery-ui.min'],
    },
    shim: {
        'bootstrap': ['jquery'],
        'jqueryui': ['jquery'],
    }
});

// Set up common JS UI actions which span most views
require([
    'jquery',
    'jqueryui',
    'bootstrap',
    'utils',
], function($, jqueryui, bootstrap, utils) {
    'use strict';


    $('#gov_warning button').on('click', function () {
        $('#gov_warning button').prop("disabled", true);
        $('#gov_warning').modal('hide');
        $.ajax({
            async: true,
            type: "GET",
            url: "/warning/",
            contentType: "charset=utf-8",
            fail: function () {
                console.warn("Unable to record status for Government Notice! You may see that popup again.");
            },
            always: function () {
                $('#gov_warning button').prop("disabled", false);
            }
        });
    });

    if (!warningSeen && showWarning) {
        $('#gov_warning').modal('show');
    }

    $(document).ready(function () {
        if (sessionStorage.getItem("reloadMsg")) {
            var msg = JSON.parse(sessionStorage.getItem("reloadMsg"));
            utils.showJsMessage(msg.type, msg.text, true);
        }
        sessionStorage.removeItem("reloadMsg");
    });
})

// Return an object for consts/methods used by most views
define('base',['jquery', 'utils'], function($, utils) {

    return {
        blacklist: /<script>|<\/script>|!\[\]|!!\[\]|\[\]\[\".*\"\]|<iframe>|<\/iframe>/ig,
        barcode_file_whitelist: /[^A-Za-z0-9\-,\t_\."'\s\(\) \/;:]/g,
        // From http://www.regular-expressions.info/email.html
        email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
        showJsMessage: utils.showJsMessage,
        // Simple method for standardizing storage of a message into sessionStorage so it can be retrieved and reloaded
        // at document load time
        setReloadMsg: function(type,text) {
            sessionStorage.setItem("reloadMsg",JSON.stringify({type: type, text: text}));
        },
        setCookie: function(name,val,expires_in,path) {
            utils.setCookie(name,val,expires_in,path);
        },
        removeCookie: function(name, path) {
            utils.removeCookie(name, path);
        },

        blockResubmit: utils.blockResubmit
    };
});

