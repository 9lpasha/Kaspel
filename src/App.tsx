import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import Table from "./Components/Table";
import Pagination from "./Components/Pagination";
import axios, {AxiosResponse} from "axios";

export interface Item {
    name: string
    phone: string
    email: string
    address: string
    guid: string
}

function App() {

    let [data, setData] = useState<Array<Item>>([])
    let [data2, setData2] = useState<Array<Item>>([])
    let [sortItem, setSortItem] = useState<'name' | 'phone' | 'email' | 'address'>('name')
    let [sortType, setSortType] = useState<number>(0)
    let [numPage, setNumPage] = useState<number>(0)
    let refInput = useRef<HTMLInputElement>(null)

    useEffect(() => {
        axios.get('gererated.json')
            .then((resp: AxiosResponse) => {
                setData(resp.data)
                setData2(resp.data.filter(filterFunc))
            })
    }, [])

    const filterFunc = (el: Item) => {
        if(refInput.current){
            if(el.name.includes(refInput.current.value)) return 1
            if(el.phone.includes(refInput.current.value)) return 1
            if(el.email.includes(refInput.current.value)) return 1
            if(el.address.includes(refInput.current.value)) return 1
            return 0
        }
    }

    const inputHandler = () => {
        setData2(data.filter(filterFunc))
        setNumPage(0)
    }

    return (
        <div className="App">
            <input ref={refInput} onInput={inputHandler} className="input" type="text"/>
            <Table data={data2} setSortItem={setSortItem} setSortType={setSortType}
            sortItem={sortItem} sortType={sortType} numPage={numPage}></Table>
            <Pagination numPage={numPage} setNumPage={setNumPage}
                        num={data2.slice(0, Math.ceil(data2.length/10))}></Pagination>
        </div>
    );
}

export default App;