// src/components/CommentList.tsx
import { useEffect, useState } from 'react'
import { PostService } from '../lib/PostService'

export default function CommentList({ postId }: { postId: string }) {
  const [comments, setComments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchComments = async () => {
      const { data } = await PostService.getApprovedComments(postId)
      setComments(data || [])
      setLoading(false)
    }

    fetchComments()
  }, [postId])

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2">Comments</h3>
      {loading && <p>Loading comments...</p>}
      {!loading && comments.length === 0 && <p>No comments yet.</p>}
      {comments.map((comment) => (
        <div key={comment.id} className="mb-4 border-l-4 border-blue-500 pl-4">
          <p className="text-sm text-gray-700">{comment.body}</p>
          <p className="text-xs text-gray-500">– {comment.author || 'Anonymous'}</p>
        </div>
      ))}
    </div>
  )
}
