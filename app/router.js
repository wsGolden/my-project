// app/router.js

module.exports = app => {
  const { router, controller } = app;

  // 人员列表
  router.post('/api/user/list', controller.api.user.list);
  router.post('/api/user/add', controller.api.user.add);
  router.post('/api/user/remove', controller.api.user.remove);
  router.post('/api/user/detail', controller.api.user.detail);
  router.post('/api/user/update', controller.api.user.update);


  // 文章
  router.post('/api/article/list', controller.api.article.list);
  router.post('/api/article/add', controller.api.article.add);
  router.post('/api/article/remove', controller.api.article.remove);
  router.post('/api/article/detail', controller.api.article.detail);
  router.post('/api/article/update', controller.api.article.update);

  router.post('/api/file/upload', controller.api.file.upload);
  router.get('/upload/:filename', controller.api.file.show);

  // 配置
  router.post('/api/getconfig', controller.api.config.getConfig);
};