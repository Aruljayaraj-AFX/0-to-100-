// Background.jsx 
export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#FDFCFF] overflow-hidden">
      {/* Grid pattern with dots - responsive sizing */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: `radial-gradient(circle, #EFE1FF 1px, transparent 1px)`,
          // Responsive background sizes: smaller on mobile, larger on desktop
          backgroundSize: '4px 4px',
          opacity: 0.4
        }}
      >
      </div>
      
      {/* Media query styles for different screen sizes */}
      <style jsx>{`
        @media (min-width: 640px) {
          div[style*="backgroundSize"] {
            background-size: 4px 4px;
          }
        }
        @media (min-width: 1024px) {
          div[style*="backgroundSize"] {
            background-size: 5px 5px;
          }
        }
      `}</style>
    </div>
  );
}