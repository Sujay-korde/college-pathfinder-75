import { useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCollegeData } from "@/hooks/useCollegeData";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Download, AlertCircle } from "lucide-react";

const CollegeResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const percentile = parseFloat(searchParams.get("percentile") || "0");
  const category = searchParams.get("category") || "";
  const city = searchParams.get("city") || "";
  const branch = searchParams.get("branch") || "";

  const { colleges, loading, fetchColleges } = useCollegeData();

  // Fetch colleges dynamically when search params change
  useEffect(() => {
    fetchColleges(percentile, city, category, branch);
  }, [percentile, city, category, branch, fetchColleges]);

  // Filter & sort colleges for display
  const filteredColleges = useMemo(() => {
    if (!colleges.length) return [];
    return [...colleges].sort((a, b) => b.percentile - a.percentile);
  }, [colleges]);

  const downloadCSV = () => {
    const headers = ["College Name", "Branch", "City", "Category", "Percentile"];
    const csvContent = [
      headers.join(","),
      ...filteredColleges.map(c =>
        [`"${c.name}"`, `"${c.branch}"`, `"${c.city}"`, `"${c.category}"`, c.percentile].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `college_predictions.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 p-4 text-center">Loading...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 p-4 max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/")} className="flex items-center gap-2 text-primary">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-4">
            <div>{filteredColleges.length} colleges found</div>
            {filteredColleges.length > 0 && (
              <Button onClick={downloadCSV} className="bg-green-600 hover:bg-green-700 text-white">Download CSV</Button>
            )}
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            {filteredColleges.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3>No colleges found</h3>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>College Name</TableHead>
                      <TableHead>Branch</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Percentile</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredColleges.map((c, i) => (
                      <TableRow key={`${c.name}-${i}`}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>{c.name}</TableCell>
                        <TableCell>{c.branch}</TableCell>
                        <TableCell>{c.city}</TableCell>
                        <TableCell>{c.category}</TableCell>
                        <TableCell>{c.percentile}</TableCell>
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
