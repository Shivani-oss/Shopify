import React,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux' 
import  {detailsProducts} from '../reducer/productAction'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'


export default function ProductScreen(props) {
    //console.log(props.match.params.id)
    //const product = data.products.find(item => item._id === props.match.params.id)
    const [qty, setQty] = useState(1)
    const productDetail =  useSelector(state => state.productDetail)
    const {product, loading, error} = productDetail
    const dispatch = useDispatch()
    const productId = props.match.params.id

    useEffect(() => {
      dispatch(detailsProducts(productId))
      return () => {
        
      }
    }, [dispatch, productId])

    const handleAddToCart = () => {
      props.history.push("/cart/" + productId + "?qty=" + qty)
    }

    

    return <div>
        {loading ?  <LoadingBox/>:
          error?  <MessageBox variant="danger">{error}</MessageBox>:
          (
            <div className="details">
            <div className="details-image">
            <div className="back-to-result">
            <Link style={{textDecoration: 'none', color: 'darkblue'}} to="/">Back to Home</Link>
              </div>
              <img src={product.image} alt="product"/>
            </div>         
            <div className="details-info">
              <ul>
                <li>
                  <h2>{product.name}</h2>
                </li>
                <li>
                  Price:  <b>Rs. {product.price}</b>
                </li>
                <li>
                  Brand:
                  <b> {product.brand}</b>
                </li>
                <li>
                  Description:
                  <div>{product.description}</div>
                </li>
              </ul>
            </div>
            <div className="details-action">
                <ul>
                    <li>
                        Price: Rs. {product.price}
                    </li>
                    <li>
                        Status: {product.countInStock > 0 ? (
                            <span className="success">In Stock</span>
                        ):(
                            <danger className="success">Unavailable</danger>
                        )}
                    </li>
                    <li>
                        Qty: <select value={qty} onChange={(e) => setQty(e.target.value)}>
                           {[...Array(product.countInStock).keys()].map(x => 
                             <option key={x+1} value={x+1}>{x+1}</option> 
                             )}
                        </select>
                    </li>
                    {product.countInStock > 0 && <button className="button primary full-width" onClick={handleAddToCart}>Add to Cart</button>}
                   
                </ul>
            </div>
        </div>
      
        )
      }
    </div>
}
