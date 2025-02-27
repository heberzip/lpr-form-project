export default {
  global: {
    container: "relative flex flex-col h-screen bg-light text-dark m-0 p-0",
  },
  layout: {
    header: "w-full bg-dark md:bg-light text-dark py-4 px-6 shadow-xl z-20",
    main: "flex flex-1 h-full",
    sidebar: "hidden md:flex md:w-1/7 bg-dark text-white p-4",
    main_div:
      "flex flex-col flex-1 items-center py-4 px-6 md:px-12 bg-light w-full h-full",
    outlet: "w-full h-full",
    navigation:
      "flex flex-col absolute top-6/7 md:top-4/5 md:right-1/2 gap-4 items-center justify-center",
    footer: "",
    bg_blue: "absolute  z-10 opacity-50",
    bg_yellow: "absolute w-full h-full z-10 opacity-50",
  }, // layout
  /****************************************************************************** */
  header: {},
  /****************************************************************************** */
  section: {
    grid: "grid md:grid-cols-2 md:gap-10 w-full h-full",
    leftCol:
      "hidden md:flex md:flex-col items-center justify-center w-full md:pl-24",
    rightCol: "flex flex-col items-center justify-center w-full mt-6 md:mt-20",
  },
  /*****************************************************************************/
  form: {
    container: "w-full px-2 md:px-24",
  },
  /****************************************************************************** */
  // CUSTOM COMPONENTS
  grid: {
    container: "grid grid-cols-2 gap-x-4 w-full",
  },
  /****************************************************************************** */
  input: {
    container: "flex flex-col gap-2 w-full",
    label: "text-sm font-medium text-gray-700 select-none",
    small: "text-xs text-gray-500",
    standard:
      "w-full flex-grow px-3 py-2 mb-3 text-sm border-1 border-zip-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-zip-yellow-300 focus:border-1 focus:border-zip-yellow-300 focus:shadow-md transition-all placeholder:text-gray-400 placeholder:italic",
    required: "text-red-400",
    error: "border-red-500 focus:ring-red-500 focus:border-red-500",
    disabled: "bg-gray-100 text-gray-400 cursor-not-allowed",
  },
  /****************************************************************************** */
  autocomplete: {
    dropdown:
      "absolute top-6/7 w-full mt-2 bg-white text-dark font-semibold border-none rounded-lg shadow-xl max-h-48 overflow-y-auto z-50",
    dropdownItem:
      "hover:cursor-pointer hover:bg-light hover:text-zip-blue2-600 hover:shadow-lg hover:size-1.05 p-2",
  },
  /****************************************************************************** */
  button: {
    start:
      "bg-zip-blue2-500 text-white px-6 py-1 min-w-[200px] rounded-md shadow-xl transition mb-20",
    panel: "flex gap-4 md:gap-16 w-full",
    previous:
      "bg-dark text-white px-6 py-1 min-w-[150px] rounded-md shadow-xl transition disabled:opacity-50",
    next: "bg-zip-blue2-500 text-white px-6 py-1 min-w-[150px] rounded-md shadow-xl hover:bg-zip-blue2-600 active:bg-zip-blue2-800 active:size-0.95 transition disabled:opacity-50",
  },
  /****************************************************************************** */
  cinfo: "inline-block cursor-pointer hover:shadow-xl",
};
