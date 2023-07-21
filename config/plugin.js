/* eslint-disable no-unused-vars */
'use strict';

const path = require('path');

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg

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

  cors: {
    enable: true,
    package: 'egg-cors',
  }
};
