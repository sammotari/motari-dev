import { useEffect, useState } from 'react'
import { PostService } from '../../../lib/PostService'

interface Comment {
  id: string
  author: string
  body: string
  created_at: string
  post_id: string
}

export default function ModerateComments() {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchComments = async () => {
    setLoading(true)
    const { data, error } = await PostService.getUnapprovedComments()

    if (error) {
      setError('❌ Failed to load comments.')
      console.error(error)
    } else {
      setComments(data || [])
    }

    setLoading(false)
  }

  const handleApprove = async (id: string) => {
    const { error } = await PostService.approveComment(id)
    if (!error) {
      setComments((prev) => prev.filter((c) => c.id !== id))
    } else {
      console.error('Approval failed:', error)
    }
  }

  const handleDelete = async (id: string) => {
    const { error } = await PostService.deleteComment(id)
    if (!error) {
      setComments((prev) => prev.filter((c) => c.id !== id))
    } else {
      console.error('Delete failed:', error)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [])

  return (
    <div className="p-6 bg-white rounded shadow max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Pending Comments</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : comments.length === 0 ? (
        <p className="text-gray-600">✅ No comments awaiting approval.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment.id} className="bg-gray-50 p-4 rounded shadow-sm border">
              <p className="text-sm text-gray-800 mb-1">{comment.body}</p>
              <p className="text-xs text-gray-500 mb-2">
                By <span className="font-medium">{comment.author || 'Anonymous'}</span> •{' '}
                {new Date(comment.created_at).toLocaleString()}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleApprove(comment.id)}
                  className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                >
                  ✅ Approve
                </button>
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                >
                  🗑️ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
