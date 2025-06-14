import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PostService } from '../../../lib/PostService'
import { useUser } from '../../../context/UserContext'
import { Heart, MessageCircle, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface Comment {
  id: string
  author: string
  body: string
  created_at: string
  avatar?: string
}

export default function PostDetail() {
  const { slug } = useParams()
  const { user } = useUser()
  const navigate = useNavigate()
  const [post, setPost] = useState<any>(null)
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return

      try {
        const { data: postData, error: postError } = await PostService.getPostBySlug(slug)

        if (postError || !postData) {
          setError('Post not found')
          setLoading(false)
          return
        }

        setPost(postData)
        setLikes(postData.likes || 0)

        const { data: commentsData } = await PostService.getApprovedComments(postData.id)
        setComments(commentsData || [])
      } catch (err) {
        setError('Failed to load post')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [slug])

  const handleLike = async () => {
    const newLikeStatus = !isLiked
    const likeCount = newLikeStatus ? likes + 1 : likes - 1
    
    try {
      const { error } = await PostService.updatePost(post.id, { likes: likeCount })
      if (!error) {
        setLikes(likeCount)
        setIsLiked(newLikeStatus)
      }
    } catch (err) {
      console.error('Error updating likes:', err)
    }
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return

    try {
      const { error } = await PostService.submitComment({
        post_id: post.id,
        author: user?.email || 'Anonymous',
        body: comment,
      })

      if (error) {
        setMessage('Failed to submit comment')
      } else {
        setMessage('Comment submitted for approval')
        setComment('')
        // Optimistically add to comments if you want immediate UI update
      }
    } catch (err) {
      setMessage('Error submitting comment')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await PostService.deleteComment(id)
      if (!error) {
        setComments(prev => prev.filter(c => c.id !== id))
      }
    } catch (err) {
      alert('Failed to delete comment')
    }
  }

  if (loading) return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <div className="animate-pulse space-y-4">
        <div className="h-10 w-3/4 bg-gray-200 rounded"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  )

  if (error) return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      <div className="p-8 bg-red-50 rounded-lg">
        <h2 className="text-xl font-medium text-red-600">{error}</h2>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to posts
      </button>

      <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <header className="p-6 sm:p-8 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-medium">
              {post.author?.charAt(0) || 'S'}
            </div>
            <div>
              <p className="font-medium text-gray-900">Samwel Motari</p>
              <p className="text-sm text-gray-500">
                {new Date(post.created_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>
          {post.tags && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.split(',').map((tag: string, index: number) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 transition-colors"
                >
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <div 
          className="prose prose-lg max-w-none p-6 sm:p-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Actions */}
        <div className="p-6 sm:p-8 border-t border-gray-100 flex items-center justify-between">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${isLiked ? 'text-red-500 bg-red-50' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            <span>{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
          </button>

          <div className="flex items-center gap-2 text-gray-600">
            <MessageCircle className="w-5 h-5" />
            <span>{comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}</span>
          </div>
        </div>

        {/* Comments */}
        <div className="p-6 sm:p-8 border-t border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Comments</h3>

          {comments.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No comments yet. Be the first to share your thoughts!</p>
          ) : (
            <ul className="space-y-6">
              {comments.map((c) => (
                <li key={c.id} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                      {c.author?.charAt(0) || 'A'}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <p className="font-medium text-gray-900">{c.author}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(c.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="mt-1 text-gray-700">{c.body}</p>
                    </div>
                    {user && (
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="text-xs text-red-600 hover:text-red-800 mt-1 ml-4 transition-colors"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Comment form */}
          <form onSubmit={handleCommentSubmit} className="mt-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                  {user?.email?.charAt(0) || 'Y'}
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                />
                <div className="flex justify-between items-center">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Post Comment
                  </button>
                  {message && (
                    <p className={`text-sm ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
                      {message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </article>
    </div>
  )
}