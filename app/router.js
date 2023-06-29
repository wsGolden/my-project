// app/router.js

module.exports = app => {
  const { router, controller } = app;

  // 人员列表
  router.post('/api/user/list', controller.api.user.list);
  router.post('/api/user/add', controller.api.user.add);
  router.post('/api/user/remove', controller.api.user.remove);
  router.post('/api/user/detail', controller.api.user.detail);
  router.post('/api/user/update', controller.api.user.update);

};