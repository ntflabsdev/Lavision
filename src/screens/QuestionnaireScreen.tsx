import Stats from "../components/Stats";
import StepperCard from "../components/StepperCard";
import TransformFuture from "../components/TransformFuture";

const QuestionnaireScreen = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with StepperCard */}
      <section
        className="min-h-screen flex flex-col items-center justify-center px-6 pt-20"
        style={{
          background: `linear-gradient(90deg, #05051F 16.76%, #9F5EB0 140.63%), linear-gradient(122.01deg, #0A0B10 0%, #1A1339 50%, #402659 100%)`
        }}
      >
        <StepperCard />
      </section>

      <TransformFuture />

      <Stats />
    </div>
  );
};

export default QuestionnaireScreen;
