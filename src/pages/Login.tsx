import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = '/dashboard';
    }, 1500);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Form */}
      <div className="flex flex-1 flex-col justify-start px-6 py-12 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-md mt-[14vh]">
          {/* Header */}
          <div className="mb-9">
            <h1 className="text-4xl font-bold text-foreground mb-2.5">Sign In</h1>
            <p className="text-base text-muted-foreground font-normal">
              Enter your email and password to sign in!
            </p>
          </div>

          {/* Form Container */}
          <div className="w-full max-w-[420px]">
            {/* Google Sign In */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2.5 px-4 h-[50px] mb-6 rounded-2xl bg-muted text-foreground text-sm font-medium hover:bg-muted/80 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </button>

            {/* Divider */}
            <div className="flex items-center mb-6">
              <div className="flex-1 border-t border-border"></div>
              <span className="px-3.5 text-muted-foreground text-sm">or</span>
              <div className="flex-1 border-t border-border"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="flex items-center text-sm font-medium text-foreground mb-2 ml-1">
                  Email<span className="text-primary ml-0.5">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsTyping(true)}
                  onBlur={() => setIsTyping(false)}
                  placeholder="mail@simmmple.com"
                  className="w-full h-[50px] px-4 text-sm font-medium border border-border rounded-2xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="flex items-center text-sm font-medium text-foreground mb-2 ml-1">
                  Password<span className="text-primary ml-0.5">*</span>
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setIsTyping(true)}
                    onBlur={() => setIsTyping(false)}
                    placeholder="Min. 8 characters"
                    className="w-full h-[50px] px-4 pr-12 text-sm font-medium border border-border rounded-2xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <label htmlFor="remember-me" className="ml-2.5 text-sm font-normal text-foreground">
                    Keep me logged in
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-[50px] rounded-2xl bg-primary text-white text-sm font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6">
              <p className="text-sm font-normal text-muted-foreground">
                Not registered yet?{' '}
                <Link to="/signup" className="text-primary font-medium hover:text-primary/80 transition-colors">
                  Create an Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
        <div
          className={`absolute inset-0 w-full h-full bg-cover bg-center rounded-bl-[120px] xl:rounded-bl-[200px] transition-all duration-700 ${
            isTyping ? 'blur-sm scale-105' : 'blur-0 scale-100'
          }`}
          style={{
            backgroundImage: 'url(/orion-ai-login-bg.png)',
          }}
        >
          {/* Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br rounded-bl-[120px] xl:rounded-bl-[200px] transition-all duration-700 ${
            isTyping 
              ? 'from-purple-500/40 via-blue-600/30 to-transparent' 
              : 'from-purple-500/20 to-transparent'
          }`}></div>
          
          {/* Focus indicator */}
          {isTyping && (
            <div className="absolute inset-0 flex items-center justify-center rounded-bl-[120px] xl:rounded-bl-[200px]">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20 animate-in fade-in zoom-in-50 duration-500">
                <p className="text-white text-sm font-medium">Focusing on your login...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
