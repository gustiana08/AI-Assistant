export default function Footer() {
  return (
    <footer className="border-t border-bg-line bg-bg-soft py-8">
      <div className="mx-auto max-w-6xl px-4 md:px-8 text-center">
        <p className="text-sm text-ink-dim">
          &copy; {new Date().getFullYear()} AI Assistant. Built with React + Vite + Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
