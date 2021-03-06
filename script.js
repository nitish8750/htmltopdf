var chart1 = new CanvasJS.Chart("chartContainer1", {
  title: {
    text: "Column Chart",
  },
  data: [
    {
      type: "column",
      dataPoints: [
        { x: 10, y: 71 },
        { x: 20, y: 55 },
        { x: 30, y: 50 },
        { x: 40, y: 65 },
        { x: 50, y: 95 },
        { x: 60, y: 68 },
        { x: 70, y: 28 },
        { x: 80, y: 34 },
        { x: 90, y: 14 },
      ],
    },
  ],
});

chart1.render();

var chart2 = new CanvasJS.Chart("chartContainer2", {
  title: {
    text: "Spline Chart",
  },
  data: [
    {
      type: "spline",
      dataPoints: [
        { x: 10, y: 71 },
        { x: 20, y: 55 },
        { x: 30, y: 50 },
        { x: 40, y: 65 },
        { x: 50, y: 95 },
        { x: 60, y: 68 },
        { x: 70, y: 28 },
        { x: 80, y: 34 },
        { x: 90, y: 14 },
      ],
    },
  ],
});

chart2.render();

var chart = new CanvasJS.Chart("funnelContainer", {
  animationEnabled: true,
  title: {
    text: "Desktop Search Engine Market Share - 2016",
  },
  data: [
    {
      type: "pie",
      startAngle: 240,
      yValueFormatString: '##0.00"%"',
      indexLabel: "{label} {y}",
      dataPoints: [
        { y: 79.45, label: "Google" },
        { y: 7.31, label: "Bing" },
        { y: 7.06, label: "Baidu" },
        { y: 4.91, label: "Yahoo" },
        { y: 1.26, label: "Others" },
      ],
    },
  ],
});
chart.render();


document.querySelector("#exportButton").addEventListener("click", () => {
    
    //  html2canvas(document.querySelector("#chartsContainer"), {
    //    scrollX: -window.scrollX,
    //  }).then((canvas) => {
    //    var dataURL = canvas.toDataURL("image/png");
    //    var pdf = new jsPDF();
    //    pdf.addImage(dataURL, "JPEG", 0, 0, 200, 200); //addImage(image, format, x-coordinate, y-coordinate, width, height)
    //    pdf.save("CanvasJS Charts.pdf");
    //  });

    /// so 1
    // html2canvas(document.getElementById("chartsContainer"), {
    //   dpi: 200, // Export pdf resolution
    //   useCORS: true, // [Important] Enable cross-domain configuration
    // }).then(function (canvas) {
    //   // document.body.appendChild(canvas);
    //   let contentWidth = canvas.width;
    //   let contentHeight = canvas.height;

    //   //One page pdf shows the canvas height generated by html page;
    //   let pageHeight = (contentWidth / 592.28) * 841.89;
    //   //Html page height without pdf generated
    //   let leftHeight = contentHeight;
    //   //pdf page offset
    //   let position = 0;
    //   //The width and height of the canvas generated in the html page in pdf (the size of a4 paper [595.28,841.89])
    //   let imgWidth = 595.28;
    //   let imgHeight = (592.28 / contentWidth) * contentHeight;

    //   let pageData = canvas.toDataURL("image/jpeg", 1);
    //   let pdf = new jsPDF("", "pt", "a4");

    //   //There are two heights that need to be distinguished, one is the actual height of the html page, and the page height of the generated pdf (841.89)
    //   //When the content does not exceed the range of one page of pdf, no pagination is required
    //   if (leftHeight < pageHeight) {
    //     pdf.addImage(pageData, "JPEG", 10, 10, imgWidth, imgHeight);
    //   } else {
    //     while (leftHeight > 0) {
    //       pdf.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight);
    //       leftHeight -= pageHeight;
    //       position -= 841.89;
    //       //Avoid adding blank pages
    //       if (leftHeight > 0) {
    //         pdf.addPage();
    //       }
    //     }
    //   }
    //   pdf.save("TestReport.pdf");
    // });

    
});




