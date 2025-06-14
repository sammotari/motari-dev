import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PostService } from '../lib/PostService'

interface Post {
  id: string
  title: string
  slug: string
  content: string
  tags: string
  likes: number
  created_at: string
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPosts = async () => {
    setLoading(true)
    setError(null)
    const { data, error } = await PostService.getPosts()

    if (error) {
      setError('❌ Failed to fetch posts')
    } else {
      setPosts(data || [])
    }

    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    const { error } = await PostService.deletePost(id)
    if (error) {
      alert('Failed to delete post')
    } else {
      fetchPosts()
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="space-y-4 bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">All Blog Posts</h2>
        <Link 
          to="/user/posts/new" 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Create New Post
        </Link>
      </div>

      {loading && <p className="text-gray-500">Loading posts...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && posts.length === 0 && (
        <p className="text-gray-600">No posts found. Start by creating one.</p>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow group">
            {/* Clickable post content area */}
            <Link 
              to={`/posts/${post.slug}`} 
              className="block mb-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(post.created_at).toLocaleDateString()} • {post.likes} likes
                  </p>
                  {post.tags && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {post.tags.split(',').map((tag, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          #{tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
            
            {/* Action buttons */}
            <div className="flex justify-end gap-2 mt-2">
              <Link
                to={`/user/posts/edit/${post.id}`}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors text-sm"
              >
                Edit
              </Link>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleDelete(post.id)
                }}
                className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}