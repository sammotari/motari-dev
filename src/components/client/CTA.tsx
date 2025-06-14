export default function CTA() {
  return (
    <section className="w-full py-20 bg-white text-gray-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-cyan-100 rounded-full blur-3xl opacity-40"></div>

      <div className="max-w-4xl mx-auto px-4 relative text-center">
        {/* Emoji decoration */}
        <div className="text-5xl mb-6">✨</div>
        
        {/* Gradient heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400">
            Wanna collab?
          </span>
        </h2>
        
        {/* Subheading */}
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          I'm always down to brainstorm dope ideas and build cool stuff together. Hit me up!
        </p>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="mailto:motari@example.com" 
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-cyan-400 text-white font-medium rounded-full hover:shadow-lg hover:shadow-purple-200 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>💌</span> Let's Talk
          </a>
          <a 
            href="https://calendly.com/motari" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>📅</span> Book a Call
          </a>
        </div>
        
        {/* Social proof or stats */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
            <span>10+ Projects Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            <span>5+ Happy Clients</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
            <span>24h Response Time</span>
          </div>
        </div>
      </div>
      
      {/* Floating emoji decorations */}
      <div className="absolute -bottom-10 -left-10 text-6xl opacity-10">🚀</div>
      <div className="absolute -top-10 -right-10 text-6xl opacity-10">👋</div>
    </section>
  )
}