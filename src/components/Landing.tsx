import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Database, Users, Target, Phone, Mail, MapPin, BookOpen, Award, TrendingUp } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

const Landing = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast({ title: "Please fill all fields", description: "Name, email and message are required." });
      return;
    }
    // Show success (placeholder - replace with API call if backend available)
    toast({ title: "Message sent", description: "Thanks for contacting us — we'll reply soon." });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/abstract-luxury-gradient-blue-background-smooth-dark-blue-with-black-vignette-studio-banner.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-white leading-tight tracking-tight">
              Find your perfect
              <br />
              <span className="bg-gradient-to-r from-blue-200 via-white to-blue-200 bg-clip-text text-transparent">
                college with precision
              </span>
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8"
          >
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light">
              Discover your optimal college choices based on your MHTCET score and preferences. 
              Get accurate predictions and make informed decisions about your future.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12"
          >
            <Link to="/predictor">
              <Button 
                size="lg" 
                className="bg-white text-blue-900 hover:bg-gray-100 px-10 py-6 text-lg font-semibold rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-white/20"
              >
                Try Now
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-white/40 text-white hover:bg-white/20 px-10 py-6 text-lg rounded-2xl backdrop-blur-md transition-all duration-300 hover:scale-105"
            >
              Learn More
            </Button>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mt-20 max-w-4xl mx-auto"
          >
            {[
              { value: "10,000+", label: "Students Helped" },
              { value: "500+", label: "Colleges Listed" },
              { value: "95%", label: "Accuracy Rate" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.5)" }}
                className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl text-center border-2 border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-white/90 text-sm md:text-base font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground">How our predictor works</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our advanced algorithm analyzes multiple factors to provide the most accurate college predictions using real-time data.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group bg-card border-border hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-2xl font-semibold mb-4 text-card-foreground">Enter Details</h3>
                <p className="text-muted-foreground leading-relaxed">Input your MHTCET score, category, and preferences with our intuitive interface</p>
              </CardContent>
            </Card>
            
            <Card className="group bg-card border-border hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl" style={{animationDelay: '0.2s'}}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-2xl font-semibold mb-4 text-card-foreground">AI Analysis</h3>
                <p className="text-muted-foreground leading-relaxed">Our AI analyzes cutoff trends and admission patterns from historical data</p>
              </CardContent>
            </Card>
            
            <Card className="group bg-card border-border hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl" style={{animationDelay: '0.4s'}}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-2xl font-semibold mb-4 text-card-foreground">Get Results</h3>
                <p className="text-muted-foreground leading-relaxed">Receive accurate college predictions with detailed admission probability scores</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground">Why choose our college predictor</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Experience a seamless and intelligent college prediction tool designed specifically for MHTCET candidates with cutting-edge technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Target className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-heading text-2xl font-semibold mb-4 text-foreground">Accurate predictions</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Our algorithm uses real admission data and cutoff trends to provide highly accurate predictions with 95% success rate.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Database className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-heading text-2xl font-semibold mb-4 text-foreground">Comprehensive database</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Access to complete database of 500+ Maharashtra engineering colleges with latest information and real-time updates.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-heading text-2xl font-semibold mb-4 text-foreground">User-friendly interface</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Simple and intuitive interface designed for easy navigation and quick results that students love to use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-accent/5 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground">Ready to find your college</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Start your journey to the perfect college with our advanced prediction tool powered by machine learning and years of admission data.
          </p>
          <Link to="/predictor">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-xl font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Common questions about our MHTCET college predictor tool and how it works
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border border-border rounded-xl overflow-hidden">
                <AccordionTrigger className="px-6 py-4 text-lg font-semibold hover:no-underline hover:bg-muted/50 transition-colors">
                  How accurate are the predictions?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground leading-relaxed">
                  Our predictions are based on historical data and current trends, providing accuracy rates of over 95%. 
                  However, actual admissions depend on various factors including seat availability and competition.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border border-border rounded-xl overflow-hidden">
                <AccordionTrigger className="px-6 py-4 text-lg font-semibold hover:no-underline hover:bg-muted/50 transition-colors">
                  Is this tool specific to MHTCET?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground leading-relaxed">
                  Yes, this tool is specifically designed for MHTCET candidates seeking admission to engineering colleges in Maharashtra.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="border border-border rounded-xl overflow-hidden">
                <AccordionTrigger className="px-6 py-4 text-lg font-semibold hover:no-underline hover:bg-muted/50 transition-colors">
                  What information do I need?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground leading-relaxed">
                  You need your MHTCET score, category (General/OBC/SC/ST), preferred branch, and location preferences.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="border border-border rounded-xl overflow-hidden">
                <AccordionTrigger className="px-6 py-4 text-lg font-semibold hover:no-underline hover:bg-muted/50 transition-colors">
                  How much does it cost?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground leading-relaxed">
                  Our basic college prediction tool is completely free to use. Advanced features may require a premium subscription.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5" className="border border-border rounded-xl overflow-hidden">
                <AccordionTrigger className="px-6 py-4 text-lg font-semibold hover:no-underline hover:bg-muted/50 transition-colors">
                  Can I get counseling support?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground leading-relaxed">
                  Yes, we offer expert counseling support to help you make informed decisions about your college choices and career path.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-br from-card via-card to-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-card-foreground">Get in touch</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We're here to help you navigate your academic journey with expert guidance and support
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto mb-16">
            {[
              { icon: Mail, title: "Email Support", info: "support@collegepredictor.com" },
              { icon: Phone, title: "Phone Support", info: "+91 12345 67890" },
              { icon: MapPin, title: "Visit Us", info: "Mumbai, Maharashtra, India" }
            ].map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <contact.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-3 text-card-foreground">{contact.title}</h3>
                <p className="text-muted-foreground text-lg">{contact.info}</p>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="border-2 shadow-xl">
              <CardContent className="p-8">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input 
                        placeholder="Your name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        className="rounded-xl"
                      />
                    </div>
                    <div>
                      <Input 
                        placeholder="Your email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                  <Textarea 
                    placeholder="Your message" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)}
                    className="rounded-xl min-h-[120px]"
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 rounded-xl py-6 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
