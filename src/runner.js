const Qualifier = require('./qualifier')
const Step = require('./step')
const _ = require('lodash')

module.exports = class Runner {

  constructor(group, name, steps = []) {
    this.qualifier = new Qualifier(group, name)
    this.steps = steps
  }

  addStep(stepObj) {
    this.steps.push(Step.create(stepObj))
  }

  toString() {
    this.qualifier.toString()
  }

  static create(obj) {
    const group = _.get(obj, 'group')
    const name = _.get(obj, 'name')
    const steps = _.get(obj, 'steps', [])

    const r = new Runner(group, name)
    steps.forEach(s => r.addStep(s))

    return r
  }

}
