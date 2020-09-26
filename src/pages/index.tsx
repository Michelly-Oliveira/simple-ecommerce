import React from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import Stripe from 'stripe';

import stripeConfig from '../config/stripe';
import Link from 'next/link';

interface StoreProps {
	skus: Stripe.Sku[];
}

// getStaticProps =  call the Stripe api/service to get the list of products/stock, and pass the data to the component to display a list of products
export const getStaticProps: GetStaticProps = async () => {
	const stripe = new Stripe(stripeConfig.secretKey, {
		apiVersion: '2020-08-27',
	});

	const skus = await stripe.skus.list();

	return {
		props: {
			skus: skus.data,
		},
	};
};

const Home: React.FC<StoreProps> = ({ skus }) => {
	return (
		<>
			<Head>
				<title>Simple Stripe Store</title>
			</Head>

			<main>
				<h1>Welcome to the store!</h1>

				{skus.map(sku => (
					<div key={sku.id}>
						<h3>{sku.attributes.name}</h3>

						{sku.image && <img width="100" src={sku.image} />}

						<h2>
							{Number(sku.price / 100).toFixed(2)} {sku.currency.toUpperCase()}
						</h2>

						<Link href={'/' + sku.id}>Visit Page</Link>

						<hr />
					</div>
				))}
			</main>
		</>
	);
};

export default Home;

/*
 * React - site doesn't need SEO - CSR
 * Gatsby - site with SEO but small - static site
 * Next - site with SEo and a lot of data - SSR
 */
