export default function ScenarioBackground() {
  return (
    <>
      {/* Background pattern */}
      <div 
        className="absolute top-8 right-0 w-64 h-64 rounded-full opacity-20 blur-3xl -z-10 bg-primary"
      ></div>
      <div 
        className="absolute bottom-12 left-8 w-48 h-48 rounded-full opacity-20 blur-3xl -z-10 bg-secondary"
      ></div>
    </>
  );
}
