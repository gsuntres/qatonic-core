const compile = require('es6-template-strings/compile')
const resolveToString = require('es6-template-strings/resolve-to-string')

const REGEX_TEMPLATE_ERR = /error:\s{1}ReferenceError:\s{1}(.*)/g
const REGEX_EXTRACT_VARS = /\${([^}]*)}/gm

class Template {

  constructor(raw) {
    this._raw = raw
    this._compiled = compile(raw)
  }

  parse(data = {}) {
    let rendered
    try {
      rendered = resolveToString(this._compiled, data)
    } catch(err) {
      const match = REGEX_TEMPLATE_ERR.exec(err.message)
      throw new Error(match[1])
    }

    let parsed = this._toJson(rendered)
    return parsed ? parsed : rendered
  }

  _toJson(str) {
    try {
      return JSON.parse(str)
    } catch(err) { // eslint-disable no-unused-vars
      return false
    }
  }

  get variables() {
    const variables = []
    let match
    while((match = REGEX_EXTRACT_VARS.exec(this._raw))) {
      variables.push(match[1])
    }

    return variables
  }
}

module.exports = Template
