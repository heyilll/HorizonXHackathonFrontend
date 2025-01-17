import LLMCard from "./LLMCard";
import LLMService from "../services/llms.service.js";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import add from '../images/add3.svg'

function Catalog() { 
    const [models, setModels] = useState([]); 
    const [loading, setLoading] = useState(true); 
    
    useEffect(() => { 
        const fetchModels = async () => {
            const data = await LLMService.getLLMsService(); 
            setModels(data.models); 
            setLoading(false); 
        }; 

        fetchModels();   
    }, []); 
    
    if (loading) {
        return <div>Loading...</div>;
    }  

    return ( 
        <div className="container bg-white my-4" >
            <div className="row g-4 justify-content-between">
                <h2 className="col-6">All LLMs</h2>
                <Link to={`/addllm`} className="col-1"><button className=" btn btn-success"><img src={add} width={25} height={25} /></button></Link> 
            </div>
            
            <div className="row mt-4 g-4"> 
                {models && models.length !== 0 && models.map((model) => (
                    <LLMCard key={model._id} llm={model} />))} 
            </div> 
        </div>  
    );
}

export default Catalog;