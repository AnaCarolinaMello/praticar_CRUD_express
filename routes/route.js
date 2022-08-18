
const express = require('express')
const fs = require('fs')
const cors = require('cors')
const { reset } = require('nodemon')
const router = express.Router()

// Não consegui fazer funcionar pelo router :(

    // router.get('/', async (req,res) =>{
    //     try{
    //         const notas = JSON.parse(await fs.readFileSync("models/grades.json"))
    //         res.send(notas)
    //         console.log("Todas as notas")
    //     }catch(err){
    //         console.log(err)
    //     }
    // })
    // router.post('/', async (req, res) =>{
    //     try{
    //         let nota = req.body;
    //         if(nota.student == null || nota.subject == null || nota.type == null || nota.value == null){
    //             console.log("Dados obrigatórios faltando");
    //         }
    //         const notas = JSON.parse(await fs.readFileSync("models/grades.json"))
    //         nota = {
    //             id: notas.nextId++,
    //             student: nota.student,
    //             subject: nota.subject,
    //             type: nota.type,
    //             value: nota.value,
    //             timestamp: new Date()
    //         }
    //         notas.grades.push(nota)
    
    //         await fs.writeFileSync("models/grades.json",JSON.stringify(notas,null,2))
    
    //         res.send(nota)
    //         console.log("Nota do trabalho adicionada")
    
    //     }catch(err){
    //         console.log(err)
    //     }
    // })
    
    // router.get('/:id', async (req,res) =>{
    //     try{
    //         const notas = JSON.parse(await fs.readFileSync("models/grades.json"))
    //         const nota = notas.grades.find(
    //             a => a.id === parseInt(req.params.id)
    //         )
    //         if(nota == undefined){
    //             res.send("Registro inexistente")
    //             res.end()
    //         }
    //         res.send(nota)
    //         console.log("Nota de um aluno específico")
    //     }catch(err){
    //         console.log(err)
    //     }
    // })
    
    // router.delete('/:id', async (req,res) =>{
    //     try{
    //         const notas = JSON.parse(await fs.readFileSync("models/grades.json"))
    //         notas.grades = notas.grades.filter(
    //             nota => nota.id !== parseInt(req.params.id)
    //         )
            
    //         await fs.writeFileSync("models/grades.json",JSON.stringify(notas,null,2))
    //         res.send(`Nota deletada`)
    //         res.end()
    //     }catch(err){
    //         console.log(err)
    //     }
    // })
    
    // router.patch('/:id', async (req,res) =>{
    //     try{
    //         let notaAlterar = req.body;
    //         if(notaAlterar.student == null || notaAlterar.subject == null || notaAlterar.type == null || notaAlterar.value == null){
    //             console.log("Dados obrigatórios faltando");
    //             return
    //         }
    //         const notas = JSON.parse(await fs.readFileSync("models/grades.json"))
    //         const idNota = notas.grades.find(
    //             n => n.id === parseInt(req.params.id)
    //         )
    //         console.log(idNota.id)
    //         if(idNota.id == undefined){
    //             res.send("Registro inexistente")
    //             res.end()
    //         }
    //         notas.grades[idNota.id-2].student = notaAlterar.student
    //         notas.grades[idNota.id-2].subject = notaAlterar.subject
    //         notas.grades[idNota.id-2].type = notaAlterar.type
    //         notas.grades[idNota.id-2].value = notaAlterar.value
    
    //         await fs.writeFileSync("models/grades.json",JSON.stringify(notas,null,2))
    //         res.send(idNota)
    //         console.log(`Nota deletada`)
    //     }catch(err){
    //         console.log(err)
    //     }
    // })
    