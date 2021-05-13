import React,{useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import {listProduct} from '../reducer/productAction'


export default function HomeScreen() {

    // const [products, setProducts] = useState([])
    const productList = useSelector(state => state.productList) //redux - state
    const {products, loading, error} = productList
    const dispatch = useDispatch()

    useEffect(() => { 
        // const fetchData = async () => {
        // const {data} = await axios.get("/api/products")
        // setProducts(data)
        // }
        dispatch(listProduct())
       //  fetchData()
    }, [dispatch])
    
    return (
      loading ? <LoadingBox/> : 
      error ? <MessageBox variant="danger">{error}</MessageBox>: 
        <div>
        <ul className="products">
        {
          products.map(product =>{
             return(
                <li key={product._id}>
                  <div className="product">
                  <div className="card">
                  <div className="imgBox">
                    <Link to={'/product/'+ product._id}><img src={product.image} alt="products"/></Link>      
                  </div>
                  <div className="content">
                    <h2><Link style={{textDecoration: 'none', color: 'black'}} 
                        to={'/product/'+ product._id}>{product.brand}</Link>
                    </h2>
                    <p>{product.name}</p>
                    <p>Rs. {product.price}</p>
                  </div>
                  </div>
                  </div>
                </li> 
             ) 
          })
        }
        </ul>
      </div>
    )
      
       
}
