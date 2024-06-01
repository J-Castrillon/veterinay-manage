import { toast } from "react-toastify";
import { formatDate } from "../helpers/formatDate";
import { usePatientStore } from "../stores/patient-store";
import { Patient } from "../types";
import { PatientDetailItem } from "./PatientDetailItem";

type PatientDetailProps = {
  patient: Patient;
};

export const PatientDetail = ({ patient }: PatientDetailProps) => {
  const [removePatient, getActiveId] = usePatientStore((state) => [
    state.removePatient,
    state.getActiveId,
  ]);

  const handleRemovePatient = (id: Patient["id"]) => {
    removePatient(id);
    toast.error("Paciente eliminado");
  };

  const handleEditParient = (id: Patient["id"]) => {
    getActiveId(id);
  };
  return (
    <div className="mx-t my-10 px-5 py-10 bg-white shadow-md rounded-xl">
      <PatientDetailItem label="Id" data={patient.id} />
      <PatientDetailItem label="Nombre" data={patient.name} />
      <PatientDetailItem label="Propietario" data={patient.caretaker} />
      <PatientDetailItem label="Email" data={patient.email} />
      <PatientDetailItem label="Fecha" data={formatDate(patient.date)} />
      <PatientDetailItem label="Síntomas" data={patient.symptoms} />

      <div className="flex flex-col lg:flex-row justify-end mt-10 gap-3">
        <button
          onClick={() => handleEditParient(patient.id)}
          className="mx-2 py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
        >
          Editar
        </button>
        <button
          onClick={() => handleRemovePatient(patient.id)}
          className="mx-2 py-2 px-10 bg-red-500 hover:bg-red-600 text-white font-bold uppercase rounded-lg"
        >
          Borrar
        </button>
      </div>
    </div>
  );
};
