/**
 * @type Galaxy.View
 */
const view = Scope.import('galaxy/view');
const router = Scope.import('galaxy/router');

const animations = Scope.import('config/animations.js');
const activeMenuIndicator = Scope.import('components/active-menu-indicator.js');

const notification = Scope.import('services/notification.js');
const notificationCenter = notification.get();

Scope.data.app = Scope.import('services/app.js');
Scope.data.authService = Scope.import('services/auth.js');

Scope.data.popup = null;

router.init({
  '/': function () {
    Scope.data.activeMenuItemNode = null;
    router.navigate('/mybit');
  },

  '/logout': function () {
    Scope.data.activeMenuItemId = null;
    Scope.data.activeMenuItemNode = null;
    Scope.data.popup = null;
    Scope.data.app.reset();
    Scope.data.authService.logout().then(() => {
      router.navigate('/mybit');
    });
  },

  '/:domain': {
    '/': function (params, parentParams) {
      console.log('domain');
      router.navigate(parentParams.domain + '/login');
    },

    '/login': function (params, parentParams) {
      console.log('domain/login', params, parentParams);
      Scope.data.currentDomain = parentParams.domain;
      Scope.data.authService.loggedIn
        .then((flag) => {
          if (flag) {
            Scope.data.popup = null;
            router.navigate(Scope.data.currentDomain + '/dashboard');
          } else {
            Scope.data.popup = {
              id: 'login',
              url: 'modules/auth/login-form.js'
            };
          }
        });
    },

    '/:sectionId': function (params, parentParams) {
      Scope.data.authService.loggedIn
        .then((flag) => {
          if (flag) {
            Scope.data.app.setActiveSectionById(params.sectionId);
          } else {
            router.navigate(parentParams.domain + '/login');
          }
        });
    }
  }
});

const isActiveSection = function (id, activeMenuItemId) {
  const isActive = id === activeMenuItemId;

  if (isActive) {
    Scope.data.activeMenuItemNode = this.node;
  }

  return isActive;
};
isActiveSection.watch = ['section.id', 'data.app.activeSection.id'];

view.config.cleanContainer = true;
view.init([
  {
    tag: 'nav',
    children: [
      {
        tag: 'section',
        children: {
          class: 'logo',
          tag: 'img',
          src: 'assets/logos/mybit.png'
        }
      },
      {
        tag: 'section',
        class: 'primary-nav',
        children: [
          {
            tag: 'li',
            animations: animations.menuItem,

            $for: {
              data: '<>data.app.sections.changes',
              as: 'section'
            },

            children: {
              tag: 'a',
              class: {
                'menu-item': true,
                active: isActiveSection
              },

              text: '<>section.id',
              href: '<>section.link',

              inputs: {
                section: '<>section'
              }
            }
          },
          activeMenuIndicator.create()
        ]
      },
      {
        tag: 'section',
        children: [
          {
            tag: 'a',
            animations: animations.logout,
            $if: '<>data.sections',
            class: 'menu-item',
            text: 'Logout',
            href: '#/logout'
          }
        ]
      }
    ]
  },
  {
    tag: 'main',

    children: [
      {
        tag: 'section',
        module: '<>data.app.activeSection.module'
      },
      {
        animations: {
          '-=login': {
            duration: .5
          }
        },
        tag: 'footer',
        children: []
      }
    ]
  },
  {
    animations: animations.overlay,
    tag: 'section',
    class: 'overlay',
    $if: '<>data.popup',
    inputs: {
      domain: '<>data.currentDomain'
    },
    module: '<>data.popup'
  },
  notificationCenter.container
]);