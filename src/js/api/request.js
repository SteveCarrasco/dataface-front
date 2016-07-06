import superagent from 'superagent'
import promise from 'es6-promise'
import superagentPromisePlugin from 'superagent-promise-plugin'

promise.polyfill()

export default const request = superagentPromisePlugin.patch(superagent)