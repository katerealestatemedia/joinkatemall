
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SpaceRequirementsStepProps {
  formData: any
  onInputChange: (field: string, value: string) => void
}

export default function SpaceRequirementsStep({ formData, onInputChange }: SpaceRequirementsStepProps) {
  return (
    <div className="w-full space-y-8 md:space-y-12">
      <div className="space-y-4 md:space-y-6">
        <Label htmlFor="monthlyBudget" className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 block">
          What's your monthly budget? *
        </Label>
        <Select
          value={formData.monthlyBudget}
          onValueChange={(value) => onInputChange("monthlyBudget", value)}
        >
          <SelectTrigger className="w-full text-lg md:text-xl lg:text-2xl p-4 md:p-6 lg:p-8 border-2 border-gray-200 rounded-2xl focus:border-kate-teal focus:ring-kate-teal/20 transition-all duration-300 hover:border-kate-teal/50">
            <SelectValue placeholder="Select your budget range" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-2 bg-white/95 backdrop-blur-sm">
            <SelectItem value="under-5000" className="text-lg p-4 rounded-xl">💰 Under 5,000 QAR</SelectItem>
            <SelectItem value="5000-10000" className="text-lg p-4 rounded-xl">💰💰 5,000 - 10,000 QAR</SelectItem>
            <SelectItem value="10000-20000" className="text-lg p-4 rounded-xl">💰💰💰 10,000 - 20,000 QAR</SelectItem>
            <SelectItem value="20000-50000" className="text-lg p-4 rounded-xl">💎 20,000 - 50,000 QAR</SelectItem>
            <SelectItem value="over-50000" className="text-lg p-4 rounded-xl">👑 50,000+ QAR</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm md:text-base text-gray-500 mt-2">
          💡 This helps us match you with the perfect space
        </p>
      </div>

      <div className="space-y-4 md:space-y-6">
        <Label htmlFor="unitSize" className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 block">
          What size space do you need? *
        </Label>
        <Select value={formData.unitSize} onValueChange={(value) => onInputChange("unitSize", value)}>
          <SelectTrigger className="w-full text-lg md:text-xl lg:text-2xl p-4 md:p-6 lg:p-8 border-2 border-gray-200 rounded-2xl focus:border-kate-teal focus:ring-kate-teal/20 transition-all duration-300 hover:border-kate-teal/50">
            <SelectValue placeholder="Select your preferred space size" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-2 bg-white/95 backdrop-blur-sm">
            <SelectItem value="under-50" className="text-lg p-4 rounded-xl">🏪 Cozy (Under 50 sqm)</SelectItem>
            <SelectItem value="50-100" className="text-lg p-4 rounded-xl">🏬 Standard (50-100 sqm)</SelectItem>
            <SelectItem value="100-200" className="text-lg p-4 rounded-xl">🏢 Spacious (100-200 sqm)</SelectItem>
            <SelectItem value="200-500" className="text-lg p-4 rounded-xl">🏰 Large (200-500 sqm)</SelectItem>
            <SelectItem value="over-500" className="text-lg p-4 rounded-xl">🌟 Premium (500+ sqm)</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm md:text-base text-gray-500 mt-2">
          📏 We have various sizes available to fit your vision
        </p>
      </div>
    </div>
  )
}
