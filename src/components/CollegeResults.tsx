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
    <div className="min-h-screen bg-background p-4">
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
  );
};

export default CollegeResults;