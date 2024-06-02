class SessionStorage {
  async getItem(key) {
    const result = await chrome.storage.session.get(key);
    return result[key];
  }
  async setItem(key, value) {
    await chrome.storage.session.set({ [key]: value });
  }
  async removeItem(key) {
    await chrome.storage.session.remove(key);
  }
  async clear() {
    await chrome.storage.session.clear();
  }
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var lib$5 = {};
var go$1 = {};
Object.defineProperty(go$1, "__esModule", { value: true });
go$1.go = void 0;
function go(fn2) {
  return fn2();
}
go$1.go = go;
var goMicrotask$1 = {};
Object.defineProperty(goMicrotask$1, "__esModule", { value: true });
goMicrotask$1.goMicrotask = void 0;
function goMicrotask(fn2) {
  return new Promise((resolve, reject) => {
    queueMicrotask(async () => {
      try {
        resolve(await fn2());
      } catch (e2) {
        reject(e2);
      }
    });
  });
}
goMicrotask$1.goMicrotask = goMicrotask;
var goMacrotask$1 = {};
var lib$4 = {};
var exponentialBackoff = {};
var lib$3 = {};
var random$1 = {};
var mapToRange$1 = {};
Object.defineProperty(mapToRange$1, "__esModule", { value: true });
mapToRange$1.mapToRange = void 0;
function mapToRange(value, oldMin, oldMax, newMin, newMax) {
  return (value - oldMin) / (oldMax - oldMin) * (newMax - newMin) + newMin;
}
mapToRange$1.mapToRange = mapToRange;
Object.defineProperty(random$1, "__esModule", { value: true });
random$1.random = void 0;
const map_to_range_1$2 = mapToRange$1;
function random(min, max) {
  return (0, map_to_range_1$2.mapToRange)(Math.random(), 0, 1, min, max);
}
random$1.random = random;
var randomInt$1 = {};
var mapToIntRange$1 = {};
Object.defineProperty(mapToIntRange$1, "__esModule", { value: true });
mapToIntRange$1.mapToIntRange = void 0;
const map_to_range_1$1 = mapToRange$1;
function mapToIntRange(value, oldMin, oldMax, newMin, newMax) {
  return Math.floor((0, map_to_range_1$1.mapToRange)(value, oldMin, oldMax, newMin, newMax));
}
mapToIntRange$1.mapToIntRange = mapToIntRange;
Object.defineProperty(randomInt$1, "__esModule", { value: true });
randomInt$1.randomInt = void 0;
const map_to_int_range_1$2 = mapToIntRange$1;
function randomInt(min, max) {
  return (0, map_to_int_range_1$2.mapToIntRange)(Math.random(), 0, 1, Math.ceil(min), Math.floor(max));
}
randomInt$1.randomInt = randomInt;
var randomIntInclusive$1 = {};
Object.defineProperty(randomIntInclusive$1, "__esModule", { value: true });
randomIntInclusive$1.randomIntInclusive = void 0;
const map_to_int_range_1$1 = mapToIntRange$1;
function randomIntInclusive(min, max) {
  return (0, map_to_int_range_1$1.mapToIntRange)(Math.random(), 0, 1, Math.ceil(min), Math.floor(max) + 1);
}
randomIntInclusive$1.randomIntInclusive = randomIntInclusive;
var randomByWeight$1 = {};
var mapToIndexByWeight$1 = {};
Object.defineProperty(mapToIndexByWeight$1, "__esModule", { value: true });
mapToIndexByWeight$1.mapToIndexByWeight = void 0;
const map_to_range_1 = mapToRange$1;
const map_to_int_range_1 = mapToIntRange$1;
function mapToIndexByWeight(value, oldMin, oldMax, weights) {
  const newMin = 0;
  const newMax = weights.reduce((acc, cur) => acc + Math.max(cur, 0));
  if (newMax === 0) {
    const index = (0, map_to_int_range_1.mapToIntRange)(value, oldMin, oldMax, newMin, weights.length);
    return index === weights.length ? weights.length - 1 : index;
  } else {
    const newValue = (0, map_to_range_1.mapToRange)(value, oldMin, oldMax, newMin, newMax);
    let remains = newMax;
    for (let i2 = weights.length; i2--; ) {
      const weight = weights[i2];
      if (weight <= 0) {
        continue;
      } else {
        remains -= weight;
        if (newValue >= remains) {
          return i2;
        }
      }
    }
    throw new Error("Impossible route");
  }
}
mapToIndexByWeight$1.mapToIndexByWeight = mapToIndexByWeight;
Object.defineProperty(randomByWeight$1, "__esModule", { value: true });
randomByWeight$1.randomByWeight = void 0;
const map_to_index_by_weight_1 = mapToIndexByWeight$1;
function randomByWeight(weights) {
  return (0, map_to_index_by_weight_1.mapToIndexByWeight)(Math.random(), 0, 1, weights);
}
randomByWeight$1.randomByWeight = randomByWeight;
(function(exports) {
  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o2, m2, k2, k22) {
    if (k22 === void 0)
      k22 = k2;
    var desc = Object.getOwnPropertyDescriptor(m2, k2);
    if (!desc || ("get" in desc ? !m2.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m2[k2];
      } };
    }
    Object.defineProperty(o2, k22, desc);
  } : function(o2, m2, k2, k22) {
    if (k22 === void 0)
      k22 = k2;
    o2[k22] = m2[k2];
  });
  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function(m2, exports2) {
    for (var p2 in m2)
      if (p2 !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p2))
        __createBinding(exports2, m2, p2);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  __exportStar(random$1, exports);
  __exportStar(randomInt$1, exports);
  __exportStar(randomIntInclusive$1, exports);
  __exportStar(randomByWeight$1, exports);
  __exportStar(mapToRange$1, exports);
  __exportStar(mapToIntRange$1, exports);
  __exportStar(mapToIndexByWeight$1, exports);
})(lib$3);
Object.defineProperty(exponentialBackoff, "__esModule", { value: true });
exponentialBackoff.calculateExponentialBackoffTimeout = void 0;
const extra_rand_1 = lib$3;
function calculateExponentialBackoffTimeout({ baseTimeout, retries, maxTimeout = Infinity, factor = 2, jitter = true }) {
  const timeout2 = Math.min(factor ** retries * baseTimeout, maxTimeout);
  if (jitter) {
    return (0, extra_rand_1.randomIntInclusive)(0, timeout2);
  } else {
    return timeout2;
  }
}
exponentialBackoff.calculateExponentialBackoffTimeout = calculateExponentialBackoffTimeout;
var setTimeout$2 = {};
Object.defineProperty(setTimeout$2, "__esModule", { value: true });
setTimeout$2.setTimeout = void 0;
function setTimeout$1(timeout2, cb) {
  const timer = globalThis.setTimeout(cb, timeout2);
  return () => clearTimeout(timer);
}
setTimeout$2.setTimeout = setTimeout$1;
var setSchedule$1 = {};
Object.defineProperty(setSchedule$1, "__esModule", { value: true });
setSchedule$1.setSchedule = void 0;
const set_timeout_1$3 = setTimeout$2;
function setSchedule(timestamp, cb) {
  const timeout2 = timestamp - Date.now();
  return (0, set_timeout_1$3.setTimeout)(timeout2, cb);
}
setSchedule$1.setSchedule = setSchedule;
var setInterval$2 = {};
Object.defineProperty(setInterval$2, "__esModule", { value: true });
setInterval$2.setInterval = void 0;
function setInterval$1(timeout2, cb) {
  const timer = globalThis.setInterval(cb, timeout2);
  return () => clearInterval(timer);
}
setInterval$2.setInterval = setInterval$1;
var setImmediate$2 = {};
Object.defineProperty(setImmediate$2, "__esModule", { value: true });
setImmediate$2.setImmediate = void 0;
const set_timeout_1$2 = setTimeout$2;
function setImmediate$1(cb) {
  if (globalThis.setImmediate) {
    const timer = globalThis.setImmediate(cb);
    return () => clearImmediate(timer);
  } else {
    return (0, set_timeout_1$2.setTimeout)(0, cb);
  }
}
setImmediate$2.setImmediate = setImmediate$1;
var setTimeoutLoop$1 = {};
Object.defineProperty(setTimeoutLoop$1, "__esModule", { value: true });
setTimeoutLoop$1.setTimeoutLoop = void 0;
const set_timeout_1$1 = setTimeout$2;
function setTimeoutLoop(timeout2, cb) {
  let isCancelled = false;
  let cancel = (0, set_timeout_1$1.setTimeout)(timeout2, loop);
  return () => {
    isCancelled = true;
    cancel();
  };
  async function loop() {
    await cb();
    if (!isCancelled) {
      cancel = (0, set_timeout_1$1.setTimeout)(timeout2, loop);
    }
  }
}
setTimeoutLoop$1.setTimeoutLoop = setTimeoutLoop;
var setDynamicTimeoutLoop$1 = {};
Object.defineProperty(setDynamicTimeoutLoop$1, "__esModule", { value: true });
setDynamicTimeoutLoop$1.setDynamicTimeoutLoop = void 0;
const set_timeout_1 = setTimeout$2;
function setDynamicTimeoutLoop(timeout2, cb) {
  let isCancelled = false;
  let cancel = (0, set_timeout_1.setTimeout)(timeout2, loop);
  return () => {
    isCancelled = true;
    cancel();
  };
  async function loop() {
    const start = Date.now();
    await cb();
    const elapsed = Date.now() - start;
    if (!isCancelled) {
      cancel = (0, set_timeout_1.setTimeout)(Math.max(timeout2 - elapsed, 0), loop);
    }
  }
}
setDynamicTimeoutLoop$1.setDynamicTimeoutLoop = setDynamicTimeoutLoop;
(function(exports) {
  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o2, m2, k2, k22) {
    if (k22 === void 0)
      k22 = k2;
    var desc = Object.getOwnPropertyDescriptor(m2, k2);
    if (!desc || ("get" in desc ? !m2.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m2[k2];
      } };
    }
    Object.defineProperty(o2, k22, desc);
  } : function(o2, m2, k2, k22) {
    if (k22 === void 0)
      k22 = k2;
    o2[k22] = m2[k2];
  });
  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function(m2, exports2) {
    for (var p2 in m2)
      if (p2 !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p2))
        __createBinding(exports2, m2, p2);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  __exportStar(exponentialBackoff, exports);
  __exportStar(setTimeout$2, exports);
  __exportStar(setSchedule$1, exports);
  __exportStar(setInterval$2, exports);
  __exportStar(setImmediate$2, exports);
  __exportStar(setTimeoutLoop$1, exports);
  __exportStar(setDynamicTimeoutLoop$1, exports);
})(lib$4);
Object.defineProperty(goMacrotask$1, "__esModule", { value: true });
goMacrotask$1.goMacrotask = void 0;
const extra_timers_1 = lib$4;
function goMacrotask(fn2) {
  return new Promise((resolve, reject) => {
    (0, extra_timers_1.setImmediate)(async () => {
      try {
        resolve(await fn2());
      } catch (e2) {
        reject(e2);
      }
    });
  });
}
goMacrotask$1.goMacrotask = goMacrotask;
(function(exports) {
  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o2, m2, k2, k22) {
    if (k22 === void 0)
      k22 = k2;
    var desc = Object.getOwnPropertyDescriptor(m2, k2);
    if (!desc || ("get" in desc ? !m2.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m2[k2];
      } };
    }
    Object.defineProperty(o2, k22, desc);
  } : function(o2, m2, k2, k22) {
    if (k22 === void 0)
      k22 = k2;
    o2[k22] = m2[k2];
  });
  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function(m2, exports2) {
    for (var p2 in m2)
      if (p2 !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p2))
        __createBinding(exports2, m2, p2);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  __exportStar(go$1, exports);
  __exportStar(goMicrotask$1, exports);
  __exportStar(goMacrotask$1, exports);
})(lib$5);
function isArray$1(val) {
  return Array.isArray(val);
}
function isBoolean$1(val) {
  return typeof val === "boolean";
}
function isBigInt$1(val) {
  return typeof val === "bigint";
}
function isObject$1(val) {
  return val !== null && typeof val === "object";
}
var freeGlobal$2 = typeof global == "object" && global && global.Object === Object && global;
var freeSelf$1 = typeof self == "object" && self && self.Object === Object && self;
var root$2 = freeGlobal$2 || freeSelf$1 || Function("return this")();
var Symbol$4 = root$2.Symbol;
var objectProto$5 = Object.prototype;
var hasOwnProperty$3 = objectProto$5.hasOwnProperty;
var nativeObjectToString$3 = objectProto$5.toString;
var symToStringTag$3 = Symbol$4 ? Symbol$4.toStringTag : void 0;
function getRawTag$2(value) {
  var isOwn = hasOwnProperty$3.call(value, symToStringTag$3), tag = value[symToStringTag$3];
  try {
    value[symToStringTag$3] = void 0;
    var unmasked = true;
  } catch (e2) {
  }
  var result = nativeObjectToString$3.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$3] = tag;
    } else {
      delete value[symToStringTag$3];
    }
  }
  return result;
}
var objectProto$4 = Object.prototype;
var nativeObjectToString$2 = objectProto$4.toString;
function objectToString$2(value) {
  return nativeObjectToString$2.call(value);
}
var nullTag$1 = "[object Null]", undefinedTag$1 = "[object Undefined]";
var symToStringTag$2 = Symbol$4 ? Symbol$4.toStringTag : void 0;
function baseGetTag$2(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag$1 : nullTag$1;
  }
  return symToStringTag$2 && symToStringTag$2 in Object(value) ? getRawTag$2(value) : objectToString$2(value);
}
function isObjectLike$2(value) {
  return value != null && typeof value == "object";
}
function overArg$2(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var getPrototype$2 = overArg$2(Object.getPrototypeOf, Object);
var objectTag$1 = "[object Object]";
var funcProto$1 = Function.prototype, objectProto$3 = Object.prototype;
var funcToString$1 = funcProto$1.toString;
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
var objectCtorString$1 = funcToString$1.call(Object);
function isPlainObject$3(value) {
  if (!isObjectLike$2(value) || baseGetTag$2(value) != objectTag$1) {
    return false;
  }
  var proto = getPrototype$2(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$2.call(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString$1.call(Ctor) == objectCtorString$1;
}
function isPlainObject$2(val) {
  return isPlainObject$3(val);
}
function isNull$1(val) {
  return val === null;
}
function isntNull$1(val) {
  return !isNull$1(val);
}
function isUndefined$1(val) {
  return val === void 0;
}
function isntUndefined$1(val) {
  return !isUndefined$1(val);
}
function isString$1(val) {
  return typeof val === "string";
}
function isURLString(text) {
  try {
    new URL(text);
    return true;
  } catch (_a) {
    return false;
  }
}
function isBlankLine(line) {
  return line.trim() === "";
}
function isntBlankLine(line) {
  return !isBlankLine(line);
}
function removeExtraIndents(text, { ignoreBlankLines = false } = {}) {
  const lines = text.split("\n");
  const commonIndentLength = lines.filter((line) => ignoreBlankLines ? isntBlankLine(line) : true).reduce((acc, cur) => {
    const indent = cur.match(/^(\s+)/);
    if (indent) {
      return Math.min(acc, indent[1].length);
    } else {
      return 0;
    }
  }, Infinity);
  if (commonIndentLength === 0 || commonIndentLength === Infinity) {
    return text;
  }
  const newLines = lines.map((x2) => x2.slice(commonIndentLength));
  return newLines.join("\n");
}
function removeLeadingBlankLines(text, maxRemovals = Infinity) {
  const lines = text.split("\n");
  let removals = 0;
  while (removals < maxRemovals && lines.length > 0 && isBlankLine(lines[0])) {
    lines.shift();
    removals++;
  }
  return lines.join("\n");
}
function removeTrailingBlankLines(text, maxRemovals = Infinity) {
  const lines = text.split("\n");
  let removals = 0;
  while (removals < maxRemovals && lines.length > 0 && isBlankLine(lines[lines.length - 1])) {
    lines.pop();
    removals++;
  }
  return lines.join("\n");
}
function isFunction$1(val) {
  return typeof val === "function";
}
function isntFunction$1(val) {
  return !isFunction$1(val);
}
function isRegExp$1(val) {
  return val instanceof RegExp;
}
function pipe(value, ...operators) {
  let result = value;
  for (const operator of operators) {
    result = operator(result);
  }
  return result;
}
async function pipeAsync(value, ...operators) {
  let result = await value;
  for (const operator of operators) {
    result = await operator(result);
  }
  return result;
}
function isError$3(val) {
  return val instanceof Error;
}
function* traverseErrorPrototypeChain$2(err) {
  let current = err;
  while (current = Object.getPrototypeOf(current)) {
    yield current;
    if (current === Error.prototype)
      break;
  }
}
function* getErrorNames$2(err) {
  var _a;
  if (isError$3(err)) {
    for (const prototype of traverseErrorPrototypeChain$2(err)) {
      if ((_a = prototype.constructor) === null || _a === void 0 ? void 0 : _a.name) {
        yield prototype.constructor.name;
      }
    }
  } else {
    yield err.name;
    yield* err.ancestors;
  }
}
function isSerializableError$1(val) {
  return isObject$1(val) && isString$1(val.name) && isString$1(val.message) && (isString$1(val.stack) || isNull$1(val.stack)) && (isArray$1(val.ancestors) && val.ancestors.every(isString$1));
}
function first$1(iterable2) {
  for (const element of iterable2) {
    return element;
  }
}
function toArray$1(iterable2) {
  return Array.from(iterable2);
}
let CustomError$1 = class CustomError extends Error {
  get name() {
    var _a, _b;
    return (_b = (_a = first$1(getErrorNames$2(this))) !== null && _a !== void 0 ? _a : CustomError.name) !== null && _b !== void 0 ? _b : "CustomError";
  }
  static [Symbol.hasInstance](instance) {
    var _a;
    if (isError$3(instance) || isSerializableError$1(instance)) {
      const reversedClassNames = [
        (_a = this.prototype.constructor.name) !== null && _a !== void 0 ? _a : this.name,
        ...getErrorNames$2(this.prototype)
      ].reverse();
      const reversedInstanceNames = toArray$1(getErrorNames$2(instance)).reverse();
      return reversedClassNames.every((x2, i2) => x2 === reversedInstanceNames[i2]);
    } else {
      return false;
    }
  }
};
let AssertionError$1 = class AssertionError extends CustomError$1 {
};
function normalize$2(err) {
  var _a;
  const [name, ...ancestors] = toArray$1(getErrorNames$2(err));
  return {
    name,
    ancestors,
    message: err.message,
    stack: (_a = err.stack) !== null && _a !== void 0 ? _a : null
  };
}
var lib$2 = {};
var pass$1 = {};
Object.defineProperty(pass$1, "__esModule", { value: true });
pass$1.pass = void 0;
function pass() {
}
pass$1.pass = pass;
var passAsync$1 = {};
Object.defineProperty(passAsync$1, "__esModule", { value: true });
passAsync$1.passAsync = void 0;
async function passAsync() {
}
passAsync$1.passAsync = passAsync;
(function(exports) {
  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o2, m2, k2, k22) {
    if (k22 === void 0)
      k22 = k2;
    Object.defineProperty(o2, k22, { enumerable: true, get: function() {
      return m2[k2];
    } });
  } : function(o2, m2, k2, k22) {
    if (k22 === void 0)
      k22 = k2;
    o2[k22] = m2[k2];
  });
  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function(m2, exports2) {
    for (var p2 in m2)
      if (p2 !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p2))
        __createBinding(exports2, m2, p2);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  __exportStar(pass$1, exports);
  __exportStar(passAsync$1, exports);
})(lib$2);
function assert$2(condition, message = "Assertion failed") {
  if (!condition)
    throw new AssertionError$1(message);
}
function* map$2(iterable2, fn2) {
  let index = 0;
  for (const element of iterable2) {
    yield fn2(element, index);
    index++;
  }
}
class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }
  get then() {
    return this.promise.then.bind(this.promise);
  }
  resolve(value) {
    this._resolve(value);
  }
  reject(reason) {
    this._reject(reason);
  }
}
function validateConcurrency(name, value) {
  assert$2(value === Infinity || Number.isInteger(value), `The parameter ${name} must be an integer`);
  assert$2(value >= 1, `The parameter ${name} must be greater than or equal to 1`);
}
function parallel(tasks, concurrency = Infinity) {
  validateConcurrency("concurrency", concurrency);
  return new Promise((resolve, reject) => {
    let running = 0;
    let promisePending = true;
    const iterator = tasks[Symbol.iterator]();
    let done;
    for (let i2 = 0; !done && i2 < concurrency; i2++) {
      next();
    }
    async function next() {
      if (!promisePending)
        return;
      if (done && running === 0)
        return resolveGracefully();
      let value;
      try {
        ({ value, done } = iterator.next());
      } catch (e2) {
        return rejectGracefully(e2);
      }
      if (done) {
        if (running === 0)
          resolveGracefully();
        return;
      }
      const task = value;
      running++;
      try {
        await task();
      } catch (e2) {
        return rejectGracefully(e2);
      }
      running--;
      next();
    }
    function resolveGracefully() {
      var _a;
      promisePending = false;
      if (!done) {
        (_a = iterator.return) === null || _a === void 0 ? void 0 : _a.call(iterator);
      }
      resolve();
    }
    function rejectGracefully(reason) {
      var _a;
      promisePending = false;
      if (!done) {
        (_a = iterator.return) === null || _a === void 0 ? void 0 : _a.call(iterator);
      }
      reject(reason);
    }
  });
}
function each(iterable2, fn2, concurrency = Infinity) {
  validateConcurrency("concurrency", concurrency);
  return lib$5.go(async () => {
    const tasks = map$2(iterable2, (element, i2) => () => fn2(element, i2));
    return await parallel(tasks, concurrency);
  });
}
function map$1(iterable2, fn2, concurrency = Infinity) {
  validateConcurrency("concurrency", concurrency);
  return lib$5.go(async () => {
    const results = [];
    await each(iterable2, async (x2, i2) => {
      results[i2] = await fn2(x2, i2);
    }, concurrency);
    return results;
  });
}
function timeout(ms) {
  return new Promise((_2, reject) => {
    setTimeout(() => reject(new TimeoutError()), ms);
  });
}
class TimeoutError extends CustomError$1 {
}
var LaunchReason;
(function(LaunchReason2) {
  LaunchReason2[LaunchReason2["Install"] = 0] = "Install";
  LaunchReason2[LaunchReason2["Update"] = 1] = "Update";
  LaunchReason2[LaunchReason2["Enable"] = 2] = "Enable";
  LaunchReason2[LaunchReason2["Activate"] = 3] = "Activate";
})(LaunchReason || (LaunchReason = {}));
const installDetailsPromise = new Promise((resolve) => {
  chrome.runtime.onInstalled.addListener(resolve);
});
async function waitForLaunch() {
  const activeFlagKey = "_extraWebextensionActiveFlag";
  const storage = new SessionStorage();
  if (await storage.getItem(activeFlagKey)) {
    return { reason: LaunchReason.Activate };
  } else {
    await storage.setItem(activeFlagKey, true);
    try {
      const details = await Promise.race([
        installDetailsPromise,
        timeout(1e3)
      ]);
      switch (details.reason) {
        case "install": {
          return { reason: LaunchReason.Install };
        }
        case "update": {
          assert$2(details.previousVersion, "The details.previousVersion is undefined, which is unexpected.");
          return {
            reason: LaunchReason.Update,
            previousVersion: details.previousVersion
          };
        }
        default: {
          return { reason: LaunchReason.Enable };
        }
      }
    } catch (e2) {
      if (e2 instanceof TimeoutError) {
        return { reason: LaunchReason.Enable };
      } else {
        throw e2;
      }
    }
  }
}
function parseMetadata(code) {
  let name = null;
  const matches = [];
  const updateURLs = [];
  for (const { key, value } of parseMetadataLines(code)) {
    switch (key) {
      case "name": {
        name = parseNameValue(value);
        break;
      }
      case "match": {
        const match = parseMatchValue(value);
        if (match)
          matches.push(match);
        break;
      }
      case "update-url": {
        const updateURL = parseUpdateURLValue(value);
        if (updateURL)
          updateURLs.push(updateURL);
        break;
      }
    }
  }
  if (name === null)
    throw new Error("The userscript needs a name.");
  return {
    name,
    matches,
    updateURLs
  };
}
function parseNameValue(value) {
  return value;
}
function parseMatchValue(value) {
  const re2 = /^(?<pattern>\S+)\s*$/;
  const matched = value.match(re2);
  if (!matched)
    return null;
  const { pattern } = matched.groups;
  return pattern;
}
function parseUpdateURLValue(value) {
  if (isURLString(value)) {
    return value;
  } else {
    return null;
  }
}
function* parseMetadataLines(code) {
  const re2 = /^\/\/ @(?<key>[\w-]+)[\s^\n]+(?<value>.*?)[\s^\n]*$/gm;
  for (const { groups } of code.matchAll(re2)) {
    const { key, value } = groups;
    yield { key, value };
  }
}
const e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : global, t$2 = Object.keys, n = Array.isArray;
function r(e2, n2) {
  return "object" != typeof n2 || t$2(n2).forEach(function(t2) {
    e2[t2] = n2[t2];
  }), e2;
}
"undefined" == typeof Promise || e.Promise || (e.Promise = Promise);
const s = Object.getPrototypeOf, i = {}.hasOwnProperty;
function o(e2, t2) {
  return i.call(e2, t2);
}
function a(e2, n2) {
  "function" == typeof n2 && (n2 = n2(s(e2))), ("undefined" == typeof Reflect ? t$2 : Reflect.ownKeys)(n2).forEach((t2) => {
    l(e2, t2, n2[t2]);
  });
}
const u = Object.defineProperty;
function l(e2, t2, n2, s2) {
  u(e2, t2, r(n2 && o(n2, "get") && "function" == typeof n2.get ? { get: n2.get, set: n2.set, configurable: true } : { value: n2, configurable: true, writable: true }, s2));
}
function c(e2) {
  return { from: function(t2) {
    return e2.prototype = Object.create(t2.prototype), l(e2.prototype, "constructor", e2), { extend: a.bind(null, e2.prototype) };
  } };
}
const h = Object.getOwnPropertyDescriptor;
function d(e2, t2) {
  let n2;
  return h(e2, t2) || (n2 = s(e2)) && d(n2, t2);
}
const f = [].slice;
function p(e2, t2, n2) {
  return f.call(e2, t2, n2);
}
function y(e2, t2) {
  return t2(e2);
}
function m(e2) {
  if (!e2)
    throw new Error("Assertion Failed");
}
function v(t2) {
  e.setImmediate ? setImmediate(t2) : setTimeout(t2, 0);
}
function g(e2, t2) {
  return e2.reduce((e3, n2, r2) => {
    var s2 = t2(n2, r2);
    return s2 && (e3[s2[0]] = s2[1]), e3;
  }, {});
}
function b(e2, t2) {
  if ("string" == typeof t2 && o(e2, t2))
    return e2[t2];
  if (!t2)
    return e2;
  if ("string" != typeof t2) {
    for (var n2 = [], r2 = 0, s2 = t2.length; r2 < s2; ++r2) {
      var i2 = b(e2, t2[r2]);
      n2.push(i2);
    }
    return n2;
  }
  var a2 = t2.indexOf(".");
  if (-1 !== a2) {
    var u2 = e2[t2.substr(0, a2)];
    return null == u2 ? void 0 : b(u2, t2.substr(a2 + 1));
  }
}
function _(e2, t2, r2) {
  if (e2 && void 0 !== t2 && (!("isFrozen" in Object) || !Object.isFrozen(e2)))
    if ("string" != typeof t2 && "length" in t2) {
      m("string" != typeof r2 && "length" in r2);
      for (var s2 = 0, i2 = t2.length; s2 < i2; ++s2)
        _(e2, t2[s2], r2[s2]);
    } else {
      var a2 = t2.indexOf(".");
      if (-1 !== a2) {
        var u2 = t2.substr(0, a2), l2 = t2.substr(a2 + 1);
        if ("" === l2)
          void 0 === r2 ? n(e2) && !isNaN(parseInt(u2)) ? e2.splice(u2, 1) : delete e2[u2] : e2[u2] = r2;
        else {
          var c2 = e2[u2];
          c2 && o(e2, u2) || (c2 = e2[u2] = {}), _(c2, l2, r2);
        }
      } else
        void 0 === r2 ? n(e2) && !isNaN(parseInt(t2)) ? e2.splice(t2, 1) : delete e2[t2] : e2[t2] = r2;
    }
}
function w(e2) {
  var t2 = {};
  for (var n2 in e2)
    o(e2, n2) && (t2[n2] = e2[n2]);
  return t2;
}
const x = [].concat;
function k(e2) {
  return x.apply([], e2);
}
const E = "BigUint64Array,BigInt64Array,Array,Boolean,String,Date,RegExp,Blob,File,FileList,FileSystemFileHandle,FileSystemDirectoryHandle,ArrayBuffer,DataView,Uint8ClampedArray,ImageBitmap,ImageData,Map,Set,CryptoKey".split(",").concat(k([8, 16, 32, 64].map((e2) => ["Int", "Uint", "Float"].map((t2) => t2 + e2 + "Array")))).filter((t2) => e[t2]), P = E.map((t2) => e[t2]);
g(E, (e2) => [e2, true]);
let K = null;
function O(e2) {
  K = "undefined" != typeof WeakMap && /* @__PURE__ */ new WeakMap();
  const t2 = S(e2);
  return K = null, t2;
}
function S(e2) {
  if (!e2 || "object" != typeof e2)
    return e2;
  let t2 = K && K.get(e2);
  if (t2)
    return t2;
  if (n(e2)) {
    t2 = [], K && K.set(e2, t2);
    for (var r2 = 0, i2 = e2.length; r2 < i2; ++r2)
      t2.push(S(e2[r2]));
  } else if (P.indexOf(e2.constructor) >= 0)
    t2 = e2;
  else {
    const n2 = s(e2);
    for (var a2 in t2 = n2 === Object.prototype ? {} : Object.create(n2), K && K.set(e2, t2), e2)
      o(e2, a2) && (t2[a2] = S(e2[a2]));
  }
  return t2;
}
const { toString: A } = {};
function C(e2) {
  return A.call(e2).slice(8, -1);
}
const j = "undefined" != typeof Symbol ? Symbol.iterator : "@@iterator", D = "symbol" == typeof j ? function(e2) {
  var t2;
  return null != e2 && (t2 = e2[j]) && t2.apply(e2);
} : function() {
  return null;
}, I = {};
function B(e2) {
  var t2, r2, s2, i2;
  if (1 === arguments.length) {
    if (n(e2))
      return e2.slice();
    if (this === I && "string" == typeof e2)
      return [e2];
    if (i2 = D(e2)) {
      for (r2 = []; !(s2 = i2.next()).done; )
        r2.push(s2.value);
      return r2;
    }
    if (null == e2)
      return [e2];
    if ("number" == typeof (t2 = e2.length)) {
      for (r2 = new Array(t2); t2--; )
        r2[t2] = e2[t2];
      return r2;
    }
    return [e2];
  }
  for (t2 = arguments.length, r2 = new Array(t2); t2--; )
    r2[t2] = arguments[t2];
  return r2;
}
const T = "undefined" != typeof Symbol ? (e2) => "AsyncFunction" === e2[Symbol.toStringTag] : () => false;
var R = "undefined" != typeof location && /^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);
function F(e2, t2) {
  R = e2, M = t2;
}
var M = () => true;
const N = !new Error("").stack;
function q() {
  if (N)
    try {
      throw q.arguments, new Error();
    } catch (e2) {
      return e2;
    }
  return new Error();
}
function $(e2, t2) {
  var n2 = e2.stack;
  return n2 ? (t2 = t2 || 0, 0 === n2.indexOf(e2.name) && (t2 += (e2.name + e2.message).split("\n").length), n2.split("\n").slice(t2).filter(M).map((e3) => "\n" + e3).join("")) : "";
}
var U = ["Unknown", "Constraint", "Data", "TransactionInactive", "ReadOnly", "Version", "NotFound", "InvalidState", "InvalidAccess", "Abort", "Timeout", "QuotaExceeded", "Syntax", "DataClone"], L = ["Modify", "Bulk", "OpenFailed", "VersionChange", "Schema", "Upgrade", "InvalidTable", "MissingAPI", "NoSuchDatabase", "InvalidArgument", "SubTransaction", "Unsupported", "Internal", "DatabaseClosed", "PrematureCommit", "ForeignAwait"].concat(U), V = { VersionChanged: "Database version changed by other database connection", DatabaseClosed: "Database has been closed", Abort: "Transaction aborted", TransactionInactive: "Transaction has already completed or failed", MissingAPI: "IndexedDB API missing. Please visit https://tinyurl.com/y2uuvskb" };
function W(e2, t2) {
  this._e = q(), this.name = e2, this.message = t2;
}
function Y(e2, t2) {
  return e2 + ". Errors: " + Object.keys(t2).map((e3) => t2[e3].toString()).filter((e3, t3, n2) => n2.indexOf(e3) === t3).join("\n");
}
function z(e2, t2, n2, r2) {
  this._e = q(), this.failures = t2, this.failedKeys = r2, this.successCount = n2, this.message = Y(e2, t2);
}
function G(e2, t2) {
  this._e = q(), this.name = "BulkError", this.failures = Object.keys(t2).map((e3) => t2[e3]), this.failuresByPos = t2, this.message = Y(e2, t2);
}
c(W).from(Error).extend({ stack: { get: function() {
  return this._stack || (this._stack = this.name + ": " + this.message + $(this._e, 2));
} }, toString: function() {
  return this.name + ": " + this.message;
} }), c(z).from(W), c(G).from(W);
var H = L.reduce((e2, t2) => (e2[t2] = t2 + "Error", e2), {});
const Q = W;
var X = L.reduce((e2, t2) => {
  var n2 = t2 + "Error";
  function r2(e3, r3) {
    this._e = q(), this.name = n2, e3 ? "string" == typeof e3 ? (this.message = `${e3}${r3 ? "\n " + r3 : ""}`, this.inner = r3 || null) : "object" == typeof e3 && (this.message = `${e3.name} ${e3.message}`, this.inner = e3) : (this.message = V[t2] || n2, this.inner = null);
  }
  return c(r2).from(Q), e2[t2] = r2, e2;
}, {});
X.Syntax = SyntaxError, X.Type = TypeError, X.Range = RangeError;
var J = U.reduce((e2, t2) => (e2[t2 + "Error"] = X[t2], e2), {});
var Z = L.reduce((e2, t2) => (-1 === ["Syntax", "Type", "Range"].indexOf(t2) && (e2[t2 + "Error"] = X[t2]), e2), {});
function ee() {
}
function te(e2) {
  return e2;
}
function ne(e2, t2) {
  return null == e2 || e2 === te ? t2 : function(n2) {
    return t2(e2(n2));
  };
}
function re$3(e2, t2) {
  return function() {
    e2.apply(this, arguments), t2.apply(this, arguments);
  };
}
function se(e2, t2) {
  return e2 === ee ? t2 : function() {
    var n2 = e2.apply(this, arguments);
    void 0 !== n2 && (arguments[0] = n2);
    var r2 = this.onsuccess, s2 = this.onerror;
    this.onsuccess = null, this.onerror = null;
    var i2 = t2.apply(this, arguments);
    return r2 && (this.onsuccess = this.onsuccess ? re$3(r2, this.onsuccess) : r2), s2 && (this.onerror = this.onerror ? re$3(s2, this.onerror) : s2), void 0 !== i2 ? i2 : n2;
  };
}
function ie(e2, t2) {
  return e2 === ee ? t2 : function() {
    e2.apply(this, arguments);
    var n2 = this.onsuccess, r2 = this.onerror;
    this.onsuccess = this.onerror = null, t2.apply(this, arguments), n2 && (this.onsuccess = this.onsuccess ? re$3(n2, this.onsuccess) : n2), r2 && (this.onerror = this.onerror ? re$3(r2, this.onerror) : r2);
  };
}
function oe(e2, t2) {
  return e2 === ee ? t2 : function(n2) {
    var s2 = e2.apply(this, arguments);
    r(n2, s2);
    var i2 = this.onsuccess, o2 = this.onerror;
    this.onsuccess = null, this.onerror = null;
    var a2 = t2.apply(this, arguments);
    return i2 && (this.onsuccess = this.onsuccess ? re$3(i2, this.onsuccess) : i2), o2 && (this.onerror = this.onerror ? re$3(o2, this.onerror) : o2), void 0 === s2 ? void 0 === a2 ? void 0 : a2 : r(s2, a2);
  };
}
function ae(e2, t2) {
  return e2 === ee ? t2 : function() {
    return false !== t2.apply(this, arguments) && e2.apply(this, arguments);
  };
}
function ue(e2, t2) {
  return e2 === ee ? t2 : function() {
    var n2 = e2.apply(this, arguments);
    if (n2 && "function" == typeof n2.then) {
      for (var r2 = this, s2 = arguments.length, i2 = new Array(s2); s2--; )
        i2[s2] = arguments[s2];
      return n2.then(function() {
        return t2.apply(r2, i2);
      });
    }
    return t2.apply(this, arguments);
  };
}
Z.ModifyError = z, Z.DexieError = W, Z.BulkError = G;
var le = {};
const ce = 100, [he, de, fe] = "undefined" == typeof Promise ? [] : (() => {
  let e2 = Promise.resolve();
  if ("undefined" == typeof crypto || !crypto.subtle)
    return [e2, s(e2), e2];
  const t2 = crypto.subtle.digest("SHA-512", new Uint8Array([0]));
  return [t2, s(t2), e2];
})(), pe = de && de.then, ye = he && he.constructor, me = !!fe;
var ve = false, ge = fe ? () => {
  fe.then($e);
} : e.setImmediate ? setImmediate.bind(null, $e) : e.MutationObserver ? () => {
  var e2 = document.createElement("div");
  new MutationObserver(() => {
    $e(), e2 = null;
  }).observe(e2, { attributes: true }), e2.setAttribute("i", "1");
} : () => {
  setTimeout($e, 0);
}, be = function(e2, t2) {
  Se.push([e2, t2]), we && (ge(), we = false);
}, _e = true, we = true, xe = [], ke = [], Ee = null, Pe = te, Ke = { id: "global", global: true, ref: 0, unhandleds: [], onunhandled: dt, pgp: false, env: {}, finalize: function() {
  this.unhandleds.forEach((e2) => {
    try {
      dt(e2[0], e2[1]);
    } catch (e3) {
    }
  });
} }, Oe = Ke, Se = [], Ae = 0, Ce = [];
function je(e2) {
  if ("object" != typeof this)
    throw new TypeError("Promises must be constructed via new");
  this._listeners = [], this.onuncatched = ee, this._lib = false;
  var t2 = this._PSD = Oe;
  if (R && (this._stackHolder = q(), this._prev = null, this._numPrev = 0), "function" != typeof e2) {
    if (e2 !== le)
      throw new TypeError("Not a function");
    return this._state = arguments[1], this._value = arguments[2], void (false === this._state && Te(this, this._value));
  }
  this._state = null, this._value = null, ++t2.ref, Be(this, e2);
}
const De = { get: function() {
  var e2 = Oe, t2 = Xe;
  function n2(n3, r2) {
    var s2 = !e2.global && (e2 !== Oe || t2 !== Xe);
    const i2 = s2 && !tt();
    var o2 = new je((t3, o3) => {
      Fe(this, new Ie(lt$4(n3, e2, s2, i2), lt$4(r2, e2, s2, i2), t3, o3, e2));
    });
    return R && qe(o2, this), o2;
  }
  return n2.prototype = le, n2;
}, set: function(e2) {
  l(this, "then", e2 && e2.prototype === le ? De : { get: function() {
    return e2;
  }, set: De.set });
} };
function Ie(e2, t2, n2, r2, s2) {
  this.onFulfilled = "function" == typeof e2 ? e2 : null, this.onRejected = "function" == typeof t2 ? t2 : null, this.resolve = n2, this.reject = r2, this.psd = s2;
}
function Be(e2, t2) {
  try {
    t2((t3) => {
      if (null === e2._state) {
        if (t3 === e2)
          throw new TypeError("A promise cannot be resolved with itself.");
        var n2 = e2._lib && Ue();
        t3 && "function" == typeof t3.then ? Be(e2, (e3, n3) => {
          t3 instanceof je ? t3._then(e3, n3) : t3.then(e3, n3);
        }) : (e2._state = true, e2._value = t3, Re(e2)), n2 && Le();
      }
    }, Te.bind(null, e2));
  } catch (t3) {
    Te(e2, t3);
  }
}
function Te(e2, t2) {
  if (ke.push(t2), null === e2._state) {
    var n2 = e2._lib && Ue();
    t2 = Pe(t2), e2._state = false, e2._value = t2, R && null !== t2 && "object" == typeof t2 && !t2._promise && function(e3, t3, n3) {
      try {
        e3.apply(null, n3);
      } catch (e4) {
      }
    }(() => {
      var n3 = d(t2, "stack");
      t2._promise = e2, l(t2, "stack", { get: () => ve ? n3 && (n3.get ? n3.get.apply(t2) : n3.value) : e2.stack });
    }), function(e3) {
      xe.some((t3) => t3._value === e3._value) || xe.push(e3);
    }(e2), Re(e2), n2 && Le();
  }
}
function Re(e2) {
  var t2 = e2._listeners;
  e2._listeners = [];
  for (var n2 = 0, r2 = t2.length; n2 < r2; ++n2)
    Fe(e2, t2[n2]);
  var s2 = e2._PSD;
  --s2.ref || s2.finalize(), 0 === Ae && (++Ae, be(() => {
    0 == --Ae && Ve();
  }, []));
}
function Fe(e2, t2) {
  if (null !== e2._state) {
    var n2 = e2._state ? t2.onFulfilled : t2.onRejected;
    if (null === n2)
      return (e2._state ? t2.resolve : t2.reject)(e2._value);
    ++t2.psd.ref, ++Ae, be(Me, [n2, e2, t2]);
  } else
    e2._listeners.push(t2);
}
function Me(e2, t2, n2) {
  try {
    Ee = t2;
    var r2, s2 = t2._value;
    t2._state ? r2 = e2(s2) : (ke.length && (ke = []), r2 = e2(s2), -1 === ke.indexOf(s2) && function(e3) {
      var t3 = xe.length;
      for (; t3; )
        if (xe[--t3]._value === e3._value)
          return void xe.splice(t3, 1);
    }(t2)), n2.resolve(r2);
  } catch (e3) {
    n2.reject(e3);
  } finally {
    Ee = null, 0 == --Ae && Ve(), --n2.psd.ref || n2.psd.finalize();
  }
}
function Ne(e2, t2, n2) {
  if (t2.length === n2)
    return t2;
  var r2 = "";
  if (false === e2._state) {
    var s2, i2, o2 = e2._value;
    null != o2 ? (s2 = o2.name || "Error", i2 = o2.message || o2, r2 = $(o2, 0)) : (s2 = o2, i2 = ""), t2.push(s2 + (i2 ? ": " + i2 : "") + r2);
  }
  return R && ((r2 = $(e2._stackHolder, 2)) && -1 === t2.indexOf(r2) && t2.push(r2), e2._prev && Ne(e2._prev, t2, n2)), t2;
}
function qe(e2, t2) {
  var n2 = t2 ? t2._numPrev + 1 : 0;
  n2 < 100 && (e2._prev = t2, e2._numPrev = n2);
}
function $e() {
  Ue() && Le();
}
function Ue() {
  var e2 = _e;
  return _e = false, we = false, e2;
}
function Le() {
  var e2, t2, n2;
  do {
    for (; Se.length > 0; )
      for (e2 = Se, Se = [], n2 = e2.length, t2 = 0; t2 < n2; ++t2) {
        var r2 = e2[t2];
        r2[0].apply(null, r2[1]);
      }
  } while (Se.length > 0);
  _e = true, we = true;
}
function Ve() {
  var e2 = xe;
  xe = [], e2.forEach((e3) => {
    e3._PSD.onunhandled.call(null, e3._value, e3);
  });
  for (var t2 = Ce.slice(0), n2 = t2.length; n2; )
    t2[--n2]();
}
function We(e2) {
  return new je(le, false, e2);
}
function Ye(e2, t2) {
  var n2 = Oe;
  return function() {
    var r2 = Ue(), s2 = Oe;
    try {
      return it(n2, true), e2.apply(this, arguments);
    } catch (e3) {
      t2 && t2(e3);
    } finally {
      it(s2, false), r2 && Le();
    }
  };
}
a(je.prototype, { then: De, _then: function(e2, t2) {
  Fe(this, new Ie(null, null, e2, t2, Oe));
}, catch: function(e2) {
  if (1 === arguments.length)
    return this.then(null, e2);
  var t2 = arguments[0], n2 = arguments[1];
  return "function" == typeof t2 ? this.then(null, (e3) => e3 instanceof t2 ? n2(e3) : We(e3)) : this.then(null, (e3) => e3 && e3.name === t2 ? n2(e3) : We(e3));
}, finally: function(e2) {
  return this.then((t2) => (e2(), t2), (t2) => (e2(), We(t2)));
}, stack: { get: function() {
  if (this._stack)
    return this._stack;
  try {
    ve = true;
    var e2 = Ne(this, [], 20).join("\nFrom previous: ");
    return null !== this._state && (this._stack = e2), e2;
  } finally {
    ve = false;
  }
} }, timeout: function(e2, t2) {
  return e2 < 1 / 0 ? new je((n2, r2) => {
    var s2 = setTimeout(() => r2(new X.Timeout(t2)), e2);
    this.then(n2, r2).finally(clearTimeout.bind(null, s2));
  }) : this;
} }), "undefined" != typeof Symbol && Symbol.toStringTag && l(je.prototype, Symbol.toStringTag, "Dexie.Promise"), Ke.env = ot(), a(je, { all: function() {
  var e2 = B.apply(null, arguments).map(nt);
  return new je(function(t2, n2) {
    0 === e2.length && t2([]);
    var r2 = e2.length;
    e2.forEach((s2, i2) => je.resolve(s2).then((n3) => {
      e2[i2] = n3, --r2 || t2(e2);
    }, n2));
  });
}, resolve: (e2) => {
  if (e2 instanceof je)
    return e2;
  if (e2 && "function" == typeof e2.then)
    return new je((t3, n2) => {
      e2.then(t3, n2);
    });
  var t2 = new je(le, true, e2);
  return qe(t2, Ee), t2;
}, reject: We, race: function() {
  var e2 = B.apply(null, arguments).map(nt);
  return new je((t2, n2) => {
    e2.map((e3) => je.resolve(e3).then(t2, n2));
  });
}, PSD: { get: () => Oe, set: (e2) => Oe = e2 }, totalEchoes: { get: () => Xe }, newPSD: Ze, usePSD: at, scheduler: { get: () => be, set: (e2) => {
  be = e2;
} }, rejectionMapper: { get: () => Pe, set: (e2) => {
  Pe = e2;
} }, follow: (e2, t2) => new je((n2, r2) => Ze((t3, n3) => {
  var r3 = Oe;
  r3.unhandleds = [], r3.onunhandled = n3, r3.finalize = re$3(function() {
    !function(e3) {
      function t4() {
        e3(), Ce.splice(Ce.indexOf(t4), 1);
      }
      Ce.push(t4), ++Ae, be(() => {
        0 == --Ae && Ve();
      }, []);
    }(() => {
      0 === this.unhandleds.length ? t3() : n3(this.unhandleds[0]);
    });
  }, r3.finalize), e2();
}, t2, n2, r2)) }), ye && (ye.allSettled && l(je, "allSettled", function() {
  const e2 = B.apply(null, arguments).map(nt);
  return new je((t2) => {
    0 === e2.length && t2([]);
    let n2 = e2.length;
    const r2 = new Array(n2);
    e2.forEach((e3, s2) => je.resolve(e3).then((e4) => r2[s2] = { status: "fulfilled", value: e4 }, (e4) => r2[s2] = { status: "rejected", reason: e4 }).then(() => --n2 || t2(r2)));
  });
}), ye.any && "undefined" != typeof AggregateError && l(je, "any", function() {
  const e2 = B.apply(null, arguments).map(nt);
  return new je((t2, n2) => {
    0 === e2.length && n2(new AggregateError([]));
    let r2 = e2.length;
    const s2 = new Array(r2);
    e2.forEach((e3, i2) => je.resolve(e3).then((e4) => t2(e4), (e4) => {
      s2[i2] = e4, --r2 || n2(new AggregateError(s2));
    }));
  });
}));
const ze = { awaits: 0, echoes: 0, id: 0 };
var Ge = 0, He = [], Qe = 0, Xe = 0, Je = 0;
function Ze(e2, t2, n2, s2) {
  var i2 = Oe, o2 = Object.create(i2);
  o2.parent = i2, o2.ref = 0, o2.global = false, o2.id = ++Je;
  var a2 = Ke.env;
  o2.env = me ? { Promise: je, PromiseProp: { value: je, configurable: true, writable: true }, all: je.all, race: je.race, allSettled: je.allSettled, any: je.any, resolve: je.resolve, reject: je.reject, nthen: ct(a2.nthen, o2), gthen: ct(a2.gthen, o2) } : {}, t2 && r(o2, t2), ++i2.ref, o2.finalize = function() {
    --this.parent.ref || this.parent.finalize();
  };
  var u2 = at(o2, e2, n2, s2);
  return 0 === o2.ref && o2.finalize(), u2;
}
function et() {
  return ze.id || (ze.id = ++Ge), ++ze.awaits, ze.echoes += ce, ze.id;
}
function tt() {
  return !!ze.awaits && (0 == --ze.awaits && (ze.id = 0), ze.echoes = ze.awaits * ce, true);
}
function nt(e2) {
  return ze.echoes && e2 && e2.constructor === ye ? (et(), e2.then((e3) => (tt(), e3), (e3) => (tt(), ft(e3)))) : e2;
}
function rt(e2) {
  ++Xe, ze.echoes && 0 != --ze.echoes || (ze.echoes = ze.id = 0), He.push(Oe), it(e2, true);
}
function st() {
  var e2 = He[He.length - 1];
  He.pop(), it(e2, false);
}
function it(t2, n2) {
  var r2 = Oe;
  if ((n2 ? !ze.echoes || Qe++ && t2 === Oe : !Qe || --Qe && t2 === Oe) || ut(n2 ? rt.bind(null, t2) : st), t2 !== Oe && (Oe = t2, r2 === Ke && (Ke.env = ot()), me)) {
    var s2 = Ke.env.Promise, i2 = t2.env;
    de.then = i2.nthen, s2.prototype.then = i2.gthen, (r2.global || t2.global) && (Object.defineProperty(e, "Promise", i2.PromiseProp), s2.all = i2.all, s2.race = i2.race, s2.resolve = i2.resolve, s2.reject = i2.reject, i2.allSettled && (s2.allSettled = i2.allSettled), i2.any && (s2.any = i2.any));
  }
}
function ot() {
  var t2 = e.Promise;
  return me ? { Promise: t2, PromiseProp: Object.getOwnPropertyDescriptor(e, "Promise"), all: t2.all, race: t2.race, allSettled: t2.allSettled, any: t2.any, resolve: t2.resolve, reject: t2.reject, nthen: de.then, gthen: t2.prototype.then } : {};
}
function at(e2, t2, n2, r2, s2) {
  var i2 = Oe;
  try {
    return it(e2, true), t2(n2, r2, s2);
  } finally {
    it(i2, false);
  }
}
function ut(e2) {
  pe.call(he, e2);
}
function lt$4(e2, t2, n2, r2) {
  return "function" != typeof e2 ? e2 : function() {
    var s2 = Oe;
    n2 && et(), it(t2, true);
    try {
      return e2.apply(this, arguments);
    } finally {
      it(s2, false), r2 && ut(tt);
    }
  };
}
function ct(e2, t2) {
  return function(n2, r2) {
    return e2.call(this, lt$4(n2, t2), lt$4(r2, t2));
  };
}
-1 === ("" + pe).indexOf("[native code]") && (et = tt = ee);
const ht = "unhandledrejection";
function dt(t2, n2) {
  var s2;
  try {
    s2 = n2.onuncatched(t2);
  } catch (e2) {
  }
  if (false !== s2)
    try {
      var i2, o2 = { promise: n2, reason: t2 };
      if (e.document && document.createEvent ? ((i2 = document.createEvent("Event")).initEvent(ht, true, true), r(i2, o2)) : e.CustomEvent && r(i2 = new CustomEvent(ht, { detail: o2 }), o2), i2 && e.dispatchEvent && (dispatchEvent(i2), !e.PromiseRejectionEvent && e.onunhandledrejection))
        try {
          e.onunhandledrejection(i2);
        } catch (e2) {
        }
      R && i2 && !i2.defaultPrevented && console.warn(`Unhandled rejection: ${t2.stack || t2}`);
    } catch (e2) {
    }
}
var ft = je.reject;
function pt(e2, t2, n2, r2) {
  if (e2.idbdb && (e2._state.openComplete || Oe.letThrough || e2._vip)) {
    var s2 = e2._createTransaction(t2, n2, e2._dbSchema);
    try {
      s2.create(), e2._state.PR1398_maxLoop = 3;
    } catch (s3) {
      return s3.name === H.InvalidState && e2.isOpen() && --e2._state.PR1398_maxLoop > 0 ? (console.warn("Dexie: Need to reopen db"), e2._close(), e2.open().then(() => pt(e2, t2, n2, r2))) : ft(s3);
    }
    return s2._promise(t2, (e3, t3) => Ze(() => (Oe.trans = s2, r2(e3, t3, s2)))).then((e3) => s2._completion.then(() => e3));
  }
  if (e2._state.openComplete)
    return ft(new X.DatabaseClosed(e2._state.dbOpenError));
  if (!e2._state.isBeingOpened) {
    if (!e2._options.autoOpen)
      return ft(new X.DatabaseClosed());
    e2.open().catch(ee);
  }
  return e2._state.dbReadyPromise.then(() => pt(e2, t2, n2, r2));
}
const yt = "3.2.7", mt = String.fromCharCode(65535), vt = -1 / 0, gt$5 = "Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.", bt = "String expected.", _t = [], wt = "undefined" != typeof navigator && /(MSIE|Trident|Edge)/.test(navigator.userAgent), xt = wt, kt = wt, Et = (e2) => !/(dexie\.js|dexie\.min\.js)/.test(e2), Pt = "__dbnames", Kt = "readonly", Ot = "readwrite";
function St(e2, t2) {
  return e2 ? t2 ? function() {
    return e2.apply(this, arguments) && t2.apply(this, arguments);
  } : e2 : t2;
}
const At = { type: 3, lower: -1 / 0, lowerOpen: false, upper: [[]], upperOpen: false };
function Ct(e2) {
  return "string" != typeof e2 || /\./.test(e2) ? (e3) => e3 : (t2) => (void 0 === t2[e2] && e2 in t2 && delete (t2 = O(t2))[e2], t2);
}
class jt {
  _trans(e2, t2, n2) {
    const r2 = this._tx || Oe.trans, s2 = this.name;
    function i2(e3, n3, r3) {
      if (!r3.schema[s2])
        throw new X.NotFound("Table " + s2 + " not part of transaction");
      return t2(r3.idbtrans, r3);
    }
    const o2 = Ue();
    try {
      return r2 && r2.db === this.db ? r2 === Oe.trans ? r2._promise(e2, i2, n2) : Ze(() => r2._promise(e2, i2, n2), { trans: r2, transless: Oe.transless || Oe }) : pt(this.db, e2, [this.name], i2);
    } finally {
      o2 && Le();
    }
  }
  get(e2, t2) {
    return e2 && e2.constructor === Object ? this.where(e2).first(t2) : this._trans("readonly", (t3) => this.core.get({ trans: t3, key: e2 }).then((e3) => this.hook.reading.fire(e3))).then(t2);
  }
  where(e2) {
    if ("string" == typeof e2)
      return new this.db.WhereClause(this, e2);
    if (n(e2))
      return new this.db.WhereClause(this, `[${e2.join("+")}]`);
    const r2 = t$2(e2);
    if (1 === r2.length)
      return this.where(r2[0]).equals(e2[r2[0]]);
    const s2 = this.schema.indexes.concat(this.schema.primKey).filter((e3) => {
      if (e3.compound && r2.every((t2) => e3.keyPath.indexOf(t2) >= 0)) {
        for (let t2 = 0; t2 < r2.length; ++t2)
          if (-1 === r2.indexOf(e3.keyPath[t2]))
            return false;
        return true;
      }
      return false;
    }).sort((e3, t2) => e3.keyPath.length - t2.keyPath.length)[0];
    if (s2 && this.db._maxKey !== mt) {
      const t2 = s2.keyPath.slice(0, r2.length);
      return this.where(t2).equals(t2.map((t3) => e2[t3]));
    }
    !s2 && R && console.warn(`The query ${JSON.stringify(e2)} on ${this.name} would benefit of a compound index [${r2.join("+")}]`);
    const { idxByName: i2 } = this.schema, o2 = this.db._deps.indexedDB;
    function a2(e3, t2) {
      try {
        return 0 === o2.cmp(e3, t2);
      } catch (e4) {
        return false;
      }
    }
    const [u2, l2] = r2.reduce(([t2, r3], s3) => {
      const o3 = i2[s3], u3 = e2[s3];
      return [t2 || o3, t2 || !o3 ? St(r3, o3 && o3.multi ? (e3) => {
        const t3 = b(e3, s3);
        return n(t3) && t3.some((e4) => a2(u3, e4));
      } : (e3) => a2(u3, b(e3, s3))) : r3];
    }, [null, null]);
    return u2 ? this.where(u2.name).equals(e2[u2.keyPath]).filter(l2) : s2 ? this.filter(l2) : this.where(r2).equals("");
  }
  filter(e2) {
    return this.toCollection().and(e2);
  }
  count(e2) {
    return this.toCollection().count(e2);
  }
  offset(e2) {
    return this.toCollection().offset(e2);
  }
  limit(e2) {
    return this.toCollection().limit(e2);
  }
  each(e2) {
    return this.toCollection().each(e2);
  }
  toArray(e2) {
    return this.toCollection().toArray(e2);
  }
  toCollection() {
    return new this.db.Collection(new this.db.WhereClause(this));
  }
  orderBy(e2) {
    return new this.db.Collection(new this.db.WhereClause(this, n(e2) ? `[${e2.join("+")}]` : e2));
  }
  reverse() {
    return this.toCollection().reverse();
  }
  mapToClass(e2) {
    this.schema.mappedClass = e2;
    const t2 = (t3) => {
      if (!t3)
        return t3;
      const n2 = Object.create(e2.prototype);
      for (var r2 in t3)
        if (o(t3, r2))
          try {
            n2[r2] = t3[r2];
          } catch (e3) {
          }
      return n2;
    };
    return this.schema.readHook && this.hook.reading.unsubscribe(this.schema.readHook), this.schema.readHook = t2, this.hook("reading", t2), e2;
  }
  defineClass() {
    return this.mapToClass(function(e2) {
      r(this, e2);
    });
  }
  add(e2, t2) {
    const { auto: n2, keyPath: r2 } = this.schema.primKey;
    let s2 = e2;
    return r2 && n2 && (s2 = Ct(r2)(e2)), this._trans("readwrite", (e3) => this.core.mutate({ trans: e3, type: "add", keys: null != t2 ? [t2] : null, values: [s2] })).then((e3) => e3.numFailures ? je.reject(e3.failures[0]) : e3.lastResult).then((t3) => {
      if (r2)
        try {
          _(e2, r2, t3);
        } catch (e3) {
        }
      return t3;
    });
  }
  update(e2, r2) {
    if ("object" != typeof e2 || n(e2))
      return this.where(":id").equals(e2).modify(r2);
    {
      const n2 = b(e2, this.schema.primKey.keyPath);
      if (void 0 === n2)
        return ft(new X.InvalidArgument("Given object does not contain its primary key"));
      try {
        "function" != typeof r2 ? t$2(r2).forEach((t2) => {
          _(e2, t2, r2[t2]);
        }) : r2(e2, { value: e2, primKey: n2 });
      } catch (e3) {
      }
      return this.where(":id").equals(n2).modify(r2);
    }
  }
  put(e2, t2) {
    const { auto: n2, keyPath: r2 } = this.schema.primKey;
    let s2 = e2;
    return r2 && n2 && (s2 = Ct(r2)(e2)), this._trans("readwrite", (e3) => this.core.mutate({ trans: e3, type: "put", values: [s2], keys: null != t2 ? [t2] : null })).then((e3) => e3.numFailures ? je.reject(e3.failures[0]) : e3.lastResult).then((t3) => {
      if (r2)
        try {
          _(e2, r2, t3);
        } catch (e3) {
        }
      return t3;
    });
  }
  delete(e2) {
    return this._trans("readwrite", (t2) => this.core.mutate({ trans: t2, type: "delete", keys: [e2] })).then((e3) => e3.numFailures ? je.reject(e3.failures[0]) : void 0);
  }
  clear() {
    return this._trans("readwrite", (e2) => this.core.mutate({ trans: e2, type: "deleteRange", range: At })).then((e2) => e2.numFailures ? je.reject(e2.failures[0]) : void 0);
  }
  bulkGet(e2) {
    return this._trans("readonly", (t2) => this.core.getMany({ keys: e2, trans: t2 }).then((e3) => e3.map((e4) => this.hook.reading.fire(e4))));
  }
  bulkAdd(e2, t2, n2) {
    const r2 = Array.isArray(t2) ? t2 : void 0, s2 = (n2 = n2 || (r2 ? void 0 : t2)) ? n2.allKeys : void 0;
    return this._trans("readwrite", (t3) => {
      const { auto: n3, keyPath: i2 } = this.schema.primKey;
      if (i2 && r2)
        throw new X.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");
      if (r2 && r2.length !== e2.length)
        throw new X.InvalidArgument("Arguments objects and keys must have the same length");
      const o2 = e2.length;
      let a2 = i2 && n3 ? e2.map(Ct(i2)) : e2;
      return this.core.mutate({ trans: t3, type: "add", keys: r2, values: a2, wantResults: s2 }).then(({ numFailures: e3, results: t4, lastResult: n4, failures: r3 }) => {
        if (0 === e3)
          return s2 ? t4 : n4;
        throw new G(`${this.name}.bulkAdd(): ${e3} of ${o2} operations failed`, r3);
      });
    });
  }
  bulkPut(e2, t2, n2) {
    const r2 = Array.isArray(t2) ? t2 : void 0, s2 = (n2 = n2 || (r2 ? void 0 : t2)) ? n2.allKeys : void 0;
    return this._trans("readwrite", (t3) => {
      const { auto: n3, keyPath: i2 } = this.schema.primKey;
      if (i2 && r2)
        throw new X.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");
      if (r2 && r2.length !== e2.length)
        throw new X.InvalidArgument("Arguments objects and keys must have the same length");
      const o2 = e2.length;
      let a2 = i2 && n3 ? e2.map(Ct(i2)) : e2;
      return this.core.mutate({ trans: t3, type: "put", keys: r2, values: a2, wantResults: s2 }).then(({ numFailures: e3, results: t4, lastResult: n4, failures: r3 }) => {
        if (0 === e3)
          return s2 ? t4 : n4;
        throw new G(`${this.name}.bulkPut(): ${e3} of ${o2} operations failed`, r3);
      });
    });
  }
  bulkDelete(e2) {
    const t2 = e2.length;
    return this._trans("readwrite", (t3) => this.core.mutate({ trans: t3, type: "delete", keys: e2 })).then(({ numFailures: e3, lastResult: n2, failures: r2 }) => {
      if (0 === e3)
        return n2;
      throw new G(`${this.name}.bulkDelete(): ${e3} of ${t2} operations failed`, r2);
    });
  }
}
function Dt(e2) {
  var r2 = {}, s2 = function(t2, n2) {
    if (n2) {
      for (var s3 = arguments.length, i3 = new Array(s3 - 1); --s3; )
        i3[s3 - 1] = arguments[s3];
      return r2[t2].subscribe.apply(null, i3), e2;
    }
    if ("string" == typeof t2)
      return r2[t2];
  };
  s2.addEventType = a2;
  for (var i2 = 1, o2 = arguments.length; i2 < o2; ++i2)
    a2(arguments[i2]);
  return s2;
  function a2(e3, i3, o3) {
    if ("object" != typeof e3) {
      var u2;
      i3 || (i3 = ae), o3 || (o3 = ee);
      var l2 = { subscribers: [], fire: o3, subscribe: function(e4) {
        -1 === l2.subscribers.indexOf(e4) && (l2.subscribers.push(e4), l2.fire = i3(l2.fire, e4));
      }, unsubscribe: function(e4) {
        l2.subscribers = l2.subscribers.filter(function(t2) {
          return t2 !== e4;
        }), l2.fire = l2.subscribers.reduce(i3, o3);
      } };
      return r2[e3] = s2[e3] = l2, l2;
    }
    t$2(u2 = e3).forEach(function(e4) {
      var t2 = u2[e4];
      if (n(t2))
        a2(e4, u2[e4][0], u2[e4][1]);
      else {
        if ("asap" !== t2)
          throw new X.InvalidArgument("Invalid event config");
        var r3 = a2(e4, te, function() {
          for (var e5 = arguments.length, t3 = new Array(e5); e5--; )
            t3[e5] = arguments[e5];
          r3.subscribers.forEach(function(e6) {
            v(function() {
              e6.apply(null, t3);
            });
          });
        });
      }
    });
  }
}
function It(e2, t2) {
  return c(t2).from({ prototype: e2 }), t2;
}
function Bt(e2, t2) {
  return !(e2.filter || e2.algorithm || e2.or) && (t2 ? e2.justLimit : !e2.replayFilter);
}
function Tt(e2, t2) {
  e2.filter = St(e2.filter, t2);
}
function Rt(e2, t2, n2) {
  var r2 = e2.replayFilter;
  e2.replayFilter = r2 ? () => St(r2(), t2()) : t2, e2.justLimit = n2 && !r2;
}
function Ft(e2, t2) {
  if (e2.isPrimKey)
    return t2.primaryKey;
  const n2 = t2.getIndexByKeyPath(e2.index);
  if (!n2)
    throw new X.Schema("KeyPath " + e2.index + " on object store " + t2.name + " is not indexed");
  return n2;
}
function Mt(e2, t2, n2) {
  const r2 = Ft(e2, t2.schema);
  return t2.openCursor({ trans: n2, values: !e2.keysOnly, reverse: "prev" === e2.dir, unique: !!e2.unique, query: { index: r2, range: e2.range } });
}
function Nt(e2, t2, n2, r2) {
  const s2 = e2.replayFilter ? St(e2.filter, e2.replayFilter()) : e2.filter;
  if (e2.or) {
    const i2 = {}, a2 = (e3, n3, r3) => {
      if (!s2 || s2(n3, r3, (e4) => n3.stop(e4), (e4) => n3.fail(e4))) {
        var a3 = n3.primaryKey, u2 = "" + a3;
        "[object ArrayBuffer]" === u2 && (u2 = "" + new Uint8Array(a3)), o(i2, u2) || (i2[u2] = true, t2(e3, n3, r3));
      }
    };
    return Promise.all([e2.or._iterate(a2, n2), qt(Mt(e2, r2, n2), e2.algorithm, a2, !e2.keysOnly && e2.valueMapper)]);
  }
  return qt(Mt(e2, r2, n2), St(e2.algorithm, s2), t2, !e2.keysOnly && e2.valueMapper);
}
function qt(e2, t2, n2, r2) {
  var s2 = Ye(r2 ? (e3, t3, s3) => n2(r2(e3), t3, s3) : n2);
  return e2.then((e3) => {
    if (e3)
      return e3.start(() => {
        var n3 = () => e3.continue();
        t2 && !t2(e3, (e4) => n3 = e4, (t3) => {
          e3.stop(t3), n3 = ee;
        }, (t3) => {
          e3.fail(t3), n3 = ee;
        }) || s2(e3.value, e3, (e4) => n3 = e4), n3();
      });
  });
}
function $t(e2, t2) {
  try {
    const n2 = Ut(e2), r2 = Ut(t2);
    if (n2 !== r2)
      return "Array" === n2 ? 1 : "Array" === r2 ? -1 : "binary" === n2 ? 1 : "binary" === r2 ? -1 : "string" === n2 ? 1 : "string" === r2 ? -1 : "Date" === n2 ? 1 : "Date" !== r2 ? NaN : -1;
    switch (n2) {
      case "number":
      case "Date":
      case "string":
        return e2 > t2 ? 1 : e2 < t2 ? -1 : 0;
      case "binary":
        return function(e3, t3) {
          const n3 = e3.length, r3 = t3.length, s2 = n3 < r3 ? n3 : r3;
          for (let n4 = 0; n4 < s2; ++n4)
            if (e3[n4] !== t3[n4])
              return e3[n4] < t3[n4] ? -1 : 1;
          return n3 === r3 ? 0 : n3 < r3 ? -1 : 1;
        }(Lt(e2), Lt(t2));
      case "Array":
        return function(e3, t3) {
          const n3 = e3.length, r3 = t3.length, s2 = n3 < r3 ? n3 : r3;
          for (let n4 = 0; n4 < s2; ++n4) {
            const r4 = $t(e3[n4], t3[n4]);
            if (0 !== r4)
              return r4;
          }
          return n3 === r3 ? 0 : n3 < r3 ? -1 : 1;
        }(e2, t2);
    }
  } catch (e3) {
  }
  return NaN;
}
function Ut(e2) {
  const t2 = typeof e2;
  if ("object" !== t2)
    return t2;
  if (ArrayBuffer.isView(e2))
    return "binary";
  const n2 = C(e2);
  return "ArrayBuffer" === n2 ? "binary" : n2;
}
function Lt(e2) {
  return e2 instanceof Uint8Array ? e2 : ArrayBuffer.isView(e2) ? new Uint8Array(e2.buffer, e2.byteOffset, e2.byteLength) : new Uint8Array(e2);
}
class Vt {
  _read(e2, t2) {
    var n2 = this._ctx;
    return n2.error ? n2.table._trans(null, ft.bind(null, n2.error)) : n2.table._trans("readonly", e2).then(t2);
  }
  _write(e2) {
    var t2 = this._ctx;
    return t2.error ? t2.table._trans(null, ft.bind(null, t2.error)) : t2.table._trans("readwrite", e2, "locked");
  }
  _addAlgorithm(e2) {
    var t2 = this._ctx;
    t2.algorithm = St(t2.algorithm, e2);
  }
  _iterate(e2, t2) {
    return Nt(this._ctx, e2, t2, this._ctx.table.core);
  }
  clone(e2) {
    var t2 = Object.create(this.constructor.prototype), n2 = Object.create(this._ctx);
    return e2 && r(n2, e2), t2._ctx = n2, t2;
  }
  raw() {
    return this._ctx.valueMapper = null, this;
  }
  each(e2) {
    var t2 = this._ctx;
    return this._read((n2) => Nt(t2, e2, n2, t2.table.core));
  }
  count(e2) {
    return this._read((e3) => {
      const t2 = this._ctx, n2 = t2.table.core;
      if (Bt(t2, true))
        return n2.count({ trans: e3, query: { index: Ft(t2, n2.schema), range: t2.range } }).then((e4) => Math.min(e4, t2.limit));
      var r2 = 0;
      return Nt(t2, () => (++r2, false), e3, n2).then(() => r2);
    }).then(e2);
  }
  sortBy(e2, t2) {
    const n2 = e2.split(".").reverse(), r2 = n2[0], s2 = n2.length - 1;
    function i2(e3, t3) {
      return t3 ? i2(e3[n2[t3]], t3 - 1) : e3[r2];
    }
    var o2 = "next" === this._ctx.dir ? 1 : -1;
    function a2(e3, t3) {
      var n3 = i2(e3, s2), r3 = i2(t3, s2);
      return n3 < r3 ? -o2 : n3 > r3 ? o2 : 0;
    }
    return this.toArray(function(e3) {
      return e3.sort(a2);
    }).then(t2);
  }
  toArray(e2) {
    return this._read((e3) => {
      var t2 = this._ctx;
      if ("next" === t2.dir && Bt(t2, true) && t2.limit > 0) {
        const { valueMapper: n2 } = t2, r2 = Ft(t2, t2.table.core.schema);
        return t2.table.core.query({ trans: e3, limit: t2.limit, values: true, query: { index: r2, range: t2.range } }).then(({ result: e4 }) => n2 ? e4.map(n2) : e4);
      }
      {
        const n2 = [];
        return Nt(t2, (e4) => n2.push(e4), e3, t2.table.core).then(() => n2);
      }
    }, e2);
  }
  offset(e2) {
    var t2 = this._ctx;
    return e2 <= 0 || (t2.offset += e2, Bt(t2) ? Rt(t2, () => {
      var t3 = e2;
      return (e3, n2) => 0 === t3 || (1 === t3 ? (--t3, false) : (n2(() => {
        e3.advance(t3), t3 = 0;
      }), false));
    }) : Rt(t2, () => {
      var t3 = e2;
      return () => --t3 < 0;
    })), this;
  }
  limit(e2) {
    return this._ctx.limit = Math.min(this._ctx.limit, e2), Rt(this._ctx, () => {
      var t2 = e2;
      return function(e3, n2, r2) {
        return --t2 <= 0 && n2(r2), t2 >= 0;
      };
    }, true), this;
  }
  until(e2, t2) {
    return Tt(this._ctx, function(n2, r2, s2) {
      return !e2(n2.value) || (r2(s2), t2);
    }), this;
  }
  first(e2) {
    return this.limit(1).toArray(function(e3) {
      return e3[0];
    }).then(e2);
  }
  last(e2) {
    return this.reverse().first(e2);
  }
  filter(e2) {
    var t2, n2;
    return Tt(this._ctx, function(t3) {
      return e2(t3.value);
    }), t2 = this._ctx, n2 = e2, t2.isMatch = St(t2.isMatch, n2), this;
  }
  and(e2) {
    return this.filter(e2);
  }
  or(e2) {
    return new this.db.WhereClause(this._ctx.table, e2, this);
  }
  reverse() {
    return this._ctx.dir = "prev" === this._ctx.dir ? "next" : "prev", this._ondirectionchange && this._ondirectionchange(this._ctx.dir), this;
  }
  desc() {
    return this.reverse();
  }
  eachKey(e2) {
    var t2 = this._ctx;
    return t2.keysOnly = !t2.isMatch, this.each(function(t3, n2) {
      e2(n2.key, n2);
    });
  }
  eachUniqueKey(e2) {
    return this._ctx.unique = "unique", this.eachKey(e2);
  }
  eachPrimaryKey(e2) {
    var t2 = this._ctx;
    return t2.keysOnly = !t2.isMatch, this.each(function(t3, n2) {
      e2(n2.primaryKey, n2);
    });
  }
  keys(e2) {
    var t2 = this._ctx;
    t2.keysOnly = !t2.isMatch;
    var n2 = [];
    return this.each(function(e3, t3) {
      n2.push(t3.key);
    }).then(function() {
      return n2;
    }).then(e2);
  }
  primaryKeys(e2) {
    var t2 = this._ctx;
    if ("next" === t2.dir && Bt(t2, true) && t2.limit > 0)
      return this._read((e3) => {
        var n3 = Ft(t2, t2.table.core.schema);
        return t2.table.core.query({ trans: e3, values: false, limit: t2.limit, query: { index: n3, range: t2.range } });
      }).then(({ result: e3 }) => e3).then(e2);
    t2.keysOnly = !t2.isMatch;
    var n2 = [];
    return this.each(function(e3, t3) {
      n2.push(t3.primaryKey);
    }).then(function() {
      return n2;
    }).then(e2);
  }
  uniqueKeys(e2) {
    return this._ctx.unique = "unique", this.keys(e2);
  }
  firstKey(e2) {
    return this.limit(1).keys(function(e3) {
      return e3[0];
    }).then(e2);
  }
  lastKey(e2) {
    return this.reverse().firstKey(e2);
  }
  distinct() {
    var e2 = this._ctx, t2 = e2.index && e2.table.schema.idxByName[e2.index];
    if (!t2 || !t2.multi)
      return this;
    var n2 = {};
    return Tt(this._ctx, function(e3) {
      var t3 = e3.primaryKey.toString(), r2 = o(n2, t3);
      return n2[t3] = true, !r2;
    }), this;
  }
  modify(e2) {
    var n2 = this._ctx;
    return this._write((r2) => {
      var s2;
      if ("function" == typeof e2)
        s2 = e2;
      else {
        var i2 = t$2(e2), o2 = i2.length;
        s2 = function(t2) {
          for (var n3 = false, r3 = 0; r3 < o2; ++r3) {
            var s3 = i2[r3], a3 = e2[s3];
            b(t2, s3) !== a3 && (_(t2, s3, a3), n3 = true);
          }
          return n3;
        };
      }
      const a2 = n2.table.core, { outbound: u2, extractKey: l2 } = a2.schema.primaryKey, c2 = this.db._options.modifyChunkSize || 200, h2 = [];
      let d2 = 0;
      const f2 = [], p2 = (e3, n3) => {
        const { failures: r3, numFailures: s3 } = n3;
        d2 += e3 - s3;
        for (let e4 of t$2(r3))
          h2.push(r3[e4]);
      };
      return this.clone().primaryKeys().then((t2) => {
        const i3 = (o3) => {
          const h3 = Math.min(c2, t2.length - o3);
          return a2.getMany({ trans: r2, keys: t2.slice(o3, o3 + h3), cache: "immutable" }).then((d3) => {
            const f3 = [], y2 = [], m2 = u2 ? [] : null, v2 = [];
            for (let e3 = 0; e3 < h3; ++e3) {
              const n3 = d3[e3], r3 = { value: O(n3), primKey: t2[o3 + e3] };
              false !== s2.call(r3, r3.value, r3) && (null == r3.value ? v2.push(t2[o3 + e3]) : u2 || 0 === $t(l2(n3), l2(r3.value)) ? (y2.push(r3.value), u2 && m2.push(t2[o3 + e3])) : (v2.push(t2[o3 + e3]), f3.push(r3.value)));
            }
            const g2 = Bt(n2) && n2.limit === 1 / 0 && ("function" != typeof e2 || e2 === Wt) && { index: n2.index, range: n2.range };
            return Promise.resolve(f3.length > 0 && a2.mutate({ trans: r2, type: "add", values: f3 }).then((e3) => {
              for (let t3 in e3.failures)
                v2.splice(parseInt(t3), 1);
              p2(f3.length, e3);
            })).then(() => (y2.length > 0 || g2 && "object" == typeof e2) && a2.mutate({ trans: r2, type: "put", keys: m2, values: y2, criteria: g2, changeSpec: "function" != typeof e2 && e2 }).then((e3) => p2(y2.length, e3))).then(() => (v2.length > 0 || g2 && e2 === Wt) && a2.mutate({ trans: r2, type: "delete", keys: v2, criteria: g2 }).then((e3) => p2(v2.length, e3))).then(() => t2.length > o3 + h3 && i3(o3 + c2));
          });
        };
        return i3(0).then(() => {
          if (h2.length > 0)
            throw new z("Error modifying one or more objects", h2, d2, f2);
          return t2.length;
        });
      });
    });
  }
  delete() {
    var e2 = this._ctx, t2 = e2.range;
    return Bt(e2) && (e2.isPrimKey && !kt || 3 === t2.type) ? this._write((n2) => {
      const { primaryKey: r2 } = e2.table.core.schema, s2 = t2;
      return e2.table.core.count({ trans: n2, query: { index: r2, range: s2 } }).then((t3) => e2.table.core.mutate({ trans: n2, type: "deleteRange", range: s2 }).then(({ failures: e3, lastResult: n3, results: r3, numFailures: s3 }) => {
        if (s3)
          throw new z("Could not delete some values", Object.keys(e3).map((t4) => e3[t4]), t3 - s3);
        return t3 - s3;
      }));
    }) : this.modify(Wt);
  }
}
const Wt = (e2, t2) => t2.value = null;
function Yt(e2, t2) {
  return e2 < t2 ? -1 : e2 === t2 ? 0 : 1;
}
function zt(e2, t2) {
  return e2 > t2 ? -1 : e2 === t2 ? 0 : 1;
}
function Gt(e2, t2, n2) {
  var r2 = e2 instanceof en ? new e2.Collection(e2) : e2;
  return r2._ctx.error = n2 ? new n2(t2) : new TypeError(t2), r2;
}
function Ht(e2) {
  return new e2.Collection(e2, () => Zt("")).limit(0);
}
function Qt(e2, t2, n2, r2, s2, i2) {
  for (var o2 = Math.min(e2.length, r2.length), a2 = -1, u2 = 0; u2 < o2; ++u2) {
    var l2 = t2[u2];
    if (l2 !== r2[u2])
      return s2(e2[u2], n2[u2]) < 0 ? e2.substr(0, u2) + n2[u2] + n2.substr(u2 + 1) : s2(e2[u2], r2[u2]) < 0 ? e2.substr(0, u2) + r2[u2] + n2.substr(u2 + 1) : a2 >= 0 ? e2.substr(0, a2) + t2[a2] + n2.substr(a2 + 1) : null;
    s2(e2[u2], l2) < 0 && (a2 = u2);
  }
  return o2 < r2.length && "next" === i2 ? e2 + n2.substr(e2.length) : o2 < e2.length && "prev" === i2 ? e2.substr(0, n2.length) : a2 < 0 ? null : e2.substr(0, a2) + r2[a2] + n2.substr(a2 + 1);
}
function Xt(e2, t2, n2, r2) {
  var s2, i2, o2, a2, u2, l2, c2, h2 = n2.length;
  if (!n2.every((e3) => "string" == typeof e3))
    return Gt(e2, bt);
  function d2(e3) {
    s2 = /* @__PURE__ */ function(e4) {
      return "next" === e4 ? (e5) => e5.toUpperCase() : (e5) => e5.toLowerCase();
    }(e3), i2 = /* @__PURE__ */ function(e4) {
      return "next" === e4 ? (e5) => e5.toLowerCase() : (e5) => e5.toUpperCase();
    }(e3), o2 = "next" === e3 ? Yt : zt;
    var t3 = n2.map(function(e4) {
      return { lower: i2(e4), upper: s2(e4) };
    }).sort(function(e4, t4) {
      return o2(e4.lower, t4.lower);
    });
    a2 = t3.map(function(e4) {
      return e4.upper;
    }), u2 = t3.map(function(e4) {
      return e4.lower;
    }), l2 = e3, c2 = "next" === e3 ? "" : r2;
  }
  d2("next");
  var f2 = new e2.Collection(e2, () => Jt(a2[0], u2[h2 - 1] + r2));
  f2._ondirectionchange = function(e3) {
    d2(e3);
  };
  var p2 = 0;
  return f2._addAlgorithm(function(e3, n3, r3) {
    var s3 = e3.key;
    if ("string" != typeof s3)
      return false;
    var d3 = i2(s3);
    if (t2(d3, u2, p2))
      return true;
    for (var f3 = null, y2 = p2; y2 < h2; ++y2) {
      var m2 = Qt(s3, d3, a2[y2], u2[y2], o2, l2);
      null === m2 && null === f3 ? p2 = y2 + 1 : (null === f3 || o2(f3, m2) > 0) && (f3 = m2);
    }
    return n3(null !== f3 ? function() {
      e3.continue(f3 + c2);
    } : r3), false;
  }), f2;
}
function Jt(e2, t2, n2, r2) {
  return { type: 2, lower: e2, upper: t2, lowerOpen: n2, upperOpen: r2 };
}
function Zt(e2) {
  return { type: 1, lower: e2, upper: e2 };
}
class en {
  get Collection() {
    return this._ctx.table.db.Collection;
  }
  between(e2, t2, n2, r2) {
    n2 = false !== n2, r2 = true === r2;
    try {
      return this._cmp(e2, t2) > 0 || 0 === this._cmp(e2, t2) && (n2 || r2) && (!n2 || !r2) ? Ht(this) : new this.Collection(this, () => Jt(e2, t2, !n2, !r2));
    } catch (e3) {
      return Gt(this, gt$5);
    }
  }
  equals(e2) {
    return null == e2 ? Gt(this, gt$5) : new this.Collection(this, () => Zt(e2));
  }
  above(e2) {
    return null == e2 ? Gt(this, gt$5) : new this.Collection(this, () => Jt(e2, void 0, true));
  }
  aboveOrEqual(e2) {
    return null == e2 ? Gt(this, gt$5) : new this.Collection(this, () => Jt(e2, void 0, false));
  }
  below(e2) {
    return null == e2 ? Gt(this, gt$5) : new this.Collection(this, () => Jt(void 0, e2, false, true));
  }
  belowOrEqual(e2) {
    return null == e2 ? Gt(this, gt$5) : new this.Collection(this, () => Jt(void 0, e2));
  }
  startsWith(e2) {
    return "string" != typeof e2 ? Gt(this, bt) : this.between(e2, e2 + mt, true, true);
  }
  startsWithIgnoreCase(e2) {
    return "" === e2 ? this.startsWith(e2) : Xt(this, (e3, t2) => 0 === e3.indexOf(t2[0]), [e2], mt);
  }
  equalsIgnoreCase(e2) {
    return Xt(this, (e3, t2) => e3 === t2[0], [e2], "");
  }
  anyOfIgnoreCase() {
    var e2 = B.apply(I, arguments);
    return 0 === e2.length ? Ht(this) : Xt(this, (e3, t2) => -1 !== t2.indexOf(e3), e2, "");
  }
  startsWithAnyOfIgnoreCase() {
    var e2 = B.apply(I, arguments);
    return 0 === e2.length ? Ht(this) : Xt(this, (e3, t2) => t2.some((t3) => 0 === e3.indexOf(t3)), e2, mt);
  }
  anyOf() {
    const e2 = B.apply(I, arguments);
    let t2 = this._cmp;
    try {
      e2.sort(t2);
    } catch (e3) {
      return Gt(this, gt$5);
    }
    if (0 === e2.length)
      return Ht(this);
    const n2 = new this.Collection(this, () => Jt(e2[0], e2[e2.length - 1]));
    n2._ondirectionchange = (n3) => {
      t2 = "next" === n3 ? this._ascending : this._descending, e2.sort(t2);
    };
    let r2 = 0;
    return n2._addAlgorithm((n3, s2, i2) => {
      const o2 = n3.key;
      for (; t2(o2, e2[r2]) > 0; )
        if (++r2, r2 === e2.length)
          return s2(i2), false;
      return 0 === t2(o2, e2[r2]) || (s2(() => {
        n3.continue(e2[r2]);
      }), false);
    }), n2;
  }
  notEqual(e2) {
    return this.inAnyRange([[vt, e2], [e2, this.db._maxKey]], { includeLowers: false, includeUppers: false });
  }
  noneOf() {
    const e2 = B.apply(I, arguments);
    if (0 === e2.length)
      return new this.Collection(this);
    try {
      e2.sort(this._ascending);
    } catch (e3) {
      return Gt(this, gt$5);
    }
    const t2 = e2.reduce((e3, t3) => e3 ? e3.concat([[e3[e3.length - 1][1], t3]]) : [[vt, t3]], null);
    return t2.push([e2[e2.length - 1], this.db._maxKey]), this.inAnyRange(t2, { includeLowers: false, includeUppers: false });
  }
  inAnyRange(e2, t2) {
    const n2 = this._cmp, r2 = this._ascending, s2 = this._descending, i2 = this._min, o2 = this._max;
    if (0 === e2.length)
      return Ht(this);
    if (!e2.every((e3) => void 0 !== e3[0] && void 0 !== e3[1] && r2(e3[0], e3[1]) <= 0))
      return Gt(this, "First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower", X.InvalidArgument);
    const a2 = !t2 || false !== t2.includeLowers, u2 = t2 && true === t2.includeUppers;
    let l2, c2 = r2;
    function h2(e3, t3) {
      return c2(e3[0], t3[0]);
    }
    try {
      l2 = e2.reduce(function(e3, t3) {
        let r3 = 0, s3 = e3.length;
        for (; r3 < s3; ++r3) {
          const s4 = e3[r3];
          if (n2(t3[0], s4[1]) < 0 && n2(t3[1], s4[0]) > 0) {
            s4[0] = i2(s4[0], t3[0]), s4[1] = o2(s4[1], t3[1]);
            break;
          }
        }
        return r3 === s3 && e3.push(t3), e3;
      }, []), l2.sort(h2);
    } catch (e3) {
      return Gt(this, gt$5);
    }
    let d2 = 0;
    const f2 = u2 ? (e3) => r2(e3, l2[d2][1]) > 0 : (e3) => r2(e3, l2[d2][1]) >= 0, p2 = a2 ? (e3) => s2(e3, l2[d2][0]) > 0 : (e3) => s2(e3, l2[d2][0]) >= 0;
    let y2 = f2;
    const m2 = new this.Collection(this, () => Jt(l2[0][0], l2[l2.length - 1][1], !a2, !u2));
    return m2._ondirectionchange = (e3) => {
      "next" === e3 ? (y2 = f2, c2 = r2) : (y2 = p2, c2 = s2), l2.sort(h2);
    }, m2._addAlgorithm((e3, t3, n3) => {
      for (var s3 = e3.key; y2(s3); )
        if (++d2, d2 === l2.length)
          return t3(n3), false;
      return !!function(e4) {
        return !f2(e4) && !p2(e4);
      }(s3) || (0 === this._cmp(s3, l2[d2][1]) || 0 === this._cmp(s3, l2[d2][0]) || t3(() => {
        c2 === r2 ? e3.continue(l2[d2][0]) : e3.continue(l2[d2][1]);
      }), false);
    }), m2;
  }
  startsWithAnyOf() {
    const e2 = B.apply(I, arguments);
    return e2.every((e3) => "string" == typeof e3) ? 0 === e2.length ? Ht(this) : this.inAnyRange(e2.map((e3) => [e3, e3 + mt])) : Gt(this, "startsWithAnyOf() only works with strings");
  }
}
function tn(e2) {
  return Ye(function(t2) {
    return nn(t2), e2(t2.target.error), false;
  });
}
function nn(e2) {
  e2.stopPropagation && e2.stopPropagation(), e2.preventDefault && e2.preventDefault();
}
const rn = "storagemutated", sn = "x-storagemutated-1", on = Dt(null, rn);
class an {
  _lock() {
    return m(!Oe.global), ++this._reculock, 1 !== this._reculock || Oe.global || (Oe.lockOwnerFor = this), this;
  }
  _unlock() {
    if (m(!Oe.global), 0 == --this._reculock)
      for (Oe.global || (Oe.lockOwnerFor = null); this._blockedFuncs.length > 0 && !this._locked(); ) {
        var e2 = this._blockedFuncs.shift();
        try {
          at(e2[1], e2[0]);
        } catch (e3) {
        }
      }
    return this;
  }
  _locked() {
    return this._reculock && Oe.lockOwnerFor !== this;
  }
  create(e2) {
    if (!this.mode)
      return this;
    const t2 = this.db.idbdb, n2 = this.db._state.dbOpenError;
    if (m(!this.idbtrans), !e2 && !t2)
      switch (n2 && n2.name) {
        case "DatabaseClosedError":
          throw new X.DatabaseClosed(n2);
        case "MissingAPIError":
          throw new X.MissingAPI(n2.message, n2);
        default:
          throw new X.OpenFailed(n2);
      }
    if (!this.active)
      throw new X.TransactionInactive();
    return m(null === this._completion._state), (e2 = this.idbtrans = e2 || (this.db.core ? this.db.core.transaction(this.storeNames, this.mode, { durability: this.chromeTransactionDurability }) : t2.transaction(this.storeNames, this.mode, { durability: this.chromeTransactionDurability }))).onerror = Ye((t3) => {
      nn(t3), this._reject(e2.error);
    }), e2.onabort = Ye((t3) => {
      nn(t3), this.active && this._reject(new X.Abort(e2.error)), this.active = false, this.on("abort").fire(t3);
    }), e2.oncomplete = Ye(() => {
      this.active = false, this._resolve(), "mutatedParts" in e2 && on.storagemutated.fire(e2.mutatedParts);
    }), this;
  }
  _promise(e2, t2, n2) {
    if ("readwrite" === e2 && "readwrite" !== this.mode)
      return ft(new X.ReadOnly("Transaction is readonly"));
    if (!this.active)
      return ft(new X.TransactionInactive());
    if (this._locked())
      return new je((r3, s2) => {
        this._blockedFuncs.push([() => {
          this._promise(e2, t2, n2).then(r3, s2);
        }, Oe]);
      });
    if (n2)
      return Ze(() => {
        var e3 = new je((e4, n3) => {
          this._lock();
          const r3 = t2(e4, n3, this);
          r3 && r3.then && r3.then(e4, n3);
        });
        return e3.finally(() => this._unlock()), e3._lib = true, e3;
      });
    var r2 = new je((e3, n3) => {
      var r3 = t2(e3, n3, this);
      r3 && r3.then && r3.then(e3, n3);
    });
    return r2._lib = true, r2;
  }
  _root() {
    return this.parent ? this.parent._root() : this;
  }
  waitFor(e2) {
    var t2 = this._root();
    const n2 = je.resolve(e2);
    if (t2._waitingFor)
      t2._waitingFor = t2._waitingFor.then(() => n2);
    else {
      t2._waitingFor = n2, t2._waitingQueue = [];
      var r2 = t2.idbtrans.objectStore(t2.storeNames[0]);
      !function e3() {
        for (++t2._spinCount; t2._waitingQueue.length; )
          t2._waitingQueue.shift()();
        t2._waitingFor && (r2.get(-1 / 0).onsuccess = e3);
      }();
    }
    var s2 = t2._waitingFor;
    return new je((e3, r3) => {
      n2.then((n3) => t2._waitingQueue.push(Ye(e3.bind(null, n3))), (e4) => t2._waitingQueue.push(Ye(r3.bind(null, e4)))).finally(() => {
        t2._waitingFor === s2 && (t2._waitingFor = null);
      });
    });
  }
  abort() {
    this.active && (this.active = false, this.idbtrans && this.idbtrans.abort(), this._reject(new X.Abort()));
  }
  table(e2) {
    const t2 = this._memoizedTables || (this._memoizedTables = {});
    if (o(t2, e2))
      return t2[e2];
    const n2 = this.schema[e2];
    if (!n2)
      throw new X.NotFound("Table " + e2 + " not part of transaction");
    const r2 = new this.db.Table(e2, n2, this);
    return r2.core = this.db.core.table(e2), t2[e2] = r2, r2;
  }
}
function un(e2, t2, n2, r2, s2, i2, o2) {
  return { name: e2, keyPath: t2, unique: n2, multi: r2, auto: s2, compound: i2, src: (n2 && !o2 ? "&" : "") + (r2 ? "*" : "") + (s2 ? "++" : "") + ln(t2) };
}
function ln(e2) {
  return "string" == typeof e2 ? e2 : e2 ? "[" + [].join.call(e2, "+") + "]" : "";
}
function cn(e2, t2, n2) {
  return { name: e2, primKey: t2, indexes: n2, mappedClass: null, idxByName: g(n2, (e3) => [e3.name, e3]) };
}
let hn = (e2) => {
  try {
    return e2.only([[]]), hn = () => [[]], [[]];
  } catch (e3) {
    return hn = () => mt, mt;
  }
};
function dn(e2) {
  return null == e2 ? () => {
  } : "string" == typeof e2 ? function(e3) {
    const t2 = e3.split(".");
    return 1 === t2.length ? (t3) => t3[e3] : (t3) => b(t3, e3);
  }(e2) : (t2) => b(t2, e2);
}
function fn(e2) {
  return [].slice.call(e2);
}
let pn = 0;
function yn(e2) {
  return null == e2 ? ":id" : "string" == typeof e2 ? e2 : `[${e2.join("+")}]`;
}
function mn(e2, t2, r2) {
  function s2(e3) {
    if (3 === e3.type)
      return null;
    if (4 === e3.type)
      throw new Error("Cannot convert never type to IDBKeyRange");
    const { lower: n2, upper: r3, lowerOpen: s3, upperOpen: i3 } = e3;
    return void 0 === n2 ? void 0 === r3 ? null : t2.upperBound(r3, !!i3) : void 0 === r3 ? t2.lowerBound(n2, !!s3) : t2.bound(n2, r3, !!s3, !!i3);
  }
  const { schema: i2, hasGetAll: o2 } = function(e3, t3) {
    const r3 = fn(e3.objectStoreNames);
    return { schema: { name: e3.name, tables: r3.map((e4) => t3.objectStore(e4)).map((e4) => {
      const { keyPath: t4, autoIncrement: r4 } = e4, s3 = n(t4), i3 = null == t4, o3 = {}, a3 = { name: e4.name, primaryKey: { name: null, isPrimaryKey: true, outbound: i3, compound: s3, keyPath: t4, autoIncrement: r4, unique: true, extractKey: dn(t4) }, indexes: fn(e4.indexNames).map((t5) => e4.index(t5)).map((e5) => {
        const { name: t5, unique: r5, multiEntry: s4, keyPath: i4 } = e5, a4 = { name: t5, compound: n(i4), keyPath: i4, unique: r5, multiEntry: s4, extractKey: dn(i4) };
        return o3[yn(i4)] = a4, a4;
      }), getIndexByKeyPath: (e5) => o3[yn(e5)] };
      return o3[":id"] = a3.primaryKey, null != t4 && (o3[yn(t4)] = a3.primaryKey), a3;
    }) }, hasGetAll: r3.length > 0 && "getAll" in t3.objectStore(r3[0]) && !("undefined" != typeof navigator && /Safari/.test(navigator.userAgent) && !/(Chrome\/|Edge\/)/.test(navigator.userAgent) && [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604) };
  }(e2, r2), a2 = i2.tables.map((e3) => function(e4) {
    const t3 = e4.name;
    return { name: t3, schema: e4, mutate: function({ trans: e5, type: n2, keys: r3, values: i3, range: o3 }) {
      return new Promise((a3, u3) => {
        a3 = Ye(a3);
        const l2 = e5.objectStore(t3), c2 = null == l2.keyPath, h2 = "put" === n2 || "add" === n2;
        if (!h2 && "delete" !== n2 && "deleteRange" !== n2)
          throw new Error("Invalid operation type: " + n2);
        const { length: d2 } = r3 || i3 || { length: 1 };
        if (r3 && i3 && r3.length !== i3.length)
          throw new Error("Given keys array must have same length as given values array.");
        if (0 === d2)
          return a3({ numFailures: 0, failures: {}, results: [], lastResult: void 0 });
        let f2;
        const p2 = [], y2 = [];
        let m2 = 0;
        const v2 = (e6) => {
          ++m2, nn(e6);
        };
        if ("deleteRange" === n2) {
          if (4 === o3.type)
            return a3({ numFailures: m2, failures: y2, results: [], lastResult: void 0 });
          3 === o3.type ? p2.push(f2 = l2.clear()) : p2.push(f2 = l2.delete(s2(o3)));
        } else {
          const [e6, t4] = h2 ? c2 ? [i3, r3] : [i3, null] : [r3, null];
          if (h2)
            for (let r4 = 0; r4 < d2; ++r4)
              p2.push(f2 = t4 && void 0 !== t4[r4] ? l2[n2](e6[r4], t4[r4]) : l2[n2](e6[r4])), f2.onerror = v2;
          else
            for (let t5 = 0; t5 < d2; ++t5)
              p2.push(f2 = l2[n2](e6[t5])), f2.onerror = v2;
        }
        const g2 = (e6) => {
          const t4 = e6.target.result;
          p2.forEach((e7, t5) => null != e7.error && (y2[t5] = e7.error)), a3({ numFailures: m2, failures: y2, results: "delete" === n2 ? r3 : p2.map((e7) => e7.result), lastResult: t4 });
        };
        f2.onerror = (e6) => {
          v2(e6), g2(e6);
        }, f2.onsuccess = g2;
      });
    }, getMany: ({ trans: e5, keys: n2 }) => new Promise((r3, s3) => {
      r3 = Ye(r3);
      const i3 = e5.objectStore(t3), o3 = n2.length, a3 = new Array(o3);
      let u3, l2 = 0, c2 = 0;
      const h2 = (e6) => {
        const t4 = e6.target;
        a3[t4._pos] = t4.result, ++c2 === l2 && r3(a3);
      }, d2 = tn(s3);
      for (let e6 = 0; e6 < o3; ++e6)
        null != n2[e6] && (u3 = i3.get(n2[e6]), u3._pos = e6, u3.onsuccess = h2, u3.onerror = d2, ++l2);
      0 === l2 && r3(a3);
    }), get: ({ trans: e5, key: n2 }) => new Promise((r3, s3) => {
      r3 = Ye(r3);
      const i3 = e5.objectStore(t3).get(n2);
      i3.onsuccess = (e6) => r3(e6.target.result), i3.onerror = tn(s3);
    }), query: /* @__PURE__ */ function(e5) {
      return (n2) => new Promise((r3, i3) => {
        r3 = Ye(r3);
        const { trans: o3, values: a3, limit: u3, query: l2 } = n2, c2 = u3 === 1 / 0 ? void 0 : u3, { index: h2, range: d2 } = l2, f2 = o3.objectStore(t3), p2 = h2.isPrimaryKey ? f2 : f2.index(h2.name), y2 = s2(d2);
        if (0 === u3)
          return r3({ result: [] });
        if (e5) {
          const e6 = a3 ? p2.getAll(y2, c2) : p2.getAllKeys(y2, c2);
          e6.onsuccess = (e7) => r3({ result: e7.target.result }), e6.onerror = tn(i3);
        } else {
          let e6 = 0;
          const t4 = a3 || !("openKeyCursor" in p2) ? p2.openCursor(y2) : p2.openKeyCursor(y2), n3 = [];
          t4.onsuccess = (s3) => {
            const i4 = t4.result;
            return i4 ? (n3.push(a3 ? i4.value : i4.primaryKey), ++e6 === u3 ? r3({ result: n3 }) : void i4.continue()) : r3({ result: n3 });
          }, t4.onerror = tn(i3);
        }
      });
    }(o2), openCursor: function({ trans: e5, values: n2, query: r3, reverse: i3, unique: o3 }) {
      return new Promise((a3, u3) => {
        a3 = Ye(a3);
        const { index: l2, range: c2 } = r3, h2 = e5.objectStore(t3), d2 = l2.isPrimaryKey ? h2 : h2.index(l2.name), f2 = i3 ? o3 ? "prevunique" : "prev" : o3 ? "nextunique" : "next", p2 = n2 || !("openKeyCursor" in d2) ? d2.openCursor(s2(c2), f2) : d2.openKeyCursor(s2(c2), f2);
        p2.onerror = tn(u3), p2.onsuccess = Ye((t4) => {
          const n3 = p2.result;
          if (!n3)
            return void a3(null);
          n3.___id = ++pn, n3.done = false;
          const r4 = n3.continue.bind(n3);
          let s3 = n3.continuePrimaryKey;
          s3 && (s3 = s3.bind(n3));
          const i4 = n3.advance.bind(n3), o4 = () => {
            throw new Error("Cursor not stopped");
          };
          n3.trans = e5, n3.stop = n3.continue = n3.continuePrimaryKey = n3.advance = () => {
            throw new Error("Cursor not started");
          }, n3.fail = Ye(u3), n3.next = function() {
            let e6 = 1;
            return this.start(() => e6-- ? this.continue() : this.stop()).then(() => this);
          }, n3.start = (e6) => {
            const t5 = new Promise((e7, t6) => {
              e7 = Ye(e7), p2.onerror = tn(t6), n3.fail = t6, n3.stop = (t7) => {
                n3.stop = n3.continue = n3.continuePrimaryKey = n3.advance = o4, e7(t7);
              };
            }), a4 = () => {
              if (p2.result)
                try {
                  e6();
                } catch (e7) {
                  n3.fail(e7);
                }
              else
                n3.done = true, n3.start = () => {
                  throw new Error("Cursor behind last entry");
                }, n3.stop();
            };
            return p2.onsuccess = Ye((e7) => {
              p2.onsuccess = a4, a4();
            }), n3.continue = r4, n3.continuePrimaryKey = s3, n3.advance = i4, a4(), t5;
          }, a3(n3);
        }, u3);
      });
    }, count({ query: e5, trans: n2 }) {
      const { index: r3, range: i3 } = e5;
      return new Promise((e6, o3) => {
        const a3 = n2.objectStore(t3), u3 = r3.isPrimaryKey ? a3 : a3.index(r3.name), l2 = s2(i3), c2 = l2 ? u3.count(l2) : u3.count();
        c2.onsuccess = Ye((t4) => e6(t4.target.result)), c2.onerror = tn(o3);
      });
    } };
  }(e3)), u2 = {};
  return a2.forEach((e3) => u2[e3.name] = e3), { stack: "dbcore", transaction: e2.transaction.bind(e2), table(e3) {
    if (!u2[e3])
      throw new Error(`Table '${e3}' not found`);
    return u2[e3];
  }, MIN_KEY: -1 / 0, MAX_KEY: hn(t2), schema: i2 };
}
function vn({ _novip: e2 }, t2) {
  const n2 = t2.db, r2 = function(e3, t3, { IDBKeyRange: n3, indexedDB: r3 }, s2) {
    const i2 = function(e4, t4) {
      return t4.reduce((e5, { create: t5 }) => ({ ...e5, ...t5(e5) }), e4);
    }(mn(t3, n3, s2), e3.dbcore);
    return { dbcore: i2 };
  }(e2._middlewares, n2, e2._deps, t2);
  e2.core = r2.dbcore, e2.tables.forEach((t3) => {
    const n3 = t3.name;
    e2.core.schema.tables.some((e3) => e3.name === n3) && (t3.core = e2.core.table(n3), e2[n3] instanceof e2.Table && (e2[n3].core = t3.core));
  });
}
function gn({ _novip: e2 }, t2, n2, r2) {
  n2.forEach((n3) => {
    const s2 = r2[n3];
    t2.forEach((t3) => {
      const r3 = d(t3, n3);
      (!r3 || "value" in r3 && void 0 === r3.value) && (t3 === e2.Transaction.prototype || t3 instanceof e2.Transaction ? l(t3, n3, { get() {
        return this.table(n3);
      }, set(e3) {
        u(this, n3, { value: e3, writable: true, configurable: true, enumerable: true });
      } }) : t3[n3] = new e2.Table(n3, s2));
    });
  });
}
function bn({ _novip: e2 }, t2) {
  t2.forEach((t3) => {
    for (let n2 in t3)
      t3[n2] instanceof e2.Table && delete t3[n2];
  });
}
function _n(e2, t2) {
  return e2._cfg.version - t2._cfg.version;
}
function wn(e2, n2, r2, s2) {
  const i2 = e2._dbSchema, o2 = e2._createTransaction("readwrite", e2._storeNames, i2);
  o2.create(r2), o2._completion.catch(s2);
  const a2 = o2._reject.bind(o2), u2 = Oe.transless || Oe;
  Ze(() => {
    Oe.trans = o2, Oe.transless = u2, 0 === n2 ? (t$2(i2).forEach((e3) => {
      kn(r2, e3, i2[e3].primKey, i2[e3].indexes);
    }), vn(e2, r2), je.follow(() => e2.on.populate.fire(o2)).catch(a2)) : function({ _novip: e3 }, n3, r3, s3) {
      const i3 = [], o3 = e3._versions;
      let a3 = e3._dbSchema = Pn(e3, e3.idbdb, s3), u3 = false;
      const l2 = o3.filter((e4) => e4._cfg.version >= n3);
      function c2() {
        return i3.length ? je.resolve(i3.shift()(r3.idbtrans)).then(c2) : je.resolve();
      }
      return l2.forEach((o4) => {
        i3.push(() => {
          const i4 = a3, l3 = o4._cfg.dbschema;
          Kn(e3, i4, s3), Kn(e3, l3, s3), a3 = e3._dbSchema = l3;
          const c3 = xn(i4, l3);
          c3.add.forEach((e4) => {
            kn(s3, e4[0], e4[1].primKey, e4[1].indexes);
          }), c3.change.forEach((e4) => {
            if (e4.recreate)
              throw new X.Upgrade("Not yet support for changing primary key");
            {
              const t2 = s3.objectStore(e4.name);
              e4.add.forEach((e5) => En(t2, e5)), e4.change.forEach((e5) => {
                t2.deleteIndex(e5.name), En(t2, e5);
              }), e4.del.forEach((e5) => t2.deleteIndex(e5));
            }
          });
          const h2 = o4._cfg.contentUpgrade;
          if (h2 && o4._cfg.version > n3) {
            vn(e3, s3), r3._memoizedTables = {}, u3 = true;
            let n4 = w(l3);
            c3.del.forEach((e4) => {
              n4[e4] = i4[e4];
            }), bn(e3, [e3.Transaction.prototype]), gn(e3, [e3.Transaction.prototype], t$2(n4), n4), r3.schema = n4;
            const o5 = T(h2);
            let a4;
            o5 && et();
            const d2 = je.follow(() => {
              if (a4 = h2(r3), a4 && o5) {
                var e4 = tt.bind(null, null);
                a4.then(e4, e4);
              }
            });
            return a4 && "function" == typeof a4.then ? je.resolve(a4) : d2.then(() => a4);
          }
        }), i3.push((t2) => {
          if (!u3 || !xt) {
            !function(e4, t3) {
              [].slice.call(t3.db.objectStoreNames).forEach((n4) => null == e4[n4] && t3.db.deleteObjectStore(n4));
            }(o4._cfg.dbschema, t2);
          }
          bn(e3, [e3.Transaction.prototype]), gn(e3, [e3.Transaction.prototype], e3._storeNames, e3._dbSchema), r3.schema = e3._dbSchema;
        });
      }), c2().then(() => {
        var e4, n4;
        n4 = s3, t$2(e4 = a3).forEach((t2) => {
          n4.db.objectStoreNames.contains(t2) || kn(n4, t2, e4[t2].primKey, e4[t2].indexes);
        });
      });
    }(e2, n2, o2, r2).catch(a2);
  });
}
function xn(e2, t2) {
  const n2 = { del: [], add: [], change: [] };
  let r2;
  for (r2 in e2)
    t2[r2] || n2.del.push(r2);
  for (r2 in t2) {
    const s2 = e2[r2], i2 = t2[r2];
    if (s2) {
      const e3 = { name: r2, def: i2, recreate: false, del: [], add: [], change: [] };
      if ("" + (s2.primKey.keyPath || "") != "" + (i2.primKey.keyPath || "") || s2.primKey.auto !== i2.primKey.auto && !wt)
        e3.recreate = true, n2.change.push(e3);
      else {
        const t3 = s2.idxByName, r3 = i2.idxByName;
        let o2;
        for (o2 in t3)
          r3[o2] || e3.del.push(o2);
        for (o2 in r3) {
          const n3 = t3[o2], s3 = r3[o2];
          n3 ? n3.src !== s3.src && e3.change.push(s3) : e3.add.push(s3);
        }
        (e3.del.length > 0 || e3.add.length > 0 || e3.change.length > 0) && n2.change.push(e3);
      }
    } else
      n2.add.push([r2, i2]);
  }
  return n2;
}
function kn(e2, t2, n2, r2) {
  const s2 = e2.db.createObjectStore(t2, n2.keyPath ? { keyPath: n2.keyPath, autoIncrement: n2.auto } : { autoIncrement: n2.auto });
  return r2.forEach((e3) => En(s2, e3)), s2;
}
function En(e2, t2) {
  e2.createIndex(t2.name, t2.keyPath, { unique: t2.unique, multiEntry: t2.multi });
}
function Pn(e2, t2, n2) {
  const r2 = {};
  return p(t2.objectStoreNames, 0).forEach((e3) => {
    const t3 = n2.objectStore(e3);
    let s2 = t3.keyPath;
    const i2 = un(ln(s2), s2 || "", false, false, !!t3.autoIncrement, s2 && "string" != typeof s2, true), o2 = [];
    for (let e4 = 0; e4 < t3.indexNames.length; ++e4) {
      const n3 = t3.index(t3.indexNames[e4]);
      s2 = n3.keyPath;
      var a2 = un(n3.name, s2, !!n3.unique, !!n3.multiEntry, false, s2 && "string" != typeof s2, false);
      o2.push(a2);
    }
    r2[e3] = cn(e3, i2, o2);
  }), r2;
}
function Kn({ _novip: t2 }, n2, r2) {
  const s2 = r2.db.objectStoreNames;
  for (let e2 = 0; e2 < s2.length; ++e2) {
    const i2 = s2[e2], o2 = r2.objectStore(i2);
    t2._hasGetAll = "getAll" in o2;
    for (let e3 = 0; e3 < o2.indexNames.length; ++e3) {
      const t3 = o2.indexNames[e3], r3 = o2.index(t3).keyPath, s3 = "string" == typeof r3 ? r3 : "[" + p(r3).join("+") + "]";
      if (n2[i2]) {
        const e4 = n2[i2].idxByName[s3];
        e4 && (e4.name = t3, delete n2[i2].idxByName[s3], n2[i2].idxByName[t3] = e4);
      }
    }
  }
  "undefined" != typeof navigator && /Safari/.test(navigator.userAgent) && !/(Chrome\/|Edge\/)/.test(navigator.userAgent) && e.WorkerGlobalScope && e instanceof e.WorkerGlobalScope && [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604 && (t2._hasGetAll = false);
}
class On {
  _parseStoresSpec(e2, r2) {
    t$2(e2).forEach((t2) => {
      if (null !== e2[t2]) {
        var s2 = e2[t2].split(",").map((e3, t3) => {
          const r3 = (e3 = e3.trim()).replace(/([&*]|\+\+)/g, ""), s3 = /^\[/.test(r3) ? r3.match(/^\[(.*)\]$/)[1].split("+") : r3;
          return un(r3, s3 || null, /\&/.test(e3), /\*/.test(e3), /\+\+/.test(e3), n(s3), 0 === t3);
        }), i2 = s2.shift();
        if (i2.multi)
          throw new X.Schema("Primary key cannot be multi-valued");
        s2.forEach((e3) => {
          if (e3.auto)
            throw new X.Schema("Only primary key can be marked as autoIncrement (++)");
          if (!e3.keyPath)
            throw new X.Schema("Index must have a name and cannot be an empty string");
        }), r2[t2] = cn(t2, i2, s2);
      }
    });
  }
  stores(e2) {
    const n2 = this.db;
    this._cfg.storesSource = this._cfg.storesSource ? r(this._cfg.storesSource, e2) : e2;
    const s2 = n2._versions, i2 = {};
    let o2 = {};
    return s2.forEach((e3) => {
      r(i2, e3._cfg.storesSource), o2 = e3._cfg.dbschema = {}, e3._parseStoresSpec(i2, o2);
    }), n2._dbSchema = o2, bn(n2, [n2._allTables, n2, n2.Transaction.prototype]), gn(n2, [n2._allTables, n2, n2.Transaction.prototype, this._cfg.tables], t$2(o2), o2), n2._storeNames = t$2(o2), this;
  }
  upgrade(e2) {
    return this._cfg.contentUpgrade = ue(this._cfg.contentUpgrade || ee, e2), this;
  }
}
function Sn(e2, t2) {
  let n2 = e2._dbNamesDB;
  return n2 || (n2 = e2._dbNamesDB = new Xn(Pt, { addons: [], indexedDB: e2, IDBKeyRange: t2 }), n2.version(1).stores({ dbnames: "name" })), n2.table("dbnames");
}
function An(e2) {
  return e2 && "function" == typeof e2.databases;
}
function Cn(e2) {
  return Ze(function() {
    return Oe.letThrough = true, e2();
  });
}
function jn() {
  var e2;
  return !navigator.userAgentData && /Safari\//.test(navigator.userAgent) && !/Chrom(e|ium)\//.test(navigator.userAgent) && indexedDB.databases ? new Promise(function(t2) {
    var n2 = function() {
      return indexedDB.databases().finally(t2);
    };
    e2 = setInterval(n2, 100), n2();
  }).finally(function() {
    return clearInterval(e2);
  }) : Promise.resolve();
}
function Dn(e2) {
  const n2 = e2._state, { indexedDB: r2 } = e2._deps;
  if (n2.isBeingOpened || e2.idbdb)
    return n2.dbReadyPromise.then(() => n2.dbOpenError ? ft(n2.dbOpenError) : e2);
  R && (n2.openCanceller._stackHolder = q()), n2.isBeingOpened = true, n2.dbOpenError = null, n2.openComplete = false;
  const s2 = n2.openCanceller;
  function i2() {
    if (n2.openCanceller !== s2)
      throw new X.DatabaseClosed("db.open() was cancelled");
  }
  let o2 = n2.dbReadyResolve, a2 = null, u2 = false;
  const l2 = () => new je((s3, o3) => {
    if (i2(), !r2)
      throw new X.MissingAPI();
    const l3 = e2.name, c2 = n2.autoSchema ? r2.open(l3) : r2.open(l3, Math.round(10 * e2.verno));
    if (!c2)
      throw new X.MissingAPI();
    c2.onerror = tn(o3), c2.onblocked = Ye(e2._fireOnBlocked), c2.onupgradeneeded = Ye((t2) => {
      if (a2 = c2.transaction, n2.autoSchema && !e2._options.allowEmptyDB) {
        c2.onerror = nn, a2.abort(), c2.result.close();
        const e3 = r2.deleteDatabase(l3);
        e3.onsuccess = e3.onerror = Ye(() => {
          o3(new X.NoSuchDatabase(`Database ${l3} doesnt exist`));
        });
      } else {
        a2.onerror = tn(o3);
        var s4 = t2.oldVersion > Math.pow(2, 62) ? 0 : t2.oldVersion;
        u2 = s4 < 1, e2._novip.idbdb = c2.result, wn(e2, s4 / 10, a2, o3);
      }
    }, o3), c2.onsuccess = Ye(() => {
      a2 = null;
      const r3 = e2._novip.idbdb = c2.result, i3 = p(r3.objectStoreNames);
      if (i3.length > 0)
        try {
          const s4 = r3.transaction(1 === (o4 = i3).length ? o4[0] : o4, "readonly");
          n2.autoSchema ? function({ _novip: e3 }, n3, r4) {
            e3.verno = n3.version / 10;
            const s5 = e3._dbSchema = Pn(0, n3, r4);
            e3._storeNames = p(n3.objectStoreNames, 0), gn(e3, [e3._allTables], t$2(s5), s5);
          }(e2, r3, s4) : (Kn(e2, e2._dbSchema, s4), function(e3, t2) {
            const n3 = xn(Pn(0, e3.idbdb, t2), e3._dbSchema);
            return !(n3.add.length || n3.change.some((e4) => e4.add.length || e4.change.length));
          }(e2, s4) || console.warn("Dexie SchemaDiff: Schema was extended without increasing the number passed to db.version(). Some queries may fail.")), vn(e2, s4);
        } catch (e3) {
        }
      var o4;
      _t.push(e2), r3.onversionchange = Ye((t2) => {
        n2.vcFired = true, e2.on("versionchange").fire(t2);
      }), r3.onclose = Ye((t2) => {
        e2.on("close").fire(t2);
      }), u2 && function({ indexedDB: e3, IDBKeyRange: t2 }, n3) {
        !An(e3) && n3 !== Pt && Sn(e3, t2).put({ name: n3 }).catch(ee);
      }(e2._deps, l3), s3();
    }, o3);
  }).catch((e3) => e3 && "UnknownError" === e3.name && n2.PR1398_maxLoop > 0 ? (n2.PR1398_maxLoop--, console.warn("Dexie: Workaround for Chrome UnknownError on open()"), l2()) : je.reject(e3));
  return je.race([s2, ("undefined" == typeof navigator ? je.resolve() : jn()).then(l2)]).then(() => (i2(), n2.onReadyBeingFired = [], je.resolve(Cn(() => e2.on.ready.fire(e2.vip))).then(function t2() {
    if (n2.onReadyBeingFired.length > 0) {
      let r3 = n2.onReadyBeingFired.reduce(ue, ee);
      return n2.onReadyBeingFired = [], je.resolve(Cn(() => r3(e2.vip))).then(t2);
    }
  }))).finally(() => {
    n2.onReadyBeingFired = null, n2.isBeingOpened = false;
  }).then(() => e2).catch((t2) => {
    n2.dbOpenError = t2;
    try {
      a2 && a2.abort();
    } catch (e3) {
    }
    return s2 === n2.openCanceller && e2._close(), ft(t2);
  }).finally(() => {
    n2.openComplete = true, o2();
  });
}
function In(e2) {
  var t2 = (t3) => e2.next(t3), r2 = i2(t2), s2 = i2((t3) => e2.throw(t3));
  function i2(e3) {
    return (t3) => {
      var i3 = e3(t3), o2 = i3.value;
      return i3.done ? o2 : o2 && "function" == typeof o2.then ? o2.then(r2, s2) : n(o2) ? Promise.all(o2).then(r2, s2) : r2(o2);
    };
  }
  return i2(t2)();
}
function Bn(e2, t2, n2) {
  var r2 = arguments.length;
  if (r2 < 2)
    throw new X.InvalidArgument("Too few arguments");
  for (var s2 = new Array(r2 - 1); --r2; )
    s2[r2 - 1] = arguments[r2];
  return n2 = s2.pop(), [e2, k(s2), n2];
}
function Tn(e2, t2, n2, r2, s2) {
  return je.resolve().then(() => {
    const i2 = Oe.transless || Oe, o2 = e2._createTransaction(t2, n2, e2._dbSchema, r2), a2 = { trans: o2, transless: i2 };
    if (r2)
      o2.idbtrans = r2.idbtrans;
    else
      try {
        o2.create(), e2._state.PR1398_maxLoop = 3;
      } catch (r3) {
        return r3.name === H.InvalidState && e2.isOpen() && --e2._state.PR1398_maxLoop > 0 ? (console.warn("Dexie: Need to reopen db"), e2._close(), e2.open().then(() => Tn(e2, t2, n2, null, s2))) : ft(r3);
      }
    const u2 = T(s2);
    let l2;
    u2 && et();
    const c2 = je.follow(() => {
      if (l2 = s2.call(o2, o2), l2)
        if (u2) {
          var e3 = tt.bind(null, null);
          l2.then(e3, e3);
        } else
          "function" == typeof l2.next && "function" == typeof l2.throw && (l2 = In(l2));
    }, a2);
    return (l2 && "function" == typeof l2.then ? je.resolve(l2).then((e3) => o2.active ? e3 : ft(new X.PrematureCommit("Transaction committed too early. See http://bit.ly/2kdckMn"))) : c2.then(() => l2)).then((e3) => (r2 && o2._resolve(), o2._completion.then(() => e3))).catch((e3) => (o2._reject(e3), ft(e3)));
  });
}
function Rn(e2, t2, r2) {
  const s2 = n(e2) ? e2.slice() : [e2];
  for (let e3 = 0; e3 < r2; ++e3)
    s2.push(t2);
  return s2;
}
const Fn = { stack: "dbcore", name: "VirtualIndexMiddleware", level: 1, create: function(e2) {
  return { ...e2, table(t2) {
    const n2 = e2.table(t2), { schema: r2 } = n2, s2 = {}, i2 = [];
    function o2(e3, t3, n3) {
      const r3 = yn(e3), a3 = s2[r3] = s2[r3] || [], u3 = null == e3 ? 0 : "string" == typeof e3 ? 1 : e3.length, l3 = t3 > 0, c2 = { ...n3, isVirtual: l3, keyTail: t3, keyLength: u3, extractKey: dn(e3), unique: !l3 && n3.unique };
      if (a3.push(c2), c2.isPrimaryKey || i2.push(c2), u3 > 1) {
        o2(2 === u3 ? e3[0] : e3.slice(0, u3 - 1), t3 + 1, n3);
      }
      return a3.sort((e4, t4) => e4.keyTail - t4.keyTail), c2;
    }
    const a2 = o2(r2.primaryKey.keyPath, 0, r2.primaryKey);
    s2[":id"] = [a2];
    for (const e3 of r2.indexes)
      o2(e3.keyPath, 0, e3);
    function u2(t3) {
      const n3 = t3.query.index;
      return n3.isVirtual ? { ...t3, query: { index: n3, range: (r3 = t3.query.range, s3 = n3.keyTail, { type: 1 === r3.type ? 2 : r3.type, lower: Rn(r3.lower, r3.lowerOpen ? e2.MAX_KEY : e2.MIN_KEY, s3), lowerOpen: true, upper: Rn(r3.upper, r3.upperOpen ? e2.MIN_KEY : e2.MAX_KEY, s3), upperOpen: true }) } } : t3;
      var r3, s3;
    }
    const l2 = { ...n2, schema: { ...r2, primaryKey: a2, indexes: i2, getIndexByKeyPath: function(e3) {
      const t3 = s2[yn(e3)];
      return t3 && t3[0];
    } }, count: (e3) => n2.count(u2(e3)), query: (e3) => n2.query(u2(e3)), openCursor(t3) {
      const { keyTail: r3, isVirtual: s3, keyLength: i3 } = t3.query.index;
      if (!s3)
        return n2.openCursor(t3);
      return n2.openCursor(u2(t3)).then((n3) => n3 && function(n4) {
        const s4 = Object.create(n4, { continue: { value: function(s5) {
          null != s5 ? n4.continue(Rn(s5, t3.reverse ? e2.MAX_KEY : e2.MIN_KEY, r3)) : t3.unique ? n4.continue(n4.key.slice(0, i3).concat(t3.reverse ? e2.MIN_KEY : e2.MAX_KEY, r3)) : n4.continue();
        } }, continuePrimaryKey: { value(t4, s5) {
          n4.continuePrimaryKey(Rn(t4, e2.MAX_KEY, r3), s5);
        } }, primaryKey: { get: () => n4.primaryKey }, key: { get() {
          const e3 = n4.key;
          return 1 === i3 ? e3[0] : e3.slice(0, i3);
        } }, value: { get: () => n4.value } });
        return s4;
      }(n3));
    } };
    return l2;
  } };
} };
function Mn(e2, n2, r2, s2) {
  return r2 = r2 || {}, s2 = s2 || "", t$2(e2).forEach((t2) => {
    if (o(n2, t2)) {
      var i2 = e2[t2], a2 = n2[t2];
      if ("object" == typeof i2 && "object" == typeof a2 && i2 && a2) {
        const e3 = C(i2);
        e3 !== C(a2) ? r2[s2 + t2] = n2[t2] : "Object" === e3 ? Mn(i2, a2, r2, s2 + t2 + ".") : i2 !== a2 && (r2[s2 + t2] = n2[t2]);
      } else
        i2 !== a2 && (r2[s2 + t2] = n2[t2]);
    } else
      r2[s2 + t2] = void 0;
  }), t$2(n2).forEach((t2) => {
    o(e2, t2) || (r2[s2 + t2] = n2[t2]);
  }), r2;
}
const Nn = { stack: "dbcore", name: "HooksMiddleware", level: 2, create: (e2) => ({ ...e2, table(t2) {
  const n2 = e2.table(t2), { primaryKey: r2 } = n2.schema, s2 = { ...n2, mutate(e3) {
    const s3 = Oe.trans, { deleting: i2, creating: a2, updating: u2 } = s3.table(t2).hook;
    switch (e3.type) {
      case "add":
        if (a2.fire === ee)
          break;
        return s3._promise("readwrite", () => l2(e3), true);
      case "put":
        if (a2.fire === ee && u2.fire === ee)
          break;
        return s3._promise("readwrite", () => l2(e3), true);
      case "delete":
        if (i2.fire === ee)
          break;
        return s3._promise("readwrite", () => l2(e3), true);
      case "deleteRange":
        if (i2.fire === ee)
          break;
        return s3._promise("readwrite", () => function(e4) {
          return c2(e4.trans, e4.range, 1e4);
        }(e3), true);
    }
    return n2.mutate(e3);
    function l2(e4) {
      const t3 = Oe.trans, s4 = e4.keys || function(e5, t4) {
        return "delete" === t4.type ? t4.keys : t4.keys || t4.values.map(e5.extractKey);
      }(r2, e4);
      if (!s4)
        throw new Error("Keys missing");
      return "delete" !== (e4 = "add" === e4.type || "put" === e4.type ? { ...e4, keys: s4 } : { ...e4 }).type && (e4.values = [...e4.values]), e4.keys && (e4.keys = [...e4.keys]), function(e5, t4, n3) {
        return "add" === t4.type ? Promise.resolve([]) : e5.getMany({ trans: t4.trans, keys: n3, cache: "immutable" });
      }(n2, e4, s4).then((l3) => {
        const c3 = s4.map((n3, s5) => {
          const c4 = l3[s5], h2 = { onerror: null, onsuccess: null };
          if ("delete" === e4.type)
            i2.fire.call(h2, n3, c4, t3);
          else if ("add" === e4.type || void 0 === c4) {
            const i3 = a2.fire.call(h2, n3, e4.values[s5], t3);
            null == n3 && null != i3 && (n3 = i3, e4.keys[s5] = n3, r2.outbound || _(e4.values[s5], r2.keyPath, n3));
          } else {
            const r3 = Mn(c4, e4.values[s5]), i3 = u2.fire.call(h2, r3, n3, c4, t3);
            if (i3) {
              const t4 = e4.values[s5];
              Object.keys(i3).forEach((e5) => {
                o(t4, e5) ? t4[e5] = i3[e5] : _(t4, e5, i3[e5]);
              });
            }
          }
          return h2;
        });
        return n2.mutate(e4).then(({ failures: t4, results: n3, numFailures: r3, lastResult: i3 }) => {
          for (let r4 = 0; r4 < s4.length; ++r4) {
            const i4 = n3 ? n3[r4] : s4[r4], o2 = c3[r4];
            null == i4 ? o2.onerror && o2.onerror(t4[r4]) : o2.onsuccess && o2.onsuccess("put" === e4.type && l3[r4] ? e4.values[r4] : i4);
          }
          return { failures: t4, results: n3, numFailures: r3, lastResult: i3 };
        }).catch((e5) => (c3.forEach((t4) => t4.onerror && t4.onerror(e5)), Promise.reject(e5)));
      });
    }
    function c2(e4, t3, s4) {
      return n2.query({ trans: e4, values: false, query: { index: r2, range: t3 }, limit: s4 }).then(({ result: n3 }) => l2({ type: "delete", keys: n3, trans: e4 }).then((r3) => r3.numFailures > 0 ? Promise.reject(r3.failures[0]) : n3.length < s4 ? { failures: [], numFailures: 0, lastResult: void 0 } : c2(e4, { ...t3, lower: n3[n3.length - 1], lowerOpen: true }, s4)));
    }
  } };
  return s2;
} }) };
function qn(e2, t2, n2) {
  try {
    if (!t2)
      return null;
    if (t2.keys.length < e2.length)
      return null;
    const r2 = [];
    for (let s2 = 0, i2 = 0; s2 < t2.keys.length && i2 < e2.length; ++s2)
      0 === $t(t2.keys[s2], e2[i2]) && (r2.push(n2 ? O(t2.values[s2]) : t2.values[s2]), ++i2);
    return r2.length === e2.length ? r2 : null;
  } catch (e3) {
    return null;
  }
}
const $n = { stack: "dbcore", level: -1, create: (e2) => ({ table: (t2) => {
  const n2 = e2.table(t2);
  return { ...n2, getMany: (e3) => {
    if (!e3.cache)
      return n2.getMany(e3);
    const t3 = qn(e3.keys, e3.trans._cache, "clone" === e3.cache);
    return t3 ? je.resolve(t3) : n2.getMany(e3).then((t4) => (e3.trans._cache = { keys: e3.keys, values: "clone" === e3.cache ? O(t4) : t4 }, t4));
  }, mutate: (e3) => ("add" !== e3.type && (e3.trans._cache = null), n2.mutate(e3)) };
} }) };
function Un(e2) {
  return !("from" in e2);
}
const Ln = function(e2, t2) {
  if (!this) {
    const t3 = new Ln();
    return e2 && "d" in e2 && r(t3, e2), t3;
  }
  r(this, arguments.length ? { d: 1, from: e2, to: arguments.length > 1 ? t2 : e2 } : { d: 0 });
};
function Vn(e2, t2, n2) {
  const s2 = $t(t2, n2);
  if (isNaN(s2))
    return;
  if (s2 > 0)
    throw RangeError();
  if (Un(e2))
    return r(e2, { from: t2, to: n2, d: 1 });
  const i2 = e2.l, o2 = e2.r;
  if ($t(n2, e2.from) < 0)
    return i2 ? Vn(i2, t2, n2) : e2.l = { from: t2, to: n2, d: 1, l: null, r: null }, Gn(e2);
  if ($t(t2, e2.to) > 0)
    return o2 ? Vn(o2, t2, n2) : e2.r = { from: t2, to: n2, d: 1, l: null, r: null }, Gn(e2);
  $t(t2, e2.from) < 0 && (e2.from = t2, e2.l = null, e2.d = o2 ? o2.d + 1 : 1), $t(n2, e2.to) > 0 && (e2.to = n2, e2.r = null, e2.d = e2.l ? e2.l.d + 1 : 1);
  const a2 = !e2.r;
  i2 && !e2.l && Wn(e2, i2), o2 && a2 && Wn(e2, o2);
}
function Wn(e2, t2) {
  Un(t2) || function e3(t3, { from: n2, to: r2, l: s2, r: i2 }) {
    Vn(t3, n2, r2), s2 && e3(t3, s2), i2 && e3(t3, i2);
  }(e2, t2);
}
function Yn(e2, t2) {
  const n2 = zn(t2);
  let r2 = n2.next();
  if (r2.done)
    return false;
  let s2 = r2.value;
  const i2 = zn(e2);
  let o2 = i2.next(s2.from), a2 = o2.value;
  for (; !r2.done && !o2.done; ) {
    if ($t(a2.from, s2.to) <= 0 && $t(a2.to, s2.from) >= 0)
      return true;
    $t(s2.from, a2.from) < 0 ? s2 = (r2 = n2.next(a2.from)).value : a2 = (o2 = i2.next(s2.from)).value;
  }
  return false;
}
function zn(e2) {
  let t2 = Un(e2) ? null : { s: 0, n: e2 };
  return { next(e3) {
    const n2 = arguments.length > 0;
    for (; t2; )
      switch (t2.s) {
        case 0:
          if (t2.s = 1, n2)
            for (; t2.n.l && $t(e3, t2.n.from) < 0; )
              t2 = { up: t2, n: t2.n.l, s: 1 };
          else
            for (; t2.n.l; )
              t2 = { up: t2, n: t2.n.l, s: 1 };
        case 1:
          if (t2.s = 2, !n2 || $t(e3, t2.n.to) <= 0)
            return { value: t2.n, done: false };
        case 2:
          if (t2.n.r) {
            t2.s = 3, t2 = { up: t2, n: t2.n.r, s: 0 };
            continue;
          }
        case 3:
          t2 = t2.up;
      }
    return { done: true };
  } };
}
function Gn(e2) {
  var t2, n2;
  const r2 = ((null === (t2 = e2.r) || void 0 === t2 ? void 0 : t2.d) || 0) - ((null === (n2 = e2.l) || void 0 === n2 ? void 0 : n2.d) || 0), s2 = r2 > 1 ? "r" : r2 < -1 ? "l" : "";
  if (s2) {
    const t3 = "r" === s2 ? "l" : "r", n3 = { ...e2 }, r3 = e2[s2];
    e2.from = r3.from, e2.to = r3.to, e2[s2] = r3[s2], n3[s2] = r3[t3], e2[t3] = n3, n3.d = Hn(n3);
  }
  e2.d = Hn(e2);
}
function Hn({ r: e2, l: t2 }) {
  return (e2 ? t2 ? Math.max(e2.d, t2.d) : e2.d : t2 ? t2.d : 0) + 1;
}
a(Ln.prototype, { add(e2) {
  return Wn(this, e2), this;
}, addKey(e2) {
  return Vn(this, e2, e2), this;
}, addKeys(e2) {
  return e2.forEach((e3) => Vn(this, e3, e3)), this;
}, [j]() {
  return zn(this);
} });
const Qn = { stack: "dbcore", level: 0, create: (e2) => {
  const r2 = e2.schema.name, s2 = new Ln(e2.MIN_KEY, e2.MAX_KEY);
  return { ...e2, table: (i2) => {
    const o2 = e2.table(i2), { schema: a2 } = o2, { primaryKey: u2 } = a2, { extractKey: l2, outbound: c2 } = u2, h2 = { ...o2, mutate: (e3) => {
      const t2 = e3.trans, u3 = t2.mutatedParts || (t2.mutatedParts = {}), l3 = (e4) => {
        const t3 = `idb://${r2}/${i2}/${e4}`;
        return u3[t3] || (u3[t3] = new Ln());
      }, c3 = l3(""), h3 = l3(":dels"), { type: d3 } = e3;
      let [f3, p2] = "deleteRange" === e3.type ? [e3.range] : "delete" === e3.type ? [e3.keys] : e3.values.length < 50 ? [[], e3.values] : [];
      const y2 = e3.trans._cache;
      return o2.mutate(e3).then((e4) => {
        if (n(f3)) {
          "delete" !== d3 && (f3 = e4.results), c3.addKeys(f3);
          const t3 = qn(f3, y2);
          t3 || "add" === d3 || h3.addKeys(f3), (t3 || p2) && function(e5, t4, r3, s3) {
            function i3(t5) {
              const i4 = e5(t5.name || "");
              function o3(e6) {
                return null != e6 ? t5.extractKey(e6) : null;
              }
              const a3 = (e6) => t5.multiEntry && n(e6) ? e6.forEach((e7) => i4.addKey(e7)) : i4.addKey(e6);
              (r3 || s3).forEach((e6, t6) => {
                const n2 = r3 && o3(r3[t6]), i5 = s3 && o3(s3[t6]);
                0 !== $t(n2, i5) && (null != n2 && a3(n2), null != i5 && a3(i5));
              });
            }
            t4.indexes.forEach(i3);
          }(l3, a2, t3, p2);
        } else if (f3) {
          const e5 = { from: f3.lower, to: f3.upper };
          h3.add(e5), c3.add(e5);
        } else
          c3.add(s2), h3.add(s2), a2.indexes.forEach((e5) => l3(e5.name).add(s2));
        return e4;
      });
    } }, d2 = ({ query: { index: t2, range: n2 } }) => {
      var r3, s3;
      return [t2, new Ln(null !== (r3 = n2.lower) && void 0 !== r3 ? r3 : e2.MIN_KEY, null !== (s3 = n2.upper) && void 0 !== s3 ? s3 : e2.MAX_KEY)];
    }, f2 = { get: (e3) => [u2, new Ln(e3.key)], getMany: (e3) => [u2, new Ln().addKeys(e3.keys)], count: d2, query: d2, openCursor: d2 };
    return t$2(f2).forEach((e3) => {
      h2[e3] = function(t2) {
        const { subscr: n2 } = Oe;
        if (n2) {
          const a3 = (e4) => {
            const t3 = `idb://${r2}/${i2}/${e4}`;
            return n2[t3] || (n2[t3] = new Ln());
          }, u3 = a3(""), h3 = a3(":dels"), [d3, p2] = f2[e3](t2);
          if (a3(d3.name || "").add(p2), !d3.isPrimaryKey) {
            if ("count" !== e3) {
              const n3 = "query" === e3 && c2 && t2.values && o2.query({ ...t2, values: false });
              return o2[e3].apply(this, arguments).then((r3) => {
                if ("query" === e3) {
                  if (c2 && t2.values)
                    return n3.then(({ result: e5 }) => (u3.addKeys(e5), r3));
                  const e4 = t2.values ? r3.result.map(l2) : r3.result;
                  t2.values ? u3.addKeys(e4) : h3.addKeys(e4);
                } else if ("openCursor" === e3) {
                  const e4 = r3, n4 = t2.values;
                  return e4 && Object.create(e4, { key: { get: () => (h3.addKey(e4.primaryKey), e4.key) }, primaryKey: { get() {
                    const t3 = e4.primaryKey;
                    return h3.addKey(t3), t3;
                  } }, value: { get: () => (n4 && u3.addKey(e4.primaryKey), e4.value) } });
                }
                return r3;
              });
            }
            h3.add(s2);
          }
        }
        return o2[e3].apply(this, arguments);
      };
    }), h2;
  } };
} };
class Xn {
  constructor(e2, t2) {
    this._middlewares = {}, this.verno = 0;
    const n2 = Xn.dependencies;
    this._options = t2 = { addons: Xn.addons, autoOpen: true, indexedDB: n2.indexedDB, IDBKeyRange: n2.IDBKeyRange, ...t2 }, this._deps = { indexedDB: t2.indexedDB, IDBKeyRange: t2.IDBKeyRange };
    const { addons: r2 } = t2;
    this._dbSchema = {}, this._versions = [], this._storeNames = [], this._allTables = {}, this.idbdb = null, this._novip = this;
    const s2 = { dbOpenError: null, isBeingOpened: false, onReadyBeingFired: null, openComplete: false, dbReadyResolve: ee, dbReadyPromise: null, cancelOpen: ee, openCanceller: null, autoSchema: true, PR1398_maxLoop: 3 };
    var i2;
    s2.dbReadyPromise = new je((e3) => {
      s2.dbReadyResolve = e3;
    }), s2.openCanceller = new je((e3, t3) => {
      s2.cancelOpen = t3;
    }), this._state = s2, this.name = e2, this.on = Dt(this, "populate", "blocked", "versionchange", "close", { ready: [ue, ee] }), this.on.ready.subscribe = y(this.on.ready.subscribe, (e3) => (t3, n3) => {
      Xn.vip(() => {
        const r3 = this._state;
        if (r3.openComplete)
          r3.dbOpenError || je.resolve().then(t3), n3 && e3(t3);
        else if (r3.onReadyBeingFired)
          r3.onReadyBeingFired.push(t3), n3 && e3(t3);
        else {
          e3(t3);
          const r4 = this;
          n3 || e3(function e4() {
            r4.on.ready.unsubscribe(t3), r4.on.ready.unsubscribe(e4);
          });
        }
      });
    }), this.Collection = (i2 = this, It(Vt.prototype, function(e3, t3) {
      this.db = i2;
      let n3 = At, r3 = null;
      if (t3)
        try {
          n3 = t3();
        } catch (e4) {
          r3 = e4;
        }
      const s3 = e3._ctx, o2 = s3.table, a2 = o2.hook.reading.fire;
      this._ctx = { table: o2, index: s3.index, isPrimKey: !s3.index || o2.schema.primKey.keyPath && s3.index === o2.schema.primKey.name, range: n3, keysOnly: false, dir: "next", unique: "", algorithm: null, filter: null, replayFilter: null, justLimit: true, isMatch: null, offset: 0, limit: 1 / 0, error: r3, or: s3.or, valueMapper: a2 !== te ? a2 : null };
    })), this.Table = function(e3) {
      return It(jt.prototype, function(t3, n3, r3) {
        this.db = e3, this._tx = r3, this.name = t3, this.schema = n3, this.hook = e3._allTables[t3] ? e3._allTables[t3].hook : Dt(null, { creating: [se, ee], reading: [ne, te], updating: [oe, ee], deleting: [ie, ee] });
      });
    }(this), this.Transaction = function(e3) {
      return It(an.prototype, function(t3, n3, r3, s3, i3) {
        this.db = e3, this.mode = t3, this.storeNames = n3, this.schema = r3, this.chromeTransactionDurability = s3, this.idbtrans = null, this.on = Dt(this, "complete", "error", "abort"), this.parent = i3 || null, this.active = true, this._reculock = 0, this._blockedFuncs = [], this._resolve = null, this._reject = null, this._waitingFor = null, this._waitingQueue = null, this._spinCount = 0, this._completion = new je((e4, t4) => {
          this._resolve = e4, this._reject = t4;
        }), this._completion.then(() => {
          this.active = false, this.on.complete.fire();
        }, (e4) => {
          var t4 = this.active;
          return this.active = false, this.on.error.fire(e4), this.parent ? this.parent._reject(e4) : t4 && this.idbtrans && this.idbtrans.abort(), ft(e4);
        });
      });
    }(this), this.Version = function(e3) {
      return It(On.prototype, function(t3) {
        this.db = e3, this._cfg = { version: t3, storesSource: null, dbschema: {}, tables: {}, contentUpgrade: null };
      });
    }(this), this.WhereClause = function(e3) {
      return It(en.prototype, function(t3, n3, r3) {
        this.db = e3, this._ctx = { table: t3, index: ":id" === n3 ? null : n3, or: r3 };
        const s3 = e3._deps.indexedDB;
        if (!s3)
          throw new X.MissingAPI();
        this._cmp = this._ascending = s3.cmp.bind(s3), this._descending = (e4, t4) => s3.cmp(t4, e4), this._max = (e4, t4) => s3.cmp(e4, t4) > 0 ? e4 : t4, this._min = (e4, t4) => s3.cmp(e4, t4) < 0 ? e4 : t4, this._IDBKeyRange = e3._deps.IDBKeyRange;
      });
    }(this), this.on("versionchange", (e3) => {
      e3.newVersion > 0 ? console.warn(`Another connection wants to upgrade database '${this.name}'. Closing db now to resume the upgrade.`) : console.warn(`Another connection wants to delete database '${this.name}'. Closing db now to resume the delete request.`), this.close();
    }), this.on("blocked", (e3) => {
      !e3.newVersion || e3.newVersion < e3.oldVersion ? console.warn(`Dexie.delete('${this.name}') was blocked`) : console.warn(`Upgrade '${this.name}' blocked by other connection holding version ${e3.oldVersion / 10}`);
    }), this._maxKey = hn(t2.IDBKeyRange), this._createTransaction = (e3, t3, n3, r3) => new this.Transaction(e3, t3, n3, this._options.chromeTransactionDurability, r3), this._fireOnBlocked = (e3) => {
      this.on("blocked").fire(e3), _t.filter((e4) => e4.name === this.name && e4 !== this && !e4._state.vcFired).map((t3) => t3.on("versionchange").fire(e3));
    }, this.use(Fn), this.use(Nn), this.use(Qn), this.use($n), this.vip = Object.create(this, { _vip: { value: true } }), r2.forEach((e3) => e3(this));
  }
  version(e2) {
    if (isNaN(e2) || e2 < 0.1)
      throw new X.Type("Given version is not a positive number");
    if (e2 = Math.round(10 * e2) / 10, this.idbdb || this._state.isBeingOpened)
      throw new X.Schema("Cannot add version when database is open");
    this.verno = Math.max(this.verno, e2);
    const t2 = this._versions;
    var n2 = t2.filter((t3) => t3._cfg.version === e2)[0];
    return n2 || (n2 = new this.Version(e2), t2.push(n2), t2.sort(_n), n2.stores({}), this._state.autoSchema = false, n2);
  }
  _whenReady(e2) {
    return this.idbdb && (this._state.openComplete || Oe.letThrough || this._vip) ? e2() : new je((e3, t2) => {
      if (this._state.openComplete)
        return t2(new X.DatabaseClosed(this._state.dbOpenError));
      if (!this._state.isBeingOpened) {
        if (!this._options.autoOpen)
          return void t2(new X.DatabaseClosed());
        this.open().catch(ee);
      }
      this._state.dbReadyPromise.then(e3, t2);
    }).then(e2);
  }
  use({ stack: e2, create: t2, level: n2, name: r2 }) {
    r2 && this.unuse({ stack: e2, name: r2 });
    const s2 = this._middlewares[e2] || (this._middlewares[e2] = []);
    return s2.push({ stack: e2, create: t2, level: null == n2 ? 10 : n2, name: r2 }), s2.sort((e3, t3) => e3.level - t3.level), this;
  }
  unuse({ stack: e2, name: t2, create: n2 }) {
    return e2 && this._middlewares[e2] && (this._middlewares[e2] = this._middlewares[e2].filter((e3) => n2 ? e3.create !== n2 : !!t2 && e3.name !== t2)), this;
  }
  open() {
    return Dn(this);
  }
  _close() {
    const e2 = this._state, t2 = _t.indexOf(this);
    if (t2 >= 0 && _t.splice(t2, 1), this.idbdb) {
      try {
        this.idbdb.close();
      } catch (e3) {
      }
      this._novip.idbdb = null;
    }
    e2.dbReadyPromise = new je((t3) => {
      e2.dbReadyResolve = t3;
    }), e2.openCanceller = new je((t3, n2) => {
      e2.cancelOpen = n2;
    });
  }
  close() {
    this._close();
    const e2 = this._state;
    this._options.autoOpen = false, e2.dbOpenError = new X.DatabaseClosed(), e2.isBeingOpened && e2.cancelOpen(e2.dbOpenError);
  }
  delete() {
    const e2 = arguments.length > 0, t2 = this._state;
    return new je((n2, r2) => {
      const s2 = () => {
        this.close();
        var e3 = this._deps.indexedDB.deleteDatabase(this.name);
        e3.onsuccess = Ye(() => {
          !function({ indexedDB: e4, IDBKeyRange: t3 }, n3) {
            !An(e4) && n3 !== Pt && Sn(e4, t3).delete(n3).catch(ee);
          }(this._deps, this.name), n2();
        }), e3.onerror = tn(r2), e3.onblocked = this._fireOnBlocked;
      };
      if (e2)
        throw new X.InvalidArgument("Arguments not allowed in db.delete()");
      t2.isBeingOpened ? t2.dbReadyPromise.then(s2) : s2();
    });
  }
  backendDB() {
    return this.idbdb;
  }
  isOpen() {
    return null !== this.idbdb;
  }
  hasBeenClosed() {
    const e2 = this._state.dbOpenError;
    return e2 && "DatabaseClosed" === e2.name;
  }
  hasFailed() {
    return null !== this._state.dbOpenError;
  }
  dynamicallyOpened() {
    return this._state.autoSchema;
  }
  get tables() {
    return t$2(this._allTables).map((e2) => this._allTables[e2]);
  }
  transaction() {
    const e2 = Bn.apply(this, arguments);
    return this._transaction.apply(this, e2);
  }
  _transaction(e2, t2, n2) {
    let r2 = Oe.trans;
    r2 && r2.db === this && -1 === e2.indexOf("!") || (r2 = null);
    const s2 = -1 !== e2.indexOf("?");
    let i2, o2;
    e2 = e2.replace("!", "").replace("?", "");
    try {
      if (o2 = t2.map((e3) => {
        var t3 = e3 instanceof this.Table ? e3.name : e3;
        if ("string" != typeof t3)
          throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");
        return t3;
      }), "r" == e2 || e2 === Kt)
        i2 = Kt;
      else {
        if ("rw" != e2 && e2 != Ot)
          throw new X.InvalidArgument("Invalid transaction mode: " + e2);
        i2 = Ot;
      }
      if (r2) {
        if (r2.mode === Kt && i2 === Ot) {
          if (!s2)
            throw new X.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");
          r2 = null;
        }
        r2 && o2.forEach((e3) => {
          if (r2 && -1 === r2.storeNames.indexOf(e3)) {
            if (!s2)
              throw new X.SubTransaction("Table " + e3 + " not included in parent transaction.");
            r2 = null;
          }
        }), s2 && r2 && !r2.active && (r2 = null);
      }
    } catch (e3) {
      return r2 ? r2._promise(null, (t3, n3) => {
        n3(e3);
      }) : ft(e3);
    }
    const a2 = Tn.bind(null, this, i2, o2, r2, n2);
    return r2 ? r2._promise(i2, a2, "lock") : Oe.trans ? at(Oe.transless, () => this._whenReady(a2)) : this._whenReady(a2);
  }
  table(e2) {
    if (!o(this._allTables, e2))
      throw new X.InvalidTable(`Table ${e2} does not exist`);
    return this._allTables[e2];
  }
}
const Jn = "undefined" != typeof Symbol && "observable" in Symbol ? Symbol.observable : "@@observable";
class Zn {
  constructor(e2) {
    this._subscribe = e2;
  }
  subscribe(e2, t2, n2) {
    return this._subscribe(e2 && "function" != typeof e2 ? e2 : { next: e2, error: t2, complete: n2 });
  }
  [Jn]() {
    return this;
  }
}
function er(e2, n2) {
  return t$2(n2).forEach((t2) => {
    Wn(e2[t2] || (e2[t2] = new Ln()), n2[t2]);
  }), e2;
}
function tr(e2) {
  let n2, r2 = false;
  const s2 = new Zn((s3) => {
    const i2 = T(e2);
    let o2 = false, a2 = {}, u2 = {};
    const l2 = { get closed() {
      return o2;
    }, unsubscribe: () => {
      o2 = true, on.storagemutated.unsubscribe(f2);
    } };
    s3.start && s3.start(l2);
    let c2 = false, h2 = false;
    function d2() {
      return t$2(u2).some((e3) => a2[e3] && Yn(a2[e3], u2[e3]));
    }
    const f2 = (e3) => {
      er(a2, e3), d2() && p2();
    }, p2 = () => {
      if (c2 || o2)
        return;
      a2 = {};
      const t2 = {}, y2 = function(t3) {
        i2 && et();
        const n3 = () => Ze(e2, { subscr: t3, trans: null }), r3 = Oe.trans ? at(Oe.transless, n3) : n3();
        return i2 && r3.then(tt, tt), r3;
      }(t2);
      h2 || (on(rn, f2), h2 = true), c2 = true, Promise.resolve(y2).then((e3) => {
        r2 = true, n2 = e3, c2 = false, o2 || (d2() ? p2() : (a2 = {}, u2 = t2, s3.next && s3.next(e3)));
      }, (e3) => {
        c2 = false, r2 = false, s3.error && s3.error(e3), l2.unsubscribe();
      });
    };
    return p2(), l2;
  });
  return s2.hasValue = () => r2, s2.getValue = () => n2, s2;
}
let nr;
try {
  nr = { indexedDB: e.indexedDB || e.mozIndexedDB || e.webkitIndexedDB || e.msIndexedDB, IDBKeyRange: e.IDBKeyRange || e.webkitIDBKeyRange };
} catch (e2) {
  nr = { indexedDB: null, IDBKeyRange: null };
}
const rr = Xn;
function sr(e2) {
  let t2 = ir;
  try {
    ir = true, on.storagemutated.fire(e2);
  } finally {
    ir = t2;
  }
}
a(rr, { ...Z, delete: (e2) => new rr(e2, { addons: [] }).delete(), exists: (e2) => new rr(e2, { addons: [] }).open().then((e3) => (e3.close(), true)).catch("NoSuchDatabaseError", () => false), getDatabaseNames(e2) {
  try {
    return function({ indexedDB: e3, IDBKeyRange: t2 }) {
      return An(e3) ? Promise.resolve(e3.databases()).then((e4) => e4.map((e5) => e5.name).filter((e5) => e5 !== Pt)) : Sn(e3, t2).toCollection().primaryKeys();
    }(rr.dependencies).then(e2);
  } catch (e3) {
    return ft(new X.MissingAPI());
  }
}, defineClass: () => function(e2) {
  r(this, e2);
}, ignoreTransaction: (e2) => Oe.trans ? at(Oe.transless, e2) : e2(), vip: Cn, async: function(e2) {
  return function() {
    try {
      var t2 = In(e2.apply(this, arguments));
      return t2 && "function" == typeof t2.then ? t2 : je.resolve(t2);
    } catch (e3) {
      return ft(e3);
    }
  };
}, spawn: function(e2, t2, n2) {
  try {
    var r2 = In(e2.apply(n2, t2 || []));
    return r2 && "function" == typeof r2.then ? r2 : je.resolve(r2);
  } catch (e3) {
    return ft(e3);
  }
}, currentTransaction: { get: () => Oe.trans || null }, waitFor: function(e2, t2) {
  const n2 = je.resolve("function" == typeof e2 ? rr.ignoreTransaction(e2) : e2).timeout(t2 || 6e4);
  return Oe.trans ? Oe.trans.waitFor(n2) : n2;
}, Promise: je, debug: { get: () => R, set: (e2) => {
  F(e2, "dexie" === e2 ? () => true : Et);
} }, derive: c, extend: r, props: a, override: y, Events: Dt, on, liveQuery: tr, extendObservabilitySet: er, getByKeyPath: b, setByKeyPath: _, delByKeyPath: function(e2, t2) {
  "string" == typeof t2 ? _(e2, t2, void 0) : "length" in t2 && [].map.call(t2, function(t3) {
    _(e2, t3, void 0);
  });
}, shallowClone: w, deepClone: O, getObjectDiff: Mn, cmp: $t, asap: v, minKey: vt, addons: [], connections: _t, errnames: H, dependencies: nr, semVer: yt, version: yt.split(".").map((e2) => parseInt(e2)).reduce((e2, t2, n2) => e2 + t2 / Math.pow(10, 2 * n2)) }), rr.maxKey = hn(rr.dependencies.IDBKeyRange), "undefined" != typeof dispatchEvent && "undefined" != typeof addEventListener && (on(rn, (e2) => {
  if (!ir) {
    let t2;
    wt ? (t2 = document.createEvent("CustomEvent"), t2.initCustomEvent(sn, true, true, e2)) : t2 = new CustomEvent(sn, { detail: e2 }), ir = true, dispatchEvent(t2), ir = false;
  }
}), addEventListener(sn, ({ detail: e2 }) => {
  ir || sr(e2);
}));
let ir = false;
if ("undefined" != typeof BroadcastChannel) {
  const e2 = new BroadcastChannel(sn);
  "function" == typeof e2.unref && e2.unref(), on(rn, (t2) => {
    ir || e2.postMessage(t2);
  }), e2.onmessage = (e3) => {
    e3.data && sr(e3.data);
  };
} else if ("undefined" != typeof self && "undefined" != typeof navigator) {
  on(rn, (e3) => {
    try {
      ir || ("undefined" != typeof localStorage && localStorage.setItem(sn, JSON.stringify({ trig: Math.random(), changedParts: e3 })), "object" == typeof self.clients && [...self.clients.matchAll({ includeUncontrolled: true })].forEach((t2) => t2.postMessage({ type: sn, changedParts: e3 })));
    } catch (e4) {
    }
  }), "undefined" != typeof addEventListener && addEventListener("storage", (e3) => {
    if (e3.key === sn) {
      const t2 = JSON.parse(e3.newValue);
      t2 && sr(t2.changedParts);
    }
  });
  const e2 = self.document && navigator.serviceWorker;
  e2 && e2.addEventListener("message", function({ data: e3 }) {
    e3 && e3.type === sn && sr(e3.changedParts);
  });
}
je.rejectionMapper = function(e2, t2) {
  if (!e2 || e2 instanceof W || e2 instanceof TypeError || e2 instanceof SyntaxError || !e2.name || !J[e2.name])
    return e2;
  var n2 = new J[e2.name](t2 || e2.message, e2);
  return "stack" in e2 && l(n2, "stack", { get: function() {
    return this.inner.stack;
  } }), n2;
}, F(R, Et);
function map(...args) {
  if (args.length === 1) {
    const [fn2] = args;
    return (strings, ...values) => {
      return map(fn2, strings, ...values);
    };
  } else {
    const [fn2, strings, ...values] = args;
    const newValues = values.map((x2, i2) => fn2(x2, i2));
    return [strings, ...newValues];
  }
}
function last(xs) {
  return xs[xs.length - 1];
}
function concat(strings, ...values) {
  const arr = [];
  for (let i2 = 0; i2 < values.length; i2++) {
    arr.push(strings[i2]);
    arr.push(`${values[i2]}`);
  }
  arr.push(last(strings));
  return arr.join("");
}
function indentMultilineValues(strings, ...values) {
  const newValues = values.map((value, i2) => {
    if (isMultiline(value)) {
      const indent = getLastLineIndent(strings[i2]);
      return indentExceptFirstLine(indent, value);
    } else {
      return value;
    }
  });
  return [strings, ...newValues];
}
function indentExceptFirstLine(indent, text) {
  const lines = text.split("\n");
  const linesExcpetFirst = lines.slice(1);
  return [
    lines[0],
    ...linesExcpetFirst.map((x2) => `${indent}${x2}`)
  ].join("\n");
}
function isMultiline(text) {
  return text.includes("\n");
}
function getLastLineIndent(text) {
  const result = text.match(/\n(\s+)$/);
  if (result) {
    return result[1];
  } else {
    return "";
  }
}
function dedent(strings, ...values) {
  return pipe([strings, ...values], (params) => map(String, ...params), (params) => indentMultilineValues(...params), (params) => concat(...params), (text) => removeLeadingBlankLines(text, 1), (text) => removeTrailingBlankLines(text, 1), (text) => removeExtraIndents(text, { ignoreBlankLines: true }));
}
function javascript(strings, ...values) {
  return dedent(...map(stringifyJavaScriptValue, strings, ...values));
}
function stringifyJavaScriptValue(val) {
  if (isString$1(val))
    return stringifyString(val);
  if (isBigInt$1(val))
    return stringifyBigInt(val);
  if (isArray$1(val))
    return stringifyArray(val);
  if (isFunction$1(val))
    return stringifyFunction(val);
  if (isObject$1(val))
    return stringifyObject(val);
  return `${val}`;
}
function stringifyFunction(fn2) {
  return fn2.toString();
}
function stringifyString(text) {
  return JSON.stringify(text);
}
function stringifyObject(obj) {
  const body = Object.entries(obj).map(([key, value]) => {
    return `${stringifyJavaScriptValue(key)}: ${stringifyJavaScriptValue(value)}`;
  }).join(",");
  return "{" + body + "}";
}
function stringifyArray(arr) {
  const body = arr.map((x2) => stringifyJavaScriptValue(x2)).join(",");
  return "[" + body + "]";
}
function stringifyBigInt(val) {
  return `BigInt(${stringifyJavaScriptValue(val.toString())})`;
}
function esm(code) {
  return javascript`
    window.loadESMScript = loadESMScript;
    async function loadESMScript(script) {
      const blob = new Blob([script], { type: 'application/javascript' })
      const url = URL.createObjectURL(blob)
      await import(url)
      URL.revokeObjectURL(url)
    }
    loadESMScript(${code});
  `;
}
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}
const byteToHex = [];
for (let i2 = 0; i2 < 256; ++i2) {
  byteToHex.push((i2 + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}
const randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const native = {
  randomUUID
};
function v4(options, buf, offset) {
  if (native.randomUUID && !buf && !options) {
    return native.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  return unsafeStringify(rnds);
}
async function configureCSP() {
  await chrome.userScripts.configureWorld({
    csp: "default-src * data: blob: 'unsafe-eval' 'unsafe-inline'"
  });
}
async function unregisterAllUserScripts() {
  await chrome.userScripts.unregister();
}
async function registerUserScript(id, matches, code) {
  await unregisterUserScript(id);
  await chrome.userScripts.register([{
    id,
    matches,
    js: [{ code: esm(code) }],
    runAt: "document_start"
  }]);
}
async function unregisterUserScript(id) {
  try {
    await chrome.userScripts.unregister({ ids: [id] });
  } catch {
    lib$2.pass();
  }
}
function generateUserScriptId() {
  return v4();
}
class Database extends Xn {
  constructor() {
    super("Database");
    this.version(1).stores({ userScripts: "++id, enabled" });
    this.version(2).stores({ userScripts: "id, enabled" }).upgrade(async (tx) => {
      await tx.table("userScripts").toCollection().modify((userScript) => {
        userScript.id = generateUserScriptId();
        delete userScript.name;
        delete userScript.urlPatterns;
      });
    });
    this.version(3).stores({ userScripts: "id, enabled" }).upgrade(async (tx) => {
      await tx.table("userScripts").toCollection().modify((userScript) => {
        userScript.id = generateUserScriptId();
      });
    });
    this.userScripts = this.table("userScripts");
  }
}
class DAO {
  constructor() {
    this.db = new Database();
  }
  async getAllUserScripts() {
    const objects = await this.db.userScripts.toArray();
    return objects.map(convertUserScriptObjectToUserScript);
  }
  async getAllEnabledUserScripts() {
    const objects = await this.db.userScripts.where("enabled").equals(
      1
      /* True */
    ).toArray();
    return objects.map(convertUserScriptObjectToUserScript);
  }
  async getUserScript(id) {
    const object2 = await this.db.userScripts.get(id);
    if (object2) {
      return convertUserScriptObjectToUserScript(object2);
    } else {
      return null;
    }
  }
  async deleteUserScript(id) {
    await this.db.userScripts.delete(id);
  }
  async updateUserScriptEnabled(id, enabled) {
    await this.db.userScripts.update(id, {
      enabled: enabled ? 1 : 0
      /* False */
    });
  }
  async upsertUserScript(id, code) {
    await this.db.transaction("rw", this.db.userScripts, async () => {
      const object2 = await this.db.userScripts.get(id);
      if (object2) {
        await this.db.userScripts.update(id, { code });
      } else {
        await this.db.userScripts.add({
          id,
          code,
          enabled: 1
          /* True */
        });
      }
    });
  }
}
function convertUserScriptObjectToUserScript(obj) {
  const metadata = parseMetadata(obj.code);
  return {
    id: obj.id,
    code: obj.code,
    enabled: obj.enabled === 1,
    name: metadata.name,
    matches: metadata.matches,
    updateURLs: metadata.updateURLs
  };
}
async function migrate(previousVersion) {
  await pipeAsync(previousVersion);
}
function isDelightRPC(val) {
  return isPlainObject$2(val) && val.protocol === "delight-rpc" && (isUndefined$1(val.channel) || isString$1(val.channel)) && (isString$1(val.version) && /^3\.\d+$/.test(val.version));
}
const version = "3.1";
var lib$1 = {};
var getProp$1 = {};
Object.defineProperty(getProp$1, "__esModule", { value: true });
getProp$1.tryGetOwnProp = getProp$1.getOwnProp = getProp$1.tryGetProp = getProp$1.getProp = void 0;
function getProp(obj, path) {
  return _getProp(obj, path, (obj2, prop) => prop in obj2);
}
getProp$1.getProp = getProp;
function tryGetProp(obj, path, defaultValue) {
  try {
    return getProp(obj, path);
  } catch (_a) {
    return defaultValue;
  }
}
getProp$1.tryGetProp = tryGetProp;
function getOwnProp(obj, path) {
  return _getProp(obj, path, (obj2, prop) => Object.prototype.hasOwnProperty.call(obj2, prop));
}
getProp$1.getOwnProp = getOwnProp;
function tryGetOwnProp(obj, path, defaultValue) {
  try {
    return getOwnProp(obj, path);
  } catch (_a) {
    return defaultValue;
  }
}
getProp$1.tryGetOwnProp = tryGetOwnProp;
function _getProp(obj, path, exists) {
  if (path.length === 0)
    throw new Error("The parameter path cannot be empty");
  let temp = obj;
  for (let i2 = 0; i2 < path.length; i2++) {
    const prop = path[i2];
    if (exists(temp, prop)) {
      temp = temp[prop];
    } else {
      const failedPath = path.slice(0, i2 + 1);
      throw new Error(`The path .${failedPath.join(".")} does not exist`);
    }
  }
  return temp;
}
var setProp$1 = {};
Object.defineProperty(setProp$1, "__esModule", { value: true });
setProp$1.trySetOwnProp = setProp$1.setOwnProp = setProp$1.trySetProp = setProp$1.setProp = void 0;
function setProp(obj, path, value) {
  return _setProp(obj, path, value, (obj2, prop) => prop in obj2);
}
setProp$1.setProp = setProp;
function trySetProp(obj, path, value) {
  try {
    return setProp(obj, path, value);
  } catch (_a) {
    return false;
  }
}
setProp$1.trySetProp = trySetProp;
function setOwnProp(obj, path, value) {
  return _setProp(obj, path, value, (obj2, prop) => Object.prototype.hasOwnProperty.call(obj2, prop));
}
setProp$1.setOwnProp = setOwnProp;
function trySetOwnProp(obj, path, value) {
  try {
    return setOwnProp(obj, path, value);
  } catch (_a) {
    return false;
  }
}
setProp$1.trySetOwnProp = trySetOwnProp;
function _setProp(obj, path, value, exists) {
  if (path.length === 0)
    throw new Error("The parameter path cannot be empty");
  const lastIndex = path.length - 1;
  let temp = obj;
  for (let i2 = 0; i2 < path.length; i2++) {
    const key = path[i2];
    if (i2 === lastIndex) {
      return Reflect.set(temp, key, value);
    } else {
      if (exists(temp, key)) {
        temp = temp[key];
      } else {
        const failedPath = path.slice(0, i2 + 1);
        throw new Error(`The path .${failedPath.join(".")} does not exist`);
      }
    }
  }
  return false;
}
var removeProp$1 = {};
Object.defineProperty(removeProp$1, "__esModule", { value: true });
removeProp$1.tryRemoveOwnProp = removeProp$1.removeOwnProp = removeProp$1.tryRemoveProp = removeProp$1.removeProp = void 0;
function removeProp(obj, path) {
  return _removeProp(obj, path, (obj2, prop) => prop in obj2);
}
removeProp$1.removeProp = removeProp;
function tryRemoveProp(obj, path) {
  try {
    return removeProp(obj, path);
  } catch (_a) {
    return false;
  }
}
removeProp$1.tryRemoveProp = tryRemoveProp;
function removeOwnProp(obj, path) {
  return _removeProp(obj, path, (obj2, prop) => Object.prototype.hasOwnProperty.call(obj2, prop));
}
removeProp$1.removeOwnProp = removeOwnProp;
function tryRemoveOwnProp(obj, path) {
  try {
    return removeOwnProp(obj, path);
  } catch (_a) {
    return false;
  }
}
removeProp$1.tryRemoveOwnProp = tryRemoveOwnProp;
function _removeProp(obj, path, exists) {
  if (path.length === 0)
    throw new Error("The parameter path cannot be empty");
  const lastIndex = path.length - 1;
  let temp = obj;
  for (let i2 = 0; i2 < path.length; i2++) {
    const prop = path[i2];
    if (exists(temp, prop)) {
      if (i2 === lastIndex) {
        return Reflect.deleteProperty(temp, prop);
      } else {
        temp = temp[prop];
      }
    } else {
      const failedPath = path.slice(0, i2 + 1);
      throw new Error(`The path .${failedPath.join(".")} does not exist`);
    }
  }
  return false;
}
var propExists$1 = {};
Object.defineProperty(propExists$1, "__esModule", { value: true });
propExists$1.tryOwnPropExists = propExists$1.ownPropExists = propExists$1.tryPropExists = propExists$1.propExists = void 0;
function propExists(obj, path) {
  return _propExists(obj, path, (obj2, prop) => prop in obj2);
}
propExists$1.propExists = propExists;
function tryPropExists(obj, path) {
  try {
    return propExists(obj, path);
  } catch (_a) {
    return false;
  }
}
propExists$1.tryPropExists = tryPropExists;
function ownPropExists(obj, path) {
  return _propExists(obj, path, (obj2, prop) => Object.prototype.hasOwnProperty.call(obj2, prop));
}
propExists$1.ownPropExists = ownPropExists;
function tryOwnPropExists(obj, path) {
  try {
    return ownPropExists(obj, path);
  } catch (_a) {
    return false;
  }
}
propExists$1.tryOwnPropExists = tryOwnPropExists;
function _propExists(obj, path, exists) {
  if (path.length === 0)
    throw new Error("The parameter path cannot be empty");
  let temp = obj;
  for (let i2 = 0; i2 < path.length; i2++) {
    const prop = path[i2];
    if (exists(temp, prop)) {
      temp = temp[prop];
    } else {
      return false;
    }
  }
  return true;
}
(function(exports) {
  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o2, m2, k2, k22) {
    if (k22 === void 0)
      k22 = k2;
    var desc = Object.getOwnPropertyDescriptor(m2, k2);
    if (!desc || ("get" in desc ? !m2.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m2[k2];
      } };
    }
    Object.defineProperty(o2, k22, desc);
  } : function(o2, m2, k2, k22) {
    if (k22 === void 0)
      k22 = k2;
    o2[k22] = m2[k2];
  });
  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function(m2, exports2) {
    for (var p2 in m2)
      if (p2 !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p2))
        __createBinding(exports2, m2, p2);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  __exportStar(getProp$1, exports);
  __exportStar(setProp$1, exports);
  __exportStar(removeProp$1, exports);
  __exportStar(propExists$1, exports);
})(lib$1);
function createResult(id, value, channel) {
  const result = {
    protocol: "delight-rpc",
    version,
    id,
    result: value
  };
  if (isntUndefined$1(channel)) {
    result.channel = channel;
  }
  return result;
}
function createError(id, error2, channel) {
  const err = {
    protocol: "delight-rpc",
    version,
    id,
    error: normalize$2(error2)
  };
  if (isntUndefined$1(channel)) {
    err.channel = channel;
  }
  return err;
}
function isRequest(val) {
  return isDelightRPC(val) && isString$1(val.id) && (isNull$1(val.expectedVersion) || isUndefined$1(val.expectedVersion) || isString$1(val.expectedVersion)) && (isArray$1(val.method) && val.method.every(isString$1)) && isArray$1(val.params);
}
function isBatchRequest(val) {
  return isDelightRPC(val) && isString$1(val.id) && isBoolean$1(val.parallel) && isArray$1(val.requests) && val.requests.every((request) => isObject$1(request) && (isArray$1(request.method) && request.method.every(isString$1)) && isArray$1(request.params));
}
var re$2 = { exports: {} };
const SEMVER_SPEC_VERSION = "2.0.0";
const MAX_LENGTH$1 = 256;
const MAX_SAFE_INTEGER$1 = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991;
const MAX_SAFE_COMPONENT_LENGTH = 16;
const MAX_SAFE_BUILD_LENGTH = MAX_LENGTH$1 - 6;
const RELEASE_TYPES = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var constants$1 = {
  MAX_LENGTH: MAX_LENGTH$1,
  MAX_SAFE_COMPONENT_LENGTH,
  MAX_SAFE_BUILD_LENGTH,
  MAX_SAFE_INTEGER: MAX_SAFE_INTEGER$1,
  RELEASE_TYPES,
  SEMVER_SPEC_VERSION,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
var define_process_env_default = {};
const debug$1 = typeof process === "object" && define_process_env_default && define_process_env_default.NODE_DEBUG && /\bsemver\b/i.test(define_process_env_default.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
};
var debug_1 = debug$1;
(function(module, exports) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: MAX_SAFE_COMPONENT_LENGTH2,
    MAX_SAFE_BUILD_LENGTH: MAX_SAFE_BUILD_LENGTH2,
    MAX_LENGTH: MAX_LENGTH2
  } = constants$1;
  const debug2 = debug_1;
  exports = module.exports = {};
  const re2 = exports.re = [];
  const safeRe = exports.safeRe = [];
  const src = exports.src = [];
  const t2 = exports.t = {};
  let R2 = 0;
  const LETTERDASHNUMBER = "[a-zA-Z0-9-]";
  const safeRegexReplacements = [
    ["\\s", 1],
    ["\\d", MAX_LENGTH2],
    [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH2]
  ];
  const makeSafeRegex = (value) => {
    for (const [token, max] of safeRegexReplacements) {
      value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
    }
    return value;
  };
  const createToken = (name, value, isGlobal) => {
    const safe = makeSafeRegex(value);
    const index = R2++;
    debug2(name, index, value);
    t2[name] = index;
    src[index] = value;
    re2[index] = new RegExp(value, isGlobal ? "g" : void 0);
    safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
  };
  createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
  createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
  createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
  createToken("MAINVERSION", `(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})`);
  createToken("MAINVERSIONLOOSE", `(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})`);
  createToken("PRERELEASEIDENTIFIER", `(?:${src[t2.NUMERICIDENTIFIER]}|${src[t2.NONNUMERICIDENTIFIER]})`);
  createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t2.NUMERICIDENTIFIERLOOSE]}|${src[t2.NONNUMERICIDENTIFIER]})`);
  createToken("PRERELEASE", `(?:-(${src[t2.PRERELEASEIDENTIFIER]}(?:\\.${src[t2.PRERELEASEIDENTIFIER]})*))`);
  createToken("PRERELEASELOOSE", `(?:-?(${src[t2.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t2.PRERELEASEIDENTIFIERLOOSE]})*))`);
  createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
  createToken("BUILD", `(?:\\+(${src[t2.BUILDIDENTIFIER]}(?:\\.${src[t2.BUILDIDENTIFIER]})*))`);
  createToken("FULLPLAIN", `v?${src[t2.MAINVERSION]}${src[t2.PRERELEASE]}?${src[t2.BUILD]}?`);
  createToken("FULL", `^${src[t2.FULLPLAIN]}$`);
  createToken("LOOSEPLAIN", `[v=\\s]*${src[t2.MAINVERSIONLOOSE]}${src[t2.PRERELEASELOOSE]}?${src[t2.BUILD]}?`);
  createToken("LOOSE", `^${src[t2.LOOSEPLAIN]}$`);
  createToken("GTLT", "((?:<|>)?=?)");
  createToken("XRANGEIDENTIFIERLOOSE", `${src[t2.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
  createToken("XRANGEIDENTIFIER", `${src[t2.NUMERICIDENTIFIER]}|x|X|\\*`);
  createToken("XRANGEPLAIN", `[v=\\s]*(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:${src[t2.PRERELEASE]})?${src[t2.BUILD]}?)?)?`);
  createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:${src[t2.PRERELEASELOOSE]})?${src[t2.BUILD]}?)?)?`);
  createToken("XRANGE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAIN]}$`);
  createToken("XRANGELOOSE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAINLOOSE]}$`);
  createToken("COERCEPLAIN", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH2}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH2}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH2}}))?`);
  createToken("COERCE", `${src[t2.COERCEPLAIN]}(?:$|[^\\d])`);
  createToken("COERCEFULL", src[t2.COERCEPLAIN] + `(?:${src[t2.PRERELEASE]})?(?:${src[t2.BUILD]})?(?:$|[^\\d])`);
  createToken("COERCERTL", src[t2.COERCE], true);
  createToken("COERCERTLFULL", src[t2.COERCEFULL], true);
  createToken("LONETILDE", "(?:~>?)");
  createToken("TILDETRIM", `(\\s*)${src[t2.LONETILDE]}\\s+`, true);
  exports.tildeTrimReplace = "$1~";
  createToken("TILDE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAIN]}$`);
  createToken("TILDELOOSE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAINLOOSE]}$`);
  createToken("LONECARET", "(?:\\^)");
  createToken("CARETTRIM", `(\\s*)${src[t2.LONECARET]}\\s+`, true);
  exports.caretTrimReplace = "$1^";
  createToken("CARET", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAIN]}$`);
  createToken("CARETLOOSE", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAINLOOSE]}$`);
  createToken("COMPARATORLOOSE", `^${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]})$|^$`);
  createToken("COMPARATOR", `^${src[t2.GTLT]}\\s*(${src[t2.FULLPLAIN]})$|^$`);
  createToken("COMPARATORTRIM", `(\\s*)${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]}|${src[t2.XRANGEPLAIN]})`, true);
  exports.comparatorTrimReplace = "$1$2$3";
  createToken("HYPHENRANGE", `^\\s*(${src[t2.XRANGEPLAIN]})\\s+-\\s+(${src[t2.XRANGEPLAIN]})\\s*$`);
  createToken("HYPHENRANGELOOSE", `^\\s*(${src[t2.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t2.XRANGEPLAINLOOSE]})\\s*$`);
  createToken("STAR", "(<|>)?=?\\s*\\*");
  createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
  createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(re$2, re$2.exports);
