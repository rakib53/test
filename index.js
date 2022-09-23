const loadData = () => {
  const url = "http://127.0.0.1:5500/shopware_versions.json";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      getVersion(data);
    });
};

const getVersion = (data) => {
  const versions = data["6"].versions; // Return 53 obj in an array

  for (let a = 0; a < versions.length; a++) {
    const findVersion = versions.find((data) => {
      return data.major === a;
    });
    console.log(findVersion);
  }
};

loadData();
