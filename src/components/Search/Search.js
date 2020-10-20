import React, { useState, useEffect, useRef } from 'react';

import './Search.css';

const Search = React.memo(props => {
    // const { onloadIngredients } = props;
    // const [enteredFilter, setEnteredFilter] = useState('');
    // const inputRef = useRef()

    // useEffect(() => {

    //     const timer = setTimeout(() => {
    //         if (enteredFilter === inputRef.current.value) {
    //             const fetchIngredients = async () => {
    //                 try {
    //                     const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`
    //                     const response = await fetch('https://react-hooks-416c0.firebaseio.com/ingredients.json' + query);
    //                     const responseData = await response.json();
    //                     const loadedIngredients = [];
    //                     for (const key in responseData) {
    //                         loadedIngredients.push({
    //                             id: key,
    //                             title: responseData[key].title,
    //                             amount: responseData[key].amount
    //                         })
    //                     }
    //                     onloadIngredients(loadedIngredients);
    //                 } catch (error) {
    //                     console.log(error);
    //                 }
    //             }
    //             fetchIngredients();
    //         }
    //     }, 500);

    //     // cleaning up effect
    //     return () => {
    //         clearTimeout(timer);
    //     };

    // }, [enteredFilter, onloadIngredients, inputRef]);

    return (
        <section className="search">
            <div className="search-input">
                {/* <label>Search country</label> */}
                <input
                    // ref={inputRef}
                    type="text"
                    placeholder="Search country"
                // value={enteredFilter}
                // onChange={event => setEnteredFilter(event.target.value)} 
                />
            </div>
        </section>
    );
});

export default Search;
