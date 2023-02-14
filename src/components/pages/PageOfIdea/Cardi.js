import { useState, useEffect } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import './Cardi.css';
import img from "../../../resources/idea_img1.png";

export default function Cardi() {
    const [progress, setProgress] = useState(0);
    const [currVal] = useState(0);
    function calcProgress(currVal, maxVal) {
        setProgress((currVal * 100) / maxVal);
    }

    useEffect(() => { calcProgress(currVal, 10000) })

    return (
        <>
            <div className="idea-block1 d-flex">
                <Image rounded src={img} style={{marginLeft: "10px", marginRight: "10px"}}/>
                <div className="idea-block1-info">
                    <h3 className="idea-title">Hipster ipsum tattooed brunch I'm</h3>
                    <label className='category'>IT</label>
                    <p className="idea-description1">Hipster ipsum tattooed brunch I'm baby. Microdosing taxidermy farm-to-table
                        chicharrones pour-over pok truck polaroid pabst vibecession. Tbh coffee haven't hammock microdosing mumblecore
                        flannel trade enamel. Hoodie taiyaki church-key hashtag yuccie forage tilde semiotics deep. Shaman paleo it
                        juice bottle next poutine williamsburg. Meggings vaporware everyday fund.</p>
                    <div className="collected d-block" style={{ width: '40%' }}>
                        <span className='collected-text1'>Collected</span>
                        <ProgressBar now={progress} />
                        <div className="d-flex justify-content-between">
                            <span>{currVal}$</span>
                            <span>10000$</span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end" style={{ marginRight: "66px" }}>
                            <Button>DONATE</Button>
                    </div>
                </div>
            </div>

            <h2>Description</h2>

            <div class='Block1'>
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                     incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                       irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                         deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
                          adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                           Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                             velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                              cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </span>
                        <Image class="Bl1" rounded src={img} style={{marginLeft: "10px"}}/>

            </div>

            <h2 style={{marginLeft: '70%'}}>Description</h2>

            <div class='Block2'>
            <Image class="Bl1" rounded src={img} style={{marginLeft: "10px"}}/>
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                     incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                       irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                         deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
                          adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                           Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                             velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                              cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </span>
                        

            </div>
      
      

            
        </>
    )
} 