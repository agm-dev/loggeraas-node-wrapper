const logger = require('../loggeraas-node-wrapper')
const config = {
  host: 'logger.assa.services',
  path: '/api/v1/logs',
  method: 'POST',
  hash: 'loggeraas-node-wrapper-tests',
  enabled: true
}
const l = logger(config)

test('logs', () => {
  expect(l.log('test')).toBe(true)
})
