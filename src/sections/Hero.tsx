import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left - rect.width / 2) / rect.width,
          y: (e.clientY - rect.top - rect.height / 2) / rect.height,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050009] via-[#110c14] to-[#3f0864] animate-gradient" />
      
      {/* Floating Orbs */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(104, 4, 171, 0.4) 0%, transparent 70%)',
          top: '10%',
          left: '10%',
          transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />
      <div 
        className="absolute w-[400px] h-[400px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(104, 4, 171, 0.3) 0%, transparent 70%)',
          bottom: '20%',
          right: '15%',
          transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />

      {/* Particle Canvas */}
      <ParticleCanvas />

      {/* Main Content */}
      <div 
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
        style={{
          transform: `rotateX(${mousePos.y * -3}deg) rotateY(${mousePos.x * 3}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Glass Card Container */}
        <div 
          className={`glass-strong rounded-3xl px-8 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Badge */}
          <div 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6804ab]/20 border border-[#6804ab]/30 mb-8 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#6804ab]" />
            <span className="text-sm font-mono text-[#eeebf0]">IIT Madras Student</span>
          </div>

          {/* Main Title */}
          <h1 
            className={`font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="text-white glow-text">ROUSHAN</span>
          </h1>

          {/* Subtitle */}
          <h2 
            className={`font-mono text-xl sm:text-2xl lg:text-3xl text-[#eeebf0] mb-6 transition-all duration-1000 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="text-gradient">AI Engineer & Data Scientist</span>
          </h2>

          {/* Description */}
          <p 
            className={`text-base sm:text-lg text-[#bebebe] max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-1000 delay-900 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Student at IIT Madras. Building deployable AI solutions from RAG to MLOps.
            Passionate about creating intelligent systems that make a difference.
          </p>

          {/* CTA Button */}
          <button
            onClick={scrollToProjects}
            className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#6804ab] to-[#3f0864] text-white font-medium text-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:glow-purple ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '1100ms' }}
          >
            <span className="relative z-10">Explore My Work</span>
            <ChevronDown className="w-5 h-5 relative z-10 group-hover:translate-y-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#3f0864] to-[#6804ab] opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        {/* Floating Stats */}
        <div 
          className={`flex flex-wrap justify-center gap-6 mt-12 transition-all duration-1000 delay-1300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { value: '4+', label: 'Projects' },
            { value: '10+', label: 'Technologies' },
            { value: 'AI/ML', label: 'Focus' },
          ].map((stat, index) => (
            <div
              key={index}
              className="glass px-6 py-4 rounded-xl text-center animate-float"
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              <div className="font-display text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-[#bebebe] font-mono">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050009] to-transparent" />
    </section>
  );
};

// Particle Canvas Component
const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 30000));
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(104, 4, 171, ${particle.opacity})`;
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(104, 4, 171, ${0.1 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(drawParticles);
    };

    resize();
    createParticles();
    drawParticles();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default Hero;