const _ = require('lodash')

const DATA_TYPES = Object.freeze({
  STRING: Symbol('string'),
  BOOL: Symbol('bool'),
  NUMBER: Symbol('number'),
  OBJECT: Symbol('object'),
  KV: Symbol('key_value')
})

const BASE_SCHEMA_IN = {
  delay: {
      desc: 'delay this call (in ms)',
      type: DATA_TYPES.NUMBER,
      default: 0
  }
}

/**
 * Base class for plugins. A plugin is being used by agents to execute commands.
 * A plugin has to define both an input and an output schema.
 * @interface
 */
class PluginBase {

  /**
   * @param {object} schemaIn  e.g.
   *                           prop1: {
   *                             desc: 'A short description of this property',
   *                             type: Any of {@link DATA_TYPES},
   *                             default: A default value (optional)
   *                           }
   * @param {object} schemaOut e.g.
   *                           output1: {
   *                             desc: 'A short description of this output',
   *                             type: Any of {@link DATA_TYPES}
   *                           }
   * @param {object} props     Define properties to use. if not defined default will be used.
   */
  constructor(schemaIn, schemaOut, props = {}) {
    this._schemaIn = Object.assign({}, schemaIn, BASE_SCHEMA_IN)
    this._schemaOut = schemaOut
    this._props = this._processProperties(props)
  }

  /**
   */
  run() {
    throw new Error('need to implement this')
  }

  get props() {
    return this._props
  }

  get name() {
    throw new Error('need to implement this')
  }

  get schemaIn() {
    return this._schemaIn
  }

  get schemaOut() {
    return this._schemaOut
  }

  get version() {
    throw new Error('need to implement this')
  }

  _processProperties(properties) {
    if(!_.isObject(properties))
      throw new Error('Error assigning properties, invalid properties.')

    const propertiesKeys = Object.keys(properties)
    const schemaInKeys = Object.keys(this._schemaIn)

    // make sure properties have the desired keys
    let r = _.differenceWith(propertiesKeys, schemaInKeys, _.isEqual)
    if(!_.isEmpty(r))
      throw new Error(`Error assigning properties, unknown properties ${JSON.stringify(r)}`)

    // ensure required properties
    const propertiesRequiredKeys = Object.keys(_.pickBy(this._schemaIn, o => _.isUndefined(o['default'])))
    r = _.differenceWith(propertiesRequiredKeys, propertiesKeys, _.isEqual)
    if(!_.isEmpty(r)) {
      throw new Error(`Error assigning properties, required properties ${JSON.stringify(r)}`)
    }

    // ensure correct type
    for(let i = 0; i !== propertiesKeys.length; i++) {
      const key = propertiesKeys[i]
      const val = properties[key]
      const type = _.get(this._schemaIn, [key, 'type'])
      if(type === PluginBase.DATA_TYPES.STRING && !_.isString(val)) {
        throw new Error(`${key} should be a string`)
      } else if(type === PluginBase.DATA_TYPES.BOOL && !_.isBoolean(val)) {
        throw new Error(`${key} should be a boolean`)
      } else if(type === PluginBase.DATA_TYPES.NUMBER && !_.isFinite(val)) {
        throw new Error(`${key} should be a number`)
      } else if(type === PluginBase.DATA_TYPES.OBJECT && !_.isObject(val)) {
        throw new Error(`${key} should be an object}`)
      }
    }

    const propKeys = Object.keys(this._schemaIn)
    const props = {}
    for(let i = 0; i !== propKeys.length; i++) {
      const k = propKeys[i]
      props[k] = !_.isUndefined(properties[k]) ? properties[k] : this._schemaIn[k]['default']
    }

    return props
  }

}

PluginBase.DATA_TYPES = DATA_TYPES

module.exports = PluginBase
