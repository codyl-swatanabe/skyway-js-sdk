'use strict';

const Connection = require('./connection');
const util = require('./util');

class MediaConnection extends Connection {
  constructor(options) {
    super(options);

    this._idPrefix = 'mc_';
    this.type = 'media';
    this.localStream = this.options._stream;
    // Messages stored by peer because MC was not ready yet:
    this._queuedMessages = options._queuedMessages;

    if (this.localStream) {
      this._negotiator.startConnection(
        this,
        {_stream: this.localStream, originator: true}
      );
    }
  }

  addStream(remoteStream) {
    util.log('Receiving stream', remoteStream);

    this.remoteStream = remoteStream;
    // Is 'stream' an appropriate emit message? PeerJS contemplated using 'open' instead
    this.emit('stream', remoteStream);
  }

  answer(stream) {
    // TODO: Remove lint bypass
    console.log(stream);
  }

  close() {
    if (!this.open) {
      return;
    }
    this.open = false;
    this._negotiator.cleanup(this);
    this.emit('close');
  }
}

module.exports = MediaConnection;
