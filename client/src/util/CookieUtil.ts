export const setCookie = (name: string, value: string, expires: Date) => {
  console.log("expires: " + expires.toUTCString());
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
};

export const getCookie = (name: string) => {
  let decodedCookie = decodeURIComponent(document.cookie);
  let cookies = decodedCookie.split(";");
  //console.log(cookies);
  let value = "";
  for (let i = 0; i < cookies.length; i++) {
    let keyValueData = cookies[i].split("=");
    //console.log("keyValueData: " + keyValueData[0]);
    if (keyValueData[0].includes(name)) {
      value = keyValueData[1];
      //console.log("value: " + value);
    }
  }
  return value;
};
