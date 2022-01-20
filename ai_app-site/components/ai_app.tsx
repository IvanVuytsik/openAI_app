import React from 'react';
import Form from './form';
import Results from './results';
import Image from 'next/image';
import logo from '../public/favicon.svg'


const LifeAdviser: React.FC = () => {
    const CHARACTER_LIMIT: number = 16;
    const ENDPOINT: string = "https://fog7or6l88.execute-api.us-east-1.amazonaws.com/prod/generate_snippet_and_keywords";
    const [prompt, setPrompt] = React.useState("");
    const [snippet, setSnippet] = React.useState("");
    const [keywords, setKeywords] = React.useState([]);
    const [hasResult, setHasResult] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);


    const onSubmit = () => {
        console.log("Submitting: " + prompt);
        setIsLoading(true);
        fetch(`${ENDPOINT}?prompt=${prompt}`)
            .then((res) => res.json())
            .then(onResult);
    };

    const onResult = (data: any) => {
        setSnippet(data.snippet);
        setKeywords(data.keywords);
        setHasResult(true);
        setIsLoading(false);
    };

     const onReset = () => {
        setPrompt("");
        setHasResult(false);
        setIsLoading(false);
    };


    let displayedElement = null;

    if (hasResult) {
        displayedElement =  
        <Results snippet={snippet} keywords={keywords} onBack={onReset} prompt={prompt} /> 
    } else {
        displayedElement = ( 
        <Form 
            prompt={prompt} 
            setPrompt={setPrompt} 
            onSubmit={onSubmit} 
            isLoading={isLoading} 
            charLimit={CHARACTER_LIMIT} />
        );
    }


const gradientTextStyle = 
    "text-white text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-red-900  w-fit mx-auto";

return (
<>
<div className='h-screen flex'>
    <div className='max-w-md m-auto p-2'>
        <div className='bg-red-200 p-6 rounded-md text-white'>
            <div className='text-center my-6'>
                <Image src={logo} width={64} height={64}/> 
 
                <h1 className={gradientTextStyle + ' text-3xl font-light'}><b>AI Adviser</b></h1>
                <div className={gradientTextStyle}><b>Your AI adviser for every day!</b></div>
            </div>
            
            {displayedElement}
        </div>
    </div>
</div>
</>
);
};

export default LifeAdviser;

