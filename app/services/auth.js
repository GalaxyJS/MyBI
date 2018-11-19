const router = Scope.import('galaxy/router');
const apiURL = '//mybi-api-dev.eeliya.com';
Scope.exports = {
  notLoggedIn: true,
  /**
   *
   * @param {Object} data
   */
  login(data) {
    this.notLoggedIn = false;

    return fetch(apiURL + '/auth/login', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // mode: 'no-cors', // no-cors, cors, *same-origin
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data)
    }).then((response) => {
      console.log(response);
      if (response.status !== 200) {
        throw response;
      }
      return response.json();
    });
  },

  logout() {
    this.notLoggedIn = true;
  }
};