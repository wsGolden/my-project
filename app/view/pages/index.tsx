import { useState, useEffect } from "react";
import { Table, Form, Input, Button, message } from "antd";
import Home from "./Home";

export default function Index(props) {
  return (
    <div>
      <Home {...props} />
    </div>
  );
}
