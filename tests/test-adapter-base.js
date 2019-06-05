const AdapterBase = require('../src/adapter-base')

const MULTILINE_SAMPLE = `This is a typical
 but in multiple
 lines`

class MockedAdapter extends AdapterBase {
  constructor(project) {
    super(project)
  }
}

describe('AdapterBase', () => {

  describe('#convertToMachineName()', () => {
    it('convert to a machine friendly name', () => {
      const mName = MockedAdapter.convertToMachineName('This is a typical     name')
      assert.strictEqual(mName, 'This-is-a-typical-----name')
    })

    it('convert to a machine friendly name (multi-line)', () => {
      const mName = MockedAdapter.convertToMachineName(MULTILINE_SAMPLE)
      assert.strictEqual(mName, 'This-is-a-typical-but-in-multiple-lines')
    })
  })

  describe('#_excludeProperties()', () => {
    it('should exlude properties', done => {
      const p = new Promise(resolve => {
        resolve(['file1', 'file2', 'properties'])
      })
      const a = new MockedAdapter()
      a._excludeProperties(p)
        .then(files => {
          assert.lengthOf(files, 2)
          assert.deepEqual(files, ['file1', 'file2'])
          done()
        })
    })
  })

  describe('#_checkConfig()', () => {
    const a = new MockedAdapter()
    const EMPTY_CONFIG = {
      runners:[],
      ignore:[]
    }

    it('pass for known properties', () => {
      assert.doesNotThrow(() => { a._checkConfig(EMPTY_CONFIG)})
    })

    it('throw for unknown property', () => {
      assert.throws(() => { a._checkConfig({foo: []}) }, '`foo` is an invalid configuration property')
    })
  })

  describe('#_mergeConfigProps()', () => {
    const a = new MockedAdapter()

    it('merge provided properties and defaults', () => {
      const p = { runners: ['g1.c1', 'g2.c2'] }
      const props = a._mergeConfigProps(p)
      assert.deepEqual(props, Object.assign(p, {ignore: []}))
    })

    it('throw an error for unknown properties', () => {
      const p = { foo: [] }
      const a = new MockedAdapter()
      assert.throws(() => { a._mergeConfigProps(p) }, '`foo` is an invalid configuration property')
    })
  })
})
