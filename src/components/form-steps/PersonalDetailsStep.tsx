
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PersonalDetailsStepProps {
  formData: any
  onInputChange: (field: string, value: string) => void
}

export default function PersonalDetailsStep({ formData, onInputChange }: PersonalDetailsStepProps) {
  // Auto-add +974 prefix when phone field is focused and empty
  const handlePhoneFocus = () => {
    if (!formData.phoneNumber || formData.phoneNumber === "") {
      onInputChange("phoneNumber", "+974 ")
    }
  }

  const handlePhoneChange = (value: string) => {
    // Ensure +974 prefix is always maintained
    if (!value.startsWith("+974")) {
      if (value === "" || value === "+") {
        onInputChange("phoneNumber", "+974 ")
      } else {
        onInputChange("phoneNumber", "+974 " + value.replace(/^\+?974?\s*/, ""))
      }
    } else {
      onInputChange("phoneNumber", value)
    }
  }

  return (
    <div className="w-full space-y-8 md:space-y-12">
      <div className="space-y-4 md:space-y-6">
        <Label htmlFor="fullName" className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 block">
          What's your full name? *
        </Label>
        <Input
          id="fullName"
          type="text"
          value={formData.fullName}
          onChange={(e) => onInputChange("fullName", e.target.value)}
          className="w-full text-lg md:text-xl lg:text-2xl p-4 md:p-6 lg:p-8 border-2 border-gray-200 rounded-2xl focus:border-kate-teal focus:ring-kate-teal/20 transition-all duration-300 hover:border-kate-teal/50"
          placeholder="Enter your full name"
          autoFocus
        />
      </div>

      <div className="space-y-4 md:space-y-6">
        <Label htmlFor="phoneNumber" className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 block">
          What's your phone number? *
        </Label>
        <Input
          id="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={(e) => handlePhoneChange(e.target.value)}
          onFocus={handlePhoneFocus}
          className="w-full text-lg md:text-xl lg:text-2xl p-4 md:p-6 lg:p-8 border-2 border-gray-200 rounded-2xl focus:border-kate-teal focus:ring-kate-teal/20 transition-all duration-300 hover:border-kate-teal/50"
          placeholder="+974 XXXX XXXX"
        />
        <p className="text-sm md:text-base text-gray-500 mt-2">
          📱 We'll use this to contact you about your application
        </p>
      </div>
    </div>
  )
}
