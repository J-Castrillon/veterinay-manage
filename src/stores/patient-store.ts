import { create } from "zustand";
import { DraftPatient, Patient } from "../types";
import { v4 as uuidv4 } from "uuid";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type PatientState = {
  patients: Patient[];
  addPatient: (data: DraftPatient) => void;
  removePatient: (id: Patient["id"]) => void;
  activeId: Patient["id"];
  getActiveId: (id: Patient["id"]) => void;
  updatePatient: (data: DraftPatient) => void;
};

const newPatient = (data: DraftPatient): Patient => {
  return {
    ...data,
    id: uuidv4(),
  };
};

// Parametro get, retorna el estado, y set escribe en el estado;
export const usePatientStore = create<PatientState>()(
  devtools(
    persist(
      (set) => ({
        patients: [],
        addPatient: (data) => {
          const createPatient = newPatient(data);

          set((state) => ({
            ...state,
            patients: [...state.patients, createPatient],
          }));
        },
        removePatient: (id) => {
          set((state) => ({
            ...state,
            patients: state.patients.filter((patient) => patient.id !== id),
          }));
        },
        activeId: "",
        getActiveId: (id) => {
          set((state) => ({
            ...state,
            activeId: id,
          }));
        },
        updatePatient: (data) => {
          set((state) => ({
            ...state,
            patients: state.patients.map((patient) =>
              patient.id === state.activeId
                ? { ...data, id: state.activeId }
                : patient
            ),
            activeId: "",
          }));
        },
      }),
      {
        name: "patient-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
