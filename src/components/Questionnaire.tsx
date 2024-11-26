import { useState } from 'react';
import { Question, UserResponse } from '../types/questionnaire';
import { questions } from '../data/questions';

interface QuestionnaireProps {
    onComplete: (responses: UserResponse[]) => void;
}

export function Questionnaire({ onComplete }: QuestionnaireProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [responses, setResponses] = useState<UserResponse[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    const handleAnswer = (answer: string | string[]) => {
        const newResponses = [
            ...responses,
            { questionId: currentQuestion.id, answer },
        ];
        setResponses(newResponses);
        setSelectedOptions([]); // Reset selected options for next question

        if (currentQuestionIndex === questions.length - 1) {
            onComplete(newResponses);
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleMultiSelectChange = (option: string, checked: boolean) => {
        setSelectedOptions(prev => {
            if (checked) {
                return [...prev, option];
            } else {
                return prev.filter(item => item !== option);
            }
        });
    };

    const renderQuestionInput = (question: Question) => {
        switch (question.type) {
            case 'text':
                return (
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        placeholder="Type your answer..."
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleAnswer((e.target as HTMLInputElement).value);
                            }
                        }}
                    />
                );

            case 'select':
                return (
                    <div className="space-y-2">
                        {question.options?.map((option) => (
                            <button
                                key={option}
                                className="w-full p-2 text-left border rounded-md hover:bg-gray-50"
                                onClick={() => handleAnswer(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                );

            case 'multiSelect':
                return (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            {question.options?.map((option) => (
                                <label key={option} className="flex items-center space-x-2 p-2 border rounded-md hover:bg-gray-50">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-blue-500"
                                        checked={selectedOptions.includes(option)}
                                        onChange={(e) => handleMultiSelectChange(option, e.target.checked)}
                                    />
                                    <span>{option}</span>
                                </label>
                            ))}
                        </div>
                        <button
                            className={`w-full mt-4 p-2 text-white rounded-md transition-colors ${selectedOptions.length > 0
                                    ? 'bg-blue-500 hover:bg-blue-600'
                                    : 'bg-gray-300 cursor-not-allowed'
                                }`}
                            onClick={() => {
                                if (selectedOptions.length > 0) {
                                    handleAnswer(selectedOptions);
                                }
                            }}
                            disabled={selectedOptions.length === 0}
                        >
                            Continue
                        </button>
                    </div>
                );
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="mb-8">
                <div className="h-2 bg-gray-200 rounded-full">
                    <div
                        className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="mt-2 text-sm text-gray-500">
                    Question {currentQuestionIndex + 1} of {questions.length}
                </div>
            </div>

            <div className="space-y-6">
                <h2 className="text-xl font-semibold">{currentQuestion.text}</h2>
                {renderQuestionInput(currentQuestion)}
            </div>
        </div>
    );
} 