import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"

interface FormLogin {
    email: string
    password: string
    ricordami: boolean
}

// https://react-hook-form.com/

function FormLogin() {

    const [datiInviati, setDatiInviati] = useState<FormLogin |null>(null);

    const {
        register,           // Funzione per collegare un input del form
        handleSubmit,       // wrapper per il submit, esegue il submit solo se il form è valido
        formState: {
            errors,         // oggetto che contiene gli errori di validazione del form
            isSubmitting,   // true -> se il submit è in esecuzione
            isDirty,        // true -> se almeno un campo è stato modificato
            isValid         // true -> se tutti i campi del form sono validi
        },
        reset,              // funzione che permette di resettare i campi del form
        watch               // funzione che osserva un campo del form e ritorna il suo valore (causa il re-render)
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
        mode: "onBlur"
    })

    const emailCorrente = watch('email');

    const onSubmit: SubmitHandler<FormLogin> = async (dati) => {
        console.log("Invio dati...");
        await new Promise(r => setTimeout(r, 1000))
        setDatiInviati(dati)
        reset()
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Email* </label>
                    <input 
                        type="email" 
                        placeholder="Inserisci email"
                        {...register('email', {
                            required: 'Campo email obbligatorio.',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Inserisci una mail valida.'
                            }
                        })} />
                        {errors.email && <div>{errors.email.message}</div>}
                        {emailCorrente && <div>Stati scrivendo: {emailCorrente}</div>}
                </div>
                <div>
                    <label>Password* </label>
                    <input 
                        type="password" 
                        placeholder="Inserisci password"
                        {...register('password', {
                            required: 'Campo password è obbligatorio',
                            minLength: {
                                value: 8, 
                                message: 'La password deve essere lunga almeno 8 caratteri.'
                            },
                            validate: (v) => /[A-Z]/.test(v) || 'La password deve avere almeno una lettere maiuscola.'
                        })} />
                        {errors.password && <div>{errors.password.message}</div>}
                </div>
                <div>
                    <label>
                        <input type="checkbox" {...register('ricordami')} /> Ricordami
                    </label>
                </div>
                <div>
                    <button 
                        type="submit"
                        disabled={isSubmitting}    
                    >{isSubmitting ? <span>Accesso in corso...</span> : 'Login'}</button>
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
                    {datiInviati.ricordami && ' - sessione ricordami attiva'}
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
