import './App.css'
import ExampleUserComponent from './teoria/ExampleUserComponent'
import UserComponent from './teoria/UserComponent'

// terminale
// # Nuovo progetto Vite con React + TypeScript
// npm create vite@latest my-app -- --template react-ts

// # Oppure aggiungere TS a progetto esistente
// npm install --save-dev typescript @types/react @types/react-dom

// Perché TypeScript in React?
// TypeScript aggiunge la tipizzazione statica a JavaScript: 
// gli errori vengono rilevati dall'editor prima ancora di eseguire il codice.

// Concetto chiave: TypeScript non cambia come React funziona — 
// aggiunge solo annotazioni di tipo che spariscono dopo la compilazione. 
// Il codice risultante è JavaScript puro.

// Vantaggi principali per un progetto React: autocompletamento intelligente nell'editor, 
// errori rilevati prima del browser, refactoring sicuro (rinominare una prop aggiorna tutti i file), 
// documentazione implicita dei componenti.

function App() {

  return (
    <>
      {/* UserComponent.jsx */}
      {/* UserComponent.tsx */}
      {/* types.tsx */}
      {/* UserComponentProps.tsx */}
      {/* ListGenericsComponent.tsx */}
      {/* UserStateAndHook.tsx */}
      {/* ExampleUserComponent.tsx */}
    </>
  )
}

export default App
