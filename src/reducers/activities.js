'use strict';

import type {Action } from '../actions/types';

export type State = {
    page: number;
    payload: Array<Object>;
    items: number;
    totalItems: number;
};

const initialState = {
    page: 0,
    payload: [],
    items: 0,
    totalItems: 0,
};

const payloadStack: Array<Object> = [];

function activities(state: State = initialState, action: Action): State {
    if (action.type === 'LOADED_ACTIVITIES') {
        payloadStack = payloadStack.concat(action.data.payload);
        return {
            page: action.data.page,
            items: action.data.items,
            totalItems: action.data.totalItems,
            payload: payloadStack,
        };
    }
    if (action.type === 'RESET_ACTIVITIES' || action.type === 'LOGGED_OUT') {
        payloadStack = [];
        return initialState;
    }
    return state;
}

module.exports = activities;