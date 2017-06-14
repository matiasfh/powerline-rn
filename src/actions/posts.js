var { API_URL } = require('../PLEnv');
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

module.exports = { votePost };