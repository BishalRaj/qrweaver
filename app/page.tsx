import QRGenerator from "@/components/qr-generator"
import SaasHeader from "@/components/saas-header"
import SaasFeatures from "@/components/saas-features"
import SaasPricing from "@/components/saas-pricing"
import SaasTestimonials from "@/components/saas-testimonials"
import SaasFooter from "@/components/saas-footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "NeonQR - Professional QR Code Generator",
  description: "Create customized QR codes for your business with our neon-themed generator",
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <SaasHeader />
      <main>
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <QRGenerator />
        </section>
        <SaasFeatures />
        <SaasPricing />
        <SaasTestimonials />
      </main>
      <SaasFooter />
    </div>
  )
}

