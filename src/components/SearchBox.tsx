import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SearchResultContext } from "../contexts/SearchResultContext";

interface Props {
    keyword: string | null;
    setKeyword: React.Dispatch<React.SetStateAction<string | null>>;
    searchParams: any;
    setSearchParams: any;
}

const SearchBox: React.FC<Props> = ({ keyword, setKeyword, searchParams, setSearchParams }) => {
    //get contexts
    const { setResult, page, setPage, setPageCount, setRowCount } = useContext(SearchResultContext);

    //error flag
    const [error, setError] = useState(false);

    //input value binder
    const [input, setInput] = useState(keyword);

    const [freshLoad, setFreshLoad] = useState(true);

    //fetch data everytime keyword changes
    useEffect(() => {
        (async function() {
            if(keyword) {
                //where to store provider details returned
                const providers: any[] = [];

                //used to set url page param incase it is not set in the url
                let urlPage = searchParams["page"] ? searchParams["page"] : 1;
                
                //set url page param to match current pageNo in pagination
                if(!freshLoad) {
                    urlPage = page;
                }
                else {
                    let temp = Number(urlPage);
                    setPage(temp);
                }

                try {
                    //fetch data
                    const res = await axios.get(`https://api.sandbox.voice123.com/providers/search/?service=voice_over&keywords=${keyword.trim()}&page=${urlPage}`);
    
                    //get headers
                    let totalPages = Number(res.headers["x-list-total-pages"]);
                    let totalRows = Number(res.headers["x-list-total-rows"]);
        
                    //prepare search results to be displayed
                    res.data.providers?.forEach((provider: any) => {
                        providers.push({
                            id: provider.user.id,
                            name: provider.user.name,
                            username: provider.user.username,
                            avatar: provider.user.picture_large,
                            description: provider.headline,
                            media: provider.relevant_sample.file
                        })
                    });
    
                    //set search results context
                    setResult(providers);

                    //set search page in url
                    setSearchParams({...searchParams, "page": urlPage });

                    //set page count
                    setPageCount(totalPages);

                    //set total row count
                    setRowCount(totalRows);

                    setFreshLoad(false);
                } catch (err: any) {
                    console.log("Error fetching data: ", err);
                }
            }
        })();

    }, [keyword, page]);

    //called when Search button is clicked on Enter key is pressed
    function resetKeyword() {
        //set error if keyword is not provided
        if(!input) {
            setError(true);
        }
        else {
            //clear errors
            setError(false);

            //reset keyword
            setKeyword(input);

            //reset pageNo in context
            setPage(1);

            //set search keyword ang page in url
            setSearchParams({...searchParams, "keyword": input.trim(), "page": 1 });
        }
    }

    return (
        <div>
            <div className="search-box">
                <input 
                    type="text" 
                    placeholder="Enter search keyword" 
                    value={input ? input : ""}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && resetKeyword()}
                />
                <button onClick={resetKeyword}>search</button>
            </div>
            {error && <div style={{ color: "red", fontSize: 12 }}>Please enter keywords</div>}
        </div>
    );
}
 
export default SearchBox;