const Template = require('../src/template')

const RAW = '{"arg1":${number_from_context},"arg2":"${string_from_context}"}'

describe('Template', () => {

  describe('#constructor()', () => {

    it('should utilize', () => {
      assert.doesNotThrow(() => new Template(RAW))
    })

  })

  describe('#variables', () => {

    it('create a Qualifier object', () => {
      const tpl = new Template(RAW)
      assert.deepEqual(tpl.variables, ['number_from_context', 'string_from_context'])
    })

  })

  describe('#parse()', () => {

    it('parse with data', () => {
      const tpl = new Template(RAW)
      const data = {
        number_from_context: 1,
        string_from_context: 'bla'
      }
      const expected = {
        arg1:1,
        arg2:'bla'
      }

      assert.deepEqual(tpl.parse(data), expected)
    })

    it('parse strings', () => {
      const tpl = new Template('a string!')
      assert.strictEqual(tpl.parse(), 'a string!')
    })

    it('parse numbers', () => {
      const tpl = new Template(1)
      assert.strictEqual(tpl.parse(), 1)
    })

    it('parse key value', () => {
      const tpl = new Template('${var_fc}')
      assert.strictEqual(tpl.parse({var_fc: 1}), 1)
    })

  })

})
