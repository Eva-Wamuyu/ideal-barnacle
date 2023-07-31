const {Router} = require("express")
const { createNotebook, getNotebooks, getNoteBook,deleteNotebook, editNotebook } = require("../Controllers/notebookController")

const router = Router()

router.post('/', createNotebook);
router.get('/', getNotebooks);
router.get('/:id', getNoteBook);
router.delete('/:id', deleteNotebook);
router.patch('/:id', editNotebook)




module.exports = {
    router
}


