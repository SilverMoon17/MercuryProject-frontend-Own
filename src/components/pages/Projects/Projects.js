import { useEffect, useState } from "react";
import { axiosInstance } from '../../../API/axios';
import Ideas from "../Ideas/Ideas";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getAllProjects = async () => {
    axiosInstance.get("/idea/allProjects")
      .then((response) => {
        setProjects(response.data)
        setLoading(false)
      })
      .catch((error) => {
        // console.log(error);
        setErrorMessage(error.message)
        setError(true);
      })
  }

    useEffect(() => {
      getAllProjects();
    }, [])

  return(
    <>
      <Ideas 
      ideasList={projects} 
      loading={loading} 
      setLoading={setLoading} 
      error={error}
      setError={setError}
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage} 
    />
    </>
  )
}
