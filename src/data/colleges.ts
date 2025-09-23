export interface College {
  id: number;
  college_name: string;
  branch: string;
  city: string;
  category: string;
  cutoff_percentile: number;
}

export const mockColleges: College[] = [
  // IITs
  { id: 1, college_name: "IIT Delhi", branch: "Computer Science", city: "Delhi", category: "OPEN", cutoff_percentile: 99.5 },
  { id: 2, college_name: "IIT Delhi", branch: "Electrical Engineering", city: "Delhi", category: "OPEN", cutoff_percentile: 98.8 },
  { id: 3, college_name: "IIT Bombay", branch: "Computer Science", city: "Mumbai", category: "OPEN", cutoff_percentile: 99.7 },
  { id: 4, college_name: "IIT Bombay", branch: "Mechanical Engineering", city: "Mumbai", category: "OPEN", cutoff_percentile: 98.2 },
  { id: 5, college_name: "IIT Madras", branch: "Computer Science", city: "Chennai", category: "OPEN", cutoff_percentile: 99.4 },
  
  // NITs
  { id: 6, college_name: "NIT Trichy", branch: "Computer Science", city: "Trichy", category: "OPEN", cutoff_percentile: 97.5 },
  { id: 7, college_name: "NIT Warangal", branch: "Electronics", city: "Warangal", category: "OPEN", cutoff_percentile: 96.8 },
  { id: 8, college_name: "NIT Surathkal", branch: "Mechanical Engineering", city: "Mangalore", category: "OPEN", cutoff_percentile: 95.2 },
  { id: 9, college_name: "NIT Calicut", branch: "Civil Engineering", city: "Calicut", category: "OPEN", cutoff_percentile: 94.1 },
  
  // State Colleges
  { id: 10, college_name: "BITS Pilani", branch: "Computer Science", city: "Pilani", category: "OPEN", cutoff_percentile: 98.1 },
  { id: 11, college_name: "VJTI Mumbai", branch: "Information Technology", city: "Mumbai", category: "OPEN", cutoff_percentile: 92.5 },
  { id: 12, college_name: "College of Engineering Pune", branch: "Computer Engineering", city: "Pune", category: "OPEN", cutoff_percentile: 91.8 },
  { id: 13, college_name: "PSG College of Technology", branch: "Electronics", city: "Coimbatore", category: "OPEN", cutoff_percentile: 88.5 },
  
  // OBC Category
  { id: 14, college_name: "IIT Delhi", branch: "Computer Science", city: "Delhi", category: "OBC", cutoff_percentile: 96.2 },
  { id: 15, college_name: "IIT Bombay", branch: "Electrical Engineering", city: "Mumbai", category: "OBC", cutoff_percentile: 95.8 },
  { id: 16, college_name: "NIT Trichy", branch: "Mechanical Engineering", city: "Trichy", category: "OBC", cutoff_percentile: 93.5 },
  { id: 17, college_name: "NIT Delhi", branch: "Computer Science", city: "Delhi", category: "OBC", cutoff_percentile: 92.1 },
  
  // SC Category
  { id: 18, college_name: "IIT Delhi", branch: "Mechanical Engineering", city: "Delhi", category: "SC", cutoff_percentile: 85.2 },
  { id: 19, college_name: "NIT Warangal", branch: "Computer Science", city: "Warangal", category: "SC", cutoff_percentile: 82.5 },
  { id: 20, college_name: "NIT Calicut", branch: "Electronics", city: "Calicut", category: "SC", cutoff_percentile: 79.8 },
  
  // ST Category
  { id: 21, college_name: "IIT Madras", branch: "Civil Engineering", city: "Chennai", category: "ST", cutoff_percentile: 75.5 },
  { id: 22, college_name: "NIT Trichy", branch: "Electronics", city: "Trichy", category: "ST", cutoff_percentile: 72.1 },
  
  // More colleges for variety
  { id: 23, college_name: "DTU Delhi", branch: "Software Engineering", city: "Delhi", category: "OPEN", cutoff_percentile: 89.2 },
  { id: 24, college_name: "NSIT Delhi", branch: "Computer Engineering", city: "Delhi", category: "OPEN", cutoff_percentile: 87.5 },
  { id: 25, college_name: "ICT Mumbai", branch: "Information Technology", city: "Mumbai", category: "OPEN", cutoff_percentile: 85.8 },
  { id: 26, college_name: "Thapar University", branch: "Computer Science", city: "Patiala", category: "OPEN", cutoff_percentile: 84.2 },
  { id: 27, college_name: "VIT Vellore", branch: "Computer Science", city: "Vellore", category: "OPEN", cutoff_percentile: 83.1 },
  { id: 28, college_name: "SRM Chennai", branch: "Information Technology", city: "Chennai", category: "OPEN", cutoff_percentile: 80.5 },
  { id: 29, college_name: "Manipal Institute", branch: "Computer Engineering", city: "Manipal", category: "OPEN", cutoff_percentile: 78.9 },
  { id: 30, college_name: "PEC Chandigarh", branch: "Electronics", city: "Chandigarh", category: "OPEN", cutoff_percentile: 86.3 },
];

export const categories = ["OPEN", "OBC", "SC", "ST", "NT", "EWS"];

export const cities = [...new Set(mockColleges.map(college => college.city))].sort();