/* ================================================================
 * macaca-adb by xdf(xudafeng[at]126.com)
 *
 * first created at : Thu Aug 06 2015 14:48:08 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright 2013 xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

'use strict';

var ADB = require('..');

describe('macaca-adb.test.js', function() {

  it('getVersion callback', function(done) {
    ADB.getVersion(function(err, data) {
      if (err) {
        console.log(err);
        done();
        return;
      }
      data.should.be.a.String;
      console.log(`version: ${data.match(/\d+.\d+.\d+/)[0]}`);
      done();
    });
  });

  it('getVersion promise', function(done) {
    ADB.getVersion().then(function(data) {
      data.should.be.a.String;
      console.log(`version: ${data.match(/\d+.\d+.\d+/)[0]}`);
      done();
    }).catch(function(err) {
      console.log(err);
      done();
    });
  });

  it('getDevices callback', function(done) {
    ADB.getDevices(function(err, data) {
      if (err) {
        console.log(err);
        done();
        return;
      }
      console.log(data);
      done();
    });
  });

  it('getDevices promise', function(done) {
    ADB.getDevices().then(function(data) {
      console.log(data);
      done();
    }).catch(function(err) {
      console.log(err);
      done();
    });
  });

  it('getEmulators callback', function(done) {
    ADB.getEmulators(function(err, data) {
      if (err) {
        console.log(err);
        done();
        return;
      }
      console.log(data);
      done();
    });
  });

  it('getEmulators promise', function(done) {
    ADB.getEmulators().then(function(data) {
      console.log(data);
      done();
    }).catch(function(err) {
      console.log(err);
      done();
    });
  });

  it('shell callback', function *(done) {
    var adb = new ADB();
    var devices = yield ADB.getDevices();

    if (devices.length) {
      var device = devices[0];
      adb.setDeviceId(device.udid);
      adb.shell('ls', (err, data) => {
        if (err) {
          console.log(err);
          done();
          return;
        }
        console.log(data);
        done();
      });
    } else {
      done();
    }
  });

  it('shell promise', function *(done) {
    var adb = new ADB();
    var devices = yield ADB.getDevices();

    if (devices.length) {
      var device = devices[0];
      adb.setDeviceId(device.udid);
      adb.shell('ls').then((err, data) => {
        if (err) {
          console.log(err);
          done();
          return;
        }
        console.log(data);
        done();
      });
    } else {
      done();
    }
  });

  it('push callback', function *(done) {
    var adb = new ADB();
    var devices = yield ADB.getDevices();
    if (devices.length) {
      var device = devices[0];
      adb.setDeviceId(device.udid);
      adb.push('./README.md', '/data', (err, data) => {
        if (err) {
          console.log(err);
          done();
          return;
        }
        console.log(data);
        done();
      });
    } else {
      done();
    }
  });

  it('push promise', function *(done) {
    var adb = new ADB();
    var devices = yield ADB.getDevices();

    if (devices.length) {
      var device = devices[0];
      adb.setDeviceId(device.udid);
      adb.push('./README.md', '/data').then((err, data) => {
        if (err) {
          console.log(err);
          done();
          return;
        }
        done();
      });
    } else {
      done();
    }
  });

  it('pull callback', function *(done) {
    var adb = new ADB();
    var devices = yield ADB.getDevices();
    if (devices.length) {
      var device = devices[0];
      adb.setDeviceId(device.udid);
      adb.pull('/data/README.md', './test', (err, data) => {
        if (err) {
          console.log(err);
          done();
          return;
        }
        console.log(data);
        done();
      });
    } else {
      done();
    }
  });

  it('pull promise', function *(done) {
    var adb = new ADB();
    var devices = yield ADB.getDevices();

    if (devices.length) {
      var device = devices[0];
      adb.setDeviceId(device.udid);
      adb.pull('/data/README.md', './test').then((err, data) => {
        if (err) {
          console.log(err);
          done();
          return;
        }
        done();
      });
    } else {
      done();
    }
  });

  it('install callback', function *(done) {
    var adb = new ADB();
    var devices = yield ADB.getDevices();
    if (devices.length) {
      var device = devices[0];
      adb.setDeviceId(device.udid);
      adb.install('./xxx.apk', (err, data) => {
        if (err) {
          console.log(err);
          done();
          return;
        }
        console.log(data);
        done();
      }).catch(function() {
        done();
      });
    } else {
      done();
    }
  });

  it('install promise', function *(done) {
    var adb = new ADB();
    var devices = yield ADB.getDevices();

    if (devices.length) {
      var device = devices[0];
      adb.setDeviceId(device.udid);
      adb.install('./xxx.apk').then((err, data) => {
        if (err) {
          console.log(err);
          done();
          return;
        }
        done();
      }).catch(function() {
        done();
      });
    } else {
      done();
    }
  });

  it('forceStop callback', function *(done) {
    var adb = new ADB();
    var devices = yield ADB.getDevices();
    if (devices.length) {
      var device = devices[0];
      adb.setDeviceId(device.udid);
      adb.forceStop('xxxxxxx', (err, data) => {
        if (err) {
          console.log(err);
          done();
          return;
        }
        console.log(data);
        done();
      }).catch(function() {
        done();
      });
    } else {
      done();
    }
  });

  it('forceStop promise', function *(done) {
    var adb = new ADB();
    var devices = yield ADB.getDevices();

    if (devices.length) {
      var device = devices[0];
      adb.setDeviceId(device.udid);
      adb.forceStop('xxxxxxx').then((err, data) => {
        if (err) {
          console.log(err);
          done();
          return;
        }
        done();
      }).catch(function() {
        done();
      });
    } else {
      done();
    }
  });

  it('clear callback', function *(done) {
    var adb = new ADB();
    var devices = yield ADB.getDevices();
    if (devices.length) {
      var device = devices[0];
      adb.setDeviceId(device.udid);
      adb.clear('xxxxxxx', (err, data) => {
        if (err) {
          console.log(err);
          done();
          return;
        }
        console.log(data);
        done();
      }).catch(function() {
        done();
      });
    } else {
      done();
    }
  });

  it('clear promise', function *(done) {
    var adb = new ADB();
    var devices = yield ADB.getDevices();

    if (devices.length) {
      var device = devices[0];
      adb.setDeviceId(device.udid);
      adb.clear('xxxxxxx').then((err, data) => {
        if (err) {
          console.log(err);
          done();
          return;
        }
        done();
      }).catch(function() {
        done();
      });
    } else {
      done();
    }
  });

  it('unInstall callback', function *(done) {
    var adb = new ADB();
    var devices = yield ADB.getDevices();
    if (devices.length) {
      var device = devices[0];
      adb.setDeviceId(device.udid);
      adb.unInstall('xxxxxxx', (err, data) => {
        if (err) {
          console.log(err);
          done();
          return;
        }
        console.log(data);
        done();
      }).catch(function() {
        done();
      });
    } else {
      done();
    }
  });

  it('unInstall promise', function *(done) {
    var adb = new ADB();
    var devices = yield ADB.getDevices();

    if (devices.length) {
      var device = devices[0];
      adb.setDeviceId(device.udid);
      adb.unInstall('xxxxxxx').then((err, data) => {
        if (err) {
          console.log(err);
          done();
          return;
        }
        done();
      }).catch(function() {
        done();
      });
    } else {
      done();
    }
  });

  it('input callback', function *(done) {
    var adb = new ADB();
    var devices = yield ADB.getDevices();
    if (devices.length) {
      var device = devices[0];
      adb.setDeviceId(device.udid);
      adb.input('xxxxxxx', (err, data) => {
        if (err) {
          console.log(err);
          done();
          return;
        }
        console.log(data);
        done();
      }).catch(function() {
        done();
      });
    } else {
      done();
    }
  });

  it('input promise', function *(done) {
    var adb = new ADB();
    var devices = yield ADB.getDevices();

    if (devices.length) {
      var device = devices[0];
      adb.setDeviceId(device.udid);
      adb.input('xxxxxxx').then((err, data) => {
        if (err) {
          console.log(err);
          done();
          return;
        }
        done();
      }).catch(function() {
        done();
      });
    } else {
      done();
    }
  });

  it('goBack callback', function *(done) {
    var adb = new ADB();
    var devices = yield ADB.getDevices();
    if (devices.length) {
      var device = devices[0];
      adb.setDeviceId(device.udid);
      adb.goBack((err, data) => {
        if (err) {
          console.log(err);
          done();
          return;
        }
        console.log(data);
        done();
      }).catch(function() {
        done();
      });
    } else {
      done();
    }
  });

  it('goBack promise', function *(done) {
    var adb = new ADB();
    var devices = yield ADB.getDevices();

    if (devices.length) {
      var device = devices[0];
      adb.setDeviceId(device.udid);
      adb.goBack().then((err, data) => {
        if (err) {
          console.log(err);
          done();
          return;
        }
        done();
      }).catch(function() {
        done();
      });
    } else {
      done();
    }
  });

  it('getApiLevel callback', function *(done) {
    var adb = new ADB();
    var devices = yield ADB.getDevices();
    if (devices.length) {
      var device = devices[0];
      adb.setDeviceId(device.udid);
      adb.getApiLevel((err, data) => {
        if (err) {
          console.log(err);
          done();
          return;
        }
        console.log(data);
        done();
      }).catch(function() {
        done();
      });
    } else {
      done();
    }
  });

  it('getApiLevel promise', function *(done) {
    var adb = new ADB();
    var devices = yield ADB.getDevices();

    if (devices.length) {
      var device = devices[0];
      adb.setDeviceId(device.udid);
      adb.getApiLevel().then((err, data) => {
        if (err) {
          console.log(err);
          done();
          return;
        }
        done();
      }).catch(function() {
        done();
      });
    } else {
      done();
    }
  });

  let startAppOpts = {
    package: 'com.android.browser',
    activity: 'com.android.browser.BrowserActivity'
  };

  it('startApp callback', function *(done) {
    var adb = new ADB();
    var devices = yield ADB.getDevices();
    if (devices.length) {
      var device = devices[0];
      adb.setDeviceId(device.udid);
      adb.startApp(startAppOpts ,(err, data) => {
        if (err) {
          console.log(err);
          done();
          return;
        }
        console.log(data);
        done();
      }).catch(function() {
        done();
      });
    } else {
      done();
    }
  });

  it('startApp promise', function *(done) {
    var adb = new ADB();
    var devices = yield ADB.getDevices();

    if (devices.length) {
      var device = devices[0];
      adb.setDeviceId(device.udid);
      adb.startApp(startAppOpts).then((err, data) => {
        if (err) {
          console.log(err);
          done();
          return;
        }
        done();
      }).catch(function() {
        done();
      });
    } else {
      done();
    }
  });
});