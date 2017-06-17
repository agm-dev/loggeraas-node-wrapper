const https = require('https')

const logger = function (config) {
  if (
    typeof config === 'undefined' ||
    typeof config.host !== 'string' ||
    typeof config.hash !== 'string' ||
    typeof config.enabled !== 'boolean'
  ) {
    console.warn('loggeraas-node-wrapper bad configuration: you must provide config object with url, hash and enabled params')
    return false
  }

  const host = config.host
  const port = config.port || 443 // https by default
  const path = config.path || '/'
  const method = config.method || 'POST'
  const hash = config.hash
  const enabled = config.enabled
  const verbose = config.verbose || false

  // This logs and saves on loggeraas api you log message:
  function log (logData = '') {
    let logString
    if (typeof logData === 'string') {
      logString = logData
    } else if (typeof logData === 'object' && logData !== null) {
      logString = JSON.stringify(logData)
    } else {
      return console.warn('loggeraas-node-wrapper: needs a string or objet to log')
    }

    const logJson = JSON.stringify({ hash, text: logString })
    const headers = {
      'content-type': 'application/json',
      'content-length': Buffer.byteLength(logJson)
    }
    const requestOptions = { host, port, path, method, headers }

    let request = https.request(requestOptions, (res) => {
      res.setEncoding('utf8')
      let result = ''
      res.on('data', (chunk) => {
        result += chunk
      })

      res.on('end', () => {
        if (res.statusCode === 200 && verbose) {
          const responseObject = JSON.parse(result)
          const id = responseObject.data[0]._id
          console.log('loggerass-node-wrapper: your data has been recorded with id ' + id)
        } else if (res.statusCode !== 200) {
          console.log('loggerass-node-wrapper: error on logging your data: ' + result)
        }
      })
    })
    request.write(logJson)
    request.end()

    console.log(logString)
    return true
  }

  // Public methods:
  return {
    log: (data) => {
      if (enabled) return log(data)
      return false
    }
  }
}

module.exports = logger
