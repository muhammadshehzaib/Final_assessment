import React, { useEffect, useState } from "react";

const BlogId = ({ id }) => {
  const [news, setNews] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3009/news/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch blog data");
      }
      const data = await response.json();

      setNews(data);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  });

  console.log("This is blog : ", news);
  console.log("This is blogid : ", id);

  return (
    <div className="max-w-md mx-auto bg-white shadow-md overflow-hidden md:max-w-2xl my-4 rounded-md">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48 rounded-md"
            src={news.main_img_url}
            alt="News Image"
          />
        </div>
        <div className="p-6 md:p-8">
          <div className="text-indigo-500 font-bold text-lg mb-2">
            Title: {news.title}
          </div>
          <div className="text-green-500 font-bold text-sm mb-2">
            Text: {news.text}
          </div>
          <div className="text-xs text-gray-500 mb-2">
            {/* {publishedDate} */}
          </div>
          <div className="font-semibold text-gray-900">
            Participants: {news.participants}
          </div>
          <div className="mt-2">
            <span className="text-sm text-gray-600">Author: {news.author}</span>
          </div>
          <div className="mt-2">
            <span className="text-sm text-gray-600">
              Domain Rank: {news.domain_rank}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogId;
