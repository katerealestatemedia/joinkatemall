
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BusinessVisionStepProps {
  formData: any
  onInputChange: (field: string, value: string) => void
}

export default function BusinessVisionStep({ formData, onInputChange }: BusinessVisionStepProps) {
  return (
    <div className="w-full space-y-8 md:space-y-12">
      <div className="space-y-4 md:space-y-6">
        <Label htmlFor="businessType" className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 block">
          What type of business do you run? *
        </Label>
        <Select
          value={formData.businessType}
          onValueChange={(value) => onInputChange("businessType", value)}
        >
          <SelectTrigger className="w-full text-lg md:text-xl lg:text-2xl p-4 md:p-6 lg:p-8 border-2 border-gray-200 rounded-2xl focus:border-kate-teal focus:ring-kate-teal/20 transition-all duration-300 hover:border-kate-teal/50">
            <SelectValue placeholder="Select your business type" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-2 bg-white/95 backdrop-blur-sm">
            <SelectItem value="restaurant" className="text-lg p-4 rounded-xl">🍽️ Restaurant</SelectItem>
            <SelectItem value="cafe" className="text-lg p-4 rounded-xl">☕ Café</SelectItem>
            <SelectItem value="retail" className="text-lg p-4 rounded-xl">🛍️ Retail Store</SelectItem>
            <SelectItem value="beauty" className="text-lg p-4 rounded-xl">💄 Beauty & Wellness</SelectItem>
            <SelectItem value="services" className="text-lg p-4 rounded-xl">🔧 Professional Services</SelectItem>
            <SelectItem value="entertainment" className="text-lg p-4 rounded-xl">🎮 Entertainment</SelectItem>
            <SelectItem value="other" className="text-lg p-4 rounded-xl">📋 Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4 md:space-y-6">
        <Label htmlFor="brandName" className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 block">
          What's your brand name? *
        </Label>
        <Input
          id="brandName"
          type="text"
          value={formData.brandName}
          onChange={(e) => onInputChange("brandName", e.target.value)}
          className="w-full text-lg md:text-xl lg:text-2xl p-4 md:p-6 lg:p-8 border-2 border-gray-200 rounded-2xl focus:border-kate-teal focus:ring-kate-teal/20 transition-all duration-300 hover:border-kate-teal/50"
          placeholder="Your amazing brand name"
        />
      </div>

      <div className="space-y-4 md:space-y-6">
        <Label htmlFor="websiteSocial" className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 block">
          Website or Social Media <span className="text-gray-500 font-normal text-base md:text-lg">(Optional)</span>
        </Label>
        <Input
          id="websiteSocial"
          type="url"
          value={formData.websiteSocial}
          onChange={(e) => onInputChange("websiteSocial", e.target.value)}
          className="w-full text-lg md:text-xl lg:text-2xl p-4 md:p-6 lg:p-8 border-2 border-gray-200 rounded-2xl focus:border-kate-teal focus:ring-kate-teal/20 transition-all duration-300 hover:border-kate-teal/50"
          placeholder="www.yourbrand.com or @instagram"
        />
        <p className="text-sm md:text-base text-gray-500 mt-2">
          🌐 Help us understand your brand better
        </p>
      </div>
    </div>
  )
}
