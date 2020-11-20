import FileSaver from "./FileSaver.js";
import "./App.scss";

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Download and rename many files</h1>
          <p>Load a <kbd>.csv</kbd> or a <kbd>.tsv</kbd> with 2 columns:</p>
          <ul>
            <li>a url to the file</li>
            <li>the filename you want to give to the downloaded file (with original extension)</li>
          </ul>
          <FileSaver />
        </div>
      </div>
    </div>
  );
}

export default App;
