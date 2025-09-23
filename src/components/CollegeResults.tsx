import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockColleges, type College } from "@/data/colleges";
import { ArrowLeft, Download, School, AlertCircle } from "lucide-react";

const CollegeResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const percentile = parseFloat(searchParams.get("percentile") || "0");
  const category = searchParams.get("category") || "";
  const city = searchParams.get("city") || "";

  const filteredColleges = useMemo(() => {
    return mockColleges.filter((college: College) => {
      // Filter by cutoff percentile
      if (college.cutoff_percentile > percentile) return false;
      
      // Filter by category
      if (college.category !== category) return false;
      
      // Filter by city if specified
      if (city && college.city !== city) return false;
      
      return true;
    }).sort((a, b) => b.cutoff_percentile - a.cutoff_percentile); // Sort by cutoff percentile (highest first)
  }, [percentile, category, city]);

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
      link.setAttribute("download", `college_predictions_${percentile}_${category}.csv`);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-academic-light/20 to-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-[var(--shadow-card)] border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/")}
                className="flex items-center gap-2 hover:bg-accent"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Search
              </Button>
              
              {filteredColleges.length > 0 && (
                <Button 
                  onClick={downloadCSV}
                  className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white"
                >
                  <Download className="h-4 w-4" />
                  Download CSV
                </Button>
              )}
            </div>
            
            <div className="text-center space-y-2">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                College Predictions
              </CardTitle>
              <CardDescription className="text-base">
                Results for {percentile}th percentile, {category} category
                {city && `, ${city}`}
              </CardDescription>
            </div>
          </CardHeader>
        </Card>

        {/* Results */}
        {filteredColleges.length === 0 ? (
          <Card className="shadow-[var(--shadow-card)] border-border/50 bg-card/80 backdrop-blur-sm">
            <CardContent className="py-12 text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-orange-100 rounded-full">
                  <AlertCircle className="h-8 w-8 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No Colleges Found
                  </h3>
                  <p className="text-muted-foreground">
                    No colleges match your criteria. Try adjusting your search parameters or removing city filter.
                  </p>
                </div>
                <Button 
                  onClick={() => navigate("/")}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-[var(--shadow-card)] border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <School className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl">
                  Found {filteredColleges.length} College{filteredColleges.length !== 1 ? 's' : ''}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/50">
                      <TableHead className="font-semibold text-foreground">College Name</TableHead>
                      <TableHead className="font-semibold text-foreground">Branch</TableHead>
                      <TableHead className="font-semibold text-foreground">City</TableHead>
                      <TableHead className="font-semibold text-foreground">Category</TableHead>
                      <TableHead className="font-semibold text-foreground text-right">Cutoff Percentile</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredColleges.map((college) => (
                      <TableRow key={college.id} className="border-border/50 hover:bg-accent/50 transition-colors">
                        <TableCell className="font-medium text-foreground">
                          {college.college_name}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {college.branch}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {college.city}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={getCategoryColor(college.category)}
                          >
                            {college.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium text-foreground">
                          {college.cutoff_percentile}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CollegeResults;