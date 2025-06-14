import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProjectService } from '../../../lib/ProjectService'
import { useUser } from '../../../context/UserContext'
import { FiExternalLink, FiGithub, FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi'

export default function ProjectsIndex() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)
      const { data } = await ProjectService.getProjects()
      if (data) setProjects(data)
      setLoading(false)
    }
    fetchProjects()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return
    await ProjectService.deleteProject(id)
    setProjects(prev => prev.filter(project => project.id !== id))
  }

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-10 w-64 bg-gray-200 rounded"></div>
          <div className="h-12 w-48 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-6 border rounded-lg space-y-4">
                <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                <div className="h-8 w-full bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Projects</h1>
          <p className="text-gray-600 mt-1">Collection of my recent work</p>
        </div>
        
        {user && (
          <button
            onClick={() => navigate('/user/projects/new')}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transition-opacity shadow-md"
          >
            <FiPlus className="w-5 h-5" />
            <span>Add New Project</span>
          </button>
        )}
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <h3 className="text-lg font-medium text-gray-700">No projects yet</h3>
          <p className="text-gray-500 mt-1">Get started by adding your first project</p>
          {user && (
            <button
              onClick={() => navigate('/user/projects/new')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Project
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="group relative p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:border-blue-100"
            >
              <h2 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                {project.title}
              </h2>
              <p className="text-sm text-gray-600 mb-4">{project.stack}</p>
              
              <div className="flex gap-4 mb-6">
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <FiExternalLink className="w-4 h-4" />
                    <span className="text-sm">Live Demo</span>
                  </a>
                )}
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    <FiGithub className="w-4 h-4" />
                    <span className="text-sm">View Code</span>
                  </a>
                )}
              </div>

              {user && (
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => navigate(`/user/projects/edit/${project.id}`)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <FiEdit2 className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}