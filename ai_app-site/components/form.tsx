import React from 'react';
interface FormProps {
    prompt: string;
    setPrompt: any;
    onSubmit: any;
    isLoading: boolean;
    charLimit: number;
}

const Form: React.FC<FormProps> = (props) => {
    
    const isPromptValid = props.prompt.length <=props.charLimit;
    
    const updatePromptValue = (text: string) => {
            if (text.length <= props.charLimit) {
                props.setPrompt(text);
            }
        };


    return (
<>
<h1>AI Life Adviser</h1>
<p>Get a piece of life advice from AI!</p>
<input 
type='text' 
placeholder='Give me some advice about...' 
value={props.prompt}
onChange={(e) => updatePromptValue (e.currentTarget.value)}>
</input>
<div>{props.prompt.length}/{props.charLimit}</div>
<button onClick={props.onSubmit} disabled={props.isLoading || !isPromptValid}>Submit</button>
</>  
);
};

export default Form