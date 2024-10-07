import { createFileRoute, Link } from '@tanstack/react-router'
import { AuthForm } from '../components/AuthForm'

export const Route = createFileRoute('/login')({
  component: Login,
})

function Login() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>
      <AuthForm isLogin={true} />
      <p className="mt-4 text-center">
        Don't have an account?{' '}
        <Link to="/register" className="text-indigo-600 hover:text-indigo-500">
          Register here
        </Link>
      </p>
    </div>
  )
}