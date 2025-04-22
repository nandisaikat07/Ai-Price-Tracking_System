import Axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Store } from '../Store.js';
import { getError } from '../utils';

export default function ResetPasswordScreen() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo || !token) {
      navigate('/');
    }
  }, [navigate, userInfo, token]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      await Axios.post('/api/users/reset-password', {
        password,
        token,
      });
      navigate('/signin');
      toast.success('Password updated successfully');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <h1 className="my-3">Reset Password</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-3" controlId="password">
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3" controlId="confirmPassword">
          <label className="block text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <input
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            type="password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <button
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="submit"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
}
