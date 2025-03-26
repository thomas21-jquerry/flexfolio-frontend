export default function VerifyEmail() {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">Check your email</h1>
          <p className="text-gray-600 mb-6">
          We&apos;ve sent you a verification link. Please check your email to verify your account.
          </p>
          <p className="text-sm text-gray-500">
          Didn&apos;t receive an email? Check your spam folder or{' '}
            <a href="/auth/register" className="text-blue-600 hover:text-blue-800">
              try again
            </a>
          </p>
        </div>
      </div>
    )
  } 