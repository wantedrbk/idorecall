import { createFileRoute, Link } from '@tanstack/react-router'
import { useAuthStore } from '../store/authStore'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to I Do Recall</h1>
      <p className="text-xl text-gray-600 mb-8">Boost your memory with our interactive flashcards!</p>
      {isAuthenticated ? (
        <Link to="/flashcards" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
          Go to Flashcards
        </Link>
      ) : (
        <Link to="/login" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
          Get Started
        </Link>
      )}
    </div>
  )
}