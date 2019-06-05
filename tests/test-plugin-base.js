const { PluginBase } = require('..')

const SCHEMA_IN = {
  prop1: {
      desc: 'prop1 descriptions here',
      type: PluginBase.DATA_TYPES.STRING,
      default: 'defaultvalue'
  },
  prop2: {
    desc: 'prop2 descriptions here',
    type: PluginBase.DATA_TYPES.NUMBER,
    default: 100
  },
  prop3: {
    desc: 'prop3 is required',
    type: PluginBase.DATA_TYPES.BOOL
  }
}

class MockedPlugin extends PluginBase {

  constructor(props = {}) {
    super(SCHEMA_IN, {}, props)
  }

  run() {}
}

describe('PluginBase', () => {

  describe('#constructor()', () => {

    it('throw when required not provided', () => {
      const props = { prop1: 2 }
      assert.throws(() => {new MockedPlugin(props)}, 'Error assigning properties, required properties ["prop3"]')
    })

    it('return true', () => {
      const p = new MockedPlugin({
        prop1: 'prop1_val',
        prop3: false
      })
      assert.deepEqual(p.props, {
        delay: 0,
        prop1: 'prop1_val',
        prop2: 100,
        prop3: false
      })
    })

    it('throw for unknown properties', () => {
      const props = {
        foo: '',
        bar: ''
      }
      assert.throws(() => {new MockedPlugin(props)}, 'Error assigning properties, unknown properties ["foo","bar"]')
    })

    it('throw when type is incorrect', () => {
      assert.throws(() => {new MockedPlugin({prop3: 1})}, 'prop3 should be a boolean')
    })

  })
})
