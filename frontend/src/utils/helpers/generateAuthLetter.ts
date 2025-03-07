// import { useState } from "react";
// import html2pdf from "html2pdf.js";

export const generatePDF = async (data: never) => {
  try {
    // 1️⃣ Cargar el HTML desde `public/templates/AuthorizationLetter.html`
    const response = await fetch("/templates/AuthorizationLetter.html");
    let template = await response.text();

    // 2️⃣ Reemplazar las variables `{{ ... }}` con los valores del estado
    Object.keys(data).forEach((key) => {
      const regex = new RegExp(`{{ ${key} }}`, "g");
      template = template.replace(regex, data[key]);
    });

    // 3️⃣ Convertir el HTML a PDF
    //html2pdf().from(template).save("AuthorizationLetter.pdf");
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};

// Componente que muestra el botón de descarga
/*const AuthorizationLetter = () => {
  const [formData, setFormData] = useState({
    TODAY: new Date().toLocaleDateString(),
    COMPANY_NAME: "Example Corp",
    VAT_NUMBER: "123456789",
    DIFFERENT_ACCHOLD: "John Doe",
    IBAN: "ES9121000418450200051332",
    SWIFT: "BBVAESMMXXX",
    BANK_NAME: "BBVA",
    CURRENCY: "EUR",
  });

  return "Click the button to generate the PDF file. 📄";
};

export default AuthorizationLetter;*/
