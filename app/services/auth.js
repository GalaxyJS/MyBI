const router = Scope.import('galaxy/router');

Scope.exports = {
  notLoggedIn: true,
  login() {
    this.notLoggedIn = false;
    router.navigate('mybit/');
  }
};