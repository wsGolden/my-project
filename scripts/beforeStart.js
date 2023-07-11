// scripts/beforeStart.js

// const mongoose = require('mongoose');
// const User = require('../app/model/user');

// async function initDatabase() {
//   await mongoose.connect('mongodb://localhost:27017/wsMongo', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   // 创建用户表
//   await User.createCollection();
//   await User.ensureIndexes();
// }

// module.exports = async () => {
//   await initDatabase();
// }