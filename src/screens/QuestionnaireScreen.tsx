import StepperCard from "../components/StepperCard";
import AnimatedBackground from "../components/AnimatedBackground";
const QuestionnaireScreen = () => {
  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <section
        className="min-h-screen flex flex-col items-center justify-center px-6 pt-20"
      >
        <StepperCard />
      </section>
    </div>
  );
};

export default QuestionnaireScreen;
