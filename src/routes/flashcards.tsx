import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useFlashcardStore } from '../store/flashcardStore'
import { FlashcardForm } from '../components/FlashcardForm'

export const Route = createFileRoute('/flashcards')({
  component: Flashcards,
})

function Flashcards() {
  const { flashcards, fetchUserFlashcards, deleteFlashcard } = useFlashcardStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchUserFlashcards().finally(() => setIsLoading(false))
  }, [fetchUserFlashcards])

  if (isLoading) {
    return <div>Loading flashcards...</div>
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Your Flashcards</h1>
      <FlashcardForm />
      <div className="mt-8 space-y-4">
        {flashcards.map((card) => (
          <div key={card.id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">{card.question}</h3>
            <p className="text-gray-600">{card.answer}</p>
            <button
              onClick={() => deleteFlashcard(card.id)}
              className="mt-2 text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}