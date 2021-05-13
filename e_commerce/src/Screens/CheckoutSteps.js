import React from "react"
import {useSelector} from 'react-redux' 
import PropTypes from "prop-types"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import clsx from "clsx"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import HomeIcon from '@material-ui/icons/Home'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import StepConnector from "@material-ui/core/StepConnector"
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import ShippingAddressScreen from "./ShippingAddressScreen"
import PaymentMethodScreen from "./PaymentMethodScreen"
import PlaceOrderScreen from "./PlaceOrderScreen"



const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
    marginTop:80
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    }
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)"
    }
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  }
})(StepConnector)

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 55,
    height: 55,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginTop:80
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)"
  },
  icon: { 
      fontSize: 25
  },
  
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles()
  const { active, completed } = props;

  const icons = {
    1: <AccountBoxIcon className={classes.icon}/>,
    2: <HomeIcon className={classes.icon}/>,
    3: <AccountBalanceWalletIcon className={classes.icon}/>,
    4: <LocalShippingIcon className={classes.icon}/>
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginInlineStart: theme.spacing(25),
     fontSize: 15,
     padding: 2,
     width: 100,
     height: 40,
     top:-75,
  },
  button1: {
    marginInlineStart: theme.spacing(5),
     fontSize: 15,
     padding: 2,
     width: 100,
     height: 40,
     top:-75,
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

function getSteps() {
  return [
    "Sigin",
    "Shipping",
    "Payment",
    "Place Order"
  ];
}

function getStepContent(step) {
  switch (step) {
    case 1:
      return <ShippingAddressScreen />
    case 2:
      return <PaymentMethodScreen />
    case 3:
      return <PlaceOrderScreen />
    default:
      return "Unknown step";
  }
}

export default function CheckoutSteps(props) {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(1)
  const steps = getSteps()
  const userSignin = useSelector(state => state.userSignin)
  const {userInfo} = userSignin
  const cart = useSelector(state => state.cart)
  const {shippingAddress} = cart
  
  if(!userInfo) {
        props.history.push('/signin')
  }
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(1);
  }

  return (
      <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}><Typography variant="h4">{label}</Typography></StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 1}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button1}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
      </div>
    
  )
}
