
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Sparkles, Clock, Award } from "lucide-react"

interface SuccessPageProps {
  onReset: () => void
}

export default function SuccessPage({ onReset }: SuccessPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-kate-teal-light/20 via-white to-kate-gold-light/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-2xl border-0 rounded-3xl overflow-hidden bg-white/95 backdrop-blur-sm">
        <CardContent className="p-12 text-center">
          <div className="animate-bounce-in">
            {/* Success Icon */}
            <div className="w-24 h-24 bg-gradient-to-r from-kate-teal to-kate-gold rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>

            {/* Kate Mall Logo */}
            <img 
              src="/lovable-uploads/031bd7b9-24e7-45fc-9aed-b565fa498861.png" 
              alt="Kate Mall Logo" 
              className="w-20 h-20 mx-auto mb-6 object-contain"
            />

            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Application Submitted Successfully!
            </h2>

            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Welcome to the Kate Mall family! We're excited to review your application and help bring your business vision to life.
            </p>

            {/* Benefits Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-kate-teal/10 rounded-2xl p-6 border border-kate-teal/20">
                <Clock className="w-8 h-8 text-kate-teal mx-auto mb-3" />
                <h3 className="font-bold text-kate-teal mb-2">Quick Response</h3>
                <p className="text-sm text-gray-600">We'll contact you within 24 hours</p>
              </div>
              
              <div className="bg-kate-gold/10 rounded-2xl p-6 border border-kate-gold/20">
                <Sparkles className="w-8 h-8 text-kate-gold mx-auto mb-3" />
                <h3 className="font-bold text-kate-gold mb-2">Grace Period</h3>
                <p className="text-sm text-gray-600">6 months for approved tenants</p>
              </div>
              
              <div className="bg-gradient-to-br from-kate-teal/10 to-kate-gold/10 rounded-2xl p-6 border border-kate-teal/20">
                <Award className="w-8 h-8 text-kate-teal mx-auto mb-3" />
                <h3 className="font-bold text-kate-teal mb-2">Premium Location</h3>
                <p className="text-sm text-gray-600">Qatar's finest retail destination</p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-kate-teal/5 to-kate-gold/5 rounded-2xl p-8 mb-8 border border-kate-teal/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">What's Next?</h3>
              <div className="space-y-3 text-left max-w-md mx-auto">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-kate-teal rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">1</div>
                  <span className="text-gray-700">Our team reviews your application</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-kate-teal rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">2</div>
                  <span className="text-gray-700">We schedule a meeting to discuss details</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-kate-gold rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">3</div>
                  <span className="text-gray-700">Welcome to Kate Mall!</span>
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={onReset}
            className="bg-gradient-to-r from-kate-teal to-kate-gold hover:from-kate-teal-dark hover:to-kate-gold-dark text-white px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg text-lg font-semibold"
          >
            Submit Another Application
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
