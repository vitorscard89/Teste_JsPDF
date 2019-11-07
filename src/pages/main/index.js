import React, { Component } from 'react';
import { Button,  } from 'antd';
import jsPDF from 'jspdf'
import api from '../../services/api';
import './style.css';

import 'jspdf-autotable';

export default class Main extends Component{

  state = {
    boletos: [],
  }

  componentDidMount() {
    this.loadBoletos();
  };

  loadBoletos = async () => {
    const response = await api.get('/');
    this.setState({ boletos: response.data.docs });

  };

  jsPdfGenerator = () => {

    // Example From https://parall.ax/products/jspdf
    var doc = new jsPDF('p', 'pt');
    
    doc.text(20, 20, 'This is the default font.')

    doc.setFont('courier')
    doc.setFontType('normal')
    doc.text(20, 30, 'This is courier normal.')

    doc.setFont('times')
    doc.setFontType('italic')
    doc.text(20, 40, 'This is times italic.')

    doc.setFont('helvetica')
    doc.setFontType('bold')
    doc.text(20, 50, 'This is helvetica bold.')

    doc.setFont('courier')
    doc.setFontType('bolditalic')
    doc.text(20, 60, 'This is courier bolditalic.')
    
    // Save the Data
    doc.save('Generated'.pdf)
}

  render() {
    return(
      <div class="container">
        <button class="button" onClick={this.jsPdfGenerator}>Gerar PDF</button>
      </div>      
     )
  }
}