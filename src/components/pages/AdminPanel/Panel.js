import { Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

import './Panel.css';
import avatar from '../../../resources/avatar.jpg';


export default function Panel() {
    return(
        <>
            <Image src={avatar} style={{width: "15%", height: "15%", marginLeft: "20%", marginTop: "3%"}}/>

            <Button href="./pageCreating" variant='secondary' 
                style={{marginLeft: "4%"}}>Create Product</Button>

            <Button href="./IdeaCreating" variant='secondary' 
                style={{marginLeft: "4%"}}>Submit Idea</Button>

            <Button href="" variant='secondary' 
                style={{marginLeft: "4%"}}>Check Submited Ideas</Button>

            <Button href="" variant='secondary' 
                style={{marginLeft: "4%"}}>Edit Profile</Button>
            
            <div style={{fontFamily: "inherit", fontSize: "20px", marginLeft: "39.5%"}}>Users Online:</div>
            <div style={{fontFamily: "inherit", fontSize: "20px", marginLeft: "39.5%", marginBottom: "3%"}}>Current/All</div>
        </>
    )
}