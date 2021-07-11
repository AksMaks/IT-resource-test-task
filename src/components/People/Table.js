import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Table.css'

const Table = (props) => {
    return (
        <div>
            <table className={"table"}>
                <thead>
                    <tr>
                    {props.head.map(el => {
                        return (
                            <th 
                                key={uuidv4()}
                                onClick={() => props.changeSort(el.key)}
                                style={{cursor: "pointer"}}
                            >
                                {el.title}
                                {el.key == props.sort.key? (props.sort.type? "▲": "▼"): null}
                            </th>
                        )
                    })}
                    </tr>
                </thead>
                <tbody>
                    {props.data.map(el => {
                        return (
                            <tr key={uuidv4()}>
                                {props.head.map(head => {
                                    return (
                                        <td key={uuidv4()} data-label={head.title}>{el[head.key]}</td>     
                                    )
                                })}
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table