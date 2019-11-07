import React, { Component } from "react";
import { Button } from "antd";
import * as jsPDF from "jspdf";
import api from "../../services/api";
import "./style.css";

import "jspdf-autotable";

export default class Main extends Component {
  state = {
    boletos: []
  };

  componentDidMount() {
    this.loadBoletos();
  }

  loadBoletos = async () => {
    const response = await api.get("/");
    this.setState({ boletos: response.data.docs });
  };

  jsPdfGenerator = () => {
    // Example From https://parall.ax/products/jspdf
    var doc = new jsPDF("p", "pt");

    doc.text(20, 20, "This is the default font.");

    doc.setFont("courier");
    doc.setFontType("normal");
    doc.text(20, 30, "This is courier normal.");

    doc.setFont("times");
    doc.setFontType("italic");
    doc.text(20, 40, "This is times italic.");

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.text(20, 50, "This is helvetica bold.");

    doc.setFont("courier");
    doc.setFontType("bolditalic");
    doc.text(20, 60, "This is courier bolditalic.");

    // doc.html(document.body, {
    // callback: function(doc) {
    doc.save("Generated.pdf");
    //   }
    // });
  };

  jsPdfGeneratorHtml = () => {
    const teste = `
    <html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Your Canvas</title>

<style type="text/css">container {  }
imageTemp { position: absolute; top: 1px; left: 1px; }
</style>

</head>
<body>
<canvas id="imageView" width="600" height="500"></canvas>

<script type="text/javascript">
var canvas, context, canvaso, contexto;
canvaso = document.getElementById('imageView');
context = canvaso.getContext('2d');
context.lineWidth = 5;

context.strokeStyle = '#000000';
context.beginPath();
context.moveTo(160, 68);

context.strokeStyle = '#000000';
context.strokeRect(74, 63, 416, 225);
</script>
</body>
</html>
    
    <div id="testdiv" style="border: solid 2px; font-size: 50px;"><div>teste1</div></div>
    `;

    var doc = new jsPDF();
    doc.fromHTML(teste, 20, 20, {
      width: 500
    });
    doc.save("testeHtml.pdf");
  };

  render() {
    return (
      <div class="container">
        <div className="testdiv">
          <h1>Teste1</h1>
          <h2>Teste2</h2>
          <h3>Teste2</h3>
          <h4>Teste4</h4>
        </div>
        <p>
          <button class="button" onClick={this.jsPdfGenerator}>
            Gerar PDF
          </button>
        </p>
        <br />
        <p>
          <button class="button" onClick={this.jsPdfGeneratorHtml}>
            Gerar PDF de HTML
          </button>
        </p>
      </div>
    );
  }
}
