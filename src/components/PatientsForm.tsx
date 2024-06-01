import { useForm } from "react-hook-form";
import { Errors } from "./Errors";
import { DraftPatient } from "../types";
import { usePatientStore } from "../stores/patient-store";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const PatientsForm = () => {
  // Formas de utilizar el estado global segun la documentacion de zustand;
  // Forma 1;
  // const {addPatient} = usePatientStore();
  // Forma 2;
  const [addPatient, activeId, patients, updatePatient] = usePatientStore(
    (state) => [
      state.addPatient,
      state.activeId,
      state.patients,
      state.updatePatient,
    ]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<DraftPatient>();

  useEffect(() => {
    if (activeId) {
      const actualPatient = patients.filter(
        (patient) => patient.id === activeId
      )[0];

      setValue("name", actualPatient.name);
      setValue("caretaker", actualPatient.caretaker);
      setValue("date", actualPatient.date);
      setValue("email", actualPatient.email);
      setValue("symptoms", actualPatient.symptoms);
    }
  }, [activeId]);

  // Recuperacion de datos;
  const newPatient = (data: DraftPatient) => {
    if (activeId) {
      updatePatient(data);
      toast.success("Paciente actualizado");
    } else {
      addPatient(data);
      toast.success("Paciente registrado");
    }
    reset();
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">
        Seguimiento de Pacientes
      </h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold">Adminístralos</span>
      </p>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        noValidate
        onSubmit={handleSubmit(newPatient)}
      >
        <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold">
            Paciente
          </label>
          <input
            id="name"
            className={`w-full p-3 rounded-md ${
              errors.name
                ? "border-t-2 border-r-2 border-b-2 border-l-8 border-red-300"
                : "border-2 border-gray-100"
            }`}
            type="text"
            placeholder="Nombre del Paciente"
            {...register("name", {
              required: "🚨 Este campo es obligatorio",
            })}
          />
          <Errors>{errors.name && errors.name.message}</Errors>
        </div>

        <div className="mb-5">
          <label htmlFor="caretaker" className="text-sm uppercase font-bold">
            Propietario
          </label>
          <input
            id="caretaker"
            className={`w-full p-3 rounded-md ${
              errors.caretaker
                ? "border-t-2 border-r-2 border-b-2 border-l-8 border-red-300"
                : "border-2 border-gray-100"
            }`}
            type="text"
            placeholder="Nombre del Propietario"
            {...register("caretaker", {
              required: "🚨 Este campo es obligatorio",
            })}
          />
          <Errors>{errors.caretaker && errors.caretaker.message}</Errors>
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-sm uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            className={`w-full p-3 rounded-md ${
              errors.email
                ? "border-t-2 border-r-2 border-b-2 border-l-8 border-red-300"
                : "border-2 border-gray-100"
            }`}
            type="email"
            placeholder="Email de Registro"
            {...register("email", {
              required: "🚨 Este campo es obligatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "🚨 Email no válido",
              },
            })}
          />
          <Errors>{errors.email && errors.email.message}</Errors>
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="text-sm uppercase font-bold">
            Fecha Alta
          </label>
          <input
            id="date"
            className={`w-full p-3 rounded-md ${
              errors.date
                ? "border-t-2 border-r-2 border-b-2 border-l-8 border-red-300"
                : "border-2 border-gray-100"
            }`}
            type="date"
            {...register("date", {
              required: "🚨 Este campo es obligatorio",
            })}
          />
          <Errors>{errors.date && errors.date.message}</Errors>
        </div>

        <div className="mb-5">
          <label htmlFor="symptoms" className="text-sm uppercase font-bold">
            Síntomas
          </label>
          <textarea
            id="symptoms"
            className={`w-full p-3 rounded-md ${
              errors.symptoms
                ? "border-t-2 border-r-2 border-b-2 border-l-8 border-red-300"
                : "border-2 border-gray-100"
            }`}
            placeholder="Síntomas del paciente"
            {...register("symptoms", {
              required: "🚨 Este campo es obligatorio",
            })}
          ></textarea>
          <Errors>{errors.symptoms && errors.symptoms.message}</Errors>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
        >
          Guardar Paciente
        </button>
      </form>
    </div>
  );
};
