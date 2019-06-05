const _ = require('lodash')
const Processable = require('./processable')
const Template = require('./template')

/**
 * A step holds all the necessary information to run a command.
 */
class Step extends Processable {

  /**
   * @param {string} plugin
   * @param {string} [name] A description
   * @param {string} [props] The commands properties, a parsable JSON template object
   * @param {string} [context] Register variables before running the command, a parsable JSON template object.
   * @param {object} [register] The register statement.
   * @param {object[]} [tests] The tests statement.
   * @param {boolean} [skipOnFail] Ignore failures (Default: false)
   */
  constructor(plugin, name, props, context, register, tests, skipOnFail = false) {
    super()
    this.plugin = plugin
    this._name = name
    this.tests = tests
    this.context = _.isUndefined(context) ? undefined : new Template(context)
    this.register = register
    this.props = _.isUndefined(props) ? undefined : new Template(props)
    this.skipOnFail = skipOnFail
  }

  /**
   * Create a Step instance from a plain object
   * @param {object} plainObj
   * @throws {Error} in case of an undefined or invalid object
   */
  static create(plainObj) {
    if(_.isEmpty(plainObj)) throw new Error('Input required')
    const plugin = _.get(plainObj, 'plugin')
    const name = _.get(plainObj, 'name')
    const context = _.get(plainObj, 'context')
    const register = _.get(plainObj, 'register')
    const tests = _.get(plainObj, 'tests')
    const props = _.get(plainObj, 'props')
    const skipOnFail = _.get(plainObj, 'skipOnFail', false)

    return new Step(plugin, name, props, context, register, tests, skipOnFail)
  }

  get name() {
    return this._name ? this._name : ''
  }

}

module.exports = Step
