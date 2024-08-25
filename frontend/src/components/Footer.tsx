const Footer = () => {
  return (
    <div className="bg-blue-800 py-5">
      <div className="container mx-auto flex items-center justify-between font-bold tracking-tight text-white">
        <span className="text-3xl">FreshHolidays.com</span>
        <span className="flex gap-4">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of Service</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
