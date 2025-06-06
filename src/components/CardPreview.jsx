import React from "react";
const mergeImages = require('merge-images');

let image = require("../assets/cards/custom-black.png");

export function CardPreview(props) {
    return (
        <>
            <div className='card-preview'>
                <img src={image} alt="image not found" />
            </div>
        </>
    );
}