'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

interface Project {
  id: string
  title: string
  description: string
  stack: string
  image_url: string
  github_url: string
  live_url: string
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (data) setProjects(data)
      if (error) console.error('Error fetching projects:', error)
    }

    fetchProjects()
  }, [])

  return (
    <section id="projects" className="w-full py-20 bg-black text-white overflow-hidden relative">
      {/* Glowing background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Section header with emoji */}
        <div className="flex flex-col items-center mb-16">
          <span className="text-5xl mb-4">✨</span>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">
              My Dope Projects
            </span>
          </h2>
          <p className="text-gray-400 text-center max-w-lg">Stuff I've built that actually works</p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-purple-500 transition-all duration-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] group"
            >
              {/* Project image with hover effect */}
              {project.image_url && (
                <div className="relative overflow-hidden h-48">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-sm text-gray-300">{project.stack}</span>
                  </div>
                </div>
              )}

              {/* Project content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                
                {/* Action buttons */}
                <div className="flex gap-3">
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-4 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-lg text-center hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <span>🌐</span> Live
                  </a>
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-4 border border-gray-700 text-white rounded-lg text-center hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>💻</span> Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating emoji decorations */}
        <div className="absolute -bottom-20 -left-20 text-8xl opacity-10">🚀</div>
        <div className="absolute -top-20 -right-20 text-8xl opacity-10">👨‍💻</div>
      </div>
    </section>
  )
}
