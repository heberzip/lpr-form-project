export default {
  layout: {
    container: "relative flex flex-col h-screen",
    header: "w-full bg-dark md:bg-light text-dark py-4 px-6 shadow-xl z-20",
    main: "flex flex-1 overflow-hidden",
    sidebar: "hidden md:flex md:w-1/5 bg-dark text-white p-4",
    main_div: "flex flex-col flex-1 items-center p-8 bg-light overflow-auto",
    outlet: "flex-1 flex",
    navigation: "flex flex-col gap-4 mt-4 items-center justify-center",
    footer: "w-full bg-dark text-white py-2 text-center z-30",
    bg_blue: "absolute  z-10 opacity-50",
    bg_yellow: "absolute w-full h-full z-10 opacity-50",
  }, // layout
  /****************************************************************************** */
  header: {},
  /****************************************************************************** */
  section: {
    grid: "grid md:grid-cols-2 md:gap-20 w-full h-full",
    leftCol: "flex flex-col w-full",
    rightCol: "flex flex-col items-center justify-center",
  },
  /****************************************************************************** */
  input: {
    container: "flex flex-col gap-2 w-full",
    label: "flex gap-2 text-sm font-medium text-gray-700",
    small: "text-xs text-gray-500",
    standard:
      "w-full px-3 py-2 mb-2 text-sm border-1 border-zip-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-zip-yellow-300 focus:border-1 focus:border-zip-yellow-300 focus:shadow-md transition-all placeholder:text-gray-400 placeholder:italic",
    required: "text-red-500",
    error: "border-red-500 focus:ring-red-500 focus:border-red-500",
    disabled: "bg-gray-100 text-gray-400 cursor-not-allowed",
  },
  /****************************************************************************** */
  button: {
    start:
      "bg-zip-blue2-500 text-white px-6 py-1 min-w-[200px] rounded-md shadow-xl transition mb-20",
    panel: "flex gap-4 items-center mb-4",
    previous:
      "bg-dark text-white px-6 py-1 min-w-[150px] rounded-md shadow-xl transition disabled:opacity-50",
    next: "bg-zip-blue2-500 text-white px-6 py-1 min-w-[150px] rounded-md shadow-xl hover:bg-zip-blue2-600 active:bg-zip-blue2-800 active:size-0.95 transition disabled:opacity-50",
  },
  /****************************************************************************** */
  cinfo: "inline-block cursor-pointer hover:shadow-xl",
};
