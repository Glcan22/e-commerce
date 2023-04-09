import { useState } from 'react';
import { FiUser } from 'react-icons/fi';
import AddProduct from './AddProduct';
import DeleteProduct from './DeleteProduct';
import UpdateProduct from './UpdateProduct';
import './Mya.css';

const Mya = () => {
  const [activeOption, setActiveOption] = useState('Add Product');

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  const renderOption = () => {
    switch (activeOption) {
      case 'Add Product':
        return <AddProduct />;
      case 'Delete Product':
        return <DeleteProduct />;
      case 'Update Product':
        return <UpdateProduct />;
      default:
        return null;
    }
  };
  const username = localStorage.getItem("username");
  const authorized = localStorage.getItem("authorized");

  return (
    <div className="sidebar">
      <ul>
        <li>
      <h3>
        <FiUser className="outlined-user-icon" />{authorized ? "Hi, non role": "Welcome sir, "+username}
      </h3> </li>
          <li>
          <button onClick={() => handleOptionClick('Add Product')}>
            Add Product
          </button>
        </li>
        <li>
          <button onClick={() => handleOptionClick('Delete Product')}>
            Delete Product
          </button>
        </li>
        <li>
          <button onClick={() => handleOptionClick('Update Product')}>
            Update Product
          </button>
        </li>
      </ul>
      <div className="content">{renderOption()}</div>
    </div>
  );
};

export default Mya;