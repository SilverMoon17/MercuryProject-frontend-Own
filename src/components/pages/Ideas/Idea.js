import { useState, useEffect } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";


import './Idea.css';
import img from "../../../resources/idea_img1.png";

export default function Idea(
    {id,
    title,
    description,
    status,
    goal,
    collected,
    category, 
    imageUrls,}
) {
    const [progress, setProgress] = useState(0);
    const [validDescription, setValidDescription] = useState(description);

    useEffect(() => {
        if (description.length > 350) {
            setValidDescription(description.slice(0, 350) + '...');
        }
    }, [description])

    function calcProgress(collected, goal) {
        setProgress((collected * 100) / goal);
    }

    useEffect(() => { calcProgress(collected, goal) })

    return (
        <>
            <div className="idea-block d-flex mb-5">
                <Image className='idea-image' rounded src={imageUrls ? imageUrls[0] : img} style={{ marginLeft: "10px" }} />
                <div className="idea-block-info">
                    <h3 className="idea-title">{title}</h3>
                    <label className='category'>{category}</label>
                    <p className="idea-description">{validDescription}</p>
                    <div className="collected d-block" style={{ width: '40%' }}>
                        <span className='collected-text'>Collected</span>
                        <ProgressBar now={progress} />
                        <div className="d-flex justify-content-between">
                            <span>{collected}$</span>
                            <span>{goal}$</span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end" style={{ marginRight: "66px" }}>
                        <Link to={`/idea/${id}`}><Button>LEARN MORE</Button></Link>
                    </div>
                </div>
            </div>
        </>
    )
} 