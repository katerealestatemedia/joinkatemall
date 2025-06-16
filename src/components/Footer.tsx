
export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-kate-gold/20 via-kate-gold/10 to-kate-gold/20 backdrop-blur-xl border-t border-kate-gold/30 text-gray-800 py-8 z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <img 
              src="/lovable-uploads/031bd7b9-24e7-45fc-9aed-b565fa498861.png" 
              alt="Kate Mall Logo" 
              className="w-6 h-6 object-contain drop-shadow-lg"
            />
            <span className="text-lg font-bold text-gray-800 drop-shadow-sm">
              Kate Mall
            </span>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-700 drop-shadow-sm">
              © 2024 Kate Mall. All rights reserved.
            </p>
            <p className="text-xs text-gray-600 mt-1 drop-shadow-sm">
              Qatar's Premier Shopping & Business Destination
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
