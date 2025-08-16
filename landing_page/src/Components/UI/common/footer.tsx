export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="container mx-auto px-6 py-8 text-sm text-gray-500">
        <div className="flex justify-between">
          <div>© {new Date().getFullYear()} DriveLite</div>
          <div>Built with Next.js • Supabase • Clerk</div>
        </div>
      </div>
    </footer>
  );
}
