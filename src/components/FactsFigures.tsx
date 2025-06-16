
export default function FactsFigures() {
  const facts = [
    { number: "01", label: "BUILT-UP AREA :", value: "140,000 ㎡" },
    { number: "02", label: "LEASABLE AREA :", value: "57,000 ㎡" },
    { number: "03", label: "OFFICE SPACE :", value: "15%" },
    { number: "04", label: "DEPARTMENT STORE :", value: "5,600 ㎡" },
    { number: "05", label: "PLAZA :", value: "9,000 ㎡" },
    { number: "06", label: "CINEMA :", value: "3,000 ㎡" },
    { number: "07", label: "ENTERTAINMENT :", value: "3,200 ㎡" },
    { number: "08", label: "PARKING SPACES :", value: "Ample" },
  ]

  const units = [
    { type: "SMALL RETAIL", count: "66 UNITS", size: "Various sizes" },
    { type: "BIG RETAIL", count: "30 UNITS", size: "Various sizes" },
    { type: "PLAZA", count: "2 UNITS", size: "Business & Medical Centers, 4,400 ㎡ each" },
    { type: "LANDMARK", count: "2 UNITS", size: "2,500 ㎡ each" },
    { type: "DINING RESTAURANT", count: "16 UNITS", size: "Starting from 80 ㎡" },
    { type: "FOOD COURT", count: "22 UNITS", size: "Various sizes" },
    { type: "ENTERTAINMENT", count: "2 AREAS", size: "1,600 ㎡ each" },
  ]

  return (
    <div className="relative bg-gray-50 py-16 px-4 z-10 overflow-hidden">
      <div className="relative max-w-6xl mx-auto z-20">
        {/* Facts & Figures Header */}
        <div className="mb-12 animate-fade-in-up">
          <div className="flex items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 tracking-wider">FACTS & FIGURE</h2>
            <div className="ml-6 h-0.5 bg-kate-gold flex-1 max-w-20"></div>
          </div>
        </div>

        {/* Facts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {facts.map((fact, index) => (
            <div 
              key={fact.number} 
              className="relative bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 animate-fade-in-up border border-white/20 z-30"
              style={{ animationDelay: `${index * 0.1}s`, animationDuration: '0.8s' }}
            >
              <div className="text-kate-gold font-bold text-lg mb-2">{fact.number}</div>
              <div className="text-gray-800 font-semibold text-sm mb-2">{fact.label}</div>
              <div className="text-2xl font-bold text-gray-900">{fact.value}</div>
            </div>
          ))}
        </div>

        {/* Units Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>UNITS</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {units.map((unit, index) => (
              <div 
                key={index} 
                className="relative bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-500 border-l-4 border-kate-gold hover:scale-105 animate-fade-in-up border border-white/20 z-30 transform hover:-translate-y-2"
                style={{ 
                  animationDelay: `${index * 0.15 + 0.8}s`,
                  animationDuration: '1s',
                  transform: 'translateY(40px)',
                  opacity: '0',
                  animation: `fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards ${index * 0.15 + 0.8}s`
                }}
              >
                <div className="text-kate-gold font-bold text-lg mb-2">{unit.type}</div>
                <div className="text-gray-900 font-semibold text-xl mb-1">{unit.count}</div>
                <div className="text-gray-600 text-sm">{unit.size}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
