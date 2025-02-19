import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({
  category = "general",
  pageSize,
  apiKey,
  country,
  setProgress,
}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    setProgress(10);
    const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=${country}&max=${pageSize}&apikey=${apiKey}`;
    console.log(url);

    setLoading(true);
    try {
      let data = await fetch(url);
      if (!data.ok) throw new Error(`API Error: ${data.status}`);

      let parsedData = await data.json();
      setProgress(70);

      setArticles(parsedData.articles || []);
      setTotalResults(parsedData.totalArticles || 0);
      setLoading(false);
      setProgress(100);
    } catch (error) {
      console.error("Error fetching news:", error);
      setArticles([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(category)} - CurrentSpotLight`;
    updateNews(); // ✅ Calling updateNews when component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMoreData = async () => {
    const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=${country}&max=${pageSize}&page=${
      page + 1
    }&apikey=${apiKey}`;
    try {
      let data = await fetch(url);
      if (!data.ok) throw new Error(`API Error: ${data.status}`);

      let parsedData = await data.json();
      setPage(page + 1);
      setArticles((prevArticles) => [
        ...prevArticles,
        ...(parsedData.articles || []),
      ]);
      setTotalResults(parsedData.totalArticles || 0);
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  };

  return (
    <>
      <h1
        className='text-center'
        style={{ margin: "35px 0px", marginTop: "90px" }}
      >
        CurrentSpotLight - Top {capitalizeFirstLetter(category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles ? articles.length : 0}
        next={fetchMoreData}
        hasMore={articles && articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className='container'>
          <div className='row'>
            {articles.map((element, index) => {
              return (
                <div className='col-md-4' key={index}>
                  <NewsItem
                    title={element.title || "No Title"}
                    description={element.description || "No Description"}
                    imageUrl={element.image}
                    newsUrl={element.url}
                    author={element.source.name || "Unknown"}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default News;
