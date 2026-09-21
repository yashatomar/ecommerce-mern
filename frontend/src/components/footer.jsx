const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Section */}
        <div>
          <h3 className="text-2xl font-extrabold text-white mb-4">
            E-<span className="text-indigo-500">Shop</span>
          </h3>
          <p className="text-sm text-slate-400 mb-4">
            Your one-stop shop for premium products. We provide high-quality items with fast delivery and secure payments.
          </p>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="text-lg font-bold text-white mb-4">Customer Service</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>Contact Us</li>
            <li>Shipping Information</li>
            <li>Returns & Exchanges</li>
            <li>FAQ</li>
          </ul>
        </div>

        {/* Company Info */}
        <div>
          <h4 className="text-lg font-bold text-white mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>About Us</li>
            <li>Careers</li>
            <li>Our Blog</li>
            <li>Press</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-lg font-bold text-white mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Cookie Policy</li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-800 text-center py-6 text-sm text-slate-500">
        &copy; {new Date().getFullYear()} E-Shop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;