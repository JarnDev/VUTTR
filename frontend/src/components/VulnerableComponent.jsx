// VulnerableComponent.jsx
// A deliberately insecure React component for SAST testing purposes only.
// DO NOT ship this code!

import { useEffect, useState } from "react";
import qs from "query-string";

export default function VulnerableComponent() {
  const [html, setHtml] = useState("");
  const params = qs.parse(window.location.search);

  // --- Vulnerability #1: Storing sensitive data in localStorage -------------
  useEffect(() => {
    if (params.token) {
      localStorage.setItem("authToken", params.token); // Sensitive token in storage
    }
  }, [params.token]);

  // --- Vulnerability #2: Fetching over plain HTTP --------------------------
  async function fetchProfile() {
    const res = await fetch(`http://localhost:3000/profile?token=${params.token}`); // No HTTPS
    const data = await res.text();
    setHtml(data);
  }

  // --- Vulnerability #3: Rendering unsanitized HTML ------------------------
  const dangerousMarkup = { __html: html || params.rawHtml };
  return (
    <div>
      <h1>Vulnerable Component Demo</h1>
      <button onClick={fetchProfile}>Load Profile</button>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={dangerousMarkup} />
    </div>
  );
}
