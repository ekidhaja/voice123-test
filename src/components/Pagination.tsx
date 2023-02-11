import React, { useState, useEffect, useContext } from "react";
import { SearchResultContext } from "../contexts/SearchResultContext";

const Pagination = () => {
    const { page, setPage, pageCount } = useContext(SearchResultContext);
    const [tabs, setTabs] = useState<number[]>([]);
    const [hidePrevButton, setHidePrevButton] = useState(true); //hidden by default
    const [hideNextButton, setHideNextButton] = useState(false); //shown by default
    
    useEffect(() => {
        //empty tabs array
        setTabs([]);

        //temp array
        const arr: number[] = [];

        //set where tab numbering should begin and end eg: 1-10, 2-11, 3-12 etc
        let tabStart = (page - 10 + 1) < 1 ? 1 : (page - 10 + 1);
        let tabMax = 10;

        //check if total pages should hold less than 10 tabs
        if(Math.floor(pageCount / 10) < 1) {
            tabMax = pageCount;
        }

        //populate tabs
        for(let i = tabStart; i < tabMax + tabStart; i++) {
            arr.push(i);
        }

        //show or hide prev button
        if(page < 2) {
            setHidePrevButton(true);
        }
        else {
            setHidePrevButton(false);
        }

        //show or hide next button
        if(page >= pageCount) {
            setHideNextButton(true);
        }
        else {
            setHideNextButton(false);
        }
        
        //set tabs
        setTabs(arr);

    }, [page, pageCount]);

    return (
        <div className="pagination-div">
            <button 
                className="pagination-buttons"
                onClick={() => setPage(page - 1)}
                disabled={hidePrevButton}
            >
                Prev
            </button>
            <div className="pagination-tabs">
            {tabs?.map((tab: any) => {
                return (
                    <button 
                        className="pagination-item" 
                        onClick={() => setPage(tab)}
                        key={tab}
                        style={{ backgroundColor: tab == page ? '#888fd4' : '' }}
                    >
                        {tab}
                    </button>
                )
            })}
            </div>
            <button 
                className="pagination-buttons"
                onClick={() => setPage(page + 1)}
                disabled={hideNextButton}
            >
                Next
            </button>
        </div>
    );
}
 
export default Pagination;