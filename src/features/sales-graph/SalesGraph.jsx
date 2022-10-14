import React from "react";
import { LineChart, Line, XAxis, Tooltip } from "recharts";

const SalesGraph = (props) => {
    return(
        <div id="chart">
            <div>Retail Sales</div>
            <LineChart width={900} height={400} data={props.data}>
                <XAxis dataKey="month" />
                <Tooltip />
                <Line type="monotone" dataKey="retailSales" stroke="#40a8ef" />
                <Line type="monotone" dataKey="wholesaleSales" stroke="#3c4858" />
            </LineChart>
        </div>
    )
}

export default SalesGraph;