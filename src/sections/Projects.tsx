import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Car, Leaf, BookOpen, Server } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  icon: React.ReactNode;
  githubUrl: string;
  demoUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Used Car Price Predictor',
    description: 'A machine learning application that predicts used car prices based on various features like mileage, age, brand, and condition. Built with regression algorithms and deployed via Streamlit.',
    tags: ['Regression', 'Streamlit', 'Scikit-learn', 'Pandas'],
    image: '/project1.jpg',
    icon: <Car className="w-6 h-6" />,
    githubUrl: '#',
    demoUrl: '#',
  },
  {
    id: 2,
    title: 'Plant Disease Detector',
    description: 'Computer vision system using Convolutional Neural Networks to detect and classify plant diseases from leaf images. Helps farmers identify crop issues early.',
    tags: ['Computer Vision', 'CNNs', 'PyTorch', 'OpenCV'],
    image: '/project2.jpg',
    icon: <Leaf className="w-6 h-6" />,
    githubUrl: '#',
    demoUrl: '#',
  },
  {
    id: 3,
    title: 'Textbook RAG Chatbot',
    description: 'Retrieval-Augmented Generation chatbot that answers questions based on textbook content. Uses LangChain for document processing and OpenAI for response generation.',
    tags: ['LangChain', 'Generative AI', 'RAG', 'OpenAI'],
    image: '/project3.jpg',
    icon: <BookOpen className="w-6 h-6" />,
    githubUrl: '#',
    demoUrl: '#',
  },
  {
    id: 4,
    title: 'MLOps Pipeline',
    description: 'End-to-end machine learning operations pipeline with automated training, testing, and deployment. Containerized with Docker and deployed on cloud infrastructure.',
    tags: ['Docker', 'Cloud Deployment', 'CI/CD', 'Kubernetes'],
    image: '/project4.jpg',
    icon: <Server className="w-6 h-6" />,
    githubUrl: '#',
    demoUrl: '#',
  },
];

const Projects = () => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
          if (entry.isIntersecting && index !== -1) {
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050009] via-[#110c14] to-[#050009]" />
      <div 
        className="absolute w-[500px] h-[500px] rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(104, 4, 171, 0.5) 0%, transparent 70%)',
          top: '20%',
          right: '-10%',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-[#bebebe] text-lg max-w-2xl mx-auto">
            A collection of my work in AI, machine learning, and data science.
            Each project represents a unique challenge and solution.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isVisible={visibleCards.has(index)}
              isHovered={hoveredCard === index}
              onHover={() => setHoveredCard(index)}
              onLeave={() => setHoveredCard(null)}
              cardRef={(el) => (cardRefs.current[index] = el)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
  isVisible: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  cardRef: (el: HTMLDivElement | null) => void;
}

const ProjectCard = ({ project, index, isVisible, isHovered, onHover, onLeave, cardRef }: ProjectCardProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left - rect.width / 2) / rect.width,
      y: (e.clientY - rect.top - rect.height / 2) / rect.height,
    });
  };

  return (
    <div
      ref={cardRef}
      className={`group relative transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onMouseMove={handleMouseMove}
    >
      <div
        className="relative h-full rounded-2xl overflow-hidden glass-card transition-all duration-300 hover:border-glow"
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${mousePos.y * -8}deg) rotateY(${mousePos.x * 8}deg) translateZ(20px)`
            : 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)',
          transition: 'transform 0.15s ease-out',
        }}
      >
        {/* Image Container */}
        <div className="relative h-56 sm:h-64 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#110c14] via-transparent to-transparent" />
          
          {/* Icon Badge */}
          <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-[#6804ab]/80 backdrop-blur-sm flex items-center justify-center text-white">
            {project.icon}
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-[#6804ab]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-gradient transition-all duration-300">
            {project.title}
          </h3>
          
          <p className="text-[#bebebe] text-sm leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-3 py-1 text-xs font-mono rounded-full bg-[#6804ab]/20 text-[#eeebf0] border border-[#6804ab]/30"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <a
              href={project.githubUrl}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#110c14] border border-white/10 text-white text-sm font-medium hover:bg-[#6804ab]/20 hover:border-[#6804ab]/50 transition-all duration-300"
            >
              <Github className="w-4 h-4" />
              <span>Code</span>
            </a>
            <a
              href={project.demoUrl}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#6804ab] to-[#3f0864] text-white text-sm font-medium hover:glow-purple transition-all duration-300"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Demo</span>
            </a>
          </div>
        </div>

        {/* Glare Effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: isHovered
              ? `radial-gradient(circle at ${50 + mousePos.x * 50}% ${50 + mousePos.y * 50}%, rgba(255,255,255,0.1) 0%, transparent 50%)`
              : 'none',
          }}
        />
      </div>
    </div>
  );
};

export default Projects;