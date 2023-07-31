CREATE OR ALTER PROCEDURE editNotebookPROC(@id VARCHAR(200), @notebook_title  VARCHAR(500), @notebook_content VARCHAR(1000))
AS
BEGIN
    UPDATE notebook_table
    SET notebook_title=notebook_title, notebook_content= notebook_content where id=@id
END