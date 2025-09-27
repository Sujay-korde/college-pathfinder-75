import { useMemo, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCollegeData } from "@/hooks/useCollegeData";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { type College } from "@/data/colleges";
import { ArrowLeft, Download, School, AlertCircle, Filter } from "lucide-react";

const CollegeResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { colleges, loading, uniqueCategories, uniqueCities } = useCollegeData();
  
  const percentile = parseFloat(searchParams.get("percentile") || "0");
  const category = searchParams.get("category") || "";
  const city = searchParams.get("city") || "";

  // State for filters
  const [percentileRange, setPercentileRange] = useState([Math.max(0, percentile - 6), percentile]);
  const [selectedCategory, setSelectedCategory] = useState(category || "all-categories");
  const [selectedCity, setSelectedCity] = useState(city || "all-cities");

  // Update filters when URL params change
  useEffect(() => {
    setPercentileRange([Math.max(0, percentile - 6), percentile]);
    setSelectedCategory(category || "all-categories");
    setSelectedCity(city || "all-cities");
  }, [percentile, category, city]);

  const filteredColleges = useMemo(() => {
    if (!colleges.length) {
      console.log('No colleges available for filtering');
      return [];
    }
    
    console.log('Filtering colleges. Total colleges:', colleges.length);
    console.log('Filter criteria:', { percentileRange, selectedCategory, selectedCity });
    
    const filtered = colleges.filter((college: College) => {
      // Filter by percentile range (user's percentile down to 5-6 percentiles lower)
      if (college.cutoff_percentile < percentileRange[0] || college.cutoff_percentile > percentileRange[1]) {
        return false;
      }
      
      // Filter by category
      if (selectedCategory && selectedCategory !== "all-categories" && college.category !== selectedCategory) return false;
      
      // Filter by city if specified
      if (selectedCity && selectedCity !== "all-cities" && college.city !== selectedCity) return false;
      
      return true;
    }).sort((a, b) => b.cutoff_percentile - a.cutoff_percentile); // Sort by cutoff percentile (highest first)
    
    console.log('Filtered colleges count:', filtered.length);
    console.log('First 3 filtered colleges:', filtered.slice(0, 3));
    
    return filtered;
  }, [colleges, percentileRange, selectedCategory, selectedCity]);

  const downloadCSV = () => {
    const headers = ["College Name", "Branch", "City", "Category", "Cutoff Percentile"];
    const csvContent = [
      headers.join(","),
      ...filteredColleges.map(college => 
        [
          `"${college.college_name}"`,
          `"${college.branch}"`,
          `"${college.city}"`,
          `"${college.category}"`,
          college.cutoff_percentile
        ].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `college_predictions_${percentileRange[0]}-${percentileRange[1]}_${selectedCategory === "all-categories" ? "all" : selectedCategory}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "OPEN": "bg-primary/10 text-primary border-primary/20",
      "OBC": "bg-secondary/10 text-secondary border-secondary/20",
      "SC": "bg-blue-500/10 text-blue-600 border-blue-500/20",
      "ST": "bg-green-500/10 text-green-600 border-green-500/20",
      "NT": "bg-purple-500/10 text-purple-600 border-purple-500/20",
      "EWS": "bg-orange-500/10 text-orange-600 border-orange-500/20"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-600 border-gray-200";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-20 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading college data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 p-4">
        <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-primary hover:text-primary/80"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-semibold text-primary">
              Predicted Colleges
            </h1>
            <p className="text-muted-foreground">
              Based on your selection criteria.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
              {filteredColleges.length} colleges found
            </div>
            {filteredColleges.length > 0 && (
              <Button 
                onClick={downloadCSV}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            )}
          </div>
        </div>

        {/* Filters */}
        <Card className="bg-card border-border shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Percentile Range */}
              <div className="space-y-3">
                <Label htmlFor="percentile-range" className="text-sm font-medium text-foreground">
                  Percentile Range: {percentileRange[0]}% - {percentileRange[1]}%
                </Label>
                <Slider
                  id="percentile-range"
                  value={percentileRange}
                  onValueChange={setPercentileRange}
                  min={0}
                  max={100}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={percentileRange[0]}
                    onChange={(e) => setPercentileRange([parseFloat(e.target.value) || 0, percentileRange[1]])}
                    className="flex-1"
                    min={0}
                    max={100}
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={percentileRange[1]}
                    onChange={(e) => setPercentileRange([percentileRange[0], parseFloat(e.target.value) || 100])}
                    className="flex-1"
                    min={0}
                    max={100}
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    <SelectItem value="all-categories">All Categories</SelectItem>
                    {uniqueCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* City Filter */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">City</Label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border max-h-60 overflow-y-auto">
                    <SelectItem value="all-cities">All Cities</SelectItem>
                    {uniqueCities.map((cityName) => (
                      <SelectItem key={cityName} value={cityName}>
                        {cityName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Table */}
        <Card className="bg-card border-border shadow-[var(--shadow-card)]">
          <CardContent className="p-0">
            {filteredColleges.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-foreground">No colleges found</h3>
                <p className="text-muted-foreground">
                  No colleges match your criteria. Try adjusting your percentile or category.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border bg-muted/50">
                      <TableHead className="w-12 font-semibold text-foreground border-r border-border">#</TableHead>
                      <TableHead className="font-semibold text-foreground border-r border-border">COLLEGE NAME</TableHead>
                      <TableHead className="font-semibold text-foreground">BRANCH</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredColleges.map((college, index) => (
                      <TableRow 
                        key={`${college.id}-${index}`} 
                        className="border-border hover:bg-muted/30 transition-colors"
                      >
                        <TableCell className="font-medium text-foreground border-r border-border">
                          {index + 1}
                        </TableCell>
                        <TableCell className="font-medium text-foreground border-r border-border">
                          {college.college_name}
                        </TableCell>
                        <TableCell className="text-foreground">
                          {college.branch}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default CollegeResults;