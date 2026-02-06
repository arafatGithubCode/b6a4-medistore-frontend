import { Heart, Pill, Shield, Truck } from "lucide-react";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-700 dark:from-blue-900 dark:to-indigo-900 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            About MediStore
          </h1>
          <p className="text-lg text-blue-100">
            Your trusted partner in healthcare and wellness
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Mission */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            At MediStore, we believe that access to quality medicines should be
            simple, convenient, and reliable. Our mission is to bridge the gap
            between patients and healthcare by providing a trusted online
            platform where you can find genuine medicines and health products
            delivered right to your doorstep.
          </p>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Heart className="w-8 h-8 text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  Quality & Trust
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Every medicine is verified and sourced from authorized
                  distributors to ensure authenticity and quality.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Truck className="w-8 h-8 text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  Fast Delivery
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  We prioritize quick and reliable delivery to get your
                  medicines to you when you need them most.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Shield className="w-8 h-8 text-green-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  Data Security
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Your health information and personal data are encrypted and
                  protected with industry-leading security standards.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Pill className="w-8 h-8 text-purple-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  Expert Support
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Our team of licensed pharmacists is available 24/7 to answer
                  your questions and provide guidance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Why Choose MediStore?
          </h2>
          <ul className="space-y-3 text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                ✓
              </span>
              <span>5000+ medicines from trusted brands</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                ✓
              </span>
              <span>Competitive pricing with regular discounts</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                ✓
              </span>
              <span>Easy refunds and replacements</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                ✓
              </span>
              <span>Prescription verification by licensed pharmacists</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                ✓
              </span>
              <span>Free delivery on orders above $50</span>
            </li>
          </ul>
        </section>

        {/* Contact CTA */}
        <section className="bg-slate-100 dark:bg-slate-900 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Have Questions?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Get in touch with our team. We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
                Start Shopping
              </button>
            </Link>
            <a href="mailto:support@medistore.com">
              <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 transition">
                Contact Us
              </button>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
