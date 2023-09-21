import { useEffect, useState } from "react";
import Card from "./components/Card";
import { debounce } from "lodash";
import Header from "./components/Header";

const App = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [page, setPage] = useState(0);

	const handleScroll = debounce(() => {
		const scrollY = window.scrollY;
		const documentHeight = document.documentElement.scrollHeight;

		const windowHeight = window.innerHeight;

		if (scrollY + windowHeight >= documentHeight - 1) {
			console.log("Reached the end of the page!");
			setPage((p) => (p + 1) % 11);
		}
	}, 250);

	useEffect(() => {
		const fetchData = async (page) => {
			setError(null);
			setLoading(true);
			try {
				const response = await fetch(
					`https://dummyapi.io/data/v1/user?page=${page}&limit=10`,
					{
						headers: {
							"app-id": "650bda6e505f335c44d0191e",
						},
					}
				);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const result = await response.json();
				setData((prev) => [...prev, ...result.data]);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setError(error);
				setLoading(false);
			}
		};

		fetchData(page);
	}, [page]);
	console.log("Page", page);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [handleScroll]);

	return (
		<div className=" px-3 pb-5 flex flex-col items-center justify-center">
			<Header />
			<div className=" pt-3 max-w-2xl flex flex-col gap-5">
				{data &&
					data.map((val, ind) => {
						return (
							<Card
								key={ind}
								img={val.picture}
								fname={val.firstName}
								lname={val.lastName}
							/>
						);
					})}
			</div>
			{loading ? (
				<p className=" text-blue-400 font-semibold my-5">Loading...</p>
			) : error ? (
				<p className=" text-red-300 my-5">{error.message}</p>
			) : (
				<></>
			)}
		</div>
	);
};

export default App;
