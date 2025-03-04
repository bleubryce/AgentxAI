
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight, Clock, User, Tag, Search } from "lucide-react";

const BlogPage = () => {
  useEffect(() => {
    document.title = "Blog | AgentX AI - Real Estate Automation";
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "How AI is Revolutionizing Real Estate Lead Management",
      excerpt: "Discover how artificial intelligence is transforming the way real estate agents manage and convert leads.",
      image: "/placeholder.svg",
      author: "Alex Morgan",
      date: "June 15, 2024",
      category: "AI Technology",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "10 Ways to Automate Your Real Estate Business Today",
      excerpt: "Learn practical automation strategies that top-producing agents are using to save time and close more deals.",
      image: "/placeholder.svg",
      author: "Jessica Rodriguez",
      date: "June 10, 2024",
      category: "Automation",
      readTime: "8 min read"
    },
    {
      id: 3,
      title: "The Future of AI Assistants for Real Estate Professionals",
      excerpt: "Explore how AI assistants are becoming indispensable tools for modern real estate agents and brokers.",
      image: "/placeholder.svg",
      author: "Marcus Williams",
      date: "June 5, 2024",
      category: "AI Technology",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "How Chatbots are Improving Client Engagement in Real Estate",
      excerpt: "See how automated chat solutions are helping agents provide faster responses and better service to prospects.",
      image: "/placeholder.svg",
      author: "Sarah Chen",
      date: "May 28, 2024",
      category: "Client Relations",
      readTime: "4 min read"
    },
    {
      id: 5,
      title: "AI-Powered Market Analysis: Getting the Competitive Edge",
      excerpt: "Learn how AI-driven market analysis tools are helping agents make better pricing decisions and win more listings.",
      image: "/placeholder.svg",
      author: "Alex Morgan",
      date: "May 21, 2024",
      category: "Market Insights",
      readTime: "7 min read"
    },
    {
      id: 6,
      title: "Automating Social Media Marketing for Real Estate Agents",
      excerpt: "Discover tools and strategies to maintain an active online presence without spending hours creating content.",
      image: "/placeholder.svg",
      author: "Jessica Rodriguez",
      date: "May 15, 2024",
      category: "Marketing",
      readTime: "5 min read"
    }
  ];

  const categories = [
    "AI Technology",
    "Automation",
    "Market Insights",
    "Client Relations",
    "Marketing",
    "Success Stories"
  ];

  const recentPosts = blogPosts.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-bolt-darker to-bolt-dark text-white">
      <Navbar />
      <main className="flex-grow pt-28">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-gradient bg-gradient-to-r from-bolt-blue to-bolt-purple bg-clip-text">Blog</span> & Resources
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Insights, trends, and strategies to help real estate professionals leverage AI and automation.
            </p>
          </div>

          <div className="mb-16">
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-white/10 shadow-glow-blue/10">
              <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center">
                <div className="absolute inset-0 bg-gradient-to-t from-bolt-darker via-bolt-darker/80 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-bolt-blue/30 backdrop-blur-sm text-sm font-medium mb-4">
                  <span>Featured Article</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">The Complete Guide to AI-Powered Real Estate Automation in 2024</h2>
                <p className="text-white/70 text-lg mb-6 max-w-3xl">
                  A comprehensive breakdown of how AI is transforming every aspect of the real estate business, from lead generation to transaction management.
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center text-white/60 text-sm">
                    <User className="w-4 h-4 mr-1" /> 
                    <span>By Alex Morgan</span>
                  </div>
                  <div className="flex items-center text-white/60 text-sm">
                    <Clock className="w-4 h-4 mr-1" /> 
                    <span>June 20, 2024</span>
                  </div>
                  <div className="flex items-center text-white/60 text-sm">
                    <Tag className="w-4 h-4 mr-1" /> 
                    <span>AI Technology</span>
                  </div>
                </div>
                <a href="#" className="button-glow px-6 py-2.5 bg-gradient-to-r from-bolt-blue to-bolt-purple rounded-full text-white font-medium hover:shadow-glow-blue transition-all duration-300 inline-flex items-center">
                  Read Article
                  <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 mb-20">
            <div className="lg:w-3/4">
              <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogPosts.map(post => (
                  <div key={post.id} className="bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-bolt-blue/50 transition-all duration-300 hover:shadow-glow-blue/10">
                    <div className="h-48 bg-[url('/placeholder.svg')] bg-cover bg-center relative">
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-bolt-blue/80 backdrop-blur-sm text-xs font-medium">
                        {post.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 hover:text-bolt-blue transition-colors duration-200">
                        <a href="#">{post.title}</a>
                      </h3>
                      <p className="text-white/70 mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-white/60 text-sm">
                          <User className="w-4 h-4 mr-1" /> 
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center text-white/60 text-sm">
                          <Clock className="w-4 h-4 mr-1" /> 
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex justify-center">
                <a href="#" className="px-6 py-2.5 bg-white/10 rounded-full text-white font-medium hover:bg-white/20 transition-all duration-300 inline-flex items-center">
                  Load More Articles
                  <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>

            <div className="lg:w-1/4 space-y-8">
              <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                <h3 className="text-xl font-bold mb-4">Search</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full px-4 py-2 pl-10 rounded-lg bg-white/5 border border-white/10 text-white focus:border-bolt-blue focus:outline-none focus:ring-1 focus:ring-bolt-blue transition-all duration-200"
                  />
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                </div>
              </div>

              <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                <h3 className="text-xl font-bold mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <a href="#" className="flex items-center justify-between group">
                        <span className="text-white/70 group-hover:text-bolt-blue transition-colors duration-200">{category}</span>
                        <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-bolt-blue transition-colors duration-200" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
                <div className="space-y-4">
                  {recentPosts.map(post => (
                    <div key={post.id} className="flex gap-3">
                      <div className="w-16 h-16 shrink-0 bg-[url('/placeholder.svg')] bg-cover bg-center rounded-md"></div>
                      <div>
                        <h4 className="font-medium hover:text-bolt-blue transition-colors duration-200 line-clamp-2">
                          <a href="#">{post.title}</a>
                        </h4>
                        <div className="text-xs text-white/60">{post.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-bolt-blue/20 to-bolt-purple/20 rounded-xl border border-white/10 p-6">
                <h3 className="text-xl font-bold mb-3">Subscribe to Our Newsletter</h3>
                <p className="text-white/70 text-sm mb-4">Get the latest articles and resources sent straight to your inbox.</p>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:border-bolt-blue focus:outline-none focus:ring-1 focus:ring-bolt-blue transition-all duration-200 mb-3"
                />
                <button
                  className="w-full button-glow px-4 py-2 bg-gradient-to-r from-bolt-blue to-bolt-purple rounded-full text-white font-medium hover:shadow-glow-blue transition-all duration-300"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
