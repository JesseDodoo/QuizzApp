import React from "react";

import "./index.css";

export default function Answer({ answer, selected }) {
  let className = `answer ${selected ? "selected" : ""}`;
  return <h2 className={className}>{answer}</h2>;
}
