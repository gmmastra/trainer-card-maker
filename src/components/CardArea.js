/* eslint-disable import/first */
import { useRef } from "react";
import { toPng } from "html-to-image";

export function CardArea(props) {

    const cardPreviewRef = useRef(null);

    // converts 'card-preview' div to a downloadable image
    const htmlToImageConvert = () => {
        toPng(cardPreviewRef.current, { cacheBust: false })
            .then((dataUrl) => {
                const link = document.createElement("a");
                link.download = "trainer-card.png";
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <div className={`card-preview ${props.cardFrame.split('-')[0]}`} ref={cardPreviewRef}>
                <p className="code">{props.friendcode}</p>
                <p className="name">{props.name}</p>
                {props.trainerType1 === 'None' ? null : (
                    <img alt='' src={process.env.PUBLIC_URL + `/assets/types/${props.trainerType1}.png`} className='trainer-type1' />
                )}
                {props.trainerType2 === 'None' ? null : (
                    <img alt='' src={process.env.PUBLIC_URL + `/assets/types/${props.trainerType2}.png`} className='trainer-type2' />
                )}
                {props.cardFrame === '' ? null : (
                    <img alt='' src={process.env.PUBLIC_URL + `/assets/cards/${props.cardFrame}.png`} className='card-frame' />
                )}
                <div className='sprite-list'>
                    {props.team === '' ? null : (
                        props.spriteList.map((sprite, index) => (
                            <div className={`sprite-${index} sprite-box`} key={index} style={{ backgroundImage: `url(${sprite})` }} />
                        ))
                    )}
                </div>
                <div className='card-preview-bg' />
                <div className='card-custom-bg' style={{ background: `url(${props.cardCustomBG}) no-repeat`, backgroundSize: 'cover' }} />
            </div >
            <div className='card-options'>
                <button onClick={htmlToImageConvert}>DOWNLOAD</button>
                <button type="submit">RANDOMIZE</button>
                <button type="reset" onClick={props.reset}>RESET</button>
            </div>
        </>
    );
}