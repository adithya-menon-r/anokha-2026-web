export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-bg text-primary p-8">
      <h1 className="heading-xl mb-6">Welcome to Anokha 2025</h1>
      <div className="max-w-lg w-full text-center card">
        <p className="mb-4">Tech Fair of Amrita Vishwa Vidyapeetham, Coimbatore</p>
        <a href="/events" className="btn-primary inline-block">
          View Events
        </a>
      </div>
    </main>
  );
}
