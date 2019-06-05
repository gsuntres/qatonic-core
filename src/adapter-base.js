const _ = require('lodash')

/**
 * An adapter to read commands, runners, variables, and configurations.
 * @interface
 */
class AdapterBase {

  /**
   * @param {string} project The name of the project.
   * @param {string} [env = 'devel'] The target environment.
   */
  constructor(project, env = 'devel') {
    this._project = project
    this._env = env
  }

  get name() {
    return this._name
  }

  /**
   * List all command groups.
   * @abstract
   * @return {Promise<string[]>}
   */
  commandGroups() {
    throw new Error('need to implement this')
  }

  /**
   * Given a qualifier return the command.
   * @abstract
   * @param {Qualifier} qualifier command's qualifier.
   * @return {Promise<Command>} Promise with the {@link Command}.
   */
  command() {
    throw new Error('need to implement this')
  }

  /**
   * List all commands within a group.
   * @abstract
   * @param {string} group
   * @return {Promise<string[]>} command list.
   */
  commands() {
    throw new Error('need to implement this')
  }

  /**
   * Will return all the variables defined within the current environment.
   * This is essentially the intialContext used in {@link Session#constructor}.
   * @abstract
   * @return {Promise<object>}
   */
  context() {
    throw new Error('need to implement this')
  }

  /**
   * Return the properties of a specific plugin and group. If there is no groups
   * the global properties should be returned.
   * @abstract
   * @param {string} pluginName the name of the plugin.
   * @param {string} [group] the group which the command belongs to.
   * @return {Promise<object>}
   */
  properties() {
    throw new Error('need to implement this')
  }

  /**
   * Return runner groups.
   * @abstract
   * @return {Promise<string[]>}
   */
  runnerGroups() {
    throw new Error('need to implement this')
  }

  /**
   * Provided a {@link Qualifier} return the runner.
   * @abstract
   * @param {Qualifier} qualifier Runner's qualifier.
   * @return {Promise<Runner>} Promise with the {@link Runner}
   */
  runner() {
    throw new Error('need to implement this')
  }

  /**
   * List all runners within a group.
   *
   * @abstract
   * @param {string} group
   * @return {Promise<string[]>} runner list.
   */
  runners() {
    throw new Error('need to implement this')
  }

  /**
   * Return a specific configuration.
   * @abstract
   * @param {string} [name='qatonic'] The configuration name to load.
   * @return {Promise<object>}
   * @throws {Error} When the configuration is not found.
   */
  config() {
    throw new Error('need to implement this')
  }

  /**
   * Save a command
   *
   * @abstract
   * @param {Command} command The command to save.
   * @return {Promise} A void Promise when done.
   */
  saveCommand() {
    throw new Error('need to implement this')
  }

  /**
   * Save a runner
   *
   * @abstract
   * @param {Runner} runner The runner to save.
   * @return {Promise} A void Promise when done.
   */
  saveRunner() {
    throw new Error('need to implement this')
  }

  /**
   * A utility function to convert a name with spaces into a more machine friendly name.
   * @param {string} name A name with spaces or new lines
   * @return {string} The machine name
   */
  static convertToMachineName(name) {
    let n_ = name.replace(/\n/g, '')
    return n_.replace(/[\s]/gm, '-')
  }

  get env() {
    return this._env
  }

  switchEnvs(env = 'devel') {
    this._env = env
  }

  /**
   * @param {Promise<string[]>} promise a promise returned from {@link AdapterBase#commands} or {@link AdapterBase#runners}.
   * @return {Prmise<string[]>} Promise with a list which has `properties` excluded.
   */
  _excludeProperties(promise) {
    return new Promise((resolve, reject) => {
      promise
        .then(names => {
          resolve(_.filter(names, n => n !== 'properties'))
        })
        .catch(err => reject(err))
    })
  }

  _mergeConfigProps(loadedProps) {
    const defaultOpts = {
      runners: [],
      ignore: []
    }
    return _(this._checkConfig(loadedProps))
      .pick(Object.keys(defaultOpts))
      .defaults(defaultOpts)
      .value()
  }

  _checkConfig(c) {
    // check for runnners
    Object.keys(c).forEach(confKey => {
      switch(confKey) {
        case 'runners':
        case 'ignore': break
        default: throw Error(`\`${confKey}\` is an invalid configuration property`)
      }
    })

    return c
  }
}

module.exports = AdapterBase
