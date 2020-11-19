import FileSaver from "./FileSaver.js";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Download and rename many files</h1>
      <p>import a csv or a tsv with 2 columns:</p>
      <ul>
        <li>a url to the file</li>
        <li>the filename that includes the original extension</li>
      </ul>
      <FileSaver />
    </div>
  );
}

export default App;
