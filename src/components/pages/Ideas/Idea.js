import { useState, useEffect } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import './Idea.css';
import img from "../../../resources/idea_img1.png";

export default function Idea() {
    const [progress, setProgress] = useState(0);
    const [currVal, setCurrVal] = useState(0);
    function calcProgress(currVal, maxVal) {
        setProgress((currVal * 100) / maxVal);
    }

    useEffect(() => { calcProgress(currVal, 10000) })

    return (
        <>
            <div className="idea-block d-flex mb-5">
                <Image rounded src={img} style={{ marginLeft: "10px" }} />
                <div className="idea-block-info">
                    <h3 className="idea-title">Hipster ipsum tattooed brunch I'm</h3>
                    <label className='category'>IT</label>
                    <p className="idea-description">Hipster ipsum tattooed brunch I'm baby. Microdosing taxidermy farm-to-table
                        chicharrones pour-over pok truck polaroid pabst vibecession. Tbh coffee haven't hammock microdosing mumblecore
                        flannel trade enamel. Hoodie taiyaki church-key hashtag yuccie forage tilde semiotics deep. Shaman paleo it
                        juice bottle next poutine williamsburg. Meggings vaporware everyday fund.</p>
                    <div className="collected d-block" style={{ width: '40%' }}>
                        <span className='collected-text'>Collected</span>
                        <ProgressBar now={progress} />
                        <div className="d-flex justify-content-between">
                            <span>{currVal}$</span>
                            <span>10000$</span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end" style={{ marginRight: "66px" }}>
                        <Button>LEARN MORE</Button>
                    </div>
                </div>
            </div>
        </>
    )
} 