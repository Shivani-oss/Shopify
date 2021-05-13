import axios from 'axios'
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL} from './productConstant'

const listProduct = () => async (dispatch) => {

    try{
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const {data} = await axios.get("/api/products")
        console.log(data)
        dispatch({ type:PRODUCT_LIST_SUCCESS, payload: data}) 
    }
    catch(error){
        dispatch({ type:PRODUCT_LIST_FAIL, err:error.message }) 
    }
   

}

const detailsProducts = (productId) => async (dispatch) => {
    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST, payload: productId})
        const {data} = await axios.get("/api/products/" + productId)
        dispatch({ type:PRODUCT_DETAILS_SUCCESS, payload: data}) 
    }
    catch(error){
        dispatch({ type:PRODUCT_DETAILS_FAIL, 
            payload:
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
         }) 
    }
}

export  {listProduct , detailsProducts}