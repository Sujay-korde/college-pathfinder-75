import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Database, Users, Target, Phone, Mail, MapPin } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Find your perfect<br />
            <span className="text-primary">college with precision</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover your optimal college choices based on your MHTCET score and preferences. 
            Get accurate predictions and make informed decisions about your future.
          </p>
          <Link to="/predictor">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg">
              Try Now
            </Button>
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">How our predictor works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our advanced algorithm analyzes multiple factors to provide the most accurate college predictions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card border-border">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">Enter Details</h3>
                <p className="text-muted-foreground">Input your MHTCET score, category, and preferences</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">AI Analysis</h3>
                <p className="text-muted-foreground">Our AI analyzes cutoff trends and admission patterns</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">Get Results</h3>
                <p className="text-muted-foreground">Receive accurate college predictions with admission chances</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Why choose our college predictor</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience a seamless and intelligent college prediction tool designed specifically for MHTCET candidates.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Accurate predictions</h3>
              <p className="text-muted-foreground">
                Our algorithm uses real admission data and cutoff trends to provide highly accurate predictions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Comprehensive database</h3>
              <p className="text-muted-foreground">
                Access to complete database of Maharashtra engineering colleges with latest information.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">User-friendly interface</h3>
              <p className="text-muted-foreground">
                Simple and intuitive interface designed for easy navigation and quick results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Ready to find your college</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start your journey to the perfect college with our advanced prediction tool.
          </p>
          <Link to="/predictor">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">FAQs</h2>
            <p className="text-muted-foreground">Common questions about our MHTCET college predictor tool</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>How accurate are the predictions?</AccordionTrigger>
                <AccordionContent>
                  Our predictions are based on historical data and current trends, providing accuracy rates of over 85%. 
                  However, actual admissions depend on various factors including seat availability and competition.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Is this tool specific to MHTCET?</AccordionTrigger>
                <AccordionContent>
                  Yes, this tool is specifically designed for MHTCET candidates seeking admission to engineering colleges in Maharashtra.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>What information do I need?</AccordionTrigger>
                <AccordionContent>
                  You need your MHTCET score, category (General/OBC/SC/ST), preferred branch, and location preferences.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>How much does it cost?</AccordionTrigger>
                <AccordionContent>
                  Our basic college prediction tool is completely free to use. Advanced features may require a premium subscription.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>Can I get counseling support?</AccordionTrigger>
                <AccordionContent>
                  Yes, we offer expert counseling support to help you make informed decisions about your college choices and career path.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-card-foreground">Contact us</h2>
            <p className="text-muted-foreground">We're here to help you navigate your academic journey</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 text-card-foreground">Email</h3>
              <p className="text-muted-foreground">support@collegepredictor.com</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 text-card-foreground">Phone</h3>
              <p className="text-muted-foreground">+91 12345 67890</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 text-card-foreground">Address</h3>
              <p className="text-muted-foreground">Mumbai, Maharashtra, India</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;