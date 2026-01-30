import { useEffect, useRef, useState } from 'react';
import { 
  Code2, 
  Database, 
  Brain, 
  Link2, 
  GitBranch, 
  Container,
  Cpu,
  BarChart3,
  Layers,
  Cloud,
  Zap,
  Box
} from 'lucide-react';

interface Skill {
  name: string;
  icon: React.ReactNode;
  level: number;
  color: string;
}

const skills: Skill[] = [
  { name: 'Python', icon: <Code2 className="w-5 h-5" />, level: 95, color: '#3776ab' },
  { name: 'SQL', icon: <Database className="w-5 h-5" />, level: 90, color: '#f29111' },
  { name: 'PyTorch', icon: <Brain className="w-5 h-5" />, level: 85, color: '#ee4c2c' },
  { name: 'LangChain', icon: <Link2 className="w-5 h-5" />, level: 80, color: '#1C3C3C' },
  { name: 'Git', icon: <GitBranch className="w-5 h-5" />, level: 88, color: '#f05032' },
  { name: 'Docker', icon: <Container className="w-5 h-5" />, level: 82, color: '#2496ed' },
  { name: 'Pandas', icon: <BarChart3 className="w-5 h-5" />, level: 92, color: '#150458' },
  { name: 'NumPy', icon: <Cpu className="w-5 h-5" />, level: 90, color: '#4d77cf' },
  { name: 'Scikit-learn', icon: <Layers className="w-5 h-5" />, level: 85, color: '#f89939' },
  { name: 'AWS', icon: <Cloud className="w-5 h-5" />, level: 75, color: '#ff9900' },
  { name: 'FastAPI', icon: <Zap className="w-5 h-5" />, level: 80, color: '#009688' },
  { name: 'React', icon: <Box className="w-5 h-5" />, level: 78, color: '#61dafb' },
];

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050009] via-[#110c14] to-[#050009]" />
      
      {/* Floating Orbs */}
      <div 
        className="absolute w-[400px] h-[400px] rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(104, 4, 171, 0.5) 0%, transparent 70%)',
          top: '10%',
          left: '-5%',
        }}
      />
      <div 
        className="absolute w-[300px] h-[300px] rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(104, 4, 171, 0.5) 0%, transparent 70%)',
          bottom: '10%',
          right: '-5%',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className={`font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Tech <span className="text-gradient">Stack</span>
          </h2>
          <p 
            className={`text-[#bebebe] text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Technologies and tools I use to build intelligent systems and deploy scalable solutions.
          </p>
        </div>

        {/* Skills Cloud */}
        <div className="relative">
          {/* Central Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#6804ab]/10 blur-3xl" />
          
          {/* Skills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {skills.map((skill, index) => (
              <SkillBadge
                key={skill.name}
                skill={skill}
                index={index}
                isVisible={isVisible}
                isHovered={hoveredSkill === skill.name}
                onHover={() => setHoveredSkill(skill.name)}
                onLeave={() => setHoveredSkill(null)}
              />
            ))}
          </div>
        </div>

        {/* Skill Levels Legend */}
        <div 
          className={`mt-16 flex flex-wrap justify-center gap-8 transition-all duration-700 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { label: 'Expert', level: '90-100%' },
            { label: 'Advanced', level: '80-89%' },
            { label: 'Proficient', level: '70-79%' },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{
                  background: index === 0 ? '#6804ab' : index === 1 ? '#3f0864' : '#1a0a2e',
                }}
              />
              <span className="text-sm text-[#bebebe]">
                {item.label} <span className="text-[#6804ab]">({item.level})</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

interface SkillBadgeProps {
  skill: Skill;
  index: number;
  isVisible: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const SkillBadge = ({ skill, index, isVisible, isHovered, onHover, onLeave }: SkillBadgeProps) => {
  const floatDelay = index * 0.3;
  const floatDuration = 3 + (index % 3) * 0.5;

  return (
    <div
      className={`group relative transition-all duration-500 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
      }`}
      style={{ 
        transitionDelay: `${index * 50}ms`,
        animation: isVisible ? `float ${floatDuration}s ease-in-out infinite` : 'none',
        animationDelay: `${floatDelay}s`,
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div
        className={`relative p-4 rounded-2xl glass transition-all duration-300 cursor-pointer ${
          isHovered ? 'scale-110 border-glow' : ''
        }`}
        style={{
          borderColor: isHovered ? skill.color : 'rgba(255, 255, 255, 0.08)',
        }}
      >
        {/* Icon */}
        <div 
          className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center transition-all duration-300"
          style={{
            background: isHovered ? `${skill.color}20` : 'rgba(104, 4, 171, 0.1)',
            color: isHovered ? skill.color : '#eeebf0',
          }}
        >
          {skill.icon}
        </div>

        {/* Name */}
        <p className="text-center text-sm font-medium text-white mb-2">
          {skill.name}
        </p>

        {/* Progress Bar */}
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: isVisible ? `${skill.level}%` : '0%',
              background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
              transitionDelay: `${index * 100 + 500}ms`,
            }}
          />
        </div>

        {/* Level Percentage */}
        <p 
          className={`text-center text-xs mt-1 transition-colors duration-300 ${
            isHovered ? 'text-white' : 'text-[#bebebe]'
          }`}
        >
          {skill.level}%
        </p>

        {/* Glow Effect */}
        {isHovered && (
          <div 
            className="absolute inset-0 rounded-2xl opacity-30 blur-xl -z-10 transition-opacity duration-300"
            style={{ background: skill.color }}
          />
        )}
      </div>
    </div>
  );
};

export default Skills;