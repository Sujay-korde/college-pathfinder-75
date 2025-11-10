import { useState, useEffect, useCallback } from "react";

export interface College {
  name: string;
  city: string;
  percentile: number;
  branch: string;
  category: string;
  capRound: string;
}

export function useCollegeData() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Static dropdown options
  const categories = [
    "All categories","GOPENH","LOPENH","GOPENO","LOPENO","MI","TFWS","LNT2H","GSCH","GNT3H",
    "GOBCH","GSEBCH","LOBCH","LSEBCH","GSCO","GNT1O","GNT2O","GOBCO","GSEBCO",
    "LSCO","LOBCO","EWS","GVJH","GNT2H","LNT3O","DEFOPENS","GNT1H",
    "LSCH","GVJO","GNT3O","GSTH","LNT3H","LNT1H","PWDOPENH","LVJO","LSTH","LVJH",
    "DEFROBCS","LNT2O","GOPENS","LOPENS","LNT1O","GSTO","LSEBCO","DEFSCS","DEFOBCS",
    "DEFSEBCS","LSTO","PWDOBCH","GSCS","GSTS","GVJS","GNT1S","GNT2S","GNT3S","GOBCS",
    "GSEBCS","LSCS","LSTS","LVJS","LNT1S","LNT2S","LNT3S","LOBCS","LSEBCS","DEFRNT2S",
    "PWDSCH","PWDOPENS","PWDRSCS","PWDSCS","PWDOBCS","PWDSEBCS","DEFSTS","PWDRNT3S",
    "DEFRNT3S","DEFRSEBC","DEFRVJS","PWDROBC","PWDRNT2S","ORPHAN","PWDRSTS","PWDRSEBC",
    "PWDRNT1S","DEFRSCS","DEFRNT1S","PWDRSCH","PWDRVJS"
  ];

  const cities = [
    "None","Thane","Satara","Osmanabad","Beed","Ahmednagar","Navi Mumbai","Pune","Bhima","Mumbai",
    "Nagpur","Sinnar","Panvel","Sangli","Kolhapur","Aurangabad","Ambernath","Wardha",
    "Barshi","Badlapur(W)","Nashik","Jalgaon","Ichalkaranji","Haveli","Karad","Lonere",
    "Jaysingpur","Amravati","Buldhana","Chhatrapati Sambhajinagar","Solapur","Raigad",
    "Ratnagiri","Bhandara","Avasari Khurd","Chandrapur","Yavatmal","Nanded","Boisar",
    "Bhusawal","Kashti","Kalyan","Jalna","Babulgaon","Kuran","Akkalkuwa","Pandharpur",
    "Ramtek","Karjat","Shahapur","Bhadrawati","Latur","Ambejogai","Parbhani","Baramati",
    "Shegaon","Sindhudurg","Nadurbar","Dhule","Nandurbar","Chikhali","Badnera","Kopargaon",
    "Washim","Gadhinglaj","Andheri","Indapur","Akola","Jalgoan","Yelur","Lonavala"
  ];

  const branches = [
    "All","Civil Engineering","Computer Engineering","Information Technology","Mechanical Engineering",
    "Computer Science and Engineering(Artificial Intelligence and Machine Learning)","Computer Science and Engineering(Data Science)",
    "Computer Science and Engineering","Artificial Intelligence (AI) and Data Science","Electrical Engineering",
    "Electronics and Computer Engineering","Electrical and Electronics Engineering","Electronics and Telecommunication Engg",
    "Electronics and Computer Science","Artificial Intelligence and Machine Learning","Artificial Intelligence and Data Science",
    "Computer Science and Design","Electronics Engineering ( VLSI Design and Technology)",
    "Electronics and Communication (Advanced Communication Technology)","Robotics and Automation","Chemical Engineering",
    "Mechanical Engineering[Sandwich]","Instrumentation Engineering","Automation and Robotics",
    "Electronics and Communication(Advanced Communication Technology)","Electrical and Computer Engineering",
    "Mechanical Engineering Automobile","Computer Science and Engineering (Internet of Things and Cyber Security Including Block Chain)",
    "Computer Science and Engineering (Cyber Security)","Computer Science and Engineering (IoT)","Electronics Engineering",
    "Computer Science and Engineering (Artificial Intelligence)","Data Science","Artificial Intelligence","Aeronautical Engineering",
    "Food Technology","Instrumentation and Control Engineering","Computer Engineering (Software Engineering)",
    "Computer Science and Information Technology","Robotics and Artificial Intelligence","Manufacturing Science and Engineering",
    "Metallurgy and Material Technology","Technical Textiles","Fashion Technology","Man Made Textile Technology",
    "Textile Chemistry","Textile Technology","Computer Science and Technology","Automobile Engineering",
    "Mechanical and Mechatronics Engineering (Additive Manufacturing)","Petro Chemical Engineering","Computer Science",
    "Computer Science and Engineering(Cyber Security)","Agricultural Engineering","Plastic and Polymer Engineering","Mechatronics Engineering",
    "Mechanical & Automation Engineering","Safety and Fire Engineering","Dyestuff Technology","Oil,Oleochemicals and Surfactants Technology",
    "Pharmaceuticals Chemistry and Technology","Fibres and Textile Processing Technology","Polymer Engineering and Technology",
    "Food Engineering and Technology","Surface Coating Technology","Electronics and Communication Engineering",
    "Electrical Engg[Electronics and Power]","Textile Engineering / Technology","Computer Science and Business Systems",
    "Fire Engineering","Computer Technology","Bio Technology","Civil and Environmental Engineering","Mining Engineering",
    "Bio Medical Engineering","Paper and Pulp Technology","Oil Technology","Industrial IoT","Food Technology And Management",
    "Civil and infrastructure Engineering","Architectural Assistantship","Cyber Security","Electrical, Electronics and Power",
    "Civil Engineering and Planning","Electronics and Biomedical Engineering","Printing and Packing Technology","Structural Engineering",
    "Oil and Paints Technology","Computer Science and Engineering (Artificial Intelligence and Data Science)","VLSI","5G",
    "Production Engineering","Internet of Things (IoT)","Computer Science and Engineering (Artificial Intelligence and Machine Learning)",
    "Data Engineering","Pharmaceutical and Fine Chemical Technology","Plastic Technology","Oil Fats and Waxes Technology","Paints Technology",
    "Production Engineering[Sandwich]"
  ];

  // Dynamic fetch function
  const fetchColleges = useCallback(async (
    percentile: number = 100,
    city: string = "",
    category: string = "",
    branch: string = ""
  ) => {
    setLoading(true);
    setError(null);
    try {
      const query = new URLSearchParams();
      if (percentile) query.append("percentile", percentile.toString());
      if (city && city !== "all-cities") query.append("city", city);
      if (category) query.append("category", category);
      if (branch) query.append("branch", branch);

      const res = await fetch(`http://localhost:8080/api/colleges?${query.toString()}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data: College[] = await res.json();
      setColleges(data);
    } catch (err: any) {
      console.error("Error fetching colleges:", err);
      setError(err.message || "Failed to fetch colleges");
      setColleges([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Optionally fetch all colleges on mount
  useEffect(() => {
    fetchColleges();
  }, [fetchColleges]);

  return { colleges, loading, error, categories, cities, branches, fetchColleges };
}
