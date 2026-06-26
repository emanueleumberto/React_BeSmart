import { useContextToDashboard } from "../layouts/LayoutDashboard"

export default function DashboardPage() {

    const { utente, annoCorrente } = useContextToDashboard()

  return (
    <>
        <div>DashboardPage</div>
        <p>Utente: {utente.nome} Ruolo: {utente.ruolo} Anno: {annoCorrente}</p>
    </>
  )
}
