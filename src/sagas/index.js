import { fork } from 'redux-saga/effects';
import watchAnalytics from './analytics'

export default function* rootSaga() {
  yield fork(watchAnalytics)
}