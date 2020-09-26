import React from 'react';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import Stripe from 'stripe';

// import createProductsAndSkus from '../utils/createProductsAndSkus';
import stripeConfig from '../config/stripe';
import CheckoutButton from '../components/CheckoutButton';

interface PageProps {
	sku: Stripe.Sku;
}

// The name of the file is [skuId] because getStaticPaths (server) will generate a page for each product returned from the Stripe api, so the names are dynamic - the name of the page will be the product id
// To run the server side access http://localhost:3000/sku

// Create connection to the service/api to get the paths of the products
// Runs on the server side
export const getStaticPaths: GetStaticPaths = async () => {
	const stripe = new Stripe(stripeConfig.secretKey, {
		apiVersion: '2020-08-27',
	});

	// createProductsAndSkus(stripe);

	const skus = await stripe.skus.list();

	// Create a page for each product
	const paths = skus.data.map(sku => ({
		params: {
			skuId: sku.id,
		},
	}));

	return {
		paths,
		fallback: false,
	};
};

// Get data of each product - each product calls the api
// Runs on the server side
export const getStaticProps: GetStaticProps = async ({ params }) => {
	const stripe = new Stripe(stripeConfig.secretKey, {
		apiVersion: '2020-08-27',
	});

	const sku = await stripe.skus.retrieve(params.skuId as string);

	// Pass the sku data to the page
	return {
		props: {
			sku,
		},
	};
};

const Product: React.FC<PageProps> = ({ sku }) => {
	return (
		<div>
			<h1>{sku.attributes.name}</h1>

			{sku.image && <img width="100" src={sku.image} />}

			<h2>
				{Number(sku.price / 100).toFixed(2)} {sku.currency.toUpperCase()}
			</h2>

			<CheckoutButton skuId={sku.id} itemName={sku.attributes.name} />

			<br />
			<br />
			<hr />

			<Link href="/">Go Back</Link>
		</div>
	);
};

export default Product;
