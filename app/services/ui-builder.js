Scope.exports = {
  field: function (label, value, type) {
    return {
      tag: 'label',
      class: 'field',
      children: [
        {
          tag: 'span',
          text: label
        },
        {
          tag: 'input',
          type: type || 'text',
          value: value
        }
      ]
    };
  }
};