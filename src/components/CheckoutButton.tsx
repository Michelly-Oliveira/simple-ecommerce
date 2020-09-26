import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

import stripeConfig from '../config/stripe';

interface CheckoutButtonProps {
	skuId: string;
	itemName: string;
}

const stripePromise = loadStripe(stripeConfig.publicKey);

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ skuId, itemName }) => {
	const handleClick = async () => {
		// When the customer clicks on the button, redirect them to Checkout.
		const stripe = await stripePromise;

		// Send the id of the product and its quantity, an url to dispaly in case of success and other for cancelment of the purchase - both urls send the product name
		const { error } = await stripe.redirectToCheckout({
			lineItems: [
				{
					price: skuId,
					quantity: 1,
				},
			],
			mode: 'payment',
			successUrl: `http://localhost:3000/success?itemName=${itemName}`,
			cancelUrl: `http://localhost:3000/cancel?itemName=${itemName}`,
		});

		if (error) {
			console.log(error);
		}
	};

	return (
		<button role="link" onClick={handleClick}>
			Buy
		</button>
	);
};

export default CheckoutButton;
