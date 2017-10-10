/*
* @flow
*/
import type {Action, AnalyticsData } from 'src/actions/types';
import {
  ANALYTICS_LOADED,
  ANALYTICS_LIST_TYPE_SELECTED,
  ANALYTICS_FILTER_MODE_SELECTED
} from 'src/actions/analytics'


const initialState: AnalyticsData = {
  most_popular: [],
  representatives: [],
  list: [],
  downvotes: 0,
  upvotes: 0,
  loading: true,
  renderMode: 'ALL',
  filterMode: 'ELECTED'
}

const analytics = (state: AnalyticsData = initialState, action: Action) : AnalyticsData => {
  switch (action.type) {
    case ANALYTICS_LOADED: 
      const getPercent = (number, total) => {
        let base = parseInt(number, 10) || 0
        return (number/total).toFixed(2)
      }

      const setData =(item) => ({
        ...item,
        upvotes: parseInt(item.upvotes,10) || 0,
        downvotes: parseInt(item.downvotes, 10) || 0,
        percUpvotes: getPercent(item.upvotes, data.total),
        percDownvotes: getPercent(item.downvotes, data.total),
        total: (parseInt(item.upvotes,10) || 0) + (parseInt(item.downvotes, 10) || 0),
      })

      const data = {
        upvotes: parseInt(action.payload.upvotes, 10) || 0,
        downvotes: parseInt(action.payload.downvotes, 10) || 0,
      }
      data.total = data.upvotes + data.downvotes 
      data.representatives = action.payload.representatives.map(item => setData(item))
      data.most_popular = action.payload.most_popular.map(item => setData(item))
      return {
        ...state,
        ...data,
        list: data.representatives,
        loading: false
      }
    case ANALYTICS_LIST_TYPE_SELECTED:
      return {
        ...state,
        renderMode: action.payload.mode
      }
    case ANALYTICS_FILTER_MODE_SELECTED:
      let list
      switch(action.payload.mode){
        case 'ELECTED':
          list = state.representatives
          break
        case 'AUTHOR':
          list = state.representatives //filter by author prop of the representatives and author of post
          break
        case 'TOPLEADERS':
          list = state.most_popular
          break
        case 'TOPTOWNS':
          list = state.most_popular // need to filter list by town but town prop doesn't exists
        case 'MAP':
          list = state.representatives // what do do here?
          break;
        case 'CUSTOM': 
          list = state.representatives // what do do here?
          break;
        default:
          list = state.representatives // what do do here?
          break;
      }
      return {
        ...state,
        filterMode: action.payload.mode,
        list
      }
    default:
      return state
  }
}

export default analytics