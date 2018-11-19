const router = Scope.import('galaxy/router');
const view = Scope.import('galaxy/view');

const animations = Scope.import('config/animations.js');

const authService = Scope.import('services/auth.js');
const uiBuilder = Scope.import('services/ui-builder.js');

const notificationCenter = Scope.import('services/notification.js').get();

Scope.data.form = {
  domain: Scope.inputs.domain,
  username: null,
  password: null
};

view.init({
  animations: animations.login,
  tag: 'form',
  class: 'login',
  action: 'auth/login',
  method: 'POST',
  on: {
    submit(event) {
      event.preventDefault();
      return false;
    }
  },
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
          type: 'submit',
          text: 'Log in',
          on: {
            click() {
              // Business logic
              authService.login(Scope.data.form)
                .then(() => {
                  router.navigate('/mybit');
                  notificationCenter.show('You have been logged in successfully!', 'success');
                })
                .catch((response) => {
                  notificationCenter.show('Something went wrong!', 'error');
                });

              // Show case notification center
              // notificationCenter.show('Something went wrong!', 'error');
            }
          }
        }
      ]
    }
  ]
});