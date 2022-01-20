import React from 'react';
interface FormProps {
    prompt: string;
    snippet: string;
    keywords: string[];
    onBack: any;
}


const Results: React.FC<FormProps> = (props) => {

    const keywordElements = [];
    for (let i = 0; i < props.keywords.length; i++) {
        const element = <div key={i} className='bg-pink-300 p-1 text-purple-900 px-2 text-sm rounded-md'>#{props.keywords[i]}</div>;
        keywordElements.push(element);
    }

    const keywordElementsBox = <div className='flex flex-wrap gap-2'>{keywordElements}</div>;


    const resultSection = (label: string, body: any) => {
        return (
             <div className = 'bg-pink-400 p-4 my-2 rounded-md'>
                <div className= 'text-purple-900 text-sm font-bold mb-4'>{label}</div> 
                <div>{body}</div>
            </div>
        );
    };


    return (
        <>
        <div className='mb-1'>
            {resultSection ("Prompt", <div className="text-lg font-bold">{props.prompt}</div>)}
            {resultSection ("Snippet", props.snippet)}
            {resultSection ("Keywords",  keywordElementsBox)}

        </div>
        <button 
        className = "bg-gradient-to-r from-purple-900 to-red-900 disabled:opacity-50 w-full p-2 rounded-md text-lg" 
        onClick={props.onBack}>
        Back
        </button>
    </> //returns React element
    );
};

export default Results