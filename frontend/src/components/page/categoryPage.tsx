import React, { useEffect, useState } from "react";
import { Card, SkeletonCard } from "@/components/cards/Card";
import { fetchCategoryNews } from "@/services/services";
type newsType = {
	link: string;
	headline: string;
	authors: string;
	date: string;
	short_description: string;
};

type Props = {
	category: string;
};

const categoryPage = (props: Props) => {
	const [newsList, setNewsList] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const data = await fetchCategoryNews(props.category);
			setNewsList(data);
		};
		setTimeout(() => {
			setLoading(false);
		}, 1000);
		fetchData();
	}, [props.category]);

	return (
		<div className="w-full flex-wrap flex gap-5 justify-center">
			{loading
				? Array.from({ length: 10 }).map((_, index) => (
						<SkeletonCard key={index} />
				  ))
				: newsList.map((news: any) => (
						<Card
							key={news._id}
							{...news}
						/>
				  ))}
		</div>
	);
};

export default categoryPage;
