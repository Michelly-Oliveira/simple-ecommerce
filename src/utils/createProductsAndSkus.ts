import Stripe from 'stripe';

const createProductsAndSkus = async (stripe: Stripe): Promise<void> => {
	// Manually create products through api
	const glasses = await stripe.products.create({
		name: 'Glasses',
		images: [
			'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Glasses_black.jpg/1200px-Glasses_black.jpg',
		],
		type: 'good',
		attributes: ['name'],
		metadata: { price: 2000 },
	});

	const mouse = await stripe.products.create({
		name: 'Mouse',
		images: [
			'https://www.havan.com.br/media/catalog/product/cache/55f334c6f9412d6b39cfe195ce4e3943/m/o/mouse-gamer-g203-prodigy-lightsync-rgb-logitech_279922.jpg',
		],
		type: 'good',
		attributes: ['name'],
		metadata: { price: 5000 },
	});

	// Array of products
	const products = [glasses, mouse];

	// Create skuds for the products
	await Promise.all(
		products.map(async product => {
			const sku = await stripe.skus.create({
				currency: 'brl',
				price: Number(product.metadata.price),
				inventory: { type: 'infinite' },
				product: product.id,
				image: product.images[0],
				attributes: { name: product.name },
			});
			return sku;
		})
	);
};

export default createProductsAndSkus;
