import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useFlashcardStore } from '../store/flashcardStore'

export const Route = createFileRoute('/train')({
  component: Train,
})

function Train() {
  const { flashcards, fetchUserFlashcards } = useFlashcardStore()
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchUserFlashcards().finally(() => setIsLoading(false))
  }, [fetchUserFlashcards])

  if (isLoading) {
    return <div>Loading flashcards...</div>
  }

  if (flashcards.length === 0) {
    return <div>No flashcards available. Create some flashcards to start training!</div>
  }

  const currentCard = flashcards[currentCardIndex]

  const nextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length)
    setShowAnswer(false)
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Training Mode</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
        <div className="text-xl font-semibold mb-4">
          {showAnswer ? currentCard.answer : currentCard.question}
        </div>
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-300"
        >
          {showAnswer ? "Show Question" : "Show Answer"}
        </button>
      </div>
      <button
        onClick={nextCard}
        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
      >
        Next Card
      </button>
    </div>
  )
}