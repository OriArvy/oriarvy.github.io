import { useLocation,  } from "react-router-dom";
import { useEffect } from "react";

function RouteChangeListener() {
  const location = useLocation()

  useEffect(() => {
    localStorage.removeItem('playlists')
  }, [location]);

  return null;
}

export default RouteChangeListener