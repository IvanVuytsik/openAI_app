import React from 'react';
interface FormProps {
    prompt: string;
    setPrompt: any;
    onSubmit: any;
    isLoading: boolean;
    charLimit: number;
}

const Form: React.FC<FormProps> = (props) => {
    
    const isPromptValid = props.prompt.length < props.charLimit;
    
    const updatePromptValue = (text: string) => {
        if (text.length <= props.charLimit) {
                props.setPrompt(text);
        }
    };

    let statusColor = "text-white";
    let statusText = null;
    if (!isPromptValid) {
            statusColor = "text-pink-600";
            statusText = `Too many symbols!`
    }

    return (
<>
 
<div className='mb-6 text-pink-600'>
<p>Get a piece of life advice from AI!</p>
</div>
<input className='p-2 w-full rounded-md focus: outline-pink-600 focus:outline text-slate-700'
type='text' 
placeholder='Health...' 
value={props.prompt}
onChange={(e) => updatePromptValue (e.currentTarget.value)}>
</input>
<div className={statusColor + " flex justify-between my-2 mb-6 text-sm"}>
    <div>{statusText}</div>
    <div>
        {props.prompt.length}/{props.charLimit}
    </div>
</div>
<button 
className = "bg-gradient-to-r from-purple-900 to-red-900 disabled:opacity-50 w-full p-2 rounded-md text-lg" 
onClick={props.onSubmit} 
disabled={props.isLoading || !isPromptValid}>
Submit
</button>
</>  
);
};

export default Form