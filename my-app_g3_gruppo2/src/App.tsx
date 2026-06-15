import './App.css'
import ExampleUserComponent from './teoria/ExampleUserComponent'
import UserComponentProps from './teoria/UserComponentProps'

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
      {/* <UserComponentProps name="Mario Rossi" email="m.rossi@example.com" role='admin' onDelete={(id) => console.log(id)} /> */}
    <ExampleUserComponent />
    </>
  )
}

export default App
