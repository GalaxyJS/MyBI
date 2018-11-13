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
  login: {
    enter: {
      from: {
        scale: .2,
        opacity: 0
      },
      duration: .3
    },

  },
  overlay: {
    leave: {
      to: {
        scale: 1.7,
        opacity: 0
      },
      duration: .3
    }
  }
};