import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCollegeData } from "@/hooks/useCollegeData";

interface FormData {
  percentile: string;
  category: string;
  city: string;
  branch: string;
}

const CollegePredictorForm = () => {
  const navigate = useNavigate();
  const { categories, cities, branches } = useCollegeData();
  const [formData, setFormData] = useState<FormData>({
    percentile: "",
    category: "",
    city: "all-cities",
    branch: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.percentile || !formData.category) {
      alert("Please fill in percentile and category fields");
      return;
    }
    navigate(`/results?percentile=${formData.percentile}&category=${formData.category}&city=${formData.city}&branch=${formData.branch}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl p-6 space-y-6">
        <CardHeader>
          <CardTitle>College Predictor</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Percentile</Label>
              <Input type="number" min={0} max={100} step={0.01} value={formData.percentile} onChange={e => setFormData({...formData, percentile: e.target.value})} />
            </div>
            <div>
              <Label>Category</Label>
              <Select value={formData.category} onValueChange={v => setFormData({...formData, category: v})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>City</Label>
              <Select value={formData.city} onValueChange={v => setFormData({...formData, city: v})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-cities">All Cities</SelectItem>
                  {cities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Branch</Label>
              <Select value={formData.branch} onValueChange={v => setFormData({...formData, branch: v})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">Predict</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CollegePredictorForm;
