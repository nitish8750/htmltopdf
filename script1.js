var pdf,
  page_section,
  HTML_Width,
  HTML_Height,
  top_left_margin,
  PDF_Width,
  PDF_Height,
  canvas_image_width,
  canvas_image_height;

function calculatePDF_height_width(selector, index) {
  page_section = $(selector).eq(index);
  HTML_Width = page_section.width();
  HTML_Height = page_section.height();
  top_left_margin = 15;
  PDF_Width = HTML_Width + top_left_margin * 2;
  PDF_Height = PDF_Width * 1.2 + top_left_margin * 2;
  canvas_image_width = HTML_Width;
  canvas_image_height = HTML_Height;
}

//Generate PDF
function generatePDF() {
  pdf = "";
  $("#downloadbtn").hide();
  $("#genmsg").show();
  html2canvas($(".print-wrap:eq(0)")[0], { allowTaint: true }).then(function (
    canvas
  ) {
    calculatePDF_height_width(".print-wrap", 0);
    var imgData = canvas.toDataURL("image/png", 1.0);
    pdf = new jsPDF("p", "pt", [PDF_Width, PDF_Height]);
    pdf.addImage(
      imgData,
      "JPG",
      top_left_margin,
      top_left_margin,
      HTML_Width,
      HTML_Height
    );
  });

  html2canvas($(".print-wrap:eq(1)")[0], { allowTaint: true }).then(function (
    canvas
  ) {
    calculatePDF_height_width(".print-wrap", 1);

    var imgData = canvas.toDataURL("image/png", 1.0);
    pdf.addPage(PDF_Width, PDF_Height);
    pdf.addImage(
      imgData,
      "JPG",
      top_left_margin,
      top_left_margin,
      HTML_Width,
      HTML_Height
    );
  });

  html2canvas($(".print-wrap:eq(2)")[0], { allowTaint: true }).then(function (
    canvas
  ) {
    calculatePDF_height_width(".print-wrap", 2);

    var imgData = canvas.toDataURL("image/png", 1.0);
    pdf.addPage(PDF_Width, PDF_Height);
    pdf.addImage(
      imgData,
      "JPG",
      top_left_margin,
      top_left_margin,
      HTML_Width,
      HTML_Height
    );

    //console.log((page_section.length-1)+"==="+index);
    setTimeout(function () {
      //Save PDF Doc
      pdf.save("HTML-Document.pdf");

      //Generate BLOB object
      var blob = pdf.output("blob");

      //Getting URL of blob object
      var blobURL = URL.createObjectURL(blob);

      //Showing PDF generated in iFrame element
      var iframe = document.getElementById("sample-pdf");
      iframe.src = blobURL;

      //Setting download link
      var downloadLink = document.getElementById("pdf-download-link");
      downloadLink.href = blobURL;

      $("#sample-pdf").slideDown();

      $("#downloadbtn").show();
      $("#genmsg").hide();
    }, 0);
  });
}

var targetDom = $("#qyjxpjzdContent"); //Get the dom to be exported

/*If you have svg on your page, please enable the following functions
     Because html2canvas cannot fully recognize svg or does not recognize the attributes of some elements in svg, such as: filter and text-anchor in the entire.html page, so first convert svg to canvas*/
/*
var svg = $('#qyjxpjzdContent').find('svg'); 
var svgParentNode = svg.parent();
function svg2canvas(targetElement) {
  var svgElement = targetElement.find('svg')
  svgElement.each(function (index, node) {
    var parentNode = node.parentNode
         //Because the IE browser cannot directly fetch the content of the svg, first create a temporary div
         var temporary = document.createElement('div') //temporary div
    temporary.appendChild(node)
    var svg = temporary.innerHTML
    var canvas = document.createElement('canvas');
         canvg(canvas, svg) //Use the canvg function in canvg2.js introduced to convert svg
    parentNode.insertBefore(canvas, parentNode.childNodes[0])
  })
 
     //TODO: multiple svg
}
if (svg.length > 0) {
  svg2canvas(targetDom);
}
setTimeout(function () { svgParentNode.empty().append(svg); }, 500)
*/

