const checkStatus = (response: Response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  throw new Error(response.statusText);
};

const parseText = (response: Response) => response.text();

const fetchTxt = (url: string): Promise<string> => {
  return fetch(url, {
    headers: {
      "Content-Type": "text/plain"
    }
  })
    .then(checkStatus)
    .then(parseText);
};

export default fetchTxt;
