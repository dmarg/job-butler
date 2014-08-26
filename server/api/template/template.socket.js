/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Template = require('./template.model');

exports.register = function(socket) {
  Template.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Template.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('template:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('template:remove', doc);
}