import { useState, useEffect } from "react";
import Papa from "papaparse";
import { type College, type CSVCollege } from "@/data/colleges";

export const useCollegeData = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
  const [uniqueCities, setUniqueCities] = useState<string[]>([]);

  useEffect(() => {
    const loadCSVData = async () => {
      try {
        console.log('Loading CSV data from /mht_cet_r1city.csv');
        const response = await fetch('/mht_cet_r1city.csv');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const csvText = await response.text();
        console.log('CSV loaded, first 500 chars:', csvText.substring(0, 500));
        
        Papa.parse<CSVCollege>(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            console.log('Papa parse complete. Results:', results);
            console.log('Number of rows parsed:', results.data.length);
            console.log('First 3 rows:', results.data.slice(0, 3));
            
            const parsedColleges: College[] = results.data
              .filter(row => row.College && row.Branch && row.Percentile) // Filter out empty rows
              .map((row, index) => ({
                id: index + 1,
                college_name: row.College || '',
                branch: row.Branch || '',
                city: row.City || '',
                category: row.Category || '',
                cutoff_percentile: parseFloat(row.Percentile) || 0
              }))
              .filter(college => college.cutoff_percentile > 0); // Filter out invalid percentiles

            console.log('Parsed colleges:', parsedColleges.length);
            console.log('First 3 parsed colleges:', parsedColleges.slice(0, 3));
            
            setColleges(parsedColleges);
            
            // Extract unique values for filters
            const categories = [...new Set(parsedColleges.map(c => c.category))].filter(Boolean).sort();
            const cities = [...new Set(parsedColleges.map(c => c.city))].filter(Boolean).sort();
            
            console.log('Unique categories:', categories);
            console.log('Unique cities:', cities.length);
            
            setUniqueCategories(categories);
            setUniqueCities(cities);
            setLoading(false);
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
            setLoading(false);
          }
        });
      } catch (error) {
        console.error('Error loading CSV:', error);
        setLoading(false);
      }
    };

    loadCSVData();
  }, []);

  return {
    colleges,
    loading,
    uniqueCategories,
    uniqueCities
  };
};