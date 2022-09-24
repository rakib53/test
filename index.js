const parentDiv = document.getElementById("parentDiv");
const versions = document.querySelectorAll(".div");

const loadData = () => {
  const url = "http://127.0.0.1:5500/shopware_versions.json";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      getVersion(data);
    });
};

const getVersion = (data) => {
  for (const version of versions) {
    version.addEventListener("click", function () {
      const newDiv = document.createElement("div");
      newDiv.classList.add("version-data");
      const versionNm = version.innerText;
      const versions = data[versionNm].versions;
      const getSubVersion = versions.map((data) => {
        return data.major;
      });
      const findVersion = getSubVersion.filter((data, index) => {
        return getSubVersion.indexOf(data) === index;
      });
      findVersion.forEach((element) => {
        newDiv.innerHTML += `
        <p onclick="getanotherVersion(${versionNm},${element})">${versionNm}.${element}</p>
        `;
        parentDiv.appendChild(newDiv);
      });
    });
  }
};

const getanotherVersion = (version, major) => {
  const url = "http://127.0.0.1:5500/shopware_versions.json";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const versions = data[version].versions;
      const newDiv = document.createElement("div");
      newDiv.classList.add("sub-version");
      const subVersion = versions.filter((data) => {
        return data.major === major;
      });

      subVersion.forEach((element) => {
        const objKey = Object.keys(element);
        const newPatch = objKey.includes("patch");
        newDiv.innerHTML += `
        <p>${version}.${element.major}.${element.minor}${
          newPatch ? "." + element.patch : ""
        }</p>`;
        parentDiv.appendChild(newDiv);
      });
    });
};

loadData();
