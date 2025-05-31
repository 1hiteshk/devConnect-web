import React from 'react'
// src/components/PrivacyPolicy.js
export const PrivacyPolicy=()=> {
  return (
    <section className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <p>
        DevConnectsDE respects your privacy. This Privacy Policy explains how we collect,
        use, disclose, and safeguard your information when you visit our platform. We do
        not sell your data. Information shared is strictly used for improving user
        experience and connecting developers in a secure, transparent way.
      </p>
    </section>
  );
}

// src/components/TermsAndConditions.js
export  function TermsAndConditions() {
  return (
    <section className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Terms & Conditions</h1>
      <p>
        By using DevConnectsDE, you agree to our terms. Users are expected to engage
        professionally. Misuse of features, fake profiles, or harassment will lead to
        account suspension. We reserve the right to update terms as necessary.
      </p>
    </section>
  );
}

// src/components/RefundPolicy.js
export  function RefundPolicy() {
  return (
    <section className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Refund Policy</h1>
      <p>
        DevConnectsDE offers a digital service. Payments for premium features are final.
        However, if you experience technical issues or errors, please contact us within
        7 days for resolution or possible refund.
      </p>
    </section>
  );
}

// src/components/ShippingPolicy.js
export  function ShippingPolicy() {
  return (
    <section className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Shipping Policy</h1>
      <p>
        As a digital platform, DevConnectsDE does not offer physical goods. All services
        are delivered electronically. Upon payment, features are activated immediately or
        as scheduled.
      </p>
    </section>
  );
}

// src/components/AboutUs.js
export  function AboutUs() {
  return (
    <section className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">About Us</h1>
      <p>
        DevConnectsDE is a hybrid of LinkedIn and Tinder, designed for software
        developers to network, collaborate, and connect meaningfully. Our mission is to
        foster genuine relationships in the tech ecosystem.
      </p>
    </section>
  );
}

// src/components/ContactUs.js
export  function ContactUs() {
  return (
    <section className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <p>
        Need help or have questions? Reach out to us via email:
        <a href="mailto:support@devconnectsde.xyz" className="text-blue-500"> support@devconnectsde.xyz</a>.
        We typically respond within 24 hours.
      </p>
    </section>
  );
}
