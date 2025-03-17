// EXTERNAL MODULES
// COMPONENTS
// CUSTOM COMPONENTS
// ANIMATIONS
// CUSTOM HOOKS
// STORE
// STYLES
import styles from "@styles/global.style";
// DATA
// HELPERS
// TYPES AND SCHEMAS
/** ***************************************************************************/
// TYPES
/** ***************************************************************************/

const initialVehicles = [
  { id: 1, model: "Mercedes E Class", quantity: 5, pax: 4 },
  { id: 2, model: "Ford Explorer", quantity: 3, pax: 6 },
  { id: 3, model: "Tesla Model S", quantity: 2, pax: 4 },
  { id: 4, model: "BMW X5", quantity: 3, pax: 4 },
  { id: 5, model: "Audi Q7", quantity: 5, pax: 6 },
  { id: 6, model: "Toyota Highlander", quantity: 5, pax: 6 },
  { id: 7, model: "Chevrolet Suburban", quantity: 1, pax: 7 },
  { id: 8, model: "Honda Odyssey", quantity: 5, pax: 7 },
  { id: 9, model: "Volkswagen Tiguan", quantity: 5, pax: 5 },
  { id: 10, model: "Hyundai Santa Fe", quantity: 1, pax: 5 },
  { id: 11, model: "Kia Sorento", quantity: 3, pax: 5 },
  { id: 12, model: "Nissan Rogue", quantity: 2, pax: 5 },
  { id: 13, model: "Lexus RX", quantity: 1, pax: 5 },
  { id: 14, model: "Subaru Outback", quantity: 5, pax: 5 },
  { id: 15, model: "Volvo XC90", quantity: 4, pax: 6 },
];

const extrasList = [
  "child seat",
  "booster seat",
  "extra luggage",
  "foldable wheelchair",
  "golf equip",
  "ski equip",
  "bicycle",
];

const Extras = () => {
  //const [vehicles, setVehicles] = useState(initialVehicles);

  return (
    <section id="extras" className={styles.section.grid}>
      <div className={styles.section.leftCol}>
        <h1>Extras</h1>
        <p>
          This is the section about the extras that your company offers for
          transfers.
        </p>
      </div>

      {/* Right column: Form and NavBtns */}
      <div className={styles.section.rightCol}>
        <form className={styles.form.container}>
          <label htmlFor="extra-stop">Extra Stop</label>
          <input
            type="number"
            id="extra-stop"
            placeholder="3€"
            required={true}
            min={0}
            max={15}
            className="w-full border border-gray-300 my-0 py-1.5 px-2 rounded-md"
          />

          <label htmlFor="waiting-time">Waiting time</label>
          <input
            type="number"
            id="waiting-time"
            placeholder="3€"
            required={true}
            min={0}
            max={15}
            className="w-full border border-gray-300 my-0 py-1.5 px-2 rounded-md"
          />

          <label className="mt-4">Do you offer transfers with peds?</label>

          <div className="flex w-full justify-around gap-2 mt-4">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="yes"
                name="transfers-with-peds"
                value="yes"
                required={true}
                className="w-4 h-4 border border-gray-300 rounded"
              />
              <label htmlFor="yes">YES</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="no"
                name="transfers-with-peds"
                value="no"
                required={true}
                className="w-4 h-4 border border-gray-300 rounded"
              />
              <label htmlFor="no">NO</label>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 rounded-md">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 text-left">Model</th>
                  {extrasList.map((extra) => (
                    <th
                      key={extra}
                      className="p-2 text-center capitalize text-xs"
                    >
                      {extra}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {initialVehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="border-t border-gray-300">
                    <td className="p-2">{vehicle.pax}</td>
                    {extrasList.map((extra) => (
                      <td key={extra} className="p-2 text-center">
                        <input
                          type="checkbox"
                          onChange={() =>
                            console.log("Checkbox changed", vehicle.id, extra)
                          }
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Extras;
