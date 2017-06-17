# Logger as a service wrapper for Node js
This package provides makes easy to consume a [logger-aas api](https://github.com/ass-a-service/logger-aas).

# Installation & Usage
Easy to install from npm repository:
`npm install loggeraas-node-wrapper --save`

Then import the package in your code, configure it with an [logger-aas](https://github.com/ass-a-service/logger-aas) service and start logging your stuff.
```javascript
// Require the package:
const loggerAasNodeWrapper = require('loggeraas-node-wrapper')

// Instantiate your logger and configure it:
const myShinyLogger = loggerAasNodeWrapper({
  host: 'logger.assa.services',
  path: '/api/v1/logs',
  method: 'POST',
  hash: 'loggeraas-node-wrapper-examples',
  enabled: true,
  verbose: true
})

// Start logging:
myShinyLogger.log('This is my first log')
myShinyLogger.log({ text: 'This is my second log', customKey: 'whatever' })
```
