import React from "react";
import './styles-product-left-rail.css';


const ProductLeftRail = (props) => {

    const {title, image, subtitle, tags, alt} = props.data;

    return(
        <>
            <div id="product">
                <figure>
                    <img src={image} alt={alt} />
                    <figcaption id="title">{title}</figcaption>
                    <figcaption id="subtitle">{subtitle}</figcaption>
                </figure>
                <hr />
                <div id="spans">{tags.map( tag => (<span className="tags">{tag}</span>))}</div>
                <hr />
            </div>
        </>
    )
}

export default ProductLeftRail;