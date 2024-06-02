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

function isBlankLine(line) {
    return line.trim() === "";
}

function isntBlankLine(line) {
    return !isBlankLine(line);
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

function removeExtraIndents(text, {ignoreBlankLines = false} = {}) {
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

function dedent(strings, ...values) {
    return pipe([strings, ...values], (params) => map(String, ...params), (params) => indentMultilineValues(...params), (params) => concat(...params), (text) => removeLeadingBlankLines(text, 1), (text) => removeTrailingBlankLines(text, 1), (text) => removeExtraIndents(text, {ignoreBlankLines: true}));
}

function pipe(value, ...operators) {
    let result = value;
    for (const operator of operators) {
        result = operator(result);
    }
    return result;
}

function javascript(strings, ...values) {
    return dedent(...map(stringifyJavaScriptValue, strings, ...values));
}

function isString(val) {
    return typeof val === "string";
}

function isArray(val) {
    return Array.isArray(val);
}

function isBigInt(val) {
    return typeof val === "bigint";
}

function isObject(val) {
    return val !== null && typeof val === "object";
}

function isFunction(val) {
    return typeof val === "function";
}

function stringifyJavaScriptValue(val) {
    if (isString(val))
        return stringifyString(val);
    if (isBigInt(val))
        return stringifyBigInt(val);
    if (isArray(val))
        return stringifyArray(val);
    if (isFunction(val))
        return stringifyFunction(val);
    if (isObject(val))
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

export function esm(code) {
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
