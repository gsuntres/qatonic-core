const _ = require('lodash')
const Context = require('./context')

class Session {

  /**
   * @param {object} initContext
   */
  constructor(initContext = {}) {
    this._id = _.uniqueId('sess')
    this._context = new Context(initContext)
  }

  /**
   * Create or update an existing variable in the context
   * @param {string} key the name of the variable to update
   * @param {*} value
   * @param {Symbol} [scope=Context.SCOPES.GLOBAL]
   */
  updateContext(key, value, scope = Context.SCOPES.GLOBAL) {
    this._context.update(key, value, scope)
  }

  static getScope(scopeStr) {
    switch(scopeStr) {
      case 'global': return Context.SCOPES.GLOBAL
      case 'session': return Context.SCOPES.SESSION
      case 'runner': return Context.SCOPES.RUNNER
    }
  }

  /**
   * @param {Symbol} [scope=Context.SCOPES.GLOBAL]
   */
  resetContext(scope = Context.SCOPES.STEP) {
    this._context.reset(scope)
  }

  filteredContext(variables = []) {
    return variables.length !== 0 ? _.pick(this._context.ctx, variables) : this._context.ctx
  }

  get context() {
    return this._context.ctx
  }

}

Session.CONTEXT_SCOPES = Context.SCOPES

module.exports = Session
