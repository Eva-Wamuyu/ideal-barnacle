const {v4} = require("uuid");

const {DB} = require("../DatabaseHelpers/databasehelpers")


const createNotebook = async(req,res) =>{
    try {
        const id = v4();
        const created_at_ = Date.now();
        const {notebook_title, notebook_content} = req.body;


        const created_at = formatDate(created_at_)
        
        await DB.exec("createNotebookPROC",
        {id,
        notebook_title,
        notebook_content,
        created_at});

        return res.status(201).json(
            {
                status: 'success',
                message: 'Notebook Added Successfully'
            }
        )
    
    } catch (error) {
        
        return res.status(500).json(
            {
                status: "error",
                message: "Error adding notebook"
            }
        )
        
    }
}


const getNotebooks = async(req,res)=>{
    try {

        let response = await DB.exec('getNotebooksPROC');
        

        return res.status(200).json(
            {
                status: 'success',
                notebooks: response['recordset']
            }
        )
        
    } catch (error) {
        console.log(error)
        return res.status(404).json(
            {
                status: "error",
                message: "Notebooks not found"
            }
        )
        
    }

}





const formatDate = (timestamp)=>{
    const dateObj = new Date(timestamp);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;


}

module.exports = {
    createNotebook,
    getNotebooks
}