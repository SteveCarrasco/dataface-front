import test from './test'
import user from './user'
import { fork, call } from 'redux-saga/effects'
import { fetchUrl } from '../api/fetch'

function* root () {
  yield [
  	fork(test),
  	fork(user)
  ]
}

export default root
