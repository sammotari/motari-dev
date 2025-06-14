export default function Skills() {
  const techSkills = [
    { name: 'JavaScript', emoji: '🔥', level: 95 },
    { name: 'React', emoji: '⚡', level: 90 },
    { name: 'Next.js', emoji: '🚀', level: 85 },
    { name: 'Node.js', emoji: '🟢', level: 88 },
    { name: 'Python', emoji: '🐍', level: 80 },
    { name: 'Tailwind', emoji: '🎨', level: 92 },
  ];

  const designSkills = [
    { name: 'Figma', emoji: '✏️', level: 85 },
    { name: 'Photoshop', emoji: '🖌️', level: 78 },
    { name: 'Blender', emoji: '🧊', level: 70 },
    { name: 'After Effects', emoji: '🎬', level: 75 },
    { name: 'UI/UX', emoji: '📱', level: 82 },
    { name: '3D Modeling', emoji: '🟦', level: 68 },
  ];

  return (
    <section id="skills" className="w-full py-16 bg-black text-white overflow-hidden">
      {/* Glowing background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-purple-500/20 blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-40 h-40 rounded-full bg-cyan-500/20 blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative">
        {/* Section header with emoji */}
        <div className="flex flex-col items-center mb-16">
          <span className="text-5xl mb-4">💎</span>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">
              My Dope Skills
            </span>
          </h2>
          <p className="text-gray-400 text-center max-w-lg">Tech stack + creative tools I slay with</p>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tech skills card */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-purple-500 transition-all duration-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-2xl">👨‍💻</div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
                Tech Stack
              </h3>
            </div>
            <div className="space-y-4">
              {techSkills.map((skill, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{skill.emoji}</span>
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <span className="text-xs text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full transition-all duration-700 ease-out" 
                      style={{ width: `${skill.level}%` }}
                      data-aos="progress"
                      data-aos-duration="1000"
                      data-aos-delay={i * 100}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Design skills card */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-cyan-400 transition-all duration-500 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-2xl">🎨</div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
                Creative Tools
              </h3>
            </div>
            <div className="space-y-4">
              {designSkills.map((skill, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{skill.emoji}</span>
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <span className="text-xs text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-700 ease-out" 
                      style={{ width: `${skill.level}%` }}
                      data-aos="progress"
                      data-aos-duration="1000"
                      data-aos-delay={i * 100}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating emoji decorations */}
        <div className="absolute -bottom-20 -left-20 text-8xl opacity-10">✨</div>
        <div className="absolute -top-20 -right-20 text-8xl opacity-10">🤘</div>
      </div>
    </section>
  )
}