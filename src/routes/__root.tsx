import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { Brain } from 'lucide-react'
import { useAuthStore } from '../store/authStore'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <Brain className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-800">I Do Recall</span>
              </Link>
              <div className="ml-6 flex space-x-8">
                <Link to="/" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </Link>
                {isAuthenticated && (
                  <>
                    <Link to="/flashcards" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                      Flashcards
                    </Link>
                    <Link to="/train" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                      Train
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center">
              {isAuthenticated ? (
                <button onClick={logout} className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Logout
                </button>
              ) : (
                <Link to="/login" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}