import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Link, useNavigate } from 'react-router-dom'

type AuthMode = 'sign-in' | 'sign-up'

export default function AuthForm({ mode }: { mode: AuthMode }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (mode === 'sign-up') {
      if (password !== confirmPassword) {
        setError("Passwords don't match")
        return
      }

      const { error } = await supabase.auth.signUp({ email, password })

      if (error) {
        setError(error.message)
      } else {
        alert('Signed up! Check your email to confirm.')
        navigate('/login')
      }
    }

    if (mode === 'sign-in') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) {
        setError(error.message)
      } else {
        navigate('/user')
      }
    }
  }

  const oppositeText = mode === 'sign-in'
    ? "Don't have an account? Sign up"
    : 'Already have an account? Login'

  const oppositePath = mode === 'sign-in' ? '/signup' : '/login'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto mt-12">
      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
        className="border px-4 py-2 rounded"
      />

      <input
        type={showPassword ? 'text' : 'password'}
        placeholder="Password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
        className="border px-4 py-2 rounded"
      />

      {mode === 'sign-up' && (
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Confirm Password"
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border px-4 py-2 rounded"
        />
      )}

      <label className="text-sm flex items-center gap-2 text-gray-600">
        <input
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        />
        Show password
      </label>

      {error && <p className="text-red-500">{error}</p>}

      <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        {mode === 'sign-in' ? 'Login' : 'Sign Up'}
      </button>

      <p className="text-sm text-center text-gray-600">
        {oppositeText}{' '}
        <Link to={oppositePath} className="text-blue-600 hover:underline">
          here
        </Link>
      </p>
    </form>
  )
}
