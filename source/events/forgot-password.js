var config = require('../../config');
var db = require('../db')(config.db);
var transport = require('../transport');
var logger = require('../utils/logger');
var templates = require('../templates');
var t = require('../translations').t;

module.exports = function signup(notifier) {
  if (!notifier || typeof notifier != 'object') throw new Error('Unable to initialize singup event - Undefined notifier');

  // Receiver
  notifier
    .receive('forgot-password', function receive(event, actions, callback) {
      logger.info('Received event ' + JSON.stringify(event));

      actions.create('forgot-password', { user: event.user, resetUrl: event.resetUrl }, function (err) {
        logger.info({message: 'Created "forgot-password" action for user ' + event.user });
        callback && callback(err);
      });
    })

  // Resolver
  notifier.resolve('forgot-password', function (action, actions, callback) {
    db.user.findOne({ email: action.user }, function (err, user) {
      if (err) return callback(err);
      if (!user) return callback({message: 'user not found', email: action.user});

      var data = {
        email: user.email,
        user: { name: formatName(user) },
        resetUrl: action.resetUrl
      }

      logger.info('Received action ' + JSON.stringify(action) + ' with data ' + JSON.stringify(data));
      actions.resolved(action, data, callback);
    });
  })

  // Executor
  .execute('forgot-password', function (action, transport, callback) {
      console.log('action data:');
      console.log(JSON.stringify(action.data));
      var vars = [
        {name: 'USER_NAME', content: action.data.user.name},
        {name: 'RESET_PASSWORD_URL', content: action.data.resetUrl}
      ];

      // Add get content from jade template
      templates.jade('forgot-password', vars, function (err, content) {
        transport.nodemailer.sendMail({
          from: config.from,
          to: [{email: action.data.email}],
          subject: t('templates.forgot-password.subject'),
          html: content,
        }, function (err) {
          if (callback) callback(err);
        });
      });
  });
}

function formatName (user) {
  return user.lastName ? user.firstName + ' ' + user.lastName : user.firstName
}