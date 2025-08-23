/**
 *
 * Copyright 2020-2024, Institute for Systems Biology
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

// Common utilities which are pulled into base.js (and used there)

// Return an object for consts/methods used by most views
define(['jquery'], function($) {


    // Adapted from https://docs.djangoproject.com/en/1.9/ref/csrf/
    function _getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };

    function _removeCookie(name, path) {
        path = path || "/";
        var now = new Date();
        var time = now.getTime();
        var expireTime = time-(300*1000);
        now.setTime(expireTime);
        document.cookie=encodeURIComponent(name)+"=; expires="+new Date(0).toUTCString()+"; path="+path+";";
    };

    function _setCookie(name,val,path,expires_in) {
        var now = new Date();
        var time = now.getTime();
        expires_in = expires_in || (300*1000);
        path = path || '/';
        var expireTime = time+expires_in;
        now.setTime(expireTime);
        document.cookie=encodeURIComponent(name)+"="+val+"; expires="+now.toUTCString()+"; path="+path+";";
    };

    // Set the cookie to expire Forever Ago so it dies immediately
    // Optional path parameter for path-specific cookies
    function _expireCookie(name,path) {
        path = path || "/";
        document.cookie = encodeURIComponent(name) + "=deleted; Path="+path+"; expires=" + new Date(0).toUTCString();
    };



    return {

        setCookie: _setCookie,
        getCookie: _getCookie,
        removeCookie: _removeCookie
    };
});