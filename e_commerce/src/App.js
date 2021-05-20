import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen'
import ProductScreen from './Screens/ProductScreen'
import CartScreen from './Screens/CartScreen'
import SigninScreen from './Screens/SigninScreen'
import RegisterScreen from './Screens/RegisterScreen'
import Navbar from './components/Navbar'
import PaymentMethodScreen from "./Screens/PaymentMethodScreen"
import PlaceOrderScreen from "./Screens/PlaceOrderScreen"
import OrderScreen from "./Screens/OrderScreen"
import ShippingAddressScreen from './Screens/ShippingAddressScreen'



function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/" exact={true} component={HomeScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/shipping" component={ShippingAddressScreen} />
          <Route path="/payment" component={PaymentMethodScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="shipping/order/:id" component={OrderScreen} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;



