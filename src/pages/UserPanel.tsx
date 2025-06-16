import { useState } from 'react'
import { useUser } from '../context/UserContext'
import { Navigate, Link } from 'react-router-dom'
import { 
  FiFolder, 
  FiFileText, 
  FiMessageSquare, 
  FiSettings, 
  FiLogOut, 
  FiPlus,
  FiMenu,
  FiX
} from 'react-icons/fi'
import { HiOutlineChartBar } from 'react-icons/hi'

export default function UserPanel() {
  const { user, loading, logout } = useUser()
  const [drawerOpen, setDrawerOpen] = useState(false)

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
  
  if (!user) return <Navigate to="/login" replace />

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      {drawerOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Sidebar - now toggleable */}
      <div className={`fixed md:relative z-30 md:z-0 transform ${drawerOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col w-64 h-full px-4 py-8 bg-gradient-to-b from-blue-900 to-blue-800 text-white`}>
        <button 
          className="md:hidden absolute top-4 right-4 p-1"
          onClick={() => setDrawerOpen(false)}
        >
          <FiX size={24} />
        </button>
        
        <div className="flex items-center justify-center mb-10">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-white">
            Motari<span className="text-blue-300">.</span>
          </h1>
        </div>
        
        <nav className="flex-1 space-y-2">
          <NavLink to="/user" icon={<HiOutlineChartBar size={18} />}>Overview</NavLink>
          <NavLink to="/user/projects" icon={<FiFolder size={18} />}>Projects</NavLink>
          <NavLink to="/user/posts" icon={<FiFileText size={18} />}>Blog Posts</NavLink>
          <NavLink to="/user/comments" icon={<FiMessageSquare size={18} />}>Comments</NavLink>
          <NavLink to="/user/settings" icon={<FiSettings size={18} />}>Settings</NavLink>
        </nav>
        
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 mt-auto text-blue-100 hover:text-white hover:bg-blue-700 rounded-lg transition-colors"
        >
          <FiLogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 pt-20 md:pt-8">
        {/* Mobile header with menu button */}
        <div className="md:hidden fixed top-0 left-0 right-0 bg-blue-800 text-white p-4 flex justify-between items-center z-10">
          <button 
            className="p-2"
            onClick={() => setDrawerOpen(true)}
          >
            <FiMenu size={24} />
          </button>
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button className="p-2" onClick={logout}>
            <FiLogOut size={18} />
          </button>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Welcome back,{user?.email?.split('@')[0] ?? 'Guest'}</h1>
          <p className="text-gray-500 mt-1">Here's what's happening with your content</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <DashboardCard 
            title="Projects" 
            description="Manage your portfolio projects"
            count={12}
            actionText="New Project"
            actionLink="/user/projects/new"
            icon={<FiFolder className="text-blue-500" size={20} />}
            linkText="View all"
            link="/user/projects"
            color="bg-blue-100"
          />
          
          <DashboardCard 
            title="Blog Posts" 
            description="Manage your published articles"
            count={5}
            actionText="New Post"
            actionLink="/user/posts/new"
            icon={<FiFileText className="text-purple-500" size={20} />}
            linkText="View all"
            link="/user/posts"
            color="bg-purple-100"
          />
          
          <DashboardCard 
            title="Comments" 
            description="Moderate user feedback"
            count={23}
            actionText="Moderate"
            actionLink="/user/comments"
            icon={<FiMessageSquare className="text-green-500" size={20} />}
            linkText="View all"
            link="/user/comments"
            color="bg-green-100"
          />
        </div>

        {/* Recent Activity Section - Simplified for mobile */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
          </div>
          <div className="p-4 sm:p-6">
            <div className="text-center py-6 text-gray-400 text-sm">
              <p>No recent activity</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// NavLink component remains the same
function NavLink({ to, icon, children }: { to: string, icon: React.ReactNode, children: string }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
    >
      <span className="text-blue-200">{icon}</span>
      <span>{children}</span>
    </Link>
  )
}

// Updated DashboardCard for better mobile display
function DashboardCard({ 
  title, 
  description, 
  count, 
  actionText, 
  actionLink, 
  icon, 
  linkText, 
  link,
  color 
}: {
  title: string
  description: string
  count: number
  actionText: string
  actionLink: string
  icon: React.ReactNode
  linkText: string
  link: string
  color: string
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-start">
          <div className={`${color} p-2 sm:p-3 rounded-lg`}>
            {icon}
          </div>
          <span className="text-xl sm:text-2xl font-bold text-gray-800">{count}</span>
        </div>
        <h3 className="text-md sm:text-lg font-semibold mt-3 sm:mt-4 text-gray-800">{title}</h3>
        <p className="text-gray-500 text-xs sm:text-sm mt-1">{description}</p>
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 sm:mt-6 gap-2 sm:gap-0">
          <Link 
            to={link} 
            className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 hover:underline order-last sm:order-first"
          >
            {linkText}
          </Link>
          <Link
            to={actionLink}
            className="flex items-center justify-center gap-1 px-3 py-1.5 sm:py-2 bg-blue-600 text-white text-xs sm:text-sm rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiPlus size={14} />
            <span>{actionText}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
