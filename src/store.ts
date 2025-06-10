import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { v4 as uuidv4 } from "uuid"
import type { DraftPatient, Patient } from "./types"

type PatientState = {
    patients: Patient[]
    activeID: Patient['id']
    addPatient: (date: DraftPatient) => void
    deletePatient: (id: Patient['id']) => void
    getPatientById: (id: Patient['id']) => void
    updatePatient: (data: DraftPatient) => void
}


const createPatient = (paient: DraftPatient): Patient => {
    return { ...paient, id: uuidv4() }
}

export const usePatientStore = create<PatientState>()(
    devtools((set) => ({
        patients: [],
        activeID: '',


        addPatient: (data) => {
            const newPatient = createPatient(data)
            set((state) => ({ // es como el return de use reducer pero en zustand
                patients: [...state.patients, newPatient]
            }))
        },


        deletePatient: (id) => {
            set((state) => ({
                patients: state.patients.filter(patient => patient.id !== id)
            }))
        },

        getPatientById: (id) => {
            set(() => ({
                activeID: id
            }))
        },

        updatePatient: (data) => {
            set((state)=>({
                patients: state.patients.map(patient => patient.id === state.activeID ? {id: state.activeID, ... data} : patient),
                activeID: ''
            }))
        }
    })))



