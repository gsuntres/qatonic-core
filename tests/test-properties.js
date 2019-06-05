const Properties = require('../src/properties')

describe('Properties', () => {

  describe('#constructor()', () => {
    it('utilize', () => {
      const props = '{' +
        '"url": "dev5-dashboard.boxtep.com/v1",' +
        '"secure": true,' +
        '"timeout": 60000,' +
        '"headers": {' +
          '"Content-Type": "application/json;charset=utf-8",'+
          '"Accept": "application/json;charset=utf-8",'+
          '"Authorization": "Bearer ${oauth_token}",'+
          '"BX-WO": "${preferred_org_id}",'+
          '"BX-WC": "${preferred_com_id}",'+
          '"Age": ${age_fc}'+
        '}' +
      '}'
      const p = new Properties(props)
      assert.deepEqual(p.variables, ['oauth_token', 'preferred_org_id', 'preferred_com_id', 'age_fc'])
    })
  })
})
