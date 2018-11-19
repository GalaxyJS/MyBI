Scope.exports = {
  create() {
    return {
      tag: 'span',
      class: 'active-menu-indicator',
      style: {
        left: [
          'data.activeMenuItemNode',
          'data.activeMenuItemId',
          function (node) {
            const promise = new Promise((resolve) => {
              if (!node) {
                return resolve('50%');
              }

              resolve(node.getBoundingClientRect().left + 'px');
            });

            return promise;
          }
        ],
        width: [
          'data.activeMenuItemNode',
          'data.activeMenuItemId',
          function (node, id) {
            const promise = new Promise((resolve) => {
              if (!node) {
                return resolve(0);
              }

              resolve(node.getBoundingClientRect().width + 'px');
            });

            return promise;
          }
        ]
      }
    };
  }
};
