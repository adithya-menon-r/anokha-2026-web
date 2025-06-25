export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg text-primary p-8">
      <h1 className="heading-xl mb-8 fade-in">Welcome to Anokha 2025</h1>

      <div className="card mb-8 slide-in-up">
        <p>This is an example card using .card class.</p>
      </div>

      <button className="btn-primary fade-in">Register Now</button>
      <button className="btn-secondary mt-4 fade-in">Learn More</button>

      <div className="mt-8 bg-primary text-white p-6 rounded-base shadow-md slide-in-up">
        Hero Block
      </div>
    </main>
  );
}
