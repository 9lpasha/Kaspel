import React from 'react';
import './Pagination.css'
import {Item} from "../App";

interface PaginationProps {
    num: Array<Item>
    numPage: number
    setNumPage: any
}

const Pagination = ({num, numPage, setNumPage}: PaginationProps) => {

    return (
        <div className="Pagination">
            {
                num.map((el, i) => (
                    <div key={i} className={numPage === i ? "PaginationItemActive" : "PaginationItem"}
                    onClick={() => {
                        setNumPage(i)
                    }}>{i + 1}</div>
                ))
            }
        </div>
    );
};

export default Pagination;