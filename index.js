const colors = require("colors");

module.exports = class Console {
  constructor(opts = {}) {
    this._colors = {
      namespace: "yellow",
      label: "gray",
      time: "green"
    };

    this.opts = Object.assign({ threshold: 0, namespace: "console:time" }, opts);

    this._tags = {};
  }

  time(name) {
    this._tags[name] = {};
    this._tags[name].start = performance.now();
  }

  timeEnd(name) {
    this._tags[name].end = performance.now();
    this._showTime(name);
  }

  _showTime(name) {
    let tag = this._tags[name];

    if (!tag) {
      console.warn("Warning: No such label %s for consoleProfiler.timeEnd", name);
      return;
    };

    let time = tag.end - tag.start;
    let threshold = this.opts.threshold;
    let namespace = this.opts.namespace;

    if (time >= threshold) {
      let nameLabel = name + ":";
      let timeLabel = time.toString() + "ms";

      console.log("  %s %s %s", namespace[this._colors.namespace], nameLabel[this._colors.label], timeLabel[this._colors.time]);
    };

  }
}