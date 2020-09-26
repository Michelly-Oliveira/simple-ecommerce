import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const CancelPage: React.FC = () => {
	const { query } = useRouter();

	return (
		<>
			<h1>Canceled purchase of {query.itemName}</h1>

			<Link href="/">Go Back</Link>
		</>
	);
};

export default CancelPage;
