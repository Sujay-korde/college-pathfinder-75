import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories, cities } from "@/data/colleges";
import { GraduationCap, Calculator, MapPin } from "lucide-react";

interface FormData {
  percentile: string;
  category: string;
  city: string;
}

const CollegePredictorForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    percentile: "",
    category: "",
    city: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.percentile || !formData.category) {
      alert("Please fill in percentile and category fields");
      return;
    }

    const percentile = parseFloat(formData.percentile);
    if (percentile < 0 || percentile > 100) {
      alert("Please enter a valid percentile between 0 and 100");
      return;
    }

    // Navigate to results page with query parameters
    const searchParams = new URLSearchParams({
      percentile: formData.percentile,
      category: formData.category,
      ...(formData.city && { city: formData.city })
    });
    
    navigate(`/results?${searchParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-academic-light/20 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-[var(--shadow-card)] border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-full">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            College Predictor
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Find engineering colleges based on your JEE Main percentile and category
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="percentile" className="text-sm font-medium flex items-center gap-2">
                <Calculator className="h-4 w-4 text-primary" />
                JEE Main Percentile *
              </Label>
              <Input
                id="percentile"
                type="number"
                placeholder="Enter your percentile (0-100)"
                value={formData.percentile}
                onChange={(e) => setFormData({...formData, percentile: e.target.value})}
                min="0"
                max="100"
                step="0.01"
                required
                className="h-12 bg-background/50 border-border/50 focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-primary" />
                Category *
              </Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                <SelectTrigger className="h-12 bg-background/50 border-border/50 focus:border-primary">
                  <SelectValue placeholder="Select your category" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border/50">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} className="hover:bg-accent">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Preferred City (Optional)
              </Label>
              <Select value={formData.city} onValueChange={(value) => setFormData({...formData, city: value})}>
                <SelectTrigger className="h-12 bg-background/50 border-border/50 focus:border-primary">
                  <SelectValue placeholder="Select preferred city (optional)" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border/50">
                  <SelectItem value="" className="hover:bg-accent">All Cities</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city} className="hover:bg-accent">
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold shadow-[var(--shadow-button)] transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
            >
              Predict Colleges
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CollegePredictorForm;