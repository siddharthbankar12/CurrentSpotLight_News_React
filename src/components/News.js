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
    const url = `http://api.mediastack.com/v1/news?access_key=${apiKey}&countries=${country}&categories=${category}&limit=${pageSize}&offset=${
      (page - 1) * pageSize
    }`;

    console.log("Fetching URL:", url);

    setLoading(true);
    try {
      let response = await fetch(url);
      if (!response.ok) throw new Error(`API Error: ${response.status}`);

      let parsedData = await response.json();
      setProgress(70);

      setArticles(parsedData.data || []);
      setTotalResults(parsedData.pagination?.total || 0);
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
    updateNews(); // ✅ Fetch news on component mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMoreData = async () => {
    if (articles.length >= totalResults) {
      console.log("No more articles to load.");
      return;
    }

    const url = `http://api.mediastack.com/v1/news?access_key=${apiKey}&countries=${country}&categories=${category}&limit=${pageSize}&offset=${
      page * pageSize
    }`;

    try {
      let response = await fetch(url);
      if (!response.ok) throw new Error(`API Error: ${response.status}`);

      let parsedData = await response.json();
      setPage(page + 1);
      setArticles((prevArticles) => [
        ...prevArticles,
        ...(parsedData.data || []),
      ]);
      setTotalResults(parsedData.pagination?.total || 0);
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
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
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
                    author={element.author || "Unknown"}
                    date={element.published_at}
                    source={element.source}
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
