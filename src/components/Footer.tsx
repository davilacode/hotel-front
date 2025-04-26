export default function Footer() {

  const date = new Date()
  const year = date.getFullYear()

  return (
    <footer className="bg-gray-50 text-white text-[calc(10px+2vmin)] py-3">
      <div className="max-w-[1400px] mx-auto flex px-4 flex-row items-center justify-between">
        <p className="text-sm text-muted-foreground text-center">© {year} <a href="https://github.com/davilacode">DavilaCode</a>.</p>
      </div>      
    </footer>
  );
}