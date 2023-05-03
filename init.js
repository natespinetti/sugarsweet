const mongoose = require('./database');
const Product = require('./models/product');

// Insert the product in MongoDB database

(async() => {

    // Create new product object
    const grape = new Product({
    name: 'Grape',
    description: 'A mixture of candied sweetness with a burst of natural grape flavors.',
    price: 2.49,
    quantity: 49,
    image: '/images/grape.png',
    imagealt: 'Grape Ramune',
    });

    const melon = new Product({
    name: 'Melon',
    description: 'This`ll surely be a melon-choly reunion for you and your dear ramune.',
    price: 2.99,
    quantity: 36,
    image: '/images/melon.png',
    imagealt: 'Melon Ramune',
    });

    const lemon = new Product({
    name: 'Lemon',
    description: 'The original is always better than the copies.',
    price: 2.49,
    quantity: 61,
    image: '/images/lemon.png',
    imagealt: 'Lemon Ramune',
    });

    const cherry = new Product({
    name: 'Cherry',
    description: 'Pretty please with a Cherry Ramune?',
    price: 2.99,
    quantity: 21,
    image: '/images/cherry.png',
    imagealt: 'Cherry Ramune',
    });

	await Promise.all([
		grape.save(),
        melon.save(),
        lemon.save(),
        cherry.save()
		]).catch(error => {
        console.log(error);
        });

	process.exit();

})();