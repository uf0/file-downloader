import { saveAs } from "file-saver";
import * as d3 from "d3";

const FileSaver = () => {
  const loadFile = (input)=>{
    const file = input.files[0];
    const arr = file.name.split(".");
    const extension = arr[arr.length - 1];
    const dsv = d3.dsvFormat(extension === "tsv" ? "\t" : ",");

    const reader = new FileReader();

    reader.onload = function (event) {
      const fileList = dsv.parse(event.target.result);
      window.alert("Start downloads");
      fileList.forEach((f, i) => {
        saveAs("https://api.allorigins.win/raw?url=" + f.url, f.filename);
      });
    };
    reader.readAsText(file);
  }
  return <input type="file" accept=".tsv, .csv" onChange={(event)=>loadFile(event.target)} />;
};

export default FileSaver;
