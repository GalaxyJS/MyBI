Scope.exports = {
  sections: [],
  activeSection: null,
  setActiveSectionById(id) {
    this.activeSection = this.sections.filter(function (item) {
      return item.id === id;
    })[0];
  },

  init() {
    this.sections = Scope.import('/config/sections.js');
  },

  reset() {
    this.sections = [];
    this.activeSection = [];
  }
};