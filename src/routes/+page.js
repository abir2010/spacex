export const load = async ({ fetch }) => {
	let data = [];
	let error = null;
	let loading = true;

	try {
		const response = await fetch('https://api.spacexdata.com/v3/landpads');

		if (!response.ok) {
			throw new Error('Failed to fetch products');
		}

		const res = await response.json();
		data = res;
	} catch (err) {
		error = err instanceof Error ? err.message : 'An unexpected error occurred';
	} finally {
		loading = false;
	}

	// Return the loading state, error message, and products
	return {
		data,
		error,
		loading
	};
};
