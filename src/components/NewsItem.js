import React from 'react'

const NewsItem = (props) => {
    let { title, description, imageUrl, url, author, publishedAt, source } = props;

    return (

        <div className="card h-100">
            <img src={!imageUrl ? 'notFound.gif' : imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">
                <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{ left: '90%', zIndex: '1' }}>
                    {source}
                </span>
                <h5 className="card-title"> {title}</h5>
                <p className="card-text">{!description ? 'Description not available' : description}</p>
                <br />
                <footer className="blockquote-footer">{`By ${author ? author : 'Unkown'}`}</footer>
                <p className="card-text"><small className="text-body-secondary">{new Date(publishedAt).toUTCString()}</small></p>
                <p className="card-text"> </p>
                <a href={url} className="btn btn-dark btn-sm" target="_blank" rel="noopener noreferrer">Read More</a>
            </div>
        </div>
    )
}
export default NewsItem;