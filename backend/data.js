import bcrypt from 'bcryptjs'

const data =  {
  users: [
      {
        name: 'Shivani',
        email: 'shivani603@gmail.com',
        password: bcrypt.hashSync('2000', 8),
        isAdmin: true
      },{
        name: 'John',
        email: 'user@gmail.com',
        password: bcrypt.hashSync('2001', 8),
        isAdmin: false
      }
  ],
  products: [
    {
      name: 'Styled Black Yoga Top',
      category: 'Shirts',
      image: '/images/dress_1.png',
      price: 1160,
      brand: 'Nike',
      description: ' ',
      rating: 4.3,
      numReviews: 10,
      countInStock: 10
    },

    {
      name: 'High Neck Cropped Top',
      category: 'Shirts',
      image: '/images/dress_2.png',
      price: 599,
      brand: 'Vero Moda',
      description: ' ',
      rating: 4.7,
      countInStock: 10
    },

    {
      name: 'Patterned Wrapover Blouse',
      category: 'Shirts',
      image: '/images/dress_3.jpg',
      price: 550,
      brand: 'Vero Moda',
      description: ' ',
      rating: 4.5,
      countInStock: 10
    },

    {
      name: 'Women Sustainable BL Tights',
      category: 'Sports Wear',
      image: '/images/dress_4.jpg',
      price: 1699,
      brand: 'Adidas',
      description: ' ',
      rating: 4.9,
      countInStock: 10
    },
    {
      name: 'Victorian Crop Fitted Top',
      category: 'Shirts',
      image: '/images/dress_5.jpeg',
      price: 2299,
      brand: 'Marks & Spencer',
      description: ' ',
      rating: 4.2,
      countInStock: 10
    },

    {
      name: 'Zip Through Hoodie',
      category: 'Sweatshirts',
      image: '/images/dress_6.jpg',
      price: 4599,
      brand: 'Adidas',
      description: ' ',
      rating: 4.8,
      countInStock: 10
    },
    {
      name: 'Women Fit and Flare Dress',
      category: 'Dress',
      image: '/images/dress_7.jpg',
      price: 1349,
      brand: 'Vero Moda',
      description: ' ',
      rating: 4.4,
      countInStock: 10
    },
    {
      name: 'Striped Drop Shoulder Tshirt',
      category: 'Shirts',
      image: '/images/dress_8.jpg',
      price: 2695,
      brand: ' Nike',
      description: ' ',
      rating: 4.6,
      countInStock: 10
    },
   
    {
      name: 'Women Pink Lounge T-shirts',
      category: 'Shirts',
      image: '/images/dress_9.jpg',
      price: 1199,
      brand: 'Marks & Spencer',
      description: ' ',
      rating: 4.2,
      countInStock: 10
    },
    
  ]
  }

export default data