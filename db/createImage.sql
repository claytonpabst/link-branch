INSERT INTO images (user_id, src, public_id)
values ($1, $2, $3)
returning *