import React from 'react';
import './Table.css'
import {Item} from "../App";

interface TableProps {
    data: Array<Item>
    sortType: number
    sortItem: 'name' | 'phone' | 'email' | 'address'
    setSortType: any
    setSortItem: any
    numPage: number
}

const Table = ({data, sortType, sortItem, setSortItem, setSortType, numPage}: TableProps) => {

    const clickSortHandler = (e: React.MouseEvent) => {
        const target = e.target as HTMLDivElement
        const prevSortItem = sortItem
        let newSortItem
        if (target.classList.contains('filter__link') && target.textContent) {
            let temp = target.textContent.toLowerCase()
            if(temp == 'name' || temp == 'phone' || temp == 'email' || temp == 'address')
                setSortItem(temp)
            newSortItem = target.textContent.toLowerCase()
        } else if (target.children[0].textContent) {
            let temp = target.children[0].textContent.toLowerCase()
            if(temp == 'name' || temp == 'phone' || temp == 'email' || temp == 'address')
                setSortItem(temp)
            newSortItem = target.children[0].textContent.toLowerCase()
        }
        if (prevSortItem == newSortItem) setSortType(1)
        if (sortType == 1) setSortType(0)
    }

    return (
        <>
            <div className="container">
                <div className="table">
                    <div className="table-header">
                        <div onClick={clickSortHandler} className="header__item">
                            <div className="filter__link">Name</div>
                            {sortItem === 'name' ? <div className={!sortType ? "d1" : "d2"}></div> : null}
                        </div>
                        <div onClick={clickSortHandler} className="header__item">
                            <div className="filter__link filter__link--number">Phone</div>
                            {sortItem === 'phone' ? <div className={!sortType ? "d1" : "d2"}></div> : null}
                        </div>
                        <div onClick={clickSortHandler} className="header__item">
                            <div className="filter__link filter__link--number">Email</div>
                            {sortItem === 'email' ? <div className={!sortType ? "d1" : "d2"}></div> : null}
                        </div>
                        <div onClick={clickSortHandler} className="header__item">
                            <div className="filter__link filter__link--number">Address</div>
                            {sortItem === 'address' ? <div className={!sortType ? "d1" : "d2"}></div> : null}
                        </div>
                    </div>
                    <div className="table-content">
                        {
                            data.sort((leftSide, rightSide) => {
                                if(sortType === 0) {
                                    if (leftSide[sortItem] > rightSide[sortItem]) return 1
                                    if (leftSide[sortItem] < rightSide[sortItem]) return -1
                                } else {
                                    if (leftSide[sortItem] < rightSide[sortItem]) return 1
                                    if (leftSide[sortItem] > rightSide[sortItem]) return -1
                                }
                                return 0
                            }).slice(numPage * 10, numPage * 10 + 10).map((el: Item) => (
                                    <div key={el.guid} className="table-row">
                                        <div className="table-data">{el.name}</div>
                                        <div className="table-data">{el.phone}</div>
                                        <div className="table-data">{el.email}</div>
                                        <div className="table-data">{el.address}</div>
                                    </div>
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Table;