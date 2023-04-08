import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import {axiosInstance} from '../../../API/axios'

import Cardi from './Cardi'


function PageOfIdea () {
    const {id} = useParams();
   
        return(
            <>
               <Cardi id={id}/>
            </>
        )
}

export default PageOfIdea;