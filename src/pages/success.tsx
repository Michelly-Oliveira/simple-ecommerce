import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const SuccessPage: React.FC = () => {
	const { query } = useRouter();

	return (
		<>
			<h1>Thank you for buying {query.itemName}</h1>

			<Link href="/">Go Back</Link>
		</>
	);
};

export default SuccessPage;
