import React from 'react'

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, auther, date, source } = props;
    return (
        <div className="my-3">
            <div className="card" style={{ width: "18rem" }}>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ left: '90% !important', zIndex: "1" }}>
                    {source}
                </span>
                <img src={imageUrl ? imageUrl : "https://english.cdn.zeenews.com/sites/default/files/2021/09/01/966446-covid-india-new.jpg"} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title" >{title}</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-muted">By {auther == null ? "Unknown" : auther} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem
