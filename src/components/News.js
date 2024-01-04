import React, { Component } from 'react';
import NewsItem from '../NewsItem';
import Loading from './Loading';
import PropTypes from 'prop-types'


export default class News extends Component {

    static defaultProps = {
        category: 'general'
    }
    static propTypes = {
        category: PropTypes.string
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            page: 1,
            loading: false
        };
    }

    async componentDidMount() {
        // API endpoint URL
        this.setState({ loading: true })
        let url =
            `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=9b5f77e1f7f64e098e583e5dbb5fe815&page=1&pageSize=${this.props.pageSize}`;

        // Fetch data from the API
        let data = await fetch(url);

        // Parse the fetched data into JSON format
        let parsedData = await data.json();

        // Update the component state with the fetched articles
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
    }

    handleNext = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {
            // Handle the case when there are no more pages.
        } else {
            // Set loading to true before making the fetch call
            this.setState({ loading: true });

            let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=9b5f77e1f7f64e098e583e5dbb5fe815&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

            try {
                // Fetch data from the API
                let data = await fetch(url);

                // Parse the fetched data into JSON format
                let parsedData = await data.json();

                // Update the component state with the fetched articles
                this.setState({
                    articles: parsedData.articles,
                    page: this.state.page + 1,
                });
            } catch (error) {
                // Handle errors if needed
                console.error('Error fetching data:', error);
            } finally {
                // Set loading back to false after fetching data
                this.setState({ loading: false });
            }
        }
    }

    handlePrev = async () => {
        // Set loading to true before making the fetch call
        this.setState({ loading: true });

        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=9b5f77e1f7f64e098e583e5dbb5fe815&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;

        try {
            // Fetch data from the API
            let data = await fetch(url);

            // Parse the fetched data into JSON format
            let parsedData = await data.json();

            // Update the component state with the fetched articles
            this.setState({
                articles: parsedData.articles,
                page: this.state.page - 1,
            });
        } catch (error) {
            // Handle errors if needed
            console.error('Error fetching data:', error);
        } finally {
            // Set loading back to false after fetching data
            this.setState({ loading: false });
        }
    }

    render() {
        return (
            <div className='container my-3 '>
                <h2 className='text-center mb-4'>HeadlinesHub - Top Headlines</h2>
                {this.state.loading && <Loading />}
                <div className='row '>
                    {!this.state.loading && (this.state.articles.map((element) => (
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
                    )))}
                </div>
                {!this.state.loading && (
                    <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrev} target="_top">&larr; Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
                    </div>
                )}
            </div>
        );
    }

}

