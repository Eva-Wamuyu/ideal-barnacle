
CREATE TABLE notebook_table(
                id VARCHAR(200) PRIMARY KEY,
                notebook_title VARCHAR(500) NOT NULL,
                notebook_content VARCHAR(1000) NOT NULL,
                created_at DATETIME NOT NULL,
                
            )