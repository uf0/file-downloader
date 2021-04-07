import React, { useState } from 'react'
import DropZone from './DropZone'
import Icon from './Icon'
import { saveAs } from 'file-saver'
import * as d3 from 'd3'

const FileSaver = () => {
	const [files, setFiles] = useState([])
	const [proxy, setProxy] = useState('')
	const [throttle, setThrottle] = useState(50)

	const loadFile = (input) => {
		const file = input.files[0]
		const arr = file.name.split('.')
		const extension = arr[arr.length - 1]
		const dsv = d3.dsvFormat(extension === 'tsv' ? '\t' : ',')

		const reader = new FileReader()
		reader.onload = function (event) {
			setFiles(dsv.parse(event.target.result, (d) => ({ status: 'queued', ...d })))
		}
		reader.readAsText(file)
	}
	const downloadFiles = async () => {
		for (const file of files) {
			file.status = 'progress'
			setFiles([...files])
			saveAs(proxy + file.url, file.fileName)
			await sleep(throttle)
		}

		function sleep(ms) {
			return new Promise((resolve) => setTimeout(resolve, ms))
		}
	}

	return (
		<>
			{!files.length && <input type="file" accept=".tsv, .csv" onChange={(event) => loadFile(event.target)} />}
			{!files.length === -2 && <DropZone />}
			<div className="mt-3">
				<h6>Settings</h6>
				<form>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label for="throttle">throttle (millisec): </label>
							<input
								type="number"
								value={throttle}
								onChange={(event) => setThrottle(event.target.value)}
								type="number"
								min="0"
								step="1"
								id="throttle"
								className="form-control"
							/>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label for="proxy">
								proxy url (eg: <kbd>https://api.allorigins.win/raw?url=</kbd>){' '}
							</label>
							<input type="text" value={proxy} onChange={(event) => setProxy(event.target.value)} id="proxy" className="form-control" />
						</div>
					</div>
				</form>
			</div>

			{files.length > 0 && (
				<>
					<div>
						{files.map((f, i) => (
							<Icon key={i} status={f.status} />
						))}
					</div>
					<button type="button" className="btn btn-primary" onClick={() => downloadFiles()}>
						Download files
					</button>
				</>
			)}
		</>
	)
}

export default FileSaver
