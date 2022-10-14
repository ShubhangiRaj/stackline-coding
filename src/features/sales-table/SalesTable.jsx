import React from "react";
import './styles-sales-table.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const SalesTable = (props) => {
    return(
        <div id="table">
            <table>
                <thead>
                <tr>
                    <th scope="col" onClick={() => props.sortBy("weekEnding")}>
                    <div>
                        WEEK ENDING
                        <span className="arrowIcon"> 
                            {
                                props.data.sortByOrder === "asc" && props.data.sortByColumnName == "weekEnding" ? <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
                                : <FontAwesomeIcon icon={faChevronUp}></FontAwesomeIcon>
                            }
                        </span>
                    </div>
                    </th>
                    <th scope="col" onClick={() => props.sortBy("retailSales")}>
                    <div>
                        RETAIL SALES <span className="arrowIcon">
                        {
                            props.data.sortByOrder === "asc" && props.data.sortByColumnName == "retailSales" ? <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
                            : <FontAwesomeIcon icon={faChevronUp}></FontAwesomeIcon>
                        }
                        </span>
                    </div>
                    </th>
                    <th scope="col" onClick={() => props.sortBy("wholesaleSales")}>
                    <div>
                        WHOLESALE SALES <span className="arrowIcon">
                        {
                            props.data.sortByOrder === "asc" && props.data.sortByColumnName == "wholesaleSales" ? <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
                            : <FontAwesomeIcon icon={faChevronUp}></FontAwesomeIcon>
                        }
                        </span>
                    </div>
                    </th>
                    <th scope="col" onClick={() => props.sortBy("unitsSold")}>
                    <div>
                        UNITS SOLD <span className="arrowIcon">
                        {
                            props.data.sortByOrder === "asc" && props.data.sortByColumnName == "unitsSold" ? <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
                            : <FontAwesomeIcon icon={faChevronUp}></FontAwesomeIcon>
                        }
                        </span>
                    </div>
                    </th>
                    <th scope="col" onClick={() => props.sortBy("retailerMargin")}>
                    <div>
                        RETAILER MARGIN <span className="arrowIcon">
                        {
                            props.data.sortByOrder === "asc" && props.data.sortByColumnName == "retailerMargin" ? <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
                            : <FontAwesomeIcon icon={faChevronUp}></FontAwesomeIcon>
                        }
                        </span>
                    </div>
                    </th>
                </tr>
                </thead>
                <tbody>
                    {
                        (props.data.sortedTableData).map( (row, index) => (
                            <tr key={index}>
                                <td>{row.weekEnding.toLocaleString()}</td>
                                <td>{"$" + row.retailSales.toLocaleString()}</td>
                                <td>{"$" + row.wholesaleSales.toLocaleString()}</td>
                                <td>{row.unitsSold.toLocaleString()}</td>
                                <td>{"$" + row.retailerMargin.toLocaleString()}</td>
                            </tr>
                        )) 
                    }
                </tbody>
            </table>
        </div>
    )
}
export default SalesTable;