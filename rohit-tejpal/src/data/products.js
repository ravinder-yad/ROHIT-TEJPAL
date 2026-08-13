// src/data/products.js
export const products = [
  {
    id: 1,
    name: 'TEAL FLORAL TUNIC SET',
    category: 'tunic-set',
    price: '₹ 15,000',
    image: '/images/products/excel-batch/1.jpg',
    isNew: true,
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 2,
    name: 'MAGENTA FLORAL TUNIC SET',
    category: 'tunic-set',
    price: '₹ 15,000',
    image: '/images/products/excel-batch/2.jpg',
    isNew: false,
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 3,
    name: 'YELLOW FLORAL TUNIC SET',
    category: 'tunic-set',
    price: '₹ 15,000',
    image: '/images/products/excel-batch/3.jpg',
    isNew: true,
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 4,
    name: 'MUSTARD YELLOW TUNIC SET',
    category: 'tunic-set',
    price: '₹ 14,500',
    image: '/images/products/product_4.jpg',
    isNew: false,
    sizes: ['M', 'L', 'XL']
  },
  {
    id: 5,
    name: 'CLASSIC IVORY KURTA SET',
    category: 'kurta-set',
    price: '₹ 10,000',
    image: '/images/collections/ethnic.jpg',
    isNew: false,
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 6,
    name: 'MIDNIGHT BLUE KAFTAN',
    category: 'kaftans',
    price: '₹ 19,500',
    image: '/images/collections/kaftans.jpg',
    isNew: true,
    sizes: ['Free Size']
  },
  {
    id: 7,
    name: 'RUST ORANGE TUNIC SET',
    category: 'tunic-set',
    price: '₹ 16,000',
    image: '/images/collections/dresses.jpg',
    isNew: false,
    sizes: ['S', 'M']
  },
  {
    id: 8,
    name: 'PASTEL GREEN KURTA SET',
    category: 'kurta-set',
    price: '₹ 11,500',
    image: '/images/products/product_2.jpg',
    isNew: true,
    sizes: ['S', 'M', 'L']
  },
  {
    id: 9,
    name: 'MAROON EMBROIDERED KAFTAN',
    category: 'kaftans',
    price: '₹ 22,000',
    image: '/images/products/product_1.jpg',
    isNew: false,
    sizes: ['Free Size']
  },
  {
    id: 10,
    name: 'TEAL BLUE TUNIC SET',
    category: 'tunic-set',
    price: '₹ 13,000',
    image: '/images/products/product_4.jpg',
    isNew: false,
    sizes: ['S', 'L', 'XL']
  },
  {
    id: 11,
    name: 'PEACH GEORGETTE KURTA SET',
    category: 'kurta-set',
    price: '₹ 12,500',
    image: '/images/collections/ethnic.jpg',
    isNew: true,
    sizes: ['M', 'L']
  },
  {
    id: 12,
    name: 'BEIGE SILK KAFTAN',
    category: 'kaftans',
    price: '₹ 25,000',
    image: '/images/collections/kaftans.jpg',
    isNew: false,
    sizes: ['Free Size']
  }
];

// Generate more dummy products to reach 92 products for pagination testing
for (let i = 13; i <= 92; i++) {
  const categories = ['tunic-set', 'kurta-set', 'kaftans'];
  const images = [
    '/images/products/product_1.jpg',
    '/images/products/product_2.jpg',
    '/images/products/product_3.jpg',
    '/images/products/product_4.jpg',
    '/images/collections/ethnic.jpg',
    '/images/collections/kaftans.jpg'
  ];
  
  const category = categories[i % categories.length];
  const image = images[i % images.length];
  
  products.push({
    id: i,
    name: `SIGNATURE ${category.toUpperCase().replace('-', ' ')} ${i}`,
    category: category,
    price: `₹ ${10000 + (i * 100)}`,
    image: image,
    isNew: i % 7 === 0,
    sizes: ['S', 'M', 'L']
  });
}
