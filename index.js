
const express = require('express')
const app = express()
const fs = require('fs')
const port = 3000
const route = require('./routes/route')
const cors = require('cors')

app.use(express.json());
// app.use('/',route)

app.get('/', async (req,res) =>{
    try{
        const notas = JSON.parse(await fs.readFileSync("models/grades.json"))
        res.send(notas)
        console.log("Todas as notas")
    }catch(err){
        console.log(err)
    }
})
app.post('/', async (req, res) =>{
    try{
        let nota = req.body;
        if(nota.student == null || nota.subject == null || nota.type == null || nota.value == null){
            console.log("Dados obrigatórios faltando");
        }
        const notas = JSON.parse(await fs.readFileSync("models/grades.json"))
        nota = {
            id: notas.nextId++,
            student: nota.student,
            subject: nota.subject,
            type: nota.type,
            value: nota.value,
            timestamp: new Date()
        }
        notas.grades.push(nota)

        await fs.writeFileSync("models/grades.json",JSON.stringify(notas,null,2))

        res.send(nota)
        console.log("Nota do trabalho adicionada")

    }catch(err){
        console.log(err)
    }
})

app.get('/:id', async (req,res) =>{
    try{
        const notas = JSON.parse(await fs.readFileSync("models/grades.json"))
        const index = notas.grades.findIndex(a => a.id === parseInt(req.params.id));
        if(index == -1){
            res.send("Registro inexistente")
            res.end()
        }else{
            const nota = notas.grades.find(
                n => n.id === parseInt(req.params.id)
            )
            res.send(nota)
            console.log("Nota do trabalho de um aluno")
        }
    }catch(err){
        console.log(err)
    }
})

app.delete('/:id', async (req,res) =>{
    try{
        const notas = JSON.parse(await fs.readFileSync("models/grades.json"))
        const index = notas.grades.findIndex(a => a.id === parseInt(req.params.id));
        if(index == -1){
            res.send("Registro inexistente")
            res.end()
        }else{
            notas.grades = notas.grades.filter(
                nota => nota.id !== parseInt(req.params.id)
            )
            
            await fs.writeFileSync("models/grades.json",JSON.stringify(notas,null,2))
            console.log(`Nota deletada`)
            res.send(`Nota deletada`)
            res.end()
        }
    }catch(err){
        console.log(err)
    }
})

app.patch('/:id', async (req,res) =>{
    try{
        let notaAlterar = req.body;
        if(notaAlterar.student == null || notaAlterar.subject == null || notaAlterar.type == null || notaAlterar.value == null){
            console.log("Dados obrigatórios faltando");
            return
        }
        const notas = JSON.parse(await fs.readFileSync("models/grades.json"))
        const index = notas.grades.findIndex(a => a.id === parseInt(req.params.id));
        if(index == -1){
            res.send("Registro inexistente")
            res.end()
        }else{
            const idNota = notas.grades.find(
                n => n.id === parseInt(req.params.id)
            )
            notas.grades[idNota.id-2].student = notaAlterar.student
            notas.grades[idNota.id-2].subject = notaAlterar.subject
            notas.grades[idNota.id-2].type = notaAlterar.type
            notas.grades[idNota.id-2].value = notaAlterar.value

            await fs.writeFileSync("models/grades.json",JSON.stringify(notas,null,2))
            res.send(idNota)
            console.log(`Nota altualizada`)
        }
    }catch(err){
        console.log(err)
    }
})

app.get('/aluno/:student', async (req,res) =>{
    try{
        const notas = JSON.parse(await fs.readFileSync("models/grades.json"))
        const index = notas.grades.findIndex(a => a.student === req.params.student);
        if(index == -1){
            res.send("Registro inexistente")
            res.end()
        }else{
            const nota = notas.grades.filter(
                n => n.student === req.params.student
            )
            res.send(nota)
            console.log("Notas de um aluno")
        }
    }catch(err){
        console.log(err)
    }
})

app.get('/notaFinal/:student/:subject', async(req,res)=>{
    const notas = JSON.parse(await fs.readFileSync("models/grades.json"))
    const index = notas.grades.findIndex(a => a.student === req.params.student);
    const index2 = notas.grades.findIndex(a => a.subject === req.params.subject);
    if(index == -1 || index2 == -1){
        res.send("Registro inexistente")
        res.end()
    }else{
        const aluno = notas.grades.filter(
            n => n.student === req.params.student
        )
        const materiaAluno = aluno.filter(
            n => n.subject === req.params.subject
        )
        let notaFinal = 0;
        materiaAluno.forEach(value => {
            notaFinal+= parseInt(value.value)
        });
        console.log(`Nota final`)
        res.send(`Aluno: ${req.params.student} | Matéria: ${req.params.subject} | Nota final: ${notaFinal}`)
    }
})

app.get('/media/:student/:subject', async(req,res)=>{
    const notas = JSON.parse(await fs.readFileSync("models/grades.json"))
    const index = notas.grades.findIndex(a => a.student === req.params.student);
    const index2 = notas.grades.findIndex(a => a.subject === req.params.subject);
    if(index == -1 || index2 == -1){
        res.send("Registro inexistente")
        res.end()
    }else{
        const aluno = notas.grades.filter(
            n => n.student === req.params.student
        )
        const materiaAluno = aluno.filter(
            n => n.subject === req.params.subject
        )
        let notaFinal = 0;
        let quantAtv = 0;
        materiaAluno.forEach(value => {
            notaFinal+= parseInt(value.value)
            quantAtv ++
        });
        let media = notaFinal/quantAtv;
        media = media.toFixed(2)
        console.log(`Nota média`)
        res.send(`Aluno: ${req.params.student} | Matéria: ${req.params.subject} | Média: ${media}`)
    }
})

app.get('/3melhores/:student/:subject', async(req,res)=>{
    const notas = JSON.parse(await fs.readFileSync("models/grades.json"))
    const index = notas.grades.findIndex(a => a.student === req.params.student);
    const index2 = notas.grades.findIndex(a => a.subject === req.params.subject);
    if(index == -1 || index2 == -1){
        res.send("Registro inexistente")
        res.end()
    }else{
        const aluno = notas.grades.filter(
            n => n.student === req.params.student
        )
        const materiaAluno = aluno.filter(
            n => n.subject === req.params.subject
        ) 
        let melhoresNotas = [];
        let quantAtv = 0;
        let testemaior = 0;
        let naorepitir = 0;
        materiaAluno.forEach(value => {
            if(quantAtv < 3){
                melhoresNotas.push(value.value)
            }else{
                melhoresNotas.forEach(element =>{
                    if(value.value > element){
                        if(naorepitir == 0){
                            melhoresNotas.splice(testemaior,1,value.value)
                            naorepitir = 1;
                        }
                    }
                    testemaior++
                })
                testemaior = 0
                naorepitir = 0
            }
            melhoresNotas.sort(function (a, b) {
                return a - b;
              });
            quantAtv ++
        });
        melhoresNotas.sort(function (a, b) {
            return b - a;
          }); 
        console.log(`3 melhores notas`)
        res.send(`Aluno: ${req.params.student} | Matéria: ${req.params.subject} | 3 maiores notas: ${melhoresNotas}`)
    }
})

app.listen(port, err =>{
    console.log(`http://localhost:${port}`)
})
