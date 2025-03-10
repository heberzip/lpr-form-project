import { useState } from "react";
import { CNavigation } from "@components/customs";
import styles from "@styles/global.style";

const Fleet = () => {
  const [vehicles, setVehicles] = useState([
    { model: "", pax: "", quantity: "" },
  ]);
  const [totalVehicles, setTotalVehicles] = useState(1);

  // Agregar una nueva fila a la tabla
  const handleAddVehicle = () => {
    setVehicles([...vehicles, { model: "", pax: "", quantity: "" }]);
  };

  // Manejar cambios en los inputs de cada fila
  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedVehicles = vehicles.map((v, i) =>
      i === index ? { ...v, [field]: value } : v
    );
    setVehicles(updatedVehicles);
  };

  const handleDeleteRow = () => {
    setVehicles(vehicles.filter((_, i) => i !== vehicles.length - 1));
  };

  return (
    <section id="fleet" className={styles.section.grid}>
      {/* Left column: Header with title and description */}
      <div className={styles.section.leftCol}>
        <h1>Fleet</h1>
        <p>This is the fleet section.</p>
      </div>

      {/* Right column: Form and NavBtns */}
      <div className={styles.section.rightCol}>
        <form className={styles.form.container}>
          <div className="mb-4">
            How many vehicles do you have in your fleet?
          </div>

          {/* Input para definir el total de vehículos */}
          <div className="flex justify-center items-center gap-6 w-full px-4 md:px-8 max-w-md mx-auto min-w-[350px] md:w-md">
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="vehicles">Vehicles</label>
              <input
                id="vehicles"
                type="number"
                required={true}
                placeholder="Total Vehicles"
                min={1}
                max={5000}
                value={totalVehicles}
                className="w-full border border-gray-300 my-0 py-1.5 px-2 rounded-md"
                onChange={(e) => setTotalVehicles(Number(e.target.value))}
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <label htmlFor="addVehicle">model-#pax-quant</label>

              {/* Botón para agregar un nuevo vehículo */}
              <button
                id="addVehicle"
                type="button"
                className="bg-zip-blue2-500 text-white px-6 py-1 min-w-[150px] rounded-md shadow-xl hover:bg-zip-blue2-600 active:bg-zip-blue2-800 active:size-0.95 transition disabled:opacity-50 disabled:bg-gray-400"
                onClick={handleAddVehicle}
                disabled={vehicles.length >= totalVehicles} // Se desactiva si ya se alcanzó el total
              >
                Add type
              </button>
            </div>
          </div>

          {/* Tabla con los vehículos añadidos */}
          <li className="w-full mt-4 mb-1 max-w-md mx-auto min-w-[350px] md:w-md border-none rounded-md bg-zip-blue2-100 text-zip-blue2-700 flex justify-between py-2 px-4 font-semibold shadow-md">
            <span className="w-1/2 text-center">Model</span>
            <span className="w-1/4 text-start ml-2">#Pax</span>
            <span className="w-1/4 text-start ml-2">Quantity</span>
          </li>
          <div className="w-full mt-1 mb-4 max-w-md mx-auto flex flex-col gap-2 min-w-[350px] md:w-md max-h-100 h-full overflow-y-auto border-none rounded-md custom-scrollbar">
            <ul className="w-full border border-none rounded-md shadow-md">
              {/* Encabezado */}

              {/* Filas de vehículos */}
              {vehicles.map((vehicle, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-t border-none mr-3 md:mr-0 my-2 py-1 px-0 md:px-2"
                >
                  {/* Modelo / Marca */}
                  <div className="w-1/2 px-2">
                    <input
                      type="text"
                      placeholder="Model"
                      className="w-full border border-gray-300 py-1.5 px-2 rounded-md"
                      value={vehicle.model}
                      onChange={(e) =>
                        handleInputChange(index, "model", e.target.value)
                      }
                    />
                  </div>

                  {/* Cantidad de pasajeros */}
                  <div className="w-1/4 flex items-center gap-2 px-2">
                    <input
                      type="number"
                      placeholder="1 pax"
                      className="w-full border border-gray-300 py-1.5 px-2 rounded-md"
                      min={1}
                      value={vehicle.pax}
                      onChange={(e) =>
                        handleInputChange(index, "pax", e.target.value)
                      }
                    />
                  </div>

                  {/* Cantidad de vehículos y botón de eliminar */}
                  <div className="w-1/4 flex items-center gap-2 px-2">
                    <input
                      type="number"
                      placeholder="1"
                      className="w-full border border-gray-300 py-1.5 px-2 rounded-md"
                      min={1}
                      value={vehicle.quantity}
                      onChange={(e) =>
                        handleInputChange(index, "quantity", e.target.value)
                      }
                    />
                  </div>
                  <div className="w-1/40 md:w-auto">
                    <button
                      type="button"
                      onClick={() => handleDeleteRow()}
                      className="px-0 md:px-2 text-red-400 hover:text-red-500 active:text-red-700 active:scale-95 text-lg md:text-2xl"
                    >
                      x
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Botones de navegación */}
          <footer className="flex items-center justify-center">
            <CNavigation isSectionFilled={() => true} validatedFields={true} />
          </footer>
        </form>
      </div>
    </section>
  );
};

export default Fleet;
