// const apiURL = '//mybi-api-dev.eeliya.com';
const apiURL = 'https://mybi-api-dev.local.mybit.nl';

function isLoggedIn() {
  return new Promise((resolve, reject) => {
    fetch(apiURL + '/auth/me', {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      // mode: 'no-cors', // no-cors, cors, *same-origin
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }).then((response) => {
      if (response.status !== 200) {
        return resolve(false);
      }

      resolve(true);
    })
  });
}

Scope.exports = {
  loggedIn: isLoggedIn(),
  /**
   *
   * @param {Object} data
   */
  login(data) {
    return fetch(apiURL + '/auth/login', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, cors, *same-origin
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data)
    }).then((response) => {
      if (response.status !== 200) {
        this.loggedIn = Promise.resolve(false);
        throw response;
      }

      this.loggedIn = Promise.resolve(true);
      return response.json();
    });
  },

  logout() {
    return fetch(apiURL + '/auth/logout', {
      method: 'DELETE',
      credentials: 'include'
    }).then((response) => {
      if (response.status !== 200) {
        this.loggedIn = Promise.resolve(false);
        throw response;
      }

      return this.loggedIn = Promise.resolve(true);
    });
  }
};