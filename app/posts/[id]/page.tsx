// Previous implementation:
// import { PostDetail } from "@/components/posts/post-detail"
// import { Navigation } from "@/components/layout/navigation"
// import { Footer } from "@/components/layout/footer"
//
// export default function PostDetailPage({ params }: { params: { id: string } }) {
//   return (
//     <div className="min-h-screen bg-slate-50">
//       <Navigation />
//       <main className="pt-20">
//         <PostDetail id={params.id} />
//       </main>
//       <Footer />
//     </div>
//   )
// }

import Link from "next/link"

export default function PostComingSoon() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="glassmorphic p-10 rounded-2xl shadow-xl flex flex-col items-center max-w-md w-full border border-slate-200" style={{backdropFilter: 'blur(16px)', background: 'rgba(255,255,255,0.7)'}}>
        <div className="text-5xl font-extrabold text-blue-600 mb-4">Coming Soon</div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Post Details</h1>
        <p className="text-slate-600 mb-6 text-center">This post will be available soon. Stay tuned for updates!</p>
        <Link href="/" className="gradient-primary text-white px-6 py-2 rounded-lg font-semibold shadow hover:scale-105 transition-transform">
          Go Home
        </Link>
      </div>
    </div>
  )
}
