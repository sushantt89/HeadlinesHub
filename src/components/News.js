import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Loading from './Loading';
import PropTypes from 'prop-types';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  document.title = `HeadlinesHub - ${props.category.charAt(0).toUpperCase()}${props.category.slice(1)}`;

  const updateNews = async () => {
    props.setProgress(0);
    setLoading(true);
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=9b5f77e1f7f64e098e583e5dbb5fe815&page=1&pageSize=${props.pageSize}`;
    props.setProgress(10);

    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      props.setProgress(50);
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      props.setProgress(100);
    }
  };

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.category, props.pageSize]);

  const handleNext = async () => {
    props.setProgress(0);

    if (page + 1 > Math.ceil(totalResults / props.pageSize)) {
      // Handle the case when there are no more pages.
    } else {
      setLoading(true);
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=9b5f77e1f7f64e098e583e5dbb5fe815&page=${page + 1}&pageSize=${props.pageSize}`;
      props.setProgress(10);

      try {
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(parsedData.articles);
        setPage(page + 1);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
        props.setProgress(50);
      }
    }
    props.setProgress(100);
  };

  const handlePrev = async () => {
    props.setProgress(0);
    setLoading(true);

    if (page <= 1) {
      // Handle the case when trying to go below the first page.
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=9b5f77e1f7f64e098e583e5dbb5fe815&page=${page - 1}&pageSize=${props.pageSize}`;
      props.setProgress(10);

      try {
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(parsedData.articles);
        setPage(page - 1);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
        props.setProgress(50);
      }
    }
    props.setProgress(100);
  };

  return (
    <div className='container my-3 '>
      <h2 className='text-center mb-4 mt-5 pt-4'>HeadlinesHub - Top {props.category.charAt(0).toUpperCase()}{props.category.slice(1)} Headlines</h2>
      {loading && <Loading />}
      <div className='row '>
        {!loading &&
          articles.map((element) => (
            <div key={element.url} className='col-lg-4 col-md-6 col-sm-12 my-3 '>
              <NewsItem
                title={element.title}
                description={element.description}
                imageUrl={element.urlToImage}
                url={element.url}
                author={element.author}
                publishedAt={element.publishedAt}
                source={element.source.name}
              />
            </div>
          ))}
      </div>
      {!loading && (
        <div className='container d-flex justify-content-between'>
          <button disabled={page <= 1} type='button' className='btn btn-dark' onClick={handlePrev} target='_top'>
            &larr; Previous
          </button>
          <button
            disabled={page + 1 > Math.ceil(totalResults / props.pageSize)}
            type='button'
            className='btn btn-dark'
            onClick={handleNext}
          >
            Next &rarr;
          </button>
        </div>
      )}
    </div>
  );
};

News.defaultProps = {
  category: 'general',
  pageSize: 15,
};

News.propTypes = {
  category: PropTypes.string,
  pageSize: PropTypes.number,
  setProgress: PropTypes.func.isRequired,
};

export default News;
