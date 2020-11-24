import React, { useState } from 'react'
import DropZone from "./DropZone"
import Icon from "./Icon"
import { saveAs } from 'file-saver'
import * as d3 from 'd3'

const FileSaver = () => {
	const [files, setFiles] = useState([])

	const loadFile = (input) => {
		const file = input.files[0]
		const arr = file.name.split('.')
		const extension = arr[arr.length - 1]
		const dsv = d3.dsvFormat(extension === 'tsv' ? '\t' : ',')

		const reader = new FileReader()
		reader.onload = function (event) {
			setFiles(dsv.parse(event.target.result, (d) => ({ status: "queued", ...d })))
		}
		reader.readAsText(file)
	}
	const downloadFiles = () => {
    console.log(files)
    files.forEach((f, i) => {
      f.status="progress"
      setFiles([...files])
			saveAs('https://api.allorigins.win/raw?url=' + f.url, f.fileName)
		})
  }
  
  
	return (
		<>
			{!files.length && <input type="file" accept=".tsv, .csv" onChange={(event) => loadFile(event.target)} />}
      {!files.length===-2 && <DropZone />}
			{files.length && (
				<>
					<div>
						{files.map((f, i) => (
							<Icon key={i} status={f.status} />
						))}
					</div>
					<button type="button" className="btn btn-primary" onClick={() => downloadFiles() }>
						Download files
					</button>
				</>
			)}
		</>
	)
}

export default FileSaver
