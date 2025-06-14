// pages/user/projects/EditProject.tsx
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ProjectService } from '../../../../lib/ProjectService'
import { useUser } from '../../../../context/UserContext'

export default function EditProject() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { user } = useUser()
  const [form, setForm] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return
      const { data } = await ProjectService.getProject(id)
      setForm(data)
      setLoading(false)
    }
    fetchProject()
  }, [id])

  if (!user) return <p className="p-4">🔒 You must be logged in to edit projects.</p>
  if (loading || !form) return <p className="p-4">Loading...</p>

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await ProjectService.updateProject(id!, form)
    navigate('/user/projects')
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.entries(form).map(([key, val]) => (
            <input
                key={key}
                type="text"
                name={key}
                placeholder={key.replace('_', ' ').toUpperCase()}
                value={val?.toString() || ''}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
            />
            ))}

        <button className="px-4 py-2 bg-blue-600 text-white rounded">Update</button>
      </form>
    </div>
  )
}
