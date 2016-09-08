import { call, put } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import { APPLICATIONS_ADD, APPLICATIONS_ADD_SUCCEESS, APPLICATIONS_ADD_FAILED, 
  APPLICATIONS_FETCH, APPLICATIONS_FETCH_SUCCESS, APPLICATIONS_FETCH_FAILED,
  APPLICATIONS_DELETE, APPLICATIONS_DELETE_SUCCESS, APPLICATIONS_DELETE_FAILED } from '../actions'
import { applicationAddApi, applicationFetchApi, applicationDeleteApi } from '../api/application'

export function* applicationAdd ({ payload: { application } }) {
  try {
    const userId = getCookie('dataface-user-id')
    const applicationRequest = yield call(applicationAddApi, { application, userId })
    if (applicationRequest.status === 'success') {
      yield put({ type: APPLICATIONS_ADD_SUCCEESS, payload: { application } })
    }
    else yield put({ type: APPLICATIONS_ADD_FAILED, payload: { error: applicationRequest.error } })
  } catch (error) {
    console.log(error)
    yield put({ type: APPLICATIONS_ADD_FAILED, payload: { error: 'Une erreur est surevenue, veuillez reesayer ultérieurement.' } })
  }
}

export function* applicationFetch () {
  try {
    const userId = getCookie('dataface-user-id')
    const { data } = yield call(applicationFetchApi, { application, userId })
    if (data.length) yield put({ type: APPLICATIONS_FETCH_SUCCESS, payload: { applications: data } })
  } catch (error) {
    console.log(error)
    yield put({ type: APPLICATIONS_FETCH_FAILED, payload: { error: 'Une erreur est surevenue, veuillez reesayer ultérieurement.' } })
  }
}

export function* applicationDelete ({ payload: { applicationId } }) {
  try {
    const { status } = yield call(applicationDeleteApi, applicationId)
    if (status === 'success') yield put({ type: APPLICATIONS_DELETE_SUCCESS, payload: { applicationId } })
  } catch (error) {
    console.log(error)
    yield put({ type: APPLICATIONS_DELETE_FAILED, payload: { error: 'Une erreur est surevenue, veuillez reesayer ultérieurement.' } })
  }
}

function* watchApplicationAdd () {
  yield* takeEvery(APPLICATIONS_ADD, applicationAdd)
}

function* watchApplicationFetch () {
  yield* takeEvery(APPLICATIONS_FETCH, applicationFetch)
}

function* watchApplicationDelete () {
  yield* takeEvery(APPLICATIONS_DELETE, applicationDelete)
}

function* flow () {
  yield [
    watchApplicationAdd(),
    watchApplicationFetch(),
    watchApplicationDelete()
  ]
}

export default flow