import AuthForm from '../components/AuthForm'

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <AuthForm mode="sign-in" />
    </div>
  )
}

export default Login
