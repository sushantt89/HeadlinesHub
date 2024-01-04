import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, url, author, publishedAt, source } = this.props;
        
        return (
            
            <div className="card h-100">
                <img src={!imageUrl ? 'notFound.gif' : imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:'1'}}>
                        {source}
                    </span>
                    <h5 className="card-title"> {title}</h5>
                    <p className="card-text">{!description ? 'Description not available' : description}</p>
                    <br />
                    <footer class="blockquote-footer">{`By ${author ? author : 'Unkown'}`}</footer>
                    <p class="card-text"><small class="text-body-secondary">{new Date(publishedAt).toUTCString()}</small></p>
                    <p className="card-text"> </p>
                    <a href={url} className="btn btn-dark btn-sm" target="_blank" rel="noopener noreferrer">Read More</a>
                </div>
            </div>
        )
    }
}
