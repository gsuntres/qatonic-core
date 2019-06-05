const chalk = require('chalk')
const _ = require('lodash')

class Console {

  constructor() {
    this.log = console.log // eslint-disable-line no-console
    this._verbose = false
    this._veryVerbose = false
  }

  raw(cb) {
    if(cb) this.log(cb(chalk))
  }

  verbose(verbose, veryVerbose = false) {
    this._veryVerbose = veryVerbose
    if(veryVerbose) verbose = true
    this._verbose = verbose
  }

  // a (always) to display regardless of verbosity
  a(message, style) {
    this.withStyle(message, style)
  }

  err(message) {
    this.a(message, 'red')
  }

  success(message) {
    this.a(message, 'green')
  }

  v(message, style = 'magenta') {
    if(this._verbose) {
      this.withStyle(message, style)
    }
  }

  vv(message, style = 'blue') {
    if(this._veryVerbose) {
      this.withStyle(message, style)
    }
  }

  withStyle(message, style) {
    if(typeof message === 'function') {
      return this.raw(message)
    }

    let msg = this._stringifyWhenObject(message)
    if(this._veryVerbose) {
      const caller = this._getCaller()
      msg = `[${caller.file}:${caller.lineNumber}] ${msg}`
    }

    if(style) {
      const chalk_ = _.get(chalk, style, '')
      this.log(chalk_(msg))
    } else {
      this.log(msg)
    }
  }

  _stringifyWhenObject(message) {
    return _.isObject(message) ? JSON.stringify(message, null, 2) : message
  }

  _getCaller() {
    let caller = {
      file: undefined,
      lineNumber: undefined
    }

    try {
      const err = new Error()

      Error.prepareStackTrace = (err, stack) => stack

      if(err.stack.length !== 0) {
        const curFile = err.stack[0].getFileName()
        for(let i = 1; i !== err.stack.length; i++) {
          const calFile = err.stack[i].getFileName()

          if(curFile !== calFile) {
            caller.file = `...${calFile.substr(calFile.length - 25)}`
            caller.lineNumber = err.stack[i].getLineNumber()
            break
          }
        }
      }
    } catch(err) { } // eslint-disable-line no-empty

    return caller
  }

  _getCallerFile() {
    let callerFile = undefined

    try {
      const err = new Error()

      Error.prepareStackTrace = (err, stack) => stack

      if(err.stack.length !== 0) {
        const curFile = err.stack[0].getFileName()
        for(let i = 1; i !== err.stack.length; i++) {
          const calFile = err.stack[i].getFileName()

          if(curFile !== calFile) {
            callerFile = `...${calFile.substr(calFile.length - 25)}`
            break
          }
        }
      }
    } catch(err) { } // eslint-disable-line no-empty

    return callerFile
  }
}

module.exports = new Console()
