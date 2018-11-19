Scope.exports = {
  section: {
    enter: {
      sequence: 'active-section',
      from: {
        y: 30,
        opacity: 0
      },

      duration: .3
    },
    leave: {
      sequence: 'active-section',
      from: function () {
        const node = this.node;
        return {
          position: 'absolute',
          width: node.offsetWidth,
          left: node.offsetLeft
        };
      },
      to: {
        scale: .97,
        opacity: 0,

      },
      duration: .2
    }
  },
  menuItem: {
    enter: {
      sequence: 'menu-items',
      from: {
        y: '-100%'
      },
      position: '-=.15',
      duration: .3
    }
  },
  logout: {
    enter: {
      sequence: 'logout',
      startAfter: 'menu-items',
      from: {
        x: '100%',
        opacity: 0
      },
      duration: .3
    }
  },
  login: {
    enter: {
      from: {
        scale: .2,
        opacity: 0
      },

      duration: .3
    },
    leave: {
      to: {
        y: 20,
        opacity: 0
      },
      duration: .3
    },
  },
  overlay: {
    leave: {
      to: {
        // scale: .7,
        opacity: 0,
        clearProps: 'all'
      },
      duration: .5
    }
  }
};