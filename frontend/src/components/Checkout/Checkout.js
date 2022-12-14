import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import ResponsiveAppBar from "../Extras/Header/navBar";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Buy, placeOrders } from "../../state/action-creators";
import baseUrl from '../../state/urls'

const steps = ["Payment details", "Review your order"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <PaymentForm />;
    case 1:
      return <Review />;

    default:
      throw new Error("Unknown step");
  }
}

const theme = createTheme();

export default function Checkout() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Login.items);
  const history = useHistory();

  useEffect(() => {
    if (user.length == 0 && !localStorage.getItem("user")) {
      if (localStorage.getItem('vendor') === null) {

        history.push("/Login");
      }
    }
  }, [user]);

  const [activeStep, setActiveStep] = React.useState(0);

  function vendorOrder() {
    dispatch(Buy(user.customer[3]))
    setActiveStep(activeStep + 1);
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  }


  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ResponsiveAppBar />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button
                      variant="contained"
                      onClick={handleBack}
                      sx={{ mt: 3, ml: 1, backgroundColor: "#7C2E41" }}
                    >
                      Back
                    </Button>
                  )}

                  {activeStep === steps.length - 1 ? <Button
                    variant="contained"
                    onClick={vendorOrder}
                    sx={{ mt: 3, ml: 1, backgroundColor: "#7C2E41" }}
                  >
                    Place order
                  </Button> : <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1, backgroundColor: "#7C2E41" }}
                  >
                    Next
                  </Button>}
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
