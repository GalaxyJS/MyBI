/**
 * @type Galaxy.View
 */
const view = Scope.import('galaxy/view');

view.config.cleanContainer = true;
view.init([
  {
    tag: 'header'
  },
  {
    tag: 'main'
  }
]);