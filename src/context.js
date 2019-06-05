const SCOPES = Object.freeze({
  GLOBAL: Symbol('global'),
  SESSION: Symbol('session'),
  RUNNER: Symbol('runner'),
  STEP: Symbol('step')
})

class Context {

  constructor(initCtx = {}) {
    this._initCtx = Object.assign({}, initCtx)
    this._ctx = Object.assign({}, initCtx)
    this._sessionCtx = {}
    this._runnerCtx = {}
    this._stepCtx = {}
  }

  update(key, value, scope) {
    if(typeof key === 'undefined' || key === null)
      throw new Error('Failed to update context, invalid key')

    switch(scope) {
    case SCOPES.GLOBAL:
      this._ctx[key] = value
      break
    case SCOPES.SESSION:
      this._sessionCtx[key] = value
      break
    case SCOPES.RUNNER:
      this._runnerCtx[key] = value
      break
    case SCOPES.STEP:
      this._stepCtx[key] = value
      break
    default:
      throw new Error(`Faild to update context, unknown scope \`${scope}\``)
    }
  }

  reset(scope) {
    switch(scope) {
    case SCOPES.GLOBAL:
      this._resetObj(this._ctx, this._initCtx)
      break
    case SCOPES.SESSION:
      this._resetObj(this._sessionCtx)
      break
    case SCOPES.RUNNER:
      this._resetObj(this._runnerCtx)
      break
    case SCOPES.STEP:
      this._resetObj(this._stepCtx)
      break
    default:
      throw new Error(`Faild to reset context, unknown scope \`${scope}\``)
    }
  }

  get ctx() {
    return Object.assign({}, this._ctx, this._sessionCtx, this._runnerCtx, this._stepCtx)
  }

  _resetObj(obj, initObj = {}) {
    for (const key of Object.getOwnPropertyNames(obj)) {
      if(initObj[key]) {
        obj[key] = initObj[key]
      } else {
        delete obj[key]
      }
    }
  }

}

Context.SCOPES = SCOPES

module.exports = Context