var reExports = re$2.exports;
const looseOption = Object.freeze({ loose: true });
const emptyOpts = Object.freeze({});
const parseOptions$1 = (options) => {
  if (!options) {
    return emptyOpts;
  }
  if (typeof options !== "object") {
    return looseOption;
  }
  return options;
};
var parseOptions_1 = parseOptions$1;
const numeric = /^[0-9]+$/;
const compareIdentifiers$1 = (a2, b2) => {
  const anum = numeric.test(a2);
  const bnum = numeric.test(b2);
  if (anum && bnum) {
    a2 = +a2;
    b2 = +b2;
  }
  return a2 === b2 ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a2 < b2 ? -1 : 1;
};
const rcompareIdentifiers = (a2, b2) => compareIdentifiers$1(b2, a2);
var identifiers$1 = {
  compareIdentifiers: compareIdentifiers$1,
  rcompareIdentifiers
};
const debug = debug_1;
const { MAX_LENGTH, MAX_SAFE_INTEGER } = constants$1;
const { safeRe: re$1, t: t$1 } = reExports;
const parseOptions = parseOptions_1;
const { compareIdentifiers } = identifiers$1;
let SemVer$d = class SemVer {
  constructor(version2, options) {
    options = parseOptions(options);
    if (version2 instanceof SemVer) {
      if (version2.loose === !!options.loose && version2.includePrerelease === !!options.includePrerelease) {
        return version2;
      } else {
        version2 = version2.version;
      }
    } else if (typeof version2 !== "string") {
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version2}".`);
    }
    if (version2.length > MAX_LENGTH) {
      throw new TypeError(
        `version is longer than ${MAX_LENGTH} characters`
      );
    }
    debug("SemVer", version2, options);
    this.options = options;
    this.loose = !!options.loose;
    this.includePrerelease = !!options.includePrerelease;
    const m2 = version2.trim().match(options.loose ? re$1[t$1.LOOSE] : re$1[t$1.FULL]);
    if (!m2) {
      throw new TypeError(`Invalid Version: ${version2}`);
    }
    this.raw = version2;
    this.major = +m2[1];
    this.minor = +m2[2];
    this.patch = +m2[3];
    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
      throw new TypeError("Invalid major version");
    }
    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
      throw new TypeError("Invalid minor version");
    }
    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
      throw new TypeError("Invalid patch version");
    }
    if (!m2[4]) {
      this.prerelease = [];
    } else {
      this.prerelease = m2[4].split(".").map((id) => {
        if (/^[0-9]+$/.test(id)) {
          const num = +id;
          if (num >= 0 && num < MAX_SAFE_INTEGER) {
            return num;
          }
        }
        return id;
      });
    }
    this.build = m2[5] ? m2[5].split(".") : [];
    this.format();
  }
  format() {
    this.version = `${this.major}.${this.minor}.${this.patch}`;
    if (this.prerelease.length) {
      this.version += `-${this.prerelease.join(".")}`;
    }
    return this.version;
  }
  toString() {
    return this.version;
  }
  compare(other) {
    debug("SemVer.compare", this.version, this.options, other);
    if (!(other instanceof SemVer)) {
      if (typeof other === "string" && other === this.version) {
        return 0;
      }
      other = new SemVer(other, this.options);
    }
    if (other.version === this.version) {
      return 0;
    }
    return this.compareMain(other) || this.comparePre(other);
  }
  compareMain(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
  }
  comparePre(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    if (this.prerelease.length && !other.prerelease.length) {
      return -1;
    } else if (!this.prerelease.length && other.prerelease.length) {
      return 1;
    } else if (!this.prerelease.length && !other.prerelease.length) {
      return 0;
    }
    let i2 = 0;
    do {
      const a2 = this.prerelease[i2];
      const b2 = other.prerelease[i2];
      debug("prerelease compare", i2, a2, b2);
      if (a2 === void 0 && b2 === void 0) {
        return 0;
      } else if (b2 === void 0) {
        return 1;
      } else if (a2 === void 0) {
        return -1;
      } else if (a2 === b2) {
        continue;
      } else {
        return compareIdentifiers(a2, b2);
      }
    } while (++i2);
  }
  compareBuild(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    let i2 = 0;
    do {
      const a2 = this.build[i2];
      const b2 = other.build[i2];
      debug("build compare", i2, a2, b2);
      if (a2 === void 0 && b2 === void 0) {
        return 0;
      } else if (b2 === void 0) {
        return 1;
      } else if (a2 === void 0) {
        return -1;
      } else if (a2 === b2) {
        continue;
      } else {
        return compareIdentifiers(a2, b2);
      }
    } while (++i2);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(release, identifier, identifierBase) {
    switch (release) {
      case "premajor":
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor = 0;
        this.major++;
        this.inc("pre", identifier, identifierBase);
        break;
      case "preminor":
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor++;
        this.inc("pre", identifier, identifierBase);
        break;
      case "prepatch":
        this.prerelease.length = 0;
        this.inc("patch", identifier, identifierBase);
        this.inc("pre", identifier, identifierBase);
        break;
      case "prerelease":
        if (this.prerelease.length === 0) {
          this.inc("patch", identifier, identifierBase);
        }
        this.inc("pre", identifier, identifierBase);
        break;
      case "major":
        if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
          this.major++;
        }
        this.minor = 0;
        this.patch = 0;
        this.prerelease = [];
        break;
      case "minor":
        if (this.patch !== 0 || this.prerelease.length === 0) {
          this.minor++;
        }
        this.patch = 0;
        this.prerelease = [];
        break;
      case "patch":
        if (this.prerelease.length === 0) {
          this.patch++;
        }
        this.prerelease = [];
        break;
      case "pre": {
        const base = Number(identifierBase) ? 1 : 0;
        if (!identifier && identifierBase === false) {
          throw new Error("invalid increment argument: identifier is empty");
        }
        if (this.prerelease.length === 0) {
          this.prerelease = [base];
        } else {
          let i2 = this.prerelease.length;
          while (--i2 >= 0) {
            if (typeof this.prerelease[i2] === "number") {
              this.prerelease[i2]++;
              i2 = -2;
            }
          }
          if (i2 === -1) {
            if (identifier === this.prerelease.join(".") && identifierBase === false) {
              throw new Error("invalid increment argument: identifier already exists");
            }
            this.prerelease.push(base);
          }
        }
        if (identifier) {
          let prerelease2 = [identifier, base];
          if (identifierBase === false) {
            prerelease2 = [identifier];
          }
          if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
            if (isNaN(this.prerelease[1])) {
              this.prerelease = prerelease2;
            }
          } else {
            this.prerelease = prerelease2;
          }
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${release}`);
    }
    this.raw = this.format();
    if (this.build.length) {
      this.raw += `+${this.build.join(".")}`;
    }
    return this;
  }
};
var semver$1 = SemVer$d;
const SemVer$c = semver$1;
const parse$6 = (version2, options, throwErrors = false) => {
  if (version2 instanceof SemVer$c) {
    return version2;
  }
  try {
    return new SemVer$c(version2, options);
  } catch (er2) {
    if (!throwErrors) {
      return null;
    }
    throw er2;
  }
};
var parse_1 = parse$6;
const parse$5 = parse_1;
const valid$2 = (version2, options) => {
  const v2 = parse$5(version2, options);
  return v2 ? v2.version : null;
};
var valid_1 = valid$2;
const parse$4 = parse_1;
const clean$1 = (version2, options) => {
  const s2 = parse$4(version2.trim().replace(/^[=v]+/, ""), options);
  return s2 ? s2.version : null;
};
var clean_1 = clean$1;
const SemVer$b = semver$1;
const inc$1 = (version2, release, options, identifier, identifierBase) => {
  if (typeof options === "string") {
    identifierBase = identifier;
    identifier = options;
    options = void 0;
  }
  try {
    return new SemVer$b(
      version2 instanceof SemVer$b ? version2.version : version2,
      options
    ).inc(release, identifier, identifierBase).version;
  } catch (er2) {
    return null;
  }
};
var inc_1 = inc$1;
const parse$3 = parse_1;
const diff$1 = (version1, version2) => {
  const v1 = parse$3(version1, null, true);
  const v2 = parse$3(version2, null, true);
  const comparison = v1.compare(v2);
  if (comparison === 0) {
    return null;
  }
  const v1Higher = comparison > 0;
  const highVersion = v1Higher ? v1 : v2;
  const lowVersion = v1Higher ? v2 : v1;
  const highHasPre = !!highVersion.prerelease.length;
  const lowHasPre = !!lowVersion.prerelease.length;
  if (lowHasPre && !highHasPre) {
    if (!lowVersion.patch && !lowVersion.minor) {
      return "major";
    }
    if (highVersion.patch) {
      return "patch";
    }
    if (highVersion.minor) {
      return "minor";
    }
    return "major";
  }
  const prefix = highHasPre ? "pre" : "";
  if (v1.major !== v2.major) {
    return prefix + "major";
  }
  if (v1.minor !== v2.minor) {
    return prefix + "minor";
  }
  if (v1.patch !== v2.patch) {
    return prefix + "patch";
  }
  return "prerelease";
};
var diff_1 = diff$1;
const SemVer$a = semver$1;
const major$1 = (a2, loose) => new SemVer$a(a2, loose).major;
var major_1 = major$1;
const SemVer$9 = semver$1;
const minor$1 = (a2, loose) => new SemVer$9(a2, loose).minor;
var minor_1 = minor$1;
const SemVer$8 = semver$1;
const patch$1 = (a2, loose) => new SemVer$8(a2, loose).patch;
var patch_1 = patch$1;
const parse$2 = parse_1;
const prerelease$1 = (version2, options) => {
  const parsed = parse$2(version2, options);
  return parsed && parsed.prerelease.length ? parsed.prerelease : null;
};
var prerelease_1 = prerelease$1;
const SemVer$7 = semver$1;
const compare$b = (a2, b2, loose) => new SemVer$7(a2, loose).compare(new SemVer$7(b2, loose));
var compare_1 = compare$b;
const compare$a = compare_1;
const rcompare$1 = (a2, b2, loose) => compare$a(b2, a2, loose);
var rcompare_1 = rcompare$1;
const compare$9 = compare_1;
const compareLoose$1 = (a2, b2) => compare$9(a2, b2, true);
var compareLoose_1 = compareLoose$1;
const SemVer$6 = semver$1;
const compareBuild$3 = (a2, b2, loose) => {
  const versionA = new SemVer$6(a2, loose);
  const versionB = new SemVer$6(b2, loose);
  return versionA.compare(versionB) || versionA.compareBuild(versionB);
};
var compareBuild_1 = compareBuild$3;
const compareBuild$2 = compareBuild_1;
const sort$1 = (list, loose) => list.sort((a2, b2) => compareBuild$2(a2, b2, loose));
var sort_1 = sort$1;
const compareBuild$1 = compareBuild_1;
const rsort$1 = (list, loose) => list.sort((a2, b2) => compareBuild$1(b2, a2, loose));
var rsort_1 = rsort$1;
const compare$8 = compare_1;
const gt$4 = (a2, b2, loose) => compare$8(a2, b2, loose) > 0;
var gt_1 = gt$4;
const compare$7 = compare_1;
const lt$3 = (a2, b2, loose) => compare$7(a2, b2, loose) < 0;
var lt_1 = lt$3;
const compare$6 = compare_1;
const eq$2 = (a2, b2, loose) => compare$6(a2, b2, loose) === 0;
var eq_1 = eq$2;
const compare$5 = compare_1;
const neq$2 = (a2, b2, loose) => compare$5(a2, b2, loose) !== 0;
var neq_1 = neq$2;
const compare$4 = compare_1;
const gte$3 = (a2, b2, loose) => compare$4(a2, b2, loose) >= 0;
var gte_1 = gte$3;
const compare$3 = compare_1;
const lte$3 = (a2, b2, loose) => compare$3(a2, b2, loose) <= 0;
var lte_1 = lte$3;
const eq$1 = eq_1;
const neq$1 = neq_1;
const gt$3 = gt_1;
const gte$2 = gte_1;
const lt$2 = lt_1;
const lte$2 = lte_1;
const cmp$1 = (a2, op, b2, loose) => {
  switch (op) {
    case "===":
      if (typeof a2 === "object") {
        a2 = a2.version;
      }
      if (typeof b2 === "object") {
        b2 = b2.version;
      }
      return a2 === b2;
    case "!==":
      if (typeof a2 === "object") {
        a2 = a2.version;
      }
      if (typeof b2 === "object") {
        b2 = b2.version;
      }
      return a2 !== b2;
    case "":
    case "=":
    case "==":
      return eq$1(a2, b2, loose);
    case "!=":
      return neq$1(a2, b2, loose);
    case ">":
      return gt$3(a2, b2, loose);
    case ">=":
      return gte$2(a2, b2, loose);
    case "<":
      return lt$2(a2, b2, loose);
    case "<=":
      return lte$2(a2, b2, loose);
    default:
      throw new TypeError(`Invalid operator: ${op}`);
  }
};
var cmp_1 = cmp$1;
const SemVer$5 = semver$1;
const parse$1 = parse_1;
const { safeRe: re, t } = reExports;
const coerce$1 = (version2, options) => {
  if (version2 instanceof SemVer$5) {
    return version2;
  }
  if (typeof version2 === "number") {
    version2 = String(version2);
  }
  if (typeof version2 !== "string") {
    return null;
  }
  options = options || {};
  let match = null;
  if (!options.rtl) {
    match = version2.match(options.includePrerelease ? re[t.COERCEFULL] : re[t.COERCE]);
  } else {
    const coerceRtlRegex = options.includePrerelease ? re[t.COERCERTLFULL] : re[t.COERCERTL];
    let next;
    while ((next = coerceRtlRegex.exec(version2)) && (!match || match.index + match[0].length !== version2.length)) {
      if (!match || next.index + next[0].length !== match.index + match[0].length) {
        match = next;
      }
      coerceRtlRegex.lastIndex = next.index + next[1].length + next[2].length;
    }
    coerceRtlRegex.lastIndex = -1;
  }
  if (match === null) {
    return null;
  }
  const major2 = match[2];
  const minor2 = match[3] || "0";
  const patch2 = match[4] || "0";
  const prerelease2 = options.includePrerelease && match[5] ? `-${match[5]}` : "";
  const build = options.includePrerelease && match[6] ? `+${match[6]}` : "";
  return parse$1(`${major2}.${minor2}.${patch2}${prerelease2}${build}`, options);
};
var coerce_1 = coerce$1;
class LRUCache {
  constructor() {
    this.max = 1e3;
    this.map = /* @__PURE__ */ new Map();
  }
  get(key) {
    const value = this.map.get(key);
    if (value === void 0) {
      return void 0;
    } else {
      this.map.delete(key);
      this.map.set(key, value);
      return value;
    }
  }
  delete(key) {
    return this.map.delete(key);
  }
  set(key, value) {
    const deleted = this.delete(key);
    if (!deleted && value !== void 0) {
      if (this.map.size >= this.max) {
        const firstKey = this.map.keys().next().value;
        this.delete(firstKey);
      }
      this.map.set(key, value);
    }
    return this;
  }
}
var lrucache = LRUCache;
var range;
var hasRequiredRange;
function requireRange() {
  if (hasRequiredRange)
    return range;
  hasRequiredRange = 1;
  class Range2 {
    constructor(range2, options) {
      options = parseOptions2(options);
      if (range2 instanceof Range2) {
        if (range2.loose === !!options.loose && range2.includePrerelease === !!options.includePrerelease) {
          return range2;
        } else {
          return new Range2(range2.raw, options);
        }
      }
      if (range2 instanceof Comparator2) {
        this.raw = range2.value;
        this.set = [[range2]];
        this.format();
        return this;
      }
      this.options = options;
      this.loose = !!options.loose;
      this.includePrerelease = !!options.includePrerelease;
      this.raw = range2.trim().split(/\s+/).join(" ");
      this.set = this.raw.split("||").map((r2) => this.parseRange(r2.trim())).filter((c2) => c2.length);
      if (!this.set.length) {
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      }
      if (this.set.length > 1) {
        const first2 = this.set[0];
        this.set = this.set.filter((c2) => !isNullSet(c2[0]));
        if (this.set.length === 0) {
          this.set = [first2];
        } else if (this.set.length > 1) {
          for (const c2 of this.set) {
            if (c2.length === 1 && isAny(c2[0])) {
              this.set = [c2];
              break;
            }
          }
        }
      }
      this.format();
    }
    format() {
      this.range = this.set.map((comps) => comps.join(" ").trim()).join("||").trim();
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(range2) {
      const memoOpts = (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) | (this.options.loose && FLAG_LOOSE);
      const memoKey = memoOpts + ":" + range2;
      const cached = cache.get(memoKey);
      if (cached) {
        return cached;
      }
      const loose = this.options.loose;
      const hr = loose ? re2[t2.HYPHENRANGELOOSE] : re2[t2.HYPHENRANGE];
      range2 = range2.replace(hr, hyphenReplace(this.options.includePrerelease));
      debug2("hyphen replace", range2);
      range2 = range2.replace(re2[t2.COMPARATORTRIM], comparatorTrimReplace);
      debug2("comparator trim", range2);
      range2 = range2.replace(re2[t2.TILDETRIM], tildeTrimReplace);
      debug2("tilde trim", range2);
      range2 = range2.replace(re2[t2.CARETTRIM], caretTrimReplace);
      debug2("caret trim", range2);
      let rangeList = range2.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options));
      if (loose) {
        rangeList = rangeList.filter((comp) => {
          debug2("loose invalid filter", comp, this.options);
          return !!comp.match(re2[t2.COMPARATORLOOSE]);
        });
      }
      debug2("range list", rangeList);
      const rangeMap = /* @__PURE__ */ new Map();
      const comparators = rangeList.map((comp) => new Comparator2(comp, this.options));
      for (const comp of comparators) {
        if (isNullSet(comp)) {
          return [comp];
        }
        rangeMap.set(comp.value, comp);
      }
      if (rangeMap.size > 1 && rangeMap.has("")) {
        rangeMap.delete("");
      }
      const result = [...rangeMap.values()];
      cache.set(memoKey, result);
      return result;
    }
    intersects(range2, options) {
      if (!(range2 instanceof Range2)) {
        throw new TypeError("a Range is required");
      }
      return this.set.some((thisComparators) => {
        return isSatisfiable(thisComparators, options) && range2.set.some((rangeComparators) => {
          return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator) => {
            return rangeComparators.every((rangeComparator) => {
              return thisComparator.intersects(rangeComparator, options);
            });
          });
        });
      });
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(version2) {
      if (!version2) {
        return false;
      }
      if (typeof version2 === "string") {
        try {
          version2 = new SemVer3(version2, this.options);
        } catch (er2) {
          return false;
        }
      }
      for (let i2 = 0; i2 < this.set.length; i2++) {
        if (testSet(this.set[i2], version2, this.options)) {
          return true;
        }
      }
      return false;
    }
  }
  range = Range2;
  const LRU = lrucache;
  const cache = new LRU();
  const parseOptions2 = parseOptions_1;
  const Comparator2 = requireComparator();
  const debug2 = debug_1;
  const SemVer3 = semver$1;
  const {
    safeRe: re2,
    t: t2,
    comparatorTrimReplace,
    tildeTrimReplace,
    caretTrimReplace
  } = reExports;
  const { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = constants$1;
  const isNullSet = (c2) => c2.value === "<0.0.0-0";
  const isAny = (c2) => c2.value === "";
  const isSatisfiable = (comparators, options) => {
    let result = true;
    const remainingComparators = comparators.slice();
    let testComparator = remainingComparators.pop();
    while (result && remainingComparators.length) {
      result = remainingComparators.every((otherComparator) => {
        return testComparator.intersects(otherComparator, options);
      });
      testComparator = remainingComparators.pop();
    }
    return result;
  };
  const parseComparator = (comp, options) => {
    debug2("comp", comp, options);
    comp = replaceCarets(comp, options);
    debug2("caret", comp);
    comp = replaceTildes(comp, options);
    debug2("tildes", comp);
    comp = replaceXRanges(comp, options);
    debug2("xrange", comp);
    comp = replaceStars(comp, options);
    debug2("stars", comp);
    return comp;
  };
  const isX = (id) => !id || id.toLowerCase() === "x" || id === "*";
  const replaceTildes = (comp, options) => {
    return comp.trim().split(/\s+/).map((c2) => replaceTilde(c2, options)).join(" ");
  };
  const replaceTilde = (comp, options) => {
    const r2 = options.loose ? re2[t2.TILDELOOSE] : re2[t2.TILDE];
    return comp.replace(r2, (_2, M2, m2, p2, pr) => {
      debug2("tilde", comp, _2, M2, m2, p2, pr);
      let ret;
      if (isX(M2)) {
        ret = "";
      } else if (isX(m2)) {
        ret = `>=${M2}.0.0 <${+M2 + 1}.0.0-0`;
      } else if (isX(p2)) {
        ret = `>=${M2}.${m2}.0 <${M2}.${+m2 + 1}.0-0`;
      } else if (pr) {
        debug2("replaceTilde pr", pr);
        ret = `>=${M2}.${m2}.${p2}-${pr} <${M2}.${+m2 + 1}.0-0`;
      } else {
        ret = `>=${M2}.${m2}.${p2} <${M2}.${+m2 + 1}.0-0`;
      }
      debug2("tilde return", ret);
      return ret;
    });
  };
  const replaceCarets = (comp, options) => {
    return comp.trim().split(/\s+/).map((c2) => replaceCaret(c2, options)).join(" ");
  };
  const replaceCaret = (comp, options) => {
    debug2("caret", comp, options);
    const r2 = options.loose ? re2[t2.CARETLOOSE] : re2[t2.CARET];
    const z2 = options.includePrerelease ? "-0" : "";
    return comp.replace(r2, (_2, M2, m2, p2, pr) => {
      debug2("caret", comp, _2, M2, m2, p2, pr);
      let ret;
      if (isX(M2)) {
        ret = "";
      } else if (isX(m2)) {
        ret = `>=${M2}.0.0${z2} <${+M2 + 1}.0.0-0`;
      } else if (isX(p2)) {
        if (M2 === "0") {
          ret = `>=${M2}.${m2}.0${z2} <${M2}.${+m2 + 1}.0-0`;
        } else {
          ret = `>=${M2}.${m2}.0${z2} <${+M2 + 1}.0.0-0`;
        }
      } else if (pr) {
        debug2("replaceCaret pr", pr);
        if (M2 === "0") {
          if (m2 === "0") {
            ret = `>=${M2}.${m2}.${p2}-${pr} <${M2}.${m2}.${+p2 + 1}-0`;
          } else {
            ret = `>=${M2}.${m2}.${p2}-${pr} <${M2}.${+m2 + 1}.0-0`;
          }
        } else {
          ret = `>=${M2}.${m2}.${p2}-${pr} <${+M2 + 1}.0.0-0`;
        }
      } else {
        debug2("no pr");
        if (M2 === "0") {
          if (m2 === "0") {
            ret = `>=${M2}.${m2}.${p2}${z2} <${M2}.${m2}.${+p2 + 1}-0`;
          } else {
            ret = `>=${M2}.${m2}.${p2}${z2} <${M2}.${+m2 + 1}.0-0`;
          }
        } else {
          ret = `>=${M2}.${m2}.${p2} <${+M2 + 1}.0.0-0`;
        }
      }
      debug2("caret return", ret);
      return ret;
    });
  };
  const replaceXRanges = (comp, options) => {
    debug2("replaceXRanges", comp, options);
    return comp.split(/\s+/).map((c2) => replaceXRange(c2, options)).join(" ");
  };
  const replaceXRange = (comp, options) => {
    comp = comp.trim();
    const r2 = options.loose ? re2[t2.XRANGELOOSE] : re2[t2.XRANGE];
    return comp.replace(r2, (ret, gtlt, M2, m2, p2, pr) => {
      debug2("xRange", comp, ret, gtlt, M2, m2, p2, pr);
      const xM = isX(M2);
      const xm = xM || isX(m2);
      const xp = xm || isX(p2);
      const anyX = xp;
      if (gtlt === "=" && anyX) {
        gtlt = "";
      }
      pr = options.includePrerelease ? "-0" : "";
      if (xM) {
        if (gtlt === ">" || gtlt === "<") {
          ret = "<0.0.0-0";
        } else {
          ret = "*";
        }
      } else if (gtlt && anyX) {
        if (xm) {
          m2 = 0;
        }
        p2 = 0;
        if (gtlt === ">") {
          gtlt = ">=";
          if (xm) {
            M2 = +M2 + 1;
            m2 = 0;
            p2 = 0;
          } else {
            m2 = +m2 + 1;
            p2 = 0;
          }
        } else if (gtlt === "<=") {
          gtlt = "<";
          if (xm) {
            M2 = +M2 + 1;
          } else {
            m2 = +m2 + 1;
          }
        }
        if (gtlt === "<") {
          pr = "-0";
        }
        ret = `${gtlt + M2}.${m2}.${p2}${pr}`;
      } else if (xm) {
        ret = `>=${M2}.0.0${pr} <${+M2 + 1}.0.0-0`;
      } else if (xp) {
        ret = `>=${M2}.${m2}.0${pr} <${M2}.${+m2 + 1}.0-0`;
      }
      debug2("xRange return", ret);
      return ret;
    });
  };
  const replaceStars = (comp, options) => {
    debug2("replaceStars", comp, options);
    return comp.trim().replace(re2[t2.STAR], "");
  };
  const replaceGTE0 = (comp, options) => {
    debug2("replaceGTE0", comp, options);
    return comp.trim().replace(re2[options.includePrerelease ? t2.GTE0PRE : t2.GTE0], "");
  };
  const hyphenReplace = (incPr) => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr) => {
    if (isX(fM)) {
      from = "";
    } else if (isX(fm)) {
      from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
    } else if (isX(fp)) {
      from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
    } else if (fpr) {
      from = `>=${from}`;
    } else {
      from = `>=${from}${incPr ? "-0" : ""}`;
    }
    if (isX(tM)) {
      to = "";
    } else if (isX(tm)) {
      to = `<${+tM + 1}.0.0-0`;
    } else if (isX(tp)) {
      to = `<${tM}.${+tm + 1}.0-0`;
    } else if (tpr) {
      to = `<=${tM}.${tm}.${tp}-${tpr}`;
    } else if (incPr) {
      to = `<${tM}.${tm}.${+tp + 1}-0`;
    } else {
      to = `<=${to}`;
    }
    return `${from} ${to}`.trim();
  };
  const testSet = (set, version2, options) => {
    for (let i2 = 0; i2 < set.length; i2++) {
      if (!set[i2].test(version2)) {
        return false;
      }
    }
    if (version2.prerelease.length && !options.includePrerelease) {
      for (let i2 = 0; i2 < set.length; i2++) {
        debug2(set[i2].semver);
        if (set[i2].semver === Comparator2.ANY) {
          continue;
        }
        if (set[i2].semver.prerelease.length > 0) {
          const allowed = set[i2].semver;
          if (allowed.major === version2.major && allowed.minor === version2.minor && allowed.patch === version2.patch) {
            return true;
          }
        }
      }
      return false;
    }
    return true;
  };
  return range;
}
var comparator;
var hasRequiredComparator;
function requireComparator() {
  if (hasRequiredComparator)
    return comparator;
  hasRequiredComparator = 1;
  const ANY2 = Symbol("SemVer ANY");
  class Comparator2 {
    static get ANY() {
      return ANY2;
    }
    constructor(comp, options) {
      options = parseOptions2(options);
      if (comp instanceof Comparator2) {
        if (comp.loose === !!options.loose) {
          return comp;
        } else {
          comp = comp.value;
        }
      }
      comp = comp.trim().split(/\s+/).join(" ");
      debug2("comparator", comp, options);
      this.options = options;
      this.loose = !!options.loose;
      this.parse(comp);
      if (this.semver === ANY2) {
        this.value = "";
      } else {
        this.value = this.operator + this.semver.version;
      }
      debug2("comp", this);
    }
    parse(comp) {
      const r2 = this.options.loose ? re2[t2.COMPARATORLOOSE] : re2[t2.COMPARATOR];
      const m2 = comp.match(r2);
      if (!m2) {
        throw new TypeError(`Invalid comparator: ${comp}`);
      }
      this.operator = m2[1] !== void 0 ? m2[1] : "";
      if (this.operator === "=") {
        this.operator = "";
      }
      if (!m2[2]) {
        this.semver = ANY2;
      } else {
        this.semver = new SemVer3(m2[2], this.options.loose);
      }
    }
    toString() {
      return this.value;
    }
    test(version2) {
      debug2("Comparator.test", version2, this.options.loose);
      if (this.semver === ANY2 || version2 === ANY2) {
        return true;
      }
      if (typeof version2 === "string") {
        try {
          version2 = new SemVer3(version2, this.options);
        } catch (er2) {
          return false;
        }
      }
      return cmp2(version2, this.operator, this.semver, this.options);
    }
    intersects(comp, options) {
      if (!(comp instanceof Comparator2)) {
        throw new TypeError("a Comparator is required");
      }
      if (this.operator === "") {
        if (this.value === "") {
          return true;
        }
        return new Range2(comp.value, options).test(this.value);
      } else if (comp.operator === "") {
        if (comp.value === "") {
          return true;
        }
        return new Range2(this.value, options).test(comp.semver);
      }
      options = parseOptions2(options);
      if (options.includePrerelease && (this.value === "<0.0.0-0" || comp.value === "<0.0.0-0")) {
        return false;
      }
      if (!options.includePrerelease && (this.value.startsWith("<0.0.0") || comp.value.startsWith("<0.0.0"))) {
        return false;
      }
      if (this.operator.startsWith(">") && comp.operator.startsWith(">")) {
        return true;
      }
      if (this.operator.startsWith("<") && comp.operator.startsWith("<")) {
        return true;
      }
      if (this.semver.version === comp.semver.version && this.operator.includes("=") && comp.operator.includes("=")) {
        return true;
      }
      if (cmp2(this.semver, "<", comp.semver, options) && this.operator.startsWith(">") && comp.operator.startsWith("<")) {
        return true;
      }
      if (cmp2(this.semver, ">", comp.semver, options) && this.operator.startsWith("<") && comp.operator.startsWith(">")) {
        return true;
      }
      return false;
    }
  }
  comparator = Comparator2;
  const parseOptions2 = parseOptions_1;
  const { safeRe: re2, t: t2 } = reExports;
  const cmp2 = cmp_1;
  const debug2 = debug_1;
  const SemVer3 = semver$1;
  const Range2 = requireRange();
  return comparator;
}
const Range$9 = requireRange();
const satisfies$4 = (version2, range2, options) => {
  try {
    range2 = new Range$9(range2, options);
  } catch (er2) {
    return false;
  }
  return range2.test(version2);
};
var satisfies_1 = satisfies$4;
const Range$8 = requireRange();
const toComparators$1 = (range2, options) => new Range$8(range2, options).set.map((comp) => comp.map((c2) => c2.value).join(" ").trim().split(" "));
var toComparators_1 = toComparators$1;
const SemVer$4 = semver$1;
const Range$7 = requireRange();
const maxSatisfying$1 = (versions, range2, options) => {
  let max = null;
  let maxSV = null;
  let rangeObj = null;
  try {
    rangeObj = new Range$7(range2, options);
  } catch (er2) {
    return null;
  }
  versions.forEach((v2) => {
    if (rangeObj.test(v2)) {
      if (!max || maxSV.compare(v2) === -1) {
        max = v2;
        maxSV = new SemVer$4(max, options);
      }
    }
  });
  return max;
};
var maxSatisfying_1 = maxSatisfying$1;
const SemVer$3 = semver$1;
const Range$6 = requireRange();
const minSatisfying$1 = (versions, range2, options) => {
  let min = null;
  let minSV = null;
  let rangeObj = null;
  try {
    rangeObj = new Range$6(range2, options);
  } catch (er2) {
    return null;
  }
  versions.forEach((v2) => {
    if (rangeObj.test(v2)) {
      if (!min || minSV.compare(v2) === 1) {
        min = v2;
        minSV = new SemVer$3(min, options);
      }
    }
  });
  return min;
};
var minSatisfying_1 = minSatisfying$1;
const SemVer$2 = semver$1;
const Range$5 = requireRange();
const gt$2 = gt_1;
const minVersion$1 = (range2, loose) => {
  range2 = new Range$5(range2, loose);
  let minver = new SemVer$2("0.0.0");
  if (range2.test(minver)) {
    return minver;
  }
  minver = new SemVer$2("0.0.0-0");
  if (range2.test(minver)) {
    return minver;
  }
  minver = null;
  for (let i2 = 0; i2 < range2.set.length; ++i2) {
    const comparators = range2.set[i2];
    let setMin = null;
    comparators.forEach((comparator2) => {
      const compver = new SemVer$2(comparator2.semver.version);
      switch (comparator2.operator) {
        case ">":
          if (compver.prerelease.length === 0) {
            compver.patch++;
          } else {
            compver.prerelease.push(0);
          }
          compver.raw = compver.format();
        case "":
        case ">=":
          if (!setMin || gt$2(compver, setMin)) {
            setMin = compver;
          }
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${comparator2.operator}`);
      }
    });
    if (setMin && (!minver || gt$2(minver, setMin))) {
      minver = setMin;
    }
  }
  if (minver && range2.test(minver)) {
    return minver;
  }
  return null;
};
var minVersion_1 = minVersion$1;
const Range$4 = requireRange();
const validRange$1 = (range2, options) => {
  try {
    return new Range$4(range2, options).range || "*";
  } catch (er2) {
    return null;
  }
};
var valid$1 = validRange$1;
const SemVer$1 = semver$1;
const Comparator$2 = requireComparator();
const { ANY: ANY$1 } = Comparator$2;
const Range$3 = requireRange();
const satisfies$3 = satisfies_1;
const gt$1 = gt_1;
const lt$1 = lt_1;
const lte$1 = lte_1;
const gte$1 = gte_1;
const outside$3 = (version2, range2, hilo, options) => {
  version2 = new SemVer$1(version2, options);
  range2 = new Range$3(range2, options);
  let gtfn, ltefn, ltfn, comp, ecomp;
  switch (hilo) {
    case ">":
      gtfn = gt$1;
      ltefn = lte$1;
      ltfn = lt$1;
      comp = ">";
      ecomp = ">=";
      break;
    case "<":
      gtfn = lt$1;
      ltefn = gte$1;
      ltfn = gt$1;
      comp = "<";
      ecomp = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (satisfies$3(version2, range2, options)) {
    return false;
  }
  for (let i2 = 0; i2 < range2.set.length; ++i2) {
    const comparators = range2.set[i2];
    let high = null;
    let low = null;
    comparators.forEach((comparator2) => {
      if (comparator2.semver === ANY$1) {
        comparator2 = new Comparator$2(">=0.0.0");
      }
      high = high || comparator2;
      low = low || comparator2;
      if (gtfn(comparator2.semver, high.semver, options)) {
        high = comparator2;
      } else if (ltfn(comparator2.semver, low.semver, options)) {
        low = comparator2;
      }
    });
    if (high.operator === comp || high.operator === ecomp) {
      return false;
    }
    if ((!low.operator || low.operator === comp) && ltefn(version2, low.semver)) {
      return false;
    } else if (low.operator === ecomp && ltfn(version2, low.semver)) {
      return false;
    }
  }
  return true;
};
var outside_1 = outside$3;
const outside$2 = outside_1;
const gtr$1 = (version2, range2, options) => outside$2(version2, range2, ">", options);
var gtr_1 = gtr$1;
const outside$1 = outside_1;
const ltr$1 = (version2, range2, options) => outside$1(version2, range2, "<", options);
var ltr_1 = ltr$1;
const Range$2 = requireRange();
const intersects$1 = (r1, r2, options) => {
  r1 = new Range$2(r1, options);
  r2 = new Range$2(r2, options);
  return r1.intersects(r2, options);
};
var intersects_1 = intersects$1;
const satisfies$2 = satisfies_1;
const compare$2 = compare_1;
var simplify = (versions, range2, options) => {
  const set = [];
  let first2 = null;
  let prev = null;
  const v2 = versions.sort((a2, b2) => compare$2(a2, b2, options));
  for (const version2 of v2) {
    const included = satisfies$2(version2, range2, options);
    if (included) {
      prev = version2;
      if (!first2) {
        first2 = version2;
      }
    } else {
      if (prev) {
        set.push([first2, prev]);
      }
      prev = null;
      first2 = null;
    }
  }
  if (first2) {
    set.push([first2, null]);
  }
  const ranges = [];
  for (const [min, max] of set) {
    if (min === max) {
      ranges.push(min);
    } else if (!max && min === v2[0]) {
      ranges.push("*");
    } else if (!max) {
      ranges.push(`>=${min}`);
    } else if (min === v2[0]) {
      ranges.push(`<=${max}`);
    } else {
      ranges.push(`${min} - ${max}`);
    }
  }
  const simplified = ranges.join(" || ");
  const original = typeof range2.raw === "string" ? range2.raw : String(range2);
  return simplified.length < original.length ? simplified : range2;
};
const Range$1 = requireRange();
const Comparator$1 = requireComparator();
const { ANY } = Comparator$1;
const satisfies$1 = satisfies_1;
const compare$1 = compare_1;
const subset$1 = (sub, dom, options = {}) => {
  if (sub === dom) {
    return true;
  }
  sub = new Range$1(sub, options);
  dom = new Range$1(dom, options);
  let sawNonNull = false;
  OUTER:
    for (const simpleSub of sub.set) {
      for (const simpleDom of dom.set) {
        const isSub = simpleSubset(simpleSub, simpleDom, options);
        sawNonNull = sawNonNull || isSub !== null;
        if (isSub) {
          continue OUTER;
        }
      }
      if (sawNonNull) {
        return false;
      }
    }
  return true;
};
const minimumVersionWithPreRelease = [new Comparator$1(">=0.0.0-0")];
const minimumVersion = [new Comparator$1(">=0.0.0")];
const simpleSubset = (sub, dom, options) => {
  if (sub === dom) {
    return true;
  }
  if (sub.length === 1 && sub[0].semver === ANY) {
    if (dom.length === 1 && dom[0].semver === ANY) {
      return true;
    } else if (options.includePrerelease) {
      sub = minimumVersionWithPreRelease;
    } else {
      sub = minimumVersion;
    }
  }
  if (dom.length === 1 && dom[0].semver === ANY) {
    if (options.includePrerelease) {
      return true;
    } else {
      dom = minimumVersion;
    }
  }
  const eqSet = /* @__PURE__ */ new Set();
  let gt2, lt2;
  for (const c2 of sub) {
    if (c2.operator === ">" || c2.operator === ">=") {
      gt2 = higherGT(gt2, c2, options);
    } else if (c2.operator === "<" || c2.operator === "<=") {
      lt2 = lowerLT(lt2, c2, options);
    } else {
      eqSet.add(c2.semver);
    }
  }
  if (eqSet.size > 1) {
    return null;
  }
  let gtltComp;
  if (gt2 && lt2) {
    gtltComp = compare$1(gt2.semver, lt2.semver, options);
    if (gtltComp > 0) {
      return null;
    } else if (gtltComp === 0 && (gt2.operator !== ">=" || lt2.operator !== "<=")) {
      return null;
    }
  }
  for (const eq2 of eqSet) {
    if (gt2 && !satisfies$1(eq2, String(gt2), options)) {
      return null;
    }
    if (lt2 && !satisfies$1(eq2, String(lt2), options)) {
      return null;
    }
    for (const c2 of dom) {
      if (!satisfies$1(eq2, String(c2), options)) {
        return false;
      }
    }
    return true;
  }
  let higher, lower;
  let hasDomLT, hasDomGT;
  let needDomLTPre = lt2 && !options.includePrerelease && lt2.semver.prerelease.length ? lt2.semver : false;
  let needDomGTPre = gt2 && !options.includePrerelease && gt2.semver.prerelease.length ? gt2.semver : false;
  if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt2.operator === "<" && needDomLTPre.prerelease[0] === 0) {
    needDomLTPre = false;
  }
  for (const c2 of dom) {
    hasDomGT = hasDomGT || c2.operator === ">" || c2.operator === ">=";
    hasDomLT = hasDomLT || c2.operator === "<" || c2.operator === "<=";
    if (gt2) {
      if (needDomGTPre) {
        if (c2.semver.prerelease && c2.semver.prerelease.length && c2.semver.major === needDomGTPre.major && c2.semver.minor === needDomGTPre.minor && c2.semver.patch === needDomGTPre.patch) {
          needDomGTPre = false;
        }
      }
      if (c2.operator === ">" || c2.operator === ">=") {
        higher = higherGT(gt2, c2, options);
        if (higher === c2 && higher !== gt2) {
          return false;
        }
      } else if (gt2.operator === ">=" && !satisfies$1(gt2.semver, String(c2), options)) {
        return false;
      }
    }
    if (lt2) {
      if (needDomLTPre) {
        if (c2.semver.prerelease && c2.semver.prerelease.length && c2.semver.major === needDomLTPre.major && c2.semver.minor === needDomLTPre.minor && c2.semver.patch === needDomLTPre.patch) {
          needDomLTPre = false;
        }
      }
      if (c2.operator === "<" || c2.operator === "<=") {
        lower = lowerLT(lt2, c2, options);
        if (lower === c2 && lower !== lt2) {
          return false;
        }
      } else if (lt2.operator === "<=" && !satisfies$1(lt2.semver, String(c2), options)) {
        return false;
      }
    }
    if (!c2.operator && (lt2 || gt2) && gtltComp !== 0) {
      return false;
    }
  }
  if (gt2 && hasDomLT && !lt2 && gtltComp !== 0) {
    return false;
  }
  if (lt2 && hasDomGT && !gt2 && gtltComp !== 0) {
    return false;
  }
  if (needDomGTPre || needDomLTPre) {
    return false;
  }
  return true;
};
const higherGT = (a2, b2, options) => {
  if (!a2) {
    return b2;
  }
  const comp = compare$1(a2.semver, b2.semver, options);
  return comp > 0 ? a2 : comp < 0 ? b2 : b2.operator === ">" && a2.operator === ">=" ? b2 : a2;
};
const lowerLT = (a2, b2, options) => {
  if (!a2) {
    return b2;
  }
  const comp = compare$1(a2.semver, b2.semver, options);
  return comp < 0 ? a2 : comp > 0 ? b2 : b2.operator === "<" && a2.operator === "<=" ? b2 : a2;
};
var subset_1 = subset$1;
const internalRe = reExports;
const constants = constants$1;
const SemVer2 = semver$1;
const identifiers = identifiers$1;
const parse = parse_1;
const valid = valid_1;
const clean = clean_1;
const inc = inc_1;
const diff = diff_1;
const major = major_1;
const minor = minor_1;
const patch = patch_1;
const prerelease = prerelease_1;
const compare = compare_1;
const rcompare = rcompare_1;
const compareLoose = compareLoose_1;
const compareBuild = compareBuild_1;
const sort = sort_1;
const rsort = rsort_1;
const gt = gt_1;
const lt = lt_1;
const eq = eq_1;
const neq = neq_1;
const gte = gte_1;
const lte = lte_1;
const cmp = cmp_1;
const coerce = coerce_1;
const Comparator = requireComparator();
const Range = requireRange();
const satisfies = satisfies_1;
const toComparators = toComparators_1;
const maxSatisfying = maxSatisfying_1;
const minSatisfying = minSatisfying_1;
const minVersion = minVersion_1;
const validRange = valid$1;
const outside = outside_1;
const gtr = gtr_1;
const ltr = ltr_1;
const intersects = intersects_1;
const simplifyRange = simplify;
const subset = subset_1;
var semver = {
  parse,
  valid,
  clean,
  inc,
  diff,
  major,
  minor,
  patch,
  prerelease,
  compare,
  rcompare,
  compareLoose,
  compareBuild,
  sort,
  rsort,
  gt,
  lt,
  eq,
  neq,
  gte,
  lte,
  cmp,
  coerce,
  Comparator,
  Range,
  satisfies,
  toComparators,
  maxSatisfying,
  minSatisfying,
  minVersion,
  validRange,
  outside,
  gtr,
  ltr,
  intersects,
  simplifyRange,
  subset,
  SemVer: SemVer2,
  re: internalRe.re,
  src: internalRe.src,
  tokens: internalRe.t,
  SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: constants.RELEASE_TYPES,
  compareIdentifiers: identifiers.compareIdentifiers,
  rcompareIdentifiers: identifiers.rcompareIdentifiers
};
function createBatchResponse(id, responses, channel) {
  const batchResponse = {
    protocol: "delight-rpc",
    id,
    version,
    responses
  };
  if (isntUndefined$1(channel)) {
    batchResponse.channel = channel;
  }
  return batchResponse;
}
function createErrorForBatchResponse(error2) {
  return { error: normalize$2(error2) };
}
function createResultForBatchResponse(result) {
  return { result };
}
class MethodNotAvailable extends CustomError$1 {
}
class VersionMismatch extends CustomError$1 {
}
class InternalError extends CustomError$1 {
}
const AnyChannel = Symbol();
function matchChannel(message, channel) {
  if (channel !== AnyChannel) {
    if (isRegExp$1(channel)) {
      if (isUndefined$1(message.channel))
        return false;
      if (!channel.test(message.channel))
        return false;
    } else {
      if (channel !== message.channel)
        return false;
    }
  }
  return true;
}
async function createResponse(api2, request, { parameterValidators = {}, version: version2, channel, signal, ownPropsOnly = false } = {}) {
  if (!matchChannel(request, channel))
    return null;
  if (request.expectedVersion && isntUndefined$1(version2)) {
    if (!semver.satisfies(version2, request.expectedVersion)) {
      return createError(request.id, new VersionMismatch(`The expected version is "${request.expectedVersion}", but the server version is "${version2}".`), request.channel);
    }
  }
  try {
    if (isRequest(request)) {
      try {
        const validate = lib$1.tryGetProp(parameterValidators, request.method);
        validate === null || validate === void 0 ? void 0 : validate(...request.params);
        const fn2 = (ownPropsOnly ? lib$1.tryGetOwnProp : lib$1.tryGetProp)(api2, request.method);
        if (isntFunction$1(fn2)) {
          return createError(request.id, new MethodNotAvailable("The method is not available."), request.channel);
        }
        signal === null || signal === void 0 ? void 0 : signal.throwIfAborted();
        const result = await Reflect.apply(fn2, api2, [...request.params, signal]);
        return createResult(request.id, result, request.channel);
      } catch (e2) {
        assert$2(isError$3(e2), "The thrown object must be an Error");
        return createError(request.id, e2, request.channel);
      }
    } else if (isBatchRequest(request)) {
      const concurrency = request.parallel ? Infinity : 1;
      const responses = await map$1(request.requests, async (request2) => {
        try {
          const validate = lib$1.tryGetProp(parameterValidators, request2.method);
          validate === null || validate === void 0 ? void 0 : validate(...request2.params);
          const fn2 = (ownPropsOnly ? lib$1.tryGetOwnProp : lib$1.tryGetProp)(api2, request2.method);
          if (isntFunction$1(fn2)) {
            return createErrorForBatchResponse(new MethodNotAvailable("The method is not available."));
          }
          signal === null || signal === void 0 ? void 0 : signal.throwIfAborted();
          const result = await Reflect.apply(fn2, api2, [...request2.params, signal]);
          return createResultForBatchResponse(result);
        } catch (e2) {
          assert$2(isError$3(e2), "The thrown object must be an Error");
          return createErrorForBatchResponse(e2);
        }
      }, concurrency);
      return createBatchResponse(request.id, responses, request.channel);
    } else {
      throw new Error("Unknown request");
    }
  } catch (e2) {
    return createError(request.id, new InternalError(`${e2}`), request.channel);
  }
}
function createServer(api2, { parameterValidators, version: version2, channel, ownPropsOnly } = {}) {
  const port = chrome.runtime;
  port.onMessage.addListener(handler);
  return () => port.onMessage.removeListener(handler);
  function handler(message, sender, sendResponse) {
    if (sender.id === chrome.runtime.id) {
      const req = message;
      if (isRequest(req) || isBatchRequest(req)) {
        if (matchChannel(req, channel)) {
          lib$5.go(async () => {
            const res = await createResponse(api2, req, {
              parameterValidators,
              version: version2,
              channel,
              ownPropsOnly
            });
            assert$2(isntNull$1(res));
            sendResponse(res);
          });
          return true;
        }
      }
    }
  }
}
function applyPropertyDecorators(obj, propertyKeys, propertyDecorator) {
  return new Proxy(obj, {
    get(target, propertyKey, receiver) {
      const value = Reflect.get(target, propertyKey, receiver);
      if (propertyKeys.includes(propertyKey)) {
        return propertyDecorator(value);
      } else {
        return value;
      }
    }
  });
}
const fetch = globalThis.fetch.bind(globalThis);
var lib = {};
var customError = {};
var getErrorNames$1 = {};
var isError$2 = {};
Object.defineProperty(isError$2, "__esModule", { value: true });
isError$2.isntError = isError$2.isError = void 0;
function isError$1(val) {
  return val instanceof Error;
}
isError$2.isError = isError$1;
function isntError$1(val) {
  return !isError$1(val);
}
isError$2.isntError = isntError$1;
var traverseErrorPrototypeChain$1 = {};
Object.defineProperty(traverseErrorPrototypeChain$1, "__esModule", { value: true });
traverseErrorPrototypeChain$1.traverseErrorPrototypeChain = void 0;
function* traverseErrorPrototypeChain(err) {
  let current = err;
  while (current = Object.getPrototypeOf(current)) {
    yield current;
    if (current === Error.prototype)
      break;
  }
}
traverseErrorPrototypeChain$1.traverseErrorPrototypeChain = traverseErrorPrototypeChain;
Object.defineProperty(getErrorNames$1, "__esModule", { value: true });
getErrorNames$1.getErrorNames = void 0;
const is_error_1$1 = isError$2;
const traverse_error_prototype_chain_1 = traverseErrorPrototypeChain$1;
function* getErrorNames(err) {
  var _a;
  if ((0, is_error_1$1.isError)(err)) {
    for (const prototype of (0, traverse_error_prototype_chain_1.traverseErrorPrototypeChain)(err)) {
      if ((_a = prototype.constructor) === null || _a === void 0 ? void 0 : _a.name) {
        yield prototype.constructor.name;
      }
    }
  } else {
    yield err.name;
    yield* err.ancestors;
  }
}
getErrorNames$1.getErrorNames = getErrorNames;
var serializableError = {};
var es2018 = {};
var array = {};
Object.defineProperty(array, "__esModule", { value: true });
array.isntEmptyArray = array.isEmptyArray = array.isntArray = array.isArray = void 0;
function isArray(val) {
  return Array.isArray(val);
}
array.isArray = isArray;
function isntArray(val) {
  return !isArray(val);
}
array.isntArray = isntArray;
function isEmptyArray(val) {
  return val.length === 0;
}
array.isEmptyArray = isEmptyArray;
function isntEmptyArray(val) {
  return val.length !== 0;
}
array.isntEmptyArray = isntEmptyArray;
var asyncIterable = {};
var _null = {};
Object.defineProperty(_null, "__esModule", { value: true });
_null.isntNull = _null.isNull = void 0;
function isNull(val) {
  return val === null;
}
_null.isNull = isNull;
function isntNull(val) {
  return !isNull(val);
}
_null.isntNull = isntNull;
var _undefined = {};
Object.defineProperty(_undefined, "__esModule", { value: true });
_undefined.isntUndefined = _undefined.isUndefined = void 0;
function isUndefined(val) {
  return val === void 0;
}
_undefined.isUndefined = isUndefined;
function isntUndefined(val) {
  return !isUndefined(val);
}
_undefined.isntUndefined = isntUndefined;
var _function = {};
Object.defineProperty(_function, "__esModule", { value: true });
_function.isntFunction = _function.isFunction = void 0;
function isFunction(val) {
  return typeof val === "function";
}
_function.isFunction = isFunction;
function isntFunction(val) {
  return !isFunction(val);
}
_function.isntFunction = isntFunction;
Object.defineProperty(asyncIterable, "__esModule", { value: true });
asyncIterable.isntAsyncIterable = asyncIterable.isAsyncIterable = void 0;
const null_1$3 = _null;
const undefined_1$2 = _undefined;
const function_1$2 = _function;
function isAsyncIterable(val) {
  return (0, null_1$3.isntNull)(val) && (0, undefined_1$2.isntUndefined)(val) && (0, function_1$2.isFunction)(val[Symbol.asyncIterator]);
}
asyncIterable.isAsyncIterable = isAsyncIterable;
function isntAsyncIterable(val) {
  return !isAsyncIterable(val);
}
asyncIterable.isntAsyncIterable = isntAsyncIterable;
var bigint = {};
Object.defineProperty(bigint, "__esModule", { value: true });
bigint.isntBigInt = bigint.isBigInt = void 0;
function isBigInt(val) {
  return typeof val === "bigint";
}
bigint.isBigInt = isBigInt;
function isntBigInt(val) {
  return !isBigInt(val);
}
bigint.isntBigInt = isntBigInt;
var boolean = {};
Object.defineProperty(boolean, "__esModule", { value: true });
boolean.isntBoolean = boolean.isBoolean = void 0;
function isBoolean(val) {
  return typeof val === "boolean";
}
boolean.isBoolean = isBoolean;
function isntBoolean(val) {
  return !isBoolean(val);
}
boolean.isntBoolean = isntBoolean;
var char = {};
var string = {};
Object.defineProperty(string, "__esModule", { value: true });
string.isntString = string.isString = void 0;
function isString(val) {
  return typeof val === "string";
}
string.isString = isString;
function isntString(val) {
  return !isString(val);
}
string.isntString = isntString;
Object.defineProperty(char, "__esModule", { value: true });
char.isntChar = char.isChar = void 0;
const string_1$1 = string;
function isChar(val) {
  return (0, string_1$1.isString)(val) && val.length === 1;
}
char.isChar = isChar;
function isntChar(val) {
  return !isChar(val);
}
char.isntChar = isntChar;
var date = {};
Object.defineProperty(date, "__esModule", { value: true });
date.isntDate = date.isDate = void 0;
function isDate(val) {
  return val instanceof Date;
}
date.isDate = isDate;
function isntDate(val) {
  return !isDate(val);
}
date.isntDate = isntDate;
var _enum = {};
Object.defineProperty(_enum, "__esModule", { value: true });
_enum.inEnum = void 0;
function inEnum(val, _enum2) {
  return Object.values(_enum2).includes(val);
}
_enum.inEnum = inEnum;
var error = {};
Object.defineProperty(error, "__esModule", { value: true });
error.isntError = error.isError = void 0;
function isError(val) {
  return val instanceof Error;
}
error.isError = isError;
function isntError(val) {
  return !isError(val);
}
error.isntError = isntError;
var falsy = {};
Object.defineProperty(falsy, "__esModule", { value: true });
falsy.isntFalsy = falsy.isFalsy = void 0;
function isFalsy(val) {
  return !val;
}
falsy.isFalsy = isFalsy;
function isntFalsy(val) {
  return !isFalsy(val);
}
falsy.isntFalsy = isntFalsy;
var iterable = {};
Object.defineProperty(iterable, "__esModule", { value: true });
iterable.isntIterable = iterable.isIterable = void 0;
const null_1$2 = _null;
const undefined_1$1 = _undefined;
const function_1$1 = _function;
function isIterable(val) {
  return (0, null_1$2.isntNull)(val) && (0, undefined_1$1.isntUndefined)(val) && (0, function_1$1.isFunction)(val[Symbol.iterator]);
}
iterable.isIterable = isIterable;
function isntIterable(val) {
  return !isIterable(val);
}
iterable.isntIterable = isntIterable;
var json = {};
var number = {};
Object.defineProperty(number, "__esModule", { value: true });
number.isntNaN = number.isNaN = number.isNegativeInfinity = number.isPositiveInfinity = number.isFinite = number.isntNumber = number.isNumber = void 0;
function isNumber(val) {
  return typeof val === "number";
}
number.isNumber = isNumber;
function isntNumber(val) {
  return !isNumber(val);
}
number.isntNumber = isntNumber;
function isFinite(val) {
  return Number.isFinite(val);
}
number.isFinite = isFinite;
function isPositiveInfinity(val) {
  return val === Infinity;
}
number.isPositiveInfinity = isPositiveInfinity;
function isNegativeInfinity(val) {
  return val === -Infinity;
}
number.isNegativeInfinity = isNegativeInfinity;
function isNaN$1(val) {
  return Number.isNaN(val);
}
number.isNaN = isNaN$1;
function isntNaN(val) {
  return !isNaN$1(val);
}
number.isntNaN = isntNaN;
var object = {};
var freeGlobal$1 = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var _freeGlobal = freeGlobal$1;
var freeGlobal = _freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root$1 = freeGlobal || freeSelf || Function("return this")();
var _root = root$1;
var root = _root;
var Symbol$3 = root.Symbol;
var _Symbol = Symbol$3;
var Symbol$2 = _Symbol;
var objectProto$2 = Object.prototype;
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
var nativeObjectToString$1 = objectProto$2.toString;
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
function getRawTag$1(value) {
  var isOwn = hasOwnProperty$1.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e2) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var _getRawTag = getRawTag$1;
