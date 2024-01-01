import React from "react";
import Layout from "@theme/Layout";
import ContactForm from "../components/ContactForm";

export default function Hello() {
  return (
    <Layout title="Get in touch" description="">
      <main>
        <ContactForm />
      </main>
    </Layout>
  );
}
