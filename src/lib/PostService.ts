import { supabase } from './supabaseClient'

export interface PostInput {
  title: string
  slug: string
  content: string
  tags?: string
  likes?: number
}

export interface CommentInput {
  post_id: string
  author: string
  body: string
}

export const PostService = {
  // POSTS
  async getPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async createPost(post: PostInput) {
    const { data, error } = await supabase.from('posts').insert([post])
    return { data, error }
  },

  async deletePost(id: string) {
    const { data, error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)
    return { data, error }
  },

  async updatePost(id: string, post: Partial<PostInput>) {
    const { data, error } = await supabase
      .from('posts')
      .update(post)
      .eq('id', id)
    return { data, error }
  },

  async getPost(id: string) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single()
    return { data, error }
  },

  async getPostBySlug(slug: string) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .single()
    return { data, error }
  },

  // COMMENTS
  async getApprovedComments(post_id: string) {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', post_id)
      .eq('approved', true)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async getUnapprovedComments() {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('approved', false)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async submitComment(comment: CommentInput) {
    const { data, error } = await supabase
      .from('comments')
      .insert([comment])
    return { data, error }
  },

  async approveComment(id: string) {
    const { data, error } = await supabase
      .from('comments')
      .update({ approved: true })
      .eq('id', id)
    return { data, error }
  },

  async deleteComment(id: string) {
    const { data, error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id)
    return { data, error }
  }
}
