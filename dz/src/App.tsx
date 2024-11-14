import React, { useState } from 'react';
import './App.css';

interface FormData {
  email: string;
  password: string;
  name: string;
}

function SignUp() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState<{ [key in keyof FormData]?: string }>({});
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validName, setValidName] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: { [key in keyof FormData]?: string } = {};

    if (formData.name.length > 0) {
      setValidName(true);
      newErrors.name = "Name is correct";
    } else {
      setValidName(false);
      newErrors.name = "Name is required";
    }

    if (formData.password.length > 0) {
      if (formData.password.length < 8) {
        setValidPassword(false);
        newErrors.password = "Password must be at least 8 characters long";
      } else {
        setValidPassword(true);
        newErrors.password = "Password is correct";
      }
    } else {
      setValidPassword(false);
      newErrors.password = "Password is required";
    }

    if (formData.email.length > 0) {
      if (formData.email.includes("@") && formData.email.includes(".")) {
        setValidEmail(true);
        newErrors.email = "Email is correct";
      } else {
        setValidEmail(false);
        newErrors.email = "Invalid email address";
      }
    } else {
      setValidEmail(false);
      newErrors.email = "Email is required";
    }

    setError(newErrors);
    return validEmail && validPassword && validName;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setMessage("Registration is successfully!");
    } else {
      setMessage("Its not correct.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
          />
          {error.name && <span>{error.name}</span>}
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
          {error.email && <span>{error.email}</span>}
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
          {error.password && <span>{error.password}</span>}
        </div>
        <button type='submit'>Register</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default SignUp;
