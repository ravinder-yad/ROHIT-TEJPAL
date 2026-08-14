import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const downloadOrderReceipt = (order, userDetails = null) => {
  // Create a new PDF document
  const doc = new jsPDF();

  // 1. Add Brand / Logo Text
  doc.setFontSize(22);
  doc.setTextColor(24, 30, 48); // Primary dark color
  doc.text('ROHIT TEJPAL', 14, 20);

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('Official Order Receipt', 14, 28);
  doc.text('support@rohittejpal.com', 14, 33);
  doc.text('Phone: +91 9873737512', 14, 38);

  // 2. Add Order Info
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Order ID: #${order._id.substring(order._id.length - 8).toUpperCase()}`, 120, 20);
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const date = new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`Date: ${date}`, 120, 26);
  doc.text(`Status: ${order.status}`, 120, 31);
  if (order.paymentResult?.id) {
    doc.text(`Payment ID: ${order.paymentResult.id}`, 120, 36);
  }

  // 3. Add Customer Details
  doc.setFontSize(14);
  doc.setTextColor(24, 30, 48);
  doc.text('Billed To:', 14, 50);
  
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  const shipping = order.shippingAddress;
  const custName = shipping?.fullName || userDetails?.name || 'Customer';
  doc.text(custName, 14, 57);
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  if (shipping) {
    doc.text(`${shipping.houseFlat}, ${shipping.streetArea}`, 14, 62);
    doc.text(`${shipping.city}, ${shipping.state} - ${shipping.pincode}`, 14, 67);
    doc.text(`Phone: ${shipping.phone}`, 14, 72);
  } else if (userDetails?.email) {
    doc.text(userDetails.email, 14, 62);
  }

  // 4. Add Items Table
  const tableData = order.orderItems.map((item, index) => [
    index + 1,
    item.name,
    item.size || 'N/A',
    item.qty || item.quantity, // Admin model might use 'qty' while frontend uses 'quantity'
    `Rs. ${item.price.toLocaleString('en-IN')}`,
    `Rs. ${(item.price * (item.qty || item.quantity)).toLocaleString('en-IN')}`
  ]);

  doc.autoTable({
    startY: 85,
    head: [['#', 'Product', 'Size', 'Qty', 'Unit Price', 'Total']],
    body: tableData,
    theme: 'striped',
    headStyles: { fillColor: [24, 30, 48], textColor: [255, 255, 255] },
    styles: { fontSize: 10, cellPadding: 4 },
    columnStyles: {
      0: { cellWidth: 10 },
      1: { cellWidth: 'auto' },
      2: { cellWidth: 20 },
      3: { halign: 'center', cellWidth: 15 },
      4: { halign: 'right', cellWidth: 30 },
      5: { halign: 'right', cellWidth: 30 }
    }
  });

  // 5. Add Totals
  const finalY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  
  const itemsPrice = order.itemsPrice || order.totalPrice;
  const shippingPrice = order.shippingPrice || 0;
  const totalPrice = order.totalPrice;

  doc.text(`Subtotal: Rs. ${itemsPrice.toLocaleString('en-IN')}`, 140, finalY);
  doc.text(`Shipping: Rs. ${shippingPrice.toLocaleString('en-IN')}`, 140, finalY + 6);
  
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(194, 150, 42); // Gold color for total
  doc.text(`Total: Rs. ${totalPrice.toLocaleString('en-IN')}`, 140, finalY + 14);

  // 6. Footer
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text('Thank you for shopping with Rohit Tejpal!', 14, 280);
  doc.text('This is a computer-generated receipt and requires no physical signature.', 14, 285);

  // Save the PDF
  const filename = `Receipt_Order_${order._id.substring(order._id.length - 8).toUpperCase()}.pdf`;
  doc.save(filename);
};
