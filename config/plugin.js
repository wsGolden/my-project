/* eslint-disable no-unused-vars */
'use strict';

const path = require('path');

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  static: {
    enable: true,
    package: 'egg-static',
  },
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  oss: {
    enable: true,
    package: 'egg-oss',
  },
  logrotator: {
    enable: true,
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  }
};
