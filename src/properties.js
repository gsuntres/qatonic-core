const _ = require('lodash')
const Processable = require('./processable')
const Template = require('./template')

/**
 * Properties as defined in the environments.
 */
class Properties extends Processable {

  /**
   * @param {string} props Plugin properties.
   */
  constructor(props) {
    super()
    this.props = _.isUndefined(props) ? undefined : new Template(props)
  }

}

module.exports = Properties
