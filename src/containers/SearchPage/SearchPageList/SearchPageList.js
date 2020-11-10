import React from 'react';

import SearchPageListItem from './SearchPageListItem/SearchPageListItem';
import './SearchPageList.css';

const SearchPageList = (props) => {
	return (
		<div>
			<div className="search-list-results">
				{props.list &&
					props.list.map(({ title, vtype, synopsis, img, nfid, clist }) => {
						return (
							<SearchPageListItem
								key={nfid}
								title={title}
								contentType={vtype}
								synopsis={synopsis}
								img={img}
								clist={clist}
								netflixId={nfid}
							/>
						);
					})}
			</div>
		</div>
	);
};

export default SearchPageList;
