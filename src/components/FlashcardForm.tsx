import React from 'react';
import { useForm } from 'react-hook-form';
import { useFlashcardStore } from '../store/flashcardStore';

export const FlashcardForm: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { createFlashcard } = useFlashcardStore();

  const onSubmit = async (data: { question: string; answer: string }) => {
    try {
      await createFlashcard(data.question, data.answer);
      reset();
    } catch (error) {
      console.error('Failed to create flashcard:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="question" className="block text-sm font-medium text-gray-700">Question</label>
        <input
          type="text"
          id="question"
          {...register('question', { required: 'Question is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.question && <p className="mt-1 text-sm text-red-600">{errors.question.message as string}</p>}
      </div>
      <div>
        <label htmlFor="answer" className="block text-sm font-medium text-gray-700">Answer</label>
        <input
          type="text"
          id="answer"
          {...register('answer', { required: 'Answer is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.answer && <p className="mt-1 text-sm text-red-600">{errors.answer.message as string}</p>}
      </div>
      <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Create Flashcard
      </button>
    </form>
  );
};