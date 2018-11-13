const view = Scope.import('galaxy/view');

const animations = Scope.import('config/animations.js');

view.init({
    animations: animations.section,
    tag: 'article',
    class: 'section-content',
    children: [
      {
        tag: 'header',
        children: [
          {
            tag: 'h2',
            text: 'Clients Overview'
          },
          {
            children: [
              {
                tag: 'button',
                text: 'New Client'
              }
            ]
          }
        ]
      },
      {
        tag: 'main'
      },
      {
        tag: 'footer'
      }
    ]
  }
);