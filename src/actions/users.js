var { API_URL, PER_PAGE } = require('../PLEnv');
var { Action, ThunkAction } = require('./types');

async function loadUserProfile(token: string): Promise<Action> {
    try {
        var response = await fetch(`${API_URL}/v2/user?_format=json`, {
            method: 'GET',
            headers: {
                'token': token,
                'Content-Type': 'application/json',
            }
        });
        var json = await response.json();
        if (json.full_name) {
            const action = {
                type: 'LOADED_USER_PROFILE',
                data: json,
            };
            return Promise.resolve(action);
        }
        else {
            return Promise.reject(json);
        }
    } catch (error) {
        // TEST PURPOSE:
        console.error(error);
        return Promise.reject(error);
    }
}

module.exports = {
    loadUserProfile,
}