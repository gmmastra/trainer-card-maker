/* eslint-disable import/first */
import React from "react";
const mergeImages = require('merge-images');
import CardPreview from "./CardPreview";

export function CardArea(props) {
    return (
        <>
        {props.cardFrame}
            <div className='card-preview'>
                <CardPreview cardFrame={props.cardFrame} />
            </div>
            <div className='card-options'>
                <button type="submit">DOWNLOAD</button>
                <button type="submit">RANDOMIZE</button>
                <button type="reset" onClick={props.reset}>RESET</button>
            </div>
        </>
    );
}