import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinners from './Spinners';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        props.setProgress(20);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
        setLoading(true);
        props.setProgress(30);
        let data = await fetch(url);
        let parseData = await data.json();
        props.setProgress(60);

        setArticles(parseData.articles);
        setTotalResults(parseData.totalResults);
        setLoading(false);
        props.setProgress(100);
        
    }
    
    useEffect(() => {
        document.title = capitalizeFirstLetter(props.category) + " - NewsMonkey";
        updateNews();
        // eslint-disable-next-line
    }, [])

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pagesize=${props.pageSize}`;
        setPage(page + 1);
        
        let data = await fetch(url);
        let parseData = await data.json();

        setArticles(articles.concat(parseData.articles));
        setTotalResults(parseData.totalResults);
        setLoading(false);
    };

    return (
        <div >
            <h1 className="text-center" style={{ margin: '35px 0px',marginTop: '90px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>

            {loading && <Spinners />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinners />}>
                <div className="container">

                    <div className="row">
                        {articles.map((element) => {
                            return <div key={element.url} className="col md-4">
                                <NewsItem
                                    title={element.title ? element.title : ""}
                                    description={element.description ? element.description : ""}
                                    imageUrl={element.urlToImage ? element.urlToImage : "https://english.cdn.zeenews.com/sites/default/files/2021/09/01/966446-covid-india-new.jpg"}
                                    newsUrl={element.url ? element.url : "/"}
                                    auther={element.author}
                                    date={element.publishedAt}
                                    source={element.source.name}
                                />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>

        </div>
    )
}

News.defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
