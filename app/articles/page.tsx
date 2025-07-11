import Link from "next/link"

export default function ArticlesComingSoon() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="glassmorphic p-10 rounded-2xl shadow-xl flex flex-col items-center max-w-md w-full border border-slate-200" style={{backdropFilter: 'blur(16px)', background: 'rgba(255,255,255,0.7)'}}>
        <div className="text-5xl font-extrabold text-blue-600 mb-4">Coming Soon</div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Technical Articles</h1>
        <p className="text-slate-600 mb-6 text-center">The Technical Articles feature is coming soon. Stay tuned for updates!</p>
        <Link href="/" className="gradient-primary text-white px-6 py-2 rounded-lg font-semibold shadow hover:scale-105 transition-transform">
          Go Home
        </Link>
      </div>
    </div>
  )
}
