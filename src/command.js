const _ = require('lodash')
const Qualifier = require('./qualifier')
const Processable = require('./processable')
const Template = require('./template')

/**
 * Basic structure of a command, defines the plugin and its properties.
 */
class Command extends Processable {

  /**
   * @param {string} [group]
   * @param {string} [name]
   * @param {sting} plugin The plugin this command uses.
   * @param {string} [props] Plugin properties, a parsable JSON template object.
   */
  constructor(group, name, plugin, props) {
    super()
    if(!_.isUndefined(group) && !_.isUndefined(name)) {
      this.qualifier = new Qualifier(group, name)
    }
    this.plugin = plugin
    this.props = _.isUndefined(props) ? undefined : new Template(props)
  }

  /**
   * @param {object} plainObj
   * @return {Command}
   * @throws {Error} Undefined group, name or plugin.
   */
  static parse(plainObj) {
    const group = _.get(plainObj, 'group')
    if(_.isUndefined(group)) {
      throw new Error('Undefined group')
    }

    const name = _.get(plainObj, 'name')
    if(_.isUndefined(name)) {
      throw new Error('Undefined name')
    }

    const plugin = _.get(plainObj, 'plugin')
    if(_.isUndefined(plugin)) {
      throw new Error('undefined plugin')
    }

    const props = _.get(plainObj, 'props')

    return new Command(group, name, plugin, props)
  }

}

module.exports = Command
