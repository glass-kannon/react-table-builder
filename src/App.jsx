import './App.css';
import { useState } from 'react';

const MyInput = ({ placeholder, onPaste }) => {
  const [show, setShow] = useState(true);

  function toggleShow() {
    setShow(!show);
  }

  return (
    <>
      {
        show ?
        (
          <input
            name='raw-data-field'
            type='text'
            placeholder={placeholder}
            onPaste={onPaste}
            onChange={toggleShow}
          />
        ) :
        (
           <button onClick={toggleShow}>
            Reset
          </button>
        )
      }
    </>
  );
}

const MyDataTable = ({ header, rows }) => {
  return (
    <table>
      <thead>
        {header.map((row) => {
          return (
            <tr key={row.id}>
              {row.rowData.map((cell) => {
                return (<th>{cell}</th>)
              })}
            </tr>
          )
        })}
      </thead>
      <tbody>
        {rows.map((row) => {
          return (
            <tr key={row.id}>
              {row.rowData.map((cell) => {
                return (<td>{cell}</td>)
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function usePasteHandler() {
  const [tableHead, setTableHead] = useState([]);
  const [tableRows, setTableRows] = useState([]);

  const handlePaste = (event) => {
    const rawData = event.clipboardData.getData('text/plain');
    const data = rawData.split('\r\n').map(row => row.split('\t'));
    const header = [data[0]];
    const rows = data.slice(1);
    const processedHeader = [...Array(1).keys()].map((id, index) => {
      return {
        id,
        rowData: header[index],
      }
    });
    
    const processedRows = [...Array(rows.length).keys()].map((id, index) => {
      return {
        id,
        rowData: rows[index],
      }
    });
    setTableHead(processedHeader);
    console.info(processedHeader);
    setTableRows(processedRows);
    console.info(processedRows);
  }

  return { tableHead, tableRows, handlePaste };
}

function App() {
  const { tableHead, tableRows, handlePaste } = usePasteHandler();

  return (
    <div className="App">
      <MyInput
        placeholder="Gimme stuff"
        onPaste={handlePaste}
        />

      <MyDataTable
        header={tableHead ? tableHead : [['N/A', 'N/A', 'N/A']]}
        rows={tableRows ? tableRows : [['N/A', 'N/A', 'N/A']]}
        />
    </div>
  );
}

export default App;
