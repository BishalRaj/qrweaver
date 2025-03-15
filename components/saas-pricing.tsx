import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SaasPricing() {
  return (
    <section id="pricing" className="py-20 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">Choose the plan that's right for your business</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-purple-900/10 transition-all duration-300">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-2">Free</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-gray-400 ml-2">/month</span>
              </div>
              <p className="text-gray-400 mb-6">Perfect for individuals and small projects</p>

              <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white">Get Started</Button>
            </div>

            <div className="border-t border-gray-800 p-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-cyan-400 mr-2 mt-0.5" />
                  <span className="text-gray-300">Up to 5 QR codes</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-cyan-400 mr-2 mt-0.5" />
                  <span className="text-gray-300">Basic customization</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-cyan-400 mr-2 mt-0.5" />
                  <span className="text-gray-300">Standard analytics</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-cyan-400 mr-2 mt-0.5" />
                  <span className="text-gray-300">Email support</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="bg-gray-900/60 border-2 border-purple-500/50 rounded-xl overflow-hidden shadow-lg shadow-purple-900/10 transform md:-translate-y-4 relative">
            <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-center py-1 text-sm font-medium">
              Most Popular
            </div>

            <div className="p-6 pt-9">
              <h3 className="text-xl font-semibold text-white mb-2">Pro</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-white">$19</span>
                <span className="text-gray-400 ml-2">/month</span>
              </div>
              <p className="text-gray-400 mb-6">For growing businesses and teams</p>

              <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white">
                Get Started
              </Button>
            </div>

            <div className="border-t border-gray-800 p-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-cyan-400 mr-2 mt-0.5" />
                  <span className="text-gray-300">Unlimited QR codes</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-cyan-400 mr-2 mt-0.5" />
                  <span className="text-gray-300">Advanced customization</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-cyan-400 mr-2 mt-0.5" />
                  <span className="text-gray-300">Detailed analytics</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-cyan-400 mr-2 mt-0.5" />
                  <span className="text-gray-300">Priority support</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-cyan-400 mr-2 mt-0.5" />
                  <span className="text-gray-300">Custom logo upload</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-cyan-400 mr-2 mt-0.5" />
                  <span className="text-gray-300">Bulk generation (up to 100)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-purple-900/10 transition-all duration-300">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-2">Enterprise</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-white">$49</span>
                <span className="text-gray-400 ml-2">/month</span>
              </div>
              <p className="text-gray-400 mb-6">For large organizations and agencies</p>

              <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white">Contact Sales</Button>
            </div>

            <div className="border-t border-gray-800 p-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-cyan-400 mr-2 mt-0.5" />
                  <span className="text-gray-300">Everything in Pro</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-cyan-400 mr-2 mt-0.5" />
                  <span className="text-gray-300">Unlimited bulk generation</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-cyan-400 mr-2 mt-0.5" />
                  <span className="text-gray-300">API access</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-cyan-400 mr-2 mt-0.5" />
                  <span className="text-gray-300">White-label options</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-cyan-400 mr-2 mt-0.5" />
                  <span className="text-gray-300">Dedicated account manager</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-cyan-400 mr-2 mt-0.5" />
                  <span className="text-gray-300">Custom integrations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

