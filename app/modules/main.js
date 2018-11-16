/**
 * @type Galaxy.View
 */
const view = Scope.import('galaxy/view');
const router = Scope.import('galaxy/router');

const animations = Scope.import('config/animations.js');

Scope.data.sections = Scope.import('config/sections.js');

Scope.data.authService = Scope.import('services/auth.js');

Scope.data.activeSectionId = null;
Scope.data.activeModule = null;

Scope.data.popup = null;

// router.init({
//   '/': function () {
//     Scope.data.activeSectionNode = null;
//     debugger;
//   },
//
//   '/:domain': function (params) {
//     console.log('domain');
//     if (Scope.data.authService.notLoggedIn) {
//       router.navigate(params.domain + '/login');
//     } else {
//       Scope.data.popup = null;
//       router.navigate(params.domain + '/dashboard');
//     }
//     debugger;
//   },
//
//   '/:domain/login': function (params) {
//     console.log('domain/login', params);
//     Scope.data.popup = {
//       id: 'login',
//       url: 'modules/auth/login-form.js'
//     };
//     debugger;
//   },
//   '/:domain/:sectionId': function (params) {
//     console.log('sections', params);
//     debugger;
//     Scope.data.activeSectionId = params.sectionId;
//
//     const activeSection = Scope.data.sections.filter(function (item) {
//       return item.id === Scope.data.activeSectionId;
//     })[0];
//
//     Scope.data.activeModule = activeSection ? activeSection.module || null : null;
//   }
// });

router.init({
  '/': function () {
    Scope.data.activeSectionNode = null;
    // debugger;
  },

  '/:domain': {
    '/': function (params) {
      console.log('domain');
      router.navigate(params.domain + '/login');
      // debugger;
    },

    '/login': function (params) {
      console.log('domain/login', params);
      if (Scope.data.authService.notLoggedIn) {
        Scope.data.popup = {
          id: 'login',
          url: 'modules/auth/login-form.js'
        };
        console.log('popup',Scope.data.popup);
        // debugger;
      } else {
        Scope.data.popup = null;
        router.navigate(params.domain + '/dashboard');
      }
      // debugger;
    },

    '/:sectionId': function (params, parentParams) {
      if (Scope.data.authService.notLoggedIn) {
        return router.navigate(parentParams.domain + '/login');
      }
      // debugger;


      Scope.data.activeSectionId = params.sectionId;

      const activeSection = Scope.data.sections.filter(function (item) {
        return item.id === Scope.data.activeSectionId;
      })[0];

      Scope.data.activeModule = activeSection ? activeSection.module || null : null;
    }
  }
});

const isActiveSection = function (id, activeSectionId) {
  const isActive = id === activeSectionId;

  if (isActive) {
    Scope.data.activeSectionNode = this.node;
  }

  return isActive;
};
isActiveSection.watch = ['section.id', 'data.activeSectionId'];

view.config.cleanContainer = true;
view.init([
  {
    tag: 'nav',
    children: [
      {
        class: 'logo',
        tag: 'img',
        src: 'assets/logos/mybit.png'
      },
      {
        tag: 'section',
        class: 'primary-nav',
        children: [
          {
            tag: 'li',

            $for: {
              data: '<>data.sections.changes',
              as: 'section'
            },

            children: {
              tag: 'a',
              class: {
                active: isActiveSection
              },

              text: '<>section.id',
              href: '<>section.link',

              inputs: {
                section: '<>section'
              }
            }
          },
          {
            tag: 'span',
            class: 'active-menu-indicator',
            style: {
              left: [
                'data.activeSectionNode',
                function (node) {
                  if (!node) {
                    return '50%';
                  }

                  const promise = new Promise((resolve) => {
                    this.rendered.then(() => {
                      requestAnimationFrame(() => {
                        resolve(node.getBoundingClientRect().left + 'px');
                      });
                    });
                  });

                  return promise;
                }
              ],
              width: [
                'data.activeSectionNode',
                function (node) {
                  if (!node) {
                    return 0;
                  }

                  const promise = new Promise((resolve) => {
                    this.rendered.then(() => {
                      requestAnimationFrame(() => {
                        resolve(node.getBoundingClientRect().width + 'px');
                      });
                    });
                  });

                  return promise;
                }
              ]
            }
          }
        ]
      },
      {
        tag: 'section'
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
        class: {
          // login: ''
        },
        children: [
          {
            tag: 'button',
            text: 'press',
            on: {
              click: function () {
              }
            }
          }
        ]
      }
    ]
  },
  {
    animations: animations.overlay,
    tag: 'section',
    class: 'overlay',
    $if: '<>data.popup',
    module: '<>data.popup'
  }
]);