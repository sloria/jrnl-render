function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseText(response) {
  return response.text();
}

export default function fetchTxt(url) {
  return fetch(url, {
    headers: {
      "Content-Type": "text/plain"
    }
  })
    .then(checkStatus)
    .then(parseText);
}
