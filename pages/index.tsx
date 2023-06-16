import { useState, useEffect } from "react";
import { Table, Form, Input, Button, message } from "antd";
import AV from "leancloud-storage";

import EditModal from "./EditModal";
import Home from "./Home";
interface Record {
  id: string;
}
export default function Index() {
  return (
    <div>
      <Home />
    </div>
  );
}
