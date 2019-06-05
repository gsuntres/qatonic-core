const { Context } = require('..')

describe('Context', () => {

  describe('#constructor()', () => {
    it('utilize defaults', () => {
      const c = new Context()
      assert.deepEqual(c.ctx, {})
    })
    it('utilize with initial context', () => {
      const c = new Context({a: 1})
      assert.deepEqual(c.ctx, {a: 1})
    })
  })

  describe('#update()', () => {
    const c = new Context()
    it('update global', () => {
      c.update('a', 3, Context.SCOPES.GLOBAL)
      assert.deepEqual(c._ctx, {a: 3})
    })
    it('update session', () => {
      c.update('sessVar', {sessObj: 'some value'}, Context.SCOPES.SESSION)
      assert.deepEqual(c._sessionCtx, {sessVar: {sessObj: 'some value'}})
    })
    it('update runner', () => {
      c.update('rVar', {rObj: 'some rvalue'}, Context.SCOPES.RUNNER)
      assert.deepEqual(c._runnerCtx, {rVar: {rObj: 'some rvalue'}})
    })
    it('update step', () => {
      c.update('sVar', {sObj: 'some svalue'}, Context.SCOPES.STEP)
      assert.deepEqual(c._stepCtx, {sVar: {sObj: 'some svalue'}})
    })
    it('throw when scope is invalid', () => {
      assert.throws(() => { c.update('a', 1, 'noscope') }, 'Faild to update context, unknown scope `noscope`')
    })
  })

  describe('#reset()', () => {
    const c = new Context({a: 1})
    it('reset global', () => {
      c.update('a', 3, Context.SCOPES.GLOBAL)
      c.reset(Context.SCOPES.GLOBAL)
      assert.deepEqual(c._ctx, {a: 1})
    })
    it('reset session', () => {
      c.update('sessVar', {sessObj: 'some value'}, Context.SCOPES.SESSION)
      c.reset(Context.SCOPES.SESSION)
      assert.isEmpty(c._sessionCtx)
    })
    it('reset runner', () => {
      c.update('rVar', {rObj: 'some rvalue'}, Context.SCOPES.RUNNER)
      c.reset(Context.SCOPES.RUNNER)
      assert.isEmpty(c._runnerCtx)
    })
    it('reset step', () => {
      c.update('sVar', {sObj: 'some svalue'}, Context.SCOPES.STEP)
      c.reset(Context.SCOPES.STEP)
      assert.isEmpty(c._stepCtx)
    })
    it('throw when scope is invalid', () => {
      assert.throws(() => { c.reset('noscope') }, 'Faild to reset context, unknown scope `noscope`')
    })
  })

  describe('#ctx', () => {
    it('return default', () => {
      const c = new Context()
      assert.isEmpty(c.ctx)
    })
    it('return init context', () => {
      const c = new Context({a: 1})
      assert.deepEqual(c.ctx, {a: 1})
    })
  })

  describe('#ctx (overrides)', () => {
    it('session overrides global', () => {
      const c = new Context({a: 'globalval'})
      c.update('a', 'sessionVal', Context.SCOPES.SESSION)
      assert.deepEqual(c.ctx, {a: 'sessionVal'})
    })
    it('runner overrides session and global', () => {
      const c = new Context({a: 'globalval'})
      c.update('a', 'sessionVal', Context.SCOPES.SESSION)
      c.update('a', 'runnerVal', Context.SCOPES.RUNNER)
      assert.deepEqual(c.ctx, {a: 'runnerVal'})
    })
    it('step overrides runner/session/global', () => {
      const c = new Context({a: 'globalval'})
      c.update('a', 'sessionVal', Context.SCOPES.SESSION)
      c.update('a', 'runnerVal', Context.SCOPES.RUNNER)
      c.update('a', 'stepVal', Context.SCOPES.STEP)
      assert.deepEqual(c.ctx, {a: 'stepVal'})
    })
    it('propertly reset step', () => {
      const c = new Context({a: 'globalval'})
      c.update('a', 'sessionVal', Context.SCOPES.SESSION)
      c.update('a', 'runnerVal', Context.SCOPES.RUNNER)
      c.update('a', 'stepVal', Context.SCOPES.STEP)
      c.reset(Context.SCOPES.STEP)
      assert.deepEqual(c.ctx, {a: 'runnerVal'})
    })
    it('propertly reset runner', () => {
      const c = new Context({a: 'globalval'})
      c.update('a', 'sessionVal', Context.SCOPES.SESSION)
      c.update('a', 'runnerVal', Context.SCOPES.RUNNER)
      c.reset(Context.SCOPES.RUNNER)
      assert.deepEqual(c.ctx, {a: 'sessionVal'})
    })
    it('propertly reset session', () => {
      const c = new Context({a: 'globalval'})
      c.update('a', 'sessionVal', Context.SCOPES.SESSION)
      c.reset(Context.SCOPES.SESSION)
      assert.deepEqual(c.ctx, {a: 'globalval'})
    })
  })

})
