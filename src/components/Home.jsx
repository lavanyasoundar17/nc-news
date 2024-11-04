import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../styles/Home.css';

const Home = () => {
    const [articles, setArticles] = useState([]);
    const [sortedArticles, setSortedArticles] = useState([]);
    const [sortOption, setSortOption] = useState("date");

    const fetchArticles = async () => {
        try {
            const response = await fetch('http://localhost:9090/api/articles');
            const data = await response.json();
            setArticles(data.articles);
        } catch {
            console.error("Error fetching articles");
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    useEffect(() => {
        if (articles.length > 0) {
            let sortedArray = [...articles];  
            if (sortOption === "date") {
                sortedArray.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            } else if (sortOption === "title") {
                sortedArray.sort((a, b) => a.title.localeCompare(b.title));
            } else if (sortOption === "author") {
                sortedArray.sort((a, b) => a.author.localeCompare(b.author));
            }
            setSortedArticles(sortedArray);  
        } else {
            setSortedArticles([]);  
        }
    }, [sortOption, articles]);  

    return (
        <div className="welcome_text">
            <h2>Welcome to NC news!</h2>
            <div>
                <label>Sort by: </label>
                <select onChange={(e) => setSortOption(e.target.value)}>
                    <option value="date">Date</option>
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                </select>
            </div>
            <ul className="articles_list">
                {sortedArticles.map((article, index) => (
                    <div key={index} className="article_container">
                        <h3>
                            <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
                        </h3>
                        <img src={article.article_img_url} alt={article.title} />
                        <p>By {article.author}</p>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default Home;
