"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight, ArrowLeft, X } from "lucide-react"
import PersonalDetailsStep from "./form-steps/PersonalDetailsStep"
import BusinessVisionStep from "./form-steps/BusinessVisionStep"
import SpaceRequirementsStep from "./form-steps/SpaceRequirementsStep"
import FinalDetailsStep from "./form-steps/FinalDetailsStep"
import SuccessPage from "./SuccessPage"
import FactsFigures from "./FactsFigures"
import Header from "./Header"
import Footer from "./Footer"

export default function TenantApplicationForm() {
  const [showForm, setShowForm] = useState(false)
  const [showFeatures, setShowFeatures] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right')
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    businessType: "",
    brandName: "",
    websiteSocial: "",
    monthlyBudget: "",
    unitSize: "",
    businessProfile: null as File | null,
    additionalNotes: "",
  })

  const handleInputChange = (field: string, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      setSlideDirection('right')
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setSlideDirection('left')
      setCurrentStep(currentStep - 1)
    }
  }

  const handleExit = () => {
    setShowForm(false)
    setCurrentStep(1)
    setFormData({
      fullName: "",
      phoneNumber: "",
      businessType: "",
      brandName: "",
      websiteSocial: "",
      monthlyBudget: "",
      unitSize: "",
      businessProfile: null,
      additionalNotes: "",
    })
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Convert PDF file to base64 if it exists
      let businessProfileBase64 = null
      let fileName = null
      let fileType = null
      let fileSize = null
      
      if (formData.businessProfile) {
        businessProfileBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => {
            const result = reader.result as string
            resolve(result)
          }
          reader.onerror = reject
          reader.readAsDataURL(formData.businessProfile!)
        })
        
        fileName = formData.businessProfile.name
        fileType = formData.businessProfile.type
        fileSize = formData.businessProfile.size
      }

      // Prepare form data for webhook
      const submissionData = {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        businessType: formData.businessType,
        brandName: formData.brandName,
        websiteSocial: formData.websiteSocial,
        monthlyBudget: formData.monthlyBudget,
        unitSize: formData.unitSize,
        additionalNotes: formData.additionalNotes,
        submittedAt: new Date().toISOString(),
      }

      // Create a separate file object for n8n to process more easily
      const fileData = businessProfileBase64 ? {
        // Use a standard field name that n8n will recognize
        file: {
          // Include metadata
          name: fileName,
          type: fileType,
          size: fileSize,
          // The data URL contains both the MIME type and the base64 data
          data: businessProfileBase64,
          // This flag helps n8n identify this as binary data
          binary: true,
          // Add a property to indicate this should be treated as an attachment
          isAttachment: true
        }
      } : {};

      console.log('Sending submission data:', { ...submissionData, file: fileData.file ? 'File included' : null })

      const response = await fetch('https://n8n.welovebuzz.io/webhook/d022c12a-f227-4536-b426-12977b5ec1f6', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...submissionData,
          ...fileData
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        alert("Failed to submit application. Please try again.")
      }
    } catch (error) {
      console.error("Submission error:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const steps = [
    {
      id: 1,
      title: "Personal Details",
      subtitle: "Let's start with your information",
      fields: ["fullName", "phoneNumber"],
      component: PersonalDetailsStep
    },
    {
      id: 2,
      title: "Business Vision",
      subtitle: "Tell us about your business",
      fields: ["businessType", "brandName", "websiteSocial"],
      component: BusinessVisionStep
    },
    {
      id: 3,
      title: "Space Requirements",
      subtitle: "What are your needs?",
      fields: ["monthlyBudget", "unitSize"],
      component: SpaceRequirementsStep
    },
    {
      id: 4,
      title: "Final Details",
      subtitle: "Almost there!",
      fields: ["businessProfile", "additionalNotes"],
      component: FinalDetailsStep
    },
  ]

  const isStepValid = () => {
    const currentStepFields = steps[currentStep - 1].fields
    return currentStepFields.every((field) => {
      if (field === "websiteSocial" || field === "businessProfile" || field === "additionalNotes") {
        return true // Optional fields
      }
      return formData[field as keyof typeof formData] !== ""
    })
  }

  const progress = (currentStep / steps.length) * 100

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 pt-16">
          <SuccessPage onReset={() => {
            setIsSubmitted(false)
            setCurrentStep(1)
            setShowForm(false)
            setFormData({
              fullName: "",
              phoneNumber: "",
              businessType: "",
              brandName: "",
              websiteSocial: "",
              monthlyBudget: "",
              unitSize: "",
              businessProfile: null,
              additionalNotes: "",
            })
          }} />
        </div>
        <Footer />
      </div>
    )
  }

  if (!showForm) {
    // Landing page with Join Now button
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="relative overflow-hidden flex-1 pt-16">
          {/* Background with animated gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-kate-teal-light/30 via-white to-kate-gold-light/30 -z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-kate-gold-light/20 via-transparent to-kate-teal-light/20 animate-pulse -z-10"></div>
          
          {/* Floating glass orbs */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-kate-teal/10 rounded-full blur-xl animate-float -z-10"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-kate-gold/10 rounded-full blur-xl animate-float-delayed -z-10"></div>
          <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-kate-teal/5 rounded-full blur-2xl animate-float-slow -z-10"></div>

          <div className="relative min-h-full flex flex-col">
            {/* Header with Logo */}
            <div className="text-center pt-8 md:pt-16 pb-8 animate-fade-in-down flex-1 flex flex-col justify-center px-4">
              <div className="mb-8 animate-scale-fade-in">
                <img 
                  src="/lovable-uploads/031bd7b9-24e7-45fc-9aed-b565fa498861.png" 
                  alt="Kate Mall Logo" 
                  className="w-24 h-24 md:w-32 md:h-32 mx-auto object-contain drop-shadow-lg"
                />
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 px-4 animate-fade-in-up bg-gradient-to-r from-gray-900 via-kate-teal to-kate-gold bg-clip-text text-transparent">
                Join Kate Mall Family
              </h1>

              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto px-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Qatar's premier shopping destination awaits your business
              </p>

              {/* Enhanced Grace Period Banner - Clean animated text */}
              <div className="relative inline-flex items-center justify-center mb-8 mx-4 animate-floating-text">
                <div className="flex items-center px-2 py-2 text-gray-800 font-bold text-lg">
                  <span className="animate-bounce mr-2 text-2xl">🎉</span>
                  <span className="bg-gradient-to-r from-kate-gold via-kate-teal to-kate-gold bg-clip-text text-transparent animate-gradient-shift font-extrabold">
                    Limited Time: 6 Months Grace Period
                  </span>
                  <span className="animate-bounce ml-2 text-2xl">✨</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 px-4">
                <Button
                  onClick={() => setShowForm(true)}
                  className="group relative w-full sm:w-auto px-8 md:px-12 py-4 md:py-6 text-lg md:text-xl bg-gradient-to-r from-kate-teal to-kate-gold hover:from-kate-teal-dark hover:to-kate-gold-dark text-white rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-scale-fade-in overflow-hidden z-10"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative flex items-center font-semibold">
                    Join Now
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>

                <Button
                  onClick={() => setShowFeatures(true)}
                  variant="outline"
                  className="group w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 text-base md:text-lg border-2 border-kate-teal/30 bg-white/30 backdrop-blur-md text-kate-teal hover:bg-kate-teal hover:text-white rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-lg z-10"
                >
                  <span className="group-hover:scale-110 transition-transform duration-300">View Features</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Facts & Figures Section - Only show when requested */}
          {showFeatures && (
            <div className="animate-fade-in-up">
              <FactsFigures />
            </div>
          )}
        </div>
        <Footer />
      </div>
    )
  }

  const CurrentStepComponent = steps[currentStep - 1].component

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="relative min-h-screen overflow-hidden flex-1 pt-16">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-kate-teal-light/20 via-white to-kate-gold-light/20 -z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-kate-gold-light/10 via-transparent to-kate-teal-light/15 animate-pulse -z-10"></div>
        
        {/* Floating elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-kate-teal/10 rounded-full blur-xl animate-float -z-10"></div>
        <div className="absolute top-1/3 right-10 w-16 h-16 bg-kate-gold/10 rounded-full blur-lg animate-float-delayed -z-10"></div>
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-kate-teal/5 rounded-full blur-2xl animate-float-slow -z-10"></div>

        <div className="relative flex flex-col min-h-full">
          {/* Progress Bar - Fixed at top with glass effect */}
          <div className="w-full bg-white/30 backdrop-blur-md border-b border-white/20 p-4 md:p-6 shadow-lg z-10">
            <div className="max-w-md mx-auto">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs md:text-sm font-medium text-gray-600">Progress</span>
                <span className="text-xs md:text-sm font-bold text-kate-teal drop-shadow-sm">{Math.round(progress)}%</span>
              </div>
              <div className="relative h-2 bg-white/30 backdrop-blur-sm rounded-full overflow-hidden shadow-inner">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-kate-teal to-kate-gold rounded-full transition-all duration-700 ease-out shadow-lg"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${
                      index + 1 <= currentStep 
                        ? "bg-kate-teal shadow-lg scale-110 shadow-kate-teal/50" 
                        : "bg-white/40 scale-100"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Full Screen Question Container */}
          <div className="flex-1 flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-2xl mx-auto">
              <Card className="shadow-2xl border-0 rounded-3xl overflow-hidden bg-white/20 backdrop-blur-xl border border-white/30 hover:bg-white/25 transition-all duration-500 z-10">
                <CardContent className="p-0">
                  {/* Step Content - Full Screen Question */}
                  <div className="relative min-h-[70vh] md:min-h-[60vh] overflow-hidden">
                    <div 
                      key={currentStep}
                      className={`p-6 md:p-12 h-full flex flex-col justify-center ${
                        slideDirection === 'right' 
                          ? 'animate-slide-in-right' 
                          : 'animate-slide-in-left'
                      }`}
                    >
                      {/* Step Header */}
                      <div className="mb-8 md:mb-12 animate-fade-in-up text-center md:text-left">
                        <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
                          <div className="relative w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-kate-teal to-kate-gold rounded-2xl flex items-center justify-center text-white font-bold text-lg md:text-xl mb-4 md:mb-0 md:mr-4 shadow-lg hover:scale-110 transition-transform duration-300">
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl"></div>
                            <span className="relative">{currentStep}</span>
                          </div>
                          <div className="text-center md:text-left">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 bg-gradient-to-r from-gray-900 to-kate-teal bg-clip-text text-transparent">
                              {steps[currentStep - 1].title}
                            </h2>
                            <p className="text-base md:text-lg text-gray-600">
                              {steps[currentStep - 1].subtitle}
                            </p>
                          </div>
                        </div>
                        <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-kate-teal to-kate-gold rounded-full mx-auto md:mx-0 shadow-lg"></div>
                      </div>

                      {/* Dynamic Step Component */}
                      <div className="animate-fade-in-up flex-1 flex items-center z-10" style={{ animationDelay: '0.2s' }}>
                        <CurrentStepComponent 
                          formData={formData}
                          onInputChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Navigation - Fixed at bottom with glass effect */}
                  <div className="px-6 md:px-12 pb-6 md:pb-8 bg-white/10 backdrop-blur-md border-t border-white/20">
                    <div className="flex justify-between items-center pt-4 md:pt-6">
                      {/* Left side - Exit button for first step, Previous for others */}
                      {currentStep === 1 ? (
                        <Button
                          type="button"
                          onClick={handleExit}
                          variant="outline"
                          className="group px-4 md:px-6 py-2 md:py-3 border-2 border-white/30 bg-white/20 backdrop-blur-sm text-gray-700 rounded-xl hover:bg-white/30 transition-all duration-300 hover:scale-105 text-sm md:text-base z-10"
                        >
                          <X className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 group-hover:rotate-90 transition-transform duration-300" />
                          Exit
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          onClick={handlePrev}
                          variant="outline"
                          className="group px-4 md:px-6 py-2 md:py-3 border-2 border-white/30 bg-white/20 backdrop-blur-sm text-gray-700 rounded-xl hover:bg-white/30 transition-all duration-300 hover:scale-105 text-sm md:text-base z-10"
                        >
                          <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                          Previous
                        </Button>
                      )}

                      {/* Right side - Continue or Submit */}
                      {currentStep < steps.length ? (
                        <Button
                          type="button"
                          onClick={handleNext}
                          disabled={!isStepValid()}
                          className="group px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-kate-teal to-kate-gold hover:from-kate-teal-dark hover:to-kate-gold-dark text-white rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:shadow-lg text-sm md:text-base overflow-hidden relative z-10"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <span className="relative flex items-center font-semibold">
                            Continue
                            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                          </span>
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="group px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-kate-teal to-kate-gold hover:from-kate-teal-dark hover:to-kate-gold-dark text-white rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:shadow-lg text-sm md:text-base overflow-hidden relative z-10"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <span className="relative flex items-center font-semibold">
                            {isSubmitting ? (
                              <>
                                <div className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Submitting...
                              </>
                            ) : (
                              <>
                                Submit Application
                                <CheckCircle className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2 group-hover:scale-110 transition-transform duration-300" />
                              </>
                            )}
                          </span>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
