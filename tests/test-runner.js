const Runner = require('../src/runner')
const Step = require('../src/step')

describe('Runner', () => {

  describe('#create()', () => {
    it('return a Runner', () => {
      const o = {
        group: 'runner-group-1',
        name: 'runner-1',
        steps: [
          { command: 'g1.c1' },
          { command: 'g1.c2' },
          { command: 'g2.c1' }
        ]
      }
      const r = Runner.create(o)
      assert.strictEqual(r.qualifier.group, 'runner-group-1')
      assert.strictEqual(r.qualifier.name, 'runner-1')
      assert.deepInclude(r.steps[1], Step.create({command: 'g1.c2'}))
    })

  })

})
