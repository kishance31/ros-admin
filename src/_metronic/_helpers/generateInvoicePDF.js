import jsPDF from "jspdf";
import "jspdf-autotable";

export const generateInvoicePDF = ({ data, isRecurring, corporate }) => {
    const doc = new jsPDF();
    let {
        invoiceDetails,
        employeeDetails,
        productDetails
    } = data;

    if (isRecurring) {
        doc.text("Recurring Payment Invoice", 70, 15)
    } else {
        doc.text("New Purchase Invoice", 70, 15)
    }

    doc.text("To: ", 15, 50);
    doc.text(corporate.companyName, 15, 60);

    doc.text("Invoice No.:", 100, 50);
    doc.text(invoiceDetails[0].invoiceNo, 150, 50);
    doc.text("Invoice Date:", 100, 60);
    doc.text(new Date(invoiceDetails[0].invoiceDate).toLocaleDateString(), 150, 60);

    let tableColumn = [
        "Sr. No.",
        "Employee Name",
        "Product",
        "Quantity",
        "Rate(USD)",
    ]

    if (isRecurring) {
        tableColumn.push("Monthly Cost(USD)")
    } else {
        tableColumn.push("First Time Cost(USD)")
    }

    // tableColumn.push("Total(USD)");

    let tableRows = [];
    let totalPaymentConst = 0;

    // employeeDetails.forEach((emp, idx) => {
        let cost = "$" + isRecurring ?
            parseFloat((
                ((productDetails.reduce((acc, prod) => acc + prod.ros_cost, 0)) / 12)
                * data.firstPaymentTerm).toFixed(2))
            :
            parseFloat((
                ((productDetails.reduce((acc, prod) => acc + prod.ros_cost, 0)) / 12)
                * data.firstPaymentTerm).toFixed(2));

        totalPaymentConst += cost;

        const tblData = [
            { content: 1, rowSpan: 2 },
            { content: [employeeDetails.firstName + " " + employeeDetails.lastName], rowSpan: 2 },
            { content: productDetails.map(prod => `${prod.product_name}`), rowSpan: productDetails.length > 2 ? productDetails.length : 2 },
            { content: productDetails.map(prod => `1`), rowSpan: productDetails.length > 2 ? productDetails.length : 2 },
            { content: "$" + productDetails.map(prod => `${prod.ros_cost}`), rowSpan: productDetails.length > 2 ? productDetails.length : 2 },
            { content: cost, rowSpan: 2 },
        ];
        tableRows.push(tblData);
    // })

    tableRows.push([
        "",
        "",
        { content: "Total", styles: { fontStyle: "bold" } },
        "",
        { content: productDetails.reduce((acc, prod) => acc + prod.ros_cost, 0), styles: { fontStyle: "bold" } },
        { content: totalPaymentConst, styles: { fontStyle: "bold" } },
    ]);

    doc.autoTable(tableColumn, tableRows, { startY: 80 });
    doc.save(`${corporate.companyName}_Order_Invoice_${Date.now()}.pdf`);
}