const Footer = () => {
  return (
    <footer className="bg-rose-600 text-rose-100 ">
      <div className="border-t border-rose-800 py-10 px-4 text-[1rem]">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>
            © 2025 Heart Failure Readmission Predictor. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="mx-2 hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="mx-2 hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="mx-2 hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
