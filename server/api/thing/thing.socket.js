/**
 * Broadcast updates to client when the model changes
 */

'use strict';

import ThingEvents from './thing.events';
import Thing from './thing.model';

// Model events to emit
var events = ['save', 'remove'];

var thingConnections=[];


export function register(socket) {
  // Bind model events to socket events
  for(var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener(`thing:${event}`, socket);

    ThingEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
}

export function activate(socket, data)  {
  var conn = thingConnections.find(conn => conn.socket === socket);
  if (!conn)  {
      Thing.findOne({'macAddress': data.macAddress}).exec()
        .then(function(doc) {
          doc.active = true;
          doc.save();
          thingConnections.push({thingId:doc._id, socket: socket});
        })
        .catch(function(err){
          thingConnections.splice(conn);
        });
    }
}

export function deActivate(socket)  {
  let conn = thingConnections.find(conn => conn.socket === socket);
  if (conn)  {
      Thing.findById(conn.thingId).exec()
        .then(function(doc) {
          doc.active = false;
          doc.save();
          socket.emit()
          thingConnections.splice(conn);
        })
        .catch(function(err){
          thingConnections.splice(conn);
        });
    }
}


function findSocket(socket) {
  return thingConnections.socket === socket;
}

function createListener(event, socket) {
  return function(doc) {
    socket.emit(event, doc);
  };
}

function removeListener(event, listener) {
  return function() {
    ThingEvents.removeListener(event, listener);
  };
}
