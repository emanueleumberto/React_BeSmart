import { useContextToDashboard } from "../layouts/LayoutDashboard"

export default function DashboardPage() {

  const {utente, annoCorrente} = useContextToDashboard()

  return (
    <div>
      <h3>DashboardPage</h3>
      <p>Utente: {utente.nome} Ruolo: {utente.ruolo} Anno di riferimento: {annoCorrente}</p>
    </div>

  )
}
