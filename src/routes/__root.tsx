import Header from '@/components/Header'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <main>
        <Header />
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </>
  ),
})
