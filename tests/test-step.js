const Step = require('../src/step')

describe('Step', () => {

  describe('#parse()', () => {

    it('throw invalid input (emtpy input)', () => {
      assert.throws(() => { Step.create({}) }, 'Input required')
    })

    it('define register statement', () => {
      const plainObj = {
        command: 'group.cmd',
        register: {
          var1: 'out_a',
          var2: 'out_b'
        }
      }
      const step = Step.create(plainObj)
      assert.deepEqual(step.register, plainObj.register)
    })

    it('return values used in the context statement', () => {
      const plainObj = {
        command: 'group.cmd',
        context: '{"var1":${var1_fc},"var2":"${var2_fc}"}'
      }
      const step = Step.create(plainObj)
      assert.isDefined(step.context)
      assert.deepEqual(step.context.variables, ['var1_fc', 'var2_fc'])
    })

    it('return values used in properties', () => {
      const plainObj = {
        command: 'group.cmd',
        props: '{"var1":${var1_fc}:"var2":"${var2_fc}"}'
      }
      const step = Step.create(plainObj)
      assert.isDefined(step.props)
      assert.deepEqual(step.props.variables, ['var1_fc', 'var2_fc'])
    })

    it('define tests statement', () => {
      const tests = [
        {
          type: 'deepEqual',
          actual: 'body',
          expected: {
            id:1,
            name: 'MyCompanyName'
          },
          message: 'should create a new company with id'
        }
      ]
      const plainObj = {
        command: 'group.cmd',
        tests
      }

      const step = Step.create(plainObj)
      assert.deepEqual(step.tests, tests)
    })

  })

  describe('#processed', () => {
    const plainObj = {
      command: 'group.cmd',
      context: '{"var1":${var1_fc},"var2":"${var2_fc}"}',
      props: '{"var1":${var1_fc},"var2":"${var2_fc}"}'
    }

    it('throw when not processed', () => {
      const p = Step.create(plainObj)
      assert.throws(() => { p.processed }, 'This entity hasn\'t been processed. Run `process` first.')
    })

    it('process templates within the step', () => {
      const p = Step.create(plainObj)
      p.process({
        var1_fc: 2,
        var2_fc: 'Hello'
      })
      assert.deepEqual(p.processed.props, {
        var1: 2,
        var2: 'Hello'
      })
    })

  })

})
