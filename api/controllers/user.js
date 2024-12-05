import { db } from "../db.js"

export const getUsers = (_, res) => {
    const q = "SELECT u.iduser, u.name, u.second_name, u.email, u.knowledge_id, rl.description as role,lvl.description as level FROM crud.user AS u LEFT JOIN level_of_knowledge AS lvl ON lvl.idlevel_of_knowledge = u.knowledge_id LEFT JOIN role AS rl ON rl.idrole = u.role_id"

    db.query(q , (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addUser = (req, res) => {
    const q = "INSERT into crud.user (`name`, `second_name` ,`email`, `knowledge_id`, `role_id`) VALUES (?)";

    const values = [
        req.body.name,
        req.body.second_name,
        req.body.email,
        req.body.knowledge_id,
        req.body.role_id
    ]

    db.query(q, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuário criado com sucesso");
    })
}

export const updateUser = (req, res) => {
    const q = "UPDATE crud.user SET `name` = ?, `second_name` = ?, `email`= ?, `knowledge_id` = ?, `role_id` = ? WHERE `iduser` = ?";

    const values = [
        req.body.name,
        req.body.second_name,
        req.body.email,
        req.body.knowledge_id,
        req.body.role
    ]

    db.query(q, [...values, req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuário atualizado com sucesso");
    })
}

export const deleteUser = (req, res) => {
    const q = "DELETE from crud.user WHERE `iduser` = ?";

    const values = [
        req.body.name,
        req.body.second_name,
        req.body.email
    ]

    db.query(q, [req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuário deletado com sucesso");
    })
}