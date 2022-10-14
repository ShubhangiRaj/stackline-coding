import React  from "react";
import { useSelector, useDispatch } from 'react-redux';
import { selectProductInfo, selectProductSalesGraphData, selectProductSalesTableData, sortByColumn } from "./productPageSlice";
import "./styles-product-page.css"


import ProductLeftRail from '../product-left-rail/ProductLeftRail';
import SalesGraph from '../sales-graph/SalesGraph';
import SalesTable from '../sales-table/SalesTable';
import Header from '../header/Header';

const ProductPage = () => {

    const productInfo = useSelector(selectProductInfo);
    const productSalesTableData = useSelector(selectProductSalesTableData);
    const productSalesGraphData = useSelector(selectProductSalesGraphData);

    const dispatch = useDispatch();

    const sortBy = (sortByColumnName) => {
        dispatch(sortByColumn(sortByColumnName));
    }

    return(
        
        <div className="productPage">
            <div className="headerContainer">
                <Header/>
            </div>
            <div className="productLeftRailContainer">
                <ProductLeftRail data = {productInfo}/>
            </div>
            <div className="productSalesGraphContainer">
                <SalesGraph data = {productSalesGraphData}/>
            </div>
            <div className="productSalesTableContainer">
                <SalesTable data = {productSalesTableData} sortBy={sortBy}/>
            </div>
        </div>
    )
}
export default ProductPage;