import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Auth() {
    const [mode,setMode] = useState('signup');
    const [error,setError] = useState();
    const [successMessage, setSuccessMessage] = useState();
    const { signup, login, resetPassword } = useAuth();
    const {register,reset, handleSubmit,formState:{errors},} = useForm();
    const navigate = useNavigate();

    function onSubmit(data){
        setError();
        setSuccessMessage();

        if (mode === "reset") {
            if (data.password !== data.confirmPassword) {
                setError("Passwords do not match");
                return;
            }

            const result = resetPassword(data.email, data.password);
            if (!result.success) {
                setError(result.error);
                return;
            }

            reset();
            setMode("login");
            setSuccessMessage("Password reset. You can now log in with your new password.");
            return;
        }

        const result = mode === "signup"
            ? signup(data.name, data.email, data.password)
            : login(data.email, data.password);

        if (!result.success) {
            setError(result.error);
            return;
        }

        navigate('/todo');
    }

    function changeMode(nextMode) {
        setMode(nextMode);
        setError();
        setSuccessMessage();
        reset();
    }


    return (
        <div className="grid min-h-[calc(100vh-76px)] place-items-center px-4 py-8">
            <div className="w-full max-w-md">
                <div className="rounded-[1.5rem] border border-teal-500/15 bg-white/90 px-8 py-10 shadow-[0_18px_46px_rgba(15,118,110,0.08)] backdrop-blur-sm">
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 shadow-md shadow-teal-500/25">
                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h1 className="text-[clamp(1.75rem,5vw,2.25rem)] font-extrabold tracking-[-0.04em] text-teal-800">
                            {mode === "signup" ? "Create Account" : mode === "reset" ? "Reset Password" : "Welcome Back"}
                        </h1>
                        {mode === "reset" && (
                            <p className="mt-2 text-sm text-slate-400">Don't forget this time</p>
                        )}
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        {mode === "signup" && (
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="name" className="text-sm font-semibold text-teal-800">Username</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-800 transition-all placeholder:text-slate-300 focus:border-teal-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-400/20"
                                    placeholder="Enter username"
                                    {...register("name", { required: "Username is required" })}
                                />
                                {errors.name && <span className="text-sm font-medium text-red-500">{errors.name.message}</span>}
                            </div>
                        )}

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="email" className="text-sm font-semibold text-teal-800">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-800 transition-all placeholder:text-slate-300 focus:border-teal-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-400/20"
                                placeholder="Enter email"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && <span className="text-sm font-medium text-red-500">{errors.email.message}</span>}
                        </div>

                        {mode !== "reset" && (
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="password" className="text-sm font-semibold text-teal-800">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-800 transition-all placeholder:text-slate-300 focus:border-teal-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-400/20"
                                    placeholder="Enter password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 4, message: "Password must be at least 4 chars" },
                                        maxLength: { value: 12, message: "Password must be at most 12 chars" }
                                    })}
                                />
                                {errors.password && <span className="text-sm font-medium text-red-500">{errors.password.message}</span>}
                            </div>
                        )}

                        {mode === "reset" && (
                            <>
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="password" className="text-sm font-semibold text-teal-800">New Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-800 transition-all placeholder:text-slate-300 focus:border-teal-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-400/20"
                                        placeholder="Enter new password"
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: { value: 4, message: "Password must be at least 4 chars" },
                                            maxLength: { value: 12, message: "Password must be at most 12 chars" }
                                        })}
                                    />
                                    {errors.password && <span className="text-sm font-medium text-red-500">{errors.password.message}</span>}
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="confirmPassword" className="text-sm font-semibold text-teal-800">Confirm New Password</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-800 transition-all placeholder:text-slate-300 focus:border-teal-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-400/20"
                                        placeholder="Confirm new password"
                                        {...register("confirmPassword", { required: "Please confirm your password" })}
                                    />
                                    {errors.confirmPassword && <span className="text-sm font-medium text-red-500">{errors.confirmPassword.message}</span>}
                                </div>
                            </>
                        )}

                        {error && (
                            <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                                <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                {error}
                            </div>
                        )}
                        {successMessage && (
                            <div className="flex items-center gap-2 rounded-lg bg-teal-50 px-4 py-3 text-sm font-medium text-teal-700">
                                <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {successMessage}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="mt-2 w-full rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 px-4 py-3 font-semibold text-white shadow-lg shadow-teal-500/30 transition-all hover:from-teal-600 hover:to-teal-700 hover:shadow-xl hover:shadow-teal-500/40"
                        >
                            {mode === "signup" ? "Sign Up" : mode === "reset" ? "Reset Password" : "Login"}
                        </button>
                    </form>

                    <div className="mt-6 space-y-2 text-center text-sm text-slate-500">
                        {mode === "login" && (
                            <p>
                                Forgot your password?{" "}
                                <button type="button" className="font-semibold text-teal-600 transition-colors hover:text-teal-700" onClick={() => changeMode("reset")}>
                                    Reset password
                                </button>
                            </p>
                        )}
                        {mode === "signup" ? (
                            <p>
                                Already have an account?{" "}
                                <button type="button" className="font-semibold text-teal-600 transition-colors hover:text-teal-700" onClick={() => changeMode("login")}>Login</button>
                            </p>
                        ) : mode === "login" ? (
                            <p>
                                Don't have an account?{" "}
                                <button type="button" className="font-semibold text-teal-600 transition-colors hover:text-teal-700" onClick={() => changeMode("signup")}>Sign up</button>
                            </p>
                        ) : (
                            <p>
                                Remembered your password?{" "}
                                <button type="button" className="font-semibold text-teal-600 transition-colors hover:text-teal-700" onClick={() => changeMode("login")}>Back to login</button>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}