const express = require("express");
const morgan=require("morgan");
const app =express();
const PORT=3000;

app.use(morgan("dev"));
app.get("/",(req,res)=>{res.send("hola mundo");
});
app.get("/mensaje",(req,res)=>{
    res.send("mensaje desde express");
});
app.get("/mensaje",(req,res)=>{
    res.send("mensaje desde express2");
});

app.get("/pagina",(req,res)=>{
    const nombre ="Antonio";
    res.send(`
            <style>.p1{
                color:red;
                background:blue;
            }</style>
        <h1> mi pagina web</h1>
            <p class="p1">creada con express</p>
            <p>Hola ${nombre}</p>
        `);
});

app.get("/alumno",(req,res)=>{
    res.json({
        nombre:"Antonio",
        carrera:"ISC",
        semestre:9
    });
});

app.get("/materias",(req,res)=>{
    res.json([
        {
        nombre:"NoSQL",
        hora:"8-11"

        },
        {
            nombre:"progrmacion web",
            hora:"12-3"

        }
    ]);
});

app.get("/mensaje/:nombre",(req,res)=>{
    res.send(`hola ${req.params.nombre}`)
})

app.get("/suma/:a/:b",(req,res)=>{
    const a=parseInt(req.params.a);
    const b=Number(req.params.b);
    res.send(`resultado: ${a+b}`);
});

app.get("/multiplicar/:a/:b",(req,res)=>{
    const a=parseInt(req.params.a);
    const b=parseInt(req.params.b);
    res.send(`Resultado:${a*b}`);
});

app.get("/aleatorio",(req,res)=>{
    const numero=Math.floor(Math.random()*100)+1;
    res.send(`Numero generado ${numero}`);
})
app.listen(PORT,()=>{
console.log("Servidor iniciado en http://localhost:"+PORT);
})

