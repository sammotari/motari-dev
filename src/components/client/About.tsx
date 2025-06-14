export default function About() {
  return (
    <section id="about" className="w-full py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Animated decorative element */}
          <div className="hidden md:block relative w-64 h-64">
            <div className="absolute inset-0 border-2 border-purple-500 rounded-lg transform rotate-6 animate-float"></div>
            <div className="absolute inset-0 border-2 border-cyan-400 rounded-lg transform -rotate-6 animate-float-reverse"></div>
            <div className="absolute inset-4 bg-gradient-to-br from-purple-100 to-cyan-50 rounded-lg shadow-md flex items-center justify-center">
              <div className="text-6xl">💻</div>
            </div>
          </div>
          
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-500">
              About Me
            </h2>
            
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                I'm a <span className="font-semibold text-purple-600">Computer Science graduate</span> with expertise in both frontend and backend development. My journey in tech combines <span className="font-semibold text-cyan-500">technical skills</span> with a passion for <span className="font-semibold text-purple-600">creative problem-solving</span>.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                I specialize in building <span className="font-semibold text-cyan-500">modern web applications</span> with a focus on performance, accessibility, and beautiful user experiences. My work spans from <span className="font-semibold text-purple-600">AI-powered solutions</span> to open source contributions that help the developer community.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                  <span className="text-gray-700">Frontend Development</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                  <span className="text-gray-700">Backend Systems</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                  <span className="text-gray-700">UI/UX Design</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                  <span className="text-gray-700">AI & Machine Learning</span>
                </div>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-md hover:opacity-90 transition-all duration-300 shadow-lg">
                  Download Resume
                </button>
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-all duration-300">
                  View Certifications
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
