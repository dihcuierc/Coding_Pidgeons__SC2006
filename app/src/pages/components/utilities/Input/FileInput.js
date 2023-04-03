import {useRef, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./FileInput.css"

function FileInput({image}) {
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if(e.type === "dragenter" || e.type === "dragover")
            setDragActive(true)
        else if (e.type === "dragleave")
            setDragActive(false)
    };

    const handleDrop = function(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            image = e.dataTransfer.files;
            console.log(image);
        }
    };

    const handleChange = function(e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            image = e.target.files;
            console.log(image);
        }
    };

    const onButtonClick = () => {
        inputRef.current.click();
    };

    return (
        <>
            <Form.Group id="form-file" className="text-black" onDragEnter={handleDrag}>
                <Form.Control type="file" ref={inputRef} id="input-file" accept="image/png, image/jpg, image/gif" onChange={handleChange}/>
                    <Form.Label id="input-label" className={dragActive ? "drag-active" : ""}>
                        <p>Drag and drop your file here or</p>
                        <Button className="upload-button" onClick={onButtonClick}>Upload a file</Button>
                    </Form.Label>
                {dragActive && <div id="drag-file" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
            </Form.Group>
        </>
    );

}

export default FileInput;