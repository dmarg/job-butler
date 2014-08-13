/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Label = require('./label.model');

exports.register = function(socket) {
  Label.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Label.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('label:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('label:remove', doc);
}