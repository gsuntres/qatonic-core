const { Session } = require('..')

describe('Session', () => {

  describe('#constructor', () => {

    const initContext = {
      var1: 'valofvar1',
      var2: 'valofvar2',
      var3: 'valofvar3'
    }

    it('should utilize with defaults', () => {
      const sess = new Session()
      assert.deepEqual(sess.filteredContext(), {})
    })

    it('should utilize with context', () => {
      const sess = new Session(initContext)
      assert.deepEqual(sess.filteredContext(), initContext)
    })

    it('should filter context', () => {
      const sess = new Session(initContext)
      assert.deepEqual(sess.filteredContext(['var2']), {var2: 'valofvar2'})
    })

  })

})