// Dynamically sort A4 paper by white gap
function htmlToPdf(dom) {
  var myDate = new Date();
  var timeStr =
    myDate.getFullYear() +
    "-" +
    (myDate.getMonth() + 1) +
    "-" +
    myDate.getDate();
  html2canvas(dom, {
    background: "#fff",
    onrendered: function (canvas) {
      var leftHeight = canvas.height;
      var position = 0;
      var a4Width = 595.28;
      var a4Height = 841.89;
      var a4HeightRef = Math.floor((canvas.width / a4Width) * a4Height);
      var pageData = canvas.toDataURL("image/jpeg", 1.0);
      var pdf = new jsPDF("x", "pt", "a4");
      var index = 0,
        canvas1 = document.createElement("canvas"),
        height;

      pdf.setDisplayMode("fullwidth", "continuous", "FullScreen");
      $("body").append(
        $(
          '<div class="pdfTip">' +
            '<div>Generating page <span class="pdfProgress">1</span> out of <span class="pdfTotal"></span> pages...' +
            "</div>"
        )
      );

      function createImpl(canvas) {
        if (leftHeight > 0) {
          index++;

          var checkCount = 0;
          if (leftHeight > a4HeightRef) {
            var i = position + a4HeightRef;
            for (i = position + a4HeightRef; i >= position; i--) {
              var isWrite = true;
              for (var j = 0; j < canvas.width; j++) {
                var c = canvas.getContext("2d").getImageData(j, i, 1, 1).data;
                if (c[0] != 0xff || c[1] != 0xff || c[2] != 0xff) {
                  isWrite = false;
                  break;
                }
              }
              if (isWrite) {
                checkCount++;
                if (checkCount >= 10) {
                  break;
                }
              } else {
                checkCount = 0;
              }
            }
            height =
              Math.round(i - position) || Math.min(leftHeight, a4HeightRef);
            if (height <= 0) {
              height = a4HeightRef;
            }
          } else {
            height = leftHeight;
          }
          canvas1.width = canvas.width;
          canvas1.height = height;
          // console.log(index, 'height:', height, 'pos', position);
          var ctx = canvas1.getContext("2d");
          ctx.drawImage(
            canvas,
            0,
            position,
            canvas.width,
            height,
            0,
            0,
            canvas.width,
            height
          );
          var pageHeight = Math.round((a4Width / canvas.width) * height);
          pdf.setPageSize(null, pageHeight);
          pdf.addPage();
          pdf.addImage(
            canvas1.toDataURL("image/jpeg", 1.0),
            "JPEG",
            0,
            0,
            a4Width,
            (a4Width / canvas1.width) * height
          );
          leftHeight -= height;
          position += height;
          $(".pdfProgress").text(index + 1);
          $(".pdfTotal").text(index + Math.ceil(leftHeight / a4HeightRef));
          if (leftHeight > 0) {
            setTimeout(createImpl, 500, canvas);
          } else {
            pdf.save(pdfName + ".pdf");
            $(".pdfTip").hide();
          }
        }
      }

      //When the content does not exceed the range displayed on one page of the pdf, no need to page
      if (leftHeight < a4HeightRef) {
        pdf.addImage(
          pageData,
          "JPEG",
          0,
          0,
          a4Width,
          (a4Width / canvas.width) * leftHeight
        );
        pdf.save(pdfName + ".pdf");
      } else {
        try {
          pdf.deletePage(0);
          $(".pdfTip").show();
          $(".pdfTotal").text(index + Math.ceil(leftHeight / a4HeightRef));
          setTimeout(createImpl, 500, canvas);
        } catch (err) {
          console.log(err);
        }
      }
    },
  });
}



    var index = 0;
    var count = parseInt(contentHeight / pageHeight);

    var page = document.createElement("div");

    page.style.position = "absolute";
    page.style.width = contentWidth + "px";
    page.style.height = pageHeight + "px";
    page.style.backgroundImage = "url(" + imgData + ")";
    page.style.backgroundRepeat = "norepeat";

    document.body.appendChild(page);

    function addPage(i, onFinished) {
      page.style.backgroundPositionY = -pageHeight * i + "px";

      html2canvas(page, {
        onrendered: function (canvas) {
          var pageData = canvas.toDataURL("image/jpeg");

          pdf.addImage(
            pageData,
            "JPEG",
            0,
            0,
            pdfFormat[format][0],
            pdfFormat[format][1]
          );

          if (i + 1 < count) {
            pdf = pdf.addPage();
            addPage(i + 1, onFinished);
          } else {
            onFinished();
          }
        },
      });
    }

    addPage(index, function () {
      page.style.backgroundPositionY = -pageHeight * count + "px";

      var lastPageHeight = contentHeight % pageHeight;
      page.style.height = lastPageHeight + "px";

      html2canvas(page, {
        onrendered: function (canvas) {
          var pageData = canvas.toDataURL("image/jpeg");

          pdf = pdf.addPage();
          pdf.addImage(
            pageData,
            "JPEG",
            0,
            0,
            pdfFormat[format][0],
            (pdfFormat[format][1] / pageHeight) * lastPageHeight
          );

          document.body.removeChild(page);

          onSuccess && onSuccess();

          pdf.save(pdfName);
        },
      });
    });