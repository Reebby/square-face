import React from 'react';

const Rank = ({name, entries}) => {
	return (
		<div>
			<div className="f3 white"> 
				<p>{`${name} your current number of image entry is `}</p>
			</div>
			<div className="f1 white"> 
				{entries}
			</div>
		</div>

		);
}

export default Rank;