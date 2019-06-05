const _ = require('lodash')

/**
 * Uniquely identifies a command or a runner.
 */
class Qualifier {

  /**
   * @param {string} group
   * @param {string} name
   */
  constructor(group, name) {
    if(_.isEmpty(group) || _.isEmpty(name)) throw new Error('`Group` and `name` is required')
    this.group = group
    this.name = name
  }

  /**
   * @param {string} qname representation of a qualifier (e.g. mygroup.mycommand).
   * @return {object} the {@link Qualifier} instance.
   */
  static parse(qname) {
    if(_.isEmpty(qname)) throw new Error('Input required')

    const frags = qname.split('.')
    if(_.compact(frags).length !== 2) throw new Error(`Invalid qualifier \`${qname}\``)

    return new Qualifier(frags[0], frags[1])
  }

  /**
   * Convenient method to check for potential qualifier representation.
   * @param {string} qname representation of a qualifier (e.g. mygroup.mycommand).
   * @return {boolean}
   */
  static isQualifier(qname) {
    return _.compact(qname.split('.')).length === 2
  }

  toString() {
    return `${this.group}.${this.name}`
  }

  get id() {
    return this.toString()
  }
}

module.exports = Qualifier
