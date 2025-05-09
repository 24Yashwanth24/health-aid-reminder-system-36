import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const UserLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // For demo purposes - in a real app, this would be a secure authentication flow
    setTimeout(() => {
      // Simple validation for demo
      if (email === 'user@demo.com' && password === 'password') {
        // For the demo account, set a default name if not present
        if (!localStorage.getItem('userName')) {
          localStorage.setItem('userName', 'Demo User');
        }
        
        toast({
          title: "Login successful",
          description: "Welcome to your medicine portal",
        });
        
        // Store auth state in local storage for demo purposes
        localStorage.setItem('authType', 'user');
        localStorage.setItem('authEmail', email);
        
        // Direct navigation to user dashboard
        navigate('/user/dashboard', { replace: true });
      } else {
        toast({
          title: "Login failed",
          description: "Invalid credentials. Try user@demo.com / password",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email-address" className="sr-only">Email address</label>
          <Input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-t-md"
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-b-md"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-health-600 focus:ring-health-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <a href="#" className="font-medium text-health-600 hover:text-health-500">
            Forgot your password?
          </a>
        </div>
      </div>

      <div>
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </div>
      
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/user/register" className="font-medium text-health-600 hover:text-health-500">
            Register here
          </Link>
        </p>
      </div>
      
      <div className="text-center text-sm">
        <p>Demo credentials: user@demo.com / password</p>
      </div>
    </form>
  );
};

export default UserLoginForm;
