import { createFileRoute, Link } from '@tanstack/react-router'
import { AuthForm } from '../components/AuthForm'

export const Route = createFileRoute('/register')({
  component: Register,
})

function Register() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Create an Account</h1>
      <AuthForm isLogin={false} />
      <p className="mt-4 text-center">
        Already have an account?{' '}
        <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
          Sign in here
        </Link>
      </p>
    </div>
  )
}