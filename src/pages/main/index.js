import React, { Component } from "react";
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
    const specialElementHandlers = function(element, renderer) {
      return true;
    };

    const margins = {
      top: 50,
      bottom: 50,
      left: 50,
      width: 900,
      height: 600
    };

    const teste = `
    <div width="950" height="600">
        <table>
          <tr>
              <td>Chinna</td>
          </tr>
        </table> 
        <br />
        <hr>
    </div>

    <canvas id="myCanvas" width="200" height="100" style="border:1px solid;">
    </canvas>

   `;

    var doc = new jsPDF("p", "pt", "letter");
    doc.fromHTML(teste, 120, 20, {
      elementHandlers: specialElementHandlers
    });
    doc.save("testeHtml.pdf");
  };

  render() {
    return (
      <div class="container">
        <div className="testdiv">
          <h1>Teste1</h1>
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
