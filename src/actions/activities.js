
var { API_URL, PER_PAGE } = require('../PLEnv');
var { Action, ThunkAction } = require('./types');

async function loadActivities(token: string, page: ?number = 0, perPage: ?number = PER_PAGE, group: ?string = 'all', user: ?string = 'all'): Promise<Action> {
    try {
        var response = await fetch(`${API_URL}/activities?_format=json&user=${user}&group=${group}&page=${page}&per_page=${perPage}`, {
            method: 'GET',
            headers: {
                'token': token,
                'Content-Type': 'application/json',
            }
        });
        var json = await response.json();
        if (json.total_items) {
            const action = {
                type: 'LOADED_ACTIVITIES',
                data: {
                    page: json.page,
                    totalItems: json.totalItems,
                    items: json.items,
                    payload: json.payload,
                },
            };
            return Promise.resolve(action);
        }
        else {
            return Promise.reject(json);
        }
    } catch (error) {
        console.error(error);
    }
}

function resetActivities(): ThunkAction {
    return (dispatch) => {
        return dispatch({
            type: 'RESET_ACTIVITIES',
        });
    };
}

module.exports = {
    loadActivities,
    resetActivities,
}