// useForm() è il punto di ingresso. Restituisce:
//   register()   — collega un input al form
//   handleSubmit()— gestisce il submit con validazione
//   formState    — isDirty, isValid, isSubmitting, errors...
//   watch()      — osserva il valore di un campo in tempo reale
//   reset()      — resetta tutti i campi
//   setValue()   — imposta il valore di un campo via codice
//   getValues()  — legge i valori correnti senza trigger re-render

import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form";

interface FormLogin {
    email: string
    password: string
    ricordami: boolean
}

function FormLogin(){
    const [datiInviati, setDatiInviati] = useState<FormLogin | null>(null);

    // useForm -> Hook principale tipizza con il nostro tipo di dato
    // npm install react-hook-form
    const {
        register,           // funzione per collegare un input al form
        handleSubmit,       // wrapper per il submit, esegue il submit solo se il form è valido
        formState: {
            errors,         // oggetto che contiene gli errori di validazione del form
            isSubmitting,   // true -> se il submit è in esecuzione
            isDirty,        // true -> se almeno un campo è stato modificato
            isValid         // true -> se tutti i campi sono validi
        },
        reset,              // funzione per resettare i campi di un form
        watch               // funzione che osserva un campo e ritorna il suo valore (causa re-render)
    } = useForm<FormLogin>({
        // defaultValues: valori iniziale dei campi del form
        defaultValues: {
            email: '',
            password: '',
            ricordami: false
        },
        // mode: quando eseguire la validazione 
        // 'onBlur'   → valida quando il campo perde il focus (default per UX)
        // 'onChange'  → valida ad ogni tasto (aggressivo ma reattivo)
        // 'onSubmit'  → valida solo al submit (meno feedback in tempo reale)
        // 'all'       → onBlur + onChange
        mode: 'onBlur' 
    })

    // Osservo il valore di 'email' in tempo reale senza utilizzare una stato
    const emailCorrente = watch('email');

    const onSubmit: SubmitHandler<FormLogin> = async (dati) => {
        // dati è già validato e tipizzato come FormLogin
        // isSubmitting diventa true automaticamente qui dentro se non rileva problemi
        await new Promise(r => setTimeout(r, 1000)) // simulo una chiamata alle API
        setDatiInviati(dati)
        // reset() -> azzera tutto il form e lo stato (isDirty -> false, errors -> {})
        reset()
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Email*</label>
                    <input 
                        type="email" 
                        placeholder="Inserisci email"
                        {...register('email',{
                            required: 'L\'email è obbligatoria',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Inserisci una mail valida.'
                            }
                        })} />
                    {errors.email && <div>{errors.email.message}</div>}
                    {emailCorrente && <div>Stati scrivendo: {emailCorrente}</div>}
                </div>
                <div>
                    <label>Password*</label>
                    <input 
                        type="password" 
                        placeholder="Inserisci una password"
                        {...register('password', {
                            required: 'La password è obbligatoria',
                            minLength: {value: 8, message:'La password deve essere minimo 8 caratteri'},
                            validate: (v) => /[A-Z]/.test(v) || 'Deve contenere almeno una lettera maiuscola'
                        })} />
                    {errors.password && <div>{errors.password.message}</div>}
                </div>
                <div>
                    <label>
                        <input type="checkbox" {...register('ricordami')}/>
                        Ricordami
                    </label>
                </div>
                <div>
                    <button 
                        type="submit" 
                        disabled={isSubmitting}>
                        {isSubmitting ? <div>Accesso in corso...</div> : 'Accedi'}    
                    </button>
                    <button onClick={() => reset()}>Reset</button>
                </div>

                <div>
                    <p>isDirty: {String(isDirty)}</p>
                    <p>isValid: {String(isValid)}</p>
                    <p>isSubmitting: {String(isSubmitting)}</p>
                </div>
            </form>

            {datiInviati && (
                <div>
                    Accesso effettuato come <strong>{datiInviati.email}</strong>
                    {datiInviati.ricordami && ' - sessione ricordami attiva.'}
                </div>
            )}
        </div>
    )
}

export default function UseFormComponent() {
  return (
    <div>
        <h1>UseFormComponent</h1>
        <FormLogin />
    </div>
  )
}
