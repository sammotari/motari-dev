import { supabase } from './supabaseClient'

export interface ProjectInput {
  title: string
  description: string
  stack: string
  image_url: string
  github_url?: string
  live_url?: string
}

export const ProjectService = {
  async getProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async createProject(project: ProjectInput) {
    const user = supabase.auth.getUser()
    const { data: userData } = await user
    if (!userData?.user?.id) throw new Error('Not authenticated')

    const { data, error } = await supabase.from('projects').insert([
      { ...project, user_id: userData.user.id }
    ])
    return { data, error }
  },

  async updateProject(id: string, project: Partial<ProjectInput>) {
    const { data, error } = await supabase.from('projects')
      .update(project)
      .eq('id', id)
    return { data, error }
  },

  async deleteProject(id: string) {
    const { data, error } = await supabase.from('projects')
      .delete()
      .eq('id', id)
    return { data, error }
  },

  async getProject(id: string) {
    const { data, error } = await supabase.from('projects')
      .select('*')
      .eq('id', id)
      .single()
    return { data, error }
  }
}
