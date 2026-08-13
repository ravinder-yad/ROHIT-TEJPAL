export const navigationData = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Collections', href: '/collections', hasDropdown: true },
    { name: 'Shop', href: '/products', hasDropdown: true },
    { name: 'About', href: '/about' },
    { name: 'Our Factory', href: '/factory' },
    { name: 'Contact', href: '/contact' }
  ],
  collectionsDropdown: [
    { name: 'All Collections', href: '/collections', desc: 'Explore all our collections' },
    { name: 'New Collection', href: '/collections/new-collection', desc: 'The latest styles and prints' },
    { name: 'Festive Edit', href: '/collections/festive-edit', desc: 'Beautiful festive wear' }
  ],
  shopDropdown: [
    { name: 'All Products', href: '/products', desc: 'View everything we offer' },
    { name: 'Tunic Set', href: '/products?category=tunic-set', desc: 'Elegant and versatile sets' },
    { name: 'Kurta Set', href: '/products?category=kurta-set', desc: 'Comfortable & stylish sets' },
    { name: 'Kaftans', href: '/products?category=kaftans', desc: 'Relaxed and beautiful' }
  ]
};
