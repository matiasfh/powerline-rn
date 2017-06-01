
var { API_URL, PER_PAGE } = require('../PLEnv');
var { Action, ThunkAction } = require('./types');

async function loadUserGroups(token: string, page: ?number = 0, perPage: ?number = PER_PAGE): Promise<Action> {
    try {
        var response = await fetch(`${API_URL}/v2/user/groups?_format=json&page=${page + 1}&per_page=${perPage}`, {
            method: 'GET',
            headers: {
                'token': token,
                'Content-Type': 'application/json',
            }
        });
        var groups = await response.json();
        if (groups.items) {
            const action = {
                type: 'LOADED_GROUPS',
                data: {
                    page: groups.page,
                    items: groups.items,
                    payload: groups.payload,
                },
            };
            return Promise.resolve(action);
        }
        else {
            return Promise.reject(groups);
        }
    } catch (error) {
        console.error(error);
    }
}

function clearGroupsInCache(): ThunkAction {
    return (dispatch) => {
        return dispatch({
            type: 'CLEAR_CACHED_GROUPS',
        });
    };
}

module.exports = {
    loadUserGroups,
    clearGroupsInCache,
}