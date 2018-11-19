Scope.exports = {
  container: {
    class: 'notification-center'
  },
  main: null,
  get() {
    if (this.main) {
      return this.main;
    }

    const id = 'nc_' + new Date().getTime();
    // console.log(id);
    const localScope = {
      notices: []
    };

    this.main = {
      container: Object.assign({}, this.container, {
        id: id,
        lifecycle: {
          preInsert() {
            const viewNode = this;
            viewNode.createNode({
              animations: {
                enter: {
                  from: {
                    y: -20,
                    opacity: 0
                  },
                  duration: .2
                },
                leave: {
                  sequence: 'notifications-leave',
                  to: {
                    opacity: 0,
                    height: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    margin: 0
                  },
                  position: '-=.1',
                  duration: .2
                }
              },
              tag: 'p',
              $for: {
                data: '<>notices.changes',
                as: 'notice'
              },
              class: '<>notice.type',
              text: '<>notice.message'
            }, localScope);
          }
        },
        on: {
          click() {
            localScope.notices = [];
          }
        }
      }),

      show(message, type, duration) {
        const notice = {
          message: message,
          type: type || 'warn'
        };
        localScope.notices.push(notice);

        setTimeout(() => {
          const index = localScope.notices.indexOf(notice);
          if (index !== -1) {
            localScope.notices.splice(index, 1);
          }
        }, duration || 5000);
      }
    };

    return this.main;
  }
};