const Processable = require('../src/processable')
const Template = require('../src/template')

class Mocked extends Processable {
  constructor() {
    super()
    this.props = new Template('{"var1":${num1_fc},"var2":"${var2_fc}"}')
    this.props2 = new Template('{"var2":"${var2_fc}"}')
  }
}

describe('Processable', () => {

  describe('#process', () => {

    it('process templates', () => {
      const p = new Mocked()
      p.process({
        num1_fc: 2,
        var2_fc: 'Hello'
      })

      assert.deepEqual(p.processed, {
          props: {
            var1: 2,
            var2: 'Hello'
          },
          props2: { var2: 'Hello' }
        })
    })

    it('throw if not processed', () => {
      const p = new Mocked()
      assert.throws(() => { p.processed }, 'This entity hasn\'t been processed. Run `process` first.')
    })

    it('should process even if variables are not defined', () => {
      const p = new Mocked()
      assert.doesNotThrow(() => { p.process({}) }, 'It shouldn\'t throw')
    })

    it('proccessed without process when no variables', () => {
      class MockedNoVariables extends Processable {
        constructor() {
          super()
          this.props = new Template('{"var1":12}')
        }
      }
      const p = new MockedNoVariables()
      assert.deepEqual(p.processed, { props: { var1: 12 } })
    })
  })

  describe('#_identifyTemplates()', () => {

    it('return instances of Template', () => {
      const p = new Mocked()
      const tpls = p._identifyTemplates()
      assert.deepEqual(tpls, ['props', 'props2'])
    })
  })

  describe('#variables', () => {

    it('return all the variables templates are using', () => {
      const p = new Mocked()
      assert.deepEqual(p.variables, ['num1_fc','var2_fc'])
    })

  })

})
