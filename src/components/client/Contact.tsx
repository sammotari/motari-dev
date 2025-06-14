export default function Contact() {
  return (
    <section id="contact" className="w-full py-20 bg-white text-gray-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-100 rounded-full blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-cyan-100 rounded-full blur-3xl opacity-40 animate-pulse delay-1000"></div>

      <div className="max-w-2xl mx-auto px-4 relative text-center">
        {/* Emoji decoration */}
        <div className="text-5xl mb-6">📱</div>
        
        {/* Gradient heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400">
            Let's Get In Touch!
          </span>
        </h2>
        
        {/* Subheading */}
        <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
          Got a dope project or want to collab? I'm open to freelance, full-time, or just chatting about tech!
        </p>
        
        {/* Contact options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <a 
            href="mailto:motari@example.com" 
            className="p-4 border border-gray-200 rounded-xl hover:border-purple-300 hover:shadow-md transition-all duration-300 flex flex-col items-center"
          >
            <span className="text-2xl mb-2">✉️</span>
            <span className="font-medium">Email Me</span>
            <span className="text-sm text-gray-500 mt-1">motari@example.com</span>
          </a>
          <a 
            href="https://calendly.com/motari" 
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 border border-gray-200 rounded-xl hover:border-cyan-300 hover:shadow-md transition-all duration-300 flex flex-col items-center"
          >
            <span className="text-2xl mb-2">📅</span>
            <span className="font-medium">Book a Call</span>
            <span className="text-sm text-gray-500 mt-1">Let's chat live</span>
          </a>
        </div>

        
      </div>
      
      {/* Floating emoji decorations */}
      <div className="absolute -bottom-10 -left-10 text-6xl opacity-10">💬</div>
      <div className="absolute -top-10 -right-10 text-6xl opacity-10">📲</div>
    </section>
  )
}