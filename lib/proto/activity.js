var events = require('events');

module.exports = (function() {
	var id = 0;

	var Activity = function Activity(interval, activityMethod) {
		if (typeof interval === 'undefined') { interval = 1500; }

		this.interval = interval;
		this.activityMethod = activityMethod;
		this.id = ++id;
	}

	Activity.prototype = new events.EventEmitter;

	Activity.prototype.start = function () {
		this.isWorking = false;

		var self = this;

		this.on('stop' + this.id, function () {
			
			clearInterval(this.intervalId);

			//do some async stuff
			console.log(this.id + ' stopped');
			self.emit('stopped' + self.id);
		});

		this.intervalId = setInterval(function() {
			if (self.isWorking) {
				console.log(this.id + ' skipped - working');
				return;
			}
			self.isWorking = true;
			self.emit('working' + self.id);
			console.log(self.id + ' working');

			if (typeof(self.activityMethod) == "function") {
				//todo -- add then
				self.activityMethod();
			}

			//do some async stuff
			self.isWorking = false;
		}, self.interval);

		console.log(self.id + ' started');
		self.emit('started' + self.id);
	}

	Activity.prototype.stop = function () {
		console.log(this.id + ' stop');
		this.emit('stop' + this.id);
	}

	return Activity;
})();
