import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProductData } from './productPageApi';

const initialState = {
    productSalesTableData: {
        sortByColumnName: 'weekEnding', // data is prepared down below for each month for initial render hence choosing this as the default sort column
        sortByOrder: 'asc',
        sortedTableData: []
    },
    productSalesGraphData: [],
    productInfo:{},
    status: "idle"
};

export const fetchProductDataAsync = createAsyncThunk(
    'product/fetchData',
    async (productId) => {
      const response = await fetchProductData(productId);
      return response;
    }
);

export const productPageSlice = createSlice({
    name: 'productPage',
    initialState,
    reducers:{
        sortByColumn: (state, action) => {
            let sortByColumnName = action.payload;
            let newSortedData = [];
            let newSortOrder = '';

            if (sortByColumnName == state.productSalesTableData.sortByColumnName)
            {
                // Column is same change the sort order
                if (state.productSalesTableData.sortByOrder == "asc"){
                    // sort descending
                    newSortedData = state.productSalesTableData.sortedTableData.sort( (a,b) => {
                        return (b[sortByColumnName] > a[sortByColumnName]) ? 1 : ( (b[sortByColumnName] == a[sortByColumnName]) ? 0 : -1)
                    });
                    newSortOrder = "desc"
                }
                else{
                    // sort ascending
                    newSortedData = state.productSalesTableData.sortedTableData.sort( (a,b) => {
                        return (a[sortByColumnName] > b[sortByColumnName]) ? 1 : ( (a[sortByColumnName] == b[sortByColumnName]) ? 0 : -1)
                    });
                    newSortOrder = "asc"
                }
            }
            else 
            {
                newSortedData = state.productSalesTableData.sortedTableData.sort( (a,b) => {
                    return (a[sortByColumnName] > b[sortByColumnName]) ? 1 : ( (a[sortByColumnName] == b[sortByColumnName]) ? 0 : -1)
                });
                newSortOrder = "asc"
            }

            state.productSalesTableData.sortedTableData = newSortedData;
            state.productSalesTableData.sortByColumnName = sortByColumnName;
            state.productSalesTableData.sortByOrder = newSortOrder;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductDataAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchProductDataAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.productInfo = {
                id : action.payload.id,
                title: action.payload.title,
                image: action.payload.image,
                subtitle: action.payload.subtitle,
                tags: action.payload.tags
            };
            state.productSalesTableData.sortedTableData = action.payload.sales;

            // After fetching Data from Server we need to aggregate data of each month and then store that as a separate data for Chart
            let monthlySalesData = {}

            let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            action.payload.sales.forEach( elem => {
                let monthValue = new Date(elem.weekEnding).getUTCMonth();
                let month = monthNames[new Date(elem.weekEnding).getUTCMonth()];
                if(!monthlySalesData[month]){
                    monthlySalesData[month] = {
                        retailSales: elem.retailSales ,
                        wholesaleSales: elem.wholesaleSales,
                        unitsSold: elem.unitsSold,
                        retailerMargin: elem.retailerMargin,
                        month,
                        monthValue
                    }
                }
                else{
                    monthlySalesData[month] = {
                        retailSales:  monthlySalesData[month].retailSales + elem.retailSales ,
                        wholesaleSales:  monthlySalesData[month].wholesaleSales + elem.wholesaleSales,
                        unitsSold: monthlySalesData[month].unitsSold + elem.unitsSold,
                        retailerMargin: monthlySalesData[month].retailerMargin + elem.retailerMargin,
                        month,
                        monthValue
                    }
                }

            } )

            state.productSalesGraphData = Object.values(monthlySalesData).sort( (a,b) => a.monthValue - b.monthValue )
        })
    }
});

export const selectProductInfo = (state) => state.productPage.productInfo;
export const selectProductSalesTableData = (state) =>  state.productPage.productSalesTableData;
export const selectProductSalesGraphData = (state) => state.productPage.productSalesGraphData;

export const { sortByColumn } = productPageSlice.actions;


export default productPageSlice.reducer;

