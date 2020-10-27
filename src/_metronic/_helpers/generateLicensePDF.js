import jsPDF from "jspdf";
import "jspdf-autotable";

export const generateLicensePDF = ({ data, corporate }) => {
    const doc = new jsPDF();
    let {
        licenseDetails,
        purchasedLicenses,
    } = data;

    doc.text("License Order Invoice", 70, 15)

    doc.text("To: ", 15, 50);
    doc.text(corporate.companyName, 15, 60);

    doc.text("Order No.:", 100, 50);
    doc.text(data.orderId, 150, 50);
    doc.text("Order Date:", 100, 60);
    doc.text(new Date(data.createdAt).toLocaleDateString(), 150, 60);

    let tableColumn = [
        "Sr. No.",
        "License Type",
        "Quantity",
        "Rate/License(USD)",
        "Total Rate(USD)",
    ]

    // tableColumn.push("Total(USD)");

    let tableRows = [];

    licenseDetails.forEach((license, idx) => {
        const tblData = [
            { content: idx + 1, },
            { content: license.type, },
            { content: purchasedLicenses[idx].quantity },
            { content: license.price,},
            { content: purchasedLicenses[idx].totalPrice,},
        ];
        tableRows.push(tblData);
    })

    tableRows.push([
        { content: "Total", styles: { fontStyle: "bold" } },
        "",
        { content: purchasedLicenses.reduce((acc, license) => acc + license.quantity, 0), styles: { fontStyle: "bold" } },
        { content: licenseDetails.reduce((acc, license) => acc + license.price, 0), styles: { fontStyle: "bold" } },
        { content: purchasedLicenses.reduce((acc, license) => acc + license.totalPrice, 0), styles: { fontStyle: "bold" } },
    ]);

    doc.autoTable(tableColumn, tableRows, { startY: 80 });
    doc.save(`${corporate.companyName}_License_Invoice_${Date.now()}.pdf`);
}