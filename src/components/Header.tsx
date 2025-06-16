
import { Building2 } from "lucide-react"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-kate-gold/15 via-kate-gold/10 to-kate-gold/15 backdrop-blur-xl border-b border-kate-gold/25 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/031bd7b9-24e7-45fc-9aed-b565fa498861.png" 
              alt="Kate Mall Logo" 
              className="w-8 h-8 object-contain drop-shadow-lg"
            />
            <span className="text-lg font-bold text-gray-800 drop-shadow-sm">
              Kate Mall
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="p-2 bg-kate-gold/20 rounded-full backdrop-blur-sm border border-kate-gold/30">
              <Building2 className="w-5 h-5 text-gray-700 drop-shadow-sm" />
            </div>
            <span className="text-sm text-gray-700 font-medium drop-shadow-sm hidden md:block">
              Qatar's Premier Shopping Destination
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
