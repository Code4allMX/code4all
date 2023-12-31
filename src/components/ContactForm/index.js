import React, { useEffect, useRef, useState } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import HCaptcha from "@hcaptcha/react-hcaptcha";

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
              <form onSubmit={onSubmit}>
                <h3>How may we help you?</h3>
                <input
                  type="email"
                  value={email}
                  placeholder="Your email address"
                  onChange={(evt) => setEmail(evt.target.value)}
                />
                <input type="submit" value="Submit" />
                <HCaptcha
                  sitekey={`${process.env.HCAPTCHA_SITE_KEY}`}
                  size="invisible"
                  onVerify={setToken}
                  ref={captchaRef}
                />
              </form>
            );
          }
        }}
      </BrowserOnly>
    </div>
  );
}
