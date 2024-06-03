import React from 'react';

const MovieListHeading = (props) => {
	return (
		<div className='col text-center'> {/* Add text-center class to center the content */}
			<h1>{props.heading}</h1>
		</div>
	);
};

export default MovieListHeading;
