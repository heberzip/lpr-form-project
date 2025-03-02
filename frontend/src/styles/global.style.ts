export default {
  global: {
    container:
      "@container/Container relative flex flex-col h-screen bg-light text-md text-dark m-0 p-0",
  },
  layout: {
    header:
      "w-full @[1150px]/Container:h-1/10 bg-dark @[1150px]/Container:bg-light text-dark py-4 px-6 shadow-xl z-20",
    main: "flex flex-1",
    sidebar:
      "hidden @[1480px]/Container:flex @[1480px]/Container:w-1/7 bg-dark text-white p-4",
    main_div: "flex flex-col flex-1 items-center w-full h-full",
    outlet: "w-full h-full",
    navigation:
      "flex flex-col md:top-4/5 md:right-1/2 gap-4 items-center justify-center mb-8 @[1150px]/Container:mb-14",
    footer: "",
    bg_blue: "absolute  z-10 opacity-50",
    bg_yellow: "absolute w-full h-full z-10 opacity-50",
  }, // layout
  /****************************************************************************** */
  header: {},
  /****************************************************************************** */
  section: {
    grid: "@container/Section grid @[1150px]/Container:grid-cols-2 md:gap-10 w-full h-full mt-6 @[1150px]/Container:mt-16",
    leftCol:
      "hidden @[1150px]/Section:flex @[1150px]/Section:flex-col items-center justify-start w-full px-16",
    rightCol:
      "@container/rightCol flex flex-col items-center justify-center w-full px-6 @[1150px]/Section:px-16",
  },
  /*****************************************************************************/
  form: {
    container: "flex flex-col items-center justify-center w-full",
  },
  /****************************************************************************** */
  // CUSTOM COMPONENTS
  grid: {
    container: "max-w-lg grid grid-cols-2 gap-x-4 w-full",
  },
  /****************************************************************************** */
  input: {
    container: "flex flex-col gap-2 w-full max-w-lg mx-auto",
    label: "font-medium text-gray-700 select-none",
    small: "text-xs text-gray-500",
    body: {
      standard:
        "w-full px-3 py-2 mb-3 text-sm border-1 border-zip-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-zip-yellow-300 focus:border-1 focus:border-zip-yellow-300 focus:shadow-md transition-all placeholder:text-gray-400 placeholder:italic",
      withPre:
        "w-full px-3 py-2 mb-3 text-sm border-1 border-zip-gray-500 border-l-0 rounded-r-md focus:outline-none focus:ring-2 focus:ring-zip-yellow-300 focus:border-1 focus:border-zip-yellow-300 focus:shadow-md transition-all placeholder:text-gray-400 placeholder:italic",
    },
    disabled: {
      standard:
        "w-full flex-grow px-3 py-2 mb-3 bg-gray-300 text-sm text-gray-400 italic line-through border-1 border-gray-300 rounded-md focus:outline-none transition-all placeholder:text-gray-400 placeholder:italic cursor-not-allowed select-none",
      withPre:
        "w-full flex-grow px-3 py-2 mb-3 bg-gray-300 text-sm text-gray-400 italic line-through border-1 border-gray-300 border-l-0 rounded-r-md focus:outline-none transition-all placeholder:text-gray-400 placeholder:italic cursor-not-allowed select-none",
    },
    pre: {
      enable:
        "w-[45px] flex items-center justify-center py-2 px-2 mb-3 bg-zip-blue2-500 text-white text-[13px] rounded-l-lg select-none",
      disable:
        "w-[45px] flex items-center justify-center py-2 px-2 mb-3 bg-gray-400 text-gray-200 text-[13px] rounded-l-lg select-none",
    },
    required: "text-red-400",
    error: "border-red-500 focus:ring-red-500 focus:border-red-500",
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
  /*****************************************************************************/
  radio: {
    container: "flex flex-col gap-2",
    question: "flex items-center justify-center select-none",
    panel: "flex gap-4 items-center justify-center mb-2",
    label: "flex text-sm ml-2 font-semibold select-none",
    labelActive: "text-zip-blue2-600 font-bold",
    input:
      "w-3 h-3 mt-1 appearance-none checked:bg-zip-blue2-500 bg-gray-300 focus:ring-2 focus:ring-zip-blue2-500 focus:border-zip-blue2-500 rounded-full transition-all cursor-pointer",
    disabled:
      "w-4 h-4 text-gray-400 bg-gray-200 border-gray-300 cursor-not-allowed",
  },
  /****************************************************************************** */
  cinfo: "inline-block cursor-pointer hover:shadow-xl tabindex-[-1]",
  cinfoCard: {
    container:
      "flex flex-col p-4 bg-white shadow-md rounded-md border border-gray-300 w-full max-w-lg mt-4 transition-all duration-300",

    infoCardHeader: "flex justify-between items-center",
    infoCardTitle: "text-lg font-semibold text-dark",
    infoCardClose: "text-gray-500 hover:text-gray-700 transition-all",

    infoCardContent: "mt-2 text-gray-700",
  },
};
