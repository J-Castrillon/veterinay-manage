import { usePatientStore } from "../stores/patient-store";
import { PatientDetail } from "./PatientDetail";

export const PatientsList = () => {
  const patients = usePatientStore((state) => state.patients);

  // useEffect(() => {
  //   console.log(patients);
  // }, [patients])

  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
      {patients.length > 0 ? (
        <>
          <h2 className="font-black text-3xl text-center">Listado de pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">Administra tus {''} <span className="text-indigo-600 font-bold">Pacientes y Citas</span></p>
          {patients.map(patient => {
            return (
              <PatientDetail key={patient.id} patient={patient}/>
            )
          })}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">Comienza agregando pacientes {''} <span className="text-indigo-600 font-bold">y aparecerán aquí</span></p>
        </>
      )}
    </div>
  );
};
