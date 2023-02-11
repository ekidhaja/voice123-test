import React, { useContext } from "react";
import Highlighter from "react-highlight-words";

import { SearchResultContext } from "../contexts/SearchResultContext";
import Pagination from "./Pagination";

interface Props {
    keywords: string[];
}

const SearchResult: React.FC<Props> = ({ keywords }) => {
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
                            <Highlighter
                                searchWords={keywords}
                                autoEscape={true}
                                textToHighlight={item.name}
                            />
                        </a>
                    </h3>
                    <Highlighter
                        searchWords={keywords}
                        autoEscape={true}
                        textToHighlight={item.description}
                    />
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