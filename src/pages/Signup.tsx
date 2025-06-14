import AuthForm from '../components/AuthForm'

function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <AuthForm mode="sign-up" />
    </div>
  )
}

export default Signup
