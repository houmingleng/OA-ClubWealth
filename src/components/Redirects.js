import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Redirects({ to }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to, { replace: true });
  });
  return null;
}
