const {v4} = require("uuid");

const {DB} = require("../DatabaseHelpers/databasehelpers")


const createNotebook = async(req,res) =>{
    try {
        const id = v4();
        const created_at_ = Date.now();
        const {notebook_title, notebook_content} = req.body;

        if(!notebook_title && !notebook_content){
            return res.status(400).json(
                {
                    message: "Request Body Should have notebook_title and notebook_content"
                }
            )
        }
        if(!notebook_title){
            return res.status(400).json(
                {
                
                    error: "Request Body Should have notebook_title"
                }
            )
        }
        if(!notebook_content){
            return res.status(400).json(
                {
                
                    error: "Request Body Should have notebook_content"
                }
            )

        }


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
                body: "Error adding notebook"
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
        
        return res.status(404).json(
            {
                status: "error",
                body: "Notebooks not found"
            }
        )
        
    }

}


const getNoteBook = async(req, res)=>{
    try {
        const id = req.params.id;
        let response = await DB.exec('getNotebookPROC',{id});
        

        return res.status(200).json(
            {
                status: "success",
                body: response['recordset']
            }
        )
        
    } catch (error) {
        console.log(error)
        return res.status(404).json(
            {
                status: "error",
                body: "Notebook not found"
            }
        )

    }

}


const deleteNotebook = async(req,res)=>{
    try {

        const id = req.params.id;
        let response = await DB.exec('deleteNotebookPROC',{id});

        return res.status(200).json(
            {
                status: "success",
                body: "Notebook Deleted"
            }
        )


        
    } catch (error) {

        
        return res.status(404).json(
            {
                status: "error",
                body: "Notebook Not deleted"
            }
        )

        
    }
}

const editNotebook = async(req,res) =>{
    try {

        const id = req.params.id;

        const {notebook_title, notebook_content} = req.body;

        

        DB.exec('editNotebookPROC',{id,notebook_title,notebook_content});


        return res.status(200).json(
            {
                status: "success",
                body: "Notebook Edited Successfully"
            }
        )


        
    } catch (error) {
        return res.status(400).json(
            {
                status: "error",
                body: "Notebook Not Updated"
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
    getNotebooks,
    getNoteBook,
    deleteNotebook,
    editNotebook
}