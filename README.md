# console-profiler

Simple runtime profiler based on the console module

# Installation

```
npm install --save console-profiler
```

# Usage

1. Create console instance:

```
const Console = require('console-profile');
const consoleProfiler = new Console({
    threshold: 1000, // ms
    namespace: "profiler"
});

```

2. Use it:

```
consoleProfile.time('profile');

longRunningFunction();

consoleProfile.timeEnd('profiler');
```

If function runs longer than threshold, you will see a message in the console, like that:
```sh
  profiler profile: 1234.45ms
```

# Options

* `threshold` (number): upper threshold. Default = 0(profile disabled).
* `namespace` (string): namespace for console message. Default = console:time.
* `fixed` (number): number of numbers after the decimal point. Default = 2.
* `test` (boolean): disabled console message when testing. Default = false.

# License

MIT

