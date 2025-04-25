import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/acommodation/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/acommodation/"!</div>
}