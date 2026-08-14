import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const downloadOrderReceipt = async (order, userDetails = null) => {
  // Create a new PDF document
  const doc = new jsPDF();

  // Colors
  const primaryDark = [24, 30, 48]; // #181E30
  const gold = [194, 150, 42]; // #C2962A
  const textDark = [50, 50, 50];
  const textLight = [100, 100, 100];
  
  // 1. Header Banner
  doc.setFillColor(primaryDark[0], primaryDark[1], primaryDark[2]);
  doc.rect(0, 0, 210, 40, 'F');
  
  // Try to load and add the logo
  try {
    const response = await fetch('/images/logo_horizontal_transparent.png');
    if (response.ok) {
      const blob = await response.blob();
      const base64data = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
      // Add logo (width 60, height 18 approx for horizontal logo)
      doc.addImage(base64data, 'PNG', 14, 10, 60, 20);
    } else {
      // Fallback text if logo fails to load
      doc.setFont("helvetica", "bold");
      doc.setFontSize(28);
      doc.setTextColor(gold[0], gold[1], gold[2]);
      doc.text('ROHIT TEJPAL', 14, 26);
    }
  } catch (error) {
    // Fallback text
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.setTextColor(gold[0], gold[1], gold[2]);
    doc.text('ROHIT TEJPAL', 14, 26);
  }
  
  // Tagline
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(255, 255, 255);
  doc.text('LUXURY INDIAN WEAR', 196, 26, { align: 'right' });
  
  // 2. Invoice Title & Order Details
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryDark[0], primaryDark[1], primaryDark[2]);
  doc.text('TAX RECEIPT', 14, 55);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(textLight[0], textLight[1], textLight[2]);
  doc.text(`Receipt No: #${order._id.substring(order._id.length - 8).toUpperCase()}`, 196, 50, { align: 'right' });
  const date = new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`Date: ${date}`, 196, 56, { align: 'right' });
  doc.text(`Status: ${order.status}`, 196, 62, { align: 'right' });
  if (order.paymentResult?.id) {
    doc.text(`Payment ID: ${order.paymentResult.id}`, 196, 68, { align: 'right' });
  }
  
  // Divider
  doc.setDrawColor(220, 220, 220);
  doc.line(14, 75, 196, 75);
  
  // 3. Bill To & From
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryDark[0], primaryDark[1], primaryDark[2]);
  doc.text('BILLED TO:', 14, 85);
  doc.text('FROM:', 120, 85);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  const shipping = order.shippingAddress;
  
  // User Details (Name & Email from either shipping or user account)
  const custName = shipping?.fullName || userDetails?.name || 'Customer';
  doc.text(custName.toUpperCase(), 14, 92);
  
  doc.setFont("helvetica", "normal");
  doc.setTextColor(textLight[0], textLight[1], textLight[2]);
  
  // Add User Email if available
  let yPosBilledTo = 97;
  if (userDetails?.email) {
    doc.text(`Email: ${userDetails.email}`, 14, yPosBilledTo);
    yPosBilledTo += 5;
  }
  
  if (shipping) {
    doc.text(`${shipping.houseFlat}, ${shipping.streetArea}`, 14, yPosBilledTo);
    doc.text(`${shipping.city}, ${shipping.state} - ${shipping.pincode}`, 14, yPosBilledTo + 5);
    doc.text(`Phone: ${shipping.phone}`, 14, yPosBilledTo + 10);
  }

  // Rohit Tejpal Official Details
  doc.setFont("helvetica", "bold");
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('ROHIT TEJPAL CLOTHING', 120, 92);
  
  doc.setFont("helvetica", "normal");
  doc.setTextColor(textLight[0], textLight[1], textLight[2]);
  doc.text('Studio 4, Fashion Hub, Hauz Khas', 120, 97);
  doc.text('New Delhi, Delhi - 110016', 120, 102);
  
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryDark[0], primaryDark[1], primaryDark[2]);
  doc.text('Email: rohittejpal@gmail.com', 120, 107);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(textLight[0], textLight[1], textLight[2]);
  doc.text('Phone: +91 9873737512', 120, 112);
  doc.text('www.rohittejpal.com', 120, 117);

  // 4. Add Items Table
  const tableData = order.orderItems.map((item, index) => [
    index + 1,
    item.name,
    item.size || 'N/A',
    item.qty || item.quantity, 
    `Rs. ${item.price.toLocaleString('en-IN')}`,
    `Rs. ${(item.price * (item.qty || item.quantity)).toLocaleString('en-IN')}`
  ]);

  autoTable(doc, {
    startY: 125,
    head: [['#', 'Item Description', 'Size', 'Qty', 'Unit Price', 'Total Amount']],
    body: tableData,
    theme: 'grid',
    headStyles: { 
      fillColor: primaryDark, 
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      halign: 'center'
    },
    styles: { 
      fontSize: 9, 
      cellPadding: 6,
      textColor: textDark,
      lineColor: [220, 220, 220]
    },
    alternateRowStyles: {
      fillColor: [250, 250, 250]
    },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },
      1: { cellWidth: 'auto' },
      2: { cellWidth: 20, halign: 'center' },
      3: { cellWidth: 15, halign: 'center' },
      4: { cellWidth: 30, halign: 'right' },
      5: { cellWidth: 35, halign: 'right', fontStyle: 'bold' }
    }
  });

  // 5. Add Totals
  const finalY = doc.lastAutoTable.finalY + 10;
  
  const itemsPrice = order.itemsPrice || order.totalPrice;
  const shippingPrice = order.shippingPrice || 0;
  const totalPrice = order.totalPrice;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(textLight[0], textLight[1], textLight[2]);
  doc.text('Subtotal:', 150, finalY, { align: 'right' });
  doc.text('Shipping:', 150, finalY + 7, { align: 'right' });
  
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text(`Rs. ${itemsPrice.toLocaleString('en-IN')}`, 196, finalY, { align: 'right' });
  doc.text(`Rs. ${shippingPrice.toLocaleString('en-IN')}`, 196, finalY + 7, { align: 'right' });
  
  // Total Box
  doc.setFillColor(245, 245, 245);
  doc.rect(130, finalY + 12, 70, 12, 'F');
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryDark[0], primaryDark[1], primaryDark[2]);
  doc.text('TOTAL:', 150, finalY + 20, { align: 'right' });
  
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text(`Rs. ${totalPrice.toLocaleString('en-IN')}`, 196, finalY + 20, { align: 'right' });

  // 6. Footer
  const pageHeight = doc.internal.pageSize.getHeight();
  
  doc.setFillColor(primaryDark[0], primaryDark[1], primaryDark[2]);
  doc.rect(0, pageHeight - 20, 210, 20, 'F');
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('THANK YOU FOR SHOPPING WITH US', 105, pageHeight - 11, { align: 'center' });
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(180, 180, 180);
  doc.text('This is a computer-generated receipt and requires no physical signature.', 105, pageHeight - 6, { align: 'center' });

  // Save the PDF
  const filename = `Receipt_Order_${order._id.substring(order._id.length - 8).toUpperCase()}.pdf`;
  doc.save(filename);
};
