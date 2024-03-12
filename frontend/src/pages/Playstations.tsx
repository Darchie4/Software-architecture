import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PlayStation } from '../models/PlayStation';
import { ProductType } from '../models/ProductType';

const Playstations = () => {
  const [listOfplaystations, setPlaystations] = useState<PlayStation[]>([]);

  useEffect(() => {
    const fetchPlaystations = async () => {
      try {
        const response = await axios.get<PlayStation[]>('http://localhost:3001/get-products-by-category?productType=PlayStation');
        const playstations = response.data.map(item => new PlayStation(item.title, item.imageUrl, item.basePrice, ProductType.PlayStation));
        setPlaystations(playstations);
      } catch (error) {
        console.error('Error fetching PlayStations:', error);
        setPlaystations([]);
      }
    };

    fetchPlaystations();
  }, []);

  return (
    <div className="content-container">
      <h2>Playstations</h2>
      <div className='product-item-container'>
        {listOfplaystations.map((playstation, index) => (
          <div className='product-item' key={index}>
            <img src={playstation.imageUrl} alt={playstation.title} style={{ width: '100px', height: '100px' }} />
            <h3>{playstation.title}</h3>
            <p>Price: ${playstation.getPrice()}</p>
            <p>Price w/o taxes: ${playstation.getPriceWithoutTaxes()}</p>

          </div>
        ))}
      </div>
    </div>
  );

};

export default Playstations;
