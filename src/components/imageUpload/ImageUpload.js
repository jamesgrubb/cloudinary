import React, {useState} from 'react'

export default () => {
    const[file, setFile] = useState('')
    const[selectedFile,setSelectedFile] = useState(null)
    const [previewSource , setPreviewSource] = useState(null)
    function handleFileInputChange(e){
        e.preventDefault()
        const file = e.target.files[0]
        previewFile(file)

    }

    const previewFile = (file) => {
        const reader = new FileReader()
        const image = new Image()
        
        reader.readAsDataURL(file)
        image.onload = () => {
            console.log(image.width)
        }
        reader.onloadend = () => {
            image.src = reader.result
            setPreviewSource(reader.result)
            
        } 
     
    }

    const handleSubmitFile = (e) => {

        console.log("handleSubmitFile -> submitting")
        e.preventDefault()
        if(!previewSource) return
        uploadImage(previewSource)
    }

    const uploadImage = async (base64encodedImage) => {
        try{
            await fetch('/api/upload' , {
                method: 'POST',
                body: JSON.stringify({data: base64encodedImage}),
                headers: {'Content-type': 'application/json'}
            })
        }
        catch (error){
            console.error(error)
        }
    }

    return(
        <>
        <form type="submit" onSubmit={handleSubmitFile}>
            <label htmlFor="image">Upload Image</label>
            <input type="file" name="image" id="image" onChange={handleFileInputChange} value={file}/>
            <button type="submit">Submit</button>
        </form>
        {previewSource && <img src={previewSource} alt="prviewName"/>}
        </>
    )
}