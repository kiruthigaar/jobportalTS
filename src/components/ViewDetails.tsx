import React, { useState, ChangeEvent } from 'react';
import { Button } from 'react-bootstrap';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom'
import Pdfcontent from './Pdfcontent';

const ViewDetails:React.FC = () => {

  const navigate = useNavigate()
  const [isGenerating, setIsGenerating] = useState(false);

 
  const printForm = () => {
    window.print();
  };
  const downloadPDF = () => {
    setIsGenerating(true);

    const downloadButton = document.getElementById('download-button') as HTMLButtonElement | null;
    const printButton = document.getElementById('print-button') as HTMLButtonElement | null;
    const backButton = document.getElementById('back-button') as HTMLButtonElement | null;
    
    if (downloadButton) {
      downloadButton.style.display = 'none'; // Hide the download button
    }
    if (printButton) {
      printButton.style.display = 'none'; // Hide the print button
    }
    if (backButton) {
      backButton.style.display = 'none'; // Hide the print button
    }


    const input = document.getElementById('formContainer');
    if (!input) {
      console.error('Element not found');
      return;
    }

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210; // A4 size in mm
      const pageHeight = 295; // A4 size in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, -heightLeft, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('form-data.pdf');
      setIsGenerating(false);

      setTimeout(() => {
        if (downloadButton) {
          downloadButton.style.display = 'block';
        }
        if (printButton) {
          printButton.style.display = 'block'; 
        }
        if (backButton) {
            backButton.style.display = 'block'; 
        }
        setIsGenerating(false);
      }, 100);
    
    });
  };

  const handleBack = (e:ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    navigate('/')
  }


  return (
    <div className="d-flex justify-content-center">
      <div id="formContainer">
        <h2>Applied Job Details</h2>
        
          <Button variant="secondary" onClick={printForm} className="ml-2 btnDetails" id="print-button" disabled={isGenerating}>
            Print
          </Button>

          <Button variant="secondary" onClick={downloadPDF} className="ml-2 btnDetails" id="download-button" disabled={isGenerating}>
            Download as PDF
          </Button>
        
          <Pdfcontent />
        
        <Button variant="secondary" onClick={() => handleBack} className="ml-2 btnDetails" id="back-button" disabled={isGenerating}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default ViewDetails;

