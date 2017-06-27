var { API_URL } = require('../PLEnv');
var { Action, ThunkAction } = require('./types');

function getAcivities(){
    return new Promise((resolve, reject) => {
        fetch(API_URL + '/v2/user/social-activities', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then(response => {
            resolve(response);
        })
        .catch(err => {
            reject(err);
        })
    });
}

module.exports = {
    getAcivities
};