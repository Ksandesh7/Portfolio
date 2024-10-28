import React, { useEffect, useState } from "react";
import { Menu, X, Mail, ExternalLink, Code2 } from "lucide-react";
import Image1 from "../assets/1.png";

// Add these imports for email functionality
import emailjs from "@emailjs/browser";

// Updated social icons using SVG
const GitHubIcon = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);

const projectsData = [
    {
        id: 1,
        title: "Movie Recommendation System",
        description:
            "A movie recommendation system using content-based filtering algorithm.",
        thumbnail: Image1, // Replace with your image path
        tags: ["Streamlit", "Python", "Notebook"],
        link: "https://moviez-recommend.streamlit.app/",
        githubLink: "https://github.com/Ksandesh7/movie_recommendation",
        color: "from-purple-500 to-pink-500",
    },
    // {
    //     id: 2,
    //     title: "Social Media App",
    //     description: "Real-time social media application with chat",
    //     thumbnail: "/api/placeholder/400/250", // Replace with your image path
    //     tags: ["React", "Firebase", "Tailwind"],
    //     link: "https://project2.com",
    //     githubLink: "https://github.com/yourusername/project2",
    //     color: "from-cyan-500 to-blue-500",
    // },
    // {
    //     id: 3,
    //     title: "AI Image Generator",
    //     description: "AI-powered image generation tool",
    //     thumbnail: "/api/placeholder/400/250", // Replace with your image path
    //     tags: ["Next.js", "OpenAI", "MongoDB"],
    //     link: "https://project3.com",
    //     githubLink: "https://github.com/yourusername/project3",
    //     color: "from-green-500 to-teal-500",
    // },
];

// Social links data - easy to update
const socialLinks = [
    {
        name: "GitHub",
        icon: <GitHubIcon />,
        url: "https://github.com/Ksandesh7",
        color: "hover:text-gray-100",
    },
    {
        name: "LinkedIn",
        icon: <LinkedInIcon />,
        url: "https://www.linkedin.com/in/sandesh-kharchan-b424ab206/",
        color: "hover:text-blue-400",
    },
    {
        name: "LeetCode",
        icon: <Code2 className="w-6 h-6" />,
        url: "https://leetcode.com/u/Ksandesh7/",
        color: "hover:text-yellow-400",
    },
    {
        name: "CodeStudio",
        icon: <Code2 className="w-6 h-6" />,
        url: "https://www.naukri.com/code360/profile/e1524996-bfad-4f8f-b33b-f3f4c49d327d",
        color: "hover:text-green-400",
    },
    {
        name: "Email",
        icon: <Mail className="w-6 h-6" />,
        url: "mailto:kharchansandesh@gmail.com",
        color: "hover:text-red-400",
    },
];

const Portfolio = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [formStatus, setFormStatus] = useState({
        submitting: false,
        submitted: false,
        error: null,
    });

    useEffect(() => {
        console.log(
            process.env.REACT_APP_SERVICE_ID_EMAILJS,
            process.env.REACT_APP_TEMPLATE_ID_EMAILJS,
            process.env.REACT_APP_PUBLIC_KEY_EMAILJS
        );
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus({ submitting: true, submitted: false, error: null });

        const form = e.target;

        try {
            await emailjs.sendForm(
                process.env.REACT_APP_SERVICE_ID_EMAILJS, // Replace with your EmailJS service ID
                process.env.REACT_APP_TEMPLATE_ID_EMAILJS, // Replace with your EmailJS template ID
                form,
                process.env.REACT_APP_PUBLIC_KEY_EMAILJS // Replace with your EmailJS public key
            );

            setFormStatus({
                submitting: false,
                submitted: true,
                error: null,
            });
            form.reset();

            // Reset success message after 5 seconds
            setTimeout(() => {
                setFormStatus((prev) => ({ ...prev, submitted: false }));
            }, 5000);
        } catch (error) {
            setFormStatus({
                submitting: false,
                submitted: false,
                error: "Failed to send message. Please try again.",
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            {/* Navigation */}
            <nav className="bg-gray-800 border-b border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                                Portfolio
                            </span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            <a
                                href="#about"
                                className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md"
                            >
                                About
                            </a>
                            <a
                                href="#projects"
                                className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md"
                            >
                                Projects
                            </a>
                            <a
                                href="#contact"
                                className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md"
                            >
                                Contact
                            </a>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-400 hover:text-white"
                            >
                                {isMenuOpen ? (
                                    <X size={24} />
                                ) : (
                                    <Menu size={24} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden bg-gray-800">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <a
                                href="#about"
                                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md"
                            >
                                About
                            </a>
                            <a
                                href="#projects"
                                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md"
                            >
                                Projects
                            </a>
                            <a
                                href="#contact"
                                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md"
                            >
                                Contact
                            </a>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gray-900">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(147,51,234,0.1),transparent_50%),radial-gradient(circle_at_70%_50%,rgba(219,39,119,0.1),transparent_50%)]"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
                            Hi, I'm Sandesh
                        </h1>
                        <p className="mt-3 max-w-md mx-auto text-base text-gray-400 sm:text-lg md:mt-5 md:text-xl">
                            Programmer and Full Stack Developer passionate about
                            creating beautiful and functional web applications
                        </p>

                        {/* Enhanced Social Links Section */}
                        <div className="mt-8">
                            <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-800 
                    transition-all duration-300 hover:-translate-y-1 ${social.color}`}
                                    >
                                        {social.icon}
                                        <span className="text-sm">
                                            {social.name}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Projects Section */}
            <div id="projects" className="py-16 bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                        Projects
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projectsData.map((project) => (
                            <div
                                key={project.id}
                                className="bg-gray-800 rounded-lg overflow-hidden transition-transform hover:-translate-y-2 duration-300"
                            >
                                {/* Project Thumbnail */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={project.thumbnail}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`}
                                    ></div>
                                </div>

                                {/* Project Content */}
                                <div className="p-6">
                                    <div
                                        className={`h-2 w-16 mb-4 rounded bg-gradient-to-r ${project.color}`}
                                    ></div>
                                    <h3 className="text-xl font-semibold text-white">
                                        {project.title}
                                    </h3>
                                    <p className="mt-2 text-gray-400">
                                        {project.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {project.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Project Links */}
                                    <div className="mt-4 flex space-x-4">
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-purple-400 hover:text-purple-300"
                                        >
                                            Live Demo{" "}
                                            <ExternalLink className="ml-1 w-4 h-4" />
                                        </a>
                                        <a
                                            href={project.githubLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-gray-400 hover:text-gray-300"
                                        >
                                            <GitHubIcon />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <div id="contact" className="py-16 bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                        Get in Touch
                    </h2>
                    <div className="max-w-lg mx-auto">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-300"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="user_name"
                                    id="name"
                                    required
                                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-purple-500 focus:ring-purple-500"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-300"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="user_email"
                                    id="email"
                                    required
                                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-purple-500 focus:ring-purple-500"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-gray-300"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    required
                                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-purple-500 focus:ring-purple-500"
                                />
                            </div>

                            {/* Form Status Messages */}
                            {formStatus.submitted && (
                                <div className="p-4 bg-green-800 text-green-100 rounded-md">
                                    Message sent successfully!
                                </div>
                            )}

                            {formStatus.error && (
                                <div className="p-4 bg-red-800 text-red-100 rounded-md">
                                    {formStatus.error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={formStatus.submitting}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {formStatus.submitting
                                    ? "Sending..."
                                    : "Send Message"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
