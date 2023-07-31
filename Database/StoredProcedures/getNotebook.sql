CREATE OR ALTER PROCEDURE getNotebookPROC(@id VARCHAR(200))
AS
BEGIN
    SELECT * FROM notebook_table where id=@id
END