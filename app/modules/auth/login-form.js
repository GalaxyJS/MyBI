const view = Scope.import('galaxy/view');

const animations = Scope.import('config/animations.js');

const authService = Scope.import('services/auth.js');
const uiBuilder = Scope.import('services/ui-builder.js');

Scope.data.form = {
  username: null,
  password: null
};

view.init({
  animations: animations.login,
  tag: 'article',
  class: 'login',
  children: [
    {
      tag: 'header',
      children: [
        {
          tag: 'h2',
          text: 'Login'
        }

      ]
    },
    {
      tag: 'main',
      children: [
        uiBuilder.field('Username', '<>data.form.username'),
        uiBuilder.field('Password', '<>data.form.password', 'password')
      ]
    },
    {
      tag: 'footer',
      children: [
        {
          tag: 'button',
          text: 'Log in',
          on: {
            click() {
              authService.login();
            }
          }
        }
      ]
    }
  ]
});