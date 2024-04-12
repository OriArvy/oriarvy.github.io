import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function RouteChangeListener() {
  const location = useLocation()
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const path = urlParams.get('path');
    if (path) {
      navigate(path);
    }
  }, [navigate]);


  useEffect(() => {
    localStorage.removeItem('playlists')
  }, [location]);

  return null;
}

export default RouteChangeListener