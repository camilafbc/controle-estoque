import HeaderContent from "./components/HeaderContent";

export default function Header() {
  // const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="flex w-full flex-col items-start border-b-4 border-b-primary bg-navbar py-10 shadow-sm sm:h-16 sm:flex-row sm:items-center">
      <HeaderContent />
    </header>
  );
}
