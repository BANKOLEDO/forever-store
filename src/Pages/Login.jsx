import { useState, useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [mode, setMode] = useState('Sign Up'); // 'Sign Up' or 'Login'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setUser } = useContext(ShopContext);
  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const userData = {
      name: mode === 'Sign Up' ? name : 'User', // Use entered name for sign up, default for login
      email,
    };
    setUser(userData);

    console.log(`${mode} successful:`, userData);
    navigate('/'); // Redirect to homepage or dashboard
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{mode}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      <div className="w-full px-3 py-2 flex flex-col gap-4">
        {mode === 'Sign Up' && (
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="w-full flex justify-between text-sm mt-[-8px]">
          <p className="cursor-pointer">Forgot your password?</p>
          {mode === 'Login' ? (
            <p onClick={() => setMode('Sign Up')} className="cursor-pointer">
              Create Account
            </p>
          ) : (
            <p onClick={() => setMode('Login')} className="cursor-pointer">
              Login Here
            </p>
          )}
        </div>

        <button className="w-1/2 m-auto bg-black text-white px-8 py-2 mt-4">
          {mode === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
