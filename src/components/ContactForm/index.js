import React, { useEffect, useRef, useState } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import HCaptcha from "@hcaptcha/react-hcaptcha";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@docusaurus/Link";

export default function ContactForm() {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const captchaRef = useRef(null);

  const onSubmit = (event) => {
    event.preventDefault();
    captchaRef.current.execute();
  };

  const urlEncodeObject = (obj) => {
    return Object.keys(obj)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]))
      .join("&");
  };

  useEffect(() => {
    async function fetchData() {
      try {
        if (token) {
          const data = {
            secret: process.env.HCAPTCHA_SITE_SECRET,
            response: token,
          };
          const encData = urlEncodeObject(data);

          // send message
          const response = await fetch(process.env.HCAPTCHA_VERIFY_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Content-Length": encData.length.toString(),
            },
            body: encData,
          });
          console.log("response::", response);
          const response_json = JSON.parse(response.content);
          const success = response_json["success"];

          if (success) {
            setSent(true);
            console.info("Success");
          } else {
            console.error("Something went wrong :(");
          }
        }
      } catch (error) {
        console.error("Something went wrong :(");
      }
    }
    fetchData();
  }, [token, email]);

  return (
    <div id="signup" className="signup-form">
      <BrowserOnly fallback={<div>Loading...</div>}>
        {() => {
          if (sent) {
            // signup submitted
            return <div>Thank you! We will get in touch with you.</div>;
          } else {
            // signup form
            return (
              <div className="container">
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "75ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <h1 style={{ margin: "8px" }}>How may we help you?</h1>
                  </div>
                  <div>
                    <TextField error required id="outlined-required" label="Nombre" helperText="Incorrect entry." />
                  </div>
                  <div>
                    <TextField
                      required
                      id="outlined-required"
                      label="Apellidos"
                    />
                  </div>
                  <div>
                    <TextField
                      required
                      id="outlined-multiline-static"
                      label="Description"
                      multiline
                      rows={4}
                    />
                  </div>
                  <div>
                    <Link
                      className="button button--secondary button--lg"
                      style={{
                        backgroundColor: "#E80052",
                        color: "white",
                        margin: "8px",
                      }}
                      onClick={onSubmit}
                    >
                      Submit
                    </Link>
                  </div>
                  <HCaptcha
                    sitekey={`${process.env.HCAPTCHA_SITE_KEY}`}
                    size="invisible"
                    onVerify={setToken}
                    ref={captchaRef}
                  />
                </Box>
              </div>
            );
          }
        }}
      </BrowserOnly>
    </div>
  );
}
