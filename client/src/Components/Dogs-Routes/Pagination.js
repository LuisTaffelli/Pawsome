import React from "react";
import "./Pagination.css";

export default function Pagination({maxperpage, dogs, pagination}) {
	const pages = [];


	for (let i = 0; i < Math.ceil(dogs.length/maxperpage); i++){
		pages.push(i+1)
	}


	return (
		<nav>
			<ul className='Pagination'>
				{pages && pages.map((number)=>
					<li className='Pagination-item' key={number}>
					<button onClick={()=>pagination(number)}>{number}</button>
					</li>
				)}
			</ul>
		</nav>
		)

}