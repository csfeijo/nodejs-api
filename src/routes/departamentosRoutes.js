import con  from '../services/connection.js'

const departamentosRoutes = (app) => {
  /**
 * @swagger
 * /departamentos:
 *   get:
 *     description: Lista todos departamentos
 *     produces:
 *       - text/html
 *     responses:
 *       200:
 *         description: Exibe todos departamentos em um vetor
 */
  app.get('/departamentos', async (req, res) => {
    try {
      const [rows] = await con.query('SELECT * FROM DEPARTAMENTOS ORDER BY nome')
      res.send(rows)
    } catch(e) {
      res.send(e)
    }
  })

  /**
 * @swagger
 *
 * /departamentos/:id:
 *   get:
 *     description: Listaum departamentos específico pelo ID
 *     produces:
 *       - text/html
 *     responses:
 *       200:
 *         description: Exibe todos departamentos em um vetor
 */
  app.get('/departamentos/:idDepartamento', async (req, res) => {
    const { idDepartamento } = req.params
  
    try {
      const [rows] = await con.query(`SELECT * FROM DEPARTAMENTOS WHERE id_departamento = ${idDepartamento}`)
      res.status(200).json(rows)
    } catch (e) {
      res.status(500).json({ message: 'Erro ao listar registros.', exception: e})
    }
  })

  /**
 * @swagger
 *
 * /departamentos:
 *   post:
 *     description: Insere departamento
 *     produces:
 *       - text/json
 *     parameters:
 *       - name: nome
 *         description: nome do departamento.
 *         required: true
 *         type: string
 *       - name: sigla
 *         description: sigla do departamento.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Insere um depto. no banco
 */
  app.post('/departamentos', async (req, res) => {
    const { nome, sigla } = req.body

    if (!nome || !sigla) {
      res.status(400).json({ message: 'Um ou mais campos obrigatórios faltando.'})
    }

    try {
      const [result] = await con.query('INSERT INTO DEPARTAMENTOS (nome, sigla) VALUES (?, ?)', [nome, sigla])
      console.log(result)

      res.status(201).json({ message: 'Registro inserido com sucesso.', details: result})
    } catch(e) {
      res.status(500).json({ message: 'Erro ao inserir o registro.', exception: e})
    }
  })

  /**
 * @swagger
 *
 * /departamentos/:id:
 *   patch:
 *     description: Altera os dados de um departamento
 *     produces:
 *       - text/json
 *     parameters:
 *       - name: nome
 *         description: nome do departamento.
 *         required: true
 *         type: string
 *       - name: sigla
 *         description: sigla do departamento.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Insere um depto. no banco
 */
  app.patch('/departamentos/:idDepartamento', async (req, res) => {
    const { idDepartamento } = req.params
    const { nome, sigla } = req.body

    if (!idDepartamento) {
      res.status(400).json({ message: 'Um ou mais campos obrigatórios faltando.'})
    }
    
    const departamento = {}
    if (nome) departamento.nome = nome
    if (sigla) departamento.sigla = sigla
    
    try {
      const updateQuery = 'UPDATE DEPARTAMENTOS SET ? WHERE id_departamento = ?'
      const [result] = await con.query(updateQuery, [departamento, idDepartamento])


      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Registro não encontrado.' })
      }

      res.status(201).json({ message: 'Registro atualizado com sucesso.', details: result})
    } catch(e) {
      res.status(500).json({ message: 'Erro ao atualizar o registro.', exception: e})
    }
  })


  /**
 * @swagger
 *
 * /departamento/:id:
 *   delete:
 *     description: Remove um departamento
 *     produces:
 *       - text/json
 *     parameters:
 *       - name: idDepartamento
 *         description: id do departamento.
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Insere um depto. no banco
 */
  app.delete('/departamentos/:idDepartamento', async (req, res) => {
    const { idDepartamento } = req.params

    if (!idDepartamento) {
      res.status(400).json({ message: 'Um ou mais campos obrigatórios faltando.'})
    }
    try {
      const [result] = await con.query('DELETE FROM DEPARTAMENTOS WHERE id_departamento = ?', [idDepartamento])

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Registro não encontrado.' })
      }

      res.status(200).json({ message: 'Registro removido com sucesso.', details: result})

    } catch(e) {
      res.status(500).json({ message: 'Erro ao excluir o registro.', exception: e})
    }
  })

}

export default departamentosRoutes