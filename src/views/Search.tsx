import { useState } from "react";
import SearchBox from '../components/SearchBox';
import SearchResult from '../components/SearchResult';
import { useSearchParams } from "react-router-dom";

const Search = () => {
    //get url query params
    const [searchParams, setSearchParams] = useSearchParams();

    //get search params from url
    const [keyword, setKeyword] = useState<string | null>(searchParams.get("keyword"));
    const [urlPage] = useState<string | null>(searchParams.get("page"));

    //declare urlParams to pass down as props SearchBox
    const urlParams = { "keyword": keyword, "page": urlPage };

    //search keywords to be passed as props to SearchResult
    const urlKeywords: string[] = keyword ? keyword.split(" ") : [];

    return (
        <div>
            <div className="search-box-container">
                <SearchBox 
                    keyword={keyword} 
                    setKeyword={setKeyword} 
                    searchParams={urlParams}
                    setSearchParams={setSearchParams} 
                />
            </div>
            <div className="search-result-container">
                <SearchResult keywords={urlKeywords} />
            </div>
        </div>
    );
}
 
export default Search;