var objectProto$1 = Object.prototype;
var nativeObjectToString = objectProto$1.toString;
function objectToString$1(value) {
  return nativeObjectToString.call(value);
}
var _objectToString = objectToString$1;
var Symbol$1 = _Symbol, getRawTag = _getRawTag, objectToString = _objectToString;
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0;
function baseGetTag$1(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
var _baseGetTag = baseGetTag$1;
function overArg$1(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var _overArg = overArg$1;
var overArg = _overArg;
var getPrototype$1 = overArg(Object.getPrototypeOf, Object);
var _getPrototype = getPrototype$1;
function isObjectLike$1(value) {
  return value != null && typeof value == "object";
}
var isObjectLike_1 = isObjectLike$1;
var baseGetTag = _baseGetTag, getPrototype = _getPrototype, isObjectLike = isObjectLike_1;
var objectTag = "[object Object]";
var funcProto = Function.prototype, objectProto = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty = objectProto.hasOwnProperty;
var objectCtorString = funcToString.call(Object);
function isPlainObject$1(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}
var isPlainObject_1$1 = isPlainObject$1;
var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(object, "__esModule", { value: true });
object.isntEmptyObject = object.isEmptyObject = object.isntPlainObject = object.isPlainObject = object.isntObject = object.isObject = void 0;
const isPlainObject_1 = __importDefault(isPlainObject_1$1);
function isObject(val) {
  return val !== null && typeof val === "object";
}
object.isObject = isObject;
function isntObject(val) {
  return !isObject(val);
}
object.isntObject = isntObject;
function isPlainObject(val) {
  return (0, isPlainObject_1.default)(val);
}
object.isPlainObject = isPlainObject;
function isntPlainObject(val) {
  return !isPlainObject(val);
}
object.isntPlainObject = isntPlainObject;
function isEmptyObject(val) {
  return Object.keys(val).length === 0;
}
object.isEmptyObject = isEmptyObject;
function isntEmptyObject(val) {
  return Object.keys(val).length !== 0;
}
object.isntEmptyObject = isntEmptyObject;
Object.defineProperty(json, "__esModule", { value: true });
json.isntJsonable = json.isJsonable = json.isntJson = json.isJson = void 0;
const null_1$1 = _null;
const boolean_1 = boolean;
const string_1 = string;
const number_1 = number;
const array_1 = array;
const object_1$1 = object;
function isJson(val) {
  return (0, null_1$1.isNull)(val) || (0, boolean_1.isBoolean)(val) || (0, string_1.isString)(val) || (0, number_1.isNumber)(val) || (0, array_1.isArray)(val) && val.every(isJson) || (0, object_1$1.isPlainObject)(val) && Object.values(val).every(isJson);
}
json.isJson = isJson;
function isntJson(val) {
  return !isJson(val);
}
json.isntJson = isntJson;
function isJsonable(val) {
  try {
    JSON.stringify(val);
    return true;
  } catch (_a) {
    return false;
  }
}
json.isJsonable = isJsonable;
function isntJsonable(val) {
  return !isntJsonable();
}
json.isntJsonable = isntJsonable;
var nullish = {};
Object.defineProperty(nullish, "__esModule", { value: true });
nullish.isntNullish = nullish.isNullish = void 0;
const null_1 = _null;
const undefined_1 = _undefined;
function isNullish(val) {
  return (0, null_1.isNull)(val) || (0, undefined_1.isUndefined)(val);
}
nullish.isNullish = isNullish;
function isntNullish(val) {
  return !isNullish(val);
}
nullish.isntNullish = isntNullish;
var promise = {};
Object.defineProperty(promise, "__esModule", { value: true });
promise.isPromiseLike = promise.isntPromiseLike = promise.isntPromise = promise.isPromise = void 0;
const object_1 = object;
const function_1 = _function;
function isPromise(val) {
  return val instanceof Promise;
}
promise.isPromise = isPromise;
function isntPromise(val) {
  return !isPromise(val);
}
promise.isntPromise = isntPromise;
function isntPromiseLike(val) {
  return !isPromiseLike(val);
}
promise.isntPromiseLike = isntPromiseLike;
function isPromiseLike(val) {
  return (0, object_1.isObject)(val) && (0, function_1.isFunction)(val.then);
}
promise.isPromiseLike = isPromiseLike;
var url = {};
Object.defineProperty(url, "__esModule", { value: true });
url.isAbsoluteURL = void 0;
function isAbsoluteURL(str) {
  try {
    new URL(str);
    return true;
  } catch (_a) {
    return false;
  }
}
url.isAbsoluteURL = isAbsoluteURL;
var regexp = {};
Object.defineProperty(regexp, "__esModule", { value: true });
regexp.isntRegExp = regexp.isRegExp = void 0;
function isRegExp(val) {
  return val instanceof RegExp;
}
regexp.isRegExp = isRegExp;
function isntRegExp(val) {
  return !isRegExp(val);
}
regexp.isntRegExp = isntRegExp;
var symbol = {};
Object.defineProperty(symbol, "__esModule", { value: true });
symbol.isntSymbol = symbol.isSymbol = void 0;
function isSymbol(val) {
  return typeof val === "symbol";
}
symbol.isSymbol = isSymbol;
function isntSymbol(val) {
  return !isSymbol(val);
}
symbol.isntSymbol = isntSymbol;
(function(exports) {
  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o2, m2, k2, k22) {
    if (k22 === void 0)
      k22 = k2;
    var desc = Object.getOwnPropertyDescriptor(m2, k2);
    if (!desc || ("get" in desc ? !m2.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m2[k2];
      } };
    }
    Object.defineProperty(o2, k22, desc);
  } : function(o2, m2, k2, k22) {
    if (k22 === void 0)
      k22 = k2;
    o2[k22] = m2[k2];
  });
  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function(m2, exports2) {
    for (var p2 in m2)
      if (p2 !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p2))
        __createBinding(exports2, m2, p2);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  __exportStar(array, exports);
  __exportStar(asyncIterable, exports);
  __exportStar(bigint, exports);
  __exportStar(boolean, exports);
  __exportStar(char, exports);
  __exportStar(date, exports);
  __exportStar(_enum, exports);
  __exportStar(error, exports);
  __exportStar(falsy, exports);
  __exportStar(_function, exports);
  __exportStar(iterable, exports);
  __exportStar(json, exports);
  __exportStar(_null, exports);
  __exportStar(nullish, exports);
  __exportStar(number, exports);
  __exportStar(object, exports);
  __exportStar(promise, exports);
  __exportStar(string, exports);
  __exportStar(_undefined, exports);
  __exportStar(url, exports);
  __exportStar(regexp, exports);
  __exportStar(symbol, exports);
})(es2018);
Object.defineProperty(serializableError, "__esModule", { value: true });
serializableError.isSerializableError = void 0;
const types_1 = es2018;
function isSerializableError(val) {
  return (0, types_1.isObject)(val) && (0, types_1.isString)(val.name) && (0, types_1.isString)(val.message) && ((0, types_1.isString)(val.stack) || (0, types_1.isNull)(val.stack)) && ((0, types_1.isArray)(val.ancestors) && val.ancestors.every(types_1.isString));
}
serializableError.isSerializableError = isSerializableError;
var utils = {};
Object.defineProperty(utils, "__esModule", { value: true });
utils.toArray = utils.first = void 0;
function first(iterable2) {
  for (const element of iterable2) {
    return element;
  }
}
utils.first = first;
function toArray(iterable2) {
  return Array.from(iterable2);
}
utils.toArray = toArray;
Object.defineProperty(customError, "__esModule", { value: true });
customError.CustomError = void 0;
const get_error_names_1$1 = getErrorNames$1;
const is_error_1 = isError$2;
const serializable_error_1 = serializableError;
const utils_1$1 = utils;
class CustomError2 extends Error {
  get name() {
    var _a, _b;
    return (_b = (_a = (0, utils_1$1.first)((0, get_error_names_1$1.getErrorNames)(this))) !== null && _a !== void 0 ? _a : CustomError2.name) !== null && _b !== void 0 ? _b : "CustomError";
  }
  static [Symbol.hasInstance](instance) {
    var _a;
    if ((0, is_error_1.isError)(instance) || (0, serializable_error_1.isSerializableError)(instance)) {
      const reversedClassNames = [
        (_a = this.prototype.constructor.name) !== null && _a !== void 0 ? _a : this.name,
        ...(0, get_error_names_1$1.getErrorNames)(this.prototype)
      ].reverse();
      const reversedInstanceNames = (0, utils_1$1.toArray)((0, get_error_names_1$1.getErrorNames)(instance)).reverse();
      return reversedClassNames.every((x2, i2) => x2 === reversedInstanceNames[i2]);
    } else {
      return false;
    }
  }
}
customError.CustomError = CustomError2;
var assertionError = {};
Object.defineProperty(assertionError, "__esModule", { value: true });
assertionError.AssertionError = void 0;
const custom_error_1 = customError;
class AssertionError2 extends custom_error_1.CustomError {
}
assertionError.AssertionError = AssertionError2;
var normalize$1 = {};
Object.defineProperty(normalize$1, "__esModule", { value: true });
normalize$1.normalize = void 0;
const get_error_names_1 = getErrorNames$1;
const utils_1 = utils;
function normalize(err) {
  var _a;
  const [name, ...ancestors] = (0, utils_1.toArray)((0, get_error_names_1.getErrorNames)(err));
  return {
    name,
    ancestors,
    message: err.message,
    stack: (_a = err.stack) !== null && _a !== void 0 ? _a : null
  };
}
normalize$1.normalize = normalize;
var hydrate$1 = {};
Object.defineProperty(hydrate$1, "__esModule", { value: true });
hydrate$1.hydrate = void 0;
const pass_1 = lib$2;
function hydrate(err) {
  var _a;
  const errorNames = [err.name, ...err.ancestors].slice(0, -1).reverse();
  let errorConstructor = Error;
  for (const name of errorNames) {
    errorConstructor = createChildErrorConstructor(errorConstructor, name);
  }
  const result = new errorConstructor();
  result.name = err.name;
  result.message = err.message;
  result.stack = (_a = err.stack) !== null && _a !== void 0 ? _a : void 0;
  return result;
}
hydrate$1.hydrate = hydrate;
function createChildErrorConstructor(parentErrorConstructor, name) {
  const constructor = function() {
    (0, pass_1.pass)();
  };
  constructor.prototype = Object.create(parentErrorConstructor.prototype);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, "name", { value: name });
  return constructor;
}
var assert$1 = {};
Object.defineProperty(assert$1, "__esModule", { value: true });
assert$1.assert = void 0;
const assertion_error_1 = assertionError;
function assert(condition, message = "Assertion failed") {
  if (!condition)
    throw new assertion_error_1.AssertionError(message);
}
assert$1.assert = assert;
(function(exports) {
  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o2, m2, k2, k22) {
    if (k22 === void 0)
      k22 = k2;
    var desc = Object.getOwnPropertyDescriptor(m2, k2);
    if (!desc || ("get" in desc ? !m2.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m2[k2];
      } };
    }
    Object.defineProperty(o2, k22, desc);
  } : function(o2, m2, k2, k22) {
    if (k22 === void 0)
      k22 = k2;
    o2[k22] = m2[k2];
  });
  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function(m2, exports2) {
    for (var p2 in m2)
      if (p2 !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p2))
        __createBinding(exports2, m2, p2);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  __exportStar(customError, exports);
  __exportStar(assertionError, exports);
  __exportStar(serializableError, exports);
  __exportStar(isError$2, exports);
  __exportStar(normalize$1, exports);
  __exportStar(hydrate$1, exports);
  __exportStar(assert$1, exports);
  __exportStar(getErrorNames$1, exports);
  __exportStar(traverseErrorPrototypeChain$1, exports);
})(lib);
class HTTPError extends lib.CustomError {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}
var Informational;
(function(Informational2) {
  Informational2[Informational2["Continue"] = 100] = "Continue";
  Informational2[Informational2["SwitchingProtocol"] = 101] = "SwitchingProtocol";
  Informational2[Informational2["Processing"] = 102] = "Processing";
  Informational2[Informational2["EarlyHints"] = 103] = "EarlyHints";
})(Informational = Informational || (Informational = {}));
var Successful;
(function(Successful2) {
  Successful2[Successful2["OK"] = 200] = "OK";
  Successful2[Successful2["Created"] = 201] = "Created";
  Successful2[Successful2["Accepted"] = 202] = "Accepted";
  Successful2[Successful2["NonAuthoritativeInformation"] = 203] = "NonAuthoritativeInformation";
  Successful2[Successful2["NoContent"] = 204] = "NoContent";
  Successful2[Successful2["ResetContent"] = 205] = "ResetContent";
  Successful2[Successful2["PartialContent"] = 206] = "PartialContent";
  Successful2[Successful2["MultiStatus"] = 207] = "MultiStatus";
  Successful2[Successful2["AlreadyReported"] = 208] = "AlreadyReported";
  Successful2[Successful2["IMUsed"] = 226] = "IMUsed";
})(Successful = Successful || (Successful = {}));
var Redirection;
(function(Redirection2) {
  Redirection2[Redirection2["MultipleChoice"] = 300] = "MultipleChoice";
  Redirection2[Redirection2["MovedPermanently"] = 3011] = "MovedPermanently";
  Redirection2[Redirection2["Found"] = 302] = "Found";
  Redirection2[Redirection2["SeeOther"] = 303] = "SeeOther";
  Redirection2[Redirection2["NotModified"] = 304] = "NotModified";
  Redirection2[Redirection2["TemporaryRedirect"] = 307] = "TemporaryRedirect";
  Redirection2[Redirection2["PermanentRedirect"] = 308] = "PermanentRedirect";
})(Redirection = Redirection || (Redirection = {}));
var ClientError;
(function(ClientError2) {
  ClientError2[ClientError2["BadRequest"] = 400] = "BadRequest";
  ClientError2[ClientError2["Unauthorized"] = 401] = "Unauthorized";
  ClientError2[ClientError2["Forbidden"] = 403] = "Forbidden";
  ClientError2[ClientError2["NotFound"] = 404] = "NotFound";
  ClientError2[ClientError2["MethodNotAllowed"] = 405] = "MethodNotAllowed";
  ClientError2[ClientError2["NotAcceptable"] = 406] = "NotAcceptable";
  ClientError2[ClientError2["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
  ClientError2[ClientError2["RequestTimeout"] = 408] = "RequestTimeout";
  ClientError2[ClientError2["Conflict"] = 409] = "Conflict";
  ClientError2[ClientError2["Gone"] = 410] = "Gone";
  ClientError2[ClientError2["LengthRequired"] = 411] = "LengthRequired";
  ClientError2[ClientError2["PreconditionFailed"] = 412] = "PreconditionFailed";
  ClientError2[ClientError2["PayloadTooLarge"] = 413] = "PayloadTooLarge";
  ClientError2[ClientError2["URITooLong"] = 414] = "URITooLong";
  ClientError2[ClientError2["UnsupportedMediaType"] = 415] = "UnsupportedMediaType";
  ClientError2[ClientError2["RangeNotSatisfiable"] = 416] = "RangeNotSatisfiable";
  ClientError2[ClientError2["ExpectationFailed"] = 417] = "ExpectationFailed";
  ClientError2[ClientError2["MisdirectedRequest"] = 421] = "MisdirectedRequest";
  ClientError2[ClientError2["UnprocessableEntity"] = 422] = "UnprocessableEntity";
  ClientError2[ClientError2["Locked"] = 423] = "Locked";
  ClientError2[ClientError2["FailedDependency"] = 424] = "FailedDependency";
  ClientError2[ClientError2["UpgradeRequired"] = 426] = "UpgradeRequired";
  ClientError2[ClientError2["PreconditionRequired"] = 428] = "PreconditionRequired";
  ClientError2[ClientError2["TooManyRequests"] = 429] = "TooManyRequests";
  ClientError2[ClientError2["RequestHeaderFieldsTooLarge"] = 431] = "RequestHeaderFieldsTooLarge";
  ClientError2[ClientError2["UnavailableForLegalReasons"] = 451] = "UnavailableForLegalReasons";
})(ClientError = ClientError || (ClientError = {}));
var ServerError;
(function(ServerError2) {
  ServerError2[ServerError2["InternalServerError"] = 500] = "InternalServerError";
  ServerError2[ServerError2["NotImplemented"] = 501] = "NotImplemented";
  ServerError2[ServerError2["BadGateway"] = 502] = "BadGateway";
  ServerError2[ServerError2["ServiceUnavailable"] = 503] = "ServiceUnavailable";
  ServerError2[ServerError2["GatewayTimeout"] = 504] = "GatewayTimeout";
  ServerError2[ServerError2["HTTPVersionNotSupported"] = 505] = "HTTPVersionNotSupported";
  ServerError2[ServerError2["VariantAlsoNegotiates"] = 506] = "VariantAlsoNegotiates";
  ServerError2[ServerError2["InsufficientStorage"] = 507] = "InsufficientStorage";
  ServerError2[ServerError2["LoopDetected"] = 508] = "LoopDetected";
  ServerError2[ServerError2["NotExtended"] = 510] = "NotExtended";
  ServerError2[ServerError2["NetworkAuthenticationRequired"] = 511] = "NetworkAuthenticationRequired";
})(ServerError = ServerError || (ServerError = {}));
class HTTPInformational {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
}
class Continue extends HTTPInformational {
  constructor() {
    super(Informational.Continue, "Continue");
  }
}
class SwitchingProtocol extends HTTPInformational {
  constructor() {
    super(Informational.SwitchingProtocol, "Switching Protocol");
  }
}
class Processing extends HTTPInformational {
  constructor() {
    super(Informational.Processing, "Processing");
  }
}
class EarlyHints extends HTTPInformational {
  constructor() {
    super(Informational.EarlyHints, "Early Hints");
  }
}
class HTTPSuccessful {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
}
class OK extends HTTPSuccessful {
  constructor() {
    super(Successful.OK, "OK");
  }
}
class Created extends HTTPSuccessful {
  constructor() {
    super(Successful.Created, "Created");
  }
}
class Accepted extends HTTPSuccessful {
  constructor() {
    super(Successful.Accepted, "Accepted");
  }
}
class NonAuthoritativeInformation extends HTTPSuccessful {
  constructor() {
    super(Successful.NonAuthoritativeInformation, "Non-Authoritative Information");
  }
}
class NoContent extends HTTPSuccessful {
  constructor() {
    super(Successful.NoContent, "No Content");
  }
}
class ResetContent extends HTTPSuccessful {
  constructor() {
    super(Successful.ResetContent, "Reset Content");
  }
}
class PartialContent extends HTTPSuccessful {
  constructor() {
    super(Successful.PartialContent, "Partial Content");
  }
}
class MultiStatus extends HTTPSuccessful {
  constructor() {
    super(Successful.MultiStatus, "Multi-Status");
  }
}
class AlreadyReported extends HTTPSuccessful {
  constructor() {
    super(Successful.AlreadyReported, "Already Reported");
  }
}
class IMUsed extends HTTPSuccessful {
  constructor() {
    super(Successful.IMUsed, "IM Used");
  }
}
class HTTPRedirection {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
}
class MultipleChoice extends HTTPRedirection {
  constructor() {
    super(Redirection.MultipleChoice, "Multiple Choice");
  }
}
class MovedPermanently extends HTTPRedirection {
  constructor() {
    super(Redirection.MovedPermanently, "Moved Permanently");
  }
}
class Found extends HTTPRedirection {
  constructor() {
    super(Redirection.Found, "Found");
  }
}
class SeeOther extends HTTPRedirection {
  constructor() {
    super(Redirection.SeeOther, "See Other");
  }
}
class NotModified extends HTTPRedirection {
  constructor() {
    super(Redirection.NotModified, "Not Modified");
  }
}
class TemporaryRedirect extends HTTPRedirection {
  constructor() {
    super(Redirection.TemporaryRedirect, "Temporary Redirect");
  }
}
class PermanentRedirect extends HTTPRedirection {
  constructor() {
    super(Redirection.PermanentRedirect, "Permanent Redirect");
  }
}
class HTTPClientError extends HTTPError {
}
class BadRequest extends HTTPClientError {
  constructor(message) {
    super(ClientError.BadRequest, message !== null && message !== void 0 ? message : "Bad Request");
  }
}
class Unauthorized extends HTTPClientError {
  constructor(message) {
    super(ClientError.Unauthorized, message !== null && message !== void 0 ? message : "Unauthorized");
  }
}
class Forbidden extends HTTPClientError {
  constructor(message) {
    super(ClientError.Forbidden, message !== null && message !== void 0 ? message : "Forbidden");
  }
}
class NotFound extends HTTPClientError {
  constructor(message) {
    super(ClientError.NotFound, message !== null && message !== void 0 ? message : "Not Found");
  }
}
class MethodNotAllowed extends HTTPClientError {
  constructor(message) {
    super(ClientError.MethodNotAllowed, message !== null && message !== void 0 ? message : "Method Not Allowed");
  }
}
class NotAcceptable extends HTTPClientError {
  constructor(message) {
    super(ClientError.NotAcceptable, message !== null && message !== void 0 ? message : "Not Acceptable");
  }
}
class ProxyAuthenticationRequired extends HTTPClientError {
  constructor(message) {
    super(ClientError.ProxyAuthenticationRequired, message !== null && message !== void 0 ? message : "Proxy Authentication Required");
  }
}
class RequestTimeout extends HTTPClientError {
  constructor(message) {
    super(ClientError.RequestTimeout, message !== null && message !== void 0 ? message : "Request Timeout");
  }
}
class Conflict extends HTTPClientError {
  constructor(message) {
    super(ClientError.Conflict, message !== null && message !== void 0 ? message : "Conflict");
  }
}
class Gone extends HTTPClientError {
  constructor(message) {
    super(ClientError.Gone, message !== null && message !== void 0 ? message : "Gone");
  }
}
class LengthRequired extends HTTPClientError {
  constructor(message) {
    super(ClientError.LengthRequired, message !== null && message !== void 0 ? message : "Length Required");
  }
}
class PreconditionFailed extends HTTPClientError {
  constructor(message) {
    super(ClientError.PreconditionFailed, message !== null && message !== void 0 ? message : "Precondition Failed");
  }
}
class PayloadTooLarge extends HTTPClientError {
  constructor(message) {
    super(ClientError.PayloadTooLarge, message !== null && message !== void 0 ? message : "Payload Too Large");
  }
}
class URITooLong extends HTTPClientError {
  constructor(message) {
    super(ClientError.URITooLong, message !== null && message !== void 0 ? message : "URI Too Long");
  }
}
class UnsupportedMediaType extends HTTPClientError {
  constructor(message) {
    super(ClientError.UnsupportedMediaType, message !== null && message !== void 0 ? message : "Unsupported Media Type");
  }
}
class RangeNotSatisfiable extends HTTPClientError {
  constructor(message) {
    super(ClientError.RangeNotSatisfiable, message !== null && message !== void 0 ? message : "Range Not Satisfiable");
  }
}
class ExpectationFailed extends HTTPClientError {
  constructor(message) {
    super(ClientError.ExpectationFailed, message !== null && message !== void 0 ? message : "Expectation Failed");
  }
}
class MisdirectedRequest extends HTTPClientError {
  constructor(message) {
    super(ClientError.MisdirectedRequest, message !== null && message !== void 0 ? message : "Misdirected Request");
  }
}
class UnprocessableEntity extends HTTPClientError {
  constructor(message) {
    super(ClientError.UnprocessableEntity, message !== null && message !== void 0 ? message : "Unprocessable Entity");
  }
}
class Locked extends HTTPClientError {
  constructor(message) {
    super(ClientError.Locked, message !== null && message !== void 0 ? message : "Locked");
  }
}
class FailedDependency extends HTTPClientError {
  constructor(message) {
    super(ClientError.FailedDependency, message !== null && message !== void 0 ? message : "Failed Dependency");
  }
}
class UpgradeRequired extends HTTPClientError {
  constructor(message) {
    super(ClientError.UpgradeRequired, message !== null && message !== void 0 ? message : "Upgrade Required");
  }
}
class PreconditionRequired extends HTTPClientError {
  constructor(message) {
    super(ClientError.PreconditionRequired, message !== null && message !== void 0 ? message : "Precondition Required");
  }
}
class TooManyRequests extends HTTPClientError {
  constructor(message) {
    super(ClientError.TooManyRequests, message !== null && message !== void 0 ? message : "Too Many Requests");
  }
}
class RequestHeaderFieldsTooLarge extends HTTPClientError {
  constructor(message) {
    super(ClientError.RequestHeaderFieldsTooLarge, message !== null && message !== void 0 ? message : "Request Header Fields Too Large");
  }
}
class UnavailableForLegalReasons extends HTTPClientError {
  constructor(message) {
    super(ClientError.UnavailableForLegalReasons, message !== null && message !== void 0 ? message : "Unavailable For Legal Reasons");
  }
}
class HTTPServerError extends HTTPError {
}
class InternalServerError extends HTTPServerError {
  constructor(message) {
    super(ServerError.InternalServerError, message !== null && message !== void 0 ? message : "Internal Server Error");
  }
}
class NotImplemented extends HTTPServerError {
  constructor(message) {
    super(ServerError.NotImplemented, message !== null && message !== void 0 ? message : "Not Implemented");
  }
}
class BadGateway extends HTTPServerError {
  constructor(message) {
    super(ServerError.BadGateway, message !== null && message !== void 0 ? message : "Bad Gateway");
  }
}
class ServiceUnavailable extends HTTPServerError {
  constructor(message) {
    super(ServerError.ServiceUnavailable, message !== null && message !== void 0 ? message : "Service Unavailable");
  }
}
class GatewayTimeout extends HTTPServerError {
  constructor(message) {
    super(ServerError.GatewayTimeout, message !== null && message !== void 0 ? message : "Gateway Timeout");
  }
}
class HTTPVersionNotSupported extends HTTPServerError {
  constructor(message) {
    super(ServerError.HTTPVersionNotSupported, message !== null && message !== void 0 ? message : "HTTP Version Not Supported");
  }
}
class VariantAlsoNegotiates extends HTTPServerError {
  constructor(message) {
    super(ServerError.VariantAlsoNegotiates, message !== null && message !== void 0 ? message : "Variant Also Negotiates");
  }
}
class InsufficientStorage extends HTTPServerError {
  constructor(message) {
    super(ServerError.InsufficientStorage, message !== null && message !== void 0 ? message : "Insufficient Storage");
  }
}
class LoopDetected extends HTTPServerError {
  constructor(message) {
    super(ServerError.LoopDetected, message !== null && message !== void 0 ? message : "Loop Detected");
  }
}
class NotExtended extends HTTPServerError {
  constructor(message) {
    super(ServerError.NotExtended, message !== null && message !== void 0 ? message : "Not Extended");
  }
}
class NetworkAuthenticationRequired extends HTTPServerError {
  constructor(message) {
    super(ServerError.NetworkAuthenticationRequired, message !== null && message !== void 0 ? message : "Network Authentication Required");
  }
}
class UnknownHTTPStatusError extends Error {
  constructor(code) {
    super(`The HTTP status code ${code} is unknown`);
    this.name = this.constructor.name;
  }
}
function fromCode(code, message) {
  switch (code) {
    case 100:
      return new Continue();
    case 101:
      return new SwitchingProtocol();
    case 102:
      return new Processing();
    case 103:
      return new EarlyHints();
    case 200:
      return new OK();
    case 201:
      return new Created();
    case 202:
      return new Accepted();
    case 203:
      return new NonAuthoritativeInformation();
    case 204:
      return new NoContent();
    case 205:
      return new ResetContent();
    case 206:
      return new PartialContent();
    case 207:
      return new MultiStatus();
    case 208:
      return new AlreadyReported();
    case 226:
      return new IMUsed();
    case 300:
      return new MultipleChoice();
    case 301:
      return new MovedPermanently();
    case 302:
      return new Found();
    case 303:
      return new SeeOther();
    case 304:
      return new NotModified();
    case 307:
      return new TemporaryRedirect();
    case 308:
      return new PermanentRedirect();
    case 400:
      return new BadRequest(message);
    case 401:
      return new Unauthorized(message);
    case 403:
      return new Forbidden(message);
    case 404:
      return new NotFound(message);
    case 405:
      return new MethodNotAllowed(message);
    case 406:
      return new NotAcceptable(message);
    case 407:
      return new ProxyAuthenticationRequired(message);
    case 408:
      return new RequestTimeout(message);
    case 409:
      return new Conflict(message);
    case 410:
      return new Gone(message);
    case 411:
      return new LengthRequired(message);
    case 412:
      return new PreconditionFailed(message);
    case 413:
      return new PayloadTooLarge(message);
    case 414:
      return new URITooLong(message);
    case 415:
      return new UnsupportedMediaType(message);
    case 416:
      return new RangeNotSatisfiable(message);
    case 417:
      return new ExpectationFailed(message);
    case 421:
      return new MisdirectedRequest(message);
    case 422:
      return new UnprocessableEntity(message);
    case 423:
      return new Locked(message);
    case 424:
      return new FailedDependency(message);
    case 426:
      return new UpgradeRequired(message);
    case 428:
      return new PreconditionRequired(message);
    case 429:
      return new TooManyRequests(message);
    case 431:
      return new RequestHeaderFieldsTooLarge(message);
    case 451:
      return new UnavailableForLegalReasons(message);
    case 500:
      return new InternalServerError(message);
    case 501:
      return new NotImplemented(message);
    case 502:
      return new BadGateway(message);
    case 503:
      return new ServiceUnavailable(message);
    case 504:
      return new GatewayTimeout(message);
    case 505:
      return new HTTPVersionNotSupported(message);
    case 506:
      return new VariantAlsoNegotiates(message);
    case 507:
      return new InsufficientStorage(message);
    case 508:
      return new LoopDetected(message);
    case 510:
      return new NotExtended(message);
    case 511:
      return new NetworkAuthenticationRequired(message);
    default:
      throw new UnknownHTTPStatusError(code);
  }
}
async function ok(res) {
  if (!res.ok) {
    const text = await res.text();
    throw fromCode(res.status, text);
  }
  return res;
}
async function toText(res, charset) {
  if (charset) {
    const buffer = await res.arrayBuffer();
    return new TextDecoder(charset).decode(buffer);
  } else {
    return await res.text();
  }
}
const launched = new Deferred();
const dao = new DAO();
const api = {
  async getUserScriptList() {
    const userScripts = await dao.getAllUserScripts();
    return userScripts.map((x2) => ({
      id: x2.id,
      enabled: x2.enabled,
      name: x2.name,
      matches: x2.matches,
      updateURLs: x2.updateURLs
    }));
  },
  generateUserScriptId,
  async setUserScriptEnabled(id, enabled) {
    await dao.updateUserScriptEnabled(id, enabled);
    if (enabled) {
      const userScript = await dao.getUserScript(id);
      if (userScript) {
        await registerUserScript(userScript.id, userScript.matches, userScript.code);
      }
    } else {
      await unregisterUserScript(id);
    }
    return null;
  },
  async removeUserScript(id) {
    await dao.deleteUserScript(id);
    await unregisterUserScript(id);
    return null;
  },
  async getUserScript(id) {
    return await dao.getUserScript(id);
  },
  async setUserScript(id, code) {
    await dao.upsertUserScript(id, code);
    const userScript = await dao.getUserScript(id);
    if (userScript == null ? void 0 : userScript.enabled) {
      await registerUserScript(userScript.id, userScript.matches, userScript.code);
    }
    return null;
  },
  async upgradeUserScriptToLatest(id) {
    const userScript = await dao.getUserScript(id);
    if (userScript) {
      for (const updateURL of userScript.updateURLs) {
        try {
          const code = await fetch(updateURL).then(ok).then(toText);
          await this.setUserScript(id, code);
          return true;
        } catch {
          lib$2.pass();
        }
      }
    }
    return false;
  }
};
createServer(
  applyPropertyDecorators(
    api,
    Object.keys(api),
    (fn2) => {
      return async function(...args) {
        await launched;
        return await fn2(...args);
      };
    }
  )
);
waitForLaunch().then(async (details) => {
  console.info(`Launched by ${LaunchReason[details.reason]}`);
  switch (details.reason) {
    case LaunchReason.Install: {
      lib$2.pass();
      break;
    }
    case LaunchReason.Update: {
      await migrate(details.previousVersion);
      break;
    }
  }
  launched.resolve();
  await configureCSP();
  await unregisterAllUserScripts();
  const enabledScripts = await dao.getAllEnabledUserScripts();
  await each(enabledScripts, async (userScript) => {
    await registerUserScript(userScript.id, userScript.matches, userScript.code);
  });
});
