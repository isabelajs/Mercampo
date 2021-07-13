import React from 'react'
import UnitPrice from './UnitPrice'
import '../../assets/styles/componentes/ProfileNewProduct/TableUnitPrices.scss'

const TableUnitPrices = (props)=>{

  const {infoProduct,handleUnitName,handleUnitPrice,insertNewPrice,deletePrice} = props
  
  return (
    <div className="l-table">
      <table>
        <colgroup>
          <col className="colNames" />
          <col className="colPrices" />
          <col className="colOptions" />
        </colgroup>

        <tbody>
          <tr>
            <td>
              <p>Unidad</p>
            </td>
            <td>
              <p>Precio</p>
            </td>
            <td></td>
          </tr>

          {infoProduct.prices.map((item, index) => (
            <UnitPrice
              key={index}
              index={index}
              {...item}
              handleUnitPrice={handleUnitPrice}
              handleUnitName={handleUnitName}
              deletePrice={deletePrice}
            />
          ))}

          <tr>
            <td className="newProduct__addUnitPrice" colSpan="3">
              <div
                className="button button--icon"
                onClick={insertNewPrice}
              >
                <svg
                  className="button__icon"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    y="8.65381"
                    width="2.88462"
                    height="15"
                    rx="1.44231"
                    transform="rotate(-90 0 8.65381)"
                    fill="#2EC4B6"
                  />
                  <rect
                    x="6.34607"
                    width="2.88462"
                    height="15"
                    rx="1.44231"
                    fill="#2EC4B6"
                  />
                </svg>

                <p>Nuevo</p>
              </div>
            </td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}


export default TableUnitPrices