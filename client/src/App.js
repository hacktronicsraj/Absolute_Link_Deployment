import { useState, useEffect, useRef } from 'react';
import './App.css';
import { uploadFile } from './service/api';
import { Button } from "@material-tailwind/react";
import { TypeAnimation } from 'react-type-animation';

function App() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');

  const fileInputRef = useRef();



  const url = 'https://helpdeskgeek.com/wp-content/pictures/2019/04/share-files.png';

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        setResult(response.path);
      }
    }
    getImage();
  }, [file])

  const onUploadClick = () => {
    fileInputRef.current.click();
  }

  return (
    <div className='gradient_background'>

    <div className='container'>

      <img src={url} className='img' />

      <div className='wrapper'>

        {/* <h1>File Master Pro!</h1> */}
        <TypeAnimation
      sequence={[
        'Upload Stuff Such As Files', // Types 'One'
        1000, // Waits 1s
        'Upload Stuff Such As Images', // Deletes 'One' and types 'Two'
        2000, // Waits 2s
        () => {
          console.log('Sequence completed');
        },
      ]}
      wrapper="span"
      cursor={true}
      repeat={Infinity}
      style={{ fontSize: '3em', display: 'inline-block' }}
    />
        {/* <p>Upload the Files Here For a Sharable Link.</p> */}
        
        <Button onClick={() => onUploadClick()}>Upload Here</Button>

        <Button class="button2" >Unlimited Upload</Button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
       

        <a href={result} target='_blank'>{result}</a> 
      </div>
      </div>
    </div>
  );
}

export default App;
