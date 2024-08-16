import React from 'react'
import { Question } from '../logic/model/question'

function AddQuestionItem({question, onChange}: {question: Question, onChange: any}) {
    return (
        <div className="border border-gray-300 p-4 rounded-lg w-full">
            <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800">{question.wording}</span>
                <input 
                    type="checkbox" 
                    onChange={(e) => onChange(question, e.target.checked)} 
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
            </div>
        </div>
    );
}

export default AddQuestionItem