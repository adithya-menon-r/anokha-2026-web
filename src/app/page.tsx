import { Button } from '@/components/ui/button';
import Footer from '@/components/ui/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-between bg-gray-50 text-gray-900">
      <h1 className="text-3xl font-bold mb-6 mt-8">Welcome to Anokha 2025</h1>
      <div className="max-w-lg w-full text-center mx-auto bg-white rounded-xl shadow p-8 border">
        <p className="mb-4 font-semibold">Tech Fair of Amrita Vishwa Vidyapeetham, Coimbatore</p>
        <Button asChild className="mt-4">
          <a href="/events">View Events</a>
        </Button>
      </div>

      <section id="footer">
        <Footer current_page="HOME" />
      </section>
    </main>
  );
}
