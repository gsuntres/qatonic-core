const _ = require('lodash')
const Template = require('./template')

/**
 * Implement this interface if the object is using templates.
 * e.g. {@link Command}.
 * @interface
 */
class Processable {

  constructor() {
    this._processed = false
  }

  /**
   * Return the total number of variables being used by templates.
   * @type {string[]}
   */
  get variables() {
    const variables = []
    const tpls = this._identifyTemplates()
    tpls.forEach(t => {
      const vars = this[t].variables
      vars.forEach(v => {
        if(!variables.includes(v)) {
          variables.push(v)
        }
      })
    })

    return variables
  }

  /**
   * Will parse owned templates using data as the context.
   * It essentially replaces all templates with the equivalent parsed object.
   * @param {object} data The context to use.
   */
  process(data = {}) {
    if(this._processed) return

    const tpls = this._identifyTemplates()
    tpls.forEach(t => {
      const varsRequired = this[t].variables
      const d = _.defaults(data, _.zipObject(varsRequired, new Array(varsRequired.length)))
      this[t] = this[t].parse(d)
    })
    this._processed = true
  }

  /**
   * @type {object} This will essentially replace all templates
   */
  get processed() {
    if(!this._processed) {
      // when templates have no variables we can process this without any context
      if(this.variables.length === 0) {
        this.process()
      } else {
        throw new Error('This entity hasn\'t been processed. Run `process` first.')
      }
    }

    const o = {}
    Object.getOwnPropertyNames(this).forEach(n => {
      if(!n.startsWith('_')) {
        o[n] = this[n]
      }
    })

    return o
  }

  _identifyTemplates() {
    const templates = []
    Object.getOwnPropertyNames(this).forEach(n => {
      if(this[n] instanceof Template) {
        templates.push(n)
      }
    })

    return templates
  }
}

module.exports = Processable
