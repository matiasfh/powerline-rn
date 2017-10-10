import { call, put, takeLatest, select } from 'redux-saga/effects';
import { ActionConst } from 'react-native-router-flux';
import { API_URL } from 'src/PLEnv'
import { onAnalyticsLoaded } from 'src/actions/analytics'

const getToken = (state) => state.user.token

const getAnalytics = async (id, token) => {
  const url = `${API_URL}/v2/posts/${id}/analytics`
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'token': token,
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}

function* onNavigateToAnalytics({key,id }) {
  try {
    if(key==='analytics'){
      const token = yield select(getToken) 
      const response = yield call(getAnalytics, 256, token) 

      yield put(onAnalyticsLoaded({
        upvotes: response.total.upvotes || 0,
        downvotes: response.total.downvotes || 0,
        most_popular: response.most_popular,
        representatives: response.representatives,
      }))
    }
  } catch(e) {
    console.log(e)
  }
}


export default function* watchAnalytics () {
  yield takeLatest(ActionConst.PUSH, onNavigateToAnalytics)
}