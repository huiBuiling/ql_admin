'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // user
  router.get('/findAllUser', controller.user.findAllUser);
  router.get('/findUserById', controller.user.findUserById);
  router.get('/findUser', controller.user.findUser);
  router.post('/addUser', controller.user.create);
  router.put('/editUser', controller.user.update);
  router.delete('/delUser', controller.user.destory);
};
