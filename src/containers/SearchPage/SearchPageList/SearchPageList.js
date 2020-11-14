import React from 'react';

import SearchPageListItem from './SearchPageListItem/SearchPageListItem';
import './SearchPageList.scss';

const SearchPageList = (props) => {
	return (
		<div className="search-list-results">
			{props.list &&
				props.list.map(({ title, vtype, synopsis, img, nfid, clist, avgrating, year }) => {
					const rating = avgrating.toFixed(1);
					return (
						<SearchPageListItem
							key={nfid}
							title={title}
							contentType={vtype}
							synopsis={synopsis}
							img={img}
							clist={clist}
							netflixId={nfid}
							avgrating={rating}
							year={year}
						/>
					);
				})}
		</div>
	);
};

export default SearchPageList;
