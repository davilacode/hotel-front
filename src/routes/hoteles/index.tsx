import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hoteles/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/hoteles/"!</div>
}
