/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Createdraft = require('./createDraft.model');

exports.register = function(socket) {
  Createdraft.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Createdraft.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('createDraft:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('createDraft:remove', doc);
}