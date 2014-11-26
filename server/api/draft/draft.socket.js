/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Draft = require('./draft.model');

exports.register = function(socket) {
  Draft.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Draft.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('draft:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('draft:remove', doc);
}