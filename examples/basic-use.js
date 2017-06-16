const logger = require('../loggeraas-node-wrapper')
const config = {
  host: 'logger.assa.services',
  path: '/api/v1/logs',
  method: 'POST',
  hash: 'loggeraas-node-wrapper-examples',
  enabled: true
}
const l = logger(config)

l.log('log de ejemplo')
l.log({first: 'foo', second: 'bar'})
