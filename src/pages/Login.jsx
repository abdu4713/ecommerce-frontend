import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const onSubmitHandler = (event) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const users = JSON.parse(localStorage.getItem('abdusfashions_users') || '[]')
      const normalizedEmail = email.trim().toLowerCase()

      if (currentState === 'Sign Up') {
        if (name.trim().length < 2) {
          toast.error('Please enter your full name.')
          return
        }
        if (password.length < 6) {
          toast.error('Password must be at least 6 characters.')
          return
        }
        if (users.some((user) => user.email === normalizedEmail)) {
          toast.error('An account with this email already exists. Please log in.')
          setCurrentState('Login')
          return
        }

        users.push({ name: name.trim(), email: normalizedEmail, password })
        localStorage.setItem('abdusfashions_users', JSON.stringify(users))
        localStorage.setItem('abdusfashions_user', JSON.stringify({ name: name.trim(), email: normalizedEmail }))
        toast.success('Account created successfully!')
        navigate('/')
      } else {
        const user = users.find((item) => item.email === normalizedEmail && item.password === password)
        if (!user) {
          toast.error('Incorrect email or password.')
          return
        }
        localStorage.setItem('abdusfashions_user', JSON.stringify({ name: user.name, email: user.email }))
        toast.success(`Welcome back, ${user.name}!`)
        navigate('/')
      }
    } catch {
      toast.error('Unable to save your account in this browser. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleForgotPassword = () => {
    const normalizedEmail = email.trim().toLowerCase()
    if (!normalizedEmail) {
      toast.info('Enter your email address first.')
      return
    }
    const users = JSON.parse(localStorage.getItem('abdusfashions_users') || '[]')
    toast.info(users.some((user) => user.email === normalizedEmail)
      ? 'This is a frontend demo. Password reset email requires a backend service.'
      : 'No demo account was found for this email.')
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 mb-16 gap-4 text-gray-800" noValidate>
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <h1 className="parata-regular text-3xl">{currentState}</h1>
        <span className="h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === 'Sign Up' && (
        <input value={name} onChange={(event) => setName(event.target.value)} type="text" autoComplete="name" className="w-full px-3 py-3 border border-gray-300 rounded-sm outline-none focus:border-black" placeholder="Full name" required minLength={2} />
      )}
      <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" className="w-full px-3 py-3 border border-gray-300 rounded-sm outline-none focus:border-black" placeholder="Email address" required />
      <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete={currentState === 'Login' ? 'current-password' : 'new-password'} className="w-full px-3 py-3 border border-gray-300 rounded-sm outline-none focus:border-black" placeholder="Password (minimum 6 characters)" required minLength={6} />
      <div className="w-full flex justify-between items-center gap-3 text-sm mt-[-4px]">
        <button type="button" onClick={handleForgotPassword} className="text-left hover:underline">Forgot password?</button>
        <button type="button" onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')} className="hover:underline">
          {currentState === 'Login' ? 'Create account' : 'Login here'}
        </button>
      </div>
      <button type="submit" disabled={isSubmitting} className="bg-black text-white font-medium px-8 py-3 mt-3 w-full rounded-sm hover:bg-gray-800 disabled:opacity-60 transition-colors">
        {isSubmitting ? 'Please wait…' : currentState === 'Login' ? 'Login' : 'Create account'}
      </button>
      <p className="text-xs text-gray-500 text-center leading-5">Demo mode: accounts are saved only in this browser. Real authentication needs a secure backend.</p>
      <Link to="/collection" className="text-sm underline underline-offset-4">Continue shopping</Link>
    </form>
  )
}

export default Login
