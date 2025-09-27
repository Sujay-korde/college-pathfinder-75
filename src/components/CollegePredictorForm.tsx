import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCollegeData } from "@/hooks/useCollegeData";
import { GraduationCap, Calculator, MapPin } from "lucide-react";

interface FormData {
  percentile: string;
  category: string;
  city: string;
}

const CollegePredictorForm = () => {
  const navigate = useNavigate();
  const { uniqueCategories, uniqueCities, loading } = useCollegeData();
  const [formData, setFormData] = useState<FormData>({
    percentile: "",
    category: "",
    city: "all-cities"
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
      ...(formData.city && formData.city !== "all-cities" && { city: formData.city })
    });
    
    navigate(`/results?${searchParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">
            MHT-CET 2025 College Predictor
          </h1>
          <p className="text-muted-foreground">
            By RightWay Counseling Center
          </p>
        </div>

        {/* CAP Round Selection */}
        <Card className="bg-card border-border shadow-[var(--shadow-card)]">
          <CardContent className="p-6">
            <div className="space-y-2">
              <Label className="text-foreground font-medium">Select CAP Round</Label>
              <Select defaultValue="all-india">
                <SelectTrigger className="bg-background border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="all-india">All India Round</SelectItem>
                  <SelectItem value="state">State Round</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Main Form */}
        <Card className="bg-card border-border shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <GraduationCap className="h-5 w-5 text-primary" />
              Prediction Parameters
            </CardTitle>
          </CardHeader>
        
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Rank Input */}
                <div className="space-y-2">
                  <Label className="text-foreground font-medium">Your Rank (Merit No.)</Label>
                  <Input
                    placeholder="e.g., 12345"
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                  />
                  <p className="text-xs text-muted-foreground">Enter your official MHT-CET merit rank</p>
                </div>

                {/* Percentile Input */}
                <div className="space-y-2">
                  <Label htmlFor="percentile" className="text-foreground font-medium">Your Percentile</Label>
                  <Input
                    id="percentile"
                    type="number"
                    placeholder="e.g., 98.7654"
                    value={formData.percentile}
                    onChange={(e) => setFormData({...formData, percentile: e.target.value})}
                    min="0"
                    max="100"
                    step="0.01"
                    required
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                  />
                  <p className="text-xs text-muted-foreground">Alternatively, enter your percentile</p>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label className="text-foreground font-medium">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger className="bg-background border-border text-foreground">
                      <SelectValue placeholder="Select your category/caste/category" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {loading ? (
                        <SelectItem value="loading" disabled>Loading categories...</SelectItem>
                      ) : (
                        uniqueCategories.map((category) => (
                          <SelectItem key={category} value={category} className="hover:bg-accent">
                            {category}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {/* Available Branches */}
                <div className="space-y-2">
                  <Label className="text-foreground font-medium">Available Branches</Label>
                  <Input
                    placeholder="e.g., Computer Engineering"
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                  />
                  <p className="text-xs text-muted-foreground">Select branches to add to your preference list</p>
                </div>
              </div>

              {/* Branch Preference Order */}
              <div className="space-y-3">
                <Label className="text-foreground font-medium">Branch Preference Order</Label>
                <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center bg-background/50">
                  <div className="text-muted-foreground space-y-2">
                    <div className="text-2xl">+</div>
                    <div>Select branches from above to set your preference order</div>
                    <div className="text-sm">Drag to reorder or click to remove</div>
                    <div className="text-xs">Drag branches to reorder your preferences. Higher priority branches will be shown first in results.</div>
                  </div>
                </div>
              </div>

              {/* Preferred Cities */}
              <div className="space-y-2">
                <Label className="text-foreground font-medium">Preferred Cities</Label>
                <Select value={formData.city} onValueChange={(value) => setFormData({...formData, city: value})}>
                  <SelectTrigger className="bg-background border-border text-foreground">
                    <SelectValue placeholder="e.g., Pune, Mumbai" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="all-cities" className="hover:bg-accent">All Cities</SelectItem>
                    {loading ? (
                      <SelectItem value="loading" disabled>Loading cities...</SelectItem>
                    ) : (
                      uniqueCities.map((city) => (
                        <SelectItem key={city} value={city} className="hover:bg-accent">
                          {city}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 shadow-[var(--shadow-button)] transition-all duration-300"
              >
                <GraduationCap className="mr-2 h-4 w-4" />
                Predict My Colleges
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CollegePredictorForm;