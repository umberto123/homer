var events = require('events');

module.exports = (function() {
	var id = 0;

	var Activity = function Activity() {
		this.id = ++id;
	}

	// Activity.prototype.uniqueId = function() {
 //            if ( typeof this.id == "undefined" ) {
 //                this.id = ++id;
 //            }
 //            return this.id;
 //        };

	Activity.prototype = new events.EventEmitter;

	Activity.prototype.start = function () {
		this.isWorking = false;

		var self = this;

		this.on('stop', function () {
			console.log('stopping');
			clearInterval(this.intervalId);
		});


		this.intervalId = setInterval(function() {
			if (self.isWorking) {
				console.log('skipped - working');
				return;
			}
			self.isWorking = true;
			self.emit('working');
			console.log(self.id + 'working');




			self.isWorking = false;
		}, 1500);

		console.log('started');
	}

	Activity.prototype.stop = function () {
		this.emit('stop');
		console.log('stoped');
	}

	return Activity;
})();
