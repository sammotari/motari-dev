'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PostService } from '../../../lib/PostService'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { BubbleMenu } from '@tiptap/react'
import { FiBold, FiItalic, FiUnderline, FiLink, FiCode } from 'react-icons/fi'
import { FaRegTrashAlt } from 'react-icons/fa'

interface Post {
  id: string
  title: string
  slug: string
  content: string
  tags: string
  created_at: string
}

export default function EditPost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [isManualSlug, setIsManualSlug] = useState(false)
  const [message, setMessage] = useState('')

  // Initialize editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: 'Write your post content here...',
      }),
    ],
    content: '',
  })

  // Generate slug from title
  useEffect(() => {
    if (!isManualSlug && post?.title) {
      const generatedSlug = post.title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')
      setPost(prev => prev ? { ...prev, slug: generatedSlug } : null)
    }
  }, [post?.title, isManualSlug])

  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await PostService.getPost(id!)
        if (error) throw error
        setPost(data)
        editor?.commands.setContent(data.content)
      } catch (error) {
        setMessage('Failed to load post')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id, editor])

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    if (url === null) return
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const cleanedValue = value
      .toLowerCase()
      .replace(/[^a-z0-9\-]/g, '')
      .replace(/\-\-+/g, '-')
    setPost(prev => prev ? { ...prev, slug: cleanedValue } : null)
    setIsManualSlug(true)
  }

  const resetSlug = () => {
    setIsManualSlug(false)
    setPost(prev => prev ? { ...prev, slug: '' } : null)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!post) return

    setLoading(true)
    try {
      const { error } = await PostService.updatePost(id!, {
        ...post,
        content: editor?.getHTML() || ''
      })
      if (error) throw error
      setMessage('✅ Post updated successfully!')
      setTimeout(() => navigate('/user/posts'), 1500)
    } catch (error) {
      setMessage('❌ Failed to update post')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return (
    <div className="max-w-4xl mx-auto px-4 py-8">
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

  if (!post) return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-center">
      <p className="text-red-600">Post not found</p>
      <button 
        onClick={() => navigate('/user/posts')}
        className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
      >
        Back to Posts
      </button>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <form onSubmit={handleUpdate} className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">Edit Post</h2>
          <p className="text-gray-600">Update your content</p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              placeholder="Post title"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
              URL Slug
            </label>
            <input
              id="slug"
              type="text"
              value={post.slug}
              onChange={handleSlugChange}
              placeholder="post-slug"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
            <div className="flex justify-between mt-1">
              <p className="text-xs text-gray-500">
                Used in the URL (e.g., yourblog.com/posts/{post.slug || 'post-slug'})
              </p>
              {isManualSlug && (
                <button
                  type="button"
                  onClick={resetSlug}
                  className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Reset to auto-generated
                </button>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <input
              id="tags"
              type="text"
              value={post.tags}
              onChange={(e) => setPost({ ...post, tags: e.target.value })}
              placeholder="technology, web-development, javascript"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
            <p className="mt-1 text-xs text-gray-500">
              Comma-separated list of tags
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              {/* Menu bar */}
              <div className="flex items-center gap-1 p-2 border-b border-gray-200 bg-gray-50">
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                  className={`p-2 rounded hover:bg-gray-200 ${editor?.isActive('bold') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
                >
                  <FiBold />
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                  className={`p-2 rounded hover:bg-gray-200 ${editor?.isActive('italic') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
                >
                  <FiItalic />
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleUnderline().run()}
                  className={`p-2 rounded hover:bg-gray-200 ${editor?.isActive('underline') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
                >
                  <FiUnderline />
                </button>
                <button
                  type="button"
                  onClick={setLink}
                  className={`p-2 rounded hover:bg-gray-200 ${editor?.isActive('link') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
                >
                  <FiLink />
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleCode().run()}
                  className={`p-2 rounded hover:bg-gray-200 ${editor?.isActive('code') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
                >
                  <FiCode />
                </button>
                <div className="flex-1"></div>
                <button
                  type="button"
                  onClick={() => editor?.commands.clearContent()}
                  className="p-2 rounded hover:bg-gray-200 text-gray-700"
                >
                  <FaRegTrashAlt />
                </button>
              </div>

              {/* Bubble menu */}
              {editor && (
                <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
                  <div className="flex gap-1 bg-white p-1 rounded shadow-lg border border-gray-200">
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleBold().run()}
                      className={`p-1 rounded ${editor.isActive('bold') ? 'bg-gray-100 text-blue-600' : 'text-gray-700'}`}
                    >
                      <FiBold size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleItalic().run()}
                      className={`p-1 rounded ${editor.isActive('italic') ? 'bg-gray-100 text-blue-600' : 'text-gray-700'}`}
                    >
                      <FiItalic size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleUnderline().run()}
                      className={`p-1 rounded ${editor.isActive('underline') ? 'bg-gray-100 text-blue-600' : 'text-gray-700'}`}
                    >
                      <FiUnderline size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={setLink}
                      className={`p-1 rounded ${editor.isActive('link') ? 'bg-gray-100 text-blue-600' : 'text-gray-700'}`}
                    >
                      <FiLink size={18} />
                    </button>
                  </div>
                </BubbleMenu>
              )}

              {/* Editor content */}
              <EditorContent
                editor={editor}
                className="min-h-[300px] p-4 focus:outline-none prose max-w-none"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-70 flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>

          {message && (
            <p className={`text-sm ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
        </div>
      </form>
    </div>
  )
}