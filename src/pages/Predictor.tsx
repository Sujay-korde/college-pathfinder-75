import CollegePredictorForm from "@/components/CollegePredictorForm";
import Navbar from "@/components/Navbar";

const Predictor = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <CollegePredictorForm />
      </div>
    </div>
  );
};

export default Predictor;