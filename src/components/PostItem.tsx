import { Link } from 'react-router-dom'

interface PostItemProps {
  post: {
    id: string
    title: string
    slug: string
    content: string
    tags: string
    likes: number
    created_at: string
  }
  onDelete: (id: string) => void
}

export default function PostItem({ post, onDelete }: PostItemProps) {
  return (
    <div className="border p-4 rounded shadow-sm hover:shadow-md transition">
      <Link to={`/posts/${post.slug}`}>
        <h3 className="text-lg font-semibold text-blue-600 hover:underline">{post.title}</h3>
      </Link>

      {/* 🔥 Hardcoded author */}
      <p className="text-sm text-gray-500 mb-1">by <span className="font-medium">Samwel Motari</span></p>

      <p className="text-gray-600 text-sm">{post.tags}</p>

      <button
        onClick={() => onDelete(post.id)}
        className="text-red-500 text-sm mt-2"
      >
        Delete
      </button>
    </div>
  )
}
