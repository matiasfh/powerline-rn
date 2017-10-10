/*
* @flow
*/
export const ANALYTICS_LOADED = 'ANALYTICS_LOADED'
export const ANALYTICS_LIST_TYPE_SELECTED = 'ANALYTICS_LIST_TYPE_SELECTED'
export const ANALYTICS_FILTER_MODE_SELECTED = 'ANALYTICS_FILTER_MODE_SELECTED'
import type { Action, AnalyticsData } from './types'


export const onAnalyticsLoaded = ({ upvotes, downvotes, representatives, most_popular }: Data) => ({
  type: ANALYTICS_LOADED,
  payload: {
    upvotes,
    downvotes,
    representatives,
    most_popular
  }
})

export const onAnalyticsListTypeSelected = (mode) =>  ({
  type: ANALYTICS_LIST_TYPE_SELECTED,
  payload: {
    mode
  }
})

export const onAnalyticsFilterModeSelected = (mode) => ({
  type: ANALYTICS_FILTER_MODE_SELECTED,
  payload: {
    mode
  }
})