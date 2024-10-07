import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../store/authStore';

interface AuthFormProps {
  isLogin: boolean;
}

export const AuthForm: React.FC<AuthFormProps> = ({ isLogin }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, register: registerUser } = useAuthStore();

  const onSubmit = async (data: any) => {
    try {
      if (isLogin) {
        await login(data.email, data.password);
      } else {
        await registerUser(data.username, data.email, data.password);
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {!isLogin && (
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            {...register('username', { required: 'Username is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username.message as string}</p>}
        </div>
      )}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message as string}</p>}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message as string}</p>}
      </div>
      <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        {isLogin ? 'Sign In' : 'Register'}
      </button>
    </form>
  );
};