import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { register } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/products',
    });

    const submitForm = async (event) => {
        event.preventDefault();
        await setIsLoading(true);

        await register({
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
            setErrors,
        });

        await setIsLoading(false);
    };

    console.log(errors);

    return (
        <div className="flex items-center justify-center min-h-screen max-w-lg mx-auto">
            <form
                onSubmit={submitForm}
                className="flex flex-col items-center justify-center w-full space-y-4 card bg-white dark:bg-gray-800 shadow-xl py-12"
            >
                <h1 className="font-bold text-3xl text-gray-200">Register new account</h1>
                <label className="form-control w-full max-w-md">
                    <div className="label">
                        <span className="label-text">Name</span>
                    </div>
                    <input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        type="text"
                        className="input input-bordered input-primary w-full max-w-md"
                    />
                    {errors?.name && (
                        <div className="label">
                            <span className="label-text-alt text-error">{errors.name}</span>
                        </div>
                    )}
                </label>
                <label className="form-control w-full max-w-md">
                    <div className="label">
                        <span className="label-text">E-mail</span>
                    </div>
                    <input
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        type="email"
                        className="input input-bordered input-primary w-full max-w-md"
                    />
                    {errors?.email && (
                        <div className="label">
                            <span className="label-text-alt text-error">{errors.email}</span>
                        </div>
                    )}
                </label>
                <label className="form-control w-full max-w-md">
                    <div className="label">
                        <span className="label-text">Password</span>
                    </div>
                    <input
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        type="password"
                        className="input input-bordered input-primary w-full max-w-md"
                        autoComplete="new-password"
                    />
                    {errors?.password && (
                        <div className="label">
                            <span className="label-text-alt text-error">{errors.password}</span>
                        </div>
                    )}
                </label>
                <label className="form-control w-full max-w-md">
                    <div className="label">
                        <span className="label-text">Confirm password</span>
                    </div>
                    <input
                        value={passwordConfirmation}
                        onChange={(event) => setPasswordConfirmation(event.target.value)}
                        type="password"
                        className="input input-bordered input-primary w-full max-w-md"
                        required
                        autoComplete="new-password"
                    />
                </label>
                <div>
                    Already have an account?{' '}
                    <Link className="link link-hover text-success font-bold tracking-wide" to="/login">
                        Login
                    </Link>
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-outline btn-info w-full max-w-md uppercase"
                >
                    {isLoading ? <span className="loading loading-spinner"></span> : 'sign up'}
                </button>
            </form>
        </div>
    );
}
