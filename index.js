const { performance } = require('perf_hooks');

require("colors");

module.exports = class Console {
  constructor(opts = {}) {
    this._colors = {
      namespace: "yellow",
      label: "gray",
      time: "green"
    };

    this.opts = Object.assign({ threshold: 0, namespace: "console:time", test: false, fixed: 2 }, opts);

    this._tags = {};
  }

  time(tag) {
    this._tags[tag] = {};
    this._tags[tag].start = performance.now();
  }

  timeEnd(tag) {
    if (this._tags[tag] === 'undefined' || this._tags[tag].start === 'undefined') {
      console.warn(`timeEnd: tag ${tag} wasn't set.`);

      return;
    }

    const time = performance.now() - this._tags[tag].start;
    const threshold = this.opts.threshold;

    if (time >= threshold) {
      this._showTime(tag, time);
    };
  }

  _showTime(tag, time) {
    let namespace = this.opts.namespace;

    let nameLabel = tag + ":";
    let timeLabel = time.toFixed(this.opts.fixed) + "ms";

    if (this.opts.test === false) {
      console.log("  %s %s %s", namespace[this._colors.namespace], nameLabel[this._colors.label], timeLabel[this._colors.time]);
    };
  }
}