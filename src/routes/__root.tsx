import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { HeadContent, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        name: 'description',
        content: 'Aplicación para administrar hoteles y acomodaciones',
      },
      {
        title: 'HotelApp',
      }
    ]
  }),
  component: () => (
    <>
      <HeadContent />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <TanStackRouterDevtools />
    </>
  ),
})
