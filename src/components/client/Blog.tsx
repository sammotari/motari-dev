'use client'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'

interface Post {
  id: string
  title: string
  slug: string
  content: string
  tags: string
  created_at: string
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (data) setPosts(data)
    }

    fetchPosts()
  }, [])

  return (
    <section id="blog" className="w-full py-20 bg-white text-gray-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-100 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-5xl mx-auto px-4 relative">
        {/* Section header */}
        <div className="flex flex-col items-center mb-16">
          <span className="text-5xl mb-4">✨</span>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400">
              My Thoughts
            </span>
          </h2>
          <p className="text-gray-500 text-center max-w-lg">Fresh takes on tech, design, and everything in between</p>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-purple-300 group"
              onClick={() => navigate(`/posts/${post.slug}`)}
            >
              {/* Post header */}
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold group-hover:text-purple-600 transition-colors duration-300">
                  {post.title}
                </h3>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                  {new Date(post.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>

              {/* Post content preview */}
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.content}
              </p>

              {/* Tags */}
              {post.tags && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.split(',').map((tag, index) => (
                    <span 
                      key={index} 
                      className="text-xs px-2 py-1 bg-gradient-to-r from-purple-100 to-cyan-50 text-purple-800 rounded-full"
                    >
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              )}

              {/* Read more */}
              <div className="flex items-center text-sm font-medium text-purple-600 group-hover:text-purple-800 transition-colors duration-300">
                Read more
                <span className="ml-1 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Floating emoji decorations */}
        <div className="absolute -bottom-20 -left-20 text-8xl opacity-10 text-gray-100">📝</div>
        <div className="absolute -top-20 -right-20 text-8xl opacity-10 text-gray-100">✍️</div>
      </div>
    </section>
  )
}