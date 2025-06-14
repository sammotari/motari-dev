// src/components/CommentForm.tsx
import { useState } from 'react'
import { PostService } from '../lib/PostService'

export default function CommentForm({ postId }: { postId: string }) {
  const [author, setAuthor] = useState('')
  const [body, setBody] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = await PostService.submitComment({ post_id: postId, author, body })

    if (error) {
      setMessage('❌ Failed to submit comment.')
    } else {
      setMessage('✅ Comment submitted for approval.')
      setAuthor('')
      setBody('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mt-6">
      <h3 className="text-lg font-semibold">Leave a Comment</h3>
      <input
        type="text"
        placeholder="Your Name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        placeholder="Your Comment"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="w-full border p-2 rounded"
        rows={4}
        required
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      {message && <p className="text-sm text-gray-600">{message}</p>}
    </form>
  )
}
