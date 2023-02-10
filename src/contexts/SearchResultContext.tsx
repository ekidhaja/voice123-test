import React, { createContext, useState } from "react";

type Props = {
    children?: React.ReactNode
};

export const SearchResultContext = createContext<any>(null);

const SearchResultContextProvider: React.FC<Props> = ({ children }) => {
    const [result, setResult] = useState([]);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [rowCount, setRowCount] = useState(0);
    
    return (
        <SearchResultContext.Provider 
            value={{ 
                result, 
                setResult, 
                page, 
                setPage,
                pageCount,
                setPageCount,
                rowCount,
                setRowCount
            }}
        >
            {children}
        </SearchResultContext.Provider>
    );
}
 
export default SearchResultContextProvider;