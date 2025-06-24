export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg text-primary p-8">
      <h1 className="heading-xl mb-8">Welcome to Anokha 2025</h1>

      <div className="card mb-8">
        <p>This is an example card using .card class.</p>
      </div>

      <button className="btn-primary">Register Now</button>
      <button className="btn-secondary mt-4">Learn More</button>

      <div className="mt-8 bg-primary text-white p-6 rounded-xl shadow-md">Hero Block</div>
    </main>
  );
}
