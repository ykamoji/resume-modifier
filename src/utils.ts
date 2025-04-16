import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const exportPDF = async (id) => {

    let element = document.getElementById(id);
    element.classList.remove("shadow-sm");
    document.body.style.backgroundColor = "white";

    const canvas = await html2canvas(element, {
        scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(id+".pdf");
}

export default exportPDF