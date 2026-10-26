
export default function Home() {
    return (
        <div className="grid min-h-[calc(100vh-76px)] place-items-center px-4 py-8">
            <div className="w-full max-w-4xl">
                {/* Hero card */}
                <div className="rounded-[2rem] border border-teal-500/20 bg-gradient-to-br from-white via-teal-50 to-sky-100 px-8 py-[clamp(3rem,10vw,6rem)] text-center shadow-[0_18px_46px_rgba(15,118,110,0.08)]">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 shadow-lg shadow-teal-500/30">
                        <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <h1 className="mx-auto max-w-[14ch] text-balance text-[clamp(2.25rem,7vw,4rem)] font-extrabold leading-[1.08] tracking-[-0.04em]">
                        <span className="text-slate-800">Welcome to </span>
                        <span className="bg-gradient-to-r from-teal-400 via-teal-500 to-sky-500 bg-clip-text text-transparent">Tik!t</span>
                    </h1>
                    <p className="mx-auto mt-4 max-w-[52ch] text-balance text-[clamp(1rem,2.5vw,1.25rem)] leading-relaxed text-slate-500">
                        Organize your day, track your progress, and get things done. Simple, fast, and built for you.
                    </p>
                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <a href="/auth" className="w-full rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 px-8 py-3 font-semibold text-white shadow-lg shadow-teal-500/30 transition-all hover:from-teal-600 hover:to-teal-700 hover:shadow-xl hover:shadow-teal-500/40 sm:w-auto">
                            Get Started
                        </a>
                        <a href="/todo" className="w-full rounded-xl border border-teal-200 bg-white px-8 py-3 font-semibold text-teal-700 transition-all hover:bg-teal-50 sm:w-auto">
                            View Tasks
                        </a>
                    </div>
                </div>

                {/* Feature cards */}
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-teal-100 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <h3 className="text-sm font-bold text-teal-800">Quick Add</h3>
                        <p className="mt-1 text-sm text-slate-500">Create tasks in seconds with instant save.</p>
                    </div>
                    <div className="rounded-2xl border border-sky-100 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-sm font-bold text-sky-800">Stay on Track</h3>
                        <p className="mt-1 text-sm text-slate-500">Toggle complete, edit, or delete anytime.</p>
                    </div>
                    <div className="rounded-2xl border border-amber-100 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h3 className="text-sm font-bold text-amber-800">Personal Space</h3>
                        <p className="mt-1 text-sm text-slate-500">Your tasks are private to your account.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
