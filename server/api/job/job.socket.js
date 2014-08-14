/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Job = require('./job.model');

exports.register = function(socket) {
  Job.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Job.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  console.log('save: ', doc);
  socket.emit('job:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('job:remove', doc);
}