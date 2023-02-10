import React, { useContext } from "react";

import { SearchResultContext } from "../contexts/SearchResultContext";
import Pagination from "./Pagination";

const SearchResult = () => {
    const { result } = useContext(SearchResultContext);

    return result.length ? (
        <div className="search-result">
            {result.map((item: any) => (
            <div className="search-result-item" key={item.id}>
                <div className="search-result-item-left">
                    <img src={item.avatar} alt="avatar" />
                </div>
                <div className="search-result-item-middle">
                    <h3>
                        <a 
                            href={`https://voice123.com/${item.username}`} 
                            target="_blank"
                            rel="noreferrer"
                        >
                            {item.name}
                        </a>
                    </h3>
                    <div>{item.description}</div>
                </div>
                <div className="search-result-item-right">
                    <audio controls>
                        <source src="horse.ogg" type="audio/ogg" />
                        <source src={item.media} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            </div>
            ))}

            <div className="pagination-container">
                <Pagination />
            </div>
        </div>
    )
    :
    null;
}
 
export default SearchResult;