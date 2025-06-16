
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from "lucide-react"

interface FinalDetailsStepProps {
  formData: any
  onInputChange: (field: string, value: string | File | null) => void
}

export default function FinalDetailsStep({ formData, onInputChange }: FinalDetailsStepProps) {
  return (
    <div className="w-full space-y-8 md:space-y-12">
      <div className="space-y-4 md:space-y-6">
        <Label htmlFor="businessProfile" className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 block">
          Business Presentation <span className="text-gray-500 font-normal text-base md:text-lg">(Optional)</span>
        </Label>
        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 md:p-8 text-center hover:border-kate-teal hover:bg-kate-teal/5 transition-all duration-300 group">
          <input
            id="businessProfile"
            type="file"
            accept=".pdf,.doc,.docx,.ppt,.pptx"
            onChange={(e) => onInputChange("businessProfile", e.target.files?.[0] || null)}
            className="hidden"
          />
          <label htmlFor="businessProfile" className="cursor-pointer">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-kate-teal/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-kate-teal/20 transition-all duration-300">
                <Upload className="w-6 h-6 md:w-8 md:h-8 text-kate-teal" />
              </div>
              <p className="text-base md:text-lg text-gray-700 font-medium mb-2">
                {formData.businessProfile
                  ? `📄 ${formData.businessProfile.name}`
                  : "Upload your business presentation"}
              </p>
              <p className="text-sm text-gray-500">
                PDF, DOC, DOCX, PPT, PPTX (Max 10MB)
              </p>
            </div>
          </label>
        </div>
        <p className="text-sm md:text-base text-gray-500">
          💼 Share your business plan, portfolio, or any relevant documents
        </p>
      </div>

      <div className="space-y-4 md:space-y-6">
        <Label htmlFor="additionalNotes" className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 block">
          Tell us more about your vision <span className="text-gray-500 font-normal text-base md:text-lg">(Optional)</span>
        </Label>
        <Textarea
          id="additionalNotes"
          value={formData.additionalNotes}
          onChange={(e) => onInputChange("additionalNotes", e.target.value)}
          className="w-full text-base md:text-lg p-4 md:p-6 border-2 border-gray-200 rounded-2xl focus:border-kate-teal focus:ring-kate-teal/20 transition-all duration-300 min-h-[120px] md:min-h-[150px] resize-none hover:border-kate-teal/50"
          placeholder="Share your business story, goals, special requirements, or anything else that makes your brand unique..."
        />
        <p className="text-sm md:text-base text-gray-500">
          ✨ This is your chance to shine and tell us what makes you special
        </p>
      </div>
    </div>
  )
}
