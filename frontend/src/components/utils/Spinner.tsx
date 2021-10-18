import React from 'react'
import loadingGIF from '../../assets/loading.gif';
import './Spinner.css';

const Spinner = () => <img className="spinner" src={loadingGIF} alt="Loading" />;

export default Spinner;
