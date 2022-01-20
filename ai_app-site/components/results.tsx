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
            const element = <div key={i}>#{props.keywords[i]}</div>;
            keywordElements.push(element);
        }

    return (
    <>
        <div>

            <div>
                <div><b>Snippet</b></div> 
                <div>{props.snippet}</div>
            </div>

            <div>
                <div><b>Prompt</b></div> 
                <div>{props.prompt}</div>
            </div>

            <div>
                <div>{keywordElements}</div> 
            </div>

        </div>
        <button onClick={props.onBack}>Back

        </button>
    </> //returns React element
    );
};

export default Results