import React from "react"
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
import { Typography } from "@material-ui/core"



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
  const { active, completed } = props

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
  font: {
    fontSize: "2rem"
  }
}))

function getSteps() {
  return [
    "Sigin",
    "Shipping",
    "Payment",
    "Place Order"
  ]
}



export default function CheckoutSteps(props) {
  const classes = useStyles()
  const steps = getSteps()

  const activeStep = props.step;
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
      </div>
    </div>
  )
}
