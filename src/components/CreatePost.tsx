'use client'

import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PostService } from '../lib/PostService'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { BubbleMenu } from '@tiptap/react'
import { FiBold, FiItalic, FiUnderline, FiLink, FiCode } from 'react-icons/fi'
import { FaRegTrashAlt } from 'react-icons/fa'

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [tags, setTags] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isManualSlug, setIsManualSlug] = useState(false)
  const navigate = useNavigate()

  // Generate slug from title automatically
  useEffect(() => {
    if (!isManualSlug && title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/\s+/g, '-')         // Replace spaces with -
        .replace(/[^\w\-]+/g, '')     // Remove all non-word chars
        .replace(/\-\-+/g, '-')       // Replace multiple - with single -
        .replace(/^-+/, '')           // Trim - from start
        .replace(/-+$/, '');          // Trim - from end
      setSlug(generatedSlug)
    }
  }, [title, isManualSlug])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow lowercase letters, numbers and hyphens
    const cleanedValue = value
      .toLowerCase()
      .replace(/[^a-z0-9\-]/g, '')
      .replace(/\-\-+/g, '-')
    setSlug(cleanedValue)
    if (value !== '') {
      setIsManualSlug(true)
    }
  }

  const resetSlug = () => {
    setIsManualSlug(false)
    // Trigger slug regeneration
    setTitle(title => title)
  }

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

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    if (url === null) {
      return
    }

    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await PostService.createPost({
      title,
      slug,
      content: editor?.getHTML() || '',
      tags,
      likes: 0,
    })

    setLoading(false)

    if (error) {
      console.error('Supabase insert error:', error)
      setMessage(`❌ Failed to create post: ${error.message}`)
    } else {
      setMessage('✅ Post created!')
      setTitle('')
      setSlug('')
      setTags('')
      setIsManualSlug(false)
      editor?.commands.clearContent()
      navigate('/user/posts')
    }
  }

  if (!editor) {
    return null
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">Create New Post</h2>
          <p className="text-gray-600">Share your knowledge with the world</p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Your amazing post title"
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
              value={slug}
              onChange={handleSlugChange}
              placeholder="my-awesome-post"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
            <div className="flex justify-between mt-1">
              <p className="text-xs text-gray-500">
                This will be used in the URL (e.g., yourblog.com/posts/my-awesome-post)
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
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="technology, web-development, javascript"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
            <p className="mt-1 text-xs text-gray-500">
              Comma-separated list of tags for your post
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
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
                >
                  <FiBold />
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
                >
                  <FiItalic />
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('underline') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
                >
                  <FiUnderline />
                </button>
                <button
                  type="button"
                  onClick={setLink}
                  className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('link') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
                >
                  <FiLink />
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleCode().run()}
                  className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('code') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
                >
                  <FiCode />
                </button>
                <div className="flex-1"></div>
                <button
                  type="button"
                  onClick={() => editor.commands.clearContent()}
                  className="p-2 rounded hover:bg-gray-200 text-gray-700"
                >
                  <FaRegTrashAlt />
                </button>
              </div>

              {/* Bubble menu for selected text */}
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
                Publishing...
              </>
            ) : (
              'Publish Post'
            )}
          </button>

          {message && (
            <p className={`text-sm ${message.includes('❌') ? 'text-red-600' : 'text-green-600'}`}>
              {message}
            </p>
          )}
        </div>
      </form>
    </div>
  )
}