import { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Code2, Mail, Send, MapPin, ExternalLink } from 'lucide-react';

interface SocialLink {
  name: string;
  icon: React.ReactNode;
  url: string;
  color: string;
  description: string;
}

const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    icon: <Github className="w-6 h-6" />,
    url: 'https://github.com/roushan',
    color: '#333',
    description: 'Check out my code repositories',
  },
  {
    name: 'LinkedIn',
    icon: <Linkedin className="w-6 h-6" />,
    url: 'https://linkedin.com/in/roushan',
    color: '#0077b5',
    description: 'Connect professionally',
  },
  {
    name: 'LeetCode',
    icon: <Code2 className="w-6 h-6" />,
    url: 'https://leetcode.com/roushan',
    color: '#ffa116',
    description: 'View my problem-solving journey',
  },
];

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    // Reset submitted state after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050009] via-[#110c14] to-[#050009]" />
      
      {/* Decorative Elements */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(104, 4, 171, 0.5) 0%, transparent 70%)',
          bottom: '0%',
          left: '50%',
          transform: 'translateX(-50%)',
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
            Let&apos;s <span className="text-gradient">Connect</span>
          </h2>
          <p 
            className={`text-[#bebebe] text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Have a project in mind or want to discuss AI? Reach out and let&apos;s build something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Social Links & Info */}
          <div 
            className={`transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            {/* Location Card */}
            <div className="glass rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#6804ab]/20 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#6804ab]" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Location</h3>
                  <p className="text-[#bebebe] text-sm">IIT Madras, Chennai, India</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <h3 className="text-white font-display text-xl font-semibold mb-6">
              Find me on
            </h3>
            <div className="space-y-4">
              {socialLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-xl glass hover:border-glow transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{ 
                      background: `${link.color}20`,
                      color: link.color,
                    }}
                  >
                    {link.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium group-hover:text-gradient transition-all duration-300">
                      {link.name}
                    </h4>
                    <p className="text-[#bebebe] text-sm">{link.description}</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-[#bebebe] group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>

            {/* Email Card */}
            <div className="glass rounded-2xl p-6 mt-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#6804ab]/20 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#6804ab]" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Email</h3>
                  <p className="text-[#bebebe] text-sm">roushan@example.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div 
            className={`transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="glass-strong rounded-2xl p-8">
              <h3 className="text-white font-display text-xl font-semibold mb-6">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="peer w-full bg-transparent border-b-2 border-white/20 text-white px-0 py-3 focus:outline-none focus:border-[#6804ab] transition-colors placeholder-transparent"
                    placeholder="Name"
                  />
                  <label className="absolute left-0 -top-2 text-sm text-[#bebebe] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-[#bebebe] peer-focus:-top-2 peer-focus:text-sm peer-focus:text-[#6804ab]">
                    Your Name
                  </label>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#6804ab] transition-all duration-300 peer-focus:w-full" />
                </div>

                {/* Email Input */}
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="peer w-full bg-transparent border-b-2 border-white/20 text-white px-0 py-3 focus:outline-none focus:border-[#6804ab] transition-colors placeholder-transparent"
                    placeholder="Email"
                  />
                  <label className="absolute left-0 -top-2 text-sm text-[#bebebe] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-[#bebebe] peer-focus:-top-2 peer-focus:text-sm peer-focus:text-[#6804ab]">
                    Email Address
                  </label>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#6804ab] transition-all duration-300 peer-focus:w-full" />
                </div>

                {/* Message Input */}
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="peer w-full bg-transparent border-b-2 border-white/20 text-white px-0 py-3 focus:outline-none focus:border-[#6804ab] transition-colors placeholder-transparent resize-none"
                    placeholder="Message"
                  />
                  <label className="absolute left-0 -top-2 text-sm text-[#bebebe] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-[#bebebe] peer-focus:-top-2 peer-focus:text-sm peer-focus:text-[#6804ab]">
                    Your Message
                  </label>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#6804ab] transition-all duration-300 peer-focus:w-full" />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 ${
                    submitted
                      ? 'bg-green-600 text-white'
                      : 'bg-gradient-to-r from-[#6804ab] to-[#3f0864] text-white hover:glow-purple'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : submitted ? (
                    <>
                      <span>Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#bebebe] text-sm">
              © 2024 Roushan. Built with passion and code.
            </p>
            <p className="text-[#bebebe] text-sm font-mono">
              AI Engineer & Data Scientist
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Contact;