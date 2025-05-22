// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="max-w-4xl mx-auto text-center">
        <p>© {new Date().getFullYear()} Contest Tracker. All rights reserved.</p>
      </div>
    </footer>
  );
}
