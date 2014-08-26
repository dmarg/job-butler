/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Joblink = require('./joblink.model');

exports.register = function(socket) {
  Joblink.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Joblink.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('joblink:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('joblink:remove', doc);
}