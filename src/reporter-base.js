/**
 * Base class for Reporters. A typical reporter will get injected into the
 * runtime and gather userful information from the overal execution.
 * @interface
 */
class ReporterBase {

  /**
   * @param {Qualifier} qualifier
   * @param {string} [description='']
   */
  onRunner() {
    throw new Error('need to implement this')
  }

  /**
   * @param {Qualifier} qualifier
   */
  onRunnerDone() {
    throw new Error('need to implement this')
  }

  /**
   * @param {Qualifier} qualifier Runner's qualifier
   * @param {number} idx Step index
   * @param {object} context Context used
   * @param {string} error
   */
  onStepError() {
    throw new Error('need to implement this')
  }

  /**
   * @param {Qualifier} qualifier
   * @param {string} error
   */
  onRunnerError() {
    throw new Error('need to implement this')
  }

  /**
   * @param {Qualifier} runnerQualifier
   * @param {object} props
   * @param {string} [description='']
   */
  onStep() {
    throw new Error('need to implement this')
  }

  get name() {
    return this._name
  }
}

module.exports = ReporterBase
