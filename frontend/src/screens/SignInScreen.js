import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import { FaGoogle, FaGithub, FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

export default function SignInScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post('/api/users/signin', {
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      if (rememberMe) {
        localStorage.setItem('userInfo', JSON.stringify(data));
      } else {
        sessionStorage.setItem('userInfo', JSON.stringify(data));
      }
      navigate(redirect || '/');
      toast.success('Successfully signed in!');
    } catch (err) {
      toast.error(getError(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Helmet>
          <title>Sign In</title>
        </Helmet>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-white/20">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-white">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-white/80">
              Or{' '}
              <Link
                to={`/signup?redirect=${redirect}`}
                className="font-medium text-blue-300 hover:text-blue-200 transition-colors duration-200"
              >
                create a new account
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={submitHandler}>
            <div className="rounded-md space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-white/60" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-white/20 bg-white/5 text-white placeholder-white/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-white/60" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-white/20 bg-white/5 text-white placeholder-white/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-white/20 rounded bg-white/5"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-white/80">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-blue-300 hover:text-blue-200 transition-colors duration-200"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-white/60">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-white/20 rounded-lg shadow-sm bg-white/5 text-sm font-medium text-white hover:bg-white/10 transition-all duration-200 transform hover:scale-105"
                  onClick={() => {
                    toast.info('Google Sign In - Coming Soon!');
                  }}
                >
                  <FaGoogle className="w-5 h-5 text-red-400" />
                  <span className="ml-2">Google</span>
                </button>

                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-white/20 rounded-lg shadow-sm bg-white/5 text-sm font-medium text-white hover:bg-white/10 transition-all duration-200 transform hover:scale-105"
                  onClick={() => {
                    toast.info('GitHub Sign In - Coming Soon!');
                  }}
                >
                  <FaGithub className="w-5 h-5" />
                  <span className="ml-2">GitHub</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 