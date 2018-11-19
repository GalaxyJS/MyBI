/**
 * @type Galaxy.View
 */
const view = Scope.import('galaxy/view');
const router = Scope.import('galaxy/router');

const animations = Scope.import('config/animations.js');
const activeMenuIndicator = Scope.import('components/active-menu-indicator.js');

const notification = Scope.import('services/notification.js');
const notificationCenter = notification.get();

Scope.data.authService = Scope.import('services/auth.js');

Scope.data.activeMenuItemId = null;
Scope.data.activeModule = null;
Scope.data.currentDomain = null;

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
    Scope.data.activeModule = null;
    Scope.data.sections = null;
    Scope.data.authService.logout();
    router.navigate('/mybit');
  },

  '/:domain': {
    '/': function (params, parentParams) {
      console.log('domain');
      router.navigate(parentParams.domain + '/login');
    },

    '/login': function (params, parentParams) {
      console.log('domain/login', params, parentParams);
      Scope.data.currentDomain = parentParams.domain;
      if (Scope.data.authService.notLoggedIn) {
        Scope.data.popup = {
          id: 'login',
          url: 'modules/auth/login-form.js'
        };
      } else {
        Scope.data.popup = null;
        Scope.data.sections = Scope.import('config/sections.js');
        router.navigate(Scope.data.currentDomain + '/dashboard');
      }
    },

    '/:sectionId': function (params, parentParams) {
      if (Scope.data.authService.notLoggedIn) {
        return router.navigate(parentParams.domain + '/login');
      }

      Scope.data.activeMenuItemId = params.sectionId;

      const activeSection = Scope.data.sections.filter(function (item) {
        return item.id === Scope.data.activeMenuItemId;
      })[0];

      Scope.data.activeModule = activeSection ? activeSection.module || null : null;
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
isActiveSection.watch = ['section.id', 'data.activeMenuItemId'];

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
              data: '<>data.sections.changes',
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
        module: '<>data.activeModule'
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