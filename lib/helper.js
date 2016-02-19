/* ================================================================
 * macaca-adb by xdf(xudafeng[at]126.com)
 *
 * first created at : Thu Aug 06 2015 14:48:08 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright  xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

'use strict';

let util = require('util');
var _ = require('macaca-utils');
var logger = require('./logger');
var childProcess = require('child_process');

_.exec = function(cmd, opts) {
  return new Promise(function(resolve, reject) {
    childProcess.exec(cmd, _.merge({
      maxBuffer: 1024 * 512,
      wrapArgs: false
    }, opts || {}), function(err, stdout) {
      if (err) {
        return reject(err);
      }
      resolve(_.trim(stdout));
    });
  });
};

_.spawn = function() {
  var args = Array.prototype.slice.call(arguments);
  return new Promise(function(resolve, reject) {
    var stdout = '';
    var stderr = '';
    var child = childProcess.spawn.apply(childProcess, args);

    child.on('error', function(error) {
      reject(error);
    });

    child.stdout.on('data', function(data) {
      stdout += data;
    });

    child.stderr.on('data', function(data) {
      stderr += data;
    });

    child.on('close', function(code) {
      var error;
      if (code) {
        error = new Error(stderr);
        error.code = code;
        return reject(error);
      }
      resolve([stdout, stderr]);
    });
  });
};

_.adbShell = function() {
  var args = Array.prototype.slice.call(arguments);
  var ANDROID_HOME = process.env.ANDROID_HOME;

  if (ANDROID_HOME) {
    var adb = `${ANDROID_HOME}/platform-tools/adb`;
    args[0] = `${adb} ${args[0]}`;
    return util.format.apply(this, args);
  } else {
    logger.error('please set ANDROID_HOME');
  }
};

module.exports = _;