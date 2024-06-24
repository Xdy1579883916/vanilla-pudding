export function esm(code) {
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
