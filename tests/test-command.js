const Command = require('../src/command')

describe('Command', () => {

  describe('#constructor()', () => {
    it('utilize', () => {
      const p = new Command('group1', 'name1')
      assert.strictEqual(p.qualifier.group, 'group1')
      assert.strictEqual(p.qualifier.name, 'name1')
      assert.isUndefined(p.plugin)
      assert.isUndefined(p.props)
    })
  })

  describe('#parse()', () => {
    const props = '{"foo": ${bar_fc}}'
    const plainObj = {
      group: 'group1',
      name: 'command-1',
      plugin: 'foo',
      props
    }

    it('utilize an object', () => {
      const p = Command.parse(plainObj)
      assert.strictEqual(p.qualifier.id, 'group1.command-1')
      assert.strictEqual(p.plugin, 'foo')
      assert.deepEqual(p.props.variables, ['bar_fc'])
    })
  })

  describe('#processed', () => {
    const props = '{"foo": ${bar_fc}}'
    const plainObj = {
      group: 'group1',
      name: 'command-1',
      plugin: 'foo',
      props
    }

    it('throw when not processed', () => {
      const p = Command.parse(plainObj)
      assert.throws(() => { p.processed }, 'This entity hasn\'t been processed. Run `process` first.')
    })

    it('process templates within the command', () => {
      const p = Command.parse(plainObj)
      p.process({bar_fc: 2})
      assert.deepEqual(p.processed.props, {foo: 2})
    })

  })

})
