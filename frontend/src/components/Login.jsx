import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [shouldRemember, setShouldRemember] = useState(false);
    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/products',
    });

    const submitForm = async (event) => {
        event.preventDefault();
        await setIsLoading(true);

        await login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus,
        });

        await setIsLoading(false);
    };

    console.log(status);

    const handleLoginAsAdmin = async (event) => {
        event.preventDefault();

        await login({
            email: 'admin@example.com',
            password: 'password',
            remember: shouldRemember,
            setErrors,
            setStatus,
        });
    };

    const handleLoginAsUser = async (event) => {
        event.preventDefault();

        await login({
            email: 'user@example.com',
            password: 'password',
            remember: shouldRemember,
            setErrors,
            setStatus,
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen max-w-lg mx-auto">
            <div
                className="flex flex-col items-center justify-center w-full space-y-4 card bg-white dark:bg-gray-800 shadow-xl py-12">
                <h1 className="font-bold text-3xl text-gray-200">Login to your account</h1>
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
                        autoComplete="old-password"
                    />
                    {errors?.password && (
                        <div className="label">
                            <span className="label-text-alt text-error">{errors.password}</span>
                        </div>
                    )}
                </label>
                <div className="flex w-full max-w-md">
                    <label className="label cursor-pointer">
                        <span className="label-text">Remember me</span>
                        <input
                            checked={shouldRemember}
                            onChange={(event) => setShouldRemember(event.target.checked)}
                            type="checkbox" defaultChecked
                            className="ml-2 checkbox checkbox-primary"
                        />
                    </label>
                </div>
                <div>
                    <span>{"Don't have an account? "}</span>
                    <Link className="link link-hover text-error font-bold tracking-wide" to="/register">
                        Register
                    </Link>
                </div>
                <button
                    onClick={submitForm}
                    disabled={isLoading}
                    className="btn btn-outline btn-info w-full max-w-md uppercase"
                >
                    {isLoading ? <span className="loading loading-spinner"></span> : 'sign in'}
                </button>
                <div className="flex w-full justify-between items-center max-w-md pt-2">
                    <button onClick={handleLoginAsUser} className="btn btn-default btn-sm">
                        Login as User
                    </button>
                    <button onClick={handleLoginAsAdmin} className="btn btn-default btn-sm">
                        Login as Admin
                    </button>
                </div>
            </div>
        </div>
    );
}
