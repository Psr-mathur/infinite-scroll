import React from "react";

const Card = ({ img, fname, lname }) => {
	return (
		<div className=" bg-slate-100 shadow p-5 flex flex-col items-center justify-center">
			<div className=" h-28 w-28 shadow">
				<img
					src={img}
					alt=""
					className=" rounded w-full h-full object-cover"
				/>
			</div>
			<div className=" mt-3 ">
				<span>
					<b>First Name : </b>
				</span>
				<span>{fname}</span>
			</div>
			<div className=" mt-3">
				<span>
					<b>Last Name : </b>
				</span>
				<span>{lname}</span>
			</div>
		</div>
	);
};

export default Card;
