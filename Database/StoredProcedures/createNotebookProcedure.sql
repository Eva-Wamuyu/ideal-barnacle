CREATE OR ALTER PROCEDURE createNotebookPROC(@id VARCHAR(200), @notebook_title  VARCHAR(500), @notebook_content VARCHAR(1000), @created_at DATETIME)
AS
BEGIN
    INSERT INTO notebook_table(id, notebook_title, notebook_content, created_at) VALUES (@id, @notebook_title, @notebook_content, @created_at)
END