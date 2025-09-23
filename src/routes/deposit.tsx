import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/deposit')({
  component: DepositPage,
})

function DepositPage() {
  return <div>Hello "/deposit"!</div>
}
