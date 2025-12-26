import jsPDF from 'jspdf';
import 'jspdf-autotable';

/**
 * High-End B2B PDF Generation logic.
 */
export const generateQuotePDF = (data) => {
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString();

  // Header Styling
  doc.setFontSize(22);
  doc.setTextColor(30, 58, 138); // Dark Blue
  doc.text("AI-SMART PROFESSIONAL QUOTE", 14, 25);
  
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text(`Doc Reference: #EST-${Math.random().toString(36).substr(2, 6).toUpperCase()}`, 14, 32);
  doc.text(`Issue Date: ${date}`, 14, 37);
  doc.text(`Market Context: ${data.region}`, 14, 42);

  // Table Logic
  doc.autoTable({
    startY: 50,
    head: [['Component', 'Selected Parameter']],
    body: [
      ['Primary Service Category', data.niche],
      ['Specific Project Task', data.task],
      ['Global Market Region', data.region.replace('_', ' ')],
      ['Scope of Project', data.scale.toUpperCase()],
      ['Build Complexity', data.complexity.toUpperCase()],
      ['Material/Execution Quality', data.quality.toUpperCase()],
      ['Timeline Urgency', data.urgency.toUpperCase()],
    ],
    theme: 'striped',
    headStyles: { fillColor: [37, 99, 235], fontSize: 11, fontStyle: 'bold' },
    styles: { fontSize: 10, cellPadding: 6 }
  });

  const finalY = doc.lastAutoTable.finalY + 15;
  
  // Pricing
  doc.setFontSize(18);
  doc.setTextColor(0);
  doc.text(`Estimated Total Valuation: $${data.total.toLocaleString()}`, 14, finalY);

  // Disclaimer
  doc.setFontSize(8);
  doc.setTextColor(160);
  const disclaimer = "LEGAL NOTICE: This automated estimate is based on statistical market averages and user input variables. It is intended for budgeting purposes only and does not represent a final binding agreement. All projects are subject to on-site physical verification and full contract execution.";
  const splitDisclaimer = doc.splitTextToSize(disclaimer, 180);
  doc.text(splitDisclaimer, 14, finalY + 20);

  doc.save(`Quote_${data.niche}_${date}.pdf`);
};