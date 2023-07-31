
CREATE OR ALTER PROCEDURE deleteNotebookPROC(@id VARCHAR(200))
AS
BEGIN
    DELETE FROM notebook_table where id=@id
END