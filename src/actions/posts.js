var { API_URL, PER_PAGE } = require('../PLEnv');
var { Action, ThunkAction } = require('./types');

async function votePost(token: string, postId: string, option: string) {
    try {
        let response = await fetch(`${API_URL}/v2/posts/${postId}/vote`, {
            method: 'POST',
            headers: {
                'token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                option: option,
            })
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
    }
}

async function addCommentToPost(token: string, postId: string, parentId: string, comment: string, privacy: string) {
    try {
        let response = await fetch(`${API_URL}/v2/posts/${postId}/comments`, {
            method: 'POST',
            headers: {
                'token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                comment_body: comment,
                parent_comment: parentId,
                privacy: privacy,
            })
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        // TEST PURPOSE:
        console.error(error);
    }
}

async function loadPostComments(token: string, entityId: number, page: ?number = 0, perPage: ?number = PER_PAGE, sort: ?string = 'default', sortDir: ?string = 'DESC'): Promise<Action> {
    try {
        var response = await fetch(`${API_URL}/v2/posts/${entityId}/comments?_format=json&page=${page + 1}&per_page=${perPage}&sort=${sort}&sort_dir=${sortDir}`, {
            method: 'GET',
            headers: {
                'token': token,
                'Content-Type': 'application/json',
            }
        });
        var json = await response.json();
        if ((json.totalItems > 0) && (json.payload.length)) {
            return Promise.resolve(json.payload);
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
    votePost,
    loadPostComments,
    addCommentToPost,
};