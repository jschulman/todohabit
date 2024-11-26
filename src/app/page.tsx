'use client';

import { useState } from 'react';
import { Questionnaire } from '../components/Questionnaire';
import { MethodologyDisplay } from '../components/MethodologyDisplay';
import { MethodologyResponse, UserResponse } from '../types/questionnaire';
import { generateMethodology } from '../services/openai';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [methodology, setMethodology] = useState<MethodologyResponse | null>(null);

  const handleQuestionnaireComplete = async (responses: UserResponse[]) => {
    setIsLoading(true);
    try {
      const methodology = await generateMethodology(responses);
      setMethodology(methodology);
    } catch (error) {
      console.error('Error generating methodology:', error);
      alert('An error occurred while generating your methodology. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {!methodology && !isLoading && (
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Discover Your Perfect Productivity Method
              </h1>
              <p className="text-xl text-gray-600">
                Answer a few questions and get a personalized productivity methodology
                in under 15 minutes.
              </p>
            </div>
            <Questionnaire onComplete={handleQuestionnaireComplete} />
          </>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-lg text-gray-600">
              Generating your personalized methodology...
            </p>
          </div>
        )}

        {methodology && !isLoading && <MethodologyDisplay methodology={methodology} />}
      </div>
    </main>
  );
}
