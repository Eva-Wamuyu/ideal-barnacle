import {createNotebook} from "./notebookController"
import { DB } from "../DatabaseHelpers/databasehelpers"

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
}

jest.mock("../DatabaseHelpers/databasehelpers")

describe("Create A NoteBook",()=>{
    it("should return an error if the body is empty",async ()=>{
        const req = {
            body: {

            }
        }

        await createNotebook(req,res);

        expect(res.json).toHaveBeenCalledWith(
            {
                message: "Request Body Should have notebook_title and notebook_content"
            }
        )
    })

    it("should return an error if only the title is provided",async ()=>{
        const req = {
            body: {
                notebook_title: "notebook_title"
            }
        }

        await createNotebook(req,res);

        expect(res.json).toHaveBeenCalledWith(
            {
                error: "Request Body Should have notebook_content"
            }
        )
    })

    it("should return an error if only the content is provided",async ()=>{
        const req = {
            body: {
                notebook_content: "notebook_content"
            }
        }

        await createNotebook(req,res);

        expect(res.json).toHaveBeenCalledWith(
            {
                error: "Request Body Should have notebook_title"
            }
        )
    })

    it("should return a success message if notebook is added successfully", async()=>{
        const req = {
            body: {
                notebook_title: "notebook_title",
                notebook_content: "notebook_content"
            }
        }

        await createNotebook(req, res)

        DB.exec.mockResolvedValueOnce({});

        expect(res.json).toHaveBeenCalledWith({
            status: "success",
            message: "Notebook Added Successfully",
        })
    })
})
