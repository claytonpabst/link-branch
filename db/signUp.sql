INSERT INTO Users (Email, username, password, profile_data, profile_views)
values ($1, $2, $3, $4, $5)
returning *