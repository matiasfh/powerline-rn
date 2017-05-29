
var { API_URL } = require('../PLEnv');
var { Action, ThunkAction } = require('./types');

async function loadGroups(token: string, page: ?number, perPage: ?number): Promise<Action> {
    try {
        var response = await fetch(`${API_URL}/v2/groups?_format=json&page=${page + 1}&per_page=${perPage}`, {
            method: 'GET',
            headers: {
                'token': token,
            }
        });
        var groups = await response.json();
        if (groups.totalItems) {
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
    loadGroups,
    clearGroupsInCache,
}