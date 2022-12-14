import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8000/api/v1",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
});

// return the token from the session storage
export const getToken = () => {
    return localStorage.getItem('token') || null;
}

// parse string
export const htmlParser = (string) => {
    return string
        .replace(/(<([^>]+)>)/ig,'')
        ;
}
