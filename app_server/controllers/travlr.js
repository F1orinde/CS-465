const sharedNav = [
  { url: '/', text: 'Home' },
  { url: '/travel', text: 'Travel' },
  { url: '/rooms', text: 'Rooms' },
  { url: '/meals', text: 'Meals' },
  { url: '/news', text: 'News' },
  { url: '/about', text: 'About' },
  { url: '/contact', text: 'Contact' }
];

const home = (req, res) => {
  res.render('index', {
    title: 'Travlr Getaways',
    nav: sharedNav
  });
};

const simplePage = (viewTitle) => (req, res) => {
  res.render('page', {
    title: viewTitle,
    nav: sharedNav
  });
};

module.exports = {
  home,
  travel: simplePage('Travel'),
  rooms: simplePage('Rooms'),
  meals: simplePage('Meals'),
  news: simplePage('News'),
  about: simplePage('About'),
  contact: simplePage('Contact')
};
