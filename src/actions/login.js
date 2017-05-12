/**
 * @flow
 */

'use strict';

const ActionSheetIOS = require('ActionSheetIOS');
const { Platform } = require('react-native');
const Alert = require('Alert');

import type { Action, ThunkAction } from './types';

const { API_URL } = require('../PLEnv');

async function logIn(username: string, password: string): Promise<Action> {
  try {
    let response = await fetch(`${API_URL}/secure/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    });
    let user = await response.json();
    if (user.token) {
      const action = {
        type: 'LOGGED_IN',
        data: {
          id: user.id,
          username: user.username,
          token: user.token,
          is_registration_complete: user.is_registration_complete,
        },
      };
      return Promise.resolve(action);
    }
    else {
      return Promise.reject(user);
    }
  } catch (error) {
    console.error(error);
  }
}

function logInManually(username: string, password: string): ThunkAction {
  return (dispatch) => {
    const login = logIn(username, password);
    login.then(
      (result) => {
        dispatch(result);
      }
    );
    return login;
  }
}


module.exports = { logInManually };
