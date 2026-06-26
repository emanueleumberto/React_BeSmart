// Outlet accetta un prop "context" per passare dati dal layout
// alle pagine figlie SENZA prop drilling.
// Le pagine figlie leggono i dati con l'hook useOutletContext.
import { Outlet, useOutletContext } from "react-router-dom";

// Tipo del contesto condiviso tra layout e figli
interface ContextToDashboard {
    utente: {nome: string; ruolo: 'admin'| 'user'},
    annoCorrente: number
}

// Hook personalizzato — nasconde useOutletContext e garantisce il tipo
export function useContextToDashboard() {
    return useOutletContext<ContextToDashboard>()
}

export default function LayoutDashboard() {

    const utente = {nome: "Mario Rossi", ruolo: 'user' as const}

  return (
    <div>
        <h3>LayoutDashboard</h3>
        <div>
            {/* context: i dati disponibili alle route figlie via useOutletContext
            'satisfies ContextoDashboard' garantisce TypeScript il tipo corretto */}
            <Outlet context={{utente, annoCorrente: 2026} satisfies ContextToDashboard} />
        </div>
    </div>
  )
}
