import { useEffect, useState } from 'react';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const fields = [
    "Software Engineering",
    "Web Development",
    "Mobile Development",
    "UI/UX Design",
    "Machine Learning",
    "Cybersecurity",
    "Cloud Computing",
    "Game Development",
    "3D Modeling",
    "Motion Graphics",
    "Digital Illustration",
    "Brand Identity Design"
  ];
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentField = fields[currentFieldIndex];
      
      if (isDeleting) {
        setTypedText(currentField.substring(0, typedText.length - 1));
        setTypingSpeed(75);
      } else {
        setTypedText(currentField.substring(0, typedText.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && typedText === currentField) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setCurrentFieldIndex((prev) => (prev + 1) % fields.length);
        setTypingSpeed(500);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, currentFieldIndex, isDeleting, fields, typingSpeed]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 w-full relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              backgroundColor: 
                Math.random() > 0.66 ? '#00f0ff' : 
                Math.random() > 0.33 ? '#ff00f0' : '#00ff7b',
              opacity: Math.random() * 0.5 + 0.1,
              animation: `pulse ${Math.random() * 3 + 2}s infinite alternate`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Text content */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Hi, I'm Motari <span className="wave">👋</span>
            </h1>
            
            <div className="text-xl text-gray-300 max-w-xl mb-6 h-12">
              <span>I specialize in </span>
              <span className="text-cyan-400 font-mono border-r-2 border-cyan-400">
                {typedText}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-8 max-w-lg">
              {fields.map((field, index) => (
                <div 
                  key={field}
                  className={`text-xs md:text-sm py-1 px-2 rounded ${
                    currentFieldIndex === index 
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/50' 
                      : 'bg-gray-800/50 text-gray-400'
                  } transition-all duration-300`}
                >
                  {field}
                </div>
              ))}
            </div>
            
            <div className="flex gap-4 justify-center md:justify-start">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium rounded-md hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-cyan-500/30">
                View Projects
              </button>
              <button className="px-6 py-3 border border-cyan-400 text-cyan-400 font-medium rounded-md hover:bg-cyan-400/10 transition-all duration-300">
                Contact Me
              </button>
            </div>
          </div>
          
          {/* Profile image with animated border */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200 animate-tilt"></div>
            <div className="relative bg-gray-800 rounded-full p-1">
              <img 
                src="/me.png" 
                alt="Motari" 
                className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-gray-800"
              />
              <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-cyan-400 transition-all duration-500 animate-spin-slow"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce flex flex-col items-center">
          <span className="text-sm text-gray-400 mb-1">Scroll down</span>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-gray-400 rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>
      </div>
    </section>
  )
}