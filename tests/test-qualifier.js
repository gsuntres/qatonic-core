const { Qualifier } = require('..')

describe('Qualifier', () => {

  describe('#constructor()', () => {

    it('should utilize', () => {
      assert.doesNotThrow(() => new Qualifier('group1', 'name1'))
    })

    it('not accept empty group', () => {
      assert.throws(() => new Qualifier('', 'name1'))
    })

    it('not accept empty name', () => {
      assert.throws(() => new Qualifier('group1', ''))
    })
  })

  describe('#parse()', () => {

    it('create a Qualifier object', () => {
      const q = Qualifier.parse('group1.name1')
      assert.deepEqual(q, new Qualifier('group1', 'name1'))
    })

    it('throw on undefined input', () => {
      assert.throws(Qualifier.parse, 'Input required')
    })

    it('throw on invalid input', () => {
      assert.throws(() => Qualifier.parse('group1'))
    })

    it('throw on valid input, but with empty name', () => {
      assert.throws(() => Qualifier.parse('group1.'))
    })

    it('throw on valid input, but with empty group', () => {
      assert.throws(() => Qualifier.parse('.name1'))
    })
  })

  describe('#isQualifier()', () => {
    it('with group and name', () => assert.isTrue(Qualifier.isQualifier('group.name')))
    it('when group only', () => assert.isFalse(Qualifier.isQualifier('group')))
    it('when group and empty name', () => assert.isFalse(Qualifier.isQualifier('group.')))
    it('when name and empty group', () => assert.isFalse(Qualifier.isQualifier('.name')))
  })

  describe('#toString()', () => {

    it('return the full qualifier', () => {
      const q = Qualifier.parse('group1.name1')
      assert.equal(q.toString(), 'group1.name1')
    })
  })

  describe('getters', () => {
    const q = Qualifier.parse('group1.name1')
    it('return group', () => {
      assert.strictEqual(q.group, 'group1')
    })
    it('return name', () => {
      assert.strictEqual(q.name, 'name1')
    })
  })

})
