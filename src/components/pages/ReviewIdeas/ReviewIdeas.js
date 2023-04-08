import { useEffect, useState } from "react";
import { axiosInstance } from '../../../API/axios';
import Ideas from "../Ideas/Ideas";

export default function ReviewIdeas() {
  const [ideasList, setIdeasList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getAllReviewIdeas = async () => {
    axiosInstance.get("/idea/allReview")
      .then((response) => {
        setIdeasList(response.data)
        setLoading(false)
      })
      .catch((error) => {
        setErrorMessage(error.message)
        setError(true);
      })
  }

    useEffect(() => {
      getAllReviewIdeas();
      console.log(ideasList.length === 0);
      console.log(ideasList.length);
    }, [])

  return(
    <>
      {ideasList.length === 0 ? 
      null
      :
      <Ideas 
      ideasList={ideasList} 
      loading={loading} 
      setLoading={setLoading} 
      error={error}
      setError={setError}
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage} 
    /> 
      }
    </>
  )
}
