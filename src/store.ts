import { create } from "zustand"
import { v4 as uuidv4 } from "uuid"
import type { DraftPatient, Patient } from "./types"

type PatientState = {
    patients: Patient[]
    addPatient: (date: DraftPatient) => void
}

const createPatient = (paient: DraftPatient) : Patient => {
    return {...paient, id: uuidv4()}
}

export const usePatientStore = create<PatientState>((set)=>({
    patients: [],

    addPatient: (data)=>{
        const newPatient = createPatient(data)
        set((state)=>({ // es como el return de use reducer pero en zustand
            patients: [...state.patients, newPatient]
        }))
    }
}))