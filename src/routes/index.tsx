import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from "@/components/ui/button";

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="text-center mt-12 p-4">
      <h1 className="text-3xl font-bold">Bienvenido</h1>
      <p className="mt-4 text-lg">Escoje una opción para empezar:</p>
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
        <Button asChild size={"lg"}>
          <Link to="/hotels">Administrar Hoteles</Link>
        </Button>
        <Button asChild variant="outline" size={"lg"}>
          <Link to="/rooms">Administrar Acomodaciones</Link>
        </Button>
      </div>
    </div>
  );
}
