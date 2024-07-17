export function parseCode(code: string, runWith = "esm") {
  if (runWith !== "esm") {
    return code
  }
  return `
    window.loadESMScript = loadESMScript;
    async function loadESMScript(script) {
      const blob = new Blob([script], { type: 'application/javascript' })
      const url = URL.createObjectURL(blob)
      await import(url)
      URL.revokeObjectURL(url)
    }
    loadESMScript(${JSON.stringify(code)});
  `
}
