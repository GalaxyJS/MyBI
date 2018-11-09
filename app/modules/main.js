/**
 * @type Galaxy.View
 */
const view = Scope.import('galaxy/view');
const router = Scope.import('galaxy/router');

Scope.data.sections = Scope.import('config/sections.js');

Scope.data.activeSectionId = 'clients';
Scope.data.activeModule = null;

router.init({
  '/': function () {

  },
  '/:sectionId': function (params) {
    console.log(params);
    Scope.data.activeSectionId = params.sectionId;

    const activeSection = Scope.data.sections.filter(function (item) {
      return item.id === Scope.data.activeSectionId;
    })[0];

    Scope.data.activeModule = activeSection ? activeSection.module || null : null;
  }
});

const isActiveSection = function (id, activeSectionId) {
  return id === activeSectionId;
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

    module: '<>data.activeModule'
  }
]